/**
 * @file Booking cancellation route (POST /api/bookings/[id]/cancel)
 *
 * Summary:
 *  Handles server-side cancellation of a booking by ID.
 *
 * Responsibilities:
 *  - Validate and parse the dynamic booking ID from route params
 *  - Retrieve the booking from the database
 *  - Apply idempotent cancellation logic (re-cancelling returns the same record)
 *  - Update the booking status to "cancelled"
 *
 * Why it exists:
 *  Enables users to cancel a consultation after payment or confirmation,
 *  forming part of the full booking lifecycle (F8C2 – Final Stretch).
 *
 * Inputs:
 *  - Route params: { id: string } (async due to Next.js 16 behaviour)
 *
 * Outputs:
 *  - 200: JSON of the cancelled booking
 *  - 400: invalid or missing booking ID
 *  - 404: booking not found
 *  - 500: internal error while cancelling
 *
 * Notes:
 *  - Idempotent: if a booking is already cancelled, no updates are applied.
 *  - This route currently cancels only in the local database; integration
 *    with Cal.com cancellation can be added later (F8C2 requirement).
 */


import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(_req: Request, context: RouteContext) {
  const { id } = await context.params;
  const bookingId = Number(id);

  if (!bookingId || Number.isNaN(bookingId)) {
    return NextResponse.json(
      { error: "Invalid booking id" },
      { status: 400 }
    );
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // Idempotent: if already cancelled, just return it
    if (booking.status === "cancelled") {
      return NextResponse.json(booking, { status: 200 });
    }

    const updated = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "cancelled" },
    });

    console.log("[booking-cancel] Booking cancelled:", bookingId);

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("[booking-cancel] Error cancelling booking:", err);
    return NextResponse.json(
      { error: "Failed to cancel booking" },
      { status: 500 }
    );
  }
}
