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
      ? {
          seriesHub: '시리즈 허브',
          overview: '시리즈 소개',
          quiz: '테스트 시작',
          types: '전체 유형 보기',
          result: '결과',
          localNav: '현재 시리즈 이동',
        }
      : locale === 'ja'
        ? {
            seriesHub: 'シリーズハブ',
            overview: 'シリーズ紹介',
            quiz: 'テスト開始',
            types: '全タイプを見る',
            result: '結果',
            localNav: 'このシリーズ内の移動',
          }
        : locale === 'zh-TW'
          ? {
              seriesHub: '系列中心',
              overview: '系列介紹',
              quiz: '開始測驗',
              types: '查看全部類型',
              result: '結果',
              localNav: '目前系列導覽',
            }
          : {
              seriesHub: 'Series hub',
              overview: 'Series overview',
              quiz: 'Start quiz',
              types: 'Browse all types',
              result: 'Result',
              localNav: 'Current series navigation',
            };

  const sectionLabel =
    activeNav === 'overview' ? labels.overview : activeNav === 'quiz' ? labels.quiz : activeNav === 'types' ? labels.types : labels.result;

  return { ...labels, sectionLabel };
}

export function PageContextHeader({ locale, series, activeNav, contextTitle }: PageContextHeaderProps) {
  const copy = getCopy(locale, activeNav);
  const seriesDefinition = getSeriesDefinition(locale, series);
  const showBreadcrumb = activeNav === 'types' || activeNav === 'result';

  return (
    <div className="mb-6 rounded-[1.8rem] border border-white/8 bg-[linear-gradient(135deg,rgba(18,18,28,0.62),rgba(36,29,49,0.56),rgba(58,50,75,0.46))] px-4 py-4 shadow-soft backdrop-blur-xl sm:mb-7 sm:px-5 sm:py-5">
      <div className="flex flex-col gap-4">
        {showBreadcrumb ? (
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-[0.06em] text-white/56 sm:text-sm">
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
              <span className="rounded-full bg-white/12 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.18em] text-white/86">
                {seriesDefinition.badge}
              </span>
              <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-medium text-white/70 shadow-sm">
                {seriesDefinition.content.label}
              </span>
            </div>
            <h2 className="mt-3 text-lg font-semibold text-white sm:text-[1.35rem]">{contextTitle ?? seriesDefinition.content.title}</h2>
            <p className="mt-1 text-sm text-white/60 sm:text-[0.96rem]">{seriesDefinition.content.summaryLine}</p>
          </div>

          <nav className="flex flex-wrap items-center gap-2" aria-label={copy.localNav}>
            <Link
              href={getSeriesHomeHref(locale, series) as Route}
              className={`inline-flex min-h-[2.8rem] items-center rounded-full px-4 py-2 text-sm font-medium transition ${
                activeNav === 'overview'
                  ? 'bg-white text-ink shadow-soft'
                  : 'border border-white/12 bg-white/6 text-white/78 hover:bg-white/10 hover:text-white'
              }`}
            >
              {copy.overview}
            </Link>
            <Link
              href={getSeriesQuizHubHref(locale, series) as Route}
              className={`inline-flex min-h-[2.8rem] items-center rounded-full px-4 py-2 text-sm font-medium transition ${
                activeNav === 'quiz'
                  ? 'bg-white text-ink shadow-soft'
                  : 'border border-white/12 bg-white/6 text-white/78 hover:bg-white/10 hover:text-white'
              }`}
            >
              {copy.quiz}
            </Link>
            <Link
              href={getSeriesTypesHref(locale, series) as Route}
              className={`inline-flex min-h-[2.8rem] items-center rounded-full px-4 py-2 text-sm font-medium transition ${
                activeNav === 'types'
                  ? 'bg-white text-ink shadow-soft'
                  : 'border border-white/12 bg-white/6 text-white/78 hover:bg-white/10 hover:text-white'
              }`}
            >
              {copy.types}
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
