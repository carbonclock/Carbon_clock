"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

/* ── Reusable fade-up on scroll ── */
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ── Section heading with teal underline (matches reference) ── */
const SectionHeading = ({ children }) => (
  <div className="mb-6">
    <h2 className="text-3xl font-bold text-[#0F3D2E]">{children}</h2>
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-2 h-0.75 w-14 bg-[#2E7D5B] origin-left rounded-full"
    />
  </div>
);

/* ── Image card with about.png ── */
const ImgCard = ({ flip = false }) => (
  <motion.div
    initial={{ opacity: 0, x: flip ? -40 : 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    whileHover={{ scale: 1.02, boxShadow: "0 20px 48px rgba(15,61,46,0.14)" }}
    className="w-full h-72 md:h-80 rounded-2xl overflow-hidden shadow-lg relative"
  >
    <Image
      src="/about.png"
      alt="About Carbon Clock"
      fill
      className="object-cover"
    />
  </motion.div>
);

const AboutPage = () => {
  return (
    <main className="bg-[#F4F8F6] text-[#0F3D2E]">

      {/* ── HERO — full-screen cover with about_cover.jpg ── */}
      <section className="relative w-full h-screen min-h-150 flex items-center justify-center overflow-hidden">

        {/* Background image */}
        <Image
          src="/about_cover.jpg"
          alt="About Cover"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Green tint overlay */}
        <div className="absolute inset-0 bg-[#0F3D2E]/60" />

        {/* Subtle light-green gradient at bottom to blend into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#F4F8F6] to-transparent" />

        {/* ── Floating bubbles ── */}
        {[
          { size: "w-16 h-16", top: "15%", left: "8%",  delay: 0,   dur: 5 },
          { size: "w-10 h-10", top: "60%", left: "5%",  delay: 1,   dur: 7 },
          { size: "w-24 h-24", top: "20%", left: "80%", delay: 0.5, dur: 6 },
          { size: "w-8  h-8",  top: "70%", left: "85%", delay: 1.5, dur: 4.5 },
          { size: "w-14 h-14", top: "80%", left: "40%", delay: 0.8, dur: 6.5 },
          { size: "w-6  h-6",  top: "35%", left: "92%", delay: 2,   dur: 5.5 },
        ].map((b, i) => (
          <motion.div
            key={i}
            className={`absolute ${b.size} rounded-full border-2 border-[#A7D7C5]/50 bg-[#2E7D5B]/10 backdrop-blur-sm`}
            style={{ top: b.top, left: b.left }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.08, 1],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Text content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto -mt-32">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#A7D7C5] border border-[#A7D7C5]/60 px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#A7D7C5] animate-pulse" />
              Who We Are
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-5xl md:text-6xl font-bold text-white leading-tight"
          >
            About Carbon Clock
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 text-lg text-[#C5E8D8] max-w-xl mx-auto leading-relaxed"
          >
            Carbon Clock simplifies sustainability knowledge and transforms awareness
            into measurable climate action.
          </motion.p>
        </div>
      </section>

      {/* ── OUR STORY — text left, image right (matches reference image 2) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <FadeUp>
            <SectionHeading>Our Story</SectionHeading>
            <p className="text-[#355F53] leading-relaxed mb-4">
              Carbon Clock was born from a simple realization: while climate change is
              widely discussed, it is rarely understood in practical terms. Technical
              language such as Scope emissions, ESG metrics, carbon footprints, and
              lifecycle assessments often remains confined to academic or industrial
              spaces, leaving the general public disconnected from the very knowledge
              needed to drive change.
            </p>
            <p className="text-[#355F53] leading-relaxed">
              Recognizing this gap, Carbon Clock was created as a platform to translate
              complexity into clarity — transforming dense sustainability concepts into
              accessible learning and meaningful action. Our journey is rooted in the
              belief that awareness must lead to accountability, and accountability must
              lead to action.
            </p>
          </FadeUp>

          <ImgCard flip={false} />
        </div>
      </section>

      {/* ── OUR MISSION & OUR VISION side-by-side (matches reference image 1) ── */}
      <section className="py-20 bg-[#F4F8F6]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">

          {/* Mission — plain card */}
          <FadeUp delay={0}>
            <div className="h-full">
              <SectionHeading>Our Mission</SectionHeading>
              <p className="text-[#355F53] leading-relaxed mb-4">
                Our mission is to make sustainability understandable, actionable, and
                measurable for everyone — not just experts. We aim to simplify complex
                environmental frameworks such as carbon accounting, lifecycle thinking,
                and responsible resource use so that students, professionals, and
                communities can actively participate in climate solutions.
              </p>
              <p className="text-[#355F53] leading-relaxed">
                We believe that informed citizens create resilient systems, and that
                small, conscious actions — when multiplied across society — can lead to
                meaningful environmental transformation.
              </p>
            </div>
          </FadeUp>

          {/* Vision — highlighted card (matches the light-blue card in reference) */}
          <FadeUp delay={0.15}>
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(15,61,46,0.12)" }}
              transition={{ duration: 0.25 }}
              className="h-full bg-[#E6F2ED] border-l-4 border-[#2E7D5B] rounded-2xl p-8 shadow-sm"
            >
              <SectionHeading>Our Vision</SectionHeading>
              <p className="text-[#355F53] leading-relaxed mb-4">
                Our vision is to build a carbon-literate generation capable of
                understanding how their choices influence the planet. We envision a
                future where sustainability is embedded into education, professional
                practice, and daily life.
              </p>
              <p className="text-[#355F53] leading-relaxed">
                Carbon Clock strives to cultivate awareness that goes beyond headlines
                and statistics, nurturing critical thinking about consumption, energy
                use, waste, and long-term ecological balance. A sustainable future is
                not achieved by policy alone, but by people who understand impact —
                and act on it consistently.
              </p>
            </motion.div>
          </FadeUp>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "Youth Engaged" },
              { value: "30+",  label: "Nations Reached" },
              { value: "50+",  label: "Events Conducted" },
              { value: "100%", label: "Youth-Led" },
            ].map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  className="p-6 rounded-2xl bg-[#F4F8F6] shadow-sm"
                >
                  <p className="text-4xl font-bold text-[#2E7D5B]">{stat.value}</p>
                  <p className="mt-1 text-sm text-[#355F53] font-medium">{stat.label}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default AboutPage;