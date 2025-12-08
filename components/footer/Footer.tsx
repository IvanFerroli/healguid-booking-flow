"use client";

import Image from "next/image";
import Link from "next/link";

const HERO_VIDEO = "/videos/hero/mountains-trimmed.mp4";
const LOGO_SRC = "/images/logos/healGuid-v2.svg";

export default function Footer() {
  return (
    <footer className="bg-page-cream border-t border-border-soft/60 py-10">
      <div className="hg-section flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        {/* Brand + tagline */}
        <div className="flex items-center gap-3">
          <Image
            src={LOGO_SRC}
            alt="HealGuid"
            width={130}
            height={36}
            className="h-9 w-auto"
          />

          <p className="text-xs text-text-soft max-w-xs">
            A modern way to find verified holistic & functional medicine care.
          </p>
        </div>

        {/* Navigation links */}
        <div className="flex flex-wrap gap-4 text-xs text-text-soft">
          <Link href="#about" className="hover:text-brand-teal transition-colors">
            About
          </Link>

          <Link href="#match" className="hover:text-brand-teal transition-colors">
            Get Matched
          </Link>

          <Link href="#promise" className="hover:text-brand-teal transition-colors">
            Our Mission
          </Link>

          <span>
            © {new Date().getFullYear()} HealGuid • All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
