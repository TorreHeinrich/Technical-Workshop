/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CodeHighlight {
  title: string;
  description: string;
}

export interface WorkshopArea {
  id: string;
  title: string;
  icon: string;
  summary: string;
  details: string[];
  challenges: string[];
  proTips: string[];
}

export interface TribologyConcept {
  id: string;
  title: string;
  definition: string;
  importance: string;
  example: string;
  lubricationTypes?: {
    name: string;
    description: string;
    application: string;
  }[];
}

export interface BleedStep {
  number: number;
  title: string;
  description: string;
  detailedInstruction: string;
  requiredTool: string;
  interactiveAction: "mount" | "open-port" | "push-syringe" | "pull-syringe" | "close-port" | "squeeze-lever";
  successTip: string;
}

export interface SetupChallenge {
  id: string;
  component: string;
  scenario: string;
  symptoms: string[];
  diagnosticSteps: string[];
  solution: string;
  torqueSpec: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: "Hydraulics" | "Suspension" | "Tribology" | "Drivetrain";
}
