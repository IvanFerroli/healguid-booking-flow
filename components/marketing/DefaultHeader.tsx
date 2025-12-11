/** Default site header shown on all non-landing and non-partners pages. */

"use client";

import Image from "next/image";
import Link from "next/link";

const LOGO_SRC = "/images/logos/healGuid-v2.svg";

export default function DefaultHeader() {
    return (
        <header className="fixed top-0 left-0 w-full bg-white text-text-main shadow-md z-30 border-b border-border-soft">
            <div className="mx-auto max-w-7xl flex items-center justify-between px-8 py-4 hg-header-wrap">

                {/* LOGO */}
                <Link href="/" className="flex items-center">
                    <Image
                        src={LOGO_SRC}
                        alt="HealGuid"
                        width={140}
                        height={36}
                        className="h-9 w-auto"
                    />
                </Link>

                {/* MENU GLOBAL PACIENTE */}
                <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
                    <Link href="/partners" className="hover:text-brand-teal">
                        For Practitioners
                    </Link>
                    <Link href="/#about" className="hover:text-brand-teal">
                        About
                    </Link>
                    <Link href="/#journey" className="hover:text-brand-teal">
                        How We Work
                    </Link>
                </nav>

                {/* CTA LARANJA */}
                <Link
                    href="/book"
                    className="hg-header-cta bg-brand-orange text-white hover:bg-brand-orange-soft hg-header-wrap"
                >
                    {/* Mobile: até sm */}
                    <span className="sm:hidden">Match</span>

                    {/* Desktop: de sm pra cima */}
                    <span className="hidden sm:inline">Find a Specialist</span>
                </Link>

            </div>
        </header>
    );
}
