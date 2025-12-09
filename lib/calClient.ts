/**
 * Fetches 14-day availability from Cal.com (v1 /slots),
 * normalizes to ISO slots and enforces London timezone.
 */

import { addDays, addMinutes, formatISO } from "date-fns";

const CAL_API_BASE = "https://api.cal.com/v1";

type CalV1SlotsResponse = {
    slots?: {
        [date: string]: { time: string }[];
    };
};

export type NormalizedSlot = {
    start: string;
    end: string;
    duration: number;
};

export async function fetchCalAvailability(eventTypeId: string) {
    const now = new Date();
    const rangeStart = formatISO(now, { representation: "complete" });
    const rangeEnd = formatISO(addDays(now, 14), { representation: "complete" });

    // 🔍 Log básico — não vaza segredo
    console.log("[calClient] fetchCalAvailability()", {
        eventTypeId,
        hasApiKey: !!process.env.CAL_API_KEY,
    });

    const apiKey = process.env.CAL_API_KEY ?? "";

    const url =
        `${CAL_API_BASE}/slots` +
        `?apiKey=${apiKey}` + // ok porque logs abaixo ocultam
        `&eventTypeId=${eventTypeId}` +
        `&startTime=${rangeStart}` +
        `&endTime=${rangeEnd}` +
        `&timeZone=Europe/London`;

    // 🔍 Log da requisição — sem mostrar a key
    console.log("[calClient] Requesting Cal.com", {
        eventTypeId,
        rangeStart,
        rangeEnd,
        timezone: "Europe/London",
        urlPreview: url.replace(apiKey, "***REDACTED***"),
    });

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        // 🔍 Log do status
        console.log("[calClient] Cal.com response status:", res.status);

        const rawBody = await res.text();

        // 🔍 Log do corpo cru (primeiros 500 chars)
        console.log(
            "[calClient] Cal.com raw body:",
            rawBody.slice(0, 500)
        );

        if (!res.ok) {
            throw new Error(`Cal.com returned HTTP ${res.status}`);
        }

        const json = JSON.parse(rawBody) as CalV1SlotsResponse;

        const normalized: NormalizedSlot[] = [];

        if (json.slots) {
            for (const daySlots of Object.values(json.slots)) {
                for (const s of daySlots) {
                    if (!s.time) continue;

                    const start = new Date(s.time);
                    const end = addMinutes(start, 60);

                    normalized.push({
                        start: start.toISOString(),
                        end: end.toISOString(),
                        duration: 60,
                    });
                }
            }
        }

        return {
            range: { start: rangeStart, end: rangeEnd },
            timezone: "Europe/London",
            slots: normalized,
            raw: json,
        };
    } catch (err: any) {
        console.error("[calClient] Error fetching availability:", err);
        throw new Error("CAL_COM_ERROR");
    }
}
