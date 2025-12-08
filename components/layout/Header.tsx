/** Chooses which header variant to display based on current pathname. */

"use client";

import { usePathname } from "next/navigation";
import HeroHeader from "../marketing/HeroHeader";
import DefaultHeader from "../marketing/DefaultHeader";
import PartnersHeader from "../marketing/PartnersHeader";

export default function Header() {
  const pathname = usePathname();

  const isLanding =
    pathname === "/" || pathname === "/index" || pathname === "";

  const isPartners = pathname.startsWith("/partners");

  if (isLanding) {
    return <HeroHeader />;
  }

  if (isPartners) {
    return <PartnersHeader />;
  }

  return <DefaultHeader />;
}
