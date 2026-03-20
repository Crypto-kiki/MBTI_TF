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
      description: '필터로 좁히고, 궁금한 유형을 열어보세요.',
      startSeries: '이 시리즈 테스트 시작',
      goHome: '시리즈 허브로',
      otherSeries: '다른 시리즈 보기',
      catalogLabel: '현재 시리즈 카탈로그',
    };
  }

  if (locale === 'ja') {
    return {
      title: 'このシリーズの全タイプ',
      description: 'フィルターで絞って、気になるタイプを開いてください。',
      startSeries: 'このシリーズのテストへ',
      goHome: 'シリーズハブへ',
      otherSeries: '別シリーズを見る',
      catalogLabel: 'このシリーズのカタログ',
    };
  }

  if (locale === 'zh-TW') {
    return {
      title: '目前系列的全部類型',
      description: '先用篩選縮小，再打開有興趣的類型。',
      startSeries: '開始這個系列的測驗',
      goHome: '回系列中心',
      otherSeries: '查看其他系列',
      catalogLabel: '目前系列型錄',
    };
  }

  return {
    title: 'All types in this series',
    description: 'Filter fast and open the type you want to compare.',
    startSeries: 'Start this series',
    goHome: 'Go to series hub',
    otherSeries: 'Browse other series',
    catalogLabel: 'Current series catalog',
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
            <span className="pill-accent">{seriesDefinition.badge}</span>
            <span className="pill-muted">{copy.catalogLabel}</span>
          </div>
          <div className="mt-4 grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-start">
            <div>
              <h1 className="text-balance font-serif text-4xl font-semibold leading-[1.06] text-ink sm:text-5xl">{copy.title}</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-ink sm:text-xl">{seriesDefinition.content.summaryLine}</p>
              <p className="mt-3 max-w-3xl text-base leading-8 text-ink/68 sm:text-lg">{copy.description}</p>
            </div>

            <div className="surface-panel-strong p-5 text-white sm:p-6">
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-white/50">{messages.catalog.title}</p>
              <div className="mt-4 flex flex-col gap-3">
                <Link href={getSeriesQuizHubHref(locale, series) as Route} className="button-primary w-full justify-center">
                  {copy.startSeries}
                </Link>
                {otherSeries[0] ? (
                  <Link href={`/${locale}/series/${otherSeries[0].key}` as Route} className="button-secondary w-full justify-center">
                    {otherSeries[0].content.label} · {copy.otherSeries}
                  </Link>
                ) : null}
                <Link href={`/${locale}` as Route} className="button-tertiary w-full justify-center">
                  {copy.goHome}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <ResultCatalogExplorer locale={locale} series={series} resultTypes={getSeriesResultTypes(series)} profiles={profiles} messages={messages.catalog} />
      </section>
    </Layout>
  );
}
