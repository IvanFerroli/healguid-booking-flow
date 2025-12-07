"use client";

import { usePathname } from "next/navigation";
import HeroHeader from "./HeroHeader";
import DefaultHeader from "./DefaultHeader";

export default function Header() {
  const pathname = usePathname();

  const isLanding =
    pathname === "/" ||
    pathname.startsWith("/#") ||
    pathname === "/index";

  if (isLanding) return <HeroHeader />;
  return <DefaultHeader />;
}
