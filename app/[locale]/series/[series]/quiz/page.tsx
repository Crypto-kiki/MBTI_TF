import { redirect } from 'next/navigation';

import { Layout } from '@/components/Layout';
import { SeriesOverviewSection } from '@/components/SeriesOverviewSection';
import { isSeriesKey } from '@/data/series';
import { uiMessages } from '@/data/i18n/messages';
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config';
import { defaultSeries } from '@/lib/series';

interface SeriesQuizHubPageProps {
  params: { locale: string; series: string };
}

function getLocaleOrFallback(locale: string): Locale {
  return isLocale(locale) ? locale : defaultLocale;
}

export default function SeriesQuizHubPage({ params }: SeriesQuizHubPageProps) {
  const locale = getLocaleOrFallback(params.locale);
  const series = isSeriesKey(params.series) ? params.series : defaultSeries;

  if (!isSeriesKey(params.series)) {
    redirect(`/${locale}/series/${series}/quiz`);
  }

  return (
    <Layout locale={locale} series={series} activeNav="quiz" contextTitle={uiMessages[locale].modes.modeSelect}>
      <SeriesOverviewSection locale={locale} series={series} />
    </Layout>
  );
}
