import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchCalAvailability } from "@/lib/calClient";

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;


    try {
        const practitioner = await prisma.practitioner.findUnique({
            where: { id: Number(id) },
        });

        if (!practitioner) {
            return NextResponse.json(
                { error: "Practitioner not found" },
                { status: 404 }
            );
        }

        const availability = await fetchCalAvailability(
            practitioner.eventTypeId.toString()
        );

        return NextResponse.json(
            {
                practitionerId: practitioner.id,
                range: availability.range,
                timezone: availability.timezone,
                // já vem normalizado do calClient
                slots: availability.slots,
            },
            { status: 200 }
        );

    } catch (err: any) {
        console.error("[availability] Error:", err);

        if (err.message === "CAL_COM_ERROR") {
            return NextResponse.json(
                {
                    error: "Failed to load availability",
                    message: "Unable to fetch availability from Cal.com.",
                },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { error: "Unexpected error" },
            { status: 500 }
        );
    }
}
