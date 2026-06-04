/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { User, Droplet, Wrench, Award, Sliders, Layers, ChevronRight, CheckCircle, Flame, ShieldAlert, BadgeInfo } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Introduction from "./components/Introduction";
import KeyAreas from "./components/KeyAreas";
import Tribology from "./components/Tribology";
import BleedSimulator from "./components/BleedSimulator";
import ComponentSetup from "./components/ComponentSetup";
import QuizSection from "./components/QuizSection";

type ActiveTab = "intro" | "areas" | "tribology" | "simulator" | "setup" | "quiz";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("intro");

  const tabItems = [
    { id: "intro" as ActiveTab, label: "Overview", icon: <User className="w-4 h-4" /> },
    { id: "areas" as ActiveTab, label: "Core Competencies", icon: <Wrench className="w-4 h-4" /> },
    { id: "tribology" as ActiveTab, label: "Tribology Science", icon: <Layers className="w-4 h-4 text-fluid-gold" /> },
    { id: "simulator" as ActiveTab, label: "Brake Bleed Lab", icon: <Droplet className="w-4 h-4 text-fluid-red" /> },
    { id: "setup" as ActiveTab, label: "Component Tuning", icon: <Sliders className="w-4 h-4 text-anodized-blue" /> },
    { id: "quiz" as ActiveTab, label: "Technical Quiz", icon: <Award className="w-4 h-4 text-fluid-gold" /> },
  ];

  const renderActiveContent = () => {
    switch (activeTab) {
      case "intro":
        return <Introduction />;
      case "areas":
        return <KeyAreas />;
      case "tribology":
        return <Tribology />;
      case "simulator":
        return <BleedSimulator />;
      case "setup":
        return <ComponentSetup />;
      case "quiz":
        return <QuizSection />;
      default:
        return <Introduction />;
    }
  };

  return (
    <div className="min-h-screen bg-titanium-950 text-titanium-100 flex flex-col antialiased">
      {/* Upper Navigation Header aligned with Geometric Balance */}
      <header className="border-b border-fluid-gold bg-titanium-950 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo / Brand Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-titanium-900 border border-titanium-800 flex items-center justify-center shrink-0">
              <Wrench className="w-5 h-5 text-fluid-gold" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-extrabold tracking-tighter text-white leading-none uppercase">
                Technical Workshop : <span className="text-fluid-gold">AERO-SYSTEMS</span>
              </h1>
              <p className="text-[10px] font-mono tracking-widest text-titanium-300 mt-1 uppercase">
                High-End Sports Bike Engineering & Tribological Analysis
              </p>
            </div>
          </div>

          {/* Station ID Metric aligned with design spec */}
          <div className="text-right font-mono self-end sm:self-center">
            <div className="text-[9px] text-fluid-gold uppercase tracking-widest font-bold">Station ID</div>
            <div className="text-xl font-bold text-white">WS-092.V4</div>
          </div>

        </div>
      </header>

      {/* Main Structural Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Navigation Sidebar (Left) */}
        <aside className="lg:w-64 shrink-0 flex flex-col gap-5">
          <div className="space-y-1">
            <h2 className="text-xs font-mono uppercase tracking-widest text-fluid-gold font-bold pl-1">
              00 / Navigation
            </h2>
            <div className="h-px bg-titanium-800"></div>
          </div>

          <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 scrollbar-none snap-x">
            {tabItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 py-3 rounded-none text-xs font-mono transition-all snap-start shrink-0 cursor-pointer text-left focus:outline-none ${
                    isActive
                      ? "bg-titanium-900 border-l-4 border-fluid-gold text-white font-bold px-4"
                      : "text-titanium-300 hover:text-white hover:bg-titanium-900/50 border-l-4 border-transparent px-4"
                  }`}
                >
                  <div className="p-1">
                    {item.icon}
                  </div>
                  <span className="uppercase">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Stats sidebar banner */}
          <div className="hidden lg:block p-5 border-l-4 border-anodized-blue bg-titanium-900 space-y-3">
            <div className="flex items-center gap-2 text-anodized-blue">
              <BadgeInfo className="w-4 h-4 shrink-0" />
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold">00 / System Stats</span>
            </div>
            <p className="text-[11px] text-titanium-300 font-sans leading-relaxed">
              This portfolio represents fluid calculations, calibration profiles, and dynamic tribological loads modeled for high-end track setups.
            </p>
          </div>
        </aside>

        {/* Dynamic Workbench Content Stage (Right) */}
        <section className="flex-grow flex flex-col" id="active-workbench-stage">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="flex-1"
            >
              {renderActiveContent()}
            </motion.div>
          </AnimatePresence>
        </section>

      </main>

      {/* Elegant Footer matching Geometric Balance coordinate specs */}
      <footer className="border-t border-titanium-800 bg-[#111111] py-5 text-xs font-mono text-titanium-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-4 sm:gap-8 justify-center text-[10px]">
            <span>COORD: 52.5200° N, 13.4050° E</span>
            <span>SESSION_START: 08:00:00</span>
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>SYSTEM OVERALL UPTIME: 99.9%</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
