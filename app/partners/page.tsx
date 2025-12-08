/**
 * @file PartnersPage
 *
 * Marketing page inviting practitioners to join the HealGuid platform.
 */

export default function PartnersPage() {
        return (
            <main className="min-h-screen hg-default-page bg-surface pt-28 pb-20">
            <div className="hg-section text-center">
                <h1 className="text-4xl font-bold text-brand-teal mb-4">
                Grow Your Holistic Practice
                </h1>

                <p className="text-text-muted max-w-2xl mx-auto mb-8">
                500+ patients currently looking for holistic & functional medicine practitioners.
                </p>

                <a
                href="/partners/apply"
                className="hg-btn-secondary"
                >
                Apply to Join HealGuid
                </a>
            </div>
            </main>
        );
        }
