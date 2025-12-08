/**
 * @file PractitionerDetails
 *
 * Displays extended practitioner information such as bio, associations,
 * and years of experience.
 */

import type { PractitionerData } from "../types";

export default function PractitionerDetails({ practitioner }: { practitioner: PractitionerData }) {
  return (
    <section className="bg-white rounded-xl border border-border-soft shadow p-6 space-y-4">
      <h2 className="text-lg font-semibold">Why I Help Patients</h2>
      <p className="text-text-main leading-relaxed">{practitioner.longBio}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-border-soft">
        <div>
          <h3 className="font-medium mb-1">Professional Associations</h3>
          <p className="text-sm text-text-muted">{practitioner.professionalAssociations}</p>
        </div>

        <div>
          <h3 className="font-medium mb-1">Experience</h3>
          <p className="text-sm text-text-muted">
            {practitioner.experienceYears} years
          </p>
        </div>
      </div>
    </section>
  );
}
