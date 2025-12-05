import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding practitioners...");

  // 1) Apagar bookings primeiro (FK)
  await prisma.booking.deleteMany();

  // 2) Agora sim apagar practitioners
  await prisma.practitioner.deleteMany();

  // 3) Criar practitioners ricos
  await prisma.practitioner.createMany({
    data: [
      {
        name: "Dr. Emily Carter",
        specialty: "Functional Medicine • Gut Health",
        description:
          "Specialist in gut microbiome, detox pathways, and inflammatory markers. Uses advanced testing to optimize digestive function and restore metabolic balance.",
        eventTypeId: "evt_emily_gut_01",
        basePrice: 95,
      },
      {
        name: "Dr. Daniel Hughes",
        specialty: "Integrative Nutrition • Metabolic Health",
        description:
          "Focuses on insulin sensitivity, micronutrient analysis, and sustainable weight management. Strong emphasis on lifestyle interventions and metabolic repair.",
        eventTypeId: "evt_daniel_metabolic_01",
        basePrice: 85,
      },
      {
        name: "Dr. Sofia Bennett",
        specialty: "Women's Health • Hormonal Optimization",
        description:
          "Expert in PMS, menopause transition, PCOS, and low estrogen states. Provides evidence-based protocols for endocrine balance and long-term vitality.",
        eventTypeId: "evt_sofia_hormones_01",
        basePrice: 120,
      },
      {
        name: "Dr. Lucas Ward",
        specialty: "Sleep Medicine • Circadian Rhythm",
        description:
          "Works with sleep dysregulation, chronic fatigue, and circadian misalignment. Incorporates behavioral strategies and biofeedback-driven optimization.",
        eventTypeId: "evt_lucas_sleep_01",
        basePrice: 110,
      },
      {
        name: "Dr. Hannah Stone",
        specialty: "Autoimmune Conditions • Inflammation",
        description:
          "Treats systemic inflammation, Hashimoto’s, rheumatoid arthritis, and chronic immune activation. Uses functional testing to personalize recovery protocols.",
        eventTypeId: "evt_hannah_autoimmune_01",
        basePrice: 130,
      },
      {
        name: "Dr. Marcus Hale",
        specialty: "Longevity • Performance Medicine",
        description:
          "Combines biomarker-driven longevity strategies with performance enhancement. Works with cardiovascular risk reduction, mitochondrial efficiency, and aging pathways.",
        eventTypeId: "evt_marcus_longevity_01",
        basePrice: 150,
      },
    ],
  });

  console.log("🌱 Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
