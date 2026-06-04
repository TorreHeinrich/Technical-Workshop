/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { TECHNICAL_QUIZ } from "../data";
import { Award, Trophy, CheckCircle2, XCircle, ArrowRight, RotateCcw, ShieldCheck, Check, Sparkles, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function QuizSection() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [answersState, setAnswersState] = useState<{ [key: number]: boolean }>({}); // tracks questionId: isCorrect
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [certifiedName, setCertifiedName] = useState<string>("");

  const question = TECHNICAL_QUIZ[currentIdx];

  const handleOptionSelect = (optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedOption(optionIdx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isSubmitted) return;
    
    const correct = selectedOption === question.correctAnswerIndex;
    if (correct) {
      setScore(prev => prev + 1);
    }
    
    setAnswersState(prev => ({
      ...prev,
      [question.id]: correct
    }));
    
    setIsSubmitted(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    
    if (currentIdx < TECHNICAL_QUIZ.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setAnswersState({});
    setScore(0);
    setQuizFinished(false);
    setCertifiedName("");
  };

  const getRank = (finalScore: number) => {
    const pct = (finalScore / TECHNICAL_QUIZ.length) * 100;
    if (pct === 100) return "Master Mechanical Architect";
    if (pct >= 80) return "Elite Race Team Technologian";
    if (pct >= 60) return "Expert Workshop Assembly Lead";
    if (pct >= 40) return "Junior Systems Diagnostician";
    return "Hobbyist Tinkerer";
  };

  const getRankColor = (finalScore: number) => {
    const pct = (finalScore / TECHNICAL_QUIZ.length) * 100;
    if (pct === 100) return "text-anodized-blue border-anodized-blue bg-anodized-blue/10";
    if (pct >= 80) return "text-fluid-gold border-fluid-gold bg-fluid-gold/10";
    if (pct >= 60) return "text-emerald-400 border-emerald-400 bg-emerald-400/10";
    return "text-titanium-400 border-titanium-800 bg-titanium-900/30";
  };

  const handleCertify = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setCertifiedName(username.trim());
    }
  };

  return (
    <div className="space-y-6" id="quiz-module">
      
      {/* Header description */}
      <div className="space-y-1">
        <h2 className="text-2xl font-display font-black text-white">
          Interactive Tech Lab: Workshop Knowledge Audit
        </h2>
        <p className="text-sm text-titanium-400">
          Reinforce critical mechanical methodologies, fluid mechanics, and friction-management parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Quiz Body Core (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-titanium-900/10 border border-titanium-850 p-6 rounded-none min-h-[460px]">
          
          <AnimatePresence mode="wait">
            {!quizFinished ? (
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                {/* Score telemetry and category */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-titanium-950/50 border border-titanium-850 p-3 rounded-none text-xs font-mono">
                    <span className="text-titanium-400">
                      Module Category: <strong className="text-anodized-blue">{question.category}</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded-none border border-titanium-800 text-[10px]">
                      Difficulty: <strong className="text-fluid-gold">{question.difficulty}</strong>
                    </span>
                    <span className="text-white font-bold">
                      Q: {currentIdx + 1} / {TECHNICAL_QUIZ.length}
                    </span>
                  </div>

                  {/* Question Title */}
                  <h3 className="text-lg font-display font-bold text-white leading-snug">
                    {question.question}
                  </h3>

                  {/* Options List */}
                  <div className="space-y-3 pt-2">
                    {question.options.map((option, idx) => {
                      let optionStyle = "border-titanium-800 bg-titanium-950/20 text-titanium-300 hover:border-titanium-700";
                      
                      if (selectedOption === idx) {
                        optionStyle = "border-anodized-blue bg-anodized-blue/5 text-anodized-blue font-semibold";
                      }
                      
                      if (isSubmitted) {
                        if (idx === question.correctAnswerIndex) {
                          optionStyle = "border-emerald-500 bg-emerald-950/10 text-emerald-400 font-bold";
                        } else if (selectedOption === idx) {
                          optionStyle = "border-fluid-red bg-fluid-red/10 text-fluid-red line-through";
                        } else {
                          optionStyle = "border-titanium-900 bg-titanium-950/10 text-titanium-500 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isSubmitted}
                          onClick={() => handleOptionSelect(idx)}
                          className={`w-full text-left p-4 rounded-none border text-sm transition-all flex items-center justify-between gap-3 focus:outline-none cursor-pointer ${optionStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-none bg-titanium-900 font-mono text-xs font-bold flex items-center justify-center border border-titanium-800 shrink-0">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="font-sans leading-relaxed">{option}</span>
                          </div>
                          
                          {/* Checked highlights */}
                          {isSubmitted && idx === question.correctAnswerIndex && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          )}
                          {isSubmitted && selectedOption === idx && idx !== question.correctAnswerIndex && (
                            <XCircle className="w-5 h-5 text-fluid-red shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit / Feedback Drawer */}
                <div className="pt-6 border-t border-titanium-850 mt-6 space-y-4">
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-none border text-xs leading-relaxed font-sans ${
                        selectedOption === question.correctAnswerIndex
                          ? "border-emerald-900/30 bg-emerald-950/10 text-emerald-350"
                          : "border-fluid-red/30 bg-fluid-red/5 text-titanium-300"
                      }`}
                    >
                      <strong className="block font-mono text-[10px] uppercase mb-1 tracking-wider text-white">
                        {selectedOption === question.correctAnswerIndex
                          ? "✓ SYSTEM ACCREDITATION SECURED"
                          : "✗ DIAGNOSTIC CALIBRATION FAULT"}
                      </strong>
                      {question.explanation}
                    </motion.div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-titanium-500">
                      Current Score: {score} / {currentIdx + (isSubmitted ? 1 : 0)} Correct
                    </span>
                    
                    {!isSubmitted ? (
                      <button
                        onClick={handleSubmitAnswer}
                        disabled={selectedOption === null}
                        className="py-2.5 px-6 rounded-none font-mono text-xs font-bold bg-anodized-blue text-white hover:bg-anodized-blue/85 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
                      >
                        SUBMIT DECISION <Check className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="py-2.5 px-6 rounded-none font-mono text-xs font-bold bg-white text-titanium-950 hover:bg-titanium-100 flex items-center gap-1.5 cursor-pointer"
                      >
                        {currentIdx === TECHNICAL_QUIZ.length - 1 ? "FINISH AUDIT" : "NEXT QUESTION"} 
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              // Quiz Finished Screen
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center py-6 flex flex-col justify-between h-full"
              >
                <div className="space-y-4 flex-1 flex flex-col justify-center items-center">
                  <div className="w-16 h-16 rounded-none bg-fluid-gold/10 border-2 border-fluid-gold flex items-center justify-center p-3 text-fluid-gold mb-2">
                    <Trophy className="w-10 h-10 animate-bounce" />
                  </div>

                  <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">
                    Audit Concluded Safely
                  </h3>
                  <p className="text-sm text-titanium-400 max-w-lg font-sans leading-relaxed">
                    You have securely evaluated your high-end workshop technical credentials. Your physical telemetry reports:
                  </p>

                  <div className="flex justify-between items-center gap-8 bg-titanium-950/80 p-5 border border-titanium-800 rounded-none max-w-sm w-full divide-x divide-titanium-800 my-2">
                    <div className="text-center w-1/2">
                      <span className="block text-[10px] font-mono text-titanium-400 uppercase">FINAL SCORE</span>
                      <strong className="text-3xl font-mono text-anodized-blue">
                        {score} / {TECHNICAL_QUIZ.length}
                      </strong>
                    </div>
                    <div className="text-center w-1/2 pl-4">
                      <span className="block text-[10px] font-mono text-titanium-400 uppercase">SUCCESS INDEX</span>
                      <strong className="text-3xl font-mono text-emerald-400">
                        {Math.round((score / TECHNICAL_QUIZ.length) * 100)}%
                      </strong>
                    </div>
                  </div>

                  <div className={`p-3 rounded-none border text-xs font-mono ${getRankColor(score)}`}>
                    Rank Earned: <strong>{getRank(score)}</strong>
                  </div>
                </div>

                {/* Form to generate Custom Certificate */}
                {!certifiedName ? (
                  <form onSubmit={handleCertify} className="max-w-md mx-auto w-full p-4 rounded-none bg-titanium-950/40 border border-titanium-850 space-y-3">
                    <label className="text-xs font-mono text-titanium-300 block text-left uppercase text-[10px]">
                      Enter full name to generate physical certificate:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Master Mechanic Orree"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="flex-1 py-1.5 px-3 rounded-none border border-titanium-800 bg-titanium-950 text-white text-xs font-mono tracking-wide focus:outline-none focus:border-anodized-blue"
                      />
                      <button
                        type="submit"
                        disabled={!username.trim()}
                        className="py-1.5 px-4 rounded-none bg-anodized-blue text-white text-xs font-mono font-bold hover:bg-anodized-blue/85 disabled:opacity-40 cursor-pointer"
                      >
                        CERTIFY NOW
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex justify-center">
                    <button
                      onClick={() => setCertifiedName("")}
                      className="text-xs font-mono text-titanium-440 hover:text-white flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Re-enter Certification Name
                    </button>
                  </div>
                )}

                <div className="pt-6 border-t border-titanium-850">
                  <button
                    onClick={handleRestart}
                    className="py-2 px-6 rounded-none font-mono text-xs font-bold bg-titanium-900 border border-titanium-800 text-titanium-300 hover:border-titanium-700 flex items-center gap-1.5 mx-auto cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> RE-RUN COMPLIANCE TEST
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Dynamic Live Certificate Engine (4 cols) */}
        <div className="lg:col-span-4 bg-titanium-950/50 border border-titanium-850 p-5 rounded-none flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <h4 className="text-xs font-mono uppercase text-titanium-400 tracking-wider font-bold">
              Verification Workspace
            </h4>
            <p className="text-[11px] text-titanium-450 leading-relaxed font-sans">
              Complete the left-hand mechanical audit to unlock your official high-end sports bike mechanics credentials.
            </p>
          </div>

          {/* Certificate Design block */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden p-0.5 rounded-none border border-titanium-800/80 bg-linear-to-b from-titanium-950 to-carbon-card min-h-[300px]">
            {certifiedName ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full p-4 border border-fluid-gold/40 border-double rounded-none flex flex-col justify-between text-center relative bg-titanium-950"
              >
                {/* Visual accents */}
                <div className="absolute top-2 left-2 text-[9px] font-mono text-fluid-gold opacity-40">CERT #{(score*923+5).toString(16).toUpperCase()}</div>
                <div className="absolute top-2 right-2 text-[9px] font-mono text-fluid-gold opacity-40">CALIBRATED: 2026</div>

                <div className="space-y-2 pt-2">
                  <Award className="w-10 h-10 text-fluid-gold mx-auto animate-pulse" />
                  <span className="block text-[8px] font-mono text-fluid-gold tracking-widest uppercase">
                    certificate of competence
                  </span>
                  <div className="h-px w-20 bg-fluid-gold/30 mx-auto"></div>
                </div>

                <div className="space-y-1 my-4">
                  <span className="block text-[9px] text-titanium-450 font-sans italic animate-pulse">This verifies that</span>
                  <h5 className="text-sm font-display font-extrabold text-white tracking-tight uppercase line-clamp-1 border-b border-titanium-850 pb-1 mx-2">
                    {certifiedName}
                  </h5>
                  <span className="block text-[9px] text-titanium-450 font-sans italic leading-normal">has mastered the science of sports bike hydraulics, d-gap alignment limits, and friction mitigation, securing the rank of</span>
                  <span className="block text-[10px] font-mono font-bold text-fluid-gold uppercase tracking-wide">
                    {getRank(score)}
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-titanium-850/60">
                  <div className="flex justify-between items-center text-[8px] font-mono text-titanium-400 px-3">
                    <div className="text-left">
                      <span className="block text-[7px] text-titanium-500">AUTHENTICATED BY:</span>
                      <span className="text-white font-bold">WORKSHOP ENGINE v4</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[7px] text-titanium-500">DATE APPROVED:</span>
                      <span className="text-white font-bold">2026-06-04</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-1.5 text-[8px] font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-900/30 p-1 rounded-none">
                    <ShieldCheck className="w-3.5 h-3.5" /> SECURE INTEGRITY SEAL ENFORCED
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center p-6 space-y-3">
                <HelpCircle className="w-8 h-8 text-titanium-600 mx-auto animate-pulse" />
                <span className="block text-xs font-mono text-titanium-400 uppercase tracking-wider">
                  Credentials Halted
                </span>
                <p className="text-[10px] leading-relaxed text-titanium-450 max-w-xs font-sans">
                  Complete the 8 questions in the audit panel, submit, and enter your mechanic name to retrieve your custom, exportable certificate badge.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
