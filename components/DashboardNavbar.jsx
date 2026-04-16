"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ChevronDown, User, LogOut, Settings, Award, Menu, X
} from "lucide-react";
import Image from "next/image";

const getInitials = (name = "") =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

export default function DashboardNavbar({ user, onLogout }) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="sticky top-0 z-40 border-b border-[#A7D7C5]/20" style={{ background: "#fafaf8", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)" }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.button
          onClick={() => router.push("/dashboard")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="cursor-pointer flex items-center focus:outline-none"
          aria-label="Go to dashboard"
        >
          <Image src="/logo1.svg" alt="Carbon Clock" width={240} height={80} priority className="h-16 w-auto" />
        </motion.button>

        <div className="hidden md:flex items-center gap-1 text-sm font-medium text-[#355F53]">
          {[
            { label: "Home", action: () => router.push("/dashboard") },
            { label: "Resources", action: () => router.push("/dashboard") },
            { label: "Courses", action: () => {} },
          ].map((item) => (
            <motion.button
              key={item.label}
              onClick={item.action}
              whileHover={{ scale: 1.05, color: "#0F3D2E" }}
              whileTap={{ scale: 0.96 }}
              className="relative px-4 py-2 rounded-xl cursor-pointer text-[#355F53] hover:text-[#0F3D2E] hover:bg-[#F4F8F6] transition-colors focus:outline-none"
            >
              {item.label}
              <motion.span
                className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#2E7D5B] rounded-full origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative" ref={dropdownRef}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-[#F4F8F6] border border-[#A7D7C5]/60 rounded-full pl-1 pr-3 py-1 hover:border-[#2E7D5B] hover:shadow-md transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#2E7D5B] to-[#A7D7C5] flex items-center justify-center text-white text-xs font-bold shrink-0">
                {getInitials(user?.name)}
              </div>
              <span className="text-sm font-medium text-[#0F3D2E] hidden sm:block max-w-30 truncate">
                {user?.name?.split(" ")[0]}
              </span>
              <motion.div animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <ChevronDown size={14} className="text-[#355F53]" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.93, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.93, y: -8 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute right-0 mt-2 w-56 rounded-2xl border border-[#A7D7C5]/50 overflow-hidden"
                  style={{ background: "#fafaf8", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)" }}
                >
                  <div className="px-4 py-4 border-b border-[#E6F2ED]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#2E7D5B] to-[#A7D7C5] flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {getInitials(user?.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[#0F3D2E] truncate">{user?.name}</p>
                        <p className="text-xs text-[#355F53] truncate">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                  {[
                    { icon: <User size={15} />, label: "My Profile", href: "#" },
                    { icon: <Award size={15} />, label: "My Certifications", href: "/dashboard/my-certifications" },
                    { icon: <Settings size={15} />, label: "Settings", href: "#" },
                  ].map((item, i) => (
                    <motion.button
                      key={item.label}
                      onClick={() => {
                        if (item.href !== "#") router.push(item.href);
                        setDropdownOpen(false);
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ x: 4, backgroundColor: "#F4F8F6" }}
                      className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm text-[#355F53] hover:text-[#0F3D2E] transition-colors cursor-pointer"
                    >
                      <span className="text-[#2E7D5B]">{item.icon}</span>
                      {item.label}
                    </motion.button>
                  ))}
                  <div className="border-t border-[#E6F2ED]">
                    <motion.button
                      whileHover={{ x: 4, backgroundColor: "#FEF2F2" }}
                      whileTap={{ scale: 0.97 }}
                      onClick={onLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 transition-colors cursor-pointer"
                    >
                      <LogOut size={15} />
                      Sign Out
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-[#F4F8F6] border border-[#A7D7C5]/60 text-[#0F3D2E] hover:border-[#2E7D5B] hover:shadow-md transition-all cursor-pointer"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileMenuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-[#A7D7C5]/20"
            style={{ background: "#fafaf8" }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {[
                { label: "Home", action: () => { router.push("/dashboard"); setMobileMenuOpen(false); } },
                { label: "Certifications", action: () => { router.push("/certification"); setMobileMenuOpen(false); } },
                { label: "Courses", action: () => setMobileMenuOpen(false) },
              ].map((item, i) => (
                <motion.button
                  key={item.label}
                  onClick={item.action}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ x: 6, color: "#0F3D2E" }}
                  whileTap={{ scale: 0.97 }}
                  className="text-left px-3 py-2.5 rounded-xl text-sm font-medium text-[#355F53] hover:bg-[#F4F8F6] hover:text-[#0F3D2E] transition-colors cursor-pointer"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}