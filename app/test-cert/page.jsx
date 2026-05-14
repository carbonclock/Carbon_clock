"use client";

import CertificateGenerator from "@/components/CertificateGenerator";

export default function TestCertPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700&family=Dancing+Script:wght@700&display=swap');
      `}</style>
      
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#0F3D2E]">Certificate Preview Test</h1>
        
        <div className="border-4 border-dashed border-gray-200 p-4 rounded-xl mb-8 flex justify-center">
            {/* We render it normally here to see it */}
            <CertificateGenerator 
                userName="Vishnu" 
                courseName="Climate Change: Science and Solutions" 
                issueDate="May 07, 2026"
                certificateId="CERT-123456"
            />
        </div>
        
        <p className="text-center text-gray-500 text-sm">
            Click "Download PDF" to verify the final output.
        </p>
      </div>
    </div>
  );
}
