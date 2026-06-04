/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { CUSTOM_BIO } from "../data";
import { Wrench, Award, Cpu, ShieldAlert, Sparkles, Sliders } from "lucide-react";
import { motion } from "motion/react";

export default function Introduction() {
  const [masterDiameter, setMasterDiameter] = useState<number>(10); // mm
  const [caliperDiameter, setCaliperDiameter] = useState<number>(16); // mm
  const [pistonCount, setPistonCount] = useState<number>(4); // Shimano high-end dual piston/quad caliper

  // Hydraulic force multiplier: Area ratio.
  // Master active piston area = pi * (d_m / 2)^2
  // Caliper active piston area = PinCount * pi * (d_c / 2)^2 
  // (actually dual-acting 4-pistons push on pads with total area = (4 pistons * Area_piston) but the hydraulic multiplier matches piston surface area)
  const masterArea = Math.PI * Math.pow(masterDiameter / 2, 2);
  const caliperArea = (pistonCount / 2) * Math.PI * Math.pow(caliperDiameter / 2, 2); // force on one side of rotor
  const ratio = caliperArea / masterArea;

  return (
    <div className="space-y-8" id="intro-component">
      {/* Bio Hero Section with Geometric Precision Lines */}
      <div className="relative overflow-hidden rounded-none border border-titanium-800 bg-carbon-card p-6 md:p-8 border-l-4 border-l-fluid-gold">
        <div className="relative flex flex-col md:flex-row gap-6 items-center">
          {/* Avatar / Brand Icon */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-none border-2 border-anodized-blue bg-titanium-950 flex flex-col items-center justify-center p-3 text-center shrink-0 relative">
            <Wrench className="w-10 h-10 md:w-14 md:h-14 text-anodized-blue mb-1" />
            <span className="font-mono text-[9px] text-titanium-400 tracking-widest uppercase">PRECISION</span>
            <div className="absolute -bottom-1 -right-1 bg-fluid-gold text-titanium-950 font-mono font-bold text-[10px] px-1.5 py-0.5 rounded-none font-black">
              LVL 4
            </div>
          </div>

          <div className="text-center md:text-left space-y-3">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-none text-[10px] font-mono border border-anodized-blue/30 text-anodized-blue bg-anodized-blue/10 font-bold uppercase">
                ACTIVE EXPERT
              </span>
              <span className="px-2.5 py-0.5 rounded-none text-[10px] font-mono border border-fluid-gold/30 text-fluid-gold bg-fluid-gold/10 font-bold uppercase">
                HYDRAULIC SPECIALIST
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-white uppercase">
              {CUSTOM_BIO.name}
            </h1>
            <p className="text-lg font-medium text-titanium-200">
              {CUSTOM_BIO.title}
            </p>
            <p className="text-sm leading-relaxed text-titanium-300 max-w-3xl font-sans">
              {CUSTOM_BIO.philosophy}
            </p>
          </div>
        </div>
      </div>

      {/* Core Specialties Bento Grid with Geometric Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CUSTOM_BIO.highlights.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-5 rounded-none border border-titanium-800 bg-titanium-900/50 hover:border-titanium-700 hover:bg-titanium-900/80 transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-none bg-titanium-800/80 border border-titanium-700 flex items-center justify-center">
              {idx === 0 && <Cpu className="w-5 h-5 text-anodized-blue" />}
              {idx === 1 && <Award className="w-5 h-5 text-fluid-gold" />}
              {idx === 2 && <ShieldAlert className="w-5 h-5 text-fluid-red" />}
            </div>
            <h3 className="font-display font-bold text-white text-base uppercase tracking-tight">
              {item.title}
            </h3>
            <p className="text-xs text-titanium-350 leading-relaxed font-sans">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Interactive Micro-Lab Element: Hydraulics Mechanical Calculator */}
      <div className="rounded-none border border-titanium-800 bg-titanium-900/30 p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Sliders className="w-6 h-6 text-anodized-blue" />
          <div>
            <h3 className="font-display font-bold text-lg text-white uppercase">
              Interactive Micro-Lab: Hydraulic Multiplication Mechanics
            </h3>
            <p className="text-xs text-titanium-400">
              Analyze the mathematical relationship between the Master Cylinder (lever) and Slave Pistons (caliper).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono text-titanium-300 uppercase">
                  Master Cylinder Piston Diameter
                </label>
                <span className="text-xs font-mono text-anodized-blue font-bold">
                  {masterDiameter.toFixed(1)} mm
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="12"
                step="0.5"
                value={masterDiameter}
                onChange={(e) => setMasterDiameter(parseFloat(e.target.value))}
                className="w-full accent-anodized-blue bg-titanium-800 rounded-none h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-titanium-500 font-mono">
                <span>8.0mm (High Lever Draw)</span>
                <span>12.0mm (Stiff Lever Feel)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono text-titanium-300 uppercase">
                  Caliper Slave Piston Diameter (Average)
                </label>
                <span className="text-xs font-mono text-fluid-gold font-bold">
                  {caliperDiameter.toFixed(1)} mm
                </span>
              </div>
              <input
                type="range"
                min="13"
                max="19"
                step="0.5"
                value={caliperDiameter}
                onChange={(e) => setCaliperDiameter(parseFloat(e.target.value))}
                className="w-full accent-fluid-gold bg-titanium-800 rounded-none h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-titanium-500 font-mono">
                <span>13.0mm (XC Minimal)</span>
                <span>19.0mm (Extreme DH Caliper)</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-titanium-300 block uppercase">
                Caliper Configuration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[2, 4].map((count) => (
                  <button
                    key={count}
                    onClick={() => setPistonCount(count)}
                    className={`py-2 text-xs font-mono rounded-none bg-titanium-900 border transition-all ${
                      pistonCount === count
                        ? "border-anodized-blue text-anodized-blue font-bold shadow-sm shadow-anodized-blue/20"
                        : "border-titanium-800 text-titanium-400 hover:border-titanium-700"
                    }`}
                  >
                    {count}-Piston Caliper
                  </button>
                ))}
                <div className="flex items-center justify-center text-[10px] text-titanium-400 font-mono bg-titanium-950/40 rounded-none border border-dashed border-titanium-800/80">
                  {pistonCount / 2} Active pair(s)
                </div>
              </div>
            </div>
          </div>

          {/* Mathematical Feedback / Visualizer */}
          <div className="flex flex-col justify-between p-4 rounded-none bg-titanium-950/80 border border-titanium-800 space-y-4">
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-titanium-400 uppercase tracking-wider">
                Leverage Output Telemetry
              </h4>
              <div className="h-px bg-titanium-800"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-titanium-900/60 rounded-none border border-titanium-800/50">
                <span className="block text-[10px] text-titanium-400 font-mono">
                  Lever Piston Area:
                </span>
                <span className="text-base font-mono font-bold text-white">
                  {masterArea.toFixed(2)} mm²
                </span>
              </div>
              <div className="p-3 bg-titanium-900/60 rounded-none border border-titanium-800/50">
                <span className="block text-[10px] text-titanium-400 font-mono">
                  Caliper Actuation Area:
                </span>
                <span className="text-base font-mono font-bold text-white">
                  {caliperArea.toFixed(2)} mm²
                </span>
              </div>
            </div>

            <div className="p-4 rounded-none bg-titanium-900 border-l-4 border-anodized-blue space-y-1 relative">
              <div className="absolute right-3 top-3 px-1.5 py-0.5 rounded-none bg-anodized-blue/10 border border-anodized-blue/20 text-[10px] text-anodized-blue font-mono font-bold">
                P₁ = P₂
              </div>
              <span className="block text-xs font-mono text-titanium-400">
                Hydraulic Force Multiplication Ratio:
              </span>
              <span className="text-2xl font-mono font-extrabold text-anodized-blue tracking-tight">
                {ratio.toFixed(2)}x
              </span>
              <p className="text-[10px] text-titanium-400 font-sans pt-1 leading-relaxed">
                Applying 100 Newtons of mechanical thrust at the master cylinder seal will deliver{" "}
                <strong className="text-white font-mono">{(100 * ratio).toFixed(1)} N</strong> of pure clamping force onto the brake pads. High ratios offer supreme power but require more lever travel distance to fully close the pad gaps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
