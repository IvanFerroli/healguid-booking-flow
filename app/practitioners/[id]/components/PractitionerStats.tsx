/**
 * @file PractitionerStats
 *
 * Small presentational grid showing key practitioner metrics:
 * consultation type, languages, rate, satisfaction score,
 * session count, and membership date.
 *
 * All values come from `PractitionerData`. Arrays stored as JSON
 * (e.g. languages) are parsed locally; no logic beyond display.
 */

import type { PractitionerData } from "../types";

interface PractitionerStatsProps {
  practitioner: PractitionerData;
}

export default function PractitionerStats({ practitioner }: PractitionerStatsProps) {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 bg-white border border-border-soft rounded-xl shadow p-6 text-center text-sm gap-6">

      <div>
        <p className="font-medium">Consultation Type</p>
        <p className="text-text-muted">{practitioner.consultationType}</p>
      </div>

      <div>
        <p className="font-medium">Language Spoken</p>
        <p className="text-text-muted">{JSON.parse(practitioner.languages || '[]').join(', ')}</p>
      </div>

      <div>
        <p className="font-medium">Hourly Rate</p>
        <p className="text-text-muted">£{practitioner.hourlyRate}</p>
      </div>

      <div>
        <p className="font-medium">Satisfaction</p>
        <p className="text-text-muted">⭐ {practitioner.satisfactionScore}/5.0</p>
      </div>

      <div>
        <p className="font-medium">Successful Sessions</p>
        <p className="text-text-muted">{practitioner.successfulSessions}</p>
      </div>

      <div>
        <p className="font-medium">Member since</p>
        <p className="text-text-muted">{new Date(practitioner.memberSince).toLocaleDateString()}</p>
      </div>
    </section>
  );
}
