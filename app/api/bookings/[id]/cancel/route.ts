import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// NOTE: on Next 16, `params` is a Promise in route handlers
type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(_req: Request, context: RouteContext) {
  // unwrap params Promise
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
