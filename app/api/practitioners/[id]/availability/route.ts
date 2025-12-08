/**
 * @file Practitioner availability route (GET /api/practitioners/[id]/availability)
 *
 * Summary:
 *   Retrieves normalized availability data for a specific practitioner by delegating
 *   to the Cal.com API through the fetchCalAvailability client.
 *
 * Responsibilities:
 *   - Parse practitioner ID from route params
 *   - Validate the practitioner exists in the database
 *   - Query Cal.com for available slots for the practitioner's eventTypeId
 *   - Return a normalized availability payload (range, timezone, slots[])
 *
 * Inputs:
 *   Route params:
 *     - id: practitioner ID (string → number)
 *
 * Outputs:
 *   - 200: availability payload ({ practitionerId, range, timezone, slots })
 *   - 404: practitioner not found
 *   - 503: Cal.com unreachable or provider error
 *   - 500: internal server error
 *
 * Notes:
 *   - All slot normalization (dates, shapes, ordering) is handled inside fetchCalAvailability.
 *   - Error "CAL_COM_ERROR" is intentionally rethrown by the Cal client to allow
 *     differentiated 503 responses at the API route level.
 *   - This endpoint directly supports the booking page (/book/[id]) by enabling slot selection.
 */

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
