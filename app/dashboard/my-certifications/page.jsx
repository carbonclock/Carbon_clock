"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, ArrowLeft, Download, ExternalLink, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";
import CertificateGenerator from "@/components/CertificateGenerator";

export default function MyCertificationsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const [refresh, setRefresh] = useState(0);
  
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

    const timer = setInterval(() => {
      setRefresh(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loginAt");
    router.push("/");
  };

  if (!user) return null;

  const certificates = user.certificates || [];

  const getTimeRemaining = (completedAt) => {
    // Lock for 1 hour after completion
    const UNLOCK_DURATION = 1 * 60 * 60 * 1000;
    const unlockTime = new Date(completedAt).getTime() + UNLOCK_DURATION;
    const remaining = unlockTime - Date.now();
    return remaining > 0 ? remaining : 0;
  };

  const formatCountdown = (ms) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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
                {certificates.length} Certificates Earned
              </span>
            </div>
          </div>

          {/* Certificates Grid */}
          {certificates.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert, index) => {
                const remaining = getTimeRemaining(cert.completedAt);
                const isLocked = remaining > 0;

                return (
                  <motion.div
                    key={cert.certificateId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={!isLocked ? { y: -4 } : {}}
                    className={`bg-white rounded-3xl p-6 border border-[#E0EDE8] shadow-sm flex flex-col group relative overflow-hidden ${isLocked ? "opacity-90" : ""}`}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#E6F2ED] rounded-full blur-2xl -mr-12 -mt-12 opacity-50" />

                    <div className="mb-6 relative z-10">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors ${isLocked ? "bg-gray-100 text-gray-400" : "bg-[#F5F0E8] text-[#2E7D5B] group-hover:bg-[#E6F2ED]"}`}>
                        <Award size={24} />
                      </div>
                      <h3 className="font-serif-display text-xl font-bold text-[#0F3D2E] leading-tight mb-2 uppercase tracking-tight">
                        {cert.courseTitle}
                      </h3>
                      <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider ${isLocked ? "text-orange-500" : "text-[#2E7D5B]"}`}>
                        {isLocked ? (
                          <>
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                            Unlocking in {formatCountdown(remaining)}
                          </>
                        ) : (
                          <>
                            <ShieldCheck size={12} />
                            Verified by Carbon Clock
                          </>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto space-y-3 relative z-10">
                      {isLocked ? (
                        <div className="w-full py-3 px-4 rounded-xl bg-gray-50 border border-gray-100 text-gray-400 text-[10px] text-center font-medium leading-relaxed">
                          Your certificate is being securely generated. <br /> Check back soon!
                        </div>
                      ) : (
                        <>
                          <CertificateGenerator
                            userName={user.name}
                            courseName={cert.courseTitle}
                            issueDate={new Date(cert.issueDate).toLocaleDateString("en-US", {
                              month: "long",
                              day: "2-digit",
                              year: "numeric"
                            })}
                            certificateId={cert.certificateId}
                          />
                          <Link 
                            href={`/certificate/${cert.certificateId}`}
                            target="_blank"
                            className="w-full py-2.5 rounded-xl bg-white text-[#0F3D2E] text-xs font-bold border border-[#E0EDE8] flex items-center justify-center gap-2 hover:bg-[#F5F0E8] transition-all"
                          >
                            <ExternalLink size={14} />
                            View Online
                          </Link>
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
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
