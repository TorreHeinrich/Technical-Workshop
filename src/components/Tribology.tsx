/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { TRIBOLOGY_CONCEPTS } from "../data";
import { Gauge, Flame, TrendingDown, RefreshCcw, Layers, Zap, Info } from "lucide-react";
import { motion } from "motion/react";

export default function Tribology() {
  const [lubricationMode, setLubricationMode] = useState<"dry" | "wet" | "wax">("wet");
  const [velocity, setVelocity] = useState<number>(30); // scale 1-100 (e.g. cadence/chain velocity)
  const [loadForce, setLoadForce] = useState<number>(180); // Newtons applied (clamping/tension)

  // Simulation mathematical modeling
  // 1. Friction coefficient (mu) based on lubrication and speed (Stribeck approximation)
  let staticMu = 0.0;
  let dynamicMu = 0.0;
  let wearFactor = 0.0; // multiplier for wear damage
  let frictionTermDescription = "";

  switch (lubricationMode) {
    case "dry":
      staticMu = 0.45;
      dynamicMu = 0.38;
      wearFactor = 0.95;
      frictionTermDescription = "Boundary Tribochemical Friction contact. High peak micro-asperity shear leads to abrasive scoring and high mechanical heat.";
      break;
    case "wet":
      // Wet lube uses synthetic oil. Has thick film but high viscous shear at speed.
      staticMu = 0.12;
      // Stribeck effect: decreases with brief velocity (mixed), then increases at high speeds due to fluid friction drag (hydrodynamic)
      dynamicMu = 0.05 + 0.001 * velocity; 
      wearFactor = 0.22;
      frictionTermDescription = "Mixed to Hydrodynamic fluid shear. Highly durable water-shedding layer, but attracts floating airborne micro-sand particles.";
      break;
    case "wax":
      // Wax has microscopic solid boundary shear. Low static friction, flat dynamic curve.
      staticMu = 0.06;
      dynamicMu = 0.038 - 0.0001 * velocity; 
      wearFactor = 0.05;
      frictionTermDescription = "Solid Boundary Wax Film. Solid paraffin platelets slide cleanly. Minimal contaminant adhesion coefficient.";
      break;
  }

  // Calculate outputs
  const frictionForce = loadForce * dynamicMu; // F = mu * Rn
  const heatGeneration = frictionForce * (velocity / 10); // Heat index
  const wearRate = loadForce * dynamicMu * wearFactor * (velocity / 50); // W = K * F * d

  // Determine active Stribeck Regime
  let currentRegime = "";
  let regimeDetails = "";
  if (lubricationMode === "dry") {
    currentRegime = "Boundary Lubrication";
    regimeDetails = "No fluid separation. Microscopic surface hills collide directly, generating rapid adhesive tearing.";
  } else if (velocity < 20) {
    currentRegime = "Boundary / Thin Film Phase";
    regimeDetails = "Very low relative speed doesn't pump enough fluid film between pores. High risk of torque squeak.";
  } else if (velocity >= 20 && velocity < 60) {
    currentRegime = "Mixed Lubrication Regime";
    regimeDetails = "The sweet spot of micro-film and boundary protection. Low wear, balanced drag metrics.";
  } else {
    currentRegime = "Hydrodynamic / Viscous Phase";
    regimeDetails = "Surfaces fully float on the sheared fluid film. Zero wear, but higher fluid drag (parasitic viscous watts).";
  }

  return (
    <div className="space-y-6" id="tribology-section">
      <div className="space-y-1">
        <h2 className="text-2xl font-display font-black text-white">
          Theoretical Foundation: Advanced Tribology
        </h2>
        <p className="text-sm text-titanium-400">
          How micro-frictional metallurgy, boundary lubrication regimes, and contact wear physics govern workshop actions.
        </p>
      </div>

      {/* Conceptual Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TRIBOLOGY_CONCEPTS.map((concept, index) => (
          <div
            key={concept.id}
            className="p-5 rounded-none border border-titanium-800 bg-titanium-900/30 hover:border-titanium-700 hover:bg-titanium-900/50 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-anodized-blue font-bold">
                STRICT PHYSICAL THEORY
              </span>
              <h3 className="font-display font-bold text-white text-base">
                {concept.title}
              </h3>
              <p className="text-xs text-titanium-400 leading-relaxed font-sans">
                <strong>Concept: </strong>{concept.definition}
              </p>
            </div>
            
            <div className="p-3 bg-titanium-950/80 rounded-none border border-titanium-800/80 space-y-1.5 text-[11px]">
              <div className="font-mono text-[9px] text-fluid-gold font-bold uppercase">
                Critical Workshop Reflection:
              </div>
              <p className="text-titanium-300 italic font-sans leading-relaxed">
                "{concept.example}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Real-Time Interactive Tribology Lab */}
      <div className="rounded-none border border-titanium-800 bg-carbon-card p-6 border-l-4 border-anodized-blue">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Controls Panel */}
          <div className="flex-1 space-y-5">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-anodized-blue" />
                <h3 className="font-display font-bold text-white text-base">
                  Interactive Tribological Surface Lab
                </h3>
              </div>
              <p className="text-xs text-titanium-400 mt-1">
                Customize lubricant properties, velocities, and normal force inputs to calculate active stress profiles.
              </p>
            </div>

            {/* Select Lubricant State */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-titanium-300 uppercase">
                1. Select Boundary Lubricant Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setLubricationMode("dry")}
                  className={`py-2 text-xs font-mono rounded-none border transition-all ${
                    lubricationMode === "dry"
                      ? "border-fluid-red bg-fluid-red/10 text-fluid-red font-bold animate-pulse"
                      : "border-titanium-800 bg-titanium-900/30 text-titanium-400 hover:border-titanium-700"
                  }`}
                >
                  Unlubricated (Dry)
                </button>
                <button
                  onClick={() => setLubricationMode("wet")}
                  className={`py-2 text-xs font-mono rounded-none border transition-all ${
                    lubricationMode === "wet"
                      ? "border-anodized-blue bg-anodized-blue/10 text-anodized-blue font-bold"
                      : "border-titanium-800 bg-titanium-900/30 text-titanium-400 hover:border-titanium-700"
                  }`}
                >
                  Synthetic Wet Lube
                </button>
                <button
                  onClick={() => setLubricationMode("wax")}
                  className={`py-2 text-xs font-mono rounded-none border transition-all ${
                    lubricationMode === "wax"
                      ? "border-fluid-gold bg-fluid-gold/10 text-fluid-gold font-bold"
                      : "border-titanium-800 bg-titanium-900/30 text-titanium-400 hover:border-titanium-700"
                  }`}
                >
                  Solid Paraffin Wax
                </button>
              </div>
            </div>

            {/* Velocity Normalizer */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono uppercase">
                <span className="text-titanium-300">2. Relative Motion Speed (Velocity)</span>
                <span className="text-white font-bold">{velocity} cm/s</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={velocity}
                onChange={(e) => setVelocity(parseInt(e.target.value))}
                className="w-full accent-anodized-blue bg-titanium-800 rounded-none h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-titanium-500 font-mono">
                <span>Slow Roll (Pivoting linkages)</span>
                <span>Sprint Spin (~120 RPM Cadence)</span>
              </div>
            </div>

            {/* Load force slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono uppercase">
                <span className="text-titanium-300">3. Contact Normal Load (Thrust Tension)</span>
                <span className="text-white font-bold">{loadForce} N</span>
              </div>
              <input
                type="range"
                min="20"
                max="400"
                value={loadForce}
                onChange={(e) => setLoadForce(parseInt(e.target.value))}
                className="w-full accent-fluid-gold bg-titanium-800 rounded-none h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-titanium-500 font-mono">
                <span>20N (Gentle Bearing Preload)</span>
                <span>400N (Intense Pedaling Peak Torques)</span>
              </div>
            </div>
          </div>

          {/* Visual Simulation Display Panel */}
          <div className="flex-1 flex flex-col justify-between p-5 rounded-none bg-titanium-950/90 border border-titanium-850 space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-titanium-400">STATE LAB TELEMETRY</span>
                <span className="text-xs font-mono font-bold text-fluid-gold animate-pulse">{currentRegime}</span>
              </div>
              <p className="text-[11px] text-titanium-300 font-sans italic leading-tight">
                {regimeDetails}
              </p>
              <div className="h-px bg-titanium-800 my-2"></div>
            </div>

            {/* Interactive schematic rendering of asperities */}
            <div className="h-24 bg-titanium-950 rounded-none border border-titanium-800 relative overflow-hidden flex flex-col justify-center items-center">
              <span className="absolute top-1 left-2 font-mono text-[9px] text-titanium-500">SURFACE CONTACT REGIME SIMULATION</span>
              
              {/* Top sliding plate */}
              <motion.div
                animate={{ x: [0, 40, 0] }}
                transition={{ repeat: Infinity, duration: 10 / (velocity / 5), ease: "linear" }}
                className="absolute top-6 left-0 right-[-100px] h-3 border-b-2 border-dashed border-titanium-400 bg-titanium-800 flex items-center"
              >
                {/* Teeth of upper plate */}
                <div className="w-full flex justify-around">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-2 h-1 bg-titanium-500"></div>
                  ))}
                </div>
              </motion.div>

              {/* Dynamic Lubrication layer representation */}
              {lubricationMode !== "dry" && (
                <motion.div
                  animate={{ opacity: [0.6, 0.8, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className={`absolute top-[38px] left-0 right-0 h-2 blur-[1px] ${
                    lubricationMode === "wet" ? "bg-anodized-blue/50" : "bg-fluid-gold/40"
                  }`}
                />
              )}

              {/* Bottom fixed plate */}
              <div className="absolute bottom-6 left-0 right-0 h-3 border-t-2 border-dashed border-titanium-400 bg-titanium-800 flex items-center">
                {/* Teeth of bottom plate */}
                <div className="w-full flex justify-around">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-2 h-1 bg-titanium-500 transform translate-y-[-4px]"></div>
                  ))}
                </div>
              </div>

              {/* Sparkles / Wear alerts */}
              {lubricationMode === "dry" && velocity > 40 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1">
                  <span className="px-1.5 py-0.5 rounded-none bg-fluid-red text-[8px] font-mono font-bold animate-ping uppercase text-white">
                    HEAVY DYNAMIC WEAR
                  </span>
                </div>
              )}
            </div>

            {/* Math Output Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-titanium-900 rounded-none border border-titanium-800">
                <div className="flex items-center gap-1.5 text-titanium-400 font-mono text-[9px] tracking-wider uppercase mb-1">
                  <Gauge className="w-3.5 h-3.5 text-anodized-blue" />
                  friction coeff
                </div>
                <div className="text-sm md:text-base font-mono font-bold text-white leading-none">
                  {dynamicMu.toFixed(3)} μ
                </div>
              </div>

              <div className="p-3 bg-titanium-900 rounded-none border border-titanium-800">
                <div className="flex items-center gap-1.5 text-titanium-400 font-mono text-[9px] tracking-wider uppercase mb-1">
                  <Flame className="w-3.5 h-3.5 text-fluid-red animate-pulse" />
                  thermal out
                </div>
                <div className="text-sm md:text-base font-mono font-bold text-white leading-none">
                  {heatGeneration.toFixed(1)} J/s
                </div>
              </div>

              <div className="p-3 bg-titanium-900 rounded-none border border-titanium-800">
                <div className="flex items-center gap-1.5 text-titanium-400 font-mono text-[9px] tracking-wider uppercase mb-1">
                  <TrendingDown className="w-3.5 h-3.5 text-fluid-gold" />
                  wear rate
                </div>
                <div className="text-sm md:text-base font-mono font-bold text-white leading-none">
                  {wearRate.toFixed(2)} mm³/h
                </div>
              </div>
            </div>

            {/* Summary sentence explanation */}
            <div className="flex items-start gap-2 text-[11px] bg-titanium-900/60 p-2.5 rounded-none border border-titanium-800/40 text-titanium-300 font-sans">
              <Info className="w-3.5 h-3.5 text-anodized-blue shrink-0 mt-0.5" />
              <span>
                <strong>System diagnostics: </strong>{frictionTermDescription}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
