import { redirect } from 'next/navigation';

import { Layout } from '@/components/Layout';
import { QuizFlow } from '@/components/QuizFlow';
import { getSeriesModeLabel, getSeriesQuestions, isSeriesKey, isSeriesQuizMode } from '@/data/series';
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config';
import { defaultSeries } from '@/lib/series';

interface SeriesQuizPageProps {
  params: { locale: string; series: string; mode: string };
}

function getLocaleOrFallback(locale: string): Locale {
  return isLocale(locale) ? locale : defaultLocale;
}

export default function SeriesQuizPage({ params }: SeriesQuizPageProps) {
  const locale = getLocaleOrFallback(params.locale);
  const series = isSeriesKey(params.series) ? params.series : defaultSeries;

  if (!isSeriesKey(params.series)) {
    redirect(`/${locale}/series/${series}/quiz`);
  }

  if (!isSeriesQuizMode(series, params.mode)) {
    redirect(`/${locale}/series/${series}/quiz`);
  }

  return (
    <Layout locale={locale} series={series} activeNav="quiz" contextTitle={getSeriesModeLabel(locale, params.mode, series)}>
      <div className="flex flex-1 items-center py-8">
        <QuizFlow
          locale={locale}
          series={series}
          mode={params.mode}
          modeLabel={getSeriesModeLabel(locale, params.mode, series)}
          questions={getSeriesQuestions(series, locale, params.mode)}
        />
      </div>
    </Layout>
  );
}
