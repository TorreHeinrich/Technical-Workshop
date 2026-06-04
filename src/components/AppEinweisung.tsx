import React, { useState, useEffect } from "react";
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Wrench, 
  Layers, 
  Droplet, 
  Sliders, 
  Award, 
  User,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AppEinweisungProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface TourStep {
  tab: "intro" | "areas" | "tribology" | "simulator" | "setup" | "quiz";
  title: string;
  description: string;
  hotspots: string[];
  tips: string;
  badge: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    tab: "intro",
    title: "Welcome to the Engineering Workspace!",
    description: "You are currently in the central overview cockpit of high-end cycling engineering by Torre Ehlers. This platform explores progressive hydraulic calculations, tribological science, and thermo-mechanical stress cycles engineered for professional championship setups.",
    hotspots: ["Overview & Introductions", "Engineering Philosophy"],
    tips: "Tip: Scroll down on this tab to review and study the detailed comparative tables.",
    badge: "01 / WORKSPACE CONFIG"
  },
  {
    tab: "areas",
    title: "Precision Engineering & Core Competencies",
    description: "In this module, you will find targeted solutions to real-world workshop challenges. Interrogate advanced hydraulic architectures, specialized sealing metrics under heavy loads, and proper caliper D-Gap alignment.",
    hotspots: ["Core Technical Competencies", "Real Workshop Pitfalls", "Pro Tips"],
    tips: "Tip: Click on any of the competency cards to expand step-by-step diagnostic workflows.",
    badge: "02 / CORE SKILLS"
  },
  {
    tab: "tribology",
    title: "Interactive Tribology & Friction Physics",
    description: "An immersive tribology laboratory. Adapt the applied normal load, sliding speed, and localized temperatures in real time using precision sliders. The friction coefficient (COF) and fluid shear curves update instantly according to hydrodynamic principles.",
    hotspots: ["Real-time Friction Coefficient (COF)", "Fluid Film Viscosity Plot", "Thermo-Mechanical Controls"],
    tips: "Tip: Swap your mineral formulas or fluid compounds and tweak the normal force to simulate extreme boundary lubrication limits.",
    badge: "03 / TRIBOLOGY SIM"
  },
  {
    tab: "simulator",
    title: "Hydraulic Bleeding Simulator (Brake Bleed Lab)",
    description: "A fully active training module for bicycle disc brake bleeding. Safely execute the 6 structural steps: mount the caliper bleed block, connect internal syringes, purge trapped air bubbles, and construct a rock-solid hydraulic bite point.",
    hotspots: ["6-Step Purge Procedure", "Real-time Pressure & Purity Gauge", "Live Bite Point Squeeze-Test"],
    tips: "Tip: During the vacuum phase, tap directly on the virtual lines to dislodge stubborn micro-bubble clusters!",
    badge: "04 / HYDRAULIC DUCT"
  },
  {
    tab: "setup",
    title: "Fastener Torque & Tuning Case Studies",
    description: "Carbon composites are highly susceptible to clamping fatigue. Inspect active field failures or performance tunings to calibrate exact Newton-meter (Nm) torque values, securing components without cracking ultra-thin walls.",
    hotspots: ["Active Workshop Challenges", "Diagnostic Symptoms & Remedies", "Torque Wrench Calibration Panel"],
    tips: "Tip: Each case defines precise clamping envelopes to keep components secure and composite weaves completely intact.",
    badge: "05 / CALIBRATION RAT"
  },
  {
    tab: "quiz",
    title: "Technical Compliance Audit & Certification",
    description: "Ready to test your knowledge? Attempt our comprehensive compliance assessment covering complex questions on hydraulic flow, boundary friction, and torque ranges to qualify for a validated course certificate.",
    hotspots: ["6 Multiple Choice Audits", "Live Performance Rating", "Official Secure-Signed Certificate"],
    tips: "Tip: Pass the exam and insert your professional name to imprint the secure digital integrity seal.",
    badge: "06 / AUDIT SECURE"
  }
];

export default function AppEinweisung({ activeTab, setActiveTab, isOpen, onClose }: AppEinweisungProps) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  // Auto-switch tabs to show corresponding UI sections during tour steps
  useEffect(() => {
    if (isOpen) {
      setActiveTab(TOUR_STEPS[currentStepIdx].tab);
    }
  }, [currentStepIdx, isOpen, setActiveTab]);

  if (!isOpen) return null;

  const currentStep = TOUR_STEPS[currentStepIdx];

  const handleNext = () => {
    if (currentStepIdx < TOUR_STEPS.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4 sm:p-6 bg-titanium-950/80 backdrop-blur-xs">
      
      {/* Absolute Backdrop close */}
      <div className="absolute inset-0 cursor-crossgrid" onClick={onClose} />

      {/* Guide Card Box */}
      <motion.div
        initial={{ scale: 0.95, y: 15, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 15, opacity: 0 }}
        className="relative w-full max-w-xl bg-titanium-900 border border-fluid-gold text-white p-5 md:p-6 shadow-2xl z-10 rounded-none flex flex-col justify-between"
      >
        {/* Glow Line accent top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-anodized-blue via-fluid-gold to-fluid-red"></div>

        {/* Header Block with step indicators */}
        <div className="flex items-center justify-between border-b border-titanium-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-fluid-gold animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-fluid-gold">
              {currentStep.badge}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-titanium-400">
              STEP {currentStepIdx + 1} OF {TOUR_STEPS.length}
            </span>
            <button 
              onClick={onClose}
              className="text-titanium-400 hover:text-white transition-colors cursor-pointer"
              title="End Tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Guided content with subtle animations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIdx}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
            className="space-y-4 min-h-[190px] flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-display font-black uppercase text-white tracking-tight mb-2">
                {currentStep.title}
              </h3>
              <p className="text-xs text-titanium-300 font-sans leading-relaxed mb-3">
                {currentStep.description}
              </p>
            </div>

            {/* Active section landmarks */}
            <div className="space-y-2">
              <div className="text-[9px] font-mono text-titanium-400 uppercase tracking-wider font-extrabold">
                Focus Areas in this Tab:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentStep.hotspots.map((h, i) => (
                  <span 
                    key={i} 
                    className="text-[9px] font-mono border border-titanium-750 bg-titanium-950/60 px-2 py-0.5 text-anodized-blue flex items-center gap-1"
                  >
                    <span className="w-1 h-1 bg-anodized-blue"></span> {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Pro Tips box */}
            <div className="p-2.5 bg-fluid-gold/5 border border-fluid-gold/25 text-[10px] sm:text-xs text-fluid-gold font-mono leading-relaxed">
              {currentStep.tips}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Horizontal dots index */}
        <div className="flex justify-center gap-1.5 my-4">
          {TOUR_STEPS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStepIdx(idx)}
              className={`h-1.5 w-6 transition-all ${
                idx === currentStepIdx 
                  ? "bg-fluid-gold" 
                  : "bg-titanium-800 hover:bg-titanium-700"
              }`}
            />
          ))}
        </div>

        {/* Navigation actions */}
        <div className="flex items-center justify-between border-t border-titanium-800 pt-4 mt-2">
          <button
            onClick={handlePrev}
            disabled={currentStepIdx === 0}
            className="py-2 px-3 text-[10px] font-mono border border-titanium-850 hover:border-titanium-700 hover:text-white transition-all text-titanium-400 flex items-center gap-1.5 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> BACK
          </button>

          <span className="hidden sm:inline text-[9px] font-mono text-titanium-500">
            Click outside the card to close
          </span>

          <button
            onClick={handleNext}
            className="py-2 px-4 text-[10px] font-mono font-bold bg-fluid-gold text-titanium-950 hover:bg-fluid-gold/80 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {currentStepIdx === TOUR_STEPS.length - 1 ? (
              <>FINISH TOUR <CheckCircle2 className="w-3.5 h-3.5" /></>
            ) : (
              <>NEXT TAB <ArrowRight className="w-3.5 h-3.5" /></>
            )}
          </button>
        </div>

      </motion.div>
    </div>
  );
}
