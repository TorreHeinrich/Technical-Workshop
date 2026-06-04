/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { WORKSHOP_AREAS } from "../data";
import { Droplet, Sliders, Activity, ChevronDown, ChevronUp, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function KeyAreas() {
  const [expandedArea, setExpandedArea] = useState<string | null>("hydraulics");

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Droplet":
        return <Droplet className="w-6 h-6 text-fluid-red" />;
      case "Sliders":
        return <Sliders className="w-6 h-6 text-anodized-blue" />;
      case "Activity":
        return <Activity className="w-6 h-6 text-fluid-gold" />;
      default:
        return <Sliders className="w-6 h-6 text-white" />;
    }
  };

  const toggleArea = (id: string) => {
    setExpandedArea(expandedArea === id ? null : id);
  };

  return (
    <div className="space-y-6" id="key-areas">
      <div className="space-y-1">
        <h2 className="text-2xl font-display font-black text-white">
          Key Areas of High-End Workshop Work
        </h2>
        <p className="text-sm text-titanium-400">
          Rigorous engineering focus, system optimization, tactile troubleshooting, and component calibration.
        </p>
      </div>

      <div className="space-y-4">
        {WORKSHOP_AREAS.map((area, idx) => {
          const isExpanded = expandedArea === area.id;
          return (
            <div
              key={area.id}
              className={`rounded-none border transition-all duration-300 ${
                isExpanded
                  ? "border-titanium-700 bg-titanium-900/60 shadow-lg"
                  : "border-titanium-850 bg-titanium-900/20 hover:border-titanium-800"
              }`}
            >
              {/* Header Tab */}
              <button
                onClick={() => toggleArea(area.id)}
                className="w-full flex items-center justify-between p-4 md:p-6 text-left cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-none bg-titanium-800/60 border border-titanium-700/50">
                    {getIcon(area.icon)}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">
                      {area.title}
                    </h3>
                    <p className="text-xs text-titanium-400 max-w-xl line-clamp-1 font-sans">
                      {area.summary}
                    </p>
                  </div>
                </div>
                <div className="p-1 rounded bg-titanium-800 border border-titanium-700 text-titanium-300">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Collapsed Info Details */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 md:p-6 pt-0 border-t border-titanium-850 space-y-6">
                      {/* Sub-Specializations bullet points */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono text-titanium-300 uppercase tracking-widest font-bold">
                          Core Technical Competencies:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {area.details.map((detail, index) => (
                            <div
                              key={index}
                              className="flex gap-2 p-3 rounded-none bg-titanium-950/40 border border-titanium-850/60 text-xs text-titanium-300 items-start font-sans"
                            >
                              <CheckCircle2 className="w-4 h-4 text-anodized-blue shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Challenges Column */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Real Workshop Challenges */}
                        <div className="p-4 rounded-none bg-red-950/10 border border-red-900/20 space-y-3">
                          <div className="flex items-center gap-2 text-fluid-red">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <h4 className="text-xs font-mono uppercase tracking-wider font-bold">
                              Critical Failure Modes & Challenges
                            </h4>
                          </div>
                          <ul className="space-y-2">
                            {area.challenges.map((challenge, index) => (
                              <li key={index} className="text-xs text-titanium-400 pl-4 relative font-sans">
                                <span className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-fluid-red"></span>
                                {challenge}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Professional Pro Tips */}
                        <div className="p-4 rounded-none bg-amber-950/10 border border-amber-900/20 space-y-3">
                          <div className="flex items-center gap-2 text-fluid-gold">
                            <Sparkles className="w-5 h-5 shrink-0" />
                            <h4 className="text-xs font-mono uppercase tracking-wider font-bold">
                              Mitigation & Specialist Pro Tips
                            </h4>
                          </div>
                          <ul className="space-y-2">
                            {area.proTips.map((tip, index) => (
                              <li key={index} className="text-xs text-titanium-400 pl-4 relative font-sans">
                                <span className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-fluid-gold"></span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
