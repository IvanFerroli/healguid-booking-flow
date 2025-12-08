import type { PractitionerData } from "./types";

interface PractitionerMetaProps {
  practitioner: PractitionerData;
}

export default function PractitionerMeta({ practitioner }: PractitionerMetaProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <span className="bg-brand-teal-soft text-brand-teal px-3 py-1 rounded-full text-sm">
        HealGuid Verified
      </span>
      <span className="bg-brand-orange-soft text-brand-orange px-3 py-1 rounded-full text-sm">
        Certified Practitioner
      </span>
    </div>
  );
}
