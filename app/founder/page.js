"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";

export default function Founder() {
  return (
    <main className="min-h-screen bg-[#F4F8F6] text-[#0F3D2E] overflow-hidden">

      {/* ── Decorative background orbs ── */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-20 -right-20 w-72 h-72 rounded-full bg-[#A7D7C5]/20 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="fixed bottom-20 -left-15 w-56 h-56 rounded-full bg-[#2E7D5B]/15 blur-3xl pointer-events-none"
      />

      {/* ── Page Header ── */}
      <section className="pt-20 pb-8 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D5B] bg-[#2E7D5B]/10 px-4 py-1.5 rounded-full mb-4 tracking-wide"
        >
          <span className="w-2 h-2 rounded-full bg-[#2E7D5B] animate-pulse" />
          Leadership
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-[#0F3D2E]"
        >
          Meet Our Leadership
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 text-[#355F53] text-lg"
        >
          Meet the visionary behind Carbon Clock
        </motion.p>
      </section>

      {/* ── Founder Card ── */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="relative bg-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-10 items-start shadow-xl border border-[#E6F2ED] overflow-hidden"
          >

            {/* Decorative corner accent */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-linear-to-br from-[#A7D7C5]/30 to-transparent rounded-br-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-linear-to-tl from-[#E6F2ED] to-transparent rounded-tl-full pointer-events-none" />

            {/* ── Left: Image + social ── */}
            <div className="flex flex-col items-center gap-4 shrink-0 mx-auto md:mx-0 relative z-10">
              <motion.div
                whileHover={{ scale: 1.04, boxShadow: "0 16px 40px rgba(15,61,46,0.18)" }}
                transition={{ duration: 0.25 }}
                className="w-48 h-57.5 rounded-2xl overflow-hidden bg-[#E6F2ED] shadow-lg relative border-4 border-white"
              >
                <Image
                  src="/founder1.png"
                  alt="Founder"
                  fill
                  className="object-cover object-top"
                />
              </motion.div>

              {/* LinkedIn below image */}
              <motion.div whileHover={{ scale: 1.1, y: -2 }} transition={{ duration: 0.2 }}>
                <Link
                  href="https://www.linkedin.com/in/vishnu-simhadri-87935323a/"
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 bg-[#0F3D2E] text-white text-sm font-semibold rounded-xl hover:bg-[#2E7D5B] transition-colors shadow-md"
                >
                  <FaLinkedin size={17} />
                  LinkedIn
                </Link>
              </motion.div>
            </div>

            {/* ── Right: Content ── */}
            <div className="flex-1 relative z-10">

              {/* Name & title */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F3D2E]">
                  Vishnu Simhadri
                </h2>
                <div className="flex items-center gap-2 mt-1 mb-5">
                  <span className="text-[#2E7D5B] font-semibold">Founder</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A7D7C5]" />
                  <span className="text-[#355F53] text-sm">Carbon Clock</span>
                </div>

                {/* Teal divider */}
                <div className="h-0.5 w-12 bg-[#2E7D5B] rounded-full mb-5" />
              </motion.div>

              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="text-[#355F53] leading-relaxed space-y-3 text-[15px]"
              >
                <p>
                  Vishnu is the Founder of Carbon Clock and a sustainability professional
                  dedicated to advancing climate action through data-driven environmental
                  solutions. With expertise in Environmental Engineering and carbon
                  management, he specializes in Product Carbon Footprint (PCF) automation,
                  Life Cycle Assessment (LCA), GHG accounting, and Scope 1, 2, and 3
                  emissions analysis.
                </p>
                <p>
                  As a Sustainability Analyst, he has contributed to PCF automation
                  projects at SABIC, building carbon accounting systems aligned with the
                  GHG Protocol, ISO standards, and global reporting frameworks. His work
                  spans supply chain decarbonization, transportation emissions modeling,
                  and regulatory compliance.
                </p>
                <p>
                  Vishnu is also the Founder of Green Guru Youth Foundation and a QS
                  Impact Youth Ambassador, representing India at national and international
                  climate platforms. Through Carbon Clock, he aims to simplify climate
                  knowledge, promote carbon literacy, and accelerate the transition toward
                  net-zero and science-based sustainability pathways.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}