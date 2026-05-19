"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, CheckCircle, XCircle, Clock, Camera, Mic, AlertTriangle, Lock, Smartphone } from "lucide-react";
import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";
import AssessmentSuccess from "@/components/AssessmentSuccess";
import AssessmentWatermark from "@/components/AssessmentWatermark";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

import { assessmentData } from "./data";

/* ── Assessment Page Component ── */

export default function AssessmentPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;

  const [user, setUser] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Timer & Proctoring State
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaError, setMediaError] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [isRequestingMedia, setIsRequestingMedia] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const videoRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // AI Proctoring States
  const [model, setModel] = useState(null);
  const [isPhoneDetected, setIsPhoneDetected] = useState(false);
  const [phoneDetectionWarning, setPhoneDetectionWarning] = useState(false);
  const [isTerminated, setIsTerminated] = useState(false);
  const [terminationReason, setTerminationReason] = useState("");
  const detectionInterval = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);

  useEffect(() => {
    // Load AI Model
    const loadModel = async () => {
      try {
        const loadedModel = await cocoSsd.load();
        setModel(loadedModel);
        console.log("AI Proctoring Model Loaded");
      } catch (err) {
        console.error("Error loading AI model:", err);
      }
    };
    loadModel();

    return () => {
      if (detectionInterval.current) clearInterval(detectionInterval.current);
    };
  }, []);

  const terminateTest = useCallback((reason) => {
    setIsTerminated(true);
    setTerminationReason(reason);
    setIsTestStarted(false); // Stop the test
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
    }
    if (detectionInterval.current) {
      clearInterval(detectionInterval.current);
    }
  }, [mediaStream]);

  useEffect(() => {
    if (isTestStarted && model && videoRef.current && !isTerminated) {
      detectionInterval.current = setInterval(async () => {
        if (videoRef.current && videoRef.current.readyState === 4) {
          const predictions = await model.detect(videoRef.current);
          
          // 1. Phone Detection
          const phone = predictions.find(p => p.class === "cell phone" && p.score > 0.6);
          if (phone) {
            terminateTest("Mobile phone detected. Electronic devices are strictly prohibited during the assessment.");
            return;
          }

          // 2. Face (Person) Detection
          const person = predictions.find(p => p.class === "person" && p.score > 0.6);
          if (!person) {
            terminateTest("No face/person detected in the camera frame. You must remain visible throughout the test.");
            return;
          }
        }
      }, 2000); // Check every 2 seconds
    }

    return () => {
      if (detectionInterval.current) clearInterval(detectionInterval.current);
    };
  }, [isTestStarted, model, isTerminated, terminateTest]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (!token) { router.push("/login"); return; }
    try { setUser(JSON.parse(userData)); } catch { router.push("/login"); }
  }, [router]);

  useEffect(() => {
    if (slug && assessmentData[slug]) {
      setAssessment(assessmentData[slug]);
    }
  }, [slug]);

  // Check if assessment is already passed
  useEffect(() => {
    if (user && slug) {
      if (user.passedAssessments?.includes(slug)) {
        // Redirect to course page or dashboard if already passed
        router.push(`/course/${slug}`);
      }
    }
  }, [user, slug, router]);

  // Timer logic
  useEffect(() => {
    let timer;
    if (isTestStarted && !showResults && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          if (prev === 121) { // 2 minutes left (120s)
            setShowWarning(true);
            setTimeout(() => setShowWarning(false), 5000); // Hide warning after 5s
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTestStarted, showResults, timeLeft, handleSubmit]);

  // Attach media stream to video element
  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  // Cleanup media stream on unmount or stream change
  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => {
          track.stop();
          console.log(`Stopped track: ${track.kind}`);
        });
      }
    };
  }, [mediaStream]);

  // AUTO-OFF: Stop camera immediately when results page appears
  useEffect(() => {
    if (showResults && mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
      console.log("Assessment ended: Webcam and Mic automatically deactivated.");
    }
  }, [showResults, mediaStream]);

  const startVoiceDetection = (stream) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      audioContextRef.current = audioContext;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      let noiseViolationFrames = 0;
      const checkVolume = () => {
        if (isTerminated) return;
        analyser.getByteFrequencyData(dataArray);
        
        // FOCUS ON VOICE FREQUENCIES: 
        // Human voice is typically between 300Hz and 3000Hz.
        // We skip the first few bins (low frequency/fan rumble) and the very high ones.
        let voiceSum = 0;
        let binsCount = 0;
        for (let i = 2; i < 20; i++) { // Bins approx 375Hz to 3750Hz
          voiceSum += dataArray[i];
          binsCount++;
        }
        const voiceAverage = voiceSum / binsCount;
        
        // Threshold increased to 85 - very high, only catches loud/clear speech
        if (voiceAverage > 85) { 
          noiseViolationFrames++;
          // Sound must be sustained for ~2 seconds (120 frames) to count as communication
          if (noiseViolationFrames > 120) {
            terminateTest("Continuous loud noise or speech detected. Please ensure a quiet environment.");
            return;
          }
        } else {
          noiseViolationFrames = 0;
        }
        requestAnimationFrame(checkVolume);
      };
      checkVolume();
    } catch (e) {
      console.error("Audio detection error:", e);
    }
  };

  const startTest = async () => {
    // Ensure fresh start: clean up any existing stream before requesting new one
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }

    setIsRequestingMedia(true);
    setMediaError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setMediaStream(stream);
      startVoiceDetection(stream);
      setIsTestStarted(true);

      // Enforce Full Screen
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {
          console.log("Fullscreen request failed");
        });
      }
    } catch (err) {
      console.error("Media error:", err);
      setMediaError("Webcam and Microphone access are required to start the assessment for proctoring purposes.");
    } finally {
      setIsRequestingMedia(false);
    }
  };

  // Prevent Alt+Tab, Window Switching, and Fullscreen Exit
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && isTestStarted && !showResults && !isTerminated) {
        terminateTest("Tab switching or window minimization detected. Assessment terminated for security.");
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isTestStarted && !showResults && !isTerminated) {
        terminateTest("Fullscreen mode exited. Assessment terminated for security.");
      }
    };

    const preventKeys = (e) => {
      if (!isTestStarted || showResults || isTerminated) return;
      
      // Prevent PrintScreen, F12, Ctrl+Shift+I, Ctrl+C, Ctrl+V, Ctrl+U, Ctrl+S
      if (
        e.key === "PrintScreen" || 
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && (e.key === "c" || e.key === "v" || e.key === "u" || e.key === "s"))
      ) {
        e.preventDefault();
        alert("Security Violation: Action not permitted during assessment.");
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("keydown", preventKeys);
    document.addEventListener("contextmenu", (e) => {
      if (isTestStarted && !showResults) e.preventDefault();
    });

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("keydown", preventKeys);
    };
  }, [isTestStarted, showResults, isTerminated, terminateTest]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loginAt");
    router.push("/");
  };

  const handleAnswer = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = useCallback(() => {
    let correctCount = 0;
    assessment.questions.forEach((question, i) => {
      if (answers[i] === question.correctAnswer) {
        correctCount++;
      }
    });
    const calculatedScore = (correctCount / assessment.questions.length) * 100;
    setScore(calculatedScore);
    setShowResults(true);

    if (calculatedScore >= 70) {
      handlePassAssessment();
    }
  }, [assessment, answers, handlePassAssessment]);

  const handlePassAssessment = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/course/pass-assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          courseSlug: slug,
          courseTitle: assessment.title
        })
      });
      const data = await res.json();
      if (data.success) {
        // Update local user data
        const updatedUser = {
          ...user,
          passedAssessments: data.passedAssessments,
          certificates: data.certificates
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("Failed to save pass status:", error);
    }
  }, [slug, assessment, user]);

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  if (!user || !assessment) return null;

  const question = assessment.questions[currentQuestion];
  const isAnswered = currentQuestion in answers;
  const isCorrect = answers[currentQuestion] === question.correctAnswer;
  const passed = score >= 70;

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Termination Screen Overlay */}
      <AnimatePresence>
        {isTerminated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[200] bg-[#0F3D2E] flex items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[40px] p-10 md:p-16 max-w-2xl w-full shadow-2xl border border-red-100"
            >
              <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                <AlertTriangle size={48} className="text-red-500" />
              </div>
              <h1 className="font-serif-display text-4xl font-bold text-[#0F3D2E] mb-6">
                Assessment Terminated
              </h1>
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-8 text-left">
                <p className="text-red-600 font-bold uppercase text-[10px] tracking-widest mb-2">Security Violation Detected</p>
                <p className="text-[#0F3D2E] font-medium leading-relaxed">
                  {terminationReason}
                </p>
              </div>
              <p className="text-[#5C7A6E] mb-10 text-sm leading-relaxed">
                Your assessment has been automatically cancelled due to a violation of our security protocols. 
                For the integrity of our certifications, continuous monitoring of your video and audio is mandatory.
              </p>
              <motion.button
                onClick={() => router.push("/dashboard")}
                className="bg-[#0F3D2E] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#1a5d48] transition-all shadow-xl shadow-[#0F3D2E]/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Return to Dashboard
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Watermark */}
      {isTestStarted && !showResults && !isTerminated && <AssessmentWatermark user={user} />}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-serif-display { font-family: 'DM Serif Display', serif; }
        body { user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; }
      `}</style>

      {showResults && <DashboardNavbar user={user} onLogout={handleLogout} />}

      <main className="flex-1 relative">
        {/* Floating Camera Preview */}
        {isTestStarted && !showResults && mediaStream && (
          <div className="fixed bottom-6 right-6 w-48 h-36 bg-black rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-2xl z-50">
            <video
              autoPlay
              muted
              playsInline
              ref={videoRef}
              className="w-full h-full object-cover scale-x-[-1]"
            />
            <div className="absolute top-2 left-2 flex gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-white font-bold tracking-tighter uppercase opacity-80">Live Proctoring</span>
            </div>
          </div>
        )}

        {/* 2-Minute Warning Overlay */}
        <AnimatePresence>
          {showWarning && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 font-semibold"
            >
              <AlertTriangle size={20} />
              <span>Only 2 minutes remaining! Your test will auto-submit.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phone Detection Warning Overlay */}
        <AnimatePresence>
          {phoneDetectionWarning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed inset-0 z-[110] flex items-center justify-center pointer-events-none px-6"
            >
              <div className="bg-red-600/95 backdrop-blur-md text-white p-12 rounded-[40px] shadow-2xl flex flex-col items-center gap-6 border-4 border-white/20 max-w-lg text-center">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <Smartphone size={48} className="animate-pulse" />
                </div>
                <h2 className="text-4xl font-bold uppercase tracking-tight">Mobile Phone Detected</h2>
                <p className="text-xl font-medium opacity-90 leading-relaxed text-red-50">
                  Usage of mobile devices is strictly prohibited. Your session is being flagged for review.
                </p>
                <div className="px-6 py-2 bg-white text-red-600 rounded-full text-sm font-bold uppercase tracking-widest">
                  Active Monitoring
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Exit Test Confirmation Modal */}
        <AnimatePresence>
          {showExitModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-[#0F3D2E]/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-[#E0EDE8] text-center"
              >
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle size={40} className="text-red-500" />
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-[#0F3D2E] mb-4">
                  Exit Assessment?
                </h3>
                <p className="text-[#5C7A6E] mb-8 leading-relaxed">
                  Are you sure you want to exit the test? <br />
                  <span className="font-bold text-red-600">Once you exit, you can&apos;t take the test again.</span>
                </p>
                <div className="flex flex-col gap-3">
                  <motion.button
                    onClick={() => {
                      if (mediaStream) mediaStream.getTracks().forEach(track => track.stop());
                      router.push(`/course/${slug}`);
                    }}
                    className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Yes, Exit Test
                  </motion.button>
                  <motion.button
                    onClick={() => setShowExitModal(false)}
                    className="w-full py-4 bg-[#F5F0E8] text-[#0F3D2E] rounded-2xl font-bold hover:bg-[#E0EDE8] transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    No, Continue Test
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isTestStarted && !showResults ? (
          <section className="py-20 px-6 flex-1 flex items-center justify-center relative bg-[#F5F0E8] overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0F3D2E]/5 rounded-full blur-3xl -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C29231]/5 rounded-full blur-3xl -ml-40 -mb-40" />

            <div className="max-w-4xl w-full mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(15,61,46,0.12)] border border-white"
              >
                <div className="text-center mb-12">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-[#0F3D2E]/5 text-[#0F3D2E] text-[12px] font-bold uppercase tracking-wider mb-4 border border-[#0F3D2E]/10">
                    Secure Examination Environment
                  </div>
                  <h2 className="font-serif-display text-4xl md:text-5xl font-bold text-[#0F3D2E] mb-4">
                    Assessment Instructions
                  </h2>
                  <p className="text-[#5C7A6E] text-sm max-w-xl mx-auto">
                    Please read the following guidelines carefully. This assessment is proctored to ensure academic integrity and a fair testing environment for all candidates.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 mb-12">
                  {/* Left Column: Requirements */}
                  <div>
                    <h3 className="text-[12px] font-bold text-[#C29231] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C29231]" />
                      System Requirements
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          icon: <Clock size={18} />,
                          title: "10-Minute Window",
                          desc: "Fixed duration. Auto-submission occurs precisely at 00:00."
                        },
                        {
                          icon: <Camera size={18} />,
                          title: "Biometric Monitoring",
                          desc: "Continuous webcam and microphone access is mandatory for session validation."
                        },
                        {
                          icon: <CheckCircle size={18} />,
                          title: "70% Proficiency",
                          desc: "Requires 14 correct responses out of 20 to earn certification."
                        }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/50 border border-[#E0EDE8] hover:border-[#0F3D2E]/20 transition-colors">
                          <div className="text-[#0F3D2E] shrink-0">{item.icon}</div>
                          <div>
                            <h4 className="font-bold text-[#0F3D2E] text-sm mb-1">{item.title}</h4>
                            <p className="text-[12px] leading-relaxed text-[#5C7A6E]">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Honor Code */}
                  <div>
                    <h3 className="text-[12px] font-bold text-[#C29231] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C29231]" />
                      Rules of Conduct
                    </h3>
                    <div className="space-y-5">
                      <div className="p-5 rounded-2xl bg-[#0F3D2E]/[0.02] border border-dashed border-[#0F3D2E]/20">
                        <ul className="space-y-3">
                          {[
                            "No external browser tabs, windows, or resources.",
                            "Strictly no AI assistance, chatbots, or search engines.",
                            "Accountability: No collaboration or third-party help.",
                            "Maintain a clear, well-lit face view at all times.",
                            "All mobile devices must be silenced and stored away."
                          ].map((rule, i) => (
                            <li key={i} className="flex items-start gap-3 text-[13px] text-[#2D4A3E]">
                              <div className="mt-1.5 w-1 h-1 rounded-full bg-[#0F3D2E] shrink-0" />
                              {rule}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 flex gap-3 text-[12px] text-orange-800 italic">
                        <AlertTriangle size={16} className="shrink-0" />
                        Violations will trigger immediate disqualification and session termination.
                      </div>
                    </div>
                  </div>
                </div>

                {mediaError && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8 p-4 bg-red-50 text-red-700 rounded-2xl flex items-center gap-3 border border-red-100 text-xs font-semibold shadow-inner"
                  >
                    <AlertTriangle size={18} />
                    {mediaError}
                  </motion.div>
                )}

                <div className="flex flex-col items-center">
                  <motion.button
                    onClick={startTest}
                    disabled={isRequestingMedia}
                    className="w-full md:w-[320px] py-4 rounded-full bg-[#0F3D2E] text-white font-bold text-lg hover:bg-[#1A4A38] transition-all flex items-center justify-center gap-3 shadow-[0_12px_24px_-8px_rgba(15,61,46,0.3)] disabled:opacity-50"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isRequestingMedia ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Initialising...</span>
                      </div>
                    ) : (
                      <>
                        <span>Confirm & Start Test</span>
                        <ArrowLeft size={20} className="rotate-180" />
                      </>
                    )}
                  </motion.button>
                  <p className="mt-4 text-[11px] text-[#5C7A6E] font-medium uppercase tracking-[0.1em]">
                    Clicking start will initiate proctoring session
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        ) : !showResults ? (
          <>
            {/* Header */}
            <section style={{ backgroundColor: assessment.headerBg }} className="py-8 px-6 text-white">
              <div className="max-w-7xl mx-auto">
                <motion.button
                  onClick={() => setShowExitModal(true)}
                  className="flex items-center gap-2 mb-6 text-[#FFBABA] hover:text-white transition-colors bg-white/10 px-4 py-1.5 rounded-full border border-white/20"
                  whileHover={{ x: -4 }}
                >
                  <XCircle size={18} /> Exit Test
                </motion.button>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#A7D7C5] text-sm mb-2">{assessment.emoji}</p>
                    <h1 className="font-serif-display text-3xl font-bold">{assessment.title}</h1>
                  </div>
                  <div className="text-right flex items-center gap-6">
                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                      <Clock size={16} className={timeLeft < 120 ? "text-red-400 animate-pulse" : "text-[#A7D7C5]"} />
                      <span className={`font-mono font-bold ${timeLeft < 120 ? "text-red-400" : "text-white"}`}>
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                    <div>
                      <p className="text-[#A7D7C5] text-sm mb-1">Question {currentQuestion + 1} of {assessment.questions.length}</p>
                      <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-white"
                          initial={{ width: 0 }}
                          animate={{ width: `${((currentQuestion + 1) / assessment.questions.length) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Question Section */}
            <section className="py-12 px-6 flex-1 min-h-0" style={{ background: "#F5F0E8" }}>
              <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-8">
                {/* Main Question Area */}
                <div className="lg:col-span-3">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-[#E0EDE8] min-h-[500px] flex flex-col"
                  >
                    <div className="mb-8">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-[#C29231] uppercase tracking-[0.2em] mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C29231]" />
                        Question {currentQuestion + 1}
                      </div>
                      <h2 className="font-serif-display text-2xl md:text-3xl font-bold text-[#0F3D2E] leading-tight">
                        {question.question}
                      </h2>
                    </div>

                    <div className="space-y-4 mb-10 flex-1">
                      {question.options.map((option, i) => (
                        <motion.button
                          key={i}
                          onClick={() => handleAnswer(i)}
                          className={`w-full p-5 rounded-2xl text-left font-medium transition-all border-2 relative group ${answers[currentQuestion] === i
                            ? "bg-[#0F3D2E] text-white border-[#0F3D2E] shadow-lg shadow-[#0F3D2E]/20"
                            : "bg-white text-[#0F3D2E] border-[#E0EDE8] hover:border-[#0F3D2E]/30 hover:bg-[#FDFCFB]"
                            }`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors ${answers[currentQuestion] === i
                                ? "bg-white border-white text-[#0F3D2E]"
                                : "border-[#E0EDE8] text-[#5C7A6E] group-hover:border-[#0F3D2E]/30"
                                }`}
                            >
                              {String.fromCharCode(65 + i)}
                            </div>
                            <span className="text-sm md:text-base">{option}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {/* Navigation buttons inside the card */}
                    <div className="flex items-center justify-between pt-8 border-t border-[#F5F0E8]">
                      <motion.button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className="px-8 py-3 rounded-full font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all border-2 border-[#0F3D2E] text-[#0F3D2E] hover:bg-[#0F3D2E] hover:text-white"
                        whileHover={{ scale: currentQuestion > 0 ? 1.05 : 1 }}
                      >
                        Previous
                      </motion.button>

                      {currentQuestion === assessment.questions.length - 1 ? (
                        <motion.button
                          onClick={handleSubmit}
                          disabled={!isAnswered}
                          className="px-10 py-3 rounded-full font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed text-white transition-all shadow-lg"
                          style={{ background: "#0F3D2E" }}
                          whileHover={{ scale: isAnswered ? 1.05 : 1 }}
                        >
                          Submit Final Assessment
                        </motion.button>
                      ) : (
                        <motion.button
                          onClick={handleNext}
                          disabled={!isAnswered}
                          className="px-10 py-3 rounded-full font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed text-white transition-all shadow-lg"
                          style={{ background: "#0F3D2E" }}
                          whileHover={{ scale: isAnswered ? 1.05 : 1 }}
                        >
                          Next Question
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Question Palette Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-[32px] p-6 shadow-sm border border-[#E0EDE8] sticky top-8">
                    <h3 className="text-[11px] font-bold text-[#C29231] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C29231]" />
                      Question Palette
                    </h3>

                    <div className="grid grid-cols-5 gap-3 mb-8">
                      {assessment.questions.map((_, i) => {
                        const isAnswered = answers[i] !== undefined;
                        const isActive = currentQuestion === i;

                        return (
                          <motion.button
                            key={i}
                            onClick={() => setCurrentQuestion(i)}
                            className={`aspect-square rounded-xl flex items-center justify-center text-xs font-bold border-2 transition-all ${isActive
                              ? "bg-[#0F3D2E] text-white border-[#0F3D2E] ring-4 ring-[#E0EDE8]"
                              : isAnswered
                                ? "bg-white text-[#2E7D5B] border-[#2E7D5B] hover:bg-[#F0F7F4]"
                                : "bg-white text-[#d64545] border-[#d64545] hover:bg-[#FFF5F5]"
                              }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {i + 1}
                          </motion.button>
                        );
                      })}
                    </div>

                    <div className="pt-6 border-t border-[#F5F0E8] space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-md border-2 border-[#2E7D5B] bg-white" />
                        <span className="text-[12px] text-[#5C7A6E]">Answered</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-md border-2 border-[#d64545] bg-white" />
                        <span className="text-[12px] text-[#5C7A6E]">Not Answered</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-md border-2 border-[#0F3D2E] bg-[#0F3D2E]" />
                        <span className="text-[12px] text-[#5C7A6E]">Current Question</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Results Section */}
            <section className="py-20 px-6 flex-1 flex items-center" style={{ background: "#F5F0E8" }}>
              <div className="max-w-4xl w-full mx-auto">
                {passed ? (
                  <AssessmentSuccess
                    score={score}
                    totalQuestions={assessment.questions.length}
                    courseTitle={assessment.title}
                  />
                ) : (
                  <div className="bg-white rounded-2xl p-12 text-center border border-[#E0EDE8]"
                    style={{ boxShadow: "0 8px 32px rgba(26, 74, 58, 0.12)" }}>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6 }}
                      className="mb-6"
                    >
                      <XCircle size={80} className="mx-auto text-[#d64545]" />
                    </motion.div>
                    <h2 className="font-serif-display text-4xl font-bold text-[#0F3D2E] mb-2">
                      Keep Trying
                    </h2>
                    <p className="text-[#5C7A6E] text-lg mb-6">You need 70% to pass. Review the course materials and try again!</p>

                    <div className="mb-8">
                      <p className="text-5xl font-bold text-[#D4AF37] mb-2">{score.toFixed(1)}%</p>
                      <p className="text-[#5C7A6E]">
                        {Object.values(answers).reduce((count, answer, i) => count + (answer === assessment.questions[i].correctAnswer ? 1 : 0), 0)} out of {assessment.questions.length} correct
                      </p>
                    </div>

                    <motion.button
                      onClick={handleGoToDashboard}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 rounded-full font-semibold text-white"
                      style={{ background: "#0F3D2E" }}
                    >
                      Return to Dashboard
                    </motion.button>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      {showResults && <Footer />}
    </div>
  );
}