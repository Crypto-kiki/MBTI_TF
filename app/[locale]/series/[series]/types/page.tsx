import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Layout } from '@/components/Layout';
import { ResultCatalogExplorer } from '@/components/ResultCatalogExplorer';
import { getSeriesDefinition, getSeriesLocalizedResultProfiles, isSeriesKey } from '@/data/series';
import { uiMessages } from '@/data/i18n/messages';
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config';
import { defaultSeries } from '@/lib/series';
import { resultTypes } from '@/types/quiz';

interface SeriesTypesPageProps {
  params: { locale: string; series: string };
}

function getLocaleOrFallback(locale: string): Locale {
  return isLocale(locale) ? locale : defaultLocale;
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

  return (
    <Layout locale={locale} series={series} activeNav="types">
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
          <p className="mt-4 max-w-3xl text-lg leading-8 text-plum sm:text-xl">{seriesDefinition.content.description}</p>
          <p className="mt-3 max-w-3xl text-base leading-8 text-ink/72 sm:text-lg">{messages.catalog.description}</p>
        </div>

        <ResultCatalogExplorer locale={locale} series={series} resultTypes={resultTypes} profiles={profiles} messages={messages.catalog} />
      </section>
    </Layout>
  );
}
