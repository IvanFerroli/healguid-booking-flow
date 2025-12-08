/**
 * @file AvailabilityPicker component
 *
 * Renders grouped time slots and allows users to select or toggle a slot.
 */

"use client";

import { groupSlotsByDay } from "../utils/slotUtils";
import { SlotDayGroup } from "./SlotDayGroup";

export type Slot = {
    start: string; 
};

type AvailabilityPickerProps = {
    slots: Slot[];
    selectedSlot: string | null;
   
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
