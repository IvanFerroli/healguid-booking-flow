"use client";

import { useState } from "react";
import { BookingForm } from "./BookingForm";
import { AvailabilityPicker } from "./AvailabilityPicker";
import type { Slot } from "./AvailabilityPicker";

type BookingFlowClientProps = {
    practitionerId: number;
    slots: Slot[];
};

export function BookingFlowClient({ practitionerId, slots }: BookingFlowClientProps) {
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    return (
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">

            {/* LEFT – FORM */}
            <section className="space-y-6">
                <div className="hg-card">
                    <BookingForm practitionerId={practitionerId} selectedSlot={selectedSlot} />
                </div>
            </section>

            {/* RIGHT – AVAILABILITY */}
            <aside className="space-y-4">
                <div className="hg-card">
                    <h2 className="text-xl font-semibold mb-2">Choose a time</h2>

                    <p className="text-sm text-text-muted mb-4">
                        Select an available slot to continue your booking.
                    </p>

                    <AvailabilityPicker
                        slots={slots}
                        selectedSlot={selectedSlot}
                        onSelectSlot={(slot: Slot) => setSelectedSlot(slot.start)}
                    />

                </div>

                <div className="hg-card">
                    <h3 className="text-sm font-semibold mb-2">What happens next?</h3>
                    <ul className="space-y-1 text-xs text-text-soft">
                        <li>• We review your information</li>
                        <li>• Your practitioner confirms the booking</li>
                        <li>• You receive all session details via email</li>
                    </ul>
                </div>
            </aside>

        </div>
    );
}
