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
      startTitle: '이 시리즈에서 바로 할 수 있는 것',
      startDescription: '핵심 설명을 읽은 뒤 바로 테스트를 시작하거나, 전체 유형을 먼저 훑어보고 결정할 수 있습니다.',
      startQuiz: '테스트 시작',
      viewTypes: '전체 유형 보기',
      exploreOther: '다른 시리즈 보기',
      whatItReads: '무엇을 측정하는지',
      reportIncludes: '결과에서 받는 리포트',
      modeSection: '테스트 선택',
      modeDescription: '아래에서 원하는 흐름을 선택하면 바로 테스트로 이어집니다.',
      otherSeries: '다른 시리즈 추천',
      otherSeriesDescription: '지금 시리즈를 본 뒤 곧바로 다른 시리즈로 넘어갈 수 있게 동선을 짧게 유지했습니다.',
      moveToSeries: '이 시리즈 열기',
    };
  }

  if (locale === 'ja') {
    return {
      startTitle: 'このシリーズですぐできること',
      startDescription: '概要を読んだあとすぐテストを始めても、全タイプを先に見てから決めても大丈夫です。',
      startQuiz: 'テストを始める',
      viewTypes: '全タイプを見る',
      exploreOther: '別シリーズを見る',
      whatItReads: '何を測るか',
      reportIncludes: '結果で受け取る内容',
      modeSection: 'テスト選択',
      modeDescription: '下の流れから一つ選ぶと、そのままテストへ進めます。',
      otherSeries: '別シリーズのおすすめ',
      otherSeriesDescription: '今のシリーズを見たあと、そのまま別シリーズへ自然につながるようにしています。',
      moveToSeries: 'このシリーズを開く',
    };
  }

  if (locale === 'zh-TW') {
    return {
      startTitle: '你現在可以直接做的事',
      startDescription: '看完核心介紹後，可以直接開始測驗，也可以先看完整類型再決定。',
      startQuiz: '開始測驗',
      viewTypes: '查看全部類型',
      exploreOther: '查看其他系列',
      whatItReads: '測量重點',
      reportIncludes: '你會拿到的結果',
      modeSection: '選擇測驗',
      modeDescription: '從下方選擇想開始的流程後，就能直接進入測驗。',
      otherSeries: '其他系列推薦',
      otherSeriesDescription: '看完目前系列後，也能立刻延伸到其他系列，不需要重新找入口。',
      moveToSeries: '打開這個系列',
    };
  }

  return {
    startTitle: 'What you can do from here',
    startDescription: 'Read the core intro, start the quiz immediately, or browse all types first before deciding.',
    startQuiz: 'Start the quiz',
    viewTypes: 'Browse all types',
    exploreOther: 'Browse other series',
    whatItReads: 'What it measures',
    reportIncludes: 'What the report includes',
    modeSection: 'Choose a quiz',
    modeDescription: 'Pick a flow below and move directly into the quiz.',
    otherSeries: 'Other recommended series',
    otherSeriesDescription: 'After checking this series, you can move straight into another one without hunting for the next path.',
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
            <p className="mt-3 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">{seriesDefinition.content.description}</p>

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
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/72 sm:text-base">{copy.otherSeriesDescription}</p>
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
                <p className="mt-2 text-sm leading-6 text-white/68">{item.content.description}</p>
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
