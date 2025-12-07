import { format, differenceInCalendarDays, startOfDay } from "date-fns";

export function formatSlotShort(iso: string): string {
  const d = new Date(iso);

  return format(d, "eee, dd MMM, HH:mm");
}

export function formatDayHeader(iso: string): string {
  const d = new Date(iso);

  const today = startOfDay(new Date());
  const day = startOfDay(d);

  const diffDays = differenceInCalendarDays(day, today);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";

  return format(d, "eeee, d MMM");
}

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
