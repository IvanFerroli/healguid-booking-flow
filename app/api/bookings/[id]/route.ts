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
