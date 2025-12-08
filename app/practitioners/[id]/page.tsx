// app/practitioners/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import PractitionerPage from "./PractitionerPage";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  // 🔥 Next.js 16 RSC: params é Promise — precisamos await
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
