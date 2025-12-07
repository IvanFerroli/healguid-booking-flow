"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LOGO_SRC = "/images/logos/healGuid-v2.svg";

export default function HeroHeader() {
  const pathname = usePathname();
  const isPartners = pathname.startsWith("/partners");

  return (
    <header className="absolute top-0 left-0 w-full z-20 flex justify-center px-6 pt-6">
      <div
        className="
          flex items-center justify-between
          w-full max-w-7xl
          px-10 py-4
          rounded-[2.5rem]
          bg-white/10
          backdrop-blur-xl
          border border-white/15
          shadow-[0_12px_45px_rgba(0,0,0,0.35)]
        "
      >
        {/* LEFT: Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={LOGO_SRC}
            alt="HealGuid"
            width={150}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* MENU */}
        <nav className="hidden md:flex items-center gap-10 text-white font-medium text-sm">
          <Link href="/partners">
            {isPartners ? "For Clients" : "For Practitioners"}
          </Link>
          <Link href="#find">Find a Specialist</Link>
          <Link href="#journey">How We Work</Link>
          <Link href="#about">About</Link>
        </nav>

        {/* RIGHT BUTTON */}
        <Link
          href="#match"
          className="hg-btn-primary bg-brand-orange hover:bg-brand-orange-soft px-6 py-2 text-white"
        >
          Get Matched
        </Link>
      </div>
    </header>
  );
}
