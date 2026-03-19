'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { calculateQuizTotals } from '@/lib/results';
import { Choice, Question, QuizAnswer, QuizMode } from '@/types/quiz';

import { QuizCard } from './QuizCard';

interface QuizFlowProps {
  mode: QuizMode;
  modeLabel: string;
  questions: Question[];
}

export function QuizFlow({ mode, modeLabel, questions }: QuizFlowProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);

  const currentQuestion = questions[currentIndex];
  const selectedChoiceId = answers.find((answer) => answer.questionId === currentQuestion.id)?.choiceId;

  const totals = useMemo(() => calculateQuizTotals(questions, answers), [answers, questions]);

  const handleSelectChoice = (choice: Choice) => {
    setAnswers((prev) => {
      const next = prev.filter((answer) => answer.questionId !== currentQuestion.id);
      return [...next, { questionId: currentQuestion.id, choiceId: choice.id }];
    });
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (!selectedChoiceId) {
      return;
    }

    if (currentIndex === questions.length - 1) {
      const searchParams = new URLSearchParams({
        mode,
        fScore: String(totals.fScore),
        tScore: String(totals.tScore),
        answered: String(totals.answeredCount),
      });
      router.push(`/result?${searchParams.toString()}`);
      return;
    }

    setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1));
  };

  return (
    <QuizCard
      mode={mode}
      modeLabel={modeLabel}
      question={currentQuestion}
      questionNumber={currentIndex + 1}
      totalQuestions={questions.length}
      selectedChoiceId={selectedChoiceId}
      onSelectChoice={handleSelectChoice}
      onNext={handleNext}
      onPrevious={handlePrevious}
      isFirstQuestion={currentIndex === 0}
      isLastQuestion={currentIndex === questions.length - 1}
    />
  );
}
