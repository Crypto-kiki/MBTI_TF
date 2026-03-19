import Link from 'next/link';
import { ArrowRight, BadgeCheck, Sparkles } from 'lucide-react';

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
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <div className="glass-panel overflow-hidden rounded-[2.25rem] bg-hero-glow p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-2xl">
            <div className="brand-chip mb-4 px-3 py-1.5 text-xs tracking-[0.22em]">
              <Sparkles className="h-3.5 w-3.5" />
              {modeLabel} Result
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-plum/10 px-3 py-1 text-sm text-plum">{axisLabel}</span>
              {result.dominantTags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/80 px-3 py-1 text-sm text-plum/78">
                  #{tag}
                </span>
              ))}
            </div>
            <h1 className="mt-5 text-balance text-3xl font-semibold text-ink sm:text-[2.6rem]">
              {result.profile.title}
            </h1>
            <p className="mt-3 text-lg text-plum">{result.profile.subtitle}</p>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-ink/70 sm:text-base">{result.profile.description}</p>
          </div>

          <div className="rounded-[1.75rem] border border-white/70 bg-white/72 p-4 shadow-soft backdrop-blur-sm sm:min-w-[16rem]">
            <div className="flex items-center gap-2 text-plum">
              <BadgeCheck className="h-4 w-4" />
              <p className="text-sm font-medium">결과 요약 카드</p>
            </div>
            <p className="mt-3 text-sm leading-7 text-ink/68">
              정적 점수와 태그 빈도를 바탕으로, 가장 닮은 해석 톤을 골라 보여드렸어요.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass-panel rounded-[1.75rem] bg-gradient-to-br from-plum to-[#7a6677] p-5 text-white shadow-soft">
          <p className="text-sm uppercase tracking-[0.24em] text-white/72">Total F</p>
          <p className="mt-3 text-4xl font-semibold">{result.totals.totalFScore}</p>
          <p className="mt-2 text-sm text-white/72">감정과 해석 쪽으로 기운 점수</p>
        </div>
        <div className="glass-panel rounded-[1.75rem] bg-gradient-to-br from-[#2d344a] to-[#5c6b87] p-5 text-white shadow-soft">
          <p className="text-sm uppercase tracking-[0.24em] text-white/72">Total T</p>
          <p className="mt-3 text-4xl font-semibold">{result.totals.totalTScore}</p>
          <p className="mt-2 text-sm text-white/72">판단과 구조 쪽으로 기운 점수</p>
        </div>
        <div className="glass-panel rounded-[1.75rem] bg-gradient-to-br from-rose-100 via-white to-white p-5 shadow-soft">
          <p className="text-sm uppercase tracking-[0.24em] text-plum/60">Answered</p>
          <p className="mt-3 text-4xl font-semibold text-ink">{result.totals.answeredCount}</p>
          <p className="mt-2 text-sm text-ink/60">정적 결과 매핑으로 완성된 프로필</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass-panel rounded-[1.9rem] bg-white/80 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-ink">당신의 강점</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-ink/70">
            {result.profile.strengths.map((strength) => (
              <li key={strength} className="flex gap-3 rounded-2xl bg-plum/5 px-4 py-3">
                <span className="mt-1 text-plum">✦</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-panel rounded-[1.9rem] bg-white/80 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-ink">작은 팁</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-ink/70">
            {result.profile.tips.map((tip) => (
              <li key={tip} className="flex gap-3 rounded-2xl bg-rose-50 px-4 py-3">
                <span className="mt-1 text-plum">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#1d1b22] via-plum to-[#8d7488] px-6 py-6 text-white shadow-float">
        <p className="text-sm uppercase tracking-[0.24em] text-white/70">CTA</p>
        <p className="mt-3 max-w-2xl text-lg leading-8">{result.profile.cta}</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-ink/92"
        >
          처음으로
        </Link>
        <Link
          href={otherRoute}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-plum/12 bg-white/82 px-5 py-3 text-sm font-medium text-plum transition duration-300 hover:-translate-y-0.5 hover:bg-white"
        >
          다른 모드 해보기
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
