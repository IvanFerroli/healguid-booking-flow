"use client";

import { formatSlotShort, formatDayHeader } from "./utils/slotUtils";
import type { Slot } from "./types";

type Props = {
  day: string; // YYYY-MM-DD
  slots: Slot[];
  selectedSlot: string | null;
  onSelectSlot: (slot: Slot) => void;
};

export function SlotDayGroup({ day, slots, selectedSlot, onSelectSlot }: Props) {
  return (
    <div className="space-y-2">
      {/* Day header */}
      <h3 className="text-sm font-semibold text-text-main">{formatDayHeader(day)}</h3>

      <div className="grid grid-cols-2 gap-2">
        {slots.map((slot) => {
          const isSelected = selectedSlot === slot.start;

          return (
            <button
              key={slot.start}
              type="button"
              onClick={() => onSelectSlot(slot)}
              className={`
                w-full rounded-lg border px-3 py-2 text-left text-sm transition-all duration-150 ease-out shadow-sm
                ${
                  isSelected
                    ? "bg-brand-orange-soft text-brand-orange border-brand-orange"
                    : "bg-surface text-text-main border-border-soft hover:bg-surface-soft hover:-translate-y-[1px]"
                }
              `}
            >
              {formatSlotShort(slot.start)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
