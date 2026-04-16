"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, ArrowLeft, Download, ExternalLink, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";

export default function MyCertificationsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      setUser(JSON.parse(userData));
    } catch {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loginAt");
    router.push("/");
  };

  if (!user) return null;

  const passedCourses = user.passedAssessments || [];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0E8]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-serif-display { font-family: 'DM Serif Display', serif; }
      `}</style>

      <DashboardNavbar user={user} onLogout={handleLogout} />

      <main className="flex-1 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.button
                onClick={() => router.push("/dashboard")}
                className="flex items-center gap-2 text-[#5C7A6E] hover:text-[#0F3D2E] transition-colors mb-4 group"
                whileHover={{ x: -4 }}
              >
                <ArrowLeft size={18} />
                <span className="text-sm font-semibold">Back to Dashboard</span>
              </motion.button>
              <h1 className="font-serif-display text-4xl font-bold text-[#0F3D2E]">
                My Certifications
              </h1>
              <p className="text-[#5C7A6E] mt-2">
                Manage and view your earned climate credentials.
              </p>
            </div>
            
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-[#E0EDE8] shadow-sm">
              <Award className="text-[#D4AF37]" size={20} />
              <span className="text-sm font-bold text-[#0F3D2E]">
                {passedCourses.length} Certificates Earned
              </span>
            </div>
          </div>

          {/* Certificates Grid */}
          {passedCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {passedCourses.map((courseSlug, index) => (
                <motion.div
                  key={courseSlug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-3xl p-6 border border-[#E0EDE8] shadow-sm flex flex-col group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#E6F2ED] rounded-full blur-2xl -mr-12 -mt-12 opacity-50" />
                  
                  <div className="mb-6 relative z-10">
                    <div className="w-12 h-12 bg-[#F5F0E8] rounded-2xl flex items-center justify-center text-[#2E7D5B] mb-4 group-hover:bg-[#E6F2ED] transition-colors">
                      <Award size={24} />
                    </div>
                    <h3 className="font-serif-display text-xl font-bold text-[#0F3D2E] leading-tight mb-2 uppercase tracking-tight">
                      {courseSlug.split("-").join(" ")}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-[#2E7D5B] uppercase tracking-wider">
                      <ShieldCheck size={12} />
                      Verified by Carbon Clock
                    </div>
                  </div>

                  <div className="mt-auto space-y-3 relative z-10">
                    <button className="w-full py-2.5 rounded-xl bg-[#0F3D2E] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#1A4A38] transition-all shadow-md">
                      <Download size={14} />
                      Download PDF
                    </button>
                    <button className="w-full py-2.5 rounded-xl bg-white text-[#0F3D2E] text-xs font-bold border border-[#E0EDE8] flex items-center justify-center gap-2 hover:bg-[#F5F0E8] transition-all">
                      <ExternalLink size={14} />
                      View Online
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-[32px] p-12 text-center border border-[#E0EDE8] shadow-sm"
            >
              <div className="w-20 h-20 bg-[#F5F0E8] rounded-full flex items-center justify-center mx-auto mb-6">
                <Award size={40} className="text-[#A7D7C5]" />
              </div>
              <h2 className="font-serif-display text-2xl font-bold text-[#0F3D2E] mb-2">
                No Certificates Yet
              </h2>
              <p className="text-[#5C7A6E] mb-8 max-w-sm mx-auto">
                Complete assessments with a score of 70% or higher to earn your professional certificates.
              </p>
              <motion.button
                onClick={() => router.push("/dashboard")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-[#0F3D2E] text-white font-bold transition-all shadow-lg"
              >
                Explore Courses
              </motion.button>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
