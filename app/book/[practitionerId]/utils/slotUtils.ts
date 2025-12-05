// app/book/[practitionerId]/utils/slotUtils.ts

export function formatSlotShort(iso: string): string {
  const d = new Date(iso);

  return d.toLocaleString("en-GB", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  });
}

export function formatDayHeader(iso: string): string {
  const d = new Date(iso);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const day = new Date(iso);
  day.setHours(0, 0, 0, 0);

  const diffDays = Math.round((day.getTime() - today.getTime()) / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";

  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}

export function groupSlotsByDay(slots: { start: string }[]) {
  const groups: Record<string, { start: string }[]> = {};

  for (const slot of slots) {
    const dayKey = slot.start.substring(0, 10); // YYYY-MM-DD
    if (!groups[dayKey]) groups[dayKey] = [];
    groups[dayKey].push(slot);
  }

  // Ordena cada grupo por horário
  for (const key of Object.keys(groups)) {
    groups[key] = groups[key].sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );
  }

  return groups;
}
