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
    if (locale === 'ko') return '연애 유형';
    if (locale === 'ja') return '恋愛タイプ';
    if (locale === 'zh-TW') return '戀愛類型';
    return 'LOVE TYPE';
  }

  if (locale === 'ko') return '기본 유형';
  if (locale === 'ja') return '基本タイプ';
  if (locale === 'zh-TW') return '基本類型';
  return 'CORE TYPE';
}

function getSummaryLabel(series: SeriesKey, locale: Locale) {
  if (series !== 'love') return null;
  if (locale === 'ko') return '연애 리포트 한 줄 요약';
  if (locale === 'ja') return '恋愛レポートひとこと要約';
  if (locale === 'zh-TW') return '戀愛報告一句摘要';
  return 'Love report summary';
}

interface ResultCatalogCardProps {
  locale: Locale;
  series: SeriesKey;
  profile: ResultProfile;
  viewLabel: string;
}

export function ResultCatalogCard({ locale, series, profile, viewLabel }: ResultCatalogCardProps) {
  const keywords = profile.keywords?.slice(0, 3) ?? profile.strengths.slice(0, 3);
  const summaryLabel = getSummaryLabel(series, locale);
  const isLoveSeries = series === 'love';
  const articleClass = isLoveSeries
    ? 'border-[#ffd4ea]/14 bg-[linear-gradient(180deg,rgba(33,20,38,0.94),rgba(17,21,34,0.96))] shadow-[0_24px_72px_rgba(38,18,42,0.24)]'
    : 'shadow-soft';
  const keywordClass = isLoveSeries
    ? 'border border-[#ffd4ea]/14 bg-white/7 text-[#fbe4f0]'
    : 'bg-white/6 text-white/86';
  const buttonClass = isLoveSeries
    ? 'bg-[#ffe9f5] text-[#5e2d4f] group-hover:bg-[#ffd1e6] group-hover:text-[#4b2242]'
    : 'group-hover:bg-white group-hover:text-ink';

  return (
    <Link href={getResultHref(locale, profile.type, series) as Route} className="interactive-card group block h-full rounded-[1.8rem] sm:rounded-[2rem]">
      <article className={`glass-panel flex h-full flex-col rounded-[1.8rem] p-3.5 transition duration-300 group-hover:border-white/16 group-hover:shadow-float sm:rounded-[2rem] sm:p-5 ${articleClass}`}>
        <ResultImageCard image={profile.image} title={profile.title} subtitle={profile.subtitle} series={series} />

        <div className="mt-4 min-h-[5.6rem] sm:min-h-[5.9rem]">
          <span className="pill-muted">{getSeriesBadge(series, locale)}</span>
          <h2 className="mt-3 line-clamp-2 max-w-[14ch] text-[1.35rem] font-semibold leading-tight text-white sm:text-[1.55rem]">{profile.title}</h2>
          <p className="mt-1.5 line-clamp-1 text-sm leading-6 text-white/74">{profile.subtitle}</p>
        </div>

        <div className="mt-4 flex min-h-[2.4rem] flex-wrap gap-2">
          {keywords.map((strength) => (
            <span key={strength} className={`pill-accent text-[0.72rem] font-medium tracking-normal ${keywordClass}`}>
              {strength}
            </span>
          ))}
        </div>

        {summaryLabel ? <p className="mt-4 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white/46">{summaryLabel}</p> : null}
        <p className="mt-2 line-clamp-3 min-h-[4.2rem] text-sm leading-6 text-white/70 sm:mt-2.5">{profile.quickSummary}</p>

        <div className="mt-auto pt-5">
          <div className={`button-secondary w-fit ${buttonClass}`}>
            {viewLabel}
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </article>
    </Link>
  );
}
