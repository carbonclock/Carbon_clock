"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
 
  { label: "About", href: "/about", name:"About" },
   { label: "Certification", href: "/certification" },
  { label: "Resources", href: "/resources" },
  // { label: "Our Services", href: "/Services" },
  { label: "Founder", href: "/founder" },
  { label: "News & Events", href: "/news" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* ── LOGO — increased to 88×88 ── */}
          <motion.div
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/")}
            className="cursor-pointer shrink-0"
          >
            <Image
              src="/logo1.svg"
              alt="Logo"
              width={64}
              height={64}
              className="object-contain"
            />
          </motion.div>

          {/* ── DESKTOP NAV LINKS ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.div
                key={link.label}
                whileHover={{ y: -1 }}
                transition={{ duration: 0.15 }}
              >
                <Link
                  href={link.href}
                  className="relative group px-3.5 py-2 text-[17px] font-medium text-gray-700 rounded-md flex items-center"
                >
                  {/* Hover background pill */}
                  <span className="absolute inset-0 rounded-md bg-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  {/* Animated underline */}
                  <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-green-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
                  <span className="relative z-10 group-hover:text-green-700 transition-colors duration-200">
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* ── CONTACT US CTA ── */}
          <div className="hidden lg:flex items-center">
            <Link href="/contact">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 6px 24px rgba(22,163,74,0.35)",
                }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="px-6 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-[16px] font-semibold tracking-wide transition-colors duration-200"
              >
                Contact Us
              </motion.button>
            </Link>
          </div>

          {/* ── MOBILE HAMBURGER ── */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-green-700 hover:bg-green-50 transition-colors"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={mobileOpen ? "open" : "closed"}
              className="w-6 h-5 flex flex-col justify-between"
            >
              <motion.span
                variants={{ open: { rotate: 45, y: 8 }, closed: { rotate: 0, y: 0 } }}
                transition={{ duration: 0.22 }}
                className="block h-0.5 w-6 bg-current rounded-full"
              />
              <motion.span
                variants={{ open: { opacity: 0, scaleX: 0 }, closed: { opacity: 1, scaleX: 1 } }}
                transition={{ duration: 0.22 }}
                className="block h-0.5 w-6 bg-current rounded-full"
              />
              <motion.span
                variants={{ open: { rotate: -45, y: -8 }, closed: { rotate: 0, y: 0 } }}
                transition={{ duration: 0.22 }}
                className="block h-0.5 w-6 bg-current rounded-full"
              />
            </motion.div>
          </motion.button>
        </div>

        {/* ── MOBILE MENU ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden bg-white border-t border-gray-100"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2.5 rounded-lg text-[16px] font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.06, duration: 0.2 }}
                  className="mt-3 pt-3 border-t border-gray-100"
                >
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      className="w-full px-5 py-3 rounded-lg bg-green-600 text-white text-[16px] font-semibold tracking-wide hover:bg-green-700 transition-colors"
                    >
                      Contact Us
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}