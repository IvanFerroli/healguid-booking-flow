/**
 * Formats a selected ISO datetime into a human-friendly label for display.
 *
 * @param selectedSlot - ISO string or null
 * @returns Localised string (e.g. "Mon, 14:00, 12 Dec") or empty string if none
 */

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
