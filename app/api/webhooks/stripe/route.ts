import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";


// ❗ App Router não usa export const config
// usamos runtime para permitir raw body
export const runtime = "nodejs";
export const dynamic = "force-dynamic";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

// helper para pegar raw body corretamente
async function getRawBody(req: Request): Promise<Buffer> {
  const arrayBuffer = await req.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing signature or secret" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const rawBody = await getRawBody(req);

    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret
    );

    console.log("[stripe-webhook] VALID:", event.type);

  } catch (err: any) {
    console.error("[stripe-webhook] Invalid signature:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // -------------------------------
  // checkout.session.completed
  // -------------------------------
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const bookingId = session.metadata?.bookingId;

    if (!bookingId) {
      console.error("[webhook] Missing bookingId");
      return NextResponse.json({ ok: true });
    }

    // idempotência
    const booking = await prisma.booking.findUnique({
      where: { id: Number(bookingId) },
    });

    if (!booking) {
      console.error("[webhook] Booking not found:", bookingId);
      return NextResponse.json({ ok: true });
    }

    if (booking.status === "confirmed") {
      console.log("[webhook] Already confirmed");
      return NextResponse.json({ ok: true });
    }

    await prisma.booking.update({
      where: { id: booking.id },
      data: { status: "confirmed" },
    });

    console.log("[webhook] Booking confirmed:", bookingId);
  }

  return NextResponse.json({ received: true });
}
