"use client";

import { useState } from "react";
import { BookingForm } from "./BookingForm";
import { AvailabilityPicker, Slot } from "./AvailabilityPicker";

type PractitionerInfo = {
    id: number;
    name: string;
    title: string | null;
    longBio: string;
    basePrice: number | null;
};


type BookingClientSectionProps = {
    practitioner: PractitionerInfo;
    slots: Slot[];
    availabilityError: boolean;
    availabilityMode: "live" | "fallback" | "error";
};


export function BookingClientSection({
    practitioner,
    slots,
    availabilityError,
    availabilityMode,
}: BookingClientSectionProps) {
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    function handleSelectSlot(slot: Slot | null) {

        setSelectedSlot(slot ? slot.start : null);
    }

    return (
        <section className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            {/* COLUNA ESQUERDA */}
            <div className="space-y-6">
                {/* Card: Practitioner info */}
                <section className="hg-card">
                    <h2 className="text-xl font-semibold mb-3">Practitioner</h2>

                    <div className="space-y-2">
                        <p className="text-lg font-medium">{practitioner.name}</p>
                        <p className="text-sm text-text-muted">
                            {practitioner.title}
                        </p>


                        <p className="mt-2 text-sm text-text-main">
                            {practitioner.longBio}
                        </p>


                        <p className="mt-4 text-sm font-semibold">
                            Price: £{practitioner.basePrice}
                            <span className="ml-1 text-text-soft text-xs">
                                (typically 60 minutes · pricing may vary for follow-up sessions)
                            </span>
                        </p>

                        <p className="mt-2 text-xs text-text-soft">
                            Cancellation and rescheduling policies apply. You’ll receive full details after submitting your request.
                        </p>
                    </div>
                </section>

                {/* Card: Booking form (usa o selectedSlot) */}
                <section className="hg-card">
                    <BookingForm
                        practitionerId={practitioner.id}
                        selectedSlot={selectedSlot}
                        availabilityMode={availabilityMode}
                    />
                </section>
            </div>

            {/* COLUNA DIREITA - AVAILABILITY + TRUST SIDEBAR */}
            <aside className="space-y-6">
                {/* Availability Picker */}
                <section className="hg-card">
                    <h2 className="text-xl font-semibold mb-2">Choose a time</h2>

                    <p className="text-sm text-text-muted mb-4">
                        These are the current available times. Pick the one that works best for you.
                    </p>


                    {availabilityError ? (
                        <p className="text-sm text-red-500">
                            Unable to load availability at the moment.
                        </p>
                    ) : slots.length === 0 ? (
                        <p className="text-sm text-text-muted">
                            No slots available for the next 14 days. This message is a
                            placeholder and will be refined.
                        </p>
                    ) : (
                        <>
                            <AvailabilityPicker
                                slots={slots}
                                selectedSlot={selectedSlot}
                                onSelectSlot={handleSelectSlot}
                            />

                            {!selectedSlot && (
                                <p className="mt-2 text-xs text-text-soft">
                                    Please select a time slot to continue.
                                </p>
                            )}
                        </>
                    )}
                </section>

                {/* Card: Placeholder de confiança / info lateral */}
                <section className="hg-card">
                    <h3 className="text-sm font-semibold mb-2">
                        What happens after you request?
                    </h3>
                    <ul className="space-y-1 text-xs text-text-soft">
                        <li>• We review the information you provide.</li>
                        <li>• Your practitioner confirms availability.</li>
                        <li>• You receive a confirmation email with all details.</li>
                    </ul>
                </section>
            </aside>
        </section>
    );
}
