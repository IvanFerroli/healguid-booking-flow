/**
 * @file Booking lookup route (GET /api/bookings/[id])
 *
 * Summary:
 *  Fetches a single booking by ID, including minimal practitioner info,
 *  and returns a normalized JSON response for the Success/Cancel pages.
 *
 * Responsibilities:
 *  - Parse and validate the dynamic booking ID from route params
 *  - Query the database for the booking and its practitioner
 *  - Normalize the result into a lightweight public-facing shape
 *
 * Inputs:
 *  - Route params: { id: string } (async due to Next.js 16 route handlers)
 *
 * Outputs:
 *  - 200: booking data (id, status, slot, patient details, practitioner)
 *  - 400: invalid booking ID
 *  - 404: booking not found
 *  - 500: unexpected server/database error
 *
 * Notes:
 *  - Used by the Success and Cancel pages to display accurate booking status.
 *  - Does not expose sensitive internal fields from the Practitioner model.
 */


import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const bookingId = Number(id);

    if (!Number.isInteger(bookingId) || bookingId <= 0) {
      return NextResponse.json(
        { error: "Invalid booking ID" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        practitioner: {
          select: {
            id: true,
            name: true,
            title: true,
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        id: booking.id,
        status: booking.status,
        slot: booking.slot,
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        practitioner: booking.practitioner,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[bookings/[id]] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
