"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/* ── Scroll fade-up ── */
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  );
};

/* ── Section heading — icon + title + two-tone underline ── */
const SectionHeading = ({ icon, title, inView, delay = 0 }) => (
  <div className="flex flex-col items-start mb-8">
    <div className="flex items-center gap-3 mb-3">
      <motion.span
        initial={{ scale: 0.5, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: delay + 0.05, duration: 0.45, type: "spring", stiffness: 220 }}
        className="text-4xl leading-none"
      >{icon}</motion.span>
      <motion.h2
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: delay + 0.1, duration: 0.55 }}
        className="text-3xl sm:text-4xl font-bold text-[#0F3D2E] leading-tight"
      >{title}</motion.h2>
    </div>
    {/* Two-tone underline */}
    <div className="flex h-[3px] w-16 ml-[52px] overflow-hidden rounded-full">
      <motion.div
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: delay + 0.25, duration: 0.4, ease: "easeOut" }}
        className="flex-1 bg-[#2E7D5B] origin-left"
      />
      <motion.div
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: delay + 0.38, duration: 0.35, ease: "easeOut" }}
        className="flex-1 bg-[#A7D7C5] origin-left"
      />
    </div>
  </div>
);

/* ── Individual section block ── */
const ArticleSection = ({ icon, title, bg = "bg-white", children, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className={`${bg} py-16 sm:py-24`}>
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHeading icon={icon} title={title} inView={inView} delay={delay} />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: delay + 0.2, duration: 0.6 }}
        >{children}</motion.div>
      </div>
    </section>
  );
};

/* ── Plain bullet ── */
const Bullet = ({ text, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.li ref={ref}
      initial={{ opacity: 0, x: -14 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="flex items-start gap-3 text-[#355F53] text-base sm:text-lg leading-relaxed"
    >
      <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-[#2E7D5B] flex-shrink-0" />
      <span>{text}</span>
    </motion.li>
  );
};

export default function CBAMBlogPost() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgParallax = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <main className="min-h-screen bg-[#F4F8F6] text-[#0F3D2E] overflow-hidden">

      {/* ambient orbs */}
      <motion.div animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-16 -right-16 w-80 h-80 rounded-full bg-[#A7D7C5]/15 blur-3xl pointer-events-none z-0" />
      <motion.div animate={{ y: [0, 22, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="fixed bottom-8 -left-16 w-64 h-64 rounded-full bg-[#2E7D5B]/8 blur-3xl pointer-events-none z-0" />

      {/* ══════════════════════════════════
          HERO — left text / right image card
      ══════════════════════════════════ */}
      <section ref={heroRef} className="relative z-10 bg-[#F4F8F6] min-h-[90vh] flex items-center border-b border-[#A7D7C5]/20">
        <div className="max-w-6xl mx-auto w-full px-6 sm:px-10 lg:px-16 py-28 lg:py-0 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <div>
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }} className="mb-8">
              <Link href="/blog">
                <motion.span whileHover={{ x: -4 }} transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D5B] hover:text-[#0F3D2E] transition-colors cursor-pointer group">
                  <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Blog
                </motion.span>
              </Link>
            </motion.div>

            {/* Title */}
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-[3.2rem] font-black text-[#0F3D2E] leading-[1.1] tracking-tight mb-5">
              Carbon Border<br />
              Adjustment<br />
              <span className="text-[#2E7D5B]">Mechanism</span><br />
              <span className="text-[#2E7D5B]">(CBAM)</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.6 }}
              className="text-[#355F53] font-semibold text-base sm:text-lg mb-3 leading-snug">
              Strategic Implications for Companies<br className="hidden sm:block" /> Trading with the EU
            </motion.p>

            {/* Intro */}
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.6 }}
              className="text-[#355F53] text-sm sm:text-[15px] leading-relaxed mb-8 max-w-lg">
              The European Union is entering a new phase of climate-aligned trade regulation. For companies exporting carbon-intensive products to the EU, CBAM represents a material regulatory, financial and operational development that requires immediate strategic attention.
            </motion.p>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.46, duration: 0.5 }}>
              <motion.a href="#content"
                whileHover={{ scale: 1.04, boxShadow: "0 10px 28px rgba(15,61,46,0.22)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#0F3D2E] text-white rounded-xl font-bold text-[15px] hover:bg-[#2E7D5B] transition-colors cursor-pointer shadow-md"
              >
                Read Article
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </motion.a>
            </motion.div>
          </div>

          {/* RIGHT — hero image */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: imgParallax }}
            className="relative hidden lg:flex items-center"
          >
            <motion.div
              whileHover={{ scale: 1.02, boxShadow: "0 32px 72px rgba(15,61,46,0.18)" }}
              transition={{ duration: 0.35 }}
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[#A7D7C5]/40"
            >
              <Image
                src="/blog11.png"
                alt="CBAM Article"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D2E]/30 via-transparent to-transparent pointer-events-none" />
              {/* Floating tag */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="absolute bottom-4 left-4"
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[#2E7D5B] text-xs font-bold rounded-full shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D5B] animate-pulse" />
                  Trade & Climate Policy
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          ARTICLE SECTIONS
      ══════════════════════════════════ */}
      <div id="content">

        {/* What Is CBAM */}
        <ArticleSection icon="🌐" title="What Is CBAM?" bg="bg-white" delay={0.05}>
          <div className="space-y-4 text-[#355F53] text-base sm:text-lg leading-relaxed">
            <p>CBAM is a regulatory instrument adopted by the European Union to prevent carbon leakage and maintain the effectiveness of EU climate policy. The mechanism applies a carbon price to imported goods based on their embedded greenhouse gas emissions, aligning import costs with the EU ETS.</p>
            <p className="font-bold text-[#0F3D2E] text-base sm:text-lg">Sectors currently covered include:</p>
            <ul className="space-y-2.5 mt-1">
              {["Cement", "Iron and steel", "Aluminium", "Fertilizers", "Hydrogen", "Electricity"].map((item, i) => (
                <Bullet key={i} text={item} delay={i * 0.07} />
              ))}
            </ul>
          </div>
        </ArticleSection>

        {/* Policy Rationale — alt bg */}
        <ArticleSection icon="📜" title="Policy Rationale Behind CBAM" bg="bg-[#F4F8F6]" delay={0.05}>
          <div className="space-y-4 text-[#355F53] text-base sm:text-lg leading-relaxed">
            <p>CBAM addresses the risk that climate-ambitious EU industries could be placed at a competitive disadvantage compared to producers operating in jurisdictions with weaker carbon regulations.</p>
            <p>The policy aims to:</p>
            <ul className="space-y-2.5 mt-1">
              {[
                "Preserve the EU's climate ambition",
                "Ensure fair competition in the internal market",
                "Encourage global emissions reductions",
                "Integrate climate considerations into international trade",
              ].map((item, i) => <Bullet key={i} text={item} delay={i * 0.08} />)}
            </ul>
            <p>In effect, CBAM embeds carbon accountability directly into cross-border commerce.</p>
          </div>
        </ArticleSection>

        {/* Compliance Package */}
        <ArticleSection icon="📋" title="What the CBAM Compliance Package Requires" bg="bg-white" delay={0.05}>
          <div className="space-y-6 text-[#355F53] text-base sm:text-lg leading-relaxed">
            <p>CBAM introduces a structured compliance framework for importers and non-EU producers supplying the EU market.</p>

            {/* Sub block 1 */}
            <FadeUp delay={0.1}>
              <div className="border-l-4 border-[#2E7D5B] pl-5 py-1">
                <p className="font-bold text-[#0F3D2E] text-base sm:text-lg mb-3">1. Mandatory Emissions Reporting (Transitional Phase)</p>
                <p className="mb-3">During the transitional period, companies must report:</p>
                <ul className="space-y-2">
                  {[
                    "Direct (Scope 1) emissions associated with production",
                    "Indirect (Scope 2) emissions, where applicable",
                    "Production volumes and country of origin",
                    "Installation-level emissions data, aligned with EU methodology",
                  ].map((item, i) => <Bullet key={i} text={item} delay={i * 0.07} />)}
                </ul>
              </div>
            </FadeUp>

            {/* Sub block 2 */}
            <FadeUp delay={0.15}>
              <div className="border-l-4 border-[#A7D7C5] pl-5 py-1">
                <p className="font-bold text-[#0F3D2E] text-base sm:text-lg mb-3">2. Carbon Cost Obligation (From 2026)</p>
                <p className="mb-3">From January 2026 onward:</p>
                <ul className="space-y-2">
                  {[
                    "Importers must purchase CBAM certificates",
                    "Certificate prices will mirror EU ETS carbon prices",
                    "Carbon costs paid in the country of origin may be deducted",
                  ].map((item, i) => <Bullet key={i} text={item} delay={i * 0.07} />)}
                </ul>
              </div>
            </FadeUp>
          </div>
        </ArticleSection>

        {/* Key Challenges */}
        <ArticleSection icon="⚠️" title="Key Challenges for Affected Companies" bg="bg-[#F4F8F6]" delay={0.05}>
          <div className="space-y-5 text-[#355F53] text-base sm:text-lg leading-relaxed">
            <p>CBAM compliance introduces several structural and operational challenges:</p>
            <FadeUp delay={0.05}>
              <div className="space-y-5 mt-2">
                {[
                  { bold: "Emissions Data Availability and Quality:", text: "Many exporters lack reliable, product-level emissions data aligned with EU requirements, increasing reliance on default values and exposure to higher costs." },
                  { bold: "Supply Chain Transparency:", text: "CBAM requires verified emissions data across the value chain, placing new expectations on upstream suppliers and contract manufacturers." },
                  { bold: "Verification and Audit Readiness:", text: "Reported data must be robust, traceable and verifiable. Weak data governance increases compliance risk and regulatory scrutiny." },
                  { bold: "Financial and Commercial Impact:", text: "CBAM creates a direct carbon cost for EU imports, affecting pricing strategies, margins and long-term market competitiveness." },
                ].map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.45 }}
                    className="flex items-start gap-3 text-base sm:text-lg"
                  >
                    <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-[#2E7D5B] flex-shrink-0" />
                    <p><span className="font-bold text-[#0F3D2E]">{item.bold}</span> {item.text}</p>
                  </motion.div>
                ))}
              </div>
            </FadeUp>
          </div>
        </ArticleSection>

        {/* Strategic Priority */}
        <ArticleSection icon="🎯" title="Why CBAM Is a Strategic Priority" bg="bg-white" delay={0.05}>
          <div className="space-y-4 text-[#355F53] text-base sm:text-lg leading-relaxed">
            <p>CBAM signals a broader shift in global trade policy, where carbon intensity becomes a determinant of market access.</p>
            <p>Organizations that proactively adapt can:</p>
            <ul className="space-y-2.5">
              {[
                "Reduce long-term compliance costs",
                "Improve data maturity and transparency",
                "Strengthen EU market positioning",
                "Align trade strategy with net-zero commitments",
              ].map((item, i) => <Bullet key={i} text={item} delay={i * 0.08} />)}
            </ul>
            <FadeUp delay={0.15}>
              <p className="mt-4">Conversely, delayed action may result in higher costs, compliance risk and competitive disadvantage.</p>
            </FadeUp>
          </div>
        </ArticleSection>

        {/* Summary */}
        <ArticleSection icon="✅" title="Summary" bg="bg-[#F4F8F6]" delay={0.05}>
          <div className="space-y-4 text-[#355F53] text-base sm:text-lg leading-relaxed">
            <p>The Carbon Border Adjustment Mechanism represents a fundamental change in how climate policy intersects with international trade.</p>
            <p>For companies exporting to the EU, CBAM compliance is no longer optional — it is a strategic imperative requiring early preparation, robust emissions data and integrated sustainability governance.</p>
            <p>Organizations that respond proactively will be best positioned to maintain competitiveness in a carbon-constrained global economy.</p>
          </div>
        </ArticleSection>

        {/* Reference */}
        <section className="bg-white py-10 border-t border-[#A7D7C5]/30">
          <FadeUp>
            <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 flex items-start gap-4">
              <span className="text-xl flex-shrink-0">🔗</span>
              <div>
                <p className="text-[#0F3D2E] text-xs font-black uppercase tracking-wider mb-1.5">Reference</p>
                <a href="https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en"
                  target="_blank" rel="noopener noreferrer"
                  className="text-[#2E7D5B] text-sm sm:text-base font-medium hover:underline break-all">
                  https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en
                </a>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* Back CTA */}
        <section className="bg-white pb-20 pt-4">
          <FadeUp>
            <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 flex justify-center">
              <Link href="/blog">
                <motion.span
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(15,61,46,0.2)" }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#0F3D2E] text-white rounded-xl font-bold text-[15px] hover:bg-[#2E7D5B] transition-colors cursor-pointer shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to All Articles
                </motion.span>
              </Link>
            </div>
          </FadeUp>
        </section>

      </div>
    </main>
  );
}