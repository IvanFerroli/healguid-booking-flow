"use client";

import { usePathname } from "next/navigation";
import HeroHeader from "./HeroHeader";
import DefaultHeader from "./DefaultHeader";
import PartnersHeader from "./PartnersHeader";

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
