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
      imageUrl: "/images/pratictioners/hg_benjamin_r.jpg",
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

      eventTypeId: "4107320",
      basePrice: 80,
    },

    {
      name: "Christelle S.",
      title: "Functional Medicine Practitioner",
      imageUrl: "/images/pratictioners/hg_christelle_s.jpg",
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
      eventTypeId: "4107334",
      basePrice: 110,
    },

    {
      name: "Dr. Ayiesha M.",
      title: "Integrative Medicine Practitioner",
      imageUrl: "/images/pratictioners/hg_ayiesha_m.jpg",
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
      eventTypeId: "4107353",
      basePrice: 150,
    },

    {
      name: "Ignacio G.",
      title: "Osteopathic Practitioner",
      imageUrl: "/images/pratictioners/hg_ignacio_g.jpg",
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
      eventTypeId: "4107357",
      basePrice: 140,
    },

    {
      name: "Ines J.",
      title: "Nutritional Therapist",
      imageUrl: "/images/pratictioners/hg_ines_j.jpg",
      shortBio:
        "Registered dietitian specialising in digestive issues, women's health, burnout and fatigue.",
      longBio: `My approach is deeply personalised and grounded in science and compassion. I help patients uncover root causes behind digestive issues, hormonal imbalance, chronic stress and unexplained fatigue—creating sustainable, realistic plans.`,

      tags: JSON.stringify(["Digestion", "Women's Health", "Autoimmunity"]),
      country: "United Kingdom",
      consultationType: "In-person",
      languages: JSON.stringify(["English", "Portuguese"]),
      experienceYears: 7,
      hourlyRate: 100,
      satisfactionScore: 5.0,
      successfulSessions: "Highly requested practitioner",
      memberSince: new Date("2024-11-12"),
      professionalAssociations: JSON.stringify(["HCPC", "BDA"]),
      eventTypeId: "4107361",
      basePrice: 100,
    },

    {
      name: "Jonas M.",
      title: "Integrative Medicine Practitioner",
      imageUrl: "/images/pratictioners/hg_jonas_m.jpg",
      shortBio:
        "Chronic fatigue and post-viral recovery specialist using nutrigenomics and mind-body strategies.",
      longBio: `I treat post-viral fatigue, long COVID and chronic exhaustion using a combination of nutrigenomics, mitochondrial support and behavioural techniques. Patients appreciate my structured, data-driven approach.`,

      tags: JSON.stringify([
        "Chronic Fatigue",
        "Post-Viral Recovery",
        "Mitochondrial Health",
      ]),
      country: "Germany",
      consultationType: "In-person",
      languages: JSON.stringify(["English", "German"]),
      experienceYears: 8,
      hourlyRate: 120,
      satisfactionScore: 4.9,
      successfulSessions: "Over 400 specialised cases",
      memberSince: new Date("2023-01-30"),
      professionalAssociations: JSON.stringify([
        "European Society of Integrative Medicine",
      ]),
      eventTypeId: "4107366",
      basePrice: 120,
    },

    {
      name: "Julia K., RD",
      title: "Functional Medicine Practitioner",
      imageUrl: "/images/pratictioners/hg_julia_k.jpg",
      shortBio:
        "Gut health specialist supporting patients with IBS, SIBO and food sensitivities.",
      longBio: `My passion for gut health began by caring for my mother. I help patients heal IBS, SIBO and chronic digestive issues using functional nutrition and culturally sensitive interventions.`,

      tags: JSON.stringify(["IBS", "SIBO", "Food Sensitivities"]),
      country: "United States",
      consultationType: "In-person",
      languages: JSON.stringify(["English", "Korean"]),
      experienceYears: 9,
      hourlyRate: 130,
      satisfactionScore: 4.9,
      successfulSessions: "Top-rated gut practitioner",
      memberSince: new Date("2022-05-19"),
      professionalAssociations: JSON.stringify([
        "Academy of Nutrition and Dietetics",
      ]),
      eventTypeId: "4107375",
      basePrice: 130,
    },

    {
      name: "Lara S.",
      title: "Nutritional Therapist",
      imageUrl: "/images/pratictioners/hg_lara_s.jpg",
      shortBio:
        "Therapist specialising in women's health, cancer nutritional support, digestive issues and autoimmune conditions.",
      longBio: `My own challenges with stress, burnout and hormonal imbalance inspired my work. I support women with hormone disorders, digestive issues, autoimmunity and cancer recovery with personalised, compassionate care.`,

      tags: JSON.stringify([
        "Women's Health",
        "Autoimmunity",
        "Cancer Support",
      ]),
      country: "United Kingdom",
      consultationType: "In-person",
      languages: JSON.stringify(["English"]),
      experienceYears: 11,
      hourlyRate: 115,
      satisfactionScore: 5.0,
      successfulSessions: "Highly experienced practitioner",
      memberSince: new Date("2025-01-08"),
      professionalAssociations: JSON.stringify(["BANT", "CNHC"]),
      eventTypeId: "4107377",
      basePrice: 115,
    },
    {
      name: "Lucia D., ND",
      title: "Naturopathic Practitioner",
      imageUrl: "/images/pratictioners/hg_lucia_d.jpg",
      shortBio:
        "My autoimmune diagnosis at 25 completely changed my career path – suddenly I understood what my patients were experiencing.",
      longBio: `My autoimmune diagnosis at 25 completely changed my career path – suddenly I understood what my patients were experiencing.

Today, I support individuals dealing with chronic inflammation, hormonal imbalance and fatigue using naturopathic principles combined with evidence-based functional medicine. My focus is on patient education, empowerment and sustainable long-term healing.`,

      tags: JSON.stringify([
        "Autoimmune Health",
        "Inflammation",
        "Women's Health",
      ]),
      country: "United Kingdom",
      consultationType: "Virtual",
      languages: JSON.stringify(["English"]),
      experienceYears: 8,
      hourlyRate: 105,
      satisfactionScore: 4.9,
      successfulSessions: "Hundreds of successful cases",
      memberSince: new Date("2024-06-11"),
      professionalAssociations: JSON.stringify([
        "British Naturopathic Association",
      ]),
      eventTypeId: "4107379",
      basePrice: 105,
    },
    {
      name: "Dr. Amir H.",
      title: "Functional Medicine Doctor",
      imageUrl: "/images/pratictioners/hg_default.jpg",
      shortBio:
        "Functional medicine doctor focused on metabolic health, insulin resistance and cardiometabolic risk.",
      longBio: `I help patients who are stuck in cycles of fatigue, weight gain and cardiometabolic risk factors such as high blood pressure and prediabetes.

Through detailed assessment, advanced lab work and personalised plans, we work together to reverse patterns rather than simply manage numbers on a lab sheet.`,
      tags: JSON.stringify([
        "Metabolic Health",
        "Insulin Resistance",
        "Cardiometabolic Risk",
      ]),
      country: "United Kingdom",
      consultationType: "Virtual",
      languages: JSON.stringify(["English", "Arabic"]),
      experienceYears: 9,
      hourlyRate: 145,
      satisfactionScore: 4.9,
      successfulSessions: "Hundreds of patients supported with metabolic reset",
      memberSince: new Date("2023-09-10"),
      professionalAssociations: JSON.stringify([
        "IFM (Institute for Functional Medicine)",
      ]),
      eventTypeId: "4109355",
      basePrice: 145,
    },
    {
      name: "Sofia L., RD",
      title: "Functional Gut Dietitian",
      imageUrl: "/images/pratictioners/hg_default.jpg",
      shortBio:
        "Registered dietitian specialising in IBS, IBD and post-infectious gut recovery.",
      longBio: `I support people living with IBS, IBD and chronic gut symptoms who feel overwhelmed by conflicting advice.

My approach combines evidence-based nutrition, nervous system regulation and realistic, flexible food strategies so you can eat with confidence again.`,
      tags: JSON.stringify(["IBS", "IBD", "Gut Health"]),
      country: "United Kingdom",
      consultationType: "In-person",
      languages: JSON.stringify(["English", "Spanish"]),
      experienceYears: 6,
      hourlyRate: 115,
      satisfactionScore: 4.8,
      successfulSessions: "Over 350 gut-focused consultations",
      memberSince: new Date("2024-02-21"),
      professionalAssociations: JSON.stringify([
        "BDA (British Dietetic Association)",
      ]),
      eventTypeId: "4109355",
      basePrice: 115,
    },
    {
      name: "Hannah P.",
      title: "Women's Hormone Specialist",
      imageUrl: "/images/pratictioners/hg_default.jpg",
      shortBio:
        "Helps women navigate PMS, PCOS and perimenopause with functional hormone support.",
      longBio: `I work with women who have been told their hormone symptoms are “normal” or “just part of being a woman”.

Together, we uncover the drivers behind PMS, PMDD, PCOS and perimenopause symptoms and build a tailored nutrition and lifestyle plan to restore balance.`,
      tags: JSON.stringify([
        "PCOS",
        "Perimenopause",
        "PMS & PMDD",
      ]),
      country: "United Kingdom",
      consultationType: "Virtual",
      languages: JSON.stringify(["English"]),
      experienceYears: 8,
      hourlyRate: 130,
      satisfactionScore: 4.9,
      successfulSessions: "Highly rated by women navigating hormone changes",
      memberSince: new Date("2022-11-04"),
      professionalAssociations: JSON.stringify(["BANT", "CNHC"]),
      eventTypeId: "4109355",
      basePrice: 130,
    },
    {
      name: "Dr. Michael T.",
      title: "Integrative GP",
      imageUrl: "/images/pratictioners/hg_default.jpg",
      shortBio:
        "GP blending conventional medicine with lifestyle and functional approaches for chronic conditions.",
      longBio: `As a GP, I saw many patients bounce between referrals without real answers.

I now combine conventional diagnostics with functional and lifestyle medicine to help patients with complex, overlapping conditions create a clear path forward.`,
      tags: JSON.stringify([
        "Chronic Illness",
        "Multi-System Conditions",
        "Lifestyle Medicine",
      ]),
      country: "Ireland",
      consultationType: "Virtual",
      languages: JSON.stringify(["English"]),
      experienceYears: 14,
      hourlyRate: 160,
      satisfactionScore: 4.7,
      successfulSessions: "Hundreds of complex cases managed holistically",
      memberSince: new Date("2021-06-15"),
      professionalAssociations: JSON.stringify([
        "RCPI",
        "IFM (Institute for Functional Medicine)",
      ]),
      eventTypeId: "4109355",
      basePrice: 160,
    },
    {
      name: "Emma W.",
      title: "Mental Health Nutritionist",
      imageUrl: "/images/pratictioners/hg_default.jpg",
      shortBio:
        "Supports anxiety, low mood and burnout through nervous system and nutrition support.",
      longBio: `I specialise in the intersection between nutrition, nervous system regulation and mental health.

I help clients reduce anxiety, stabilise mood and recover from burnout using targeted nutrition, lifestyle shifts and gentle habit change.`,
      tags: JSON.stringify([
        "Anxiety",
        "Burnout",
        "Mood & Mental Health",
      ]),
      country: "United Kingdom",
      consultationType: "Virtual",
      languages: JSON.stringify(["English"]),
      experienceYears: 5,
      hourlyRate: 95,
      satisfactionScore: 5.0,
      successfulSessions: "Known for a calm, validating approach",
      memberSince: new Date("2024-08-01"),
      professionalAssociations: JSON.stringify(["BANT"]),
      eventTypeId: "4109355",
      basePrice: 95,
    },
    {
      name: "Caroline B.",
      title: "Autoimmune Nutrition Specialist",
      imageUrl: "/images/pratictioners/hg_default.jpg",
      shortBio:
        "Helps people with Hashimoto’s, RA and other autoimmune conditions reduce flares and fatigue.",
      longBio: `Living with an autoimmune thyroid condition myself, I understand how exhausting it can be to self-advocate.

I work with clients to reduce flares, support energy and create sustainable, non-restrictive plans that fit real life.`,
      tags: JSON.stringify([
        "Autoimmunity",
        "Hashimoto’s",
        "Fatigue",
      ]),
      country: "United Kingdom",
      consultationType: "Virtual",
      languages: JSON.stringify(["English", "French"]),
      experienceYears: 7,
      hourlyRate: 120,
      satisfactionScore: 4.9,
      successfulSessions: "Over 250 autoimmune-focused care plans delivered",
      memberSince: new Date("2023-03-12"),
      professionalAssociations: JSON.stringify(["BANT", "AFMCP"]),
      eventTypeId: "4109355",
      basePrice: 120,
    },
    {
      name: "Priya R., MD",
      title: "Integrative Endocrinologist",
      imageUrl: "/images/pratictioners/hg_default.jpg",
      shortBio:
        "Endocrinologist specialising in thyroid, adrenal and blood sugar imbalances.",
      longBio: `I help people who feel dismissed despite ongoing thyroid, adrenal and blood sugar symptoms.

We pair medical diagnostics with nutrition, supplements and lifestyle support to restore metabolic and hormonal balance.`,
      tags: JSON.stringify([
        "Thyroid Health",
        "Adrenal Health",
        "Blood Sugar",
      ]),
      country: "United Kingdom",
      consultationType: "Virtual",
      languages: JSON.stringify(["English", "Hindi"]),
      experienceYears: 12,
      hourlyRate: 170,
      satisfactionScore: 4.8,
      successfulSessions: "Trusted by patients with complex endocrine cases",
      memberSince: new Date("2020-10-05"),
      professionalAssociations: JSON.stringify([
        "Society for Endocrinology",
        "IFM",
      ]),
      eventTypeId: "4109355",
      basePrice: 170,
    },
    {
      name: "Tom K.",
      title: "Men’s Health Practitioner",
      imageUrl: "/images/pratictioners/hg_default.jpg",
      shortBio:
        "Works with men on energy, performance, and hormone-related health concerns.",
      longBio: `I support men who want better energy, strength, sleep and focus but are not sure where to start.

Through labs, structured lifestyle changes and realistic nutrition shifts, we work on testosterone, metabolic health and stress resilience.`,
      tags: JSON.stringify([
        "Men’s Health",
        "Performance",
        "Hormones",
      ]),
      country: "United Kingdom",
      consultationType: "In-person",
      languages: JSON.stringify(["English"]),
      experienceYears: 6,
      hourlyRate: 110,
      satisfactionScore: 4.7,
      successfulSessions: "Well-reviewed by men new to holistic care",
      memberSince: new Date("2024-01-18"),
      professionalAssociations: JSON.stringify(["BANT"]),
      eventTypeId: "4109355",
      basePrice: 110,
    },
    {
      name: "Nadia F.",
      title: "PCOS & Fertility Nutritionist",
      imageUrl: "/images/pratictioners/hg_default.jpg",
      shortBio:
        "Supports women with PCOS, cycle irregularity and fertility through functional nutrition.",
      longBio: `I help women with PCOS and subfertility understand their bodies, regulate cycles and improve chances of conception.

My approach is compassionate, practical and tailored to each woman’s culture, schedule and preferences.`,
      tags: JSON.stringify([
        "PCOS",
        "Fertility",
        "Cycle Health",
      ]),
      country: "United Kingdom",
      consultationType: "Virtual",
      languages: JSON.stringify(["English", "Turkish"]),
      experienceYears: 8,
      hourlyRate: 125,
      satisfactionScore: 4.9,
      successfulSessions: "Many clients referred by fertility clinics",
      memberSince: new Date("2022-04-07"),
      professionalAssociations: JSON.stringify(["BANT", "Fertility Nutrition"]),
      eventTypeId: "4109355",
      basePrice: 125,
    },
    {
      name: "Elena V.",
      title: "Integrative Skin Practitioner",
      imageUrl: "/images/pratictioners/hg_default.jpg",
      shortBio:
        "Focuses on acne, rosacea and eczema using gut-skin and immune support.",
      longBio: `I specialise in skin issues such as acne, rosacea and eczema where topical treatments alone aren’t enough.

By working on gut health, inflammation and the immune system, we aim for calmer skin and more confidence.`,
      tags: JSON.stringify([
        "Acne",
        "Eczema",
        "Skin & Gut",
      ]),
      country: "Spain",
      consultationType: "Virtual",
      languages: JSON.stringify(["English", "Spanish"]),
      experienceYears: 9,
      hourlyRate: 115,
      satisfactionScore: 4.8,
      successfulSessions: "Known for gentle, appearance-neutral approach",
      memberSince: new Date("2023-02-02"),
      professionalAssociations: JSON.stringify(["IFM", "Dermatology Interest"]),
      eventTypeId: "4109355",
      basePrice: 115,
    },
    {
      name: "Lauren C.",
      title: "Paediatric Nutrition & Gut Specialist",
      imageUrl: "/images/pratictioners/hg_default.jpg",
      shortBio:
        "Supports children's gut health, allergies and picky eating patterns.",
      longBio: `I work with families whose children struggle with allergies, gut issues or very selective eating.

We create child-friendly, evidence-based plans that respect neurodiversity, sensory needs and family routines.`,
      tags: JSON.stringify([
        "Paediatrics",
        "Allergies",
        "Picky Eating",
      ]),
      country: "United Kingdom",
      consultationType: "Virtual",
      languages: JSON.stringify(["English"]),
      experienceYears: 7,
      hourlyRate: 120,
      satisfactionScore: 5.0,
      successfulSessions: "Highly recommended by parents and carers",
      memberSince: new Date("2024-03-20"),
      professionalAssociations: JSON.stringify(["BDA Paediatric Group"]),
      eventTypeId: "4109355",
      basePrice: 120,
    },
    {
      name: "Samuel D.",
      title: "Breathwork & Stress Specialist",
      imageUrl: "/images/pratictioners/hg_default.jpg",
      shortBio:
        "Combines breathwork, nervous system regulation and lifestyle coaching for stress and burnout.",
      longBio: `I help people who live in chronic “fight or flight” mode reconnect with rest, recovery and presence.

Using breathwork, somatic tools and lifestyle shifts, we build a toolkit for regulating stress day-to-day.`,
      tags: JSON.stringify([
        "Stress",
        "Burnout",
        "Breathwork",
      ]),
      country: "Portugal",
      consultationType: "Virtual",
      languages: JSON.stringify(["English", "Portuguese"]),
      experienceYears: 5,
      hourlyRate: 90,
      satisfactionScore: 4.8,
      successfulSessions: "Popular with remote workers and founders",
      memberSince: new Date("2024-05-09"),
      professionalAssociations: JSON.stringify(["Breathwork Facilitator"]),
      eventTypeId: "4109355",
      basePrice: 90,
    },
    {
      name: "Marta R.",
      title: "Chronic Pain & Fibromyalgia Practitioner",
      imageUrl: "/images/pratictioners/hg_default.jpg",
      shortBio:
        "Supports people with chronic pain, fibromyalgia and hypermobility.",
      longBio: `I work with people who live with chronic pain and feel unheard or dismissed.

Through pacing strategies, nutrition and nervous system work, we gently build capacity and reduce severity of flares.`,
      tags: JSON.stringify([
        "Chronic Pain",
        "Fibromyalgia",
        "Hypermobility",
      ]),
      country: "United Kingdom",
      consultationType: "Virtual",
      languages: JSON.stringify(["English"]),
      experienceYears: 11,
      hourlyRate: 135,
      satisfactionScore: 4.7,
      successfulSessions: "Long-term support for complex pain cases",
      memberSince: new Date("2021-01-25"),
      professionalAssociations: JSON.stringify(["Pain Management Society"]),
      eventTypeId: "4109355",
      basePrice: 135,
    },
    {
      name: "Chloe S.",
      title: "Sleep & Circadian Health Coach",
      imageUrl: "/images/pratictioners/hg_default.jpg",
      shortBio:
        "Helps adults repair sleep, circadian rhythm and energy crashes.",
      longBio: `I help people who are exhausted but “wired”, waking at 3am, or relying on caffeine to get through the day.

We map your current patterns and rebuild a rhythm that supports deep sleep and stable energy.`,
      tags: JSON.stringify([
        "Sleep",
        "Circadian Rhythm",
        "Energy",
      ]),
      country: "United Kingdom",
      consultationType: "Virtual",
      languages: JSON.stringify(["English"]),
      experienceYears: 4,
      hourlyRate: 85,
      satisfactionScore: 4.9,
      successfulSessions: "Clients report transformative sleep improvements",
      memberSince: new Date("2025-01-03"),
      professionalAssociations: JSON.stringify(["Sleep Coaching Association"]),
      eventTypeId: "4109355",
      basePrice: 85,
    },
    {
      name: "Dr. Oliver J.",
      title: "Integrative Cardiometabolic Specialist",
      imageUrl: "/images/pratictioners/hg_default.jpg",
      shortBio:
        "Cardiologist focusing on prevention, lipids and lifestyle for heart health.",
      longBio: `I work with people who want to actively reduce their long-term cardiovascular risk using more than just medication.

Together we address lipids, blood pressure, inflammation and lifestyle in a structured, collaborative way.`,
      tags: JSON.stringify([
        "Heart Health",
        "Cholesterol",
        "Hypertension",
      ]),
      country: "United Kingdom",
      consultationType: "In-person",
      languages: JSON.stringify(["English"]),
      experienceYears: 15,
      hourlyRate: 185,
      satisfactionScore: 4.8,
      successfulSessions: "Highly experienced in preventive cardiology",
      memberSince: new Date("2020-05-28"),
      professionalAssociations: JSON.stringify([
        "British Cardiovascular Society",
        "IFM",
      ]),
      eventTypeId: "4109355",
      basePrice: 185,
    },
    {
      name: "Ana P.",
      title: "Functional Nutritionist",
      imageUrl: "/images/pratictioners/hg_default.jpg",
      shortBio:
        "Takes a whole-person approach to fatigue, brain fog and digestive issues.",
      longBio: `I help people who feel “not sick, but not well” – low energy, brain fog, bloating and inconsistent moods.

We look at nutrition, sleep, stress and movement together to create realistic, layered changes over time.`,
      tags: JSON.stringify([
        "Fatigue",
        "Brain Fog",
        "Digestion",
      ]),
      country: "Brazil",
      consultationType: "Virtual",
      languages: JSON.stringify(["English", "Portuguese"]),
      experienceYears: 6,
      hourlyRate: 90,
      satisfactionScore: 4.9,
      successfulSessions: "Loved for her empathetic, structured coaching style",
      memberSince: new Date("2023-07-06"),
      professionalAssociations: JSON.stringify(["Functional Nutrition"]),
      eventTypeId: "4109355",
      basePrice: 90,
    },
    {
      name: "Grace M.",
      title: "Postnatal & Matrescence Specialist",
      imageUrl: "/images/pratictioners/hg_default.jpg",
      shortBio:
        "Supports new mothers with recovery, mood, energy and nervous system support.",
      longBio: `I support women in the transition to motherhood (matrescence), focusing on nourishment, recovery and mental health.

We build a care plan that respects sleep deprivation, time constraints and emotional load.`,
      tags: JSON.stringify([
        "Postnatal",
        "Matrescence",
        "Mood & Energy",
      ]),
      country: "United Kingdom",
      consultationType: "Virtual",
      languages: JSON.stringify(["English"]),
      experienceYears: 5,
      hourlyRate: 100,
      satisfactionScore: 5.0,
      successfulSessions: "Frequently recommended in mother communities",
      memberSince: new Date("2024-09-14"),
      professionalAssociations: JSON.stringify(["Perinatal Mental Health"]),
      eventTypeId: "4109355",
      basePrice: 100,
    },
    {
      name: "Isabelle T.",
      title: "Functional Health Coach",
      imageUrl: "/images/pratictioners/hg_default.jpg",
      shortBio:
        "Coaches clients through sustainable lifestyle changes aligned with functional lab findings.",
      longBio: `I work alongside clinicians and nutritionists to help clients actually implement the changes recommended to them.

We turn plans into realistic routines, focusing on behaviour change, habit stacking and accountability.`,
      tags: JSON.stringify([
        "Health Coaching",
        "Behaviour Change",
        "Accountability",
      ]),
      country: "Canada",
      consultationType: "Virtual",
      languages: JSON.stringify(["English", "French"]),
      experienceYears: 4,
      hourlyRate: 80,
      satisfactionScore: 4.8,
      successfulSessions: "Great fit for clients who “know what to do” but feel stuck",
      memberSince: new Date("2025-02-01"),
      professionalAssociations: JSON.stringify(["Health Coach Alliance"]),
      eventTypeId: "4109355",
      basePrice: 80,
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