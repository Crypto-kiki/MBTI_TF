import type { Route } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Locale } from '@/lib/i18n/config';
import { getResultHref } from '@/lib/results';
import { SeriesKey } from '@/types/series';
import { ResultProfile } from '@/types/quiz';

import { ResultImageCard } from './ResultImageCard';

function getSeriesBadge(series: SeriesKey, locale: Locale) {
  if (series === 'love') {
    if (locale === 'ko') return 'LOVE TYPE';
    if (locale === 'en') return 'LOVE TYPE';
  }

  return 'TYPE';
}

interface ResultCatalogCardProps {
  locale: Locale;
  series: SeriesKey;
  profile: ResultProfile;
  viewLabel: string;
}

export function ResultCatalogCard({ locale, series, profile, viewLabel }: ResultCatalogCardProps) {
  const keywords = profile.keywords?.slice(0, 3) ?? profile.strengths.slice(0, 3);
  const summaryLabel = series === 'love' ? (locale === 'ko' ? '연애 리포트 한 줄 요약' : 'Love report summary') : null;

  return (
    <Link
      href={getResultHref(locale, profile.type, series) as Route}
      className="interactive-card group block h-full rounded-[1.8rem] sm:rounded-[2rem]"
    >
      <article className="glass-panel flex h-full flex-col rounded-[1.8rem] border border-white/70 bg-white/84 p-3.5 shadow-soft transition duration-300 group-hover:border-plum/18 group-hover:bg-white group-hover:shadow-float sm:rounded-[2rem] sm:p-5">
        <ResultImageCard image={profile.image} title={profile.title} subtitle={profile.subtitle} />

        <div className="mt-3.5 min-h-[5.4rem] sm:mt-4 sm:min-h-[5.8rem]">
          <span className="inline-flex rounded-full bg-plum/8 px-2.5 py-1 text-[0.66rem] font-semibold tracking-[0.18em] text-plum/72">
            {getSeriesBadge(series, locale)}
          </span>
          <h2 className="line-clamp-2 max-w-[14ch] text-[1.35rem] font-semibold leading-tight text-ink sm:text-[1.55rem]">
            {profile.title}
          </h2>
          <p className="mt-1.5 line-clamp-1 text-sm leading-6 text-plum/88">{profile.subtitle}</p>
        </div>

        <div className="mt-3.5 flex min-h-[2.4rem] flex-wrap gap-2 sm:mt-4">
          {keywords.map((strength) => (
            <span key={strength} className="rounded-full bg-plum/7 px-3 py-1 text-[0.72rem] font-medium text-plum/78">
              {strength}
            </span>
          ))}
        </div>

        {summaryLabel ? <p className="mt-3 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-plum/54">{summaryLabel}</p> : null}
        <p className="mt-2 line-clamp-3 min-h-[4.2rem] text-sm leading-6 text-ink/66 sm:mt-2.5">{profile.quickSummary}</p>

        <div className="mt-auto pt-4 sm:pt-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-plum/12 bg-white px-4 py-2 text-sm font-medium text-plum transition duration-300 group-hover:border-plum/24 group-hover:bg-plum group-hover:text-white">
            {viewLabel}
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </article>
    </Link>
  );
}
