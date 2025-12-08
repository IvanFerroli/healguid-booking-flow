import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function PractitionersDirectoryPage() {
    const practitioners = await prisma.practitioner.findMany({
        orderBy: { name: "asc" },
    });

    return (
        <main className="min-h-screen bg-page-cream pb-20">
            {/* TOP BANNER */}
            <section className="bg-surface py-10 border-b border-border-soft">
                <div className="hg-section text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-brand-teal mb-4">
                        Book Verified Functional & Holistic Practitioners in the UK
                    </h1>
                    <p className="text-text-muted max-w-3xl mx-auto">
                        Connect with verified practitioners who identify and treat the root
                        causes of illness through personalised, science-based care.
                    </p>

                    <div className="flex justify-center gap-6 mt-6 text-sm text-text-muted">
                        <div>🟢 100% Verified Practitioners</div>
                        <div>💬 Free Patient Matching</div>
                        <div>⚡ Easy Booking</div>
                    </div>
                </div>
            </section>

            {/* SEARCH TITLE */}
            <section className="hg-section mt-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-teal mb-6">
                    Find Your Holistic Health Practitioner | HealGuid
                </h2>
                <p className="text-text-muted mb-6">
                    Explore and book verified holistic practitioners worldwide who truly
                    understand your unique health story.
                </p>

                {/* Search + Filters (placeholder for now) */}
                <div className="flex flex-wrap gap-4 mb-10">
                    <input
                        placeholder="Search"
                        className="flex-1 min-w-[200px] px-4 py-3 border border-border-soft rounded-xl"
                    />

                    <select className="px-4 py-3 border border-border-soft rounded-xl">
                        <option>Speciality</option>
                    </select>

                    <select className="px-4 py-3 border border-border-soft rounded-xl">
                        <option>Practitioner Type</option>
                    </select>
                </div>

                {/* GRID LIST */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {practitioners.map((p: PractitionerProps) => (
                        <PractitionerCard key={p.id} practitioner={p} />
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <button className="hg-btn-secondary">Load more</button>
                </div>
            </section>

            {/* FOOTER CTA */}
            <section className="mt-16 bg-surface border-t border-border-soft py-10 text-center">
                <p className="text-brand-teal font-semibold text-lg mb-2">
                    Are you a holistic health expert?
                </p>
                <p className="text-text-muted mb-6">
                    We’re currently welcoming new practitioners to join our growing
                    worldwide holistic community.
                </p>
                <Link href="/partners/apply" className="hg-btn-primary">
                    Apply to Join
                </Link>
            </section>
        </main>
    );
}

/* -------------------- CARD COMPONENT -------------------- */

type PractitionerProps = {
    id: number;
    name: string;
    title: string | null;
    imageUrl: string;
    shortBio: string;
    country: string;
    consultationType: string;
};

function PractitionerCard({
    practitioner,
}: {
    practitioner: PractitionerProps;
}) {
    return (
        <div className="bg-white rounded-2xl border border-border-soft shadow-sm overflow-hidden hover:shadow-lg transition">
            {/* IMAGE */}
            <div className="w-full h-72 bg-surface-soft relative">
                <Image
                    src={practitioner.imageUrl}
                    alt={practitioner.name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* CONTENT */}
            <div className="p-5 flex flex-col gap-3">
                <h3 className="font-bold text-lg text-text-main">
                    {practitioner.name}
                </h3>
                <p className="text-sm text-brand-teal font-medium">
                    {practitioner.title}
                </p>

                {/* RATING FAKE POR AGORA */}
                <div className="text-brand-orange text-sm">★★★★★</div>

                {/* SHORT BIO */}
                <p className="text-xs text-text-muted line-clamp-3">
                    {practitioner.shortBio}
                </p>

                {/* COUNTRY + CONSULTATION TYPE */}
                <div className="flex justify-between items-center mt-2 text-xs">
                    <span>🌍 {practitioner.country}</span>
                    <span
                        className={`px-2 py-1 rounded-md border text-[10px] ${practitioner.consultationType === "Virtual"
                            ? "bg-brand-orange-soft border-brand-orange-soft"
                            : "bg-brand-teal-soft border-brand-teal-soft"
                            }`}
                    >
                        {practitioner.consultationType}
                    </span>
                </div>

                {/* CTA BUTTONS */}
                <div className="mt-4 flex items-center gap-3 w-full">

                    {/* PROFILE BUTTON (sem texto, só ícone, mesmo tamanho do Book Now) */}
                    <Link
                        href={`/practitioners/${practitioner.id}`}
                        className="
      flex items-center justify-center
      h-12 w-12
      rounded-full
      bg-brand-teal
      text-white
      shadow-sm
      hover:bg-brand-teal-dark
      transition
    "
                    >
                        {/* Ícone provisório — substitui pelo Flaticon/Lucide depois */}
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth='2'
                            className='w-6 h-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z'
                            />
                        </svg>
                    </Link>

                    {/* BOOK NOW (laranja, mesmo raio/altura) */}
                    <Link
                        href={`/book/${practitioner.id}`}
                        className="
      flex-1 flex items-center justify-center
      h-12
      rounded-full
      bg-brand-orange
      text-white font-semibold
      hover:bg-brand-orange-dark
      shadow-sm
      transition
    "
                    >
                        Book Now
                    </Link>

                </div>


            </div>
        </div>
    );
}
