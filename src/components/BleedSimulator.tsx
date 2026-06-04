/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { BLEED_STEPS } from "../data";
import { Wrench, Droplet, CheckCircle, RefreshCw, ChevronRight, ChevronLeft, Volume2, AlertCircle, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function BleedSimulator() {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [bleedPushedCount, setBleedPushedCount] = useState<number>(0); // 0 to 100% fluid purity
  const [tappedBubbleCount, setTappedBubbleCount] = useState<number>(0); // how many bubbles dislodged
  const [torqueSpecValue, setTorqueSpecValue] = useState<number>(2.5); // Nm scale
  const [leverFeelFirmness, setLeverFeelFirmness] = useState<number>(0); // lever pump count or pressure achieved
  const [blockMounted, setBlockMounted] = useState<boolean>(false);
  const [portsConnected, setPortsConnected] = useState<boolean>(false);
  const [portClosed, setPortClosed] = useState<boolean>(false);

  const step = BLEED_STEPS[currentStepIdx];

  const handleReset = () => {
    setCurrentStepIdx(0);
    setBleedPushedCount(0);
    setTappedBubbleCount(0);
    setTorqueSpecValue(2.5);
    setLeverFeelFirmness(0);
    setBlockMounted(false);
    setPortsConnected(false);
    setPortClosed(false);
  };

  const handleNextStep = () => {
    if (currentStepIdx < BLEED_STEPS.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  // Virtual interaction triggers
  const handleBlockToggle = () => {
    setBlockMounted(prev => !prev);
  };

  const handlePortsToggle = () => {
    setPortsConnected(prev => !prev);
  };

  const handlePushSyringe = () => {
    setBleedPushedCount(prev => Math.min(100, prev + 25));
  };

  const handleTapLine = () => {
    setTappedBubbleCount(prev => Math.min(10, prev + 1));
  };

  const handleSqueezeLever = () => {
    setLeverFeelFirmness(prev => Math.min(100, prev + 20));
  };

  // Determine helper message based on simulator status
  const isActionComplete = () => {
    switch (step.interactiveAction) {
      case "mount":
        return blockMounted;
      case "open-port":
        return portsConnected;
      case "push-syringe":
        return bleedPushedCount >= 100;
      case "pull-syringe":
        return tappedBubbleCount >= 8;
      case "close-port":
        return portClosed && torqueSpecValue >= 4.5 && torqueSpecValue <= 5.5;
      case "squeeze-lever":
        return leverFeelFirmness >= 100;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6" id="bleed-simulator-root">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-display font-black text-white">
            Practical Lab: Interactive Brake Bleeding Simulator
          </h2>
          <p className="text-sm text-titanium-400">
            Calibrate, bleed, tap, and verify hydraulic leverage through a reactive physical simulation.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="px-3 py-1.5 rounded bg-titanium-900 border border-titanium-800 text-xs font-mono text-titanium-305 flex items-center gap-1.5 hover:border-titanium-700 bg-linear-to-b"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Re-start Simulation
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Step Guide & Information Panel (Left column) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-titanium-900/10 border border-titanium-850 p-6 rounded-none">
          <div className="space-y-4">
            
            {/* Step badges */}
            <div className="flex justify-between items-center bg-titanium-950/40 p-2.5 rounded-none border border-titanium-800">
              <span className="text-[11px] font-mono font-bold text-anodized-blue uppercase tracking-widest">
                STEP {step.number} of {BLEED_STEPS.length}
              </span>
              <div className="flex gap-1">
                {BLEED_STEPS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 w-4 rounded-none transition-all ${
                      idx === currentStepIdx
                        ? "bg-anodized-blue"
                        : idx < currentStepIdx
                        ? "bg-emerald-500"
                        : "bg-titanium-800"
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Instruction content */}
            <div className="space-y-2">
              <h3 className="font-display font-bold text-xl text-white uppercase tracking-tight">
                {step.title}
              </h3>
              <p className="text-xs text-titanized-100 font-mono italic leading-relaxed text-fluid-gold uppercase">
                "{step.description}"
              </p>
              <p className="text-sm text-titanium-400 font-sans leading-relaxed">
                {step.detailedInstruction}
              </p>
            </div>

            {/* Tool specs */}
            <div className="p-3 bg-titanium-900/60 rounded-none border border-titanium-800/80 space-y-1">
              <span className="text-[10px] font-mono uppercase text-titanium-400 block font-bold">
                Tools Handled in This Step:
              </span>
              <p className="text-xs text-white font-mono flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 text-anodized-blue" />
                {step.requiredTool}
              </p>
            </div>

            {/* Pro Warning Tip */}
            <div className="p-3 bg-titanium-950/40 rounded-none border border-titanium-850 text-xs text-titanium-400 font-sans space-y-1.5">
              <div className="flex items-center gap-1.5 text-fluid-red text-[11px] font-mono uppercase font-bold">
                <AlertCircle className="w-3.5 h-3.5" /> PITFALL WARNING
              </div>
              <p className="italic leading-snug">{step.successTip}</p>
            </div>

          </div>

          {/* Action validation checklist */}
          <div className="pt-4 border-t border-titanium-850 space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-titanium-400">Step Action Status:</span>
              <span className={`font-bold ${isActionComplete() ? "text-emerald-400 animate-pulse" : "text-fluid-gold"}`}>
                {isActionComplete() ? "SUCCESS - PROCEED" : "OPERATION PENDING"}
              </span>
            </div>

            {/* Navigation buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                disabled={currentStepIdx === 0}
                onClick={handlePrevStep}
                className="py-2.5 px-4 text-xs font-mono rounded-none bg-titanium-900 border border-titanium-850 hover:border-titanium-700 hover:text-white transition-all text-titanium-400 flex items-center justify-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> PREV STEP
              </button>
              
              <button
                disabled={!isActionComplete()}
                onClick={handleNextStep}
                className="py-2.5 px-4 text-xs font-mono rounded-none bg-anodized-blue text-white hover:bg-anodized-blue/80 transition-all font-bold flex items-center justify-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                NEXT STEP <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Dynamic Graphic Stage Simulator (Right column) */}
        <div className="lg:col-span-7 bg-carbon-card border border-titanium-800 rounded-none p-6 flex flex-col justify-between min-h-[440px] relative overflow-hidden">
          <div className="absolute top-1 right-2 font-mono text-[9px] text-titanium-500">LIVE WORK BENCH SIM ENGINE</div>

          {/* Main Visualizer Area */}
          <div className="relative flex-1 flex flex-col justify-center items-center py-6">
            
            {/* Brake hydraulic line representation in SVG */}
            <div className="w-full max-w-sm h-64 border border-dashed border-titanium-800/40 rounded-none p-3 bg-titanium-950/40 relative flex flex-col justify-between items-center">
              
              {/* Lever Port top block */}
              <div className="flex justify-between items-center w-full px-4 border-b border-titanium-800/50 pb-2">
                <span className="text-[10px] font-mono text-titanium-400">Master Lever Assembly</span>
                <span className="text-[9px] font-mono text-white px-1.5 py-0.5 bg-titanium-800">
                  {currentStepIdx >= 5 && leverFeelFirmness >= 100 ? "Pressure: 100%" : "Neutral State"}
                </span>
              </div>

              {/* Graphical rendering of fluid line bubbles */}
              <div className="relative w-4 h-32 bg-titanium-900 border-l border-r border-titanium-800 flex flex-col items-center justify-around overflow-hidden">
                {/* Hydraulic Oil Fluid inside fluid line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ${
                    currentStepIdx >= 2 ? "bg-fluid-red/80" : "bg-linear-to-b from-amber-700/60 to-red-950/90"
                  }`}
                  style={{ height: `${currentStepIdx >= 2 ? 100 : Math.max(10, bleedPushedCount)}%` }}
                />

                {/* Bubbles in fluid */}
                {currentStepIdx >= 2 && currentStepIdx < 5 && tappedBubbleCount < 8 && (
                  <>
                    <motion.div animate={{ y: [-10, -110], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }} className="w-2 h-2 rounded-none bg-white/70 absolute" />
                    <motion.div animate={{ y: [0, -100], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut", delay: 0.4 }} className="w-1.5 h-1.5 rounded-none bg-white/70 absolute" />
                    <motion.div animate={{ y: [10, -90], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeOut", delay: 0.8 }} className="w-2.5 h-2.5 rounded-none bg-white/50 absolute" />
                  </>
                )}
              </div>

              {/* Caliper Slave bottom block */}
              <div className="flex justify-between items-center w-full px-4 border-t border-titanium-800/50 pt-2">
                <span className="text-[10px] font-mono text-titanium-400">Slave Caliper Body</span>
                <span className="text-[9px] font-mono text-emerald-400">
                  {blockMounted ? "Pistons Blocked" : "Pistons Vulnerable - Install Block!"}
                </span>
              </div>

              {/* Overlay tools block during syringe connection */}
              <AnimatePresence>
                {portsConnected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-x-4 top-12 bottom-12 border border-anodized-blue/30 rounded-none bg-titanium-950/95 flex flex-col items-center justify-center p-3 text-center space-y-2"
                  >
                    <span className="text-xs font-mono text-anodized-blue font-bold uppercase tracking-wider">
                      SYRINGE SYSTEM MOUNTED
                    </span>
                    <span className="text-[10px] text-titanium-300 font-sans">
                      Tight seal verified. Lever bleed funnel holds fresh reservoir fluid. Caliper syringe pressurized.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

          {/* Interactive Mechanical Controls Area (Contextual depending on step) */}
          <div className="bg-titanium-950/80 p-5 rounded-none border border-titanium-800 flex flex-col justify-between space-y-4">
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-titanium-400">LAB CONTROL BOARD:</span>
              <span className="text-xs font-mono text-white font-semibold">
                EXECUTE ACTION
              </span>
            </div>

            {/* STEP 1 CONTROLS: Mount Bleed Block */}
            {step.interactiveAction === "mount" && (
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <p className="text-xs text-titanium-300 max-w-sm font-sans">
                  Slide the composite block between caliper pistons before initiating bleeding to prevent pistons blowing past limits.
                </p>
                <button
                  onClick={handleBlockToggle}
                  className={`w-full sm:w-auto py-2 px-5 rounded-none text-xs font-mono font-bold transition-all cursor-pointer ${
                    blockMounted
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                      : "bg-fluid-gold text-titanium-950 hover:bg-fluid-gold/80"
                  }`}
                >
                  {blockMounted ? "✓ BLEED BLOCK CONFIGURED" : "MOUNT COMPOSITE BLOCK"}
                </button>
              </div>
            )}

            {/* STEP 2 CONTROLS: Connect Ports */}
            {step.interactiveAction === "open-port" && (
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <p className="text-xs text-titanium-300 max-w-sm font-sans">
                  Open bleed vents and secure lever-funnel and caliper bleed tubes to the brake ports.
                </p>
                <button
                  onClick={handlePortsToggle}
                  className={`w-full sm:w-auto py-2 px-5 rounded-none text-xs font-mono font-bold transition-all cursor-pointer ${
                    portsConnected
                      ? "bg-emerald-500 text-white"
                      : "bg-anodized-blue text-white hover:bg-anodized-blue/80"
                  }`}
                >
                  {portsConnected ? "✓ PORTS THREADED & ACTIVATED" : "THREAD BLEED CUP & SYRINGE"}
                </button>
              </div>
            )}

            {/* STEP 3 CONTROLS: Push Plunger */}
            {step.interactiveAction === "push-syringe" && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-titanium-300 uppercase font-bold text-[10px]">Fluid Flush Purity Index:</span>
                  <span className="text-anodized-blue font-bold">{bleedPushedCount}%</span>
                </div>
                <div className="h-2 bg-titanium-900 rounded-none overflow-hidden border border-titanium-800">
                  <div className="h-full bg-anodized-blue transition-all" style={{ width: `${bleedPushedCount}%` }}></div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <p className="text-[11px] text-titanium-400 font-sans max-w-sm">
                    Slowly depress the caliper syringe plunger. Observe fluid displacement pushing trapped bubbles up into the lever cup.
                  </p>
                  <button
                    disabled={bleedPushedCount >= 100}
                    onClick={handlePushSyringe}
                    className="w-full sm:w-auto py-2 px-4 rounded-none text-xs font-mono font-bold bg-anodized-blue text-white hover:bg-anodized-blue/80 disabled:bg-emerald-500 disabled:text-white cursor-pointer"
                  >
                    {bleedPushedCount >= 100 ? "✓ FLUSH COMPLETED" : "DEPRESS PLUNGER PLUNGE"}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4 CONTROLS: Vacuum Degas & Tap */}
            {step.interactiveAction === "pull-syringe" && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-titanium-300 uppercase font-bold text-[10px]">Dislodged Residual Micro-Bubbles:</span>
                  <span className="text-fluid-gold font-bold">{tappedBubbleCount} / 8</span>
                </div>
                <div className="h-2 bg-titanium-900 rounded-none overflow-hidden border border-titanium-800">
                  <div className="h-full bg-fluid-gold transition-all" style={{ width: `${(tappedBubbleCount / 8) * 100}%` }}></div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <p className="text-[11px] text-titanium-400 font-sans max-w-sm">
                    Tap physical hose lines and pull a dynamic vacuum at the syringe to free micro-bubbles hiding in calipers.
                  </p>
                  <button
                    disabled={tappedBubbleCount >= 8}
                    onClick={handleTapLine}
                    className="w-full sm:w-auto py-2 px-4 rounded-none text-xs font-mono font-bold bg-fluid-gold text-titanium-950 hover:bg-fluid-gold/80 disabled:bg-emerald-500 disabled:text-white cursor-pointer"
                  >
                    {tappedBubbleCount >= 8 ? "✓ FLUID SECURELY DEGASED" : "⚡ TAP LINES & PULL VACUUM"}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5 CONTROLS: Close ports & torque */}
            {step.interactiveAction === "close-port" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-titanium-300 uppercase font-bold text-[10px]">Fastener Retaining Torque Level:</span>
                  <span className={`font-bold font-mono ${torqueSpecValue >= 4.5 && torqueSpecValue <= 5.5 ? "text-emerald-400" : "text-fluid-red"}`}>
                    {torqueSpecValue.toFixed(1)} Nm (Target: 5.0 Nm)
                  </span>
                </div>
                
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="0.5"
                  value={torqueSpecValue}
                  onChange={(e) => setTorqueSpecValue(parseFloat(e.target.value))}
                  className="w-full accent-emerald-400 bg-titanium-800 h-2 cursor-pointer rounded-none"
                />

                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <p className="text-[11px] text-titanium-400 font-sans max-w-sm">
                    Re-install the bleed ports. Tighten hex/torx nipple bolts with a calibrated torque wrench. Target range: 4.5 to 5.5 Nm.
                  </p>
                  <button
                    disabled={!(torqueSpecValue >= 4.5 && torqueSpecValue <= 5.5)}
                    onClick={() => setPortClosed(true)}
                    className="w-full sm:w-auto py-2 px-4 rounded-none text-xs font-mono font-bold bg-emerald-500 text-white disabled:bg-titanium-900 disabled:text-titanium-500 hover:bg-emerald-600 cursor-pointer font-black"
                  >
                    {portClosed ? "✓ LOCKED & TORQUED" : "CONFIRM SPEC SETTING"}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6 CONTROLS: Lever squeeze feel test */}
            {step.interactiveAction === "squeeze-lever" && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-titanium-300 uppercase font-bold text-[10px]">Braking Bite Point Firmness:</span>
                  <span className="text-emerald-400 font-bold">{leverFeelFirmness}%</span>
                </div>
                <div className="h-2 bg-titanium-900 rounded-none overflow-hidden border border-titanium-800">
                  <div className="h-full bg-emerald-400 transition-all" style={{ width: `${leverFeelFirmness}%` }}></div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <p className="text-[11px] text-titanium-400 font-sans max-w-sm">
                    Remount pads, reinstall wheel, and repeatedly actuate the lever to test leverage bites.
                  </p>
                  <button
                    disabled={leverFeelFirmness >= 100}
                    onClick={handleSqueezeLever}
                    className="w-full sm:w-auto py-2.5 px-4 rounded-none text-xs font-mono font-bold bg-emerald-500 text-white hover:bg-emerald-600 disabled:bg-emerald-500 cursor-pointer"
                  >
                    {leverFeelFirmness >= 100 ? "✓ Bite point verified: crisp and rock-solid!" : "SQUEEZE LEVER PUMP"}
                  </button>
                </div>
                
                {leverFeelFirmness >= 100 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-emerald-950/10 border border-emerald-900/30 text-[11px] text-emerald-400 font-sans rounded-none"
                  >
                    <strong>SYSTEM LEVEL NORMALIZED:</strong> Hydraulic pressure has stabilized. Bubble clusters fully cleared from master and slave ports. Braking effectiveness index registers inside optimal championship parameters.
                  </motion.div>
                )}
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
