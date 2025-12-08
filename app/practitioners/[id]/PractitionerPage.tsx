"use client";

import PractitionerHero from "./PractitionerHero";
import PractitionerMeta from "./PractitionerMeta";
import PractitionerDetails from "./PractitionerDetails";
import PractitionerStats from "./PractitionerStats";
import PractitionerCTA from "./PractitionerCTA";
import PractitionerExpect from "./PractitionerExpect";
import Testimonials from "./Testimonials";
import FooterActions from "./FooterActions";
import type { PractitionerData } from "./types";

interface PractitionerPageProps {
  practitioner: PractitionerData;
}


export default function PractitionerPage({ practitioner }: PractitionerPageProps) {
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">

        {/* Hero */}
        <PractitionerHero practitioner={practitioner} />

        {/* Meta row with tags, country, verification */}
        <PractitionerMeta practitioner={practitioner} />

        {/* Bio + credentials + experience */}
        <PractitionerDetails practitioner={practitioner} />

        {/* Stats row */}
        <PractitionerStats practitioner={practitioner} />

        {/* Blue CTA block */}
        <PractitionerCTA practitioner={practitioner} />

        {/* What to expect */}
        <PractitionerExpect />

        {/* Testimonials */}
        <Testimonials />

        {/* Footer actions */}
        <FooterActions />
      </div>
    </div>
  );
}
