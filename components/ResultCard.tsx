import Link from 'next/link';

import { QuizMode, ResolvedQuizResult } from '@/types/quiz';

interface ResultCardProps {
  mode: QuizMode;
  modeLabel: string;
  result: ResolvedQuizResult;
}

export function ResultCard({ mode, modeLabel, result }: ResultCardProps) {
  const otherRoute = mode === 'f' ? '/quiz/t' : '/quiz/f';
  const axisLabel =
    result.axis === 'balanced' ? '균형형' : result.axis === 'f' ? 'F 우세' : 'T 우세';

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-glow backdrop-blur sm:p-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-plum/55">{modeLabel} Result</p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-plum/10 px-3 py-1 text-sm text-plum">{axisLabel}</span>
          {result.dominantTags.map((tag) => (
            <span key={tag} className="rounded-full bg-rose-100 px-3 py-1 text-sm text-plum/80">
              #{tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">{result.profile.title}</h1>
        <p className="text-lg text-plum">{result.profile.subtitle}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl bg-gradient-to-br from-plum to-[#7a6677] p-5 text-white">
          <p className="text-sm uppercase tracking-[0.24em] text-white/70">Total F</p>
          <p className="mt-3 text-4xl font-semibold">{result.totals.totalFScore}</p>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-[#2d344a] to-[#5c6b87] p-5 text-white">
          <p className="text-sm uppercase tracking-[0.24em] text-white/70">Total T</p>
          <p className="mt-3 text-4xl font-semibold">{result.totals.totalTScore}</p>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-rose-100 to-white p-5 text-ink">
          <p className="text-sm uppercase tracking-[0.24em] text-plum/60">Answered</p>
          <p className="mt-3 text-4xl font-semibold">{result.totals.answeredCount}</p>
          <p className="mt-2 text-sm text-ink/60">정적 점수 + 태그 매핑 결과</p>
        </div>
      </div>

      <p className="leading-8 text-ink/70">{result.profile.description}</p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-plum/10 bg-plum/5 p-5">
          <h2 className="text-lg font-semibold text-ink">당신의 강점</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-ink/70">
            {result.profile.strengths.map((strength) => (
              <li key={strength} className="flex gap-3">
                <span className="mt-1 text-plum">✦</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-plum/10 bg-rose-50/80 p-5">
          <h2 className="text-lg font-semibold text-ink">작은 팁</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-ink/70">
            {result.profile.tips.map((tip) => (
              <li key={tip} className="flex gap-3">
                <span className="mt-1 text-plum">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-3xl bg-gradient-to-r from-[#1d1b22] via-plum to-[#7d6678] px-6 py-5 text-white">
        <p className="text-sm uppercase tracking-[0.24em] text-white/70">CTA</p>
        <p className="mt-3 text-lg leading-8">{result.profile.cta}</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-ink px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-ink/90"
        >
          처음으로
        </Link>
        <Link
          href={otherRoute}
          className="rounded-full border border-plum/15 px-5 py-3 text-center text-sm font-medium text-plum transition hover:bg-plum/5"
        >
          다른 모드 해보기
        </Link>
      </div>
    </section>
  );
}
