import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Layout } from '@/components/Layout';
import { ResultCard } from '@/components/ResultCard';
import { getSeriesDefaultResultType, getSeriesModeLabel, getSeriesPrimaryMode, getSeriesResultTypes, isSeriesKey, isSeriesQuizMode, isSeriesResultType } from '@/data/series';
import { defaultLocale, isLocale, locales, type Locale } from '@/lib/i18n/config';
import { getResultHref, getModeFromResultType, parseTagCounts, resolveQuizResult, resolveResultFromType } from '@/lib/results';
import { defaultSeries } from '@/lib/series';
import { getResultShareMetadata } from '@/lib/result-meta';
import { QuizMode, QuizTotals } from '@/types/quiz';
import { seriesKeys } from '@/types/series';

interface DynamicSeriesResultPageProps {
  params: { locale: string; series: string; resultType: string };
  searchParams?: {
    mode?: string;
    totalFScore?: string;
    totalTScore?: string;
    answered?: string;
    tags?: string;
  };
}

function toNumber(value?: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function hasQuizState(searchParams?: DynamicSeriesResultPageProps['searchParams']) {
  return Boolean(searchParams?.totalFScore || searchParams?.totalTScore || searchParams?.answered || searchParams?.tags);
}

function getLocaleOrFallback(locale: string): Locale {
  return isLocale(locale) ? locale : defaultLocale;
}

function getMode(series: string, searchMode: string | undefined, resultType: string): QuizMode {
  if (isSeriesKey(series) && searchMode && isSeriesQuizMode(series, searchMode)) {
    return searchMode;
  }

  return getModeFromResultType(resultType as never, getSeriesPrimaryMode(isSeriesKey(series) ? series : defaultSeries));
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    seriesKeys.flatMap((series) => getSeriesResultTypes(series).map((resultType) => ({ locale, series, resultType }))),
  );
}

export async function generateMetadata({ params, searchParams }: DynamicSeriesResultPageProps): Promise<Metadata> {
  const locale = getLocaleOrFallback(params.locale);
  const series = isSeriesKey(params.series) ? params.series : defaultSeries;
  const resultType = isSeriesResultType(series, params.resultType) ? params.resultType : getSeriesDefaultResultType(series);
  const metadata = getResultShareMetadata(locale, resultType, searchParams, series);

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.ogTitle,
      description: metadata.ogDescription,
      images: [metadata.imagePath],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.ogTitle,
      description: metadata.ogDescription,
      images: [metadata.imagePath],
    },
  };
}

export default function DynamicSeriesResultPage({ params, searchParams }: DynamicSeriesResultPageProps) {
  const locale = getLocaleOrFallback(params.locale);
  const series = isSeriesKey(params.series) ? params.series : defaultSeries;

  if (!isSeriesKey(params.series)) {
    redirect(`/${locale}/series/${series}/result/${params.resultType}`);
  }

  if (!isSeriesResultType(series, params.resultType)) {
    redirect(getResultHref(locale, getSeriesDefaultResultType(series), series));
  }

  const resultType = params.resultType;
  const mode = getMode(series, searchParams?.mode, resultType);

  if (hasQuizState(searchParams)) {
    const totals: QuizTotals = {
      totalFScore: toNumber(searchParams?.totalFScore),
      totalTScore: toNumber(searchParams?.totalTScore),
      answeredCount: toNumber(searchParams?.answered),
      tagCounts: parseTagCounts(searchParams?.tags),
    };

    const resolvedResult = resolveQuizResult(locale, totals, series);

    if (resolvedResult.profile.type !== resultType) {
      const search = new URLSearchParams();
      if (searchParams?.mode) search.set('mode', searchParams.mode);
      if (searchParams?.totalFScore) search.set('totalFScore', searchParams.totalFScore);
      if (searchParams?.totalTScore) search.set('totalTScore', searchParams.totalTScore);
      if (searchParams?.answered) search.set('answered', searchParams.answered);
      if (searchParams?.tags) search.set('tags', searchParams.tags);
      redirect(`${getResultHref(locale, resolvedResult.profile.type, series)}?${search.toString()}`);
    }

    return (
      <Layout locale={locale} series={series}>
        <div className="flex flex-1 items-center py-8">
          <ResultCard locale={locale} series={series} mode={mode} modeLabel={getSeriesModeLabel(locale, mode, series)} result={resolvedResult} />
        </div>
      </Layout>
    );
  }

  const result = resolveResultFromType(locale, resultType, series);

  return (
    <Layout locale={locale} series={series}>
      <div className="flex flex-1 items-center py-8">
        <ResultCard locale={locale} series={series} mode={mode} modeLabel={getSeriesModeLabel(locale, mode, series)} result={result} />
      </div>
    </Layout>
  );
}
