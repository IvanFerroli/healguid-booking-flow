"use client";

import { groupSlotsByDay } from "./utils/slotUtils";
import { SlotDayGroup } from "./components/SlotDayGroup";

export type Slot = {
    start: string; 
};

type AvailabilityPickerProps = {
    slots: Slot[];
    selectedSlot: string | null;
    /**
     * Chamado quando o usuário clica em um slot.
     * Quando o mesmo slot é clicado novamente, mandamos null (toggle off).
     */
    onSelectSlot: (slot: Slot | null) => void;
};

export function AvailabilityPicker({
    slots,
    selectedSlot,
    onSelectSlot,
}: AvailabilityPickerProps) {
    const groups = groupSlotsByDay(slots);
    if (!slots || slots.length === 0) {
        return (
            <p className="text-sm text-text-muted">
                This practitioner has no available times right now. You can still request a consultation, and we’ll follow up to schedule your session.
            </p>
        );
    }

    return (
        <div className="space-y-6">
            {Object.entries(groups).map(([day, daySlots]) => (
                <SlotDayGroup
                    key={day}
                    day={day}
                    slots={daySlots}
                    selectedSlot={selectedSlot}
                    onSelectSlot={onSelectSlot}
                />
            ))}

            <p className="text-xs text-text-soft">
                Select a slot to continue with your booking.
            </p>
        </div>
    );
}
