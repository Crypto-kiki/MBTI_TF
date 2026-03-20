import type { Route } from 'next';
import Link from 'next/link';
import { ArrowRight, Layers3, Sparkles } from 'lucide-react';

import { getSeriesDefinition, getSeriesList, getSeriesModeConfigs } from '@/data/series';
import { uiMessages } from '@/data/i18n/messages';
import { getSeriesTypesHref } from '@/lib/series';
import { Locale } from '@/lib/i18n/config';
import { SeriesKey } from '@/types/series';

import { ModeCard } from './ModeCard';

interface SeriesOverviewSectionProps {
  locale: Locale;
  series: SeriesKey;
}

function getCopy(locale: Locale) {
  if (locale === 'ko') {
    return {
      summary: '이 시리즈는 이렇게 읽어요',
      includes: '이 시리즈에서 받게 되는 리포트',
      more: '같은 서비스 안의 다른 시리즈',
      moreDescription: '시리즈는 늘어나도 같은 탐색 규칙을 유지해요. 지금 보고 있는 시리즈를 마친 뒤 다른 시리즈로 자연스럽게 이어질 수 있어요.',
      explore: '다른 시리즈 둘러보기',
    };
  }

  if (locale === 'ja') {
    return {
      summary: 'このシリーズの見方',
      includes: 'このシリーズで受け取るレポート',
      more: '同じサービス内の別シリーズ',
      moreDescription: 'シリーズが増えても同じ導線ルールを保てるようにしています。今のシリーズを終えたあと、別シリーズへ自然に続けられます。',
      explore: '別シリーズを見る',
    };
  }

  if (locale === 'zh-TW') {
    return {
      summary: '這個系列會怎麼讀你',
      includes: '你會拿到的報告內容',
      more: '同服務中的其他系列',
      moreDescription: '即使之後系列增加，也會維持相同探索規則，讓你完成目前系列後能自然延伸到其他系列。',
      explore: '瀏覽其他系列',
    };
  }

  return {
    summary: 'How this series reads you',
    includes: 'What this report covers',
    more: 'Other series in the same service',
    moreDescription: 'The product keeps the same navigation pattern as more series are added, so finishing one series naturally leads into another.',
    explore: 'Browse other series',
  };
}

export function SeriesOverviewSection({ locale, series }: SeriesOverviewSectionProps) {
  const seriesDefinition = getSeriesDefinition(locale, series);
  const modeConfigs = getSeriesModeConfigs(locale, series);
  const messages = uiMessages[locale];
  const otherSeries = getSeriesList(locale).filter((item) => item.key !== series);
  const copy = getCopy(locale);

  return (
    <section className="flex flex-1 flex-col gap-8 py-3 sm:gap-10 sm:py-8">
      <div className={`glass-panel relative overflow-hidden rounded-[2.25rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14 ${seriesDefinition.surfaceClass}`}>
        <div className="brand-chip mb-5">
          <Sparkles className="h-4 w-4" />
          {seriesDefinition.content.eyebrow}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/82 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.22em] text-plum/76 shadow-sm">
            {seriesDefinition.badge}
          </span>
          <span className="rounded-full bg-plum/8 px-3 py-1 text-xs font-medium text-plum/72">{seriesDefinition.content.label}</span>
        </div>
        <h1 className="mt-5 text-balance font-serif text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
          {seriesDefinition.content.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-plum sm:text-xl">{seriesDefinition.content.summaryLine}</p>
        <p className="mt-3 max-w-3xl text-base leading-8 text-ink/72 sm:text-lg">{seriesDefinition.content.description}</p>

        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          {[seriesDefinition.content.questionCount, seriesDefinition.content.estimatedTime, seriesDefinition.content.topicSummary].map((item) => (
            <span key={item} className="rounded-[1.25rem] border border-white/65 bg-white/72 px-4 py-3 text-sm text-plum/80 shadow-sm">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <div className="rounded-[1.6rem] border border-white/72 bg-white/78 p-4 shadow-soft sm:p-5">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-plum/54">{copy.summary}</p>
            <p className="mt-3 text-sm leading-7 text-ink/72 sm:text-base">{seriesDefinition.content.recommendedFor}</p>
          </div>
          <div className="rounded-[1.6rem] border border-white/72 bg-white/78 p-4 shadow-soft sm:p-5">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-plum/54">{copy.includes}</p>
            <p className="mt-3 text-sm leading-7 text-ink/72 sm:text-base">{seriesDefinition.content.reportIncludes}</p>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href={getSeriesTypesHref(locale, series) as Route}
            className="interactive-card inline-flex items-center justify-center rounded-full border border-plum/12 bg-white/84 px-5 py-3 text-sm font-medium text-plum hover:bg-white"
          >
            {messages.header.typesTab}
          </Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {modeConfigs.map((config) => (
          <ModeCard key={config.mode} config={config} locale={locale} />
        ))}
      </div>

      {otherSeries.length ? (
        <div className="rounded-[2rem] border border-white/72 bg-white/78 p-5 shadow-soft sm:p-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-plum/8 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-plum/74">
                <Layers3 className="h-3.5 w-3.5" />
                {copy.more}
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/72 sm:text-base">{copy.moreDescription}</p>
            </div>
            <Link
              href={`/${locale}` as Route}
              className="interactive-card inline-flex items-center gap-2 rounded-full border border-plum/12 bg-white px-4 py-2.5 text-sm font-medium text-plum hover:bg-plum hover:text-white"
            >
              {copy.explore}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {otherSeries.map((item) => (
              <div key={item.key} className="rounded-[1.5rem] border border-white/78 bg-[linear-gradient(180deg,rgba(248,245,251,0.95),rgba(255,255,255,0.95))] p-4 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-[0.68rem] font-semibold tracking-[0.18em] text-plum/74 shadow-sm">{item.badge}</span>
                  <span className="rounded-full bg-plum/8 px-3 py-1 text-xs font-medium text-plum/72">{item.content.label}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-ink">{item.content.summaryLine}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/70">{item.content.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
