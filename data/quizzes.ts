import { fQuestions } from '@/data/f-questions';
import { tQuestions } from '@/data/t-questions';
import { Question, QuizMode } from '@/types/quiz';

export const quizQuestions: Record<QuizMode, Question[]> = {
  f: fQuestions,
  t: tQuestions,
};
