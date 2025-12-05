"use client";

export type Slot = {
  start: string; // ISO datetime
};

type AvailabilityPickerProps = {
  slots: Slot[];
  selectedSlot: string | null;
  onSelectSlot: (slot: Slot) => void;
};

export function AvailabilityPicker({
  slots,
  selectedSlot,
  onSelectSlot,
}: AvailabilityPickerProps) {
  // Caso não haja slots
  if (!slots || slots.length === 0) {
    return (
      <p className="text-sm text-text-muted">
        No slots available for the next 14 days. This message is a placeholder.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {slots.slice(0, 8).map((slot) => {
          const isSelected = selectedSlot === slot.start;

          return (
            <button
              key={slot.start}
              type="button"
              onClick={() => onSelectSlot(slot)}
              className={`
                w-full rounded-lg border px-3 py-2 text-left text-sm transition-all duration-150 ease-out
                shadow-sm
                ${
                  isSelected
                    ? "bg-brand-orange-soft text-brand-orange border-brand-orange"
                    : "bg-surface text-text-main border-border-soft hover:bg-surface-soft hover:-translate-y-[1px]"
                }
              `}
            >
              {new Date(slot.start).toLocaleString("en-GB", {
                weekday: "short",
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "short",
              })}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-text-soft">
        Placeholder: these slots will later be linked to the actual booking submission.
      </p>
    </div>
  );
}
