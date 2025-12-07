import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.payment_status !== "paid") {
            console.log(
                "[webhook] Session completed but payment not paid. Status:",
                session.payment_status
            );
            return NextResponse.json({ ok: true });
        }

        let bookingId = session.metadata?.bookingId;


        let booking = null as any;

        if (bookingId) {
            booking = await prisma.booking.findUnique({ where: { id: Number(bookingId) } });
            if (!booking) {
                console.error("[webhook] Booking not found by metadata bookingId:", bookingId);
            }
        }

        if (!booking) {
            console.log("[webhook] metadata.bookingId missing or lookup failed, trying stripeSessionId lookup (session.id)");
            try {
                booking = await prisma.booking.findFirst({ where: { stripeSessionId: session.id } });
                if (booking) {
                    bookingId = String(booking.id);
                    console.log("[webhook] Found booking by stripeSessionId:", bookingId);
                }
            } catch (lookupErr) {
                console.error("[webhook] stripeSessionId lookup error:", lookupErr);
            }
        }

        if (!booking) {
            console.error("[webhook] Booking not found (metadata and stripeSessionId lookup both failed)");
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
