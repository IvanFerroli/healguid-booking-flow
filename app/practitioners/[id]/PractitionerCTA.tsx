import Link from "next/link";
import type { PractitionerData } from "./types";

interface PractitionerCTAProps {
  practitioner: PractitionerData;
}



export default function PractitionerCTA({ practitioner }: PractitionerCTAProps) {
  return (
    <section className="border border-brand-teal/20 bg-brand-teal-soft/10 rounded-xl shadow p-10 text-center space-y-6">
      <h2 className="text-lg font-semibold">
        Request Your Consultation with {practitioner.name}
      </h2>

      <div className="text-sm text-text-muted space-y-1">
        <p>✔ Verified Top Practitioner</p>
        <p>✔ Real Human Support</p>
        <p>✔ 60–90 min comprehensive assessment</p>
        <p>✔ Personalised health plan</p>
      </div>

      <Link
        href={`/book/${practitioner.id}`}
        className="hg-btn-primary bg-brand-orange hover:bg-brand-orange-soft"
      >
        Request Consultation
      </Link>
    </section>
  );
}
