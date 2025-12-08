/**
 * @file Booking creation route (POST /api/bookings)
 *
 * Summary:
 *   Creates a new booking in "pending" status and initializes a Stripe Checkout Session.
 *   This is the main entry point of the HealGuid booking funnel.
 *
 * Responsibilities:
 *   - Validate incoming payload (practitionerId, slot, name, email, phone)
 *   - Revalidate the selected timeslot against Cal.com availability (if the provider is reachable)
 *   - Create a booking record in the database with status "pending"
 *   - Create a Stripe Checkout Session for payment and attach metadata
 *   - Persist Stripe session ID to the booking for webhook correlation
 *
 * Inputs:
 *   Body JSON:
 *     - practitionerId: number
 *     - slot: ISO date string
 *     - name: string
 *     - email: string
 *     - phone: string
 *
 * Outputs:
 *   - 201: { checkoutUrl } → redirect target for Stripe Checkout
 *   - 400: missing or invalid payload / invalid slot
 *   - 404: practitioner not found
 *   - 500: failure creating booking or Stripe session
 *
 * Slot validation notes:
 *   - If Cal.com is reachable, slot is validated using live availability.
 *   - If Cal.com fails, the system logs the error and falls back to trusting the client slot.
 *
 * Error handling:
 *   - Any unexpected error marks the booking as "failed" if it was already created.
 *   - All errors include structured error codes for UI handling.
 *
 * Lifecycle:
 *   - Booking is initially "pending"
 *   - Payment confirmation occurs exclusively via Stripe Webhook (not here)
 *   - Success and Cancel pages rely on the booking ID passed in metadata
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchCalAvailability } from "@/lib/calClient";
import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("Stripe secret key missing at runtime");
  }

  return new Stripe(key, {
  });
}


const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function POST(req: Request) {
  let bookingId: number | null = null;

  try {
    const body = await req.json();
    const { practitionerId, slot, name, email, phone } = body || {};

    if (!practitionerId || !slot || !name || !email || !phone) {
      return NextResponse.json(
        {
          error: "INVALID_PAYLOAD",
          message:
            "practitionerId, slot, name, email and phone are required.",
        },
        { status: 400 }
      );
    }

    const practitioner = await prisma.practitioner.findUnique({
      where: { id: Number(practitionerId) },
    });

    if (!practitioner) {
      return NextResponse.json(
        { error: "PRACTITIONER_NOT_FOUND", message: "Practitioner not found." },
        { status: 404 }
      );
    }

    let isSlotValid = true;

    try {
      const availability = await fetchCalAvailability(
        practitioner.eventTypeId.toString()
      );

      isSlotValid = availability.slots.some(
        (s: any) => s.start === slot
      );
    } catch (err) {
      console.error(
        "[bookings] Skipping slot revalidation due to Cal.com error:",
        err
      );
    
    }

    if (!isSlotValid) {
      return NextResponse.json(
        {
          error: "INVALID_SLOT",
          message: "Selected slot is no longer available.",
        },
        { status: 400 }
      );
    }



    const booking = await prisma.booking.create({
      data: {
        practitionerId: practitioner.id,
        slot: new Date(slot),
        name,
        email,
        phone,
        status: "pending",
      },
    });

    bookingId = booking.id;

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            unit_amount: practitioner.basePrice * 100,
            product_data: {
              name: `Consultation with ${practitioner.name}`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${APP_URL}/booking/success?bookingId=${booking.id}`,
      cancel_url: `${APP_URL}/book/${practitioner.id}?cancelled=1`,
      metadata: {
        bookingId: booking.id.toString(),
      },
    });


    try {
      console.log("[bookings] Stripe session created:", { id: session.id, metadata: session.metadata });
    } catch (logErr) {
      console.error("[bookings] Failed to log Stripe session:", logErr);
    }


    await prisma.booking.update({
      where: { id: booking.id },
      data: { stripeSessionId: session.id },
    });


    try {
      console.log("[bookings] Saved stripeSessionId for booking", { bookingId: booking.id, stripeSessionId: session.id });
    } catch (logErr) {
      console.error("[bookings] Failed to log DB update:", logErr);
    }

    if (!session.url) {
      return NextResponse.json(
        {
          error: "STRIPE_SESSION_ERROR",
          message: "Stripe session was created without a redirect URL.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { checkoutUrl: session.url },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("[bookings] Error:", err);

    if (bookingId) {
      try {
        await prisma.booking.update({
          where: { id: bookingId },
          data: { status: "failed" },
        });
      } catch (updateErr) {
        console.error("[bookings] Failed to mark booking as failed:", updateErr);
      }
    }

    return NextResponse.json(
      {
        error: "BOOKING_CREATION_ERROR",
        message: "Unable to create booking and Stripe session.",
      },
      { status: 500 }
    );
  }
}
