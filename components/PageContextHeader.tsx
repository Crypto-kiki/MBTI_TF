import type { Route } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { getSeriesDefinition } from '@/data/series';
import { Locale } from '@/lib/i18n/config';
import { getSeriesHomeHref } from '@/lib/series';
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
          home: '홈',
          overview: '시리즈 소개',
          quiz: '테스트 진행',
          types: '전체 유형 보기',
          result: '결과 리포트',
          currentLabel: '현재 보고 있는 흐름',
        }
      : locale === 'ja'
        ? {
            home: 'ホーム',
            overview: 'シリーズ紹介',
            quiz: 'テスト進行',
            types: '全タイプ一覧',
            result: '結果レポート',
            currentLabel: '現在見ている流れ',
          }
        : locale === 'zh-TW'
          ? {
              home: '首頁',
              overview: '系列介紹',
              quiz: '測驗流程',
              types: '全部類型',
              result: '結果報告',
              currentLabel: '目前所在流程',
            }
          : {
              home: 'Home',
              overview: 'Series overview',
              quiz: 'Quiz flow',
              types: 'All types',
              result: 'Result report',
              currentLabel: 'Current path',
            };

  const sectionLabel =
    activeNav === 'overview' ? labels.overview : activeNav === 'quiz' ? labels.quiz : activeNav === 'types' ? labels.types : labels.result;

  return { ...labels, sectionLabel };
}

export function PageContextHeader({ locale, series, activeNav, contextTitle }: PageContextHeaderProps) {
  const copy = getCopy(locale, activeNav);
  const seriesDefinition = getSeriesDefinition(locale, series);

  return (
    <div className="mb-6 rounded-[1.8rem] border border-white/8 bg-[linear-gradient(135deg,rgba(18,18,28,0.62),rgba(36,29,49,0.56),rgba(58,50,75,0.46))] px-4 py-4 shadow-soft backdrop-blur-xl sm:mb-7 sm:px-5 sm:py-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-[0.06em] text-white/56 sm:text-sm">
            <Link href={`/${locale}` as Route} className="transition hover:text-white/80">
              {copy.home}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href={getSeriesHomeHref(locale, series) as Route} className="transition hover:text-white/80">
              {seriesDefinition.content.label}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/82">{contextTitle ?? copy.sectionLabel}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-white/12 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.18em] text-white/86">
              {seriesDefinition.badge}
            </span>
            <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-medium text-white/70 shadow-sm">
              {copy.currentLabel}
            </span>
            <span className="rounded-full border border-[#f1d5e4]/20 bg-[#f1d5e4]/12 px-3 py-1 text-xs font-medium text-[#f7e5ef]">
              {copy.sectionLabel}
            </span>
          </div>

          <div>
            <p className="text-sm text-white/60 sm:text-[0.96rem]">{seriesDefinition.content.summaryLine}</p>
            {contextTitle ? <h2 className="mt-1 text-lg font-semibold text-white sm:text-[1.35rem]">{contextTitle}</h2> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
