"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import CertificateGenerator from "@/components/CertificateGenerator";
import { Loader2, Award, ShieldCheck, ArrowLeft, Download, Share2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ViewCertificatePage() {
  const { id } = useParams();
  const router = useRouter();
  const [certData, setCertData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scale, setScale] = useState(0.4); // Start with a reasonable mobile scale
  const certRef = useRef(null);

  useEffect(() => {
    const fetchCert = async () => {
      try {
        const res = await fetch(`/api/certificate/${id}`);
        const data = await res.json();
        if (res.ok) {
          setCertData(data);
        } else {
          setError(data.error || "Failed to load certificate");
        }
      } catch (err) {
        setError("An error occurred while fetching the certificate");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCert();
  }, [id]);

  useEffect(() => {
    if (loading) return;

    const updateScale = () => {
      const width = window.innerWidth;
      const certWidth = 1123;
      
      let targetWidth;
      if (width < 640) { // Mobile
        targetWidth = width - 40; // 20px padding each side
      } else if (width < 1024) { // Tablet
        targetWidth = width - 80;
      } else { // Desktop (Sidebar takes 350px + 48px gap)
        targetWidth = Math.min(1123, width - 350 - 48 - 120);
      }
      
      const newScale = Math.max(0.2, Math.min(1, targetWidth / certWidth));
      setScale(newScale);
    };

    window.addEventListener("resize", updateScale);
    updateScale();
    
    // Check after a short delay for layout to settle
    const timer = setTimeout(updateScale, 100);
    
    return () => {
      window.removeEventListener("resize", updateScale);
      clearTimeout(timer);
    };
  }, [loading]);

  const handleDownload = async () => {
    if (certRef.current) {
      setIsDownloading(true);
      await certRef.current.download();
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCF9]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="mb-4"
        >
          <Loader2 className="text-[#0F3D2E]" size={48} />
        </motion.div>
        <p className="text-[#5C7A6E] font-medium animate-pulse">Verifying Credential...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCF9] p-6 text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl border border-red-50"
        >
          <Award size={40} className="text-red-200" />
        </motion.div>
        <h1 className="text-2xl font-bold text-[#0F3D2E] mb-2">Certificate Not Found</h1>
        <p className="text-[#5C7A6E] mb-8 max-w-md">
          {error}. Please check the URL or contact support if you believe this is an error.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
          className="px-8 py-3 rounded-full bg-[#0F3D2E] text-white font-bold transition-all shadow-lg"
        >
          Back to Home
        </motion.button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF9]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700&family=Dancing+Script:wght@700&display=swap');
        .font-serif-display { font-family: 'DM Serif Display', serif; }
      `}</style>

      <main className="flex-1 py-4 md:py-10 px-4 md:px-6 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#E6F2ED] rounded-full blur-[80px] md:blur-[120px] -mr-32 -mt-32 md:-mr-64 md:-mt-64 opacity-50" />
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#F5F0E8] rounded-full blur-[80px] md:blur-[120px] -ml-32 -mb-32 md:-ml-64 md:-mb-64 opacity-50" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-6 md:mb-10">
            <motion.button 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              onClick={() => router.push("/dashboard/my-certifications")}
              className="flex items-center gap-2 text-[#5C7A6E] hover:text-[#0F3D2E] transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-[#E0EDE8] group-hover:bg-[#E6F2ED] transition-colors">
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              </div>
              <span className="text-[10px] md:text-sm font-semibold uppercase tracking-wider">Back</span>
            </motion.button>

            <div className="flex items-center gap-3">
               <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-white border border-[#E0EDE8] text-[#5C7A6E] text-xs md:text-sm font-bold shadow-sm hover:border-[#2E7D5B] hover:text-[#2E7D5B] transition-all"
              >
                {copied ? <Check size={14} /> : <Share2 size={14} />}
                {copied ? "Copied" : "Share"}
              </motion.button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr,350px] gap-8 lg:gap-12 items-start">
            {/* Certificate Display */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full flex justify-center order-first lg:order-none"
            >
              <div className="bg-white p-2 md:p-6 rounded-[24px] md:rounded-[40px] shadow-[0_32px_64px_-16px_rgba(15,61,46,0.12)] border border-[#E0EDE8] overflow-hidden relative group">
                 {/* Shiny Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none z-20" />
                 
                 <div 
                  className="relative overflow-hidden flex items-center justify-center"
                  style={{ 
                    width: `${1123 * scale}px`,
                    height: `${794 * scale}px`,
                    minWidth: '200px',
                    minHeight: '140px'
                  }}
                 >
                    <div 
                      className="absolute top-0 left-0 transition-all duration-500 ease-out origin-top-left"
                      style={{ 
                        transform: `scale(${scale})`,
                        width: '1123px',
                        height: '794px'
                      }}
                    >
                      <CertificateGenerator
                          ref={certRef}
                          userName={certData.userName}
                          courseName={certData.courseTitle}
                          issueDate={new Date(certData.issueDate).toLocaleDateString("en-US", {
                              month: "long",
                              day: "2-digit",
                              year: "numeric"
                          })}
                          certificateId={certData.certificateId}
                          showPreview={true}
                          hideDownloadButton={true}
                      />
                    </div>
                 </div>
              </div>
            </motion.div>

            {/* Certificate Info & Sidebar */}
            <div className="space-y-6 order-last lg:order-none">
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 border border-[#E0EDE8] shadow-sm"
              >
                <div className="inline-flex items-center gap-2 text-[10px] font-bold text-[#2E7D5B] bg-[#E6F2ED] px-3 py-1 rounded-full mb-4 tracking-wider uppercase">
                  <ShieldCheck size={12} />
                  Verified Credential
                </div>
                <h1 className="font-serif-display text-2xl md:text-3xl font-bold text-[#0F3D2E] mb-4 leading-tight">
                  {certData.courseTitle}
                </h1>
                <p className="text-[#5C7A6E] text-sm leading-relaxed mb-6">
                  This official certification confirms that <span className="font-bold text-[#0F3D2E]">{certData.userName}</span> has demonstrated professional expertise in {certData.courseTitle} through the Carbon Clock platform.
                </p>

                <div className="space-y-4 py-6 border-t border-[#F5F0E8]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] md:text-xs font-medium text-[#8BA89D] uppercase tracking-wider">Issue Date</span>
                    <span className="text-xs md:text-sm font-bold text-[#0F3D2E]">{new Date(certData.issueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] md:text-xs font-medium text-[#8BA89D] uppercase tracking-wider">Credential ID</span>
                    <span className="text-[10px] md:text-xs font-mono font-bold text-[#2E7D5B]">{certData.certificateId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] md:text-xs font-medium text-[#8BA89D] uppercase tracking-wider">Authority</span>
                    <span className="text-xs md:text-sm font-bold text-[#0F3D2E]">Carbon Clock</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isDownloading}
                  onClick={handleDownload}
                  className="w-full mt-4 py-3 md:py-4 rounded-xl md:rounded-2xl bg-[#0F3D2E] text-white font-bold flex items-center justify-center gap-3 shadow-lg shadow-[#0F3D2E]/20 hover:bg-[#1A4A38] transition-all disabled:opacity-70"
                >
                  {isDownloading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Download size={18} />
                  )}
                  {isDownloading ? "Generating..." : "Download PDF"}
                </motion.button>
              </motion.div>

              {/* Trust Badge */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-linear-to-br from-[#0F3D2E] to-[#2E7D5B] rounded-[24px] md:rounded-[32px] p-6 md:p-8 text-white relative overflow-hidden"
              >
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <Award size={100} />
                </div>
                <h3 className="font-bold mb-2 text-sm md:text-base">Professional Credential</h3>
                <p className="text-white/80 text-[10px] md:text-xs leading-relaxed">
                  This certificate is protected and verified via Carbon Clock's secure credentialing system. It can be shared directly to LinkedIn or verified using the unique Credential ID.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
