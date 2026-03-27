"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";

/* ── Course data ── */
const courses = [
  {
    id: 1,
    emoji: "🌍",
    label: "COURSE 01",
    title: "Climate Change: Science & Solutions",
    level: "Foundational",
    levelColor: "#1F4E3A",
    headerBg: "#1A3D2B",
    desc: "Understand the climate system, drivers of change, and evidence-based global solutions from policy to technology.",
    modules: [
      "The Climate System & Greenhouse Effect",
      "Impacts, Risks & Tipping Points",
      "Mitigation, Adaptation & Global Frameworks",
    ],
    slug: "climate-change-science-solutions",
  },
  {
    id: 2,
    emoji: "📊",
    label: "COURSE 02",
    title: "Carbon Accounting & Reporting",
    level: "Intermediate",
    levelColor: "#1B3050",
    headerBg: "#1B3A5C",
    desc: "Master the principles and methodologies for measuring, reporting, and verifying corporate carbon footprints.",
    modules: [
      "Foundations of Carbon Accounting",
      "Scope 1, 2 & 3 Emissions Measurement",
      "Reporting Standards & Verification",
    ],
    slug: "carbon-accounting-reporting",
  },
  {
    id: 3,
    emoji: "🏭",
    label: "COURSE 03",
    title: "GHG Accounting & the GHG Protocol",
    level: "Intermediate-Advanced",
    levelColor: "#3D2E00",
    headerBg: "#4A3800",
    desc: "Deep-dive into greenhouse gas accounting frameworks, IPCC categories, and corporate standard implementation.",
    modules: [
      "GHG Protocol: Corporate Standard",
      "Activity Data, Emission Factors & Calculations",
      "Target-Setting: SBTi, Net Zero & NDCs",
    ],
    slug: "ghg-accounting-protocol",
  },
  {
    id: 4,
    emoji: "♻️",
    label: "COURSE 04",
    title: "Life Cycle Assessment (LCA)",
    level: "Advanced",
    levelColor: "#2D1B5E",
    headerBg: "#3B1F72",
    desc: "Learn to quantify environmental impacts of products and systems from cradle to grave using ISO 14040/44 standards.",
    modules: [
      "LCA Fundamentals & ISO Framework",
      "Life Cycle Inventory & Impact Assessment",
      "Interpretation, Application & EPDs",
    ],
    slug: "life-cycle-assessment",
  },
  {
    id: 5,
    emoji: "🌿",
    label: "COURSE 05",
    title: "Sustainability Fundamentals & ESG",
    level: "Foundational-Intermediate",
    levelColor: "#0F3D2E",
    headerBg: "#1A4A38",
    desc: "Build a solid foundation in sustainability thinking, ESG frameworks, and the evolving corporate responsibility landscape.",
    modules: [
      "Sustainability Principles & the SDGs",
      "ESG Frameworks: GRI, TCFD, CSRD & CBAM",
      "Sustainable Business Strategy & Reporting",
    ],
    slug: "sustainability-fundamentals-esg",
  },
];

const whoCards = [
  { emoji: "🎓", title: "Students", desc: "Environmental engineering, management, and science students building career-ready credentials before graduation." },
  { emoji: "💼", title: "Sustainability Professionals", desc: "Analysts, managers, and consultants seeking structured, verifiable expertise in carbon and ESG accounting." },
  { emoji: "📈", title: "Finance & ESG Investors", desc: "Finance professionals integrating ESG risk into investment decisions and portfolio management." },
  { emoji: "🏢", title: "Corporate Teams", desc: "CSR, procurement, and operations teams building internal sustainability capabilities." },
  { emoji: "🏛️", title: "Policy & NGO Staff", desc: "Government officials and civil society professionals working on climate policy, compliance, and advocacy." },
  { emoji: "🌱", title: "Career Changers", desc: "Professionals transitioning into sustainability roles who need a credible, recognized starting point." },
];

const steps = [
  { num: "01", title: "Choose a Course", desc: "Select from 5 professional certification programs aligned to your career goals." },
  { num: "02", title: "Complete 3 Modules", desc: "Work through structured, expert-designed modules at your own pace." },
  { num: "03", title: "Take the Assessment", desc: "Complete 20 MCQ questions drawing from all three modules. Aim for 70% to pass." },
  { num: "04", title: "Earn Your Certificate", desc: "Receive a verified Carbon Clock certificate to showcase your professional credentials." },
  { num: "05", title: "Share & Advance", desc: "Add your certificate to LinkedIn, your CV, and professional profiles to stand out in the climate economy." },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (!token) { router.push("/login"); return; }
    try { setUser(JSON.parse(userData)); } catch { router.push("/login"); }
  }, [router]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loginAt");
    router.push("/");
  };


  const handleExploreCourse = (slug) => {
    router.push(`/course/${slug}`);
  };

  const handleTakeAssessment = (slug) => {
    router.push(`/assessment/${slug}`);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-serif-display { font-family: 'DM Serif Display', serif; }
      `}</style>

      <DashboardNavbar user={user} onLogout={handleLogout} />

      <main className="flex-1">

        {/* ── HERO SECTION ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1a4a3a 0%, #2a6a52 50%, #3a8a62 100%)" }}
        >
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full opacity-20"
                style={{
                  width: 60 + i * 30,
                  height: 60 + i * 30,
                  background: `radial-gradient(circle at 30% 30%, rgba(167, 215, 197, 0.8), rgba(46, 125, 91, 0.3))`,
                  left: `${10 + i * 18}%`,
                  top: `${15 + i * 12}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  x: [0, 30, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.25, 0.1],
                }}
                transition={{
                  duration: 6 + i * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(167, 215, 197, 0.15) 0%, 
                rgba(167, 215, 197, 0.08) 25%,
                rgba(167, 215, 197, 0.03) 50%,
                transparent 100%)`,
            }}
            transition={{ type: "tween", duration: 0.08 }}
          />

          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(80,200,120,0.08) 0%, transparent 70%)" }} />

          <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#A7D7C5]/50 text-[#A7D7C5] text-xs tracking-[0.18em] uppercase mb-8"
            >
              PROFESSIONAL · CREDENTIALED · RECOGNIZED
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl mx-auto"
            >
              Build Your{" "}
              <em className="not-italic" style={{ color: "#D4AF37" }}>Climate<br className="hidden sm:block" /> Credentials</em>
              <br />With Certified Expertise
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#A7D7C5] text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10"
            >
              Industry-aligned certification courses in carbon accounting, GHG management, LCA, and sustainability — designed for professionals, students, and changemakers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
            >
              <motion.button
                onClick={() => document.getElementById("courses-section").scrollIntoView({ behavior: "smooth" })}
                className="px-7 py-3.5 rounded-full font-semibold text-[#0F3D2E] cursor-pointer transition-all flex items-center gap-2"
                style={{ background: "#D4AF37" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Courses <ArrowRight size={16} />
              </motion.button>
              <motion.button
                onClick={() => document.getElementById("how-works-section").scrollIntoView({ behavior: "smooth" })}
                className="px-7 py-3.5 rounded-full font-semibold text-white border border-[#A7D7C5]/50 cursor-pointer transition-all hover:border-[#A7D7C5]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Certifications
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0 border-t border-[#A7D7C5]/30 pt-10 pb-4"
            >
              {[
                { num: "5", label: "COURSES" },
                { num: "15", label: "MODULES" },
                { num: "100", label: "MCQ QUESTIONS" },
                { num: "5", label: "CERTIFICATIONS" },
              ].map((stat, i) => (
                <div key={i} className="text-center sm:border-r border-[#A7D7C5]/20 last:border-0 px-4">
                  <p className="font-serif-display text-4xl sm:text-5xl font-bold mb-1" style={{ color: "#D4AF37" }}>{stat.num}</p>
                  <p className="text-[#A7D7C5] text-xs tracking-[0.14em] uppercase">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CERTIFICATION PROGRAMS ── */}
        <section id="courses-section" className="py-20 px-6" style={{ background: "#F5F0E8" }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[#2E7D5B] text-xs tracking-[0.18em] uppercase mb-3">// CHOOSE YOUR PATH</p>
              <h2 className="font-serif-display text-4xl sm:text-5xl font-bold text-[#0F3D2E] mb-4">Certification Programs</h2>
              <p className="text-[#5C7A6E] text-base max-w-md mx-auto">
                Each course includes 3 comprehensive modules followed by a 20-question proctored assessment. Pass to earn your certificate.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {courses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(15,61,46,0.14)" }}
                  className="rounded-2xl overflow-hidden bg-white border border-[#E0EDE8] transition-all cursor-pointer"
                >
                  <div className="p-6 pb-7 relative" style={{ backgroundColor: course.headerBg }}>
                    <div className="text-4xl mb-5">{course.emoji}</div>
                    <p className="text-[#A7D7C5]/70 text-xs tracking-[0.14em] uppercase mb-1.5">{course.label}</p>
                    <h3 className="font-serif-display text-xl font-bold text-white leading-snug mb-3">{course.title}</h3>
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs text-white/80 border border-white/20"
                      style={{ background: "rgba(255,255,255,0.12)" }}
                    >
                      {course.level}
                    </span>
                  </div>

                  <div className="p-6">
                    <p className="text-[#5C7A6E] text-sm leading-relaxed mb-5">{course.desc}</p>
                    <ul className="space-y-2.5 mb-7">
                      {course.modules.map((mod, j) => (
                        <li key={j} className="flex items-start gap-3 pb-2.5 border-b border-[#E8F0EC] last:border-0 last:pb-0">
                          <span className="shrink-0 w-6 h-6 rounded-full bg-[#E6F2ED] text-[#2E7D5B] flex items-center justify-center text-[10px] font-bold mt-0.5">
                            M{j + 1}
                          </span>
                          <span className="text-[#3A5C50] text-sm">{mod}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleExploreCourse(course.slug)}
                        className="flex-1 py-2.5 rounded-xl font-semibold text-white text-sm cursor-pointer transition-all"
                        style={{ background: "#0F3D2E" }}
                      >
                        Explore Course
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleTakeAssessment(course.slug)}
                        className="flex-1 py-2.5 rounded-xl font-semibold text-[#0F3D2E] text-sm border border-[#C5DDD4] cursor-pointer transition-all hover:border-[#2E7D5B]"
                      >
                        Take Assessment
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO SHOULD CERTIFY ── */}
        <section className="py-20 px-6" style={{ background: "#2d5f52" }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[#b8e6d8] text-xs tracking-[0.18em] uppercase mb-3">// BUILT FOR EVERYONE</p>
              <h2 className="font-serif-display text-4xl sm:text-5xl font-bold text-white mb-4">Who Should Certify?</h2>
              <p className="text-[#c8e8dc] text-base max-w-xl mx-auto">
                Our programs are designed for a wide range of learners — from first-year students to seasoned sustainability professionals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {whoCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  whileHover={{ scale: 1.02, borderColor: "rgba(167,215,197,0.4)" }}
                  className="rounded-2xl p-6 text-center transition-all cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(167,215,197,0.2)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                  }}
                >
                  <div className="text-4xl mb-4">{card.emoji}</div>
                  <h3 className="font-serif-display text-lg font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-[#c8e8dc] text-sm leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-works-section" className="py-20 px-6" style={{ background: "#faf8f3" }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[#5a8a78] text-xs tracking-[0.18em] uppercase mb-3">// HOW IT WORKS</p>
              <h2 className="font-serif-display text-4xl sm:text-5xl font-bold text-[#1a4a3a] mb-4">Your Path to Certification</h2>
              <p className="text-[#6d8a7e] text-base max-w-lg mx-auto">
                A clear, structured journey from enrollment to a verified certificate you can share with employers and on LinkedIn.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
              {steps.slice(0, 4).map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-6 text-center border border-[#dce8e2] hover:border-[#b8dfd3] transition-all"
                  style={{
                    boxShadow: "0 4px 16px rgba(26, 74, 58, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)"
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-5"
                    style={{ background: "#2d5f52" }}
                  >
                    {step.num}
                  </div>
                  <h3 className="font-serif-display text-lg font-bold text-[#1a4a3a] mb-2">{step.title}</h3>
                  <p className="text-[#6d8a7e] text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="bg-white rounded-2xl p-6 text-center border border-[#dce8e2] hover:border-[#b8dfd3] transition-all w-full sm:w-72"
                style={{
                  boxShadow: "0 4px 16px rgba(26, 74, 58, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)"
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-5"
                  style={{ background: "#2d5f52" }}
                >
                  05
                </div>
                <h3 className="font-serif-display text-lg font-bold text-[#1a4a3a] mb-2">Share & Advance</h3>
                <p className="text-[#6d8a7e] text-sm leading-relaxed">
                  Add your certificate to LinkedIn, your CV, and professional profiles to stand out in the climate economy.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}