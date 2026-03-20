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
  if (locale === 'ko') return { hub: '시리즈 허브' };
  if (locale === 'ja') return { hub: 'シリーズハブ' };
  if (locale === 'zh-TW') return { hub: '系列中心' };
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
    <section className="glass-panel mx-auto w-full max-w-3xl overflow-hidden rounded-[2.4rem] p-5 sm:p-7">
      <div className="surface-panel-strong mb-6 p-5 text-white sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-xl">
            <div className="section-label mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              {isFMode ? messages.flowF : messages.flowT}
            </div>
            <p className="text-sm uppercase tracking-[0.24em] text-white/56">{modeLabel}</p>
            <h1 className="mt-2 text-3xl font-semibold text-white sm:text-[2rem]">{messages.title}</h1>
          </div>
          <Link href={`/${locale}`} className="button-tertiary shrink-0">
            {copy.hub}
          </Link>
        </div>

        <div className="mt-5">
          <ProgressBar current={questionNumber} total={totalQuestions} label={messages.progress} hint={messages.progressHint} />
        </div>
      </div>

      <div className="space-y-6">
        <div className="surface-panel p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3 text-sm text-white/54">
            <p>{messages.questionLabel} {questionNumber}</p>
            <p>{questionNumber} / {totalQuestions}</p>
          </div>
          <h2 className="mt-4 text-2xl font-medium leading-9 text-white sm:text-[1.75rem] sm:leading-[2.6rem]">{question.prompt}</h2>
          <p className="mt-3 text-sm leading-7 text-white/68 sm:text-base">{question.context}</p>
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
                    ? 'border-[#e7ccff]/28 bg-[linear-gradient(135deg,rgba(53,39,86,0.88),rgba(26,30,54,0.92),rgba(15,16,29,0.96))] shadow-float'
                    : 'border-white/8 bg-[linear-gradient(180deg,rgba(19,21,38,0.92),rgba(12,13,24,0.9))] hover:-translate-y-0.5 hover:border-white/16 hover:shadow-soft'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition ${isSelected ? 'bg-white text-ink' : 'bg-white/8 text-white/82 group-hover:bg-white/12'}`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-base leading-7 text-white sm:text-[1.02rem]">{choice.text}</p>
                      <CircleCheckBig className={`mt-0.5 h-5 w-5 shrink-0 transition ${isSelected ? 'text-[#f0d7ff] opacity-100' : 'text-white/25 opacity-0 group-hover:opacity-60'}`} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {choice.tags.map((tag) => (
                        <span key={tag} className={`rounded-full px-2.5 py-1 text-xs ${isSelected ? 'bg-white/14 text-white' : 'bg-white/6 text-white/66'}`}>
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

        <div className="flex flex-col gap-3 border-t border-white/8 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onPrevious}
            disabled={isFirstQuestion}
            className="button-tertiary disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft className="h-4 w-4" />
            {messages.previous}
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!selectedChoiceId}
            className="button-primary disabled:cursor-not-allowed disabled:opacity-35"
          >
            {isLastQuestion ? messages.result : messages.next}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
