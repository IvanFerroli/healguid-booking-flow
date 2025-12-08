"use client";

import Image from "next/image";
import Link from "next/link";


const HERO_VIDEO = "/videos/hero/mountains-trimmed.mp4";
const LOGO_SRC = "/images/logos/healGuid-v2.svg";


export default function LandingPage() {
  return (
    <main className="min-h-screen bg-page-cream text-text-main">
      <HeroSection />
      <TreatmentApproachesSection />
      <TrustSection />
      <StruggleSection />
      <WhatWeOfferSection />
      <HealingJourneySection />
      <PromiseSection />
      <FooterSection />
    </main>
  );
}

/* ----------------------------- HERO ----------------------------- */

function HeroSection() {
  return (
    <section className="relative isolate min-h-[640px] w-full text-white overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={HERO_VIDEO}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark + color overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/65 via-black/60 to-black/40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,124,130,0.22)_0,_transparent_55%)]" />

      {/* Navbar + hero content */}
      <div className="relative z-10">

        <div className="hg-section flex flex-col items-center pt-16 pb-20 text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.35em] uppercase text-brand-orange-soft">
            VERIFIED PRACTITIONERS • HOLISTIC & FUNCTIONAL MEDICINE
          </p>

          <h1 className="max-w-3xl text-4xl sm:text-5xl lg:text-[3.1rem] font-extrabold leading-tight drop-shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
            Verified <span className="text-brand-orange">Holistic</span> & Functional
            Medicine Practitioners in the UK
          </h1>



          <div className="hg-glass mt-6 px-10 py-6 max-w-3xl text-center">
            <p className="text-base sm:text-lg leading-relaxed text-white/90 drop-shadow-[0_12px_35px_rgba(0,0,0,0.65)]">
              Finally feeling <strong>heard</strong>, finally finding{" "}
              <strong>answers</strong>. HealGuid connects you with trusted
              practitioners who look beyond symptoms to address the root causes of
              chronic fatigue, gut issues, autoimmunity and hormone imbalances.
            </p>
          </div>


          {/* CTAs */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="#match" className="hg-btn-secondary">
              Find a Practitioner
            </Link>
            <Link href="#treatments" className="hg-btn-primary bg-white text-brand-teal">
              See Our Approaches
            </Link>
          </div>

          {/* Hero stats */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs sm:text-sm">
            {[
              "60–90 min consultations",
              "Free patient matching",
              "100% verified practitioners",
            ].map((label) => (
              <div
                key={label}
                className="rounded-[999px] bg-black/40 px-4 py-2 text-white/85 backdrop-blur-sm border border-white/10"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------- OUR TREATMENT APPROACHES --------------------- */

function TreatmentApproachesSection() {
  return (
    <section
      id="treatments"
      className="bg-surface py-16 sm:py-20 border-t border-border-soft"
    >
      <div className="hg-section">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-brand-teal mb-10">
          Our Treatment Approaches
        </h2>

        {/* Um único slide estático por enquanto (Functional Medicine) */}
        <div className="hg-card mx-auto max-w-4xl text-center bg-surface-soft">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-teal-soft/60">
              <span className="text-2xl font-semibold text-brand-teal">FM</span>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-brand-teal">
            Functional Medicine
          </h3>

          <p className="mt-3 text-sm sm:text-base text-text-muted max-w-2xl mx-auto">
            A science-led, whole-person approach that investigates{" "}
            <span className="font-semibold">why</span> symptoms are happening —
            not just how to suppress them. Focused on long-term healing, not
            quick fixes.
          </p>

          <div className="mt-8 flex justify-center">
            <Link href="#match" className="hg-btn-secondary">
              Find Practitioners
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------ WHY TRUST HEALGUID ------------------------ */

function TrustSection() {
  return (
    <section
      id="about"
      className="bg-page-offwhite py-18 sm:py-20 border-t border-border-soft/60"
    >
      <div className="hg-section">
        <h2 className="mb-12 text-center text-3xl sm:text-4xl font-bold text-brand-teal">
          Why Trust HealGuid?
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {/* 5-point verification */}
          <div className="hg-card bg-surface">
            <h3 className="mb-4 text-lg font-semibold text-brand-teal">
              Our 5-Point Verification
            </h3>
            <p className="mb-4 text-sm text-text-muted">
              Every practitioner goes through a structured screening before they
              can join the platform.
            </p>

            <ul className="mt-4 space-y-3 text-sm text-text-main">
              {[
                "Professional registration validated",
                "Clean record & safety checks",
                "Training and qualifications confirmed",
                "Insurance and scope of practice reviewed",
                "Ongoing quality monitoring & feedback",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[3px] text-brand-orange text-lg">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* The HealGuid difference */}
          <div className="hg-card bg-surface">
            <h3 className="mb-4 text-lg font-semibold text-brand-orange">
              The HealGuid Difference
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 text-sm">
              {[
                {
                  title: "Root-cause mindset",
                  desc: "Care that looks beyond labels to understand the full story behind symptoms.",
                },
                {
                  title: "Evidence-aligned care",
                  desc: "Practitioners using up-to-date protocols grounded in science and lived experience.",
                },
                {
                  title: "Human first, not numbers",
                  desc: "Time to be heard, validated and properly assessed — not rushed through a 10-minute slot.",
                },
                {
                  title: "Collaborative journey",
                  desc: "Clear next steps, follow-up and space to adjust the plan as life changes.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl bg-brand-teal-soft/40 p-4"
                >
                  <p className="font-semibold text-brand-teal">{card.title}</p>
                  <p className="mt-1 text-xs text-text-muted">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------- STRUGGLING TO FIND REAL SOLUTIONS (BANDA) ------------ */

function StruggleSection() {
  return (
    <section className="bg-page-cream py-18 sm:py-20 border-t border-border-soft/60">
      <div className="hg-section">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-brand-teal mb-4">
          Struggling to Find Real Solutions for Your Health?
        </h2>

        <p className="mx-auto max-w-3xl text-center text-sm sm:text-base text-text-muted mb-12">
          Many people move from appointment to appointment without clear
          answers. Long waits, rushed visits, normal lab results — yet symptoms
          keep getting louder. HealGuid exists to bridge that gap.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Feeling overwhelmed",
              desc: "Multiple opinions, conflicting advice and no one joining the dots.",
            },
            {
              title: "Limited access to holistic experts",
              desc: "It’s hard to know who is truly qualified in functional & integrative care.",
            },
            {
              title: "Time & cost frustrations",
              desc: "You want care that’s worth the investment — structured, transparent and human.",
            },
          ].map((item) => (
            <div key={item.title} className="hg-card bg-surface-soft">
              <h3 className="mb-2 text-sm font-semibold text-brand-teal">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-text-muted">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="#match" className="hg-btn-secondary">
            Learn how HealGuid helps
          </Link>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- WHAT WE OFFER -------------------------- */

function WhatWeOfferSection() {
  const areas = [
    "Digestive & Gut Health",
    "Chronic Pain Recovery",
    "Anxiety & Mental Wellbeing",
    "Hormone & Cycle Support",
    "Fatigue & Energy",
    "Autoimmune Conditions",
    "Stress & Sleep",
    "Preventive & Longevity Health",
  ];

  return (
    <section
      id="match"
      className="bg-surface py-18 sm:py-20 border-t border-border-soft/60"
    >
      <div className="hg-section">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-teal">
            What We Offer
          </h2>
          <p className="max-w-3xl text-sm sm:text-base text-text-muted">
            A matching-first experience that connects you with practitioners who
            truly understand complex, multi-layered health stories.
          </p>
        </div>

        {/* Tag grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-10">
          {areas.map((area) => (
            <div
              key={area}
              className="flex items-center justify-center rounded-[var(--radius-card)] border border-border-soft bg-surface-soft px-4 py-5 text-center text-sm font-semibold text-text-main shadow-soft/40"
            >
              {area}
            </div>
          ))}
        </div>

        {/* Matching CTA band */}
        <div className="hg-card flex flex-col gap-4 bg-brand-teal-soft/70 text-center md:flex-row md:items-center md:justify-between">
          <div className="text-left md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              PATIENT MATCHING
            </p>
            <p className="mt-1 text-sm font-medium text-text-main">
              Share your story once. We’ll help you find the right practitioner
              — not just the first available.
            </p>
          </div>

          <Link href="/book/1" className="hg-btn-secondary">
            Start Your Matching Journey
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------ YOUR HEALING JOURNEY ---------------------- */

function HealingJourneySection() {
  const steps = [
    {
      step: "Step 1",
      title: "Talk to our assessment team",
      desc: "We listen to your history, symptoms and goals to understand the full picture.",
    },
    {
      step: "Step 2",
      title: "Meet your matched practitioner",
      desc: "Book a comprehensive consultation and receive a tailored care roadmap.",
    },
    {
      step: "Step 3",
      title: "Follow your personalised journey",
      desc: "Track progress, adjust the plan and feel supported at every stage.",
    },
  ];

  return (
    <section
      id="journey"
      className="bg-page-offwhite py-18 sm:py-20 border-t border-border-soft/60"
    >
      <div className="hg-section">
        <h2 className="mb-10 text-center text-3xl sm:text-4xl font-bold text-brand-teal">
          Your Healing Journey
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="hg-card text-center">
              <p className="text-sm font-bold text-brand-orange">{item.step}</p>
              <h3 className="mt-2 text-base font-semibold text-text-main">
                {item.title}
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-text-muted">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- PROMISE BAND --------------------------- */

function PromiseSection() {
  return (
    <section
      id="promise"
      className="bg-surface py-18 sm:py-20 border-t border-border-soft/60"
    >
      <div className="hg-section text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-teal mb-4">
          Our Promise: Humanity First, Always
        </h2>
        <p className="mx-auto max-w-3xl text-sm sm:text-base text-text-muted leading-relaxed">
          We believe healthcare should feel personal, thoughtful and grounded in
          both evidence and empathy. Until people everywhere can access
          high-quality holistic care — and practitioners can work in a way that
          honours their expertise — we’ll keep building.
        </p>

        <div className="mt-8 flex justify-center">
          <Link href="#match" className="hg-btn-secondary">
            Find Your Health Partner
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ FOOTER ------------------------------ */

function FooterSection() {
  return (
    <footer className="bg-page-cream border-t border-border-soft/60 py-10">
      <div className="hg-section flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={LOGO_SRC}
            alt="HealGuid"
            width={130}
            height={36}
            className="h-9 w-auto"
          />
          <p className="text-xs text-text-soft">
            A modern way to find verified holistic & functional medicine care.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-xs text-text-soft">
          <Link href="#about" className="hover:text-brand-teal">
            About
          </Link>
          <Link href="#match" className="hover:text-brand-teal">
            Get Matched
          </Link>
          <Link href="#promise" className="hover:text-brand-teal">
            Our Mission
          </Link>
          <span>© {new Date().getFullYear()} HealGuid • All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
