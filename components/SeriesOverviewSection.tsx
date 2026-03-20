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
      intro: '이 시리즈는 무엇을 보는지',
      startTitle: '이제 바로 시작할 수 있어요',
      startDescription: '소개를 읽고 바로 테스트를 시작하거나, 먼저 전체 유형을 훑어본 뒤 결정해도 됩니다.',
      startQuiz: '바로 테스트 시작',
      viewTypes: '전체 유형 보기',
      exploreOther: '다른 시리즈 보기',
      whatItReads: '무엇을 측정하는지',
      reportIncludes: '결과에서 보게 되는 것',
      modeSection: '테스트 선택',
      modeDescription: '현재 시리즈 안에서 원하는 흐름을 선택해 이어서 진행하세요.',
      otherSeries: '다른 시리즈로 이동',
      otherSeriesDescription: '이 시리즈를 둘러본 뒤 바로 다른 시리즈로 넘어갈 수 있게 동선을 짧게 유지했습니다.',
      moveToSeries: '이 시리즈 보기',
    };
  }

  if (locale === 'ja') {
    return {
      intro: 'このシリーズで見ること',
      startTitle: 'ここからすぐ始められます',
      startDescription: '紹介を読んだらそのままテストを始めても、先に全タイプを見てから決めても大丈夫です。',
      startQuiz: 'すぐテストを始める',
      viewTypes: '全タイプを見る',
      exploreOther: '別シリーズを見る',
      whatItReads: '何を見ているか',
      reportIncludes: '結果で受け取る内容',
      modeSection: 'テストを選ぶ',
      modeDescription: 'このシリーズの中で進みたい流れを選んでください。',
      otherSeries: '別シリーズへ移動',
      otherSeriesDescription: '今のシリーズを見たあと、そのまま別シリーズへ自然につながるようにしています。',
      moveToSeries: 'このシリーズを見る',
    };
  }

  if (locale === 'zh-TW') {
    return {
      intro: '這個系列在看什麼',
      startTitle: '接下來可以直接開始',
      startDescription: '你可以先讀介紹後直接開始測驗，也可以先看全部類型再決定。',
      startQuiz: '直接開始測驗',
      viewTypes: '查看全部類型',
      exploreOther: '查看其他系列',
      whatItReads: '測量重點',
      reportIncludes: '結果會看到什麼',
      modeSection: '選擇測驗',
      modeDescription: '在目前系列中選擇你想開始的流程。',
      otherSeries: '前往其他系列',
      otherSeriesDescription: '看完目前系列後，也能立刻延伸到其他系列，不用重新找路。',
      moveToSeries: '查看這個系列',
    };
  }

  return {
    intro: 'What this series reads',
    startTitle: 'You can start from here',
    startDescription: 'Read the intro, start the quiz right away, or browse all types first before deciding.',
    startQuiz: 'Start the quiz',
    viewTypes: 'Browse all types',
    exploreOther: 'Browse other series',
    whatItReads: 'What it measures',
    reportIncludes: 'What the result includes',
    modeSection: 'Choose a quiz',
    modeDescription: 'Pick the flow you want to start inside this series.',
    otherSeries: 'Go to another series',
    otherSeriesDescription: 'After checking this series, you can move straight into another one without losing your place.',
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

        <div className="mt-6 rounded-[1.75rem] border border-white/72 bg-white/82 p-5 shadow-soft sm:p-6">
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-plum/54">{copy.startTitle}</p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/72 sm:text-base">{copy.startDescription}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={getSeriesQuizHubHref(locale, series) as Route}
              className={`interactive-card inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r px-5 py-3 text-sm font-semibold text-white shadow-soft ${seriesDefinition.accentClass}`}
            >
              {copy.startQuiz}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={getSeriesTypesHref(locale, series) as Route}
              className="interactive-card inline-flex items-center justify-center rounded-full border border-plum/12 bg-white px-5 py-3 text-sm font-medium text-plum hover:bg-plum hover:text-white"
            >
              {copy.viewTypes}
            </Link>
            <Link
              href={`/${locale}` as Route}
              className="interactive-card inline-flex items-center justify-center rounded-full border border-plum/12 bg-white/84 px-5 py-3 text-sm font-medium text-plum hover:bg-white"
            >
              {copy.exploreOther}
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-[1.85rem] border border-white/72 bg-white/82 p-5 shadow-soft sm:p-6">
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-plum/54">{copy.whatItReads}</p>
          <p className="mt-3 text-base font-semibold text-ink">{seriesDefinition.content.topicSummary}</p>
          <p className="mt-3 text-sm leading-7 text-ink/72 sm:text-base">{seriesDefinition.content.recommendedFor}</p>
        </div>
        <div className="rounded-[1.85rem] border border-white/72 bg-white/82 p-5 shadow-soft sm:p-6">
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-plum/54">{copy.reportIncludes}</p>
          <p className="mt-3 text-base font-semibold text-ink">{seriesDefinition.content.accentLabel}</p>
          <p className="mt-3 text-sm leading-7 text-ink/72 sm:text-base">{seriesDefinition.content.reportIncludes}</p>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/72 bg-white/82 p-5 shadow-soft sm:p-6">
        <p className="text-[0.68rem] uppercase tracking-[0.18em] text-plum/54">{copy.modeSection}</p>
        <div className="mt-3 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="text-2xl font-semibold text-ink sm:text-[1.8rem]">{messages.modes.modeSelect}</h2>
          <p className="max-w-2xl text-sm leading-7 text-ink/72 sm:text-base">{copy.modeDescription}</p>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {modeConfigs.map((config) => (
            <ModeCard key={config.mode} config={config} locale={locale} />
          ))}
        </div>
      </div>

      {otherSeries.length ? (
        <div className="rounded-[2rem] border border-white/72 bg-white/78 p-5 shadow-soft sm:p-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-plum/8 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-plum/74">
                <Layers3 className="h-3.5 w-3.5" />
                {copy.otherSeries}
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/72 sm:text-base">{copy.otherSeriesDescription}</p>
            </div>
            <Link
              href={`/${locale}` as Route}
              className="interactive-card inline-flex items-center gap-2 rounded-full border border-plum/12 bg-white px-4 py-2.5 text-sm font-medium text-plum hover:bg-plum hover:text-white"
            >
              {copy.exploreOther}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {otherSeries.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}/series/${item.key}` as Route}
                className="interactive-card rounded-[1.5rem] border border-white/78 bg-[linear-gradient(180deg,rgba(248,245,251,0.95),rgba(255,255,255,0.95))] p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-[0.68rem] font-semibold tracking-[0.18em] text-plum/74 shadow-sm">{item.badge}</span>
                  <span className="rounded-full bg-plum/8 px-3 py-1 text-xs font-medium text-plum/72">{item.content.label}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-ink">{item.content.summaryLine}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/70">{item.content.description}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-plum">
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
