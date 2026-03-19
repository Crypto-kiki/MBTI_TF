import Link from 'next/link';

import { QuizMode, ResultSummary } from '@/types/quiz';

interface ResultCardProps {
  mode: QuizMode;
  modeLabel: string;
  fScore: number;
  tScore: number;
  answeredCount: number;
  summary: ResultSummary;
}

export function ResultCard({ mode, modeLabel, fScore, tScore, answeredCount, summary }: ResultCardProps) {
  const dominantLabel = fScore === tScore ? '균형형 흐름' : fScore > tScore ? 'F 감각 우세' : 'T 감각 우세';
  const otherRoute = mode === 'f' ? '/quiz/t' : '/quiz/f';

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-glow backdrop-blur sm:p-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-plum/55">{modeLabel} Result</p>
        <h1 className="text-3xl font-semibold text-ink">{summary.title}</h1>
        <p className="text-lg text-plum">{summary.mood}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl bg-gradient-to-br from-plum to-[#7a6677] p-5 text-white">
          <p className="text-sm uppercase tracking-[0.24em] text-white/70">F score</p>
          <p className="mt-3 text-4xl font-semibold">{fScore}</p>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-[#2d344a] to-[#5c6b87] p-5 text-white">
          <p className="text-sm uppercase tracking-[0.24em] text-white/70">T score</p>
          <p className="mt-3 text-4xl font-semibold">{tScore}</p>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-rose-100 to-white p-5 text-ink">
          <p className="text-sm uppercase tracking-[0.24em] text-plum/60">Answered</p>
          <p className="mt-3 text-4xl font-semibold">{answeredCount}</p>
          <p className="mt-2 text-sm text-ink/60">{dominantLabel}</p>
        </div>
      </div>

      <p className="leading-8 text-ink/70">{summary.description}</p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-ink px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-ink/90"
        >
          홈으로 돌아가기
        </Link>
        <Link
          href={otherRoute}
          className="rounded-full border border-plum/15 px-5 py-3 text-center text-sm font-medium text-plum transition hover:bg-plum/5"
        >
          다른 모드 체험하기
        </Link>
      </div>
    </section>
  );
}
