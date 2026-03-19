import Link from 'next/link';

import { ResultSummary } from '@/types/quiz';

interface ResultCardProps {
  modeLabel: string;
  score: number;
  summary: ResultSummary;
}

export function ResultCard({ modeLabel, score, summary }: ResultCardProps) {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-glow backdrop-blur sm:p-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-plum/55">{modeLabel} Result</p>
        <h1 className="text-3xl font-semibold text-ink">{summary.title}</h1>
        <p className="text-lg text-plum">{summary.mood}</p>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-plum to-[#7a6677] p-6 text-white">
        <p className="text-sm uppercase tracking-[0.24em] text-white/70">placeholder score</p>
        <p className="mt-3 text-5xl font-semibold">{score}</p>
        <p className="mt-2 text-sm text-white/75">향후 query/state 기반으로 실제 점수를 연결할 수 있습니다.</p>
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
          href="/quiz/f"
          className="rounded-full border border-plum/15 px-5 py-3 text-center text-sm font-medium text-plum transition hover:bg-plum/5"
        >
          다른 흐름 둘러보기
        </Link>
      </div>
    </section>
  );
}
