import type { Route } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { getSeriesDefinition } from '@/data/series';
import { Locale } from '@/lib/i18n/config';
import { getSeriesHomeHref, getSeriesQuizHubHref, getSeriesTypesHref } from '@/lib/series';
import { SeriesKey } from '@/types/series';

interface PageContextHeaderProps {
  locale: Locale;
  series: SeriesKey;
  activeNav: 'overview' | 'quiz' | 'types' | 'result';
  contextTitle?: string;
}

function getCopy(locale: Locale, activeNav: PageContextHeaderProps['activeNav']) {
  const labels =
    locale === 'ko'
      ? { seriesHub: '시리즈 허브', overview: '시리즈 소개', quiz: '테스트 시작', types: '전체 유형 보기', result: '결과', localNav: '현재 시리즈 이동' }
      : locale === 'ja'
        ? { seriesHub: 'シリーズハブ', overview: 'シリーズ紹介', quiz: 'テスト開始', types: '全タイプを見る', result: '結果', localNav: 'このシリーズ内の移動' }
        : locale === 'zh-TW'
          ? { seriesHub: '系列中心', overview: '系列介紹', quiz: '開始測驗', types: '查看全部類型', result: '結果', localNav: '目前系列導覽' }
          : { seriesHub: 'Series hub', overview: 'Series overview', quiz: 'Start quiz', types: 'Browse all types', result: 'Result', localNav: 'Current series navigation' };

  const sectionLabel = activeNav === 'overview' ? labels.overview : activeNav === 'quiz' ? labels.quiz : activeNav === 'types' ? labels.types : labels.result;
  return { ...labels, sectionLabel };
}

export function PageContextHeader({ locale, series, activeNav, contextTitle }: PageContextHeaderProps) {
  const copy = getCopy(locale, activeNav);
  const seriesDefinition = getSeriesDefinition(locale, series);
  const showBreadcrumb = activeNav === 'types' || activeNav === 'result';

  return (
    <div className="mb-6 rounded-[1.8rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,13,24,0.88),rgba(19,21,37,0.9),rgba(32,28,49,0.88))] px-4 py-4 shadow-soft backdrop-blur-xl sm:mb-7 sm:px-5 sm:py-5">
      <div className="flex flex-col gap-4">
        {showBreadcrumb ? (
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-[0.06em] text-white/46 sm:text-sm">
            <Link href={`/${locale}` as Route} className="transition hover:text-white/80">
              {copy.seriesHub}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href={getSeriesHomeHref(locale, series) as Route} className="transition hover:text-white/80">
              {seriesDefinition.content.label}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/82">{contextTitle ?? copy.sectionLabel}</span>
          </div>
        ) : null}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="pill-accent">{seriesDefinition.badge}</span>
              <span className="pill-muted">{seriesDefinition.content.label}</span>
            </div>
            <h2 className="mt-3 text-lg font-semibold text-white sm:text-[1.35rem]">{contextTitle ?? seriesDefinition.content.title}</h2>
            <p className="mt-1 text-sm text-white/62 sm:text-[0.96rem]">{seriesDefinition.content.summaryLine}</p>
          </div>

          <nav className="flex flex-wrap items-center gap-2" aria-label={copy.localNav}>
            <Link href={getSeriesHomeHref(locale, series) as Route} className={activeNav === 'overview' ? 'button-primary min-h-[2.8rem] px-4 py-2 text-sm' : 'button-secondary min-h-[2.8rem] px-4 py-2 text-sm'}>
              {copy.overview}
            </Link>
            <Link href={getSeriesQuizHubHref(locale, series) as Route} className={activeNav === 'quiz' ? 'button-primary min-h-[2.8rem] px-4 py-2 text-sm' : 'button-secondary min-h-[2.8rem] px-4 py-2 text-sm'}>
              {copy.quiz}
            </Link>
            <Link href={getSeriesTypesHref(locale, series) as Route} className={activeNav === 'types' ? 'button-primary min-h-[2.8rem] px-4 py-2 text-sm' : 'button-secondary min-h-[2.8rem] px-4 py-2 text-sm'}>
              {copy.types}
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
