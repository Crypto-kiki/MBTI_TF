import { redirect } from 'next/navigation';

import { Layout } from '@/components/Layout';
import { SeriesOverviewSection } from '@/components/SeriesOverviewSection';
import { getSeriesDefinition, isSeriesKey } from '@/data/series';
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config';
import { defaultSeries } from '@/lib/series';

interface SeriesLandingPageProps {
  params: { locale: string; series: string };
}

function getLocaleOrFallback(locale: string): Locale {
  return isLocale(locale) ? locale : defaultLocale;
}

export default function SeriesLandingPage({ params }: SeriesLandingPageProps) {
  const locale = getLocaleOrFallback(params.locale);
  const series = isSeriesKey(params.series) ? params.series : defaultSeries;

  if (!isSeriesKey(params.series)) {
    redirect(`/${locale}/series/${series}`);
  }

  const definition = getSeriesDefinition(locale, series);

  return (
    <Layout locale={locale} series={series}>
      <SeriesOverviewSection locale={locale} series={definition.key} />
    </Layout>
  );
}
