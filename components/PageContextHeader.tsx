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
          home: '홈',
          overview: '시리즈 소개',
          quiz: '테스트',
          types: '전체 유형',
          result: '결과 리포트',
          navOverview: '시리즈 홈',
          navQuiz: '테스트 시작',
          navTypes: '전체 유형 보기',
          currentLabel: '현재 보고 있는 흐름',
        }
      : locale === 'ja'
        ? {
            home: 'ホーム',
            overview: 'シリーズ紹介',
            quiz: 'テスト',
            types: '全タイプ',
            result: '結果レポート',
            navOverview: 'シリーズトップ',
            navQuiz: 'テストを始める',
            navTypes: '全タイプを見る',
            currentLabel: '現在見ている流れ',
          }
        : locale === 'zh-TW'
          ? {
              home: '首頁',
              overview: '系列介紹',
              quiz: '測驗',
              types: '全部類型',
              result: '結果報告',
              navOverview: '系列首頁',
              navQuiz: '開始測驗',
              navTypes: '查看全部類型',
              currentLabel: '目前所在流程',
            }
          : {
              home: 'Home',
              overview: 'Series overview',
              quiz: 'Quiz',
              types: 'All types',
              result: 'Result report',
              navOverview: 'Series home',
              navQuiz: 'Start quiz',
              navTypes: 'Browse all types',
              currentLabel: 'Current path',
            };

  const sectionLabel =
    activeNav === 'overview' ? labels.overview : activeNav === 'quiz' ? labels.quiz : activeNav === 'types' ? labels.types : labels.result;

  return { ...labels, sectionLabel };
}

export function PageContextHeader({ locale, series, activeNav, contextTitle }: PageContextHeaderProps) {
  const copy = getCopy(locale, activeNav);
  const seriesDefinition = getSeriesDefinition(locale, series);
  const navItems = [
    { key: 'overview' as const, label: copy.navOverview, href: getSeriesHomeHref(locale, series) },
    { key: 'quiz' as const, label: copy.navQuiz, href: getSeriesQuizHubHref(locale, series) },
    { key: 'types' as const, label: copy.navTypes, href: getSeriesTypesHref(locale, series) },
  ];

  return (
    <div className="mb-6 rounded-[1.7rem] border border-white/70 bg-white/62 px-4 py-4 shadow-soft backdrop-blur sm:mb-7 sm:px-5 sm:py-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-[0.06em] text-plum/60 sm:text-sm">
            <Link href={`/${locale}` as Route} className="transition hover:text-plum">
              {copy.home}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href={getSeriesHomeHref(locale, series) as Route} className="transition hover:text-plum">
              {seriesDefinition.content.label}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-plum">{contextTitle ?? copy.sectionLabel}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-plum/8 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.18em] text-plum/74">
              {seriesDefinition.badge}
            </span>
            <span className="rounded-full bg-white/84 px-3 py-1 text-xs font-medium text-plum/72 shadow-sm">
              {copy.currentLabel}
            </span>
          </div>

          <div>
            <p className="text-sm text-ink/62 sm:text-[0.96rem]">{seriesDefinition.content.summaryLine}</p>
            {contextTitle ? <h2 className="mt-1 text-lg font-semibold text-ink sm:text-[1.35rem]">{contextTitle}</h2> : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => {
            const isActive = activeNav === item.key || (activeNav === 'result' && item.key === 'quiz');

            return (
              <Link
                key={item.key}
                href={item.href as Route}
                className={`inline-flex min-h-[2.9rem] items-center rounded-full px-4 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-gradient-to-r from-plum to-[#8d7488] text-white shadow-soft'
                    : 'border border-white/70 bg-white/82 text-plum/78 shadow-soft hover:bg-white hover:text-plum'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
