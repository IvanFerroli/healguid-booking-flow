export function getSelectedSlotLabel(selectedSlot: string | null): string {
  if (!selectedSlot) return "";

  return new Date(selectedSlot).toLocaleString("en-GB", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  });
}
