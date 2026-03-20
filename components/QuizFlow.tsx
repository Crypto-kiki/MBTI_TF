'use client';

import type { Route } from 'next';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { calculateQuizTotals, getResultHref, resolveQuizResult, serializeTagCounts } from '@/lib/results';
import { Locale } from '@/lib/i18n/config';
import { SeriesKey } from '@/types/series';
import { Choice, Question, QuizAnswer, QuizMode } from '@/types/quiz';

import { QuizCard } from './QuizCard';

interface QuizFlowProps {
  locale: Locale;
  series: SeriesKey;
  mode: QuizMode;
  modeLabel: string;
  questions: Question[];
}

export function QuizFlow({ locale, series, mode, modeLabel, questions }: QuizFlowProps) {
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
      const resolvedResult = resolveQuizResult(locale, totals, series);
      const searchParams = new URLSearchParams({
        mode,
        totalFScore: String(totals.totalFScore),
        totalTScore: String(totals.totalTScore),
        answered: String(totals.answeredCount),
        tags: serializeTagCounts(totals.tagCounts),
      });
      router.push(`${getResultHref(locale, resolvedResult.profile.type, series)}?${searchParams.toString()}` as Route);
      return;
    }

    setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1));
  };

  return (
    <QuizCard
      locale={locale}
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
