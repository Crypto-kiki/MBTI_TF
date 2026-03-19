export type QuizMode = 'f' | 't';

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

export interface ResultSummary {
  title: string;
  description: string;
  mood: string;
}

export interface QuizTotals {
  fScore: number;
  tScore: number;
  answeredCount: number;
}
