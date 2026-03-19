import Link from 'next/link';

import { QuizQuestion } from '@/types/quiz';

import { ProgressBar } from './ProgressBar';

interface QuizCardProps {
  modeLabel: string;
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
}

export function QuizCard({ modeLabel, question, questionNumber, totalQuestions }: QuizCardProps) {
  return (
    <section className="mx-auto w-full max-w-3xl rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-glow backdrop-blur sm:p-8">
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
          <p className="text-sm text-plum/60">Question {questionNumber}</p>
          <h2 className="text-2xl font-medium leading-9 text-ink">{question.prompt}</h2>
          <p className="leading-7 text-ink/65">{question.context}</p>
        </div>

        <div className="space-y-3">
          {question.choices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              className="w-full rounded-2xl border border-plum/10 bg-gradient-to-r from-white to-plum/5 px-5 py-4 text-left text-sm leading-7 text-ink transition hover:border-plum/25 hover:shadow-sm"
            >
              {choice.text}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-dashed border-plum/20 bg-plum/5 p-4 text-sm leading-6 text-plum/80">
          현재 단계에서는 선택지 클릭 시 점수 계산 없이 UI 뼈대만 제공합니다. 이후 JSON 기반 매핑 로직을 연결하면
          바로 확장할 수 있습니다.
        </div>
      </div>
    </section>
  );
}
