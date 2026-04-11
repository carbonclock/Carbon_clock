"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { courseContent } from "@/lib/courseContent";
import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";

export default function ModulePage() {
  const router = useRouter();
  const params = useParams();
  const { slug, index } = params;
  const moduleIndex = parseInt(index, 10) - 1;

  const [user, setUser] = useState(null);
  const [module, setModule] = useState(null);
  const [courseTitle, setCourseTitle] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (!token) { router.push("/login"); return; }
    try { setUser(JSON.parse(userData)); } catch { router.push("/login"); }
  }, [router]);

  useEffect(() => {
    if (slug && courseContent[slug] && courseContent[slug][moduleIndex]) {
      setModule(courseContent[slug][moduleIndex]);
      // Rough mapping for title (could be improved by importing courseData)
      const titles = {
        "climate-change-science-solutions": "Climate Change: Science & Solutions",
        "carbon-accounting-reporting": "Carbon Accounting & Reporting",
        "ghg-accounting-protocol": "GHG Accounting & the GHG Protocol",
        "life-cycle-assessment": "Life Cycle Assessment (LCA)",
        "sustainability-fundamentals-esg": "Sustainability Fundamentals & ESG"
      };
      setCourseTitle(titles[slug] || "Course Content");
    }
  }, [slug, moduleIndex]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loginAt");
    router.push("/");
  };

  const markModuleComplete = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch("/api/course/complete-module", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          courseSlug: slug,
          moduleIndex: moduleIndex + 1
        })
      });
      // Update local storage user data
      const updatedUser = { ...user };
      if (!updatedUser.completedModules) updatedUser.completedModules = [];
      
      const moduleKey = `${slug}_module_${moduleIndex + 1}`;
      if (!updatedUser.completedModules.includes(moduleKey)) {
        updatedUser.completedModules.push(moduleKey);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Error marking module complete:", error);
    }
  };

  const handleNext = async () => {
    await markModuleComplete();
    if (courseContent[slug][moduleIndex + 1]) {
      router.push(`/course/${slug}/module/${moduleIndex + 2}`);
    } else {
      router.push(`/assessment/${slug}`); // Navigate to assessment if it's the last module
    }
  };

  const handlePrev = () => {
    if (moduleIndex > 0) {
      router.push(`/course/${slug}/module/${moduleIndex}`);
    } else {
      router.push(`/course/${slug}`);
    }
  };

  if (!user || !module) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCFB]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-serif-display { font-family: 'DM Serif Display', serif; }
        .prose h2 { font-family: 'DM Serif Display', serif; color: #0F3D2E; font-size: 1.875rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1.25rem; }
        .prose p { color: #3D5A4E; line-height: 1.8; margin-bottom: 1.5rem; font-size: 1.125rem; }
        .prose ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; color: #3D5A4E; }
        .prose li { margin-bottom: 0.5rem; font-size: 1.05rem; }
        .section-heading { color: #C29231; font-weight: 700; font-size: 1.5rem; margin-top: 3.5rem; margin-bottom: 1rem; display: block; border-bottom: 1px solid #E0EDE8; padding-bottom: 0.5rem; }
        .module-table { width: 100%; border-collapse: collapse; margin: 2rem 0; font-size: 0.95rem; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .module-table th { background: #0F3D2E; color: white; text-align: left; padding: 12px 16px; font-weight: 600; }
        .module-table td { padding: 12px 16px; border-bottom: 1px solid #E0EDE8; color: #3D5A4E; vertical-align: top; }
        .module-table tr:last-child td { border-bottom: none; }
        .callout-box { background: #FDF7E7; border-left: 5px solid #C29231; padding: 1.75rem; margin: 2rem 0; border-radius: 0 12px 12px 0; display: flex; flex-direction: row; gap: 1.5rem; align-items: flex-start; }
        .callout-title { font-weight: 800; color: #C29231; width: 130px; flex-shrink: 0; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; line-height: 1.4; }
        .callout-text { color: #3D5A4E; font-size: 1.05rem; line-height: 1.7; flex: 1; }
      `}</style>

      <DashboardNavbar user={user} onLogout={handleLogout} />

      <main className="flex-1 py-12 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb / Back */}
          <motion.button
            onClick={() => router.push(`/course/${slug}`)}
            className="flex items-center gap-2 text-[#5C7A6E] hover:text-[#0F3D2E] transition-colors mb-8 text-sm font-medium"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft size={16} /> Back to {courseTitle}
          </motion.button>

          {/* Module Header */}
          <header className="mb-12 border-b border-[#E0EDE8] pb-10">
            <div className="flex items-center gap-3 text-[#2E7D5B] text-xs tracking-[0.2em] uppercase font-bold mb-4">
              <BookOpen size={16} />
              Module {index} of 3
            </div>
            <h1 className="font-serif-display text-4xl sm:text-5xl font-bold text-[#0F3D2E] leading-tight">
              {module.title}
            </h1>
          </header>

          {/* Module Content Area */}
          <article className="prose max-w-none">
            {module.content.map((item, i) => {
              if (item.type === "section_heading") return <h3 key={i} className="section-heading">{item.text}</h3>;
              if (item.type === "heading") return <h2 key={i}>{item.text}</h2>;
              if (item.type === "paragraph") return <p key={i}>{item.text}</p>;
              if (item.type === "list") return (
                <ul key={i}>
                  {item.items.map((li, j) => <li key={j}>{li}</li>)}
                </ul>
              );
              if (item.type === "table") return (
                <div key={i} className="overflow-x-auto">
                  <table className="module-table">
                    <thead>
                      <tr>
                        {item.headers.map((h, j) => <th key={j}>{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {item.rows.map((row, j) => (
                        <tr key={j}>
                          {row.map((cell, k) => <td key={k}>{cell}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
              if (item.type === "callout") return (
                <div key={i} className="callout-box">
                  <div className="callout-title">{item.title}</div>
                  <div className="callout-text">{item.text}</div>
                </div>
              );
              if (item.type === "image") return (
                <div key={i} className="my-10 rounded-2xl overflow-hidden border border-[#E0EDE8] shadow-sm bg-white">
                  {/* Placeholder for images until they are generated or provided */}
                  <div className="aspect-video bg-[#F5F0E8] flex items-center justify-center text-[#5C7A6E] p-10 text-center">
                    <p className="italic opacity-60">Visual Aid: {item.alt}</p>
                  </div>
                </div>
              );
              return null;
            })}
          </article>

          {/* Navigation */}
          <footer className="mt-16 pt-10 border-t border-[#E0EDE8] flex items-center justify-between">
            <motion.button
              onClick={handlePrev}
              className="px-6 py-3 rounded-xl border border-[#C5DDD4] text-[#0F3D2E] font-semibold flex items-center gap-2 hover:bg-[#F5F0E8] transition-all"
              whileHover={{ x: -4 }}
            >
              <ChevronLeft size={18} /> {moduleIndex === 0 ? "Course Overview" : "Previous Module"}
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="px-8 py-3 rounded-xl bg-[#0F3D2E] text-white font-semibold flex items-center gap-2 hover:bg-[#1A4A38] transition-all"
              whileHover={{ x: 4 }}
            >
              {courseContent[slug][moduleIndex + 1] ? "Next Module" : "Take Assessment"} <ChevronRight size={18} />
            </motion.button>
          </footer>
        </div>
      </main>

      <Footer />
    </div>
  );
}
