import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const bookingId = Number(id);
  if (!Number.isInteger(bookingId) || bookingId <= 0) {
    return NextResponse.json({ error: "invalid_id" }, { status: 400 });
  }

  try {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) return NextResponse.json({ error: "not_found" }, { status: 404 });

    await prisma.booking.update({ where: { id: bookingId }, data: { status: "confirmed" } });

    return NextResponse.json({ ok: true, bookingId });
  } catch (err: any) {
    console.error("[debug/confirm] error:", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
