import { format, differenceInCalendarDays, startOfDay } from "date-fns";

/**
 * Formats an ISO datetime into a short readable label used in slot buttons.
 * Example: "Mon, 12 Dec, 14:00".
 */

export function formatSlotShort(iso: string): string {
  const d = new Date(iso);

  return format(d, "eee, dd MMM, HH:mm");
}

/**
 * Produces a day header label with contextual handling:
 * - "Today"
 * - "Tomorrow"
 * - or formatted weekday/date for other days.
 */

export function formatDayHeader(iso: string): string {
  const d = new Date(iso);

  const today = startOfDay(new Date());
  const day = startOfDay(d);

  const diffDays = differenceInCalendarDays(day, today);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";

  return format(d, "eeee, d MMM");
}

/**
 * Groups slot objects by date (YYYY-MM-DD) and sorts each day's slots chronologically.
 *
 * @param slots - Array of slot objects containing ISO datetime strings
 * @returns Record keyed by day → sorted slot arrays
 */

export function groupSlotsByDay(slots: { start: string }[]) {
  const groups: Record<string, { start: string }[]> = {};

  for (const slot of slots) {
    const dayKey = slot.start.substring(0, 10); 
    if (!groups[dayKey]) groups[dayKey] = [];
    groups[dayKey].push(slot);
  }

  for (const key of Object.keys(groups)) {
    groups[key] = groups[key].sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );
  }

  return groups;
}
