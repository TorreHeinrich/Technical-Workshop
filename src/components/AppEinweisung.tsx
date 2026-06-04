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
    title: "Moin & Willkommen im Engineering-Workspace!",
    description: "Hier befinden Sie sich im Übersichts-Cockpit des High-End-Radrennsports von Torre Ehlers. Diese Plattform demonstriert zukunftsweisende hydraulische Fluidrechnung, Tribologie-Wissenschaft und thermodynamische Belastungsmuster für Championat-Setups.",
    hotspots: ["Überblick & Einführungstexte", "Ingenieursphilosophie"],
    tips: "Tipp: Scrollen Sie nach unten, um die detaillierten Einführungstabellen zu studieren.",
    badge: "01 / WORKSPACE CONFIG"
  },
  {
    tab: "areas",
    title: "Technisches Knowhow & Kernkompetenzen",
    description: "In diesem Modul finden Sie fundierte Lösungswege für reale Werkstattherausforderungen. Entdecken Sie Systemarchitekturen, Dichtungstechnik unter Extremkonditionen sowie die korrekte D-Gap-Bremszylinder-Ausrichtung.",
    hotspots: ["Core Technical Competencies", "Echte Werkstatt-Fallstricke (Pitfalls)", "Pro-Tips für Schrauber"],
    tips: "Tipp: Klicken Sie auf eine der Kompetenzkarten, um tiefergehende Problemlösungen aufzuklappen.",
    badge: "02 / CORE SKILLS"
  },
  {
    tab: "tribology",
    title: "Interactive Tribology Science & Reibungsphysik",
    description: "Ein hochgradig interaktives Tribologie-Labor. Passen Sie Belastung (Load), Gleitgeschwindigkeit und Betriebstemperatur live über Präzisionsregler an. Der Reibungskoeffizient und das Scherraten-Diagramm berechnen sich in Echtzeit nach physikalischen Strömungskonstanten.",
    hotspots: ["Live-Reibungskoeffizient-Anzeige (COF)", "Viskositätsdiagramm im Fluidfilm", "Thermo-Mechanische Regler"],
    tips: "Tipp: Ändern Sie die Viskosität des Öls von trocken zu nass und erhöhen Sie die Last, um Grenzreibungseffekte zu simulieren.",
    badge: "03 / TRIBOLOGY SIM"
  },
  {
    tab: "simulator",
    title: "Hydraulik-Entlüftungssimulator (Brake Bleed Lab)",
    description: "Ein voll-interaktiver Ausbildungssimulator für Scheibenbremsen-Entlüftungen. Führen Sie die 6 mechanischen Schritte exakt durch: Montieren Sie den Entlüftungsblock, füllen Sie die Bremsflüssigkeit, evakuieren Sie Luftbläschen und prüfen Sie den System-Sattelpunkt (Bite Point).",
    hotspots: ["6-Schritt Entlüftungspfad", "Echtzeit Druck- & Purity-Indikator", "Live-Druckpunkt-Deka-Squeeze"],
    tips: "Tipp: Tippen Sie im Vakuumschritt mehrmals auf die Leitung, um festsitzende Gasbläschen physikalisch zu lösen!",
    badge: "04 / HYDRAULIC DUCT"
  },
  {
    tab: "setup",
    title: "Präzisions-Drehmoment & Tuning-Fallstudien",
    description: "Carbonstrukturen sind hochempfindlich gegenüber Klemmkräften. In dieser Sektion analysieren Sie reale Tuning-Fälle und lernen, wie viel Newtonmeter (Nm) Anzugsmoment nötig ist, um maximalen Halt ohne Materialkollaps zu garantieren.",
    hotspots: ["Tuning-Einbau-Szenarien", "Symptomanalyse & exakte Reparaturlösungen", "Newtonmeter Drehmomentschlüssel-Kalibrierung"],
    tips: "Tipp: Jeder Fall zeigt das exakt geprüfte Drehmomentspektrum zum Schutz ultraleichter Composite-Wände.",
    badge: "05 / CALIBRATION RAT"
  },
  {
    tab: "quiz",
    title: "Technisches Audit & Offzielles Zertifikat",
    description: "Haben Sie alles verstanden? Absolvieren Sie die zertifizierte Werkstattprüfung mit hochkomplexen Fachfragen zur Hydraulik, Grenzflächenreibung und Nm-Toleranzen. Bestrumpfen Sie die Mindestpunktzahl für ein fälschungssicheres Workshop-Zertifikat!",
    hotspots: ["6-Fachfragen Multiple Choice", "Echtes System-Scoring", "Personalisiertes Zertifikationsdokument"],
    tips: "Tipp: Tragen Sie nach Bestehen Ihren Namen ein, um den fälschungssicheren 'Secure Seal' auf Ihr PDF/Dokument aufzuprägen.",
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
              SCHRITT {currentStepIdx + 1} VON {TOUR_STEPS.length}
            </span>
            <button 
              onClick={onClose}
              className="text-titanium-400 hover:text-white transition-colors cursor-pointer"
              title="Tour beenden"
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
                Fokus-Bereiche in diesem Tab:
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
            <ArrowLeft className="w-3.5 h-3.5" /> ZURÜCK
          </button>

          <span className="hidden sm:inline text-[9px] font-mono text-titanium-500">
            Klicken Sie neben die Karte, um zu schließen
          </span>

          <button
            onClick={handleNext}
            className="py-2 px-4 text-[10px] font-mono font-bold bg-fluid-gold text-titanium-950 hover:bg-fluid-gold/80 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {currentStepIdx === TOUR_STEPS.length - 1 ? (
              <>TOUR BEENDEN <CheckCircle2 className="w-3.5 h-3.5" /></>
            ) : (
              <>NÄCHSTER TAB <ArrowRight className="w-3.5 h-3.5" /></>
            )}
          </button>
        </div>

      </motion.div>
    </div>
  );
}
