import type { Locale } from '@/lib/i18n/config';

export type QuizMode = 'f' | 't';

export const resultTypes = [
  'f_empathy',
  'f_nuance',
  'f_warmth',
  'f_shelter',
  'f_harmony',
  't_calm',
  't_criteria',
  't_structure',
  't_signal',
  't_drive',
  'b_balance',
  'b_steady',
  'b_bridge',
  'b_attune',
  'b_anchor',
] as const;

export type ResultType = (typeof resultTypes)[number];

export const defaultResultType: ResultType = 'f_empathy';

export function isResultType(value: string): value is ResultType {
  return (resultTypes as readonly string[]).includes(value);
}

export interface ModeConfig {
  mode: QuizMode;
  title: string;
  subtitle: string;
  description: string;
  accentClass: string;
  route: string;
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

export interface ResultImage {
  src: string;
  width: number;
  height: number;
}

export interface ResultContent {
  title: string;
  subtitle: string;
  quickSummary?: string;
  description: string;
  strengths: string[];
  tips: string[];
  cta: string;
  compatibility?: {
    type: ResultType;
    reason: string;
  };
}

export interface ResultDefinition {
  type: ResultType;
  image: ResultImage;
  content: Record<Locale, ResultContent>;
}

export interface ResultProfile extends ResultContent {
  type: ResultType;
  image: ResultImage;
  quickSummary: string;
  compatibility: NonNullable<ResultContent['compatibility']> & {
    title: string;
    subtitle: string;
  };
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
