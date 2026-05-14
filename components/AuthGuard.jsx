"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

// Session duration in milliseconds (e.g., 2 hours)
const SESSION_DURATION = 2 * 60 * 60 * 1000;

// Pages that require authentication
const PROTECTED_PAGES = ["/dashboard", "/welcome", "/course", "/assessment"];

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loginAt = localStorage.getItem("loginAt");
    const now = Date.now();

    const isSessionValid = token && loginAt && (now - parseInt(loginAt, 10)) < SESSION_DURATION;

    if (!isSessionValid && token) {
      // Session expired
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("loginAt");
      router.replace("/login?message=Session expired. Please login again.");
      return;
    }

    const isProtectedPage = PROTECTED_PAGES.some(path => pathname.startsWith(path));
    const isCertificatePage = pathname.startsWith("/certificate");

    if (isSessionValid) {
      // ── User is LOGGED IN ──
      // If they try to access ANY page that is NOT protected AND not the certificate page → redirect to dashboard
      // (Except for root '/' and common public pages if you want to allow them)
      const isPublicAllowed = ["/", "/about", "/contact", "/founder", "/blog", "/certifications"].some(path => pathname === path);
      
      if (!isProtectedPage && !isCertificatePage && !isPublicAllowed) {
        router.replace("/dashboard");
      }
    } else {
      // ── User is LOGGED OUT ──
      // Redirect to login if they try to access protected pages
      if (isProtectedPage) {
        router.replace("/login");
      }
    }
    
    setIsChecking(false);
  }, [pathname, router]);

  // Prevent flash of protected content while checking auth
  if (isChecking && PROTECTED_PAGES.some(path => pathname.startsWith(path))) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F0E8]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0F3D2E]"></div>
      </div>
    );
  }

  return <>{children}</>;
}