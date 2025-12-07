"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LOGO_SRC = "/images/logos/healGuid-v2.svg";

export default function DefaultHeader() {
    const pathname = usePathname();
    const isPartnersRoute = pathname.startsWith("/partners");

    return (
        <header className="w-full bg-brand-teal text-white shadow-md">
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

                {/* MENU */}
                <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
                    <Link
                        href={isPartnersRoute ? "/" : "/partners"}
                        className="hover:text-brand-orange-soft"
                    >
                        {isPartnersRoute ? "For Clients" : "For Practitioners"}
                    </Link>

                    <Link href="/#find" className="hover:text-brand-orange-soft">
                        Find a Specialist
                    </Link>
                    <Link href="/#about" className="hover:text-brand-orange-soft">
                        About
                    </Link>
                </nav>

                {/* APPLY BUTTON */}
                <Link
                    href="/partners/apply"
                    className="rounded-full bg-white text-brand-teal px-6 py-2 text-sm font-semibold shadow hover:bg-brand-teal-soft transition"
                >
                    Apply
                </Link>
            </div>
        </header>
    );
}
