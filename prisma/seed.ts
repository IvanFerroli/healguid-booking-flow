import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.practitioner.createMany({
    data: [
      {
        name: "Dr. Emily Carter",
        specialty: "Functional Medicine",
        description: "Expert in gut health and hormonal balance.",
        eventTypeId: "mock-event-1", // troque se usar real
        basePrice: 80,
      },
      {
        name: "Dr. Daniel Hughes",
        specialty: "Integrative Nutrition",
        description: "Focus on metabolic health and weight management.",
        eventTypeId: "mock-event-2",
        basePrice: 80,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
