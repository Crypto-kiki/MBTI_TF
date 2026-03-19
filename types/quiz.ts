export type QuizMode = 'f' | 't';

export type ResultType =
  | 'f_empathy'
  | 'f_nuance'
  | 'f_warmth'
  | 't_calm'
  | 't_criteria'
  | 't_structure'
  | 'b_balance'
  | 'b_steady'
  | 'b_bridge';

export interface ModeConfig {
  mode: QuizMode;
  title: string;
  subtitle: string;
  description: string;
  accentClass: string;
  route: `/quiz/${QuizMode}`;
}

export interface Choice {
  id: string;
  text: string;
  fScore: number;
  tScore: number;
  tags: string[];
}

export interface Question {
  id: string;
  prompt: string;
  context: string;
  choices: Choice[];
}

export interface QuizAnswer {
  questionId: string;
  choiceId: string;
}

export interface ResultProfile {
  type: ResultType;
  title: string;
  subtitle: string;
  description: string;
  strengths: string[];
  tips: string[];
  cta: string;
}

export interface QuizTotals {
  totalFScore: number;
  totalTScore: number;
  answeredCount: number;
  tagCounts: Record<string, number>;
}

export interface ResolvedQuizResult {
  axis: 'f' | 't' | 'balanced';
  dominantTags: string[];
  profile: ResultProfile;
  totals: QuizTotals;
}
