/**
 * @file PractitionerHero
 *
 * Displays the practitioner’s main header section:
 * photo, name, title, country, tags and the primary CTA.
 *
 * Notes:
 * - `practitioner.tags` is stored in the DB as a JSON string,
 *   so we parse it here to render tag pills.
 */

import Image from "next/image";
import Link from "next/link";
import type { PractitionerData } from "../types";

interface PractitionerHeroProps {
  practitioner: PractitionerData;
}

export default function PractitionerHero({ practitioner }: PractitionerHeroProps) {
  return (
    <section className="bg-white rounded-xl border border-border-soft shadow p-6 flex items-center gap-6">
      <Image
        src={practitioner.imageUrl}
        width={110}
        height={110}
        alt={practitioner.name}
        className="rounded-xl object-cover"
      />

      <div className="flex-1 space-y-1">
        <h1 className="text-xl font-semibold text-text-main">
          {practitioner.name} · {practitioner.title}
        </h1>

        <div className="flex flex-wrap gap-2">
          {JSON.parse(practitioner.tags || '[]').map((s: string) => (
            <span key={s} className="hg-pill px-3 py-1">
              {s}
            </span>
          ))}
        </div>

        <div className="text-sm text-text-muted">{practitioner.country}</div>
      </div>

      <Link
        href={`/book/${practitioner.id}`}
        className="hg-practitioner-cta"
      >
        <span className="sm:hidden">Book</span>
        <span className="hidden sm:inline">Request Consultation</span>
      </Link>

    </section>
  );
}
