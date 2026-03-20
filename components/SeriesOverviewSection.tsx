import type { Route } from 'next';
import Link from 'next/link';
import { ArrowRight, Layers3, Sparkles } from 'lucide-react';

import { getSeriesDefinition, getSeriesList, getSeriesModeConfigs } from '@/data/series';
import { uiMessages } from '@/data/i18n/messages';
import { Locale } from '@/lib/i18n/config';
import { getSeriesQuizHubHref, getSeriesTypesHref } from '@/lib/series';
import { SeriesKey } from '@/types/series';

import { ModeCard } from './ModeCard';

interface SeriesOverviewSectionProps {
  locale: Locale;
  series: SeriesKey;
}

function getCopy(locale: Locale) {
  if (locale === 'ko') {
    return {
      startTitle: '지금 할 일',
      startDescription: '설명을 읽었으면 바로 시작하거나, 전체 유형을 먼저 비교해보세요.',
      startQuiz: '테스트 시작',
      viewTypes: '전체 유형 보기',
      exploreOther: '다른 시리즈 보기',
      whatItReads: '무엇을 측정하는지',
      reportIncludes: '결과에서 받는 것',
      modeSection: '시작할 테스트',
      modeDescription: '원하는 흐름을 고르면 바로 이어집니다.',
      otherSeries: '다른 시리즈 추천',
      otherSeriesDescription: '비교만 하고 넘어가고 싶다면 여기서 바로 이동하세요.',
      moveToSeries: '이 시리즈 열기',
    };
  }

  if (locale === 'ja') {
    return {
      startTitle: '今すること',
      startDescription: '説明を読んだら、そのまま始めるか全タイプを先に見て決められます。',
      startQuiz: 'テストを始める',
      viewTypes: '全タイプを見る',
      exploreOther: '別シリーズを見る',
      whatItReads: '何を測るか',
      reportIncludes: '結果で受け取るもの',
      modeSection: '始めるテスト',
      modeDescription: '一つ選ぶと、そのまま進めます。',
      otherSeries: '別シリーズのおすすめ',
      otherSeriesDescription: '比較だけして次へ進みたいときはここから移動できます。',
      moveToSeries: 'このシリーズを開く',
    };
  }

  if (locale === 'zh-TW') {
    return {
      startTitle: '現在就能做的事',
      startDescription: '看完介紹後，可以直接開始，也可以先看全部類型再決定。',
      startQuiz: '開始測驗',
      viewTypes: '查看全部類型',
      exploreOther: '查看其他系列',
      whatItReads: '測量重點',
      reportIncludes: '你會拿到什麼',
      modeSection: '要開始的測驗',
      modeDescription: '選好後就能直接進入。',
      otherSeries: '其他系列推薦',
      otherSeriesDescription: '如果只想快速比較，也可以直接跳到別的系列。',
      moveToSeries: '打開這個系列',
    };
  }

  return {
    startTitle: 'What to do now',
    startDescription: 'Start right away or compare all types first.',
    startQuiz: 'Start the quiz',
    viewTypes: 'Browse all types',
    exploreOther: 'Browse other series',
    whatItReads: 'What it measures',
    reportIncludes: 'What you get',
    modeSection: 'Pick a quiz',
    modeDescription: 'Choose a flow and continue.',
    otherSeries: 'Other recommended series',
    otherSeriesDescription: 'If you only want to compare first, move straight into another series here.',
    moveToSeries: 'Open this series',
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
          <span className="pill-accent">{seriesDefinition.badge}</span>
          <span className="pill-muted">{seriesDefinition.content.label}</span>
        </div>

        <div className="mt-5 grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-start">
          <div>
            <h1 className="text-balance font-serif text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              {seriesDefinition.content.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/86 sm:text-xl">{seriesDefinition.content.summaryLine}</p>
            <p className="mt-3 max-w-3xl text-base leading-7 text-white/68 sm:text-lg">{seriesDefinition.content.description}</p>

            <div className="mt-6 grid gap-3 lg:grid-cols-3">
              {[seriesDefinition.content.questionCount, seriesDefinition.content.estimatedTime, seriesDefinition.content.topicSummary].map((item) => (
                <span key={item} className="metric-tile text-sm text-white/82">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="surface-panel-strong p-5 text-white sm:p-6">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-white/52">{copy.startTitle}</p>
            <p className="mt-3 text-sm leading-7 text-white/76 sm:text-base">{copy.startDescription}</p>
            <div className="mt-5 flex flex-col gap-3">
              <Link href={getSeriesQuizHubHref(locale, series) as Route} className="button-primary w-full justify-center">
                {copy.startQuiz}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={getSeriesTypesHref(locale, series) as Route} className="button-secondary w-full justify-center">
                {copy.viewTypes}
              </Link>
              <Link href={`/${locale}` as Route} className="button-tertiary w-full justify-center">
                {copy.exploreOther}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="surface-panel p-5 sm:p-6">
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-white/46">{copy.whatItReads}</p>
          <p className="mt-3 text-base font-semibold text-white">{seriesDefinition.content.topicSummary}</p>
          <p className="mt-3 text-sm leading-7 text-white/72 sm:text-base">{seriesDefinition.content.recommendedFor}</p>
        </div>
        <div className="surface-panel p-5 sm:p-6">
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-white/46">{copy.reportIncludes}</p>
          <p className="mt-3 text-base font-semibold text-white">{seriesDefinition.content.accentLabel}</p>
          <p className="mt-3 text-sm leading-7 text-white/72 sm:text-base">{seriesDefinition.content.reportIncludes}</p>
        </div>
      </div>

      <div className="glass-panel rounded-[2rem] p-5 shadow-soft sm:p-6">
        <p className="text-[0.68rem] uppercase tracking-[0.18em] text-white/46">{copy.modeSection}</p>
        <div className="mt-3 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="text-2xl font-semibold text-white sm:text-[1.8rem]">{messages.modes.modeSelect}</h2>
          <p className="max-w-2xl text-sm leading-7 text-white/70 sm:text-base">{copy.modeDescription}</p>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {modeConfigs.map((config) => (
            <ModeCard key={config.mode} config={config} locale={locale} />
          ))}
        </div>
      </div>

      {otherSeries.length ? (
        <div className="surface-panel p-5 shadow-soft sm:p-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="section-label">
                <Layers3 className="h-3.5 w-3.5" />
                {copy.otherSeries}
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/72 sm:text-base">{copy.otherSeriesDescription}</p>
            </div>
            <Link href={`/${locale}` as Route} className="button-tertiary">
              {copy.exploreOther}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {otherSeries.map((item) => (
              <Link key={item.key} href={`/${locale}/series/${item.key}` as Route} className="surface-panel-muted interactive-card p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="pill-accent">{item.badge}</span>
                  <span className="pill-muted">{item.content.label}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.content.summaryLine}</h3>
                <p className="mt-2 text-sm leading-6 text-white/68">{item.content.topicSummary}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/88">
                  {copy.moveToSeries}
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
