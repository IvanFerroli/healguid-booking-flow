import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const DEFAULT_IMG =
  "https://softr-tables-eu-prod-bucket02.s3.eu-central-1.amazonaws.com/attachments/c831b56d-e5a0-4e54-b44e-1ef030a4fd0b/IBJ24lsZ6ZO3Ad/acebb7f2-1e03-4f42-aa8e-0d25ca5edf1b/f11eef11-4d79-4555-aefa-0be5a3674ab8";

async function main() {
  console.log("🌱 Seeding practitioners...");

  await prisma.booking.deleteMany();
  await prisma.practitioner.deleteMany();

  const practitioners = [
    {
      name: "Benjamin R.",
      title: "Nutritional Therapist",
      imageUrl: DEFAULT_IMG,
      shortBio:
        "Performance-focused nutrition specialist helping clients improve sleep, stress resilience and metabolic health.",
      longBio: `I'm Benjamin, a qualified, regulated, performance-focused nutrition & lifestyle medicine practitioner with a strong focus on enhancing healthspan, body composition, sleep and stress.

Shaped by your priorities, enablers and constraints, we co-create a personalised, science-based, actionable programme. I act as your strategist, your coach to implement high-value interventions, and your educator on the “why”.`,

      tags: JSON.stringify([
        "Hormonal Imbalances",
        "Sleep & Stress Management",
        "Health Optimization",
      ]),
      country: "United Kingdom",
      consultationType: "Virtual",
      languages: JSON.stringify(["English"]),
      experienceYears: 2,
      hourlyRate: 80,
      satisfactionScore: 5.0,
      successfulSessions: "Recently joined HealGuid",
      memberSince: new Date("2025-09-17"),
      professionalAssociations: JSON.stringify([
        "BANT (British Association for Nutrition and Lifestyle Medicine)",
        "CNHC (Complementary and Natural Healthcare Council)",
      ]),

      eventTypeId: "4101916",
      basePrice: 80,
    },

    {
      name: "Christelle S.",
      title: "Functional Medicine Practitioner",
      imageUrl: DEFAULT_IMG,
      shortBio:
        "Helps patients uncover root causes through whole-person functional medicine and personalised investigation.",
      longBio: `I help people who feel lost in the healthcare system finally understand the root causes of their symptoms. My approach combines deep listening, detailed investigation and realistic treatment plans that empower each patient.`,

      tags: JSON.stringify(["Gut Health", "Inflammation", "Women's Health"]),
      country: "United Kingdom",
      consultationType: "Virtual",
      languages: JSON.stringify(["English", "French"]),
      experienceYears: 6,
      hourlyRate: 110,
      satisfactionScore: 4.9,
      successfulSessions: "Over 300 successful sessions",
      memberSince: new Date("2024-03-01"),
      professionalAssociations: JSON.stringify([
        "IFM (Institute for Functional Medicine)",
      ]),
      eventTypeId: "evt_christelle_01",
      basePrice: 110,
    },

    {
      name: "Dr. Ayiesha M.",
      title: "Integrative Medicine Practitioner",
      imageUrl: DEFAULT_IMG,
      shortBio:
        "GP specialising in Functional Medicine for hormonal, metabolic and chronic inflammatory conditions.",
      longBio: `As a GP, I saw firsthand how symptom-based medicine fails complex chronic cases. I use Functional Medicine to understand hormonal, metabolic and gut-driven imbalances, helping patients reclaim their energy and long-term wellness.`,

      tags: JSON.stringify(["Hormones", "Gut Health", "Chronic Illness"]),
      country: "United Kingdom",
      consultationType: "Virtual",
      languages: JSON.stringify(["English"]),
      experienceYears: 10,
      hourlyRate: 150,
      satisfactionScore: 4.8,
      successfulSessions: "Over 500 sessions completed",
      memberSince: new Date("2023-07-15"),
      professionalAssociations: JSON.stringify(["GMC", "IFM Certified"]),
      eventTypeId: "evt_ayiesha_01",
      basePrice: 150,
    },

    {
      name: "Ignacio G.",
      title: "Osteopathic Practitioner",
      imageUrl: DEFAULT_IMG,
      shortBio:
        "Former athlete helping patients overcome chronic pain through osteopathy, breathwork and movement.",
      longBio: `After a career-ending back injury, I discovered osteopathy's power to restore mobility and reduce pain without surgery. I help patients break free from chronic pain cycles using hands-on treatment and targeted movement strategies.`,

      tags: JSON.stringify([
        "Chronic Pain",
        "Musculoskeletal Health",
        "Breathwork",
      ]),
      country: "United States",
      consultationType: "In-person",
      languages: JSON.stringify(["English", "Spanish"]),
      experienceYears: 12,
      hourlyRate: 140,
      satisfactionScore: 4.7,
      successfulSessions: "Thousands of sessions over 12 years",
      memberSince: new Date("2020-02-10"),
      professionalAssociations: JSON.stringify([
        "American Osteopathic Association",
      ]),
      eventTypeId: "evt_ignacio_01",
      basePrice: 140,
    },

    {
      name: "Ines J.",
      title: "Nutritional Therapist",
      imageUrl: DEFAULT_IMG,
      shortBio:
        "Registered dietitian specialising in digestive issues, women's health, burnout and fatigue.",
      longBio: `My approach is deeply personalised and grounded in science and compassion. I help patients uncover root causes behind digestive issues, hormonal imbalance, chronic stress and unexplained fatigue—creating sustainable, realistic plans.`,

      tags: JSON.stringify(["Digestion", "Women's Health", "Autoimmunity"]),
      country: "United Kingdom",
      consultationType: "Virtual",
      languages: JSON.stringify(["English", "Portuguese"]),
      experienceYears: 7,
      hourlyRate: 100,
      satisfactionScore: 5.0,
      successfulSessions: "Highly requested practitioner",
      memberSince: new Date("2024-11-12"),
      professionalAssociations: JSON.stringify(["HCPC", "BDA"]),
      eventTypeId: "evt_ines_01",
      basePrice: 100,
    },

    {
      name: "Jonas M.",
      title: "Integrative Medicine Practitioner",
      imageUrl: DEFAULT_IMG,
      shortBio:
        "Chronic fatigue and post-viral recovery specialist using nutrigenomics and mind-body strategies.",
      longBio: `I treat post-viral fatigue, long COVID and chronic exhaustion using a combination of nutrigenomics, mitochondrial support and behavioural techniques. Patients appreciate my structured, data-driven approach.`,

      tags: JSON.stringify([
        "Chronic Fatigue",
        "Post-Viral Recovery",
        "Mitochondrial Health",
      ]),
      country: "Germany",
      consultationType: "Virtual",
      languages: JSON.stringify(["English", "German"]),
      experienceYears: 8,
      hourlyRate: 120,
      satisfactionScore: 4.9,
      successfulSessions: "Over 400 specialised cases",
      memberSince: new Date("2023-01-30"),
      professionalAssociations: JSON.stringify([
        "European Society of Integrative Medicine",
      ]),
      eventTypeId: "evt_jonas_01",
      basePrice: 120,
    },

    {
      name: "Julia K., RD",
      title: "Functional Medicine Practitioner",
      imageUrl: DEFAULT_IMG,
      shortBio:
        "Gut health specialist supporting patients with IBS, SIBO and food sensitivities.",
      longBio: `My passion for gut health began by caring for my mother. I help patients heal IBS, SIBO and chronic digestive issues using functional nutrition and culturally sensitive interventions.`,

      tags: JSON.stringify(["IBS", "SIBO", "Food Sensitivities"]),
      country: "United States",
      consultationType: "Virtual",
      languages: JSON.stringify(["English", "Korean"]),
      experienceYears: 9,
      hourlyRate: 130,
      satisfactionScore: 4.9,
      successfulSessions: "Top-rated gut practitioner",
      memberSince: new Date("2022-05-19"),
      professionalAssociations: JSON.stringify([
        "Academy of Nutrition and Dietetics",
      ]),
      eventTypeId: "evt_julia_01",
      basePrice: 130,
    },

    {
      name: "Lara S.",
      title: "Nutritional Therapist",
      imageUrl: DEFAULT_IMG,
      shortBio:
        "Therapist specialising in women's health, cancer nutritional support, digestive issues and autoimmune conditions.",
      longBio: `My own challenges with stress, burnout and hormonal imbalance inspired my work. I support women with hormone disorders, digestive issues, autoimmunity and cancer recovery with personalised, compassionate care.`,

      tags: JSON.stringify([
        "Women's Health",
        "Autoimmunity",
        "Cancer Support",
      ]),
      country: "United Kingdom",
      consultationType: "Virtual",
      languages: JSON.stringify(["English"]),
      experienceYears: 11,
      hourlyRate: 115,
      satisfactionScore: 5.0,
      successfulSessions: "Highly experienced practitioner",
      memberSince: new Date("2025-01-08"),
      professionalAssociations: JSON.stringify(["BANT", "CNHC"]),
      eventTypeId: "evt_lara_01",
      basePrice: 115,
    },
  ];

  await prisma.practitioner.createMany({ data: practitioners });

  console.log("🌱 Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
