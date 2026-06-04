/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WorkshopArea, TribologyConcept, BleedStep, SetupChallenge, QuizQuestion } from "./types";

export const CUSTOM_BIO = {
  name: "Master Workshop Architect",
  title: "High-End Sports Bike Specialist & Hydraulic Systems Engineer",
  philosophy: "In the realm of elite athletic machinery, precision isn't merely an asset—it's a critical safety requirement. Every fractions-of-a-millimeter tolerance, microscopic lubrication film, and lever pressure modulation directly influences rider confidence, peak performance, and absolute machine safety.",
  highlights: [
    { title: "Precision-First Tolerances", description: "Applying strict engineering limits, systematic torque sequences, and micro-metric calibration measurements." },
    { title: "Tribological Core", description: "Leveraging physics-guided friction mitigation to extend race life, reduce parasitic drag, and combat fatigue wear." },
    { title: "Systematic Troubleshooting", description: "Bypassing guesswork through symptom-defect pathing, diagnostic isolation, and objective physics-based root cause analysis." },
  ]
};

export const WORKSHOP_AREAS: WorkshopArea[] = [
  {
    id: "hydraulics",
    title: "Complex Hydraulic Disc Brakes",
    icon: "Droplet",
    summary: "Precision fluid dynamics, master-to-slave hydraulic multiplier ratios, thermal management, and air-bubble evacuation protocols.",
    details: [
      "Master-cylinder piston leverage ratio optimization and vacuum pressure testing.",
      "Dual-acting caliper piston balancing and quad-ring seal reconditioning.",
      "Fluid-specific compatibility management (Shimano/Magura Mineral Oil vs. SRAM DOT 5.1).",
      "Thermal boundary analysis: heat dissipation fins, rotor sizing, and vapor lock mitigation."
    ],
    challenges: [
      "Piston stiction causing pad drag, resulting in uneven pad wear and power loss.",
      "Air pockets trapped in the internal master cylinder chambers causing spongy lever action."
    ],
    proTips: [
      "To resolve piston stiction, extend the piston slightly, clean carefully with isopropyl alcohol, lubricate with appropriate hydraulic fluid, and reset. Never use petroleum-based lubricants on EPDM/SRAM seals.",
      "Always use a custom machined bleed block to keep calipers fully retracted during bleeding to prevent system overfilling."
    ]
  },
  {
    id: "fine-tuning",
    title: "High-End Components & Fine-Tuning",
    icon: "Sliders",
    summary: "Advanced mechanical calibration, electronic drivetrain micro-indexing, planetary gear hub mechanics, and telemetry-backed suspension profiling.",
    details: [
      "12-speed drivetrain alignment, chain-growth compensation, and b-gap height optimization.",
      "Electronic shifting calibration: Shimano Di2 E-Tube programming and SRAM AXS micro-stepping adjustment.",
      "Suspension telemetry data interpretation, compression hysteresis profiling, and dynamic air volume volume-spacer staging.",
      "Bearing pre-load dialing, radial-contact vs. angular-contact cartridge tuning, and press-fit bottom bracket tolerance sizing."
    ],
    challenges: [
      "Hanger alignment misalignment by as little as 0.5mm will cause poor indexing across 12-speed cassettes.",
      "Carbon-on-carbon friction slippage under safe torque levels."
    ],
    proTips: [
      "Always verify derailleur hanger alignment in 3 dimensions using a precision alignment gauge. Do not rely solely on digital micro-adjust increments to fix mechanical issues.",
      "Use high-quality carbon assembly paste with micro-pearl silica to increase friction coefficient, reducing necessary bolt torque by up to 35%."
    ]
  },
  {
    id: "diagnostics",
    title: "Systematic Fault Diagnosis",
    icon: "Activity",
    summary: "Root-cause diagnostics for structure-borne noises, micro-frictional structural creaks, frame tracking misalignment, and complex structural loading cracks.",
    details: [
      "Acoustic frequency isolation of carbon fiber frame creaks to localize bottom bracket, pivot, or saddle rail slip-fretting.",
      "Ultrasonic structural thickness analysis to verify carbon frame integrity after hard impacts.",
      "Linkage bearing play diagnosis via radial-axial dialing indicators and pivot torque balancing.",
      "Electronic system CAN-bus diagnostics and firmware error code tracing."
    ],
    challenges: [
      "Creaks that sound like bottom brackets but are actually caused by dust contamination in rear hub cassette interfaces or dry chainring bolts.",
      "Intermittent electronic communication dropouts in internal routing setups."
    ],
    proTips: [
      "Never isolate a creak conceptually. Isolate variables systematically: test first with a known reference wheelset, then check seatpost, then torque pivot interfaces before replacing BB bearings unnecessarily.",
      "Perform localized water loading: wet-lubricate one pivot point at a time to see when the creak ceases organically."
    ]
  }
];

export const TRIBOLOGY_CONCEPTS: TribologyConcept[] = [
  {
    id: "friction",
    title: "1. Friction & The Stribeck Curve",
    definition: "The resistive force resisting relative motion. In bike mechanics, we interface with sliding friction (pads on rotors), rolling friction (bearings), static friction (clamped interfaces), and stiction (suspension seals).",
    importance: "Understanding the Stribeck Curve allows a technician to predict whether a mechanism resides in boundary lubrication (direct asperities contact), mixed lubrication, or full hydrodynamic lubrication (surfaces separated entirely by oil film).",
    example: "Suspension dust wipes require a highly unique synthetic grease (like Slick Honey) to lower breakaway dynamic stiction, ensuring supple feedback on minor high-frequency bumps."
  },
  {
    id: "lubrication",
    title: "2. Lubrication Science (Wax vs. Wet vs. Dry)",
    definition: "The application of chemical compounds to minimize dry contact. Dry waxed lubes utilize solid paraffin platelets; wet lubes employ high-viscosity synthetic oils; dry aerosol lubes use volatile solvent carriers to leave a ceramic/PTFE barrier.",
    importance: "Selecting wrong lubricants drastically increases drivetrain wear. Paraffin waxes repel dust but require strict ultrasonic solvent cleaning. Wet lubes handle high water displacement but attract abrasive micro-silica, forming an abrasive grinding paste on the chain plates.",
    example: "Chain wax reduces drivetrain power losses from ~5W to ~1.8W by substituting fluid shear viscous drag with solid-plate sliding shear."
  },
  {
    id: "wear",
    title: "3. Wear Mechanisms (Adhesion, Abrasion, Fretting)",
    definition: "The irreversible, progressive material loss from contacting surfaces. Key mechanisms in sports bikes include abrasive wear (sand grinding sprocket tooth profiles), adhesive wear (galling of titanium bolts in un-greased threads), and fretting (micro-vibration erosion of tight press-fit bearing cups).",
    importance: "Identifying wear types prevents redundant replacements. For example, replacing a bottom bracket shell repeatedly without tackling the structural fretting mechanism will never permanently resolve carbon frame tolerance decay.",
    example: "Fretting wear on a carbon bottom bracket sleeve appears as a fine black composite slurry. It must be countered with high-density anaerobic sleeve-retaining compounds (like Loctite 609/641) to bridge microscopic surface voids."
  }
];

export const BLEED_STEPS: BleedStep[] = [
  {
    number: 1,
    title: "Preparation & Safety Setup",
    description: "Secure the bicycle, level the reservoir, remove the wheel/pads, and insert bleed blocks.",
    detailedInstruction: "Position the bicycle in a professional work stand. Rotate the handlebar or brake lever body until the master cylinder reservoir port is completely horizontal/parallel to the ground. Remove the rear wheel and brake pads. Insert a dedicated composite bleed block to hold caliper pistons fully flush. This protects brake pads from catastrophic oil contamination and prevents cylinder over-filling.",
    requiredTool: "Work Stand, Hex Wrenches, Custom Bleed Block, Safety Glasses & Gloves",
    interactiveAction: "mount",
    successTip: "Failing to remove brake pads will eventually result in contaminated compound squeal. Always keep organic brake pads on a clean workstation far away from hydraulic workstations."
  },
  {
    number: 2,
    title: "Connect Fluid Reservoirs",
    description: "Mount the master lever cup/syringe and the caliper fluid syringe.",
    detailedInstruction: "Remove the bleed screw on top of the lever reservoir using a Torx driver. Thread on the master/lever syringe or catch funnel, filling it with 1/4 mineral oil. Next, draw fresh mineral oil into your primary caliper syringe, exhaust any bubbles, and thread the hose onto the caliper bleed nipple.",
    requiredTool: "Lever Funnel, Caliper Syringe, Torx T10 Driver, High-Grade Mineral Oil",
    interactiveAction: "open-port",
    successTip: "Always check seals on syringes before mounting. A microscopic air leak in the hose interface will draw outside air into the lines, deceiving the technician during bleeding."
  },
  {
    number: 3,
    title: "Flush Caliper to Lever",
    description: "Push fresh oil from the caliper upward, driving trapped air and oxidized oil out.",
    detailedInstruction: "Using a wrench, loosen the caliper bleed nipple 1/2 turn to unlock fluid access. Slowly push the caliper syringe plunger inward, forcing fresh fluid up the brake line. Observe old, dark, bubble-laden fluid bubbling up into the lever syringe cup. Push until the fluid flowing out of the top reservoir is completely pink/yellow, translucent, and free of bubbles.",
    requiredTool: "Bleeding Plunger, 7mm Spanner / Wrench",
    interactiveAction: "push-syringe",
    successTip: "Push slowly. Forcing fluid too rapidly can emulsify micro-bubbles in the line, which takes hours to settle, resulting in a spongy bleed."
  },
  {
    number: 4,
    title: "Vacuum Degas & Line Tapping",
    description: "Pull a vacuum on caliper to extract micro-bubbles, and tap structural frame junctions.",
    detailedInstruction: "Close the caliber bleed nipple slightly. Gently pull back on the caliper syringe plunger to create a mild vacuum. This lower pressure pulls suspended gas bubbles out of internal caliper crevices. Simultaneously, tap the caliper body and the entire length of the hydraulic line with a dynamic plastic tool handle. This detaches static bubbles clinging to internal hose walls.",
    requiredTool: "Syringe Plunger, Plastic Tapping Tool",
    interactiveAction: "pull-syringe",
    successTip: "Watch the hose carefully. You will see a stream of tiny bubbles rise out from the caliper internal pathways during this vacuum step. This is the secret to a professional rock-solid lever feel."
  },
  {
    number: 5,
    title: "Close Port & Post-Wipe",
    description: "Seal bleed ports, clean components, check piston reset, and install wheel.",
    detailedInstruction: "Tighten the caliper bleed nipple to the recommended torque spec (approx 4-6 Nm). Remove the caliper hose and insert the rubber nipple cap. Seal the lever reservoir by reinstalling the Torx bleed screw. Thoroughly spray the entire caliper and lever with isopropyl alcohol to dissolve any invisible oil residues, then wipe clean with a lint-free shop towel.",
    requiredTool: "Isopropyl Alcohol, Torque Wrench, Shop Towels, Torx T10 Driver",
    interactiveAction: "close-port",
    successTip: "Do not skip the isopropyl wipe. Even a minute oil film left on the caliper can creep onto the brake rotor and ruin new pads on the first high-speed descent."
  },
  {
    number: 6,
    title: "Lever Response Test",
    description: "Re-install brake pads, mount wheel, and pump the brake lever to verify contact pressure.",
    detailedInstruction: "Remove the bleed block, install brake pads, configure the pad spring, and torque the retention pin. Remount the wheel, align the brake caliper body, and pump the lever 3-5 times. The lever should feel immediately crisp and offer a highly repeatable, reassuringly firm, bite-point wall.",
    requiredTool: "Hex Key, Lever Performance Tactile Tester",
    interactiveAction: "squeeze-lever",
    successTip: "If the lever continues to creep or feel soft and springy after 5 pumps, air remains trapped in the master cylinder. Mount the bleed funnel on the lever and perform a quick 'lever-only' bubble purge."
  }
];

export const SETUP_CHALLENGES: SetupChallenge[] = [
  {
    id: "squeal",
    component: "Hydraulic Disc Calipers & Rotors",
    scenario: "Unbearable acoustic shrieking noise and total brake modulation fade under steep descent loading.",
    symptoms: [
      "Extremely loud, high-pitch squealing when brake lever is pulled.",
      "Vast reduction in overall braking deceleration or 'bite-force'.",
      "Oil slick surface glaze visible on the brake rotor surface and discolored pad friction compounds."
    ],
    diagnosticSteps: [
      "Remove brake pads and inspect for oily sheen or blackened carbon crust (confirming thermal mineral-oil contamination).",
      "Spray caliper pistons with isopropyl alcohol and check for micro-seeping around the active piston quad-ring seals.",
      "Measure rotor thickness using a micrometer (minimum threshold is typically 1.5mm - replace if worn or heat-warped)."
    ],
    solution: "1. Rectify any micro-seeps by rebuilding/replacing internal piston seals. 2. Sand down the glazed brake pads to expose fresh friction compound. If oil penetrated deeply, discard and replace. 3. De-contaminate the stainless steel brake rotor by scouring with emery cloth, washing with pure 99% isopropyl alcohol, or baking carefully to burn off hydrocarbons. 4. Initiate professional break-in bed-in procedure (30 gradual stops from 20km/h) to re-deposit transfer film layers.",
    torqueSpec: "Rotor bolts (6-bolt): 4.0 - 6.0 Nm in a staggered star sequence. Caliper mounting bolts: 6.0 - 8.0 Nm."
  },
  {
    id: "indexing",
    component: "12-Speed Electronic Drivetrain",
    scenario: "Intermittent chain skipping and slow 'ghost shifting' under high load on the 3 largest cogs.",
    symptoms: [
      "Chain jumps gears when pedaling above 250W energy outputs.",
      "Slow shifting transitions towards larger sprocket rings, coupled with excessive pulley chain noise.",
      "Rear derailleur guide pulleys out of concentric parallel plane with cassette cogs."
    ],
    diagnosticSteps: [
      "Mount rear derailleur hanger alignment gauge and measure vertical/horizontal variances at four opposing positions of the rim.",
      "Check B-Gap clearance adjustment using the manufacturer's dedicated gauge (usually 14-16mm depending on cassette tooth sizing).",
      "Scan mobile telemetry application for active Shimano/SRAM battery levels and cycle internal micro-indexing."
    ],
    solution: "1. Re-align the malleable aluminum derailleur hanger using an alignment indicator until variance is strictly less than 1.5mm across the wheel plane. 2. Readjust the B-Gap screw to guide pulley clearances. 3. Enter electronic micro-indexing mode and nudge the stepper motor outward or inward (each micro-adjust click moves the cage exactly 0.2mm) till centered completely under the target sprocket gear.",
    torqueSpec: "Derailleur mounting bolt: 8.0 - 10.0 Nm. Cassette lockring: 40.0 Nm."
  },
  {
    id: "sag-tune",
    component: "Pneumatic Rear Suspension Shock",
    scenario: "Unstable, wallowy mid-stroke cornering and frequent metal-on-metal bottoming out on root trails.",
    symptoms: [
      "Dynamic sag registers at 38%, well past recommended 25% XC/Trail racing metrics.",
      "Rear end squats intensely under pedaling force, leading to constant pedal strikes on rocks.",
      "O-ring travel indicator fully blown off the shock shaft body."
    ],
    diagnosticSteps: [
      "Measure current static air chamber pressure with a shock pump.",
      "Calculate high-frequency spring rate linearity. Determine dynamic sag by supporting rider weight in full riding gear.",
      "Check damper rebound speed. Excessive slow rebound causes the suspension to pack-down on high-frequency chatter."
    ],
    solution: "1. Bleed the air shock pressure entirely and unscrew the outer air sleeve canister. 2. Install one or two additional elastomer volume spacers to reduce native chamber volume. This yields exponential progression at the end-stroke, preventing bottom-outs while keeping early stroke supple. 3. Reassemble, inflate, cycle the shock repeatedly to equalize positive and negative chambers, and target a 25-28% dynamic sag profile. 4. Speed up the rebound damping by 2 clicks to match the higher spring rate.",
    torqueSpec: "Shock mounting eyelet hardware: 10.0 - 12.0 Nm."
  }
];

export const TECHNICAL_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "If a brake system using mineral oil is accidentally flushed or contaminated with DOT 5.1 fluid, what mechanical failure occurs?",
    options: [
      "The DOT fluid evaporates instantly due to the low density casing.",
      "The EPDM caliper and lever seals swell and degrade rapidly, causing catastrophically blocked master cylinders and massive external leaks.",
      "The fluid boil point increases to critical racing specs, giving superior leverage.",
      "No change, as both fluids have identical chemical structures in hydrodynamic shear."
    ],
    correctAnswerIndex: 1,
    explanation: "Mineral oil systems use Nitrile/Neoprene/NBR rubber seals, which cannot handle glycol-ether compounds like DOT 5.1. The DOT fluid attacks NBR polymers, swelling and tearing the delicate seals, leading to brake system failure.",
    difficulty: "Advanced",
    category: "Hydraulics"
  },
  {
    id: 2,
    question: "Which wear mechanism matches the micro-vibrations occurring in tight, dry carbon-on-alloy bottom bracket press-fit shells?",
    options: [
      "Adhesive cavitation",
      "Hydraulic erosion",
      "Fretting wear",
      "Spalling drag"
    ],
    correctAnswerIndex: 2,
    explanation: "Fretting occurs when two contacting surfaces experience repetitive, microscopic vibrational slip. In dry press-fit cups, fretting rapidly pulverizes alloy oxides and carbon matrices, generating noise and destroying structural tolerances.",
    difficulty: "Advanced",
    category: "Tribology"
  },
  {
    id: 3,
    question: "How does adding a volumetric spacer (token) inside a mountain bike suspension air spring affect its performance curve?",
    options: [
      "It keeps the spring rate purely linear across the entire cycle, avoiding bottoming.",
      "It decreases the pressure at the top of the stroke, causing sudden sag sinkages.",
      "It reduces air chamber volume, creating a highly progressive spring curve that ramps up stiffness significantly at the end-stroke.",
      "It bypasses the high-speed compression damping valves entirely inside the oil chamber."
    ],
    correctAnswerIndex: 2,
    explanation: "Volume spacers compress the remaining air space. Because Boyle's Law specifies P1V1=P2V2, reducing the volume causes air pressure to rise at an exponential rate as the shock gets compressed further into its stroke, providing robust bottom-out protection.",
    difficulty: "Intermediate",
    category: "Suspension"
  },
  {
    id: 4,
    question: "What is the standard engineering threshold for chain elongation (stretch) before replacing an 11 or 12-speed chain to protect cassettes from advanced abrasive wear?",
    options: [
      "0.50% elongation",
      "1.00% elongation",
      "2.50% elongation",
      "chain wear doesn't affect sprocket life"
    ],
    correctAnswerIndex: 0,
    explanation: "On modern 11 and 12-speed chains, the tight geometric tolerances of cassettes demand replacement at or before 0.50% elongation. Stretching beyond 0.50% accelerates wear of cassette teeth via mismatch in sprocket-roll pitch alignment, ruining expensive shift plates.",
    difficulty: "Intermediate",
    category: "Drivetrain"
  },
  {
    id: 5,
    question: "In tribology, how is boundary lubrication distinct from hydrodynamic lubrication?",
    options: [
      "Boundary lubrication features complete fluid film separation, resulting in zero friction coefficients.",
      "In boundary lubrication, the moving surfaces directly contact on high asperities because the fluid film is too thin/absent.",
      "Hydrodynamic lubrication is only active when static lubricants are completely dry.",
      "Boundary lubrication only applies to aerospace components and cannot be measured on bicycle bearings."
    ],
    correctAnswerIndex: 1,
    explanation: "Boundary lubrication occurs under high loads or low velocities (e.g. pivoting linkage pivots, slow bearings), where the physical fluid film is squeezed out, causing direct metal-on-metal micro-contact of microscopic peaks (asperities).",
    difficulty: "Advanced",
    category: "Tribology"
  },
  {
    id: 6,
    question: "Why should you never use absolute lock-jaw pliers or high-torque impact wrenches on high-end bicycle carbon fiber components?",
    options: [
      "Carbon fiber is highly magnetic and will seize to chrome vanadium steel tools.",
      "Uncontrolled tool slippage can exceed the low hoop-strength and localized compression threshold of hollow carbon tubes, instantly crushing or cracking the matrix.",
      "Impact oscillations reverse the carbon chain polymers, reverting them to basic graphite fiber slurry.",
      "Modern carbon bike components are designed to self-torque and don't require any tools."
    ],
    correctAnswerIndex: 1,
    explanation: "Carbon tubes have high tensile strength longitudinally, but very low resistance to concentrated radial clamping forces ('hoop stress'). Over-torquing or using non-calibrated impact tools will easily fracture the epoxy-carbon matrix.",
    difficulty: "Beginner",
    category: "Drivetrain"
  },
  {
    id: 7,
    question: "What symptom suggests a mountain bike suspension damper is undergoing 'cavitation'?",
    options: [
      "The fork feels exceptionally stiff and refuses to move past 10mm of dynamic sag.",
      "A loud, foamy 'sloshing' or 'sucking' noise is heard during rapid cycling, along with erratic, inconsistent damping response.",
      "The air valve releases black oil-mist when tire pressures are dropped.",
      "The axle bearings refuse to slide through the lower fork sleeves."
    ],
    correctAnswerIndex: 1,
    explanation: "Cavitation happens when oil moves rapidly across damping ports under high speed, creating localized vacuum pockets. When these pockets collapse, they create physical shock waves and mix air into the oil (emulsification), which creates a sloshing sound and reduces active damping drag.",
    difficulty: "Advanced",
    category: "Suspension"
  },
  {
    id: 8,
    question: "What is the primary mechanical benefit of applying hot melt wax paraffin to a bicycle chain instead of conventional oil wet-lube?",
    options: [
      "Paraffin wax never gets cold, keeping chain metals warm during winter operations.",
      "It solidifies completely, preventing dirt and abrasive silicas from adhering, thereby keeping friction low and reducing drivetrain wear exponentially.",
      "Paraffin melts during high speed rides to wash itself clean dynamically.",
      "It dissolves rust, turning ferrous oxidations back into healthy iron steel plates."
    ],
    correctAnswerIndex: 1,
    explanation: "Paraffin wax sets to a dry, solid lubrication layer. Because it lacks a sticky/fluid texture, abrasive road sand and airborne silica cannot stick to the chain. This eliminates the 'grinding paste' effect, conserving mechanical efficiency and maximizing wear lifespan.",
    difficulty: "Intermediate",
    category: "Tribology"
  }
];
