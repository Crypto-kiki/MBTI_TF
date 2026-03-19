import Link from 'next/link';
import { ArrowRight, BadgeCheck, Sparkles } from 'lucide-react';

import { getTagLabel, uiMessages } from '@/data/i18n/messages';
import { Locale } from '@/lib/i18n/config';
import { QuizMode, ResolvedQuizResult } from '@/types/quiz';
import { ResultImageCard } from '@/components/ResultImageCard';
import { ResultShareCard } from '@/components/ResultShareCard';

interface ResultCardProps {
  locale: Locale;
  mode: QuizMode;
  modeLabel: string;
  result: ResolvedQuizResult;
}

export function ResultCard({ locale, mode, modeLabel, result }: ResultCardProps) {
  const otherRoute = mode === 'f' ? `/${locale}/quiz/t` : `/${locale}/quiz/f`;
  const messages = uiMessages[locale].result;
  const axisLabel =
    result.axis === 'balanced' ? messages.axis.balanced : result.axis === 'f' ? messages.axis.f : messages.axis.t;
  const hasAnsweredStats = result.totals.answeredCount > 0;

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="glass-panel overflow-hidden rounded-[2.4rem] bg-hero-glow p-6 sm:p-8 lg:p-10">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] xl:items-start">
          <div className="max-w-3xl">
            <div className="brand-chip mb-4 px-3 py-1.5 text-xs tracking-[0.22em]">
              <Sparkles className="h-3.5 w-3.5" />
              {modeLabel}
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-plum/10 px-3 py-1 text-sm text-plum">{axisLabel}</span>
              {result.dominantTags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/80 px-3 py-1 text-sm text-plum/78">
                  #{getTagLabel(locale, tag)}
                </span>
              ))}
            </div>
            <h1 className="mt-5 text-balance text-3xl font-semibold text-ink sm:text-[2.6rem]">{result.profile.title}</h1>
            <p className="mt-3 text-lg text-plum">{result.profile.subtitle}</p>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-ink/70 sm:text-base">{result.profile.description}</p>

            <div className="mt-6 rounded-[1.9rem] border border-white/70 bg-white/78 p-5 shadow-soft backdrop-blur-sm">
              <div className="flex items-center gap-2 text-plum">
                <BadgeCheck className="h-4 w-4" />
                <p className="text-sm font-medium">{messages.summaryCard}</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-ink/68">{messages.summaryHint}</p>
            </div>

            {hasAnsweredStats ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.7rem] bg-gradient-to-br from-plum to-[#7a6677] p-5 text-white shadow-soft">
                  <p className="text-sm uppercase tracking-[0.24em] text-white/72">{messages.totalF}</p>
                  <p className="mt-3 text-4xl font-semibold">{result.totals.totalFScore}</p>
                  <p className="mt-2 text-sm text-white/72">{messages.fHint}</p>
                </div>
                <div className="rounded-[1.7rem] bg-gradient-to-br from-[#2d344a] to-[#5c6b87] p-5 text-white shadow-soft">
                  <p className="text-sm uppercase tracking-[0.24em] text-white/72">{messages.totalT}</p>
                  <p className="mt-3 text-4xl font-semibold">{result.totals.totalTScore}</p>
                  <p className="mt-2 text-sm text-white/72">{messages.tHint}</p>
                </div>
                <div className="rounded-[1.7rem] bg-gradient-to-br from-rose-100 via-white to-white p-5 shadow-soft">
                  <p className="text-sm uppercase tracking-[0.24em] text-plum/60">{messages.answered}</p>
                  <p className="mt-3 text-4xl font-semibold text-ink">{result.totals.answeredCount}</p>
                  <p className="mt-2 text-sm text-ink/60">{messages.answeredHint}</p>
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-4 xl:pl-2">
            <ResultImageCard image={result.profile.image} title={result.profile.title} subtitle={result.profile.subtitle} />
            <ResultShareCard
              locale={locale}
              resultType={result.profile.type}
              title={result.profile.title}
              subtitle={result.profile.subtitle}
              messages={messages.share}
            />
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-[2.2rem] bg-white/82 p-6 shadow-soft sm:p-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-ink">{messages.strengths}</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-ink/70">
              {result.profile.strengths.map((strength) => (
                <li key={strength} className="flex gap-3 rounded-2xl bg-plum/5 px-4 py-3">
                  <span className="mt-1 text-plum">✦</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">{messages.tips}</h2>
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

        <div className="mt-6 overflow-hidden rounded-[1.9rem] bg-gradient-to-r from-[#1d1b22] via-plum to-[#8d7488] px-6 py-6 text-white shadow-float">
          <p className="text-sm uppercase tracking-[0.24em] text-white/70">{messages.cta}</p>
          <p className="mt-3 max-w-2xl text-lg leading-8">{result.profile.cta}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href={`/${locale}`} className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-ink/92">
          {messages.backHome}
        </Link>
        <Link href={otherRoute} className="inline-flex items-center justify-center gap-2 rounded-full border border-plum/12 bg-white/82 px-5 py-3 text-sm font-medium text-plum transition duration-300 hover:-translate-y-0.5 hover:bg-white">
          {messages.tryOther}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
