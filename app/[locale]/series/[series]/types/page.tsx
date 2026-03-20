import type { Metadata } from 'next';
import type { Route } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Layout } from '@/components/Layout';
import { ResultCatalogExplorer } from '@/components/ResultCatalogExplorer';
import { getSeriesDefinition, getSeriesList, getSeriesLocalizedResultProfiles, getSeriesResultTypes, isSeriesKey } from '@/data/series';
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
      title: '이 시리즈의 전체 유형',
      description: '현재 시리즈 안에서 나올 수 있는 결과를 한 번에 훑어볼 수 있어요. 결과를 미리 보고, 바로 테스트로 돌아가거나 다른 시리즈로 넘어갈 수 있습니다.',
      startSeries: '이 시리즈 테스트 시작',
      goHome: '시리즈 허브로',
      otherSeries: '다른 시리즈 보기',
      catalogLabel: '현재 시리즈만 모아보기',
    };
  }

  if (locale === 'ja') {
    return {
      title: 'このシリーズの全タイプ',
      description: 'このシリーズで出る結果だけをまとめて見られます。結果を先に見てから、そのままテストへ戻ったり別シリーズへ移動できます。',
      startSeries: 'このシリーズのテストへ',
      goHome: 'シリーズハブへ',
      otherSeries: '別シリーズを見る',
      catalogLabel: 'このシリーズだけを表示',
    };
  }

  if (locale === 'zh-TW') {
    return {
      title: '目前系列的全部類型',
      description: '這裡只整理目前系列會出現的結果。你可以先看結果，再直接開始測驗或切換到其他系列。',
      startSeries: '開始這個系列的測驗',
      goHome: '回系列中心',
      otherSeries: '查看其他系列',
      catalogLabel: '只看目前系列',
    };
  }

  return {
    title: 'All types in this series',
    description: 'This page only shows outcomes from the current series, so you can preview results and move straight back into the quiz or another series.',
    startSeries: 'Start this series',
    goHome: 'Go to series hub',
    otherSeries: 'Browse other series',
    catalogLabel: 'Current series only',
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
  const otherSeries = getSeriesList(locale).filter((item) => item.key !== series);
  const copy = getPageCopy(locale);

  return (
    <Layout locale={locale} series={series} activeNav="types" contextTitle={messages.catalog.title}>
      <section className="flex flex-1 flex-col gap-6 py-3 sm:gap-8 sm:py-8">
        <div className={`glass-panel rounded-[2.25rem] px-6 py-8 sm:px-8 sm:py-10 ${seriesDefinition.surfaceClass}`}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/82 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.22em] text-plum/76 shadow-sm">
              {seriesDefinition.badge}
            </span>
            <span className="rounded-full bg-plum/8 px-3 py-1 text-xs font-medium text-plum/72">{copy.catalogLabel}</span>
          </div>
          <h1 className="mt-4 text-balance font-serif text-4xl font-semibold leading-[1.06] text-ink sm:text-5xl">{copy.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-plum sm:text-xl">{seriesDefinition.content.summaryLine}</p>
          <p className="mt-3 max-w-3xl text-base leading-8 text-ink/72 sm:text-lg">{copy.description}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={getSeriesQuizHubHref(locale, series) as Route}
              className="interactive-card inline-flex items-center justify-center rounded-full border border-plum/12 bg-white px-5 py-3 text-sm font-medium text-plum hover:bg-plum hover:text-white"
            >
              {copy.startSeries}
            </Link>
            {otherSeries[0] ? (
              <Link
                href={`/${locale}/series/${otherSeries[0].key}` as Route}
                className="interactive-card inline-flex items-center justify-center rounded-full border border-plum/12 bg-white/84 px-5 py-3 text-sm font-medium text-plum hover:bg-white"
              >
                {otherSeries[0].content.label} · {copy.otherSeries}
              </Link>
            ) : null}
            <Link
              href={`/${locale}` as Route}
              className="interactive-card inline-flex items-center justify-center rounded-full border border-plum/12 bg-white/84 px-5 py-3 text-sm font-medium text-plum hover:bg-white"
            >
              {copy.goHome}
            </Link>
          </div>
        </div>

        <ResultCatalogExplorer locale={locale} series={series} resultTypes={getSeriesResultTypes(series)} profiles={profiles} messages={messages.catalog} />
      </section>
    </Layout>
  );
}
