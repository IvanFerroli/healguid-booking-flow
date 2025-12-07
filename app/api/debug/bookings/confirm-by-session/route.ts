import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const sessionId = body?.sessionId;
    if (!sessionId) return NextResponse.json({ error: "missing_sessionId" }, { status: 400 });

    const session = await stripe.checkout.sessions.retrieve(sessionId as string);

    if (!session) return NextResponse.json({ error: "session_not_found" }, { status: 404 });

    const paymentStatus = (session as any).payment_status;

    const booking = await prisma.booking.findFirst({ where: { stripeSessionId: sessionId } });
    if (!booking) return NextResponse.json({ error: "booking_not_found" }, { status: 404 });

    if (paymentStatus === "paid") {
      await prisma.booking.update({ where: { id: booking.id }, data: { status: "confirmed" } });
      return NextResponse.json({ ok: true, bookingId: booking.id, paymentStatus });
    }

    return NextResponse.json({ ok: false, bookingId: booking.id, paymentStatus });
  } catch (err: any) {
    console.error("[debug/confirm-by-session]", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
