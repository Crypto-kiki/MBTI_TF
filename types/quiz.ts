export type Mode = 'f' | 't';

export interface ModeConfig {
  mode: Mode;
  title: string;
  subtitle: string;
  description: string;
  accentClass: string;
  route: `/quiz/${Mode}`;
}

export interface QuizChoice {
  id: string;
  text: string;
  score: number;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  context: string;
  choices: QuizChoice[];
}

export interface ResultSummary {
  title: string;
  description: string;
  mood: string;
}
