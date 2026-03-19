import Link from 'next/link';
import { ChevronLeft, ChevronRight, CircleCheckBig, Sparkles } from 'lucide-react';

import { getTagLabel, uiMessages } from '@/data/i18n/messages';
import { Locale } from '@/lib/i18n/config';
import { Choice, Question, QuizMode } from '@/types/quiz';

import { ProgressBar } from './ProgressBar';

interface QuizCardProps {
  locale: Locale;
  mode: QuizMode;
  modeLabel: string;
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedChoiceId?: string;
  onSelectChoice: (choice: Choice) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
}

export function QuizCard({
  locale,
  mode,
  modeLabel,
  question,
  questionNumber,
  totalQuestions,
  selectedChoiceId,
  onSelectChoice,
  onNext,
  onPrevious,
  isFirstQuestion,
  isLastQuestion,
}: QuizCardProps) {
  const isFMode = mode === 'f';
  const messages = uiMessages[locale].quiz;

  return (
    <section className="glass-panel mx-auto w-full max-w-3xl overflow-hidden rounded-[2.25rem] bg-white/80 p-5 sm:p-7">
      <div className="mb-6 rounded-[1.75rem] border border-white/70 bg-gradient-to-br from-white via-white to-plum/5 p-5 shadow-soft sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-xl">
            <div className="brand-chip mb-4 px-3 py-1.5 text-xs tracking-[0.22em]">
              <Sparkles className="h-3.5 w-3.5" />
              {isFMode ? messages.flowF : messages.flowT}
            </div>
            <p className="text-sm uppercase tracking-[0.24em] text-plum/55">{modeLabel}</p>
            <h1 className="mt-2 text-3xl font-semibold text-ink sm:text-[2rem]">{messages.title}</h1>
            <p className="mt-3 text-sm leading-7 text-ink/68 sm:text-base">{messages.intro}</p>
          </div>
          <Link href={`/${locale}`} className="soft-button shrink-0">
            {messages.home}
          </Link>
        </div>

        <div className="mt-5">
          <ProgressBar current={questionNumber} total={totalQuestions} label={messages.progress} hint={messages.progressHint} />
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[1.75rem] border border-plum/10 bg-white/70 p-5 shadow-soft sm:p-6">
          <div className="flex items-center justify-between gap-3 text-sm text-plum/60">
            <p>{messages.questionLabel} {questionNumber}</p>
            <p>{isFMode ? messages.focusF : messages.focusT}</p>
          </div>
          <h2 className="mt-4 text-2xl font-medium leading-9 text-ink sm:text-[1.75rem] sm:leading-[2.6rem]">
            {question.prompt}
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink/62 sm:text-base">{question.context}</p>
        </div>

        <div className="space-y-3">
          {question.choices.map((choice, index) => {
            const isSelected = selectedChoiceId === choice.id;

            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => onSelectChoice(choice)}
                className={`group w-full rounded-[1.6rem] border px-4 py-4 text-left transition duration-300 sm:px-5 sm:py-5 ${
                  isSelected
                    ? 'border-plum/50 bg-gradient-to-r from-plum/12 via-rose-50 to-white shadow-soft'
                    : 'border-plum/10 bg-white/76 hover:-translate-y-0.5 hover:border-plum/20 hover:bg-white hover:shadow-soft'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition ${
                      isSelected ? 'bg-plum text-white' : 'bg-plum/8 text-plum group-hover:bg-plum/12'
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-base leading-7 text-ink sm:text-[1.02rem]">{choice.text}</p>
                      <CircleCheckBig
                        className={`mt-0.5 h-5 w-5 shrink-0 transition ${
                          isSelected ? 'text-plum opacity-100' : 'text-plum/25 opacity-0 group-hover:opacity-60'
                        }`}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {choice.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`rounded-full px-2.5 py-1 text-xs ${
                            isSelected ? 'bg-white/85 text-plum' : 'bg-plum/8 text-plum/70'
                          }`}
                        >
                          #{getTagLabel(locale, tag)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-[1.6rem] border border-plum/10 bg-gradient-to-r from-white to-plum/5 p-4 text-sm leading-6 text-plum/72 shadow-soft">
          {messages.helper}
        </div>

        <div className="flex flex-col gap-3 border-t border-plum/10 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onPrevious}
            disabled={isFirstQuestion}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-plum/12 bg-white/80 px-5 py-3 text-sm font-medium text-plum transition hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft className="h-4 w-4" />
            {messages.previous}
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!selectedChoiceId}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-ink/92 disabled:cursor-not-allowed disabled:bg-ink/35"
          >
            {isLastQuestion ? messages.result : messages.next}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
