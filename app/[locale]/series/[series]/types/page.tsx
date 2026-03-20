import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Layout } from '@/components/Layout';
import { ResultCatalogExplorer } from '@/components/ResultCatalogExplorer';
import { getSeriesDefinition, getSeriesLocalizedResultProfiles, getSeriesModeConfigs, getSeriesResultTypes, isSeriesKey } from '@/data/series';
import { uiMessages } from '@/data/i18n/messages';
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config';
import { defaultSeries, getSeriesQuizHubHref } from '@/lib/series';

interface SeriesTypesPageProps {
  params: { locale: string; series: string };
}

function getLocaleOrFallback(locale: string): Locale {
  return isLocale(locale) ? locale : defaultLocale;
}

function getPageCopy(locale: Locale) {
  if (locale === 'ko') {
    return {
      contextLabel: '이 페이지는 이런 흐름이에요',
      contextDescription: '같은 시리즈 안의 전체 유형만 모아 보여주기 때문에, 기본편과 연애편의 유형이 섞여 보이지 않아요.',
      actionLabel: '이 시리즈 테스트하러 가기',
    };
  }

  if (locale === 'ja') {
    return {
      contextLabel: 'このページの見方',
      contextDescription: '同じシリーズのタイプだけをまとめているので、基本編と恋愛編のタイプが混ざって見えることはありません。',
      actionLabel: 'このシリーズのテストへ',
    };
  }

  if (locale === 'zh-TW') {
    return {
      contextLabel: '這頁的閱讀方式',
      contextDescription: '這裡只會顯示同一系列的全部類型，所以不會把基本篇與戀愛篇的結果混在一起。',
      actionLabel: '前往這個系列的測驗',
    };
  }

  return {
    contextLabel: 'How to read this page',
    contextDescription: 'This catalog only shows types from the current series, so Core and Love never blur together.',
    actionLabel: 'Take this series',
  };
}

export async function generateMetadata({ params }: SeriesTypesPageProps): Promise<Metadata> {
  const locale = getLocaleOrFallback(params.locale);
  const series = isSeriesKey(params.series) ? params.series : defaultSeries;
  const messages = uiMessages[locale];
  const seriesDefinition = getSeriesDefinition(locale, series);

  return {
    title: `${seriesDefinition.content.title} · ${messages.catalog.title}`,
    description: seriesDefinition.content.description,
  };
}

export default function SeriesTypesPage({ params }: SeriesTypesPageProps) {
  const locale = getLocaleOrFallback(params.locale);
  const series = isSeriesKey(params.series) ? params.series : defaultSeries;

  if (!isSeriesKey(params.series)) {
    redirect(`/${locale}/series/${series}/types`);
  }

  const messages = uiMessages[locale];
  const profiles = getSeriesLocalizedResultProfiles(series, locale);
  const seriesDefinition = getSeriesDefinition(locale, series);
  const modeConfigs = getSeriesModeConfigs(locale, series);
  const copy = getPageCopy(locale);

  return (
    <Layout locale={locale} series={series} activeNav="types" contextTitle={messages.catalog.title}>
      <section className="flex flex-1 flex-col gap-6 py-3 sm:gap-8 sm:py-8">
        <div className={`glass-panel rounded-[2.25rem] px-6 py-8 sm:px-8 sm:py-10 ${seriesDefinition.surfaceClass}`}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/82 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.22em] text-plum/76 shadow-sm">
              {seriesDefinition.badge}
            </span>
            <span className="rounded-full bg-plum/8 px-3 py-1 text-xs font-medium text-plum/72">{seriesDefinition.content.label}</span>
          </div>
          <h1 className="mt-4 text-balance font-serif text-4xl font-semibold leading-[1.06] text-ink sm:text-5xl">
            {messages.catalog.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-plum sm:text-xl">{seriesDefinition.content.summaryLine}</p>
          <p className="mt-3 max-w-3xl text-base leading-8 text-ink/72 sm:text-lg">{messages.catalog.description}</p>

          <div className="mt-6 grid gap-3 lg:grid-cols-3">
            <div className="rounded-[1.45rem] border border-white/72 bg-white/76 p-4 shadow-soft">
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-plum/54">{copy.contextLabel}</p>
              <p className="mt-3 text-sm leading-7 text-ink/72 sm:text-base">{copy.contextDescription}</p>
            </div>
            <div className="rounded-[1.45rem] border border-white/72 bg-white/76 p-4 shadow-soft">
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-plum/54">{seriesDefinition.content.accentLabel}</p>
              <p className="mt-3 text-sm leading-7 text-ink/72 sm:text-base">{seriesDefinition.content.reportIncludes}</p>
            </div>
            <div className="rounded-[1.45rem] border border-white/72 bg-white/76 p-4 shadow-soft">
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-plum/54">{messages.modes.modeSelect}</p>
              <p className="mt-3 text-sm leading-7 text-ink/72 sm:text-base">{modeConfigs.map((config) => config.title).join(' · ')}</p>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href={getSeriesQuizHubHref(locale, series)}
              className="interactive-card inline-flex items-center justify-center rounded-full border border-plum/12 bg-white/84 px-5 py-3 text-sm font-medium text-plum hover:bg-white"
            >
              {copy.actionLabel}
            </Link>
          </div>
        </div>

        <ResultCatalogExplorer locale={locale} series={series} resultTypes={getSeriesResultTypes(series)} profiles={profiles} messages={messages.catalog} />
      </section>
    </Layout>
  );
}
