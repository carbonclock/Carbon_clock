"use client";

import React, { useRef, useImperativeHandle, forwardRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download } from "lucide-react";

const CertificateGenerator = forwardRef(({ userName, courseName, issueDate, certificateId, showPreview = false, hideDownloadButton = false }, ref) => {
  const certificateRef = useRef(null);

  const handleDownload = async () => {
    const element = certificateRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 3, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`Certificate_${courseName.replace(/\s+/g, "_")}.pdf`);
    } catch (error) {
      console.error("Certificate generation failed:", error);
    }
  };

  useImperativeHandle(ref, () => ({
    download: handleDownload
  }));

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Certificate Template */}
      <div className={showPreview ? "relative shadow-2xl rounded-lg overflow-hidden" : "fixed left-[-9999px] top-0"}>
        <div
          ref={certificateRef}
          className="relative w-[1123px] h-[794px] bg-white overflow-hidden"
          style={{
            backgroundImage: "url('/certificate (2).png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Logo */}
          <div className="absolute top-[70px] w-full flex justify-center">
            <img src="/logo.png" alt="Carbonclock Logo" className="h-24 object-contain" />
          </div>

          {/* Certificate Title */}
          <div className="absolute top-[220px] w-full text-center">
            <h2 className="text-4xl font-bold text-[#000000] tracking-[0.05em] uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
              Certificate of Achievement
            </h2>
          </div>

          <div className="absolute top-[290px] w-full text-center">
            <p className="text-lg text-[#000000]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Hereby we certify that,
            </p>
          </div>

          {/* User Name */}
          <div className="absolute top-[360px] w-full text-center px-20">
            <h1
              className="text-4xl font-bold text-[#000000] tracking-[0.05em] uppercase pb-2 inline-block"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {userName}
            </h1>
          </div>

          {/* Completion Text */}
          <div className="absolute top-[430px] w-full text-center">
            <p className="text-xl text-[#000000]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              has successfully completed
            </p>
          </div>

          {/* Course Details */}
          <div className="absolute top-[480px] w-full px-24 text-center">
            <p className="text-lg text-[#000000] leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              the Course on <span className="font-bold">{courseName}</span> at Carbonclock <br />
              Solutions Private Limited on <span className="font-medium">{issueDate}</span>
            </p>
          </div>

          {/* Footer Section: Issued Date */}
          <div className="absolute bottom-[100px] w-full px-24 flex justify-end items-end">
            {/* Issued Date Section */}
            <div className="text-right">
              <p className="text-base text-[#000000] font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Certificate Issued : {(() => {
                  try {
                    const date = new Date(issueDate);
                    const d = String(date.getDate()).padStart(2, "0");
                    const m = String(date.getMonth() + 1).padStart(2, "0");
                    const y = date.getFullYear();
                    return `${d}-${m}-${y}`;
                  } catch (e) {
                    return issueDate;
                  }
                })()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {!hideDownloadButton && (
        <button
          onClick={handleDownload}
          className="w-full py-2.5 rounded-xl bg-[#0F3D2E] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#1A4A38] transition-all shadow-md"
        >
          <Download size={14} />
          Download PDF
        </button>
      )}
    </div>
  );
});

CertificateGenerator.displayName = "CertificateGenerator";

export default CertificateGenerator;
