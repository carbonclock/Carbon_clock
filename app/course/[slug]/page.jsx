"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, CheckCircle } from "lucide-react";
import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";

/* ── Course data ── */
const coursesData = {
  "climate-change-science-solutions": {
    id: 1,
    emoji: "🌍",
    label: "COURSE 01",
    title: "Climate Change: Science & Solutions",
    level: "Foundational",
    levelColor: "#1F4E3A",
    headerBg: "#1A3D2B",
    desc: "Understand the climate system, drivers of change, and evidence-based global solutions from policy to technology.",
    modules: [
      {
        name: "The Climate System & Greenhouse Effect",
        duration: "3-4 hours",
        topics: [
          "Earth's Energy Balance",
          "Greenhouse Gas Physics",
          "Historical Climate Data",
          "Natural vs. Anthropogenic Forcing",
        ],
      },
      {
        name: "Impacts, Risks & Tipping Points",
        duration: "2-3 hours",
        topics: [
          "Global Temperature Impacts",
          "Sea Level Rise & Extreme Weather",
          "Ecosystem & Biodiversity Risks",
          "Critical Tipping Points",
        ],
      },
      {
        name: "Mitigation, Adaptation & Global Frameworks",
        duration: "3-4 hours",
        topics: [
          "Renewable Energy & Efficiency",
          "Adaptation Strategies",
          "Paris Agreement & NDCs",
          "Net Zero Pathways",
        ],
      },
    ],
    description: `This foundational course provides a comprehensive understanding of climate science, from basic physics to global policy frameworks. Perfect for anyone entering the sustainability field.`,
    outcomes: [
      "Explain the science behind climate change and greenhouse gases",
      "Understand global climate impacts and risks",
      "Navigate international climate agreements and frameworks",
      "Identify mitigation and adaptation strategies",
    ],
  },
  "carbon-accounting-reporting": {
    id: 2,
    emoji: "📊",
    label: "COURSE 02",
    title: "Carbon Accounting & Reporting",
    level: "Intermediate",
    levelColor: "#1B3050",
    headerBg: "#1B3A5C",
    desc: "Master the principles and methodologies for measuring, reporting, and verifying corporate carbon footprints.",
    modules: [
      {
        name: "Foundations of Carbon Accounting",
        duration: "2-3 hours",
        topics: [
          "Carbon Accounting Principles",
          "Scope Classification",
          "Organizational Boundaries",
          "Data Collection Methods",
        ],
      },
      {
        name: "Scope 1, 2 & 3 Emissions Measurement",
        duration: "4-5 hours",
        topics: [
          "Direct Emissions (Scope 1)",
          "Purchased Energy (Scope 2)",
          "Value Chain Emissions (Scope 3)",
          "Measurement & Estimation Techniques",
        ],
      },
      {
        name: "Reporting Standards & Verification",
        duration: "3-4 hours",
        topics: [
          "GRI Standards",
          "SASB Guidelines",
          "Third-Party Verification",
          "Quality Assurance & Auditing",
        ],
      },
    ],
    description: `Learn to measure and report corporate carbon emissions using internationally recognized standards and methodologies. Essential for corporate sustainability teams.`,
    outcomes: [
      "Calculate Scope 1, 2, and 3 emissions accurately",
      "Apply carbon accounting principles to organizational contexts",
      "Report emissions using recognized standards (GRI, SASB)",
      "Ensure data quality and verification compliance",
    ],
  },
  "ghg-accounting-protocol": {
    id: 3,
    emoji: "🏭",
    label: "COURSE 03",
    title: "GHG Accounting & the GHG Protocol",
    level: "Intermediate-Advanced",
    levelColor: "#3D2E00",
    headerBg: "#4A3800",
    desc: "Deep-dive into greenhouse gas accounting frameworks, IPCC categories, and corporate standard implementation.",
    modules: [
      {
        name: "GHG Protocol: Corporate Standard",
        duration: "3-4 hours",
        topics: [
          "GHG Protocol Overview",
          "IPCC Categories & Methodologies",
          "Scope 1, 2 & 3 Deep Dive",
          "Establishing Organization Boundaries",
        ],
      },
      {
        name: "Activity Data, Emission Factors & Calculations",
        duration: "4-5 hours",
        topics: [
          "Data Collection & Quality",
          "Emission Factors",
          "Calculation Methods",
          "Uncertainty & Quality Assurance",
        ],
      },
      {
        name: "Target-Setting: SBTi, Net Zero & NDCs",
        duration: "3-4 hours",
        topics: [
          "Science-Based Targets (SBTi)",
          "Net Zero Commitments",
          "Nationally Determined Contributions",
          "Monitoring & Reporting Progress",
        ],
      },
    ],
    description: `This advanced course covers the GHG Protocol Corporate Standard in detail, enabling professionals to implement sophisticated emissions accounting systems.`,
    outcomes: [
      "Apply GHG Protocol Corporate Standard to complex organizations",
      "Use IPCC methodologies for emissions quantification",
      "Set science-based emissions reduction targets",
      "Monitor progress toward net zero goals",
    ],
  },
  "life-cycle-assessment": {
    id: 4,
    emoji: "♻️",
    label: "COURSE 04",
    title: "Life Cycle Assessment (LCA)",
    level: "Advanced",
    levelColor: "#2D1B5E",
    headerBg: "#3B1F72",
    desc: "Learn to quantify environmental impacts of products and systems from cradle to grave using ISO 14040/44 standards.",
    modules: [
      {
        name: "LCA Fundamentals & ISO Framework",
        duration: "3-4 hours",
        topics: [
          "LCA Principles & Phases",
          "ISO 14040/44 Standards",
          "Goal & Scope Definition",
          "Functional Units & System Boundaries",
        ],
      },
      {
        name: "Life Cycle Inventory & Impact Assessment",
        duration: "4-5 hours",
        topics: [
          "Life Cycle Inventory (LCI) Analysis",
          "Data Collection & Quality",
          "Life Cycle Impact Assessment (LCIA)",
          "Midpoint & Endpoint Categories",
        ],
      },
      {
        name: "Interpretation, Application & EPDs",
        duration: "3-4 hours",
        topics: [
          "LCA Interpretation",
          "Sensitivity & Uncertainty Analysis",
          "Environmental Product Declarations (EPDs)",
          "Real-world Applications & Case Studies",
        ],
      },
    ],
    description: `Master the ISO 14040/44 standards for Life Cycle Assessment. This advanced course enables comprehensive environmental impact quantification of products and services.`,
    outcomes: [
      "Conduct ISO-compliant Life Cycle Assessments",
      "Analyze environmental impacts across product lifecycles",
      "Create Environmental Product Declarations (EPDs)",
      "Apply LCA to strategic business decisions",
    ],
  },
  "sustainability-fundamentals-esg": {
    id: 5,
    emoji: "🌿",
    label: "COURSE 05",
    title: "Sustainability Fundamentals & ESG",
    level: "Foundational-Intermediate",
    levelColor: "#0F3D2E",
    headerBg: "#1A4A38",
    desc: "Build a solid foundation in sustainability thinking, ESG frameworks, and the evolving corporate responsibility landscape.",
    modules: [
      {
        name: "Sustainability Principles & the SDGs",
        duration: "2-3 hours",
        topics: [
          "Sustainability Fundamentals",
          "UN Sustainable Development Goals",
          "ESG Concept & Evolution",
          "Stakeholder Engagement",
        ],
      },
      {
        name: "ESG Frameworks: GRI, TCFD, CSRD & CBAM",
        duration: "4-5 hours",
        topics: [
          "GRI Standards Overview",
          "TCFD Framework for Climate",
          "EU Corporate Sustainability Reporting Directive (CSRD)",
          "Carbon Border Adjustment Mechanism (CBAM)",
        ],
      },
      {
        name: "Sustainable Business Strategy & Reporting",
        duration: "3-4 hours",
        topics: [
          "Materiality Assessment",
          "Strategy Integration",
          "ESG Reporting & Disclosure",
          "Governance & Accountability",
        ],
      },
    ],
    description: `A comprehensive introduction to sustainability and ESG for professionals new to the field. Covers global frameworks, reporting standards, and strategic integration.`,
    outcomes: [
      "Understand core sustainability and ESG principles",
      "Navigate major ESG reporting frameworks (GRI, TCFD, CSRD)",
      "Identify material ESG issues for organizations",
      "Develop integrated sustainability strategies",
    ],
  },
};

export default function CoursePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;

  const [user, setUser] = useState(null);
  const [course, setCourse] = useState(null);
  const [activeModule, setActiveModule] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (!token) { router.push("/login"); return; }
    try { setUser(JSON.parse(userData)); } catch { router.push("/login"); }
  }, [router]);

  useEffect(() => {
    if (slug && coursesData[slug]) {
      setCourse(coursesData[slug]);
    }
  }, [slug]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  const handleStartAssessment = () => {
    router.push(`/assessment/${slug}`);
  };

  if (!user || !course) return null;

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-serif-display { font-family: 'DM Serif Display', serif; }
      `}</style>

      <DashboardNavbar user={user} onLogout={handleLogout} />

      <main className="flex-1">
        {/* ── HEADER ── */}
        <section style={{ backgroundColor: course.headerBg }} className="py-16 px-6 text-white">
          <div className="max-w-7xl mx-auto">
            <motion.button
              onClick={() => router.back()}
              className="flex items-center gap-2 mb-8 text-[#A7D7C5] hover:text-white transition-colors"
              whileHover={{ x: -4 }}
            >
              <ArrowLeft size={18} /> Back to Courses
            </motion.button>

            <div className="flex items-start gap-6 mb-8">
              <div className="text-6xl">{course.emoji}</div>
              <div>
                <p className="text-[#A7D7C5]/70 text-xs tracking-[0.14em] uppercase mb-2">{course.label}</p>
                <h1 className="font-serif-display text-5xl font-bold mb-4">{course.title}</h1>
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-sm text-white/80 border border-white/20"
                  style={{ background: "rgba(255,255,255,0.12)" }}
                >
                  {course.level}
                </span>
              </div>
            </div>

            <p className="text-[#A7D7C5] text-lg leading-relaxed max-w-3xl">{course.desc}</p>
          </div>
        </section>

        {/* ── COURSE OVERVIEW ── */}
        <section className="py-16 px-6" style={{ background: "#F5F0E8" }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-10">
              {/* Left: Description & Outcomes */}
              <div className="md:col-span-2">
                <h2 className="font-serif-display text-3xl font-bold text-[#0F3D2E] mb-6">Course Overview</h2>
                <p className="text-[#5C7A6E] leading-relaxed mb-8 text-lg">{course.description}</p>

                <h3 className="font-serif-display text-2xl font-bold text-[#0F3D2E] mb-6">Learning Outcomes</h3>
                <ul className="space-y-4">
                  {course.outcomes.map((outcome, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <CheckCircle className="w-6 h-6 text-[#2E7D5B] shrink-0 mt-1" />
                      <span className="text-[#5C7A6E] text-lg">{outcome}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Right: Quick Info Card */}
              <div className="bg-white rounded-2xl p-8 border border-[#E0EDE8] h-fit" style={{ boxShadow: "0 4px 16px rgba(26, 74, 58, 0.08)" }}>
                <h3 className="font-serif-display text-xl font-bold text-[#0F3D2E] mb-6">Course Details</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[#5C7A6E] text-sm mb-1">Level</p>
                    <p className="font-semibold text-[#0F3D2E]">{course.level}</p>
                  </div>
                  <div>
                    <p className="text-[#5C7A6E] text-sm mb-1">Modules</p>
                    <p className="font-semibold text-[#0F3D2E]">3 Comprehensive Modules</p>
                  </div>
                  <div>
                    <p className="text-[#5C7A6E] text-sm mb-1">Total Duration</p>
                    <p className="font-semibold text-[#0F3D2E]">9-13 Hours</p>
                  </div>
                  <div>
                    <p className="text-[#5C7A6E] text-sm mb-1">Assessment</p>
                    <p className="font-semibold text-[#0F3D2E]">20 MCQ Questions (70% to pass)</p>
                  </div>
                  <motion.button
                    onClick={handleStartAssessment}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 rounded-xl font-semibold text-white text-center"
                    style={{ background: "#0F3D2E" }}
                  >
                    Start Assessment
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MODULES ── */}
        <section className="py-16 px-6" style={{ background: "white" }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif-display text-3xl font-bold text-[#0F3D2E] mb-12">Course Modules</h2>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Module Navigation */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-2">
                  {course.modules.map((module, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setActiveModule(i)}
                      whileHover={{ x: 4 }}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        activeModule === i
                          ? "bg-[#0F3D2E] text-white"
                          : "bg-[#F5F0E8] text-[#0F3D2E] hover:bg-[#E8F0EC]"
                      }`}
                    >
                      <p className="text-xs tracking-[0.14em] uppercase opacity-70 mb-1">Module {i + 1}</p>
                      <p className="font-semibold leading-snug">{module.name}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Module Content */}
              <motion.div
                key={activeModule}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-2 bg-[#F5F0E8] rounded-2xl p-8"
              >
                <div className="mb-6">
                  <p className="text-[#2E7D5B] text-xs tracking-[0.14em] uppercase mb-2">Module {activeModule + 1}</p>
                  <h3 className="font-serif-display text-3xl font-bold text-[#0F3D2E] mb-2">
                    {course.modules[activeModule].name}
                  </h3>
                  <p className="text-[#5C7A6E]">Duration: {course.modules[activeModule].duration}</p>
                </div>

                <h4 className="font-semibold text-[#0F3D2E] mb-4 text-lg">Topics Covered</h4>
                <ul className="space-y-3 mb-8">
                  {course.modules[activeModule].topics.map((topic, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#2E7D5B]" />
                      <span className="text-[#5C7A6E]">{topic}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="px-6 py-3 rounded-xl font-semibold text-white transition-all"
                  style={{ background: "#0F3D2E" }}
                >
                  Start Module
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CTA SECTION ── */}
        <section className="py-16 px-6" style={{ background: "#1a4a3a" }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif-display text-4xl font-bold text-white mb-6">Ready to Test Your Knowledge?</h2>
            <p className="text-[#A7D7C5] text-lg mb-8 max-w-2xl mx-auto">
              After completing all modules, take the proctored assessment to earn your certification. You need 70% to pass.
            </p>
            <motion.button
              onClick={handleStartAssessment}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full font-semibold text-[#0F3D2E] text-lg transition-all"
              style={{ background: "#D4AF37" }}
            >
              Take Assessment Now
            </motion.button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}