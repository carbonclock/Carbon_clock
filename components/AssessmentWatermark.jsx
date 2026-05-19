"use client";

import { useEffect, useState } from "react";

export default function AssessmentWatermark({ user }) {
  const [ip, setIp] = useState("");

  useEffect(() => {
    fetch("https://api64.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch(() => setIp("Unknown IP"));
  }, []);

  const watermarkText = `${user?.name || "User"} | ${user?.email || ""} | ${ip}`;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] select-none overflow-hidden">
      <div className="absolute inset-0 flex flex-wrap gap-x-32 gap-y-24 p-10 rotate-[-25deg] scale-125">
        {Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={i} 
            className="text-black font-bold text-lg whitespace-nowrap"
            style={{
              animation: `watermark-float ${10 + (i % 5)}s ease-in-out infinite alternate`
            }}
          >
            {watermarkText}
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes watermark-float {
          from { transform: translate(0, 0); }
          to { transform: translate(20px, 20px); }
        }
      `}</style>
    </div>
  );
}
