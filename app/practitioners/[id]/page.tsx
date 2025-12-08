import { prisma } from "@/lib/prisma";
import PractitionerPage from "./components/PractitionerPage";

/**
 * Practitioner profile page (RSC).
 *
 * - Next.js 15/16 passes `params` as a Promise → must `await` props.params.
 * - Validates practitioner ID from route.
 * - Fetches practitioner from Prisma and renders PractitionerPage (client layout).
 *
 * Keep this file minimal: all UI lives in PractitionerPage and its children.
 */

export default async function Page(props: { params: Promise<{ id: string }> }) {

  const { id } = await props.params;
  const practitionerId = Number(id);

  if (!practitionerId || Number.isNaN(practitionerId)) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h1 className="text-2xl font-semibold text-text-main">
          Invalid practitioner ID
        </h1>
      </div>
    );
  }

  const practitioner = await prisma.practitioner.findUnique({
    where: { id: practitionerId },
  });

  if (!practitioner) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h1 className="text-2xl font-semibold text-text-main">
          Practitioner not found
        </h1>
      </div>
    );
  }

  return <PractitionerPage practitioner={practitioner} />;
}
