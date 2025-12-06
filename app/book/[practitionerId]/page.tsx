// app/book/[practitionerId]/page.tsx

import { prisma } from "@/lib/prisma";
import { BookingClientSection } from "./BookingClientSection";
export const dynamic = "force-dynamic"; // garante que a página pode mostrar loading real
import { Suspense } from "react";
import { LoadingAvailability } from "./LoadingAvailability";


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

    type AvailabilityResult = {
        mode: "live" | "fallback" | "error";
        slots: { start: string }[];
    };

    async function fetchAvailability(): Promise<AvailabilityResult> {
        try {
            const baseUrl =
                process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

            const res = await fetch(
                `${baseUrl}/api/practitioners/${practitioner.id}/availability`,
                { cache: "no-store" }
            );

            if (!res.ok) {
                return { mode: "error", slots: [] };
            }

            const data = await res.json();

            return {
                mode: "live",
                slots: Array.isArray(data.slots) ? data.slots : [],
            };
        } catch (err) {
            console.error("[book/page] availability error:", err);
            return { mode: "error", slots: [] };
        }
    }

    // artificial delay para simular loading real
    await new Promise((r) => setTimeout(r, 400));


    const availability = await fetchAvailability();

    let slots = availability.slots;
    let availabilityMode = availability.mode;

    // Fallback temporário: ainda queremos UX funcional mesmo quando API falha
    if (availabilityMode === "error" && slots.length === 0) {
        const now = new Date();

        slots = Array.from({ length: 6 }).map((_, i) => ({
            start: new Date(
                now.getTime() + (i + 1) * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000
            ).toISOString(),
        }));

        availabilityMode = "fallback"; // <-- chave do sucesso
    }


    // -------------------------------------
    // 4) Layout HealGuid-like com placeholders
    // -------------------------------------
    return (
        <div className="min-h-screen bg-page-cream px-4 py-10">
            <main className="hg-section space-y-12">
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
                            You’re requesting a consultation with a HealGuid practitioner. After you send
                            your details, we’ll help match you with the most suitable support based on
                            your goals and preferences.
                        </p>


                        <p className="text-xs text-text-soft">
                            Evidence-based · Vetted practitioners · Secure and confidential
                        </p>

                    </div>
                </header>

                {availabilityMode === "error" && (
                    <p className="text-sm text-red-500">
                        Unable to load live availability at the moment.
                    </p>
                )}

                {availabilityMode === "fallback" && (
                    <p className="text-sm text-amber-600">
                        Showing example times while we reconnect to the provider.
                    </p>
                )}


                {/* MAIN GRID: LEFT (info + form) / RIGHT (availability) */}
                <Suspense fallback={<LoadingAvailability />}>
                    <BookingClientSection
                        practitioner={practitioner}
                        slots={slots}
                        availabilityError={availabilityMode === "error"}
                        availabilityMode={availabilityMode}
                    />
                </Suspense>





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
