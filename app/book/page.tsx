import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PractitionerFiltersClient from "./PractitionerFiltersClient";

export const revalidate = 0;

export default async function PractitionersDirectoryPage() {
  const practitioners = await prisma.practitioner.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      title: true,
      imageUrl: true,
      shortBio: true,
      country: true,
      consultationType: true,
    },
  });

  return (
    <main className="min-h-screen hg-default-page bg-page-cream pb-20">
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

      {/* SEARCH + LIST */}
      <section className="hg-section mt-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-teal mb-6">
          Find Your Holistic Health Practitioner | HealGuid
        </h2>
        <p className="text-text-muted mb-6">
          Explore and book verified holistic practitioners worldwide who truly
          understand your unique health story.
        </p>

        {/* Filtros + Grid de cards (lado client) */}
        <PractitionerFiltersClient practitioners={practitioners} />

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
        <Link
          href="/partners/apply"
          className="hg-btn-secondary bg-brand-teal text-white hover:bg-brand-teal-soft"
        >
          Apply to Join
        </Link>
      </section>
    </main>
  );
}
