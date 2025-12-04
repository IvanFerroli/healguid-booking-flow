// /lib/calClient.ts

import { addDays, formatISO } from "date-fns";

const CAL_API_BASE = "https://api.cal.com/v1";

export async function fetchCalAvailability(eventTypeId: string) {
  const now = new Date();
  const rangeStart = formatISO(now, { representation: "complete" });
  const rangeEnd = formatISO(addDays(now, 14), { representation: "complete" });

  const url = `${CAL_API_BASE}/event-types/${eventTypeId}/slots?start=${rangeStart}&end=${rangeEnd}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Caso você use API key do Cal.com:
        Authorization: `Bearer ${process.env.CAL_API_KEY ?? ""}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Cal.com returned HTTP ${res.status}`);
    }

    const data = await res.json();
    return {
      range: { start: rangeStart, end: rangeEnd },
      timezone: data?.timezone ?? "UTC",
      slots: data?.slots ?? [],
      raw: data,
    };
  } catch (err: any) {
    console.error("[calClient] Error fetching availability:", err);
    throw new Error("CAL_COM_ERROR");
  }
}
