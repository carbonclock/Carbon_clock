"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";

/* ── Sample MCQ Questions ── */
const assessmentData = {
  "climate-change-science-solutions": {
    title: "Climate Change: Science & Solutions",
    emoji: "🌍",
    headerBg: "#1A3D2B",
    questions: [
      {
        id: 1,
        question: "What is the primary greenhouse gas responsible for climate change?",
        options: [
          "Carbon Dioxide (CO₂)",
          "Nitrogen Oxide (N₂O)",
          "Methane (CH₄)",
          "Ozone (O₃)",
        ],
        correctAnswer: 0,
        explanation: "Carbon Dioxide is the primary greenhouse gas, accounting for about 75% of anthropogenic GHG emissions.",
      },
      {
        id: 2,
        question: "At what atmospheric CO₂ level were pre-industrial values?",
        options: [
          "350 ppm",
          "280 ppm",
          "450 ppm",
          "200 ppm",
        ],
        correctAnswer: 1,
        explanation: "Pre-industrial CO₂ levels were approximately 280 ppm. Current levels exceed 420 ppm.",
      },
      {
        id: 3,
        question: "What is a tipping point in the climate system?",
        options: [
          "A minor climate fluctuation",
          "A critical threshold beyond which a system reorganizes abruptly",
          "The highest temperature recorded annually",
          "An agreement between countries on climate action",
        ],
        correctAnswer: 1,
        explanation: "A tipping point is a critical threshold beyond which a climate system or subsystem reorganizes abruptly and irreversibly.",
      },
      {
        id: 4,
        question: "Which of the following is an example of climate mitigation?",
        options: [
          "Building seawalls to protect coastal areas",
          "Planting drought-resistant crops",
          "Transitioning to renewable energy",
          "Improving water infrastructure",
        ],
        correctAnswer: 2,
        explanation: "Mitigation reduces the causes of climate change (GHG emissions), while adaptation addresses impacts. Renewable energy is mitigation.",
      },
      {
        id: 5,
        question: "What does the Paris Agreement aim to limit global warming to?",
        options: [
          "2°C above pre-industrial levels",
          "1.5°C to 2°C above pre-industrial levels",
          "3°C above pre-industrial levels",
          "1°C above pre-industrial levels",
        ],
        correctAnswer: 1,
        explanation: "The Paris Agreement aims to limit global warming to well below 2°C, preferably to 1.5°C above pre-industrial levels.",
      },
      {
        id: 6,
        question: "Which gas has the highest warming potential per molecule?",
        options: [
          "Carbon Dioxide",
          "Methane",
          "Sulfur Hexafluoride",
          "Nitrous Oxide",
        ],
        correctAnswer: 2,
        explanation: "Sulfur Hexafluoride (SF₆) has an extremely high Global Warming Potential (23,500x that of CO₂).",
      },
      {
        id: 7,
        question: "What percentage of greenhouse gas emissions come from energy use?",
        options: [
          "25%",
          "50%",
          "65%",
          "85%",
        ],
        correctAnswer: 2,
        explanation: "Energy (electricity, heat, transport) accounts for approximately 65% of total global GHG emissions.",
      },
      {
        id: 8,
        question: "Which sector produces the most methane emissions?",
        options: [
          "Manufacturing",
          "Agriculture",
          "Waste",
          "Energy",
        ],
        correctAnswer: 1,
        explanation: "Agriculture (particularly livestock farming) is the largest source of methane emissions globally.",
      },
      {
        id: 9,
        question: "What is the role of the IPCC?",
        options: [
          "Enforce climate regulations",
          "Assess scientific knowledge on climate change",
          "Fund renewable energy projects",
          "Negotiate international climate agreements",
        ],
        correctAnswer: 1,
        explanation: "The IPCC (Intergovernmental Panel on Climate Change) assesses scientific, technical, and socio-economic information relevant to climate change.",
      },
      {
        id: 10,
        question: "Which renewable energy source is most abundant globally?",
        options: [
          "Solar",
          "Wind",
          "Hydropower",
          "Geothermal",
        ],
        correctAnswer: 0,
        explanation: "Solar energy has the largest theoretical potential to meet global energy demand.",
      },
      {
        id: 11,
        question: "What is the greenhouse effect?",
        options: [
          "The temperature inside a greenhouse",
          "The trapping of heat in the atmosphere by gases",
          "A method for growing crops",
          "The annual temperature increase in cities",
        ],
        correctAnswer: 1,
        explanation: "The greenhouse effect is the process where gases trap heat in the atmosphere, similar to how a greenhouse traps heat with its glass.",
      },
      {
        id: 12,
        question: "Which of these is NOT a climate feedback mechanism?",
        options: [
          "Ice-albedo feedback",
          "Water vapor feedback",
          "Cloud feedback",
          "Fossil fuel feedback",
        ],
        correctAnswer: 3,
        explanation: "Fossil fuel feedback is not a recognized climate feedback mechanism. The others are all documented positive feedbacks.",
      },
      {
        id: 13,
        question: "What is carbon sequestration?",
        options: [
          "Breaking down carbon molecules",
          "Capturing and storing carbon dioxide",
          "Burning organic matter",
          "Removing nitrogen from the atmosphere",
        ],
        correctAnswer: 1,
        explanation: "Carbon sequestration is the process of capturing and storing atmospheric CO₂ through natural or technological means.",
      },
      {
        id: 14,
        question: "Which activity has the largest carbon footprint per person?",
        options: [
          "Diet",
          "Transportation",
          "Home heating/cooling",
          "Electricity consumption",
        ],
        correctAnswer: 2,
        explanation: "Home heating and cooling (space conditioning) typically represents the largest portion of household carbon emissions.",
      },
      {
        id: 15,
        question: "What does NDC stand for?",
        options: [
          "National Development Code",
          "Nationally Determined Contribution",
          "Natural Disaster Coverage",
          "Nuclear Diversity Commission",
        ],
        correctAnswer: 1,
        explanation: "NDCs (Nationally Determined Contributions) are climate action plans submitted by countries under the Paris Agreement.",
      },
      {
        id: 16,
        question: "Which climate model is used by the IPCC for projections?",
        options: [
          "Coupled General Circulation Models (GCMs)",
          "Simple Linear Models",
          "Empirical Statistical Models",
          "Historical Trend Models",
        ],
        correctAnswer: 0,
        explanation: "The IPCC uses Coupled General Circulation Models (GCMs) and Earth System Models for climate projections.",
      },
      {
        id: 17,
        question: "What is ocean acidification?",
        options: [
          "The cooling of ocean water",
          "Increased pH levels in the ocean",
          "Decreased pH in oceans due to CO₂ absorption",
          "The addition of acids to the ocean",
        ],
        correctAnswer: 2,
        explanation: "Ocean acidification occurs when the ocean absorbs CO₂ from the atmosphere, forming carbonic acid and lowering pH.",
      },
      {
        id: 18,
        question: "Which country has set a net-zero target for 2050?",
        options: [
          "China only",
          "USA only",
          "Multiple countries including EU, UK, Japan",
          "No countries yet",
        ],
        correctAnswer: 2,
        explanation: "Multiple countries, including EU member states, UK, Japan, and others, have committed to net-zero by 2050.",
      },
      {
        id: 19,
        question: "What is the albedo effect?",
        options: [
          "The reflection of sunlight back to space",
          "The absorption of heat in the ocean",
          "The rotation of the Earth",
          "The movement of tectonic plates",
        ],
        correctAnswer: 0,
        explanation: "Albedo refers to the reflectivity of a surface. Ice has high albedo; melting ice reduces reflection, amplifying warming.",
      },
      {
        id: 20,
        question: "Which sector requires the most significant transformation for climate goals?",
        options: [
          "Agriculture",
          "Waste management",
          "Energy systems",
          "Construction",
        ],
        correctAnswer: 2,
        explanation: "Energy systems (power generation, heating, transport) require the most comprehensive transformation to achieve climate goals.",
      },
    ],
  },
  "carbon-accounting-reporting": {
    title: "Carbon Accounting & Reporting",
    emoji: "📊",
    headerBg: "#1B3A5C",
    questions: [
      {
        id: 1,
        question: "What does Scope 1 emissions refer to?",
        options: [
          "Purchased electricity",
          "Direct emissions from company-owned sources",
          "Emissions from supply chain",
          "Employee commuting",
        ],
        correctAnswer: 1,
        explanation: "Scope 1 covers direct GHG emissions from sources owned or controlled by the organization.",
      },
      {
        id: 2,
        question: "Which of the following is an example of Scope 2 emissions?",
        options: [
          "Fuel combustion in company vehicles",
          "Purchased electricity for office buildings",
          "Supplier manufacturing emissions",
          "Employee business travel",
        ],
        correctAnswer: 1,
        explanation: "Scope 2 includes emissions from purchased electricity, steam, heating, and cooling.",
      },
      {
        id: 3,
        question: "What is the primary framework for carbon accounting?",
        options: [
          "ISO 9001",
          "GHG Protocol Corporate Standard",
          "IFRS Standards",
          "SOX Compliance",
        ],
        correctAnswer: 1,
        explanation: "The GHG Protocol Corporate Standard is the most widely used framework for measuring and reporting corporate GHG emissions.",
      },
      {
        id: 4,
        question: "Which is NOT included in Scope 3 emissions?",
        options: [
          "Supplier emissions",
          "Employee commuting",
          "Facility heating",
          "Waste disposal",
        ],
        correctAnswer: 2,
        explanation: "Facility heating would be Scope 2 (purchased energy). Scope 3 covers value chain emissions.",
      },
      {
        id: 5,
        question: "What is an organizational boundary?",
        options: [
          "The physical location of the company",
          "The geographic area covered by operations",
          "The definition of which entities to include in emissions inventory",
          "The year-end cutoff for reporting",
        ],
        correctAnswer: 2,
        explanation: "Organizational boundaries define which legal entities, subsidiaries, and operations are included in the carbon inventory.",
      },
      {
        id: 6,
        question: "What does the GRI stand for?",
        options: [
          "Global Reporting Initiative",
          "Greenhouse Reporting Index",
          "Green Resource Institute",
          "Global Risk Inventory",
        ],
        correctAnswer: 0,
        explanation: "GRI (Global Reporting Initiative) provides standards for sustainability reporting including emissions.",
      },
      {
        id: 7,
        question: "Which approach assigns emissions to the entity with operational control?",
        options: [
          "Equity share approach",
          "Financial control approach",
          "Operational control approach",
          "Legal entity approach",
        ],
        correctAnswer: 2,
        explanation: "The operational control approach allocates emissions based on operational responsibility regardless of ownership percentage.",
      },
      {
        id: 8,
        question: "What is materiality in the context of sustainability reporting?",
        options: [
          "The physical substance of products",
          "Issues significant to business operations and stakeholders",
          "The size of the company",
          "The cost of compliance",
        ],
        correctAnswer: 1,
        explanation: "Materiality identifies sustainability issues that significantly affect business and are of concern to stakeholders.",
      },
      {
        id: 9,
        question: "What is carbon intensity?",
        options: [
          "The concentration of carbon in air",
          "Emissions per unit of output or activity",
          "The strength of carbon dioxide",
          "The color intensity of carbon",
        ],
        correctAnswer: 1,
        explanation: "Carbon intensity measures emissions relative to output (e.g., CO₂ per unit produced or per dollar revenue).",
      },
      {
        id: 10,
        question: "Which verification standard is most common for carbon accounting?",
        options: [
          "ISO 9001",
          "ISO 14064-1 and ISO 14065",
          "ISO 50001",
          "ISO 26000",
        ],
        correctAnswer: 1,
        explanation: "ISO 14064 series covers GHG quantification, monitoring, reporting, and ISO 14065 covers verification bodies.",
      },
      {
        id: 11,
        question: "What is activity data in emissions calculations?",
        options: [
          "Information about marketing activities",
          "Data on operational activities that generate emissions",
          "Social media engagement metrics",
          "Employee activity logs",
        ],
        correctAnswer: 1,
        explanation: "Activity data quantifies the extent of activities that generate emissions (e.g., fuel consumption, electricity use).",
      },
      {
        id: 12,
        question: "What is an emission factor?",
        options: [
          "A multiplier for increasing emissions",
          "The rate at which emissions decay",
          "A coefficient relating activity data to GHG emissions",
          "The percentage of total emissions",
        ],
        correctAnswer: 2,
        explanation: "An emission factor converts activity data into GHG emissions (e.g., kg CO₂ per kWh of electricity).",
      },
      {
        id: 13,
        question: "Which standard requires third-party verification?",
        options: [
          "GRI Standards (optional)",
          "Science-Based Targets initiative",
          "EU Emissions Trading Scheme (mandatory)",
          "Internal carbon accounting",
        ],
        correctAnswer: 2,
        explanation: "The EU ETS mandates third-party verification of emissions, while others typically offer optional verification.",
      },
      {
        id: 14,
        question: "What is a carbon offset?",
        options: [
          "A reduction in emissions",
          "A credit representing one ton of CO₂ equivalent reduction",
          "A government subsidy",
          "A tax deduction",
        ],
        correctAnswer: 1,
        explanation: "A carbon offset is a credit representing one metric ton of CO₂ equivalent emission reductions or removals.",
      },
      {
        id: 15,
        question: "How often should emissions be reported?",
        options: [
          "Every 5 years",
          "Annually (for most standards)",
          "Every 3 years",
          "On-demand",
        ],
        correctAnswer: 1,
        explanation: "Most reporting standards require annual emissions reporting and transparent tracking of progress.",
      },
      {
        id: 16,
        question: "What does RE100 commitment require?",
        options: [
          "Zero emissions",
          "100% renewable electricity",
          "Complete supply chain transparency",
          "Net-zero by 2050",
        ],
        correctAnswer: 1,
        explanation: "RE100 is a global initiative where companies commit to 100% renewable electricity.",
      },
      {
        id: 17,
        question: "Which organization publishes the GHG Protocol?",
        options: [
          "World Bank",
          "WRI and WBCSD",
          "UN Environment Programme",
          "International Energy Agency",
        ],
        correctAnswer: 1,
        explanation: "The GHG Protocol is published by the World Resources Institute (WRI) and World Business Council for Sustainable Development (WBCSD).",
      },
      {
        id: 18,
        question: "What is the primary benefit of carbon accounting?",
        options: [
          "Reducing government taxes",
          "Understanding and managing emissions",
          "Improving product packaging",
          "Reducing workforce",
        ],
        correctAnswer: 1,
        explanation: "Carbon accounting enables organizations to understand their emissions and identify reduction opportunities.",
      },
      {
        id: 19,
        question: "How many primary GHG gases does the Kyoto Protocol identify?",
        options: [
          "4",
          "6",
          "8",
          "10",
        ],
        correctAnswer: 1,
        explanation: "The Kyoto Protocol covers six GHGs: CO₂, CH₄, N₂O, HFCs, PFCs, and SF₆.",
      },
      {
        id: 20,
        question: "What is a carbon budget?",
        options: [
          "The financial cost of emissions",
          "The maximum allowable emissions for a period",
          "The investment in green technology",
          "The revenue from carbon offsets",
        ],
        correctAnswer: 1,
        explanation: "A carbon budget is the total amount of GHG emissions an organization can produce while meeting climate goals.",
      },
    ],
  },
  "ghg-accounting-protocol": {
    title: "GHG Accounting & the GHG Protocol",
    emoji: "🏭",
    headerBg: "#4A3800",
    questions: [
      {
        id: 1,
        question: "What is the primary focus of the GHG Protocol?",
        options: [
          "Environmental policy",
          "Standardized GHG accounting and reporting",
          "Renewable energy promotion",
          "Carbon offset trading",
        ],
        correctAnswer: 1,
        explanation: "The GHG Protocol provides standards for measuring and reporting greenhouse gas emissions.",
      },
      {
        id: 2,
        question: "Which GHG does the Protocol prioritize?",
        options: [
          "Only CO₂",
          "Six major greenhouse gases",
          "Methane only",
          "Nitrogen oxides",
        ],
        correctAnswer: 1,
        explanation: "The GHG Protocol covers all six major greenhouse gases for comprehensive emissions accounting.",
      },
      {
        id: 3,
        question: "What is the foundation of GHG Protocol calculations?",
        options: [
          "Historical trends",
          "Activity data × Emission factors",
          "Government estimates",
          "Industry averages",
        ],
        correctAnswer: 1,
        explanation: "The GHG Protocol uses the formula: Activity Data multiplied by Emission Factors to calculate emissions.",
      },
      {
        id: 4,
        question: "How many scopes are defined in the GHG Protocol?",
        options: [
          "2",
          "3",
          "4",
          "5",
        ],
        correctAnswer: 1,
        explanation: "The GHG Protocol defines three scopes of emissions: Scope 1, Scope 2, and Scope 3.",
      },
      {
        id: 5,
        question: "What year was the GHG Protocol Corporate Standard released?",
        options: [
          "1998",
          "2001",
          "2004",
          "2008",
        ],
        correctAnswer: 1,
        explanation: "The GHG Protocol Corporate Standard was first published in 2001.",
      },
      {
        id: 6,
        question: "Which IPCC category relates to energy?",
        options: [
          "Category 1",
          "Category 2",
          "Category 3",
          "Category 4",
        ],
        correctAnswer: 0,
        explanation: "IPCC Category 1 (Energy) is fundamental to GHG Protocol accounting.",
      },
      {
        id: 7,
        question: "What does GWP stand for?",
        options: [
          "Greenhouse Warming Potential",
          "Global Warming Potential",
          "Gas Warming Parameters",
          "Gross Warming Protocol",
        ],
        correctAnswer: 1,
        explanation: "GWP (Global Warming Potential) is used to compare the climate impact of different gases.",
      },
      {
        id: 8,
        question: "How is methane's GWP compared to CO₂?",
        options: [
          "Same as CO₂",
          "25-28 times higher",
          "5 times higher",
          "2 times higher",
        ],
        correctAnswer: 1,
        explanation: "Methane has a GWP of 25-28 times that of CO₂ over a 100-year period.",
      },
      {
        id: 9,
        question: "What is Scope 1 under the GHG Protocol?",
        options: [
          "Purchased electricity",
          "Direct emissions",
          "Business travel",
          "Supplier emissions",
        ],
        correctAnswer: 1,
        explanation: "Scope 1 includes direct emissions from sources owned or controlled by the organization.",
      },
      {
        id: 10,
        question: "What is Scope 2 under the GHG Protocol?",
        options: [
          "Direct emissions",
          "Purchased electricity and steam",
          "Supply chain emissions",
          "Employee commuting",
        ],
        correctAnswer: 1,
        explanation: "Scope 2 covers indirect emissions from purchased electricity, steam, heating, and cooling.",
      },
      {
        id: 11,
        question: "Which approach does the Protocol recommend for organizational boundaries?",
        options: [
          "Equity share only",
          "Financial control only",
          "Operational control only",
          "Organization can choose appropriate approach",
        ],
        correctAnswer: 3,
        explanation: "The GHG Protocol allows organizations to choose between equity share, financial control, or operational control.",
      },
      {
        id: 12,
        question: "What is the most common organizational boundary approach?",
        options: [
          "Equity share",
          "Financial control",
          "Operational control",
          "Legal entity",
        ],
        correctAnswer: 2,
        explanation: "Operational control is the most commonly used approach in the GHG Protocol.",
      },
      {
        id: 13,
        question: "How should companies handle equity investments under the Protocol?",
        options: [
          "Include all investments",
          "Exclude all investments",
          "Use equity share approach",
          "Use market value",
        ],
        correctAnswer: 2,
        explanation: "Equity share approach allocates emissions proportional to the percentage stake in the company.",
      },
      {
        id: 14,
        question: "What is a major challenge in Scope 3 accounting?",
        options: [
          "Lack of data availability",
          "Complexity and scope",
          "High verification costs",
          "Technical limitations",
        ],
        correctAnswer: 1,
        explanation: "Scope 3 is challenging due to its broad scope and the complexity of supply chain emissions.",
      },
      {
        id: 15,
        question: "How many Scope 3 categories exist in the GHG Protocol?",
        options: [
          "5",
          "10",
          "15",
          "20",
        ],
        correctAnswer: 2,
        explanation: "The GHG Protocol defines 15 categories of Scope 3 emissions.",
      },
      {
        id: 16,
        question: "What should be included in upstream Scope 3?",
        options: [
          "Retail sales",
          "Purchased goods and services",
          "Product use",
          "End-of-life treatment",
        ],
        correctAnswer: 1,
        explanation: "Upstream Scope 3 includes purchased goods and services from the supply chain.",
      },
      {
        id: 17,
        question: "What is downstream Scope 3?",
        options: [
          "Supplier emissions",
          "Manufacturing emissions",
          "Distribution and use phase emissions",
          "Direct facility emissions",
        ],
        correctAnswer: 2,
        explanation: "Downstream Scope 3 includes distribution, product use, and end-of-life treatment.",
      },
      {
        id: 18,
        question: "How frequently should GHG inventories be updated?",
        options: [
          "Every 5 years",
          "Every 3 years",
          "Annually",
          "As needed",
        ],
        correctAnswer: 2,
        explanation: "The GHG Protocol recommends annual GHG inventory updates and reporting.",
      },
      {
        id: 19,
        question: "What is a base year in GHG Protocol?",
        options: [
          "The current year",
          "A historical reference year for tracking progress",
          "The most recent year",
          "An average year",
        ],
        correctAnswer: 1,
        explanation: "A base year is a historical reference year used to track emissions reduction progress.",
      },
      {
        id: 20,
        question: "What should accompany GHG emissions data according to the Protocol?",
        options: [
          "Financial data only",
          "Uncertainty assessment and methodology documentation",
          "Marketing materials",
          "Historical trends",
        ],
        correctAnswer: 1,
        explanation: "The Protocol requires uncertainty assessment and clear methodology documentation with emissions data.",
      },
    ],
  },
  "life-cycle-assessment": {
    title: "Life Cycle Assessment (LCA)",
    emoji: "♻️",
    headerBg: "#3B1F72",
    questions: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      question: `Sample LCA Question ${i + 1}?`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: Math.floor(Math.random() * 4),
      explanation: "This is a sample explanation for the LCA question.",
    })),
  },
  "sustainability-fundamentals-esg": {
    title: "Sustainability Fundamentals & ESG",
    emoji: "🌿",
    headerBg: "#1A4A38",
    questions: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      question: `Sample ESG Question ${i + 1}?`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: Math.floor(Math.random() * 4),
      explanation: "This is a sample explanation for the ESG question.",
    })),
  },
};

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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

  const handleSubmit = () => {
    let correctCount = 0;
    assessment.questions.forEach((question, i) => {
      if (answers[i] === question.correctAnswer) {
        correctCount++;
      }
    });
    const calculatedScore = (correctCount / assessment.questions.length) * 100;
    setScore(calculatedScore);
    setShowResults(true);
  };

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-serif-display { font-family: 'DM Serif Display', serif; }
      `}</style>

      <DashboardNavbar user={user} onLogout={handleLogout} />

      <main className="flex-1">
        {!showResults ? (
          <>
            {/* Header */}
            <section style={{ backgroundColor: assessment.headerBg }} className="py-8 px-6 text-white">
              <div className="max-w-7xl mx-auto">
                <motion.button
                  onClick={() => router.back()}
                  className="flex items-center gap-2 mb-6 text-[#A7D7C5] hover:text-white transition-colors"
                  whileHover={{ x: -4 }}
                >
                  <ArrowLeft size={18} /> Back
                </motion.button>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#A7D7C5] text-sm mb-2">{assessment.emoji}</p>
                    <h1 className="font-serif-display text-3xl font-bold">{assessment.title}</h1>
                  </div>
                  <div className="text-right">
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
            </section>

            {/* Question */}
            <section className="py-12 px-6" style={{ background: "#F5F0E8" }}>
              <div className="max-w-4xl mx-auto">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2 className="font-serif-display text-2xl font-bold text-[#0F3D2E] mb-8">
                    {question.question}
                  </h2>

                  <div className="space-y-3 mb-10">
                    {question.options.map((option, i) => (
                      <motion.button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        className={`w-full p-4 rounded-xl text-left font-medium transition-all border-2 ${
                          answers[currentQuestion] === i
                            ? "bg-[#0F3D2E] text-white border-[#0F3D2E]"
                            : "bg-white text-[#0F3D2E] border-[#E0EDE8] hover:border-[#0F3D2E]"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                              answers[currentQuestion] === i
                                ? "bg-white border-white text-[#0F3D2E]"
                                : "border-[#5C7A6E]"
                            }`}
                          >
                            {String.fromCharCode(65 + i)}
                          </div>
                          {option}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <motion.button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="px-6 py-2.5 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    style={{
                      background: currentQuestion === 0 ? "#E0EDE8" : "#0F3D2E",
                      color: currentQuestion === 0 ? "#5C7A6E" : "white",
                    }}
                    whileHover={{ scale: currentQuestion > 0 ? 1.05 : 1 }}
                  >
                    Previous
                  </motion.button>

                  {currentQuestion === assessment.questions.length - 1 ? (
                    <motion.button
                      onClick={handleSubmit}
                      disabled={!isAnswered}
                      className="px-8 py-2.5 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-white transition-all"
                      style={{ background: "#0F3D2E" }}
                      whileHover={{ scale: isAnswered ? 1.05 : 1 }}
                    >
                      Submit Assessment
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handleNext}
                      disabled={!isAnswered}
                      className="px-6 py-2.5 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-white transition-all"
                      style={{ background: "#0F3D2E" }}
                      whileHover={{ scale: isAnswered ? 1.05 : 1 }}
                    >
                      Next
                    </motion.button>
                  )}
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Results Section */}
            <section className="py-20 px-6 flex-1 flex items-center" style={{ background: "#F5F0E8" }}>
              <div className="max-w-4xl w-full mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-12 text-center border border-[#E0EDE8]"
                  style={{ boxShadow: "0 8px 32px rgba(26, 74, 58, 0.12)" }}
                >
                  {passed ? (
                    <>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6 }}
                        className="mb-6"
                      >
                        <CheckCircle size={80} className="mx-auto text-[#2E7D5B]" />
                      </motion.div>
                      <h2 className="font-serif-display text-4xl font-bold text-[#0F3D2E] mb-2">
                        Congratulations!
                      </h2>
                      <p className="text-[#5C7A6E] text-lg mb-6">You passed the assessment!</p>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}

                  <div className="mb-8">
                    <p className="text-5xl font-bold text-[#D4AF37] mb-2">{score.toFixed(1)}%</p>
                    <p className="text-[#5C7A6E]">
                      {Object.values(answers).reduce((count, answer, i) => count + (answer === assessment.questions[i].correctAnswer ? 1 : 0), 0)} out of {assessment.questions.length} correct
                    </p>
                  </div>

                  {passed && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 rounded-full font-semibold text-[#0F3D2E] text-lg mb-6"
                      style={{ background: "#D4AF37" }}
                    >
                      Download Certificate
                    </motion.button>
                  )}

                  <motion.button
                    onClick={handleGoToDashboard}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-full font-semibold text-white"
                    style={{ background: "#0F3D2E" }}
                  >
                    Return to Dashboard
                  </motion.button>
                </motion.div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}