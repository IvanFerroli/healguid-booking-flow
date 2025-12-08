"use client";

/**
 * @file PractitionerPage
 * Public-facing practitioner profile page.
 * Composes all sub-sections into one cohesive layout.
 */

import PractitionerHero from "./PractitionerHero";
import PractitionerMeta from "./PractitionerMeta";
import PractitionerDetails from "./PractitionerDetails";
import PractitionerStats from "./PractitionerStats";
import PractitionerCTA from "./PractitionerCTA";
import PractitionerExpect from "./PractitionerExpect";
import Testimonials from "./Testimonials";
import FooterActions from "./FooterActions";
import type { PractitionerData } from "../types";

interface PractitionerPageProps {
  practitioner: PractitionerData;
}

export default function PractitionerPage({ practitioner }: PractitionerPageProps) {
  return (
    <div className="min-h-screen hg-default-page bg-surface pb-20">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">
        <PractitionerHero practitioner={practitioner} />
        <PractitionerMeta practitioner={practitioner} />
        <PractitionerDetails practitioner={practitioner} />
        <PractitionerStats practitioner={practitioner} />
        <PractitionerCTA practitioner={practitioner} />
        <PractitionerExpect />
        <Testimonials />
        <FooterActions />
      </div>
    </div>
  );
}
