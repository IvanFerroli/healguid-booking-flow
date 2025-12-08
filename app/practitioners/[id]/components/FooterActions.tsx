/**
 * @file FooterActions
 *
 * Simple CTA section shown at the bottom of practitioner pages.
 */

import Link from "next/link";

export default function FooterActions() {
  return (
    <div className="flex justify-center gap-4 py-10">
      <Link
        href="/specialists"
        className="hg-btn-primary bg-brand-orange-soft text-brand-orange"
      >
        Browse other practitioners
      </Link>

      <Link href="/contact" className="hg-btn-primary bg-surface-soft">
        Still have questions?
      </Link>
    </div>
  );
}
