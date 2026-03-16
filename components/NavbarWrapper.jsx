"use client";

import { usePathname } from "next/navigation";

export default function NavbarWrapper({ children }) {
  const pathname = usePathname();

  // Hide global Navbar & Footer on these pages
  const hideOn = ["/dashboard", "/welcome", "/login", "/signup", "/course", "/assessment"];

  if (hideOn.some(path => pathname.startsWith(path))) return null;

  return <>{children}</>;
}