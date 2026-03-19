import Link from 'next/link';

import { Choice, Question, QuizMode } from '@/types/quiz';

import { ProgressBar } from './ProgressBar';

interface QuizCardProps {
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
  return (
    <section className="mx-auto w-full max-w-3xl rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-glow backdrop-blur sm:p-8">
      <div className="mb-8 flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-plum/55">{modeLabel}</p>
            <h1 className="mt-2 text-3xl font-semibold text-ink">해석 연습 시작</h1>
          </div>
          <Link
            href="/"
            className="rounded-full border border-plum/15 px-4 py-2 text-sm text-plum transition hover:bg-plum/5"
          >
            홈으로
          </Link>
        </div>
        <ProgressBar current={questionNumber} total={totalQuestions} />
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3 text-sm text-plum/60">
            <p>Question {questionNumber}</p>
            <p>{mode === 'f' ? '감정 해석 흐름' : '논리 판단 흐름'}</p>
          </div>
          <h2 className="text-2xl font-medium leading-9 text-ink">{question.prompt}</h2>
          <p className="leading-7 text-ink/65">{question.context}</p>
        </div>

        <div className="space-y-3">
          {question.choices.map((choice, index) => {
            const isSelected = selectedChoiceId === choice.id;

            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => onSelectChoice(choice)}
                className={`w-full rounded-2xl border px-5 py-4 text-left text-sm leading-7 transition ${
                  isSelected
                    ? 'border-plum/60 bg-gradient-to-r from-plum/10 to-rose-50 shadow-sm'
                    : 'border-plum/10 bg-gradient-to-r from-white to-plum/5 hover:border-plum/25 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      isSelected ? 'bg-plum text-white' : 'bg-plum/8 text-plum'
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div className="space-y-2">
                    <p className="text-base text-ink">{choice.text}</p>
                    <div className="flex flex-wrap gap-2">
                      {choice.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`rounded-full px-2.5 py-1 text-xs ${
                            isSelected ? 'bg-white/80 text-plum' : 'bg-plum/8 text-plum/70'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 border-t border-plum/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onPrevious}
            disabled={isFirstQuestion}
            className="rounded-full border border-plum/15 px-5 py-3 text-sm font-medium text-plum transition hover:bg-plum/5 disabled:cursor-not-allowed disabled:opacity-35"
          >
            이전 질문
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!selectedChoiceId}
            className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:bg-ink/35"
          >
            {isLastQuestion ? '결과 보기' : '다음 질문'}
          </button>
        </div>
      </div>
    </section>
  );
}
