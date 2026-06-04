# High-End Sports Bike Engineering & Tribological Analysis Workspace
### Crafted by Torre Ehlers (Station ID: WS-092.V4)

Welcome to the **Technical Workshop: by Torre Ehlers**. This interactive web-based sandbox represents a next-generation engineering workspace focusing on fluid-film mechanics, boundary friction regimes, hydraulic disk-brake purging, and precision composite clamping limits. 

This educational platform compiles industrial tribological insights, high-level hydraulic multiplication math, and diagnostic systems aligned with professional cycling championship specifications.

---

## 🛠️ Main Structural Modules

### 1. **01 / Overview (Introduction)**
* **Objective:** Introduces the core workshop philosophies of Torre Ehlers, highlighting active specialties such as hydraulic dynamics, advanced material tribology, and mechanical engineering under high thermal stress.
* **Interactive Tool:** Introduces the **Hydraulic Multiplication Mechanics Calculator** where users can adapt custom master cylinder piston diameters (ranging from $8\text{mm}$ up to $13\text{mm}$) and caliper slave configurations (2-Piston or 4-Piston setups) to compute precise leverage output telemetry ($P_1 = P_2$) instantly.

### 2. **02 / Core Skills (Key Areas)**
* **Objective:** Investigates critical diagnostic systems and real-world workshop pitfalls.
* **Breakdown:** Explores three vital workshop zones:
  * **Dynamic Seal Calibration:** Sealing profiles under extreme pressures and temperatures.
  * **Championship D-Gap Alignment:** Calibrating pad-retraction spacing for race-ready tolerances.
  * **Aero Dual-Hydraulics:** Examining compound lever-hose systems.
* **Pro Tips & Remediation:** Fully documents specific action plans for typical field failures (e.g., piston sticking, air pockets, and micro-particle contamination).

### 3. **03 / Tribology Sim (Friction Labor)**
* **Objective:** Immersive, real-time micro-structural simulator capturing the physics of boundary friction.
* **Interactive Controls:**
  * **Lubrication Regime Selectors:** Toggle between Dry Contact (High coefficient of friction), Wet Mineral Formula, or Premium Wax Compounds.
  * **Sliding Velocity & Normal Force Sliders:** Manipulate mechanical stresses dynamically.
* **Live Telemetry Output:** Computes the localized **Friction Coefficient ($\mu$)**, **Thermal Output (J/s)**, and **Wear Rate Volume ($\text{mm}^3/\text{h}$)** based on physical friction laws. Includes a moving asperities visualization illustrating boundary fluid film shear.

### 4. **04 / Hydraulic Duct (Bleed Simulator)**
* **Objective:** Sandbox training tool that guides technicians through the precise 6-step cycle of purging hydraulic air from modern disc-brakes:
  1. *Mount Bleed Block* (to prevent piston damage)
  2. *Connect Bleed Ports* (securing dual syringe systems)
  3. *Flush Hydraulic Fluid* (purging contaminated oil)
  4. *Degas System via Vacuum* (tapping lines to dislodge stubborn micro-bubbles)
  5. *Clamp & Torque Retaining Fasteners* (tightening to exact $5.0\,\text{Nm}$ specifications)
  6. *Squeeze & Verify Bite Point* (final quality test)
* **Visualizer Engine:** Reflects fluid color purity, air bubbles escaping in real time, and leverages interactive physical mechanics.

### 5. **05 / Calibration (Component Setup)**
* **Objective:** Case studies detailing how to align components on high-end carbon composite structures.
* **Key Concept:** Carbon weaves are highly vulnerable to fatigue under shear locks. This section outlines precise clamping guidelines and diagnostic scenarios to protect ultra-thin composite structures.

### 6. **06 / Audit Secure (Knowledge Quiz)**
* **Objective:** A comprehensive, 6-question scientific validation test testing technicians on hydraulic mechanical ratios, boundary friction regimes, and composite tightening limits.
* **Secure Certification Seal:** Scoring high marks unlocks a live-rendered **Verification Certificate** signed under custom cryptographic seal codes, complete with customizable user names.

---

## 🧭 Interactive Guided Tour System (`AppEinweisung`)

To ensure a seamless onboarding experience, we have integrated a comprehensive **Workspace Guide** that walks users through all 6 modules.
* **Accessibility:** Accessible anytime by clicking the golden **"Guide"** button next to the Station ID (`WS-092.V4`) in the navigation bar.
* **Context-Driven Flow:** The walkthrough automatically activates on first-time visits via local browser state persistence, shifting views synchronously as you explore the educational tabs.

---

## ⚙️ Development & Architecture

Built with a highly structured, type-safe, and modular **React + TypeScript + Vite** stack:
* **UI Components:** Styled using **Tailwind CSS** guidelines enforcing sleek geometric layouts, pristine typography combinations (Inter and space-age monospaces), and a high-contrast dark-mode industrial theme.
* **Aesthetic Palette:**
  * Base: Slate Carbon Background (`#111111`) / Card Grid (`#1a1a1a`)
  * Shimano Mineral Fluid Red (`#ef4444`)
  * Dynamic Geometric Gold (`#f97316`)
  * Fox Suspension / Park Tool Blue (`#3b82f6`)
* **Motion & Physics:** Smooth state transitions, interactive sliding micro-animations, and fluid physics powered by `motion/react`.
* **Icons:** Powered entirely by raw SVG and `lucide-react`.

### Run Development Server
```bash
npm install
npm run dev
```

### Compile Production Build
```bash
npm run build
```
*(The system outputs bundled static assets safely in `dist/` ready for lightning-fast edge delivery).*

---
*Technical Workshop Platform & Physics Simulation Core © 2026. Designed with Precision Mechanical Theory by Torre Ehlers.*
