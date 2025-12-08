"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const LOGO_SRC = "/images/logos/healGuid-v2.svg";

export default function HeroHeader() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 650

            );
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full z-30 flex justify-center px-6 pt-6">
            <div
                className={[
                    "flex items-center justify-between",
                    "w-full max-w-7xl px-10 py-4",
                    "transition-all duration-300",
                    scrolled
                        ? "rounded-[2.5rem] bg-white/95 text-text-main shadow-[0_12px_35px_rgba(15,23,42,0.18)] border border-border-soft"
                        : "rounded-[2.5rem] bg-white/10 text-white backdrop-blur-xl border border-white/15 shadow-[0_12px_45px_rgba(0,0,0,0.35)]"

                ].join(" ")}
            >
                {/* LOGO */}
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

                {/* MENU ENXUTO */}
                <nav
                    className={[
                        "hidden md:flex items-center gap-10 text-sm font-medium",
                        scrolled ? "text-text-main" : "text-white",
                    ].join(" ")}
                >
                    <Link
                        href="/partners"
                        className={scrolled ? "hover:text-brand-teal" : "hover:text-brand-orange-soft"}
                    >
                        For Practitioners
                    </Link>
                    <Link
                        href="/#about"
                        className={scrolled ? "hover:text-brand-teal" : "hover:text-brand-orange-soft"}
                    >
                        About
                    </Link>
                </nav>

                {/* CTA PRINCIPAL PACIENTE */}
                <Link
                    href="/book"
                    className="hg-header-cta bg-brand-orange text-white hover:bg-brand-orange-soft"
                >
                    Find a Specialist
                </Link>
            </div>
        </header>
    );
}
