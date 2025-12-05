// app/book/[practitionerId]/page.tsx

import { prisma } from "@/lib/prisma";

type PageProps = {
    params: { practitionerId: string };
};

export default async function Page({ params }: { params: Promise<{ practitionerId: string }> }) {
    const { practitionerId } = await params;
    const id = Number(practitionerId);


    // -------------------------------------
    // 1) Buscar practitioner no banco (server-side)
    // -------------------------------------
    const practitioner = await prisma.practitioner.findUnique({
        where: { id: Number(practitionerId) },
    });

    // -------------------------------------
    // 2) Tratamento: practitioner inexistente
    // -------------------------------------
    if (!practitioner) {
        return (
            <div className="min-h-screen px-6 py-10 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-red-600">
                    Practitioner not found
                </h1>
                <p className="text-gray-700">
                    The practitioner with ID {practitionerId} does not exist.
                </p>

                <a
                    href="/"
                    className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Return to home
                </a>
            </div>
        );
    }

    // -------------------------------------
    // 3) Página com dados reais do practitioner
    // -------------------------------------
    return (
        <div className="min-h-screen px-6 py-10 max-w-3xl mx-auto">
            {/* HEADER */}
            <header className="mb-10">
                <h1 className="text-3xl font-bold">
                    Booking with {practitioner.name}
                </h1>

                <p className="text-gray-600 mt-2">
                    Select an available slot and complete your reservation.
                </p>
            </header>

            {/* PRACTITIONER INFO */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-3">Practitioner</h2>

                <div className="p-4 border rounded-lg bg-gray-50">
                    <p className="text-lg font-medium">{practitioner.name}</p>
                    <p className="text-gray-700">{practitioner.specialty}</p>

                    <p className="mt-2 text-gray-600">
                        {practitioner.description}
                    </p>

                    <p className="mt-4 font-semibold">
                        Price: £{practitioner.basePrice}
                    </p>
                </div>
            </section>

            {/* AVAILABILITY - fully implemented */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-3">Available Slots</h2>

                <div className="p-4 border rounded-lg bg-gray-50">
                    {(() => {
                        // 1) Buscar availability da API interna
                        const fetchAvailability = async () => {
                            const res = await fetch(
                                `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/practitioners/${id}/availability`,
                                { cache: "no-store" }
                            );

                            if (!res.ok) {
                                return { error: true, slots: [] };
                            }

                            return res.json();
                        };

                        const availabilityPromise = fetchAvailability();

                        // 2) Render server-side suspense-like
                        return (
                            <AsyncAvailability promise={availabilityPromise} />
                        );
                    })()}
                </div>
            </section>


            {/* FORM - placeholder */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-3">Your Information</h2>

                <div className="p-4 border rounded-lg bg-gray-50">
                    {/* TODO Task 4 */}
                    <p className="text-gray-700">
                        The booking form will go here.
                    </p>
                </div>
            </section>

            {/* CTA - placeholder */}
            <section className="mt-10">
                <div className="p-4 border rounded-lg bg-gray-50">
                    {/* TODO Task 5 */}
                    <p className="text-gray-700">
                        The final booking action will appear here.
                    </p>
                </div>
            </section>
        </div>
    );

    // ----------------------------------------------
    // Server Component para renderizar availability
    // ----------------------------------------------
    async function AsyncAvailability({
        promise,
    }: {
        promise: Promise<any>;
    }) {
        const availability = await promise;

        if (availability.error) {
            return (
                <p className="text-red-600">
                    Unable to load availability at the moment.
                </p>
            );
        }

        if (!availability.slots || availability.slots.length === 0) {
            return (
                <p className="text-gray-700">
                    No slots available for the next 14 days.
                </p>
            );
        }

        return (
            <div className="grid grid-cols-2 gap-3">
                {availability.slots.map((slot: any) => (
                    <button
                        key={slot.start}
                        disabled
                        className="px-3 py-2 bg-white border rounded shadow-sm text-left"
                    >
                        {/* Convertendo ISO para horário legível */}
                        {new Date(slot.start).toLocaleString("en-GB", {
                            weekday: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                            day: "2-digit",
                            month: "short",
                        })}
                    </button>
                ))}
            </div>
        );
    }

}
