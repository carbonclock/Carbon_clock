"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

// ONLY these pages are accessible when logged IN
const PROTECTED_PAGES = ["/dashboard", "/welcome"];

// ONLY these pages are accessible when logged OUT
const AUTH_PAGES = ["/login", "/signup"];

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // ── User is LOGGED IN ──
      // They can ONLY access /dashboard and /welcome
      // Any other page → redirect to dashboard
      if (!PROTECTED_PAGES.includes(pathname)) {
        router.replace("/dashboard");
      }
    } else {
      // ── User is LOGGED OUT ──
      // They cannot access /dashboard or /welcome
      // Redirect them to home
      if (PROTECTED_PAGES.includes(pathname)) {
        router.replace("/login");
      }
    }
  }, [pathname, router]);

  return <>{children}</>;
}