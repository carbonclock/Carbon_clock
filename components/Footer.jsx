"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaLinkedin, FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Knowledge Hub", href: "/knowledge-hub" },
  { label: "Climate Correction Day", href: "/climate-correction-day" },
  { label: "Resources", href: "/Resources" },
  { label: "Contact Us", href: "/contact" },
];

const services = [
  "Carbon Literacy Education",
  "Carbon Footprint Assessment",
  "Life Cycle Assessment",
  "GHG Accounting",
  "Climate Action Programs",
  "Youth Sustainability Training",
];

const socials = [
  { icon: <FaWhatsapp size={18} />, href: "#" },
  { icon: <FaLinkedin size={18} />, href: "https://www.linkedin.com/in/vishnu-simhadri-87935323a/" },
  { icon: <FaFacebook size={18} />, href: "#" },
  { icon: <FaInstagram size={18} />, href: "#" },
  { icon: <FaXTwitter size={18} />, href: "#" },
 
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0f3d23] overflow-hidden">

      {/* ── Fade IN at top (light green fading into dark) ── */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-linear-to-b from-[#A7D7C5]/40 via-[#C5E8D8]/10 to-transparent z-20 pointer-events-none" />

      {/* ── Fade OUT at bottom (dark fading to light green) ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#A7D7C5]/25 via-[#C5E8D8]/10 to-transparent z-20 pointer-events-none" />

      {/* ── Decorative background orbs ── */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-10 -right-16 w-72 h-72 rounded-full bg-[#2E7D5B]/30 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 -left-15 w-60 h-60 rounded-full bg-[#A7D7C5]/15 blur-3xl pointer-events-none"
      />

      {/* ── Main footer content ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">

        {/* ── Col 1: Brand ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          custom={0}
          viewport={{ once: true }}
        >
          {/* Logo */}
          <div className="mb-4">
            <span className="text-white font-bold text-xl">Carbon Clock</span>
          </div>

          <p className="text-[#A7D7C5] text-sm leading-relaxed mb-6">
            Empowering individuals and organisations to understand, measure,
            and reduce their carbon impact for a sustainable future.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3 flex-wrap">
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.18, backgroundColor: "#2E7D5B" }}
                whileTap={{ scale: 0.93 }}
                transition={{ duration: 0.18 }}
                className="w-9 h-9 rounded-lg bg-[#2E7D5B]/40 text-[#A7D7C5] flex items-center justify-center hover:text-white transition-colors"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ── Col 2: Quick Links ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          custom={0.1}
          viewport={{ once: true }}
        >
          <h3 className="text-white font-bold text-[16px] mb-5">Quick Links</h3>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>
                  <motion.span
                    whileHover={{ x: 5, color: "#A7D7C5" }}
                    transition={{ duration: 0.18 }}
                    className="text-[#C5E8D8]/80 text-sm cursor-pointer flex items-center gap-1.5 hover:text-[#A7D7C5] transition-colors"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#2E7D5B]" />
                    {link.label}
                  </motion.span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ── Col 3: Services ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          custom={0.2}
          viewport={{ once: true }}
        >
          <h3 className="text-white font-bold text-[16px] mb-5">Services</h3>
          <ul className="space-y-3">
            {services.map((s) => (
              <li key={s}>
                <motion.span
                  whileHover={{ x: 5, color: "#A7D7C5" }}
                  transition={{ duration: 0.18 }}
                  className="text-[#C5E8D8]/80 text-sm flex items-center gap-1.5 hover:text-[#A7D7C5] transition-colors cursor-default"
                >
                  <span className="w-1 h-1 rounded-full bg-[#2E7D5B]" />
                  {s}
                </motion.span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ── Col 4: Contact ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          custom={0.3}
          viewport={{ once: true }}
        >
          <h3 className="text-white font-bold text-[16px] mb-5">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MdLocationOn className="text-[#A7D7C5] mt-0.5 shrink-0" size={18} />
              <span className="text-[#C5E8D8]/80 text-sm leading-relaxed">
                India · Global Youth Climate Platform
              </span>
            </li>
            <li className="flex items-center gap-3">
              <MdPhone className="text-[#A7D7C5] shrink-0" size={18} />
              <a href="tel:+919999999999" className="text-[#C5E8D8]/80 text-sm hover:text-[#A7D7C5] transition-colors">
                +91 00000 00000
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MdEmail className="text-[#A7D7C5] shrink-0" size={18} />
              <a href="mailto:info@carbonclock.in" className="text-[#C5E8D8]/80 text-sm hover:text-[#A7D7C5] transition-colors">
                info@carbonclock.in
              </a>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-px bg-linear-to-r from-transparent via-[#2E7D5B] to-transparent origin-left"
        />
      </div>

      {/* ── Bottom bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10"
      >
        <p className="text-[#A7D7C5]/70 text-sm text-center sm:text-left">
          © 2025 Carbon Clock. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-[#A7D7C5]/70">
          <Link href="/privacy-policy" className="hover:text-[#A7D7C5] transition-colors">Privacy Policy</Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-[#A7D7C5] transition-colors">Terms of Use</Link>
        </div>
      </motion.div>

    </footer>
  );
}