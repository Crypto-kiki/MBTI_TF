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

function getQuizCopy(locale: Locale) {
  if (locale === 'ko') {
    return { hub: '시리즈 허브' };
  }

  if (locale === 'ja') {
    return { hub: 'シリーズハブ' };
  }

  if (locale === 'zh-TW') {
    return { hub: '系列中心' };
  }

  return { hub: 'Series hub' };
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
  const copy = getQuizCopy(locale);

  return (
    <section className="glass-panel mx-auto w-full max-w-3xl overflow-hidden rounded-[2.4rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(247,242,249,0.92))] p-5 sm:p-7">
      <div className="mb-6 rounded-[1.9rem] border border-white/55 bg-[linear-gradient(135deg,rgba(22,19,31,0.88),rgba(53,39,65,0.82),rgba(101,74,117,0.66))] p-5 text-white shadow-float sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-xl">
            <div className="brand-chip mb-4 border-white/12 bg-white/10 px-3 py-1.5 text-xs tracking-[0.22em] text-white">
              <Sparkles className="h-3.5 w-3.5" />
              {isFMode ? messages.flowF : messages.flowT}
            </div>
            <p className="text-sm uppercase tracking-[0.24em] text-white/62">{modeLabel}</p>
            <h1 className="mt-2 text-3xl font-semibold text-white sm:text-[2rem]">{messages.title}</h1>
            <p className="mt-3 text-sm leading-7 text-white/74 sm:text-base">{messages.intro}</p>
          </div>
          <Link href={`/${locale}`} className="soft-button shrink-0 border-white/12 bg-white/10 text-white/84 hover:bg-white/16">
            {copy.hub}
          </Link>
        </div>

        <div className="mt-5">
          <ProgressBar current={questionNumber} total={totalQuestions} label={messages.progress} hint={messages.progressHint} />
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[1.75rem] border border-plum/10 bg-white/78 p-5 shadow-soft sm:p-6">
          <div className="flex items-center justify-between gap-3 text-sm text-plum/60">
            <p>
              {messages.questionLabel} {questionNumber}
            </p>
            <p>{isFMode ? messages.focusF : messages.focusT}</p>
          </div>
          <h2 className="mt-4 text-2xl font-medium leading-9 text-ink sm:text-[1.75rem] sm:leading-[2.6rem]">{question.prompt}</h2>
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
                    ? 'border-plum/40 bg-[linear-gradient(135deg,rgba(91,65,88,0.12),rgba(248,234,241,0.9),rgba(255,255,255,0.96))] shadow-soft'
                    : 'border-plum/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(250,246,252,0.94))] hover:-translate-y-0.5 hover:border-plum/22 hover:shadow-soft'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition ${
                      isSelected ? 'bg-ink text-white' : 'bg-plum/8 text-plum group-hover:bg-plum/12'
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
                            isSelected ? 'bg-white/92 text-plum' : 'bg-plum/8 text-plum/70'
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

        <div className="rounded-[1.6rem] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(244,237,248,0.92))] p-4 text-sm leading-6 text-plum/72 shadow-soft">
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
