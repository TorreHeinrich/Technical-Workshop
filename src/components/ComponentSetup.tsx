/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { SETUP_CHALLENGES } from "../data";
import { Hammer, CircleAlert, Sparkles, AlertCircle, RefreshCw, KeyRound, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ComponentSetup() {
  const [activeChallengeId, setActiveChallengeId] = useState<string>("squeal");

  const activeChallenge = SETUP_CHALLENGES.find(c => c.id === activeChallengeId) || SETUP_CHALLENGES[0];

  return (
    <div className="space-y-6" id="component-setup-comp">
      
      {/* Description header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-display font-black text-white">
          Complex Mechanics: Deep Diagnosis & Mechanical Tuning
        </h2>
        <p className="text-sm text-titanium-400">
          Advanced setup parameters, precise bolt-tension torque thresholds, and systematic failure-isolation procedures.
        </p>
      </div>

      {/* Specialty Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-titanium-850 pb-px">
        {SETUP_CHALLENGES.map((challenge) => (
          <button
            key={challenge.id}
            onClick={() => setActiveChallengeId(challenge.id)}
            className={`py-3 px-4 text-xs font-mono font-medium border-b-2 transition-all cursor-pointer ${
              activeChallengeId === challenge.id
                ? "border-anodized-blue text-anodized-blue bg-anodized-blue/5 font-bold"
                : "border-transparent text-titanium-400 hover:text-white"
            }`}
          >
            {challenge.component}
          </button>
        ))}
      </div>

      {/* Main Diagnosis Workbench */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeChallengeId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Diagnostic Symptoms and Sequence (7 cols) */}
          <div className="lg:col-span-7 space-y-6 bg-titanium-900/10 border border-titanium-850 p-6 rounded-none">
            {/* Context scenario card */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-fluid-gold tracking-widest block">
                active troubleshooting log
              </span>
              <h3 className="text-xl font-display font-black text-white leading-tight uppercase tracking-tight">
                {activeChallenge.component} - Tuning Case Study
              </h3>
              <p className="text-sm text-titanium-300 bg-titanium-950/40 p-3.5 rounded-none border border-titanium-800 leading-relaxed font-sans italic">
                <strong>The Scenario:</strong> "{activeChallenge.scenario}"
              </p>
            </div>

            {/* Diagnostic sequence steps */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-titanium-400 tracking-wider font-bold flex items-center gap-2">
                <Hammer className="w-4 h-4 text-anodized-blue" />
                Step-by-Step Diagnostic Protocol
              </h4>
              <div className="space-y-2.5">
                {activeChallenge.diagnosticSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 p-3 rounded-none bg-titanium-950/20 border border-titanium-850 text-xs text-titanium-300 font-sans"
                  >
                    <div className="w-5 h-5 bg-titanium-800 border border-titanium-750 text-[10px] font-mono font-bold flex items-center justify-center text-anodized-blue shrink-0 mt-0.5 rounded-none">
                      0{idx + 1}
                    </div>
                    <p className="leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Symptom list */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-titanium-400 tracking-wider font-bold flex items-center gap-2">
                <CircleAlert className="w-4 h-4 text-fluid-red" />
              Observed Symptom Pattern
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {activeChallenge.symptoms.map((symptom, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-none border border-red-950/10 bg-red-950/5 text-xs text-titanium-400 font-sans flex gap-2"
                  >
                    <span className="text-fluid-red font-mono shrink-0 font-bold">▶</span>
                    <span>{symptom}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Solution & Fastener Torque Telemetry (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-carbon-card border border-titanium-800 p-6 rounded-none">
            
            {/* The Solution */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <Sparkles className="w-5 h-5 shrink-0" />
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold">
                  Definitive Engineering Solution
                </h4>
              </div>

              <div className="p-4 rounded-none bg-emerald-950/5 border border-emerald-900/10 space-y-3">
                <p className="text-xs text-titanium-300 leading-relaxed font-sans">
                  {activeChallenge.solution.split(". ").map((sentence, idx) => (
                    <span key={idx} className="block mb-2 text-titanium-350 leading-relaxed">
                      {sentence.trim() && (
                        <span className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{sentence.trim()}</span>
                        </span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            {/* Calibrated Torque Panel */}
            <div className="p-4 rounded-none bg-titanium-950/80 border border-titanium-800/80 space-y-4 relative">
              <div className="absolute right-3 top-3 py-0.5 px-2 rounded-none border border-fluid-gold/30 bg-fluid-gold/10 text-[9px] font-mono text-fluid-gold font-bold uppercase tracking-wider">
                LOCK LIMITS
              </div>
              
              <div className="space-y-1">
                <h5 className="text-xs font-mono text-titanium-400 uppercase tracking-widest">
                  CALIBRATED TORQUE PARAMETERS
                </h5>
                <p className="text-[10px] text-titanium-450 font-sans">
                  Use calibrated digital torque instrumentation to prevent stripping threads or collapsing thin composite wall interfaces.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-titanium-900 border border-titanium-750 flex items-center justify-center rounded-none">
                  <KeyRound className="w-8 h-8 text-fluid-gold" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-titanium-450 uppercase font-black">
                    RECOMMENDED FASTENER SPEC
                  </span>
                  <span className="text-lg font-mono font-bold text-white tracking-tight">
                    {activeChallenge.torqueSpec}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-titanium-900/40 border border-titanium-850 text-[10px] text-titanium-400 font-sans italic leading-relaxed rounded-none">
                "Note: A loose thread under-clamped can drift outward during severe singletrack oscillations; over-clamping, however, crushes alloy sleeves irreversibly."
              </div>

            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
