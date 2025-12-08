/**
 * @file PractitionerCard component
 *
 * Displays practitioner summary info with photo, bio, and navigation
 * links to the profile page and booking flow.
 */

"use client";

import Image from "next/image";
import Link from "next/link";

export type PractitionerCardProps = {
  id: number;
  name: string;
  title: string | null;
  imageUrl: string;
  shortBio: string;
  country: string;
  consultationType: string;
};

export default function PractitionerCard({
  practitioner,
}: {
  practitioner: PractitionerCardProps;
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
        {/* NAME */}
        <h3 className="font-bold text-lg text-text-main">
          {practitioner.name}
        </h3>

        {/* TITLE */}
        <p className="text-sm text-brand-teal font-medium">
          {practitioner.title}
        </p>

        {/* RATING (placeholder) */}
        <div className="text-brand-orange text-sm">★★★★★</div>

        {/* SHORT BIO */}
        <p className="text-xs text-text-muted line-clamp-3">
          {practitioner.shortBio}
        </p>

        {/* COUNTRY + CONSULTATION TYPE */}
        <div className="flex justify-between items-center mt-2 text-xs">
          <span>🌍 {practitioner.country}</span>

          <span
            className={`px-2 py-1 rounded-md border text-[10px] ${
              practitioner.consultationType === "Virtual"
                ? "bg-brand-orange-soft border-brand-orange-soft"
                : "bg-brand-teal-soft border-brand-teal-soft"
            }`}
          >
            {practitioner.consultationType}
          </span>
        </div>

        {/* CTA BUTTONS */}
        <div className="mt-4 flex items-center gap-3 w-full">

          {/* PROFILE BUTTON (teal, icon only) */}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z"
              />
            </svg>
          </Link>

          {/* BOOK NOW BUTTON (orange pill) */}
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
