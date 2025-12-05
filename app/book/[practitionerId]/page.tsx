// app/book/[practitionerId]/page.tsx

import { prisma } from "@/lib/prisma";
import { BookingClientSection } from "./BookingClientSection";


type PageProps = {
    params: Promise<{ practitionerId: string }>; // <- params é Promise
};

export default async function Page({ params }: PageProps) {
    // 🔥 Necessário no Next 16 / Turbopack
    const { practitionerId } = await params;

    // -------------------------------------
    // Normaliza o ID
    // -------------------------------------
    const id = Number(practitionerId);

    if (!Number.isInteger(id) || id <= 0) {
        return (
            <div className="min-h-screen px-6 py-10 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-red-600">
                    Practitioner not found
                </h1>
                <p className="text-gray-700">
                    The practitioner ID "{String(practitionerId)}" is invalid.
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
    // Busca o practitioner
    // -------------------------------------
    const practitioner = await prisma.practitioner.findUnique({
        where: { id },
    });

    if (!practitioner) {
        return (
            <div className="min-h-screen px-6 py-10 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-red-600">
                    Practitioner not found
                </h1>
                <p className="text-gray-700">
                    The practitioner with ID {id} does not exist.
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
    // 2) Tratamento: practitioner inexistente
    // -------------------------------------
    if (!practitioner) {
        return (
            <div className="min-h-screen px-6 py-10 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-red-600">
                    Practitioner not found
                </h1>
                <p className="text-gray-700">
                    The practitioner with ID {id} does not exist.
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
    // 3) Buscar availability na API interna (server-side)
    //    - por enquanto, só para exibir slots desabilitados
    // -------------------------------------
    async function fetchAvailability() {
        try {
            const baseUrl =
                process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

            const res = await fetch(
                `${baseUrl}/api/practitioners/${practitioner.id}/availability`,
                { cache: "no-store" }
            );

            if (!res.ok) {
                return { error: true, slots: [] };
            }

            return res.json();
        } catch (err) {
            console.error("[book/page] availability error:", err);
            return { error: true, slots: [] };
        }
    }

    // const availability = await fetchAvailability();
    // const slots = Array.isArray(availability.slots) ? availability.slots : [];
    // const availabilityError = !!availability.error;

    const availability = await fetchAvailability();

    let slots = Array.isArray(availability.slots) ? availability.slots : [];
    let availabilityError = !!availability.error;

    // Fallback temporário: se deu erro e não veio slot nenhum,
    // gera alguns slots fake só pra validar a UX da seleção.
    if (availabilityError && slots.length === 0) {
        const now = new Date();

        slots = Array.from({ length: 6 }).map((_, i) => ({
            start: new Date(
                now.getTime() + (i + 1) * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 // próximos dias às 14:00
            ).toISOString(),
        }));

        availabilityError = false; // trata fallback como "ok" pro front
    }


    // -------------------------------------
    // 4) Layout HealGuid-like com placeholders
    // -------------------------------------
    return (
        <div className="min-h-screen bg-page-cream px-4 py-10">
            <main className="hg-section space-y-10">
                {/* HEADER / HERO */}
                <header className="space-y-3">
                    {/* Breadcrumb simples */}
                    <a
                        href="/"
                        className="text-sm text-brand-teal underline-offset-2 hover:underline"
                    >
                        ← Back to all practitioners
                    </a>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">
                            Book with {practitioner.name}
                        </h1>

                        <p className="text-sm text-text-muted max-w-2xl">
                            Placeholder copy: short paragraph explaining that you&apos;re
                            requesting a consultation with a HealGuid practitioner and what
                            typically happens next. This will be refined later to match the
                            real page.
                        </p>

                        <p className="text-xs text-text-soft">
                            Placeholder: trust badges line (e.g. evidence-based, vetted
                            practitioners, data-secure). To be refined later.
                        </p>
                    </div>
                </header>

                {availabilityError && (
                    <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
                        We&apos;re temporarily unable to sync live availability, so the times shown
                        below are example slots for now.
                    </p>
                )}


                {/* MAIN GRID: LEFT (info + form) / RIGHT (availability) */}
                <BookingClientSection
                    practitioner={practitioner}
                    slots={slots}
                    availabilityError={availabilityError}
                />


                {/* SEÇÕES INFERIORES - PLACEHOLDERS SIMPLES */}
                <section className="grid gap-6 lg:grid-cols-3">
                    <div className="hg-card">
                        <h3 className="text-sm font-semibold mb-2">
                            What to expect from your first consultation
                        </h3>
                        <p className="text-sm text-text-muted">
                            Placeholder: bullet points / short paragraphs describing how a
                            typical first session works (duration, focus, format).
                        </p>
                    </div>

                    <div className="hg-card">
                        <h3 className="text-sm font-semibold mb-2">
                            Our approach
                        </h3>
                        <p className="text-sm text-text-muted">
                            Placeholder: short copy about evidence-based integrated care,
                            collaboration, and long-term support, mirroring the HealGuid
                            brand tone.
                        </p>
                    </div>

                    <div className="hg-card">
                        <h3 className="text-sm font-semibold mb-2">
                            FAQs
                        </h3>
                        <p className="text-sm text-text-muted">
                            Placeholder: a couple of example questions (e.g. &quot;Can I
                            change practitioner?&quot;, &quot;What if I&apos;m not sure what
                            I need?&quot;) to be turned into real FAQ later.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}
