/** Header variant for the partners area with route-aware navigation and teal CTA. */

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LOGO_SRC = "/images/logos/healGuid-v2.svg";

export default function PartnersHeader() {
    const pathname = usePathname();
    const isPartnersRoute = pathname.startsWith("/partners");

    return (
        <header className="fixed top-0 left-0 w-full bg-white text-text-main shadow-md z-30 border-b border-border-soft">
            <div className="mx-auto max-w-7xl flex items-center justify-between px-8 py-4">
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

                {/* MENU PARCEIROS */}
                <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
                    <Link
                        href={isPartnersRoute ? "/" : "/partners"}
                        className="hover:text-brand-teal"
                    >
                        {isPartnersRoute ? "For Clients" : "For Practitioners"}
                    </Link>

                    <Link href="/#about" className="hover:text-brand-teal">
                        About
                    </Link>

                    <Link href="/#journey" className="hover:text-brand-teal">
                        How We Work
                    </Link>
                </nav>

                {/* CTA TEAL (APPLY) */}
                <Link
                    href="/partners/apply"
                    className="hg-header-cta bg-brand-teal text-white hover:bg-brand-teal-soft"
                >
                    Apply
                </Link>
            </div>
        </header>
    );
}
