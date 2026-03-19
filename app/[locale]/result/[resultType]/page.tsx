import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Layout } from '@/components/Layout';
import { ResultCard } from '@/components/ResultCard';
import { getResultProfile } from '@/data/results';
import { uiMessages } from '@/data/i18n/messages';
import { defaultLocale, isLocale, locales, type Locale } from '@/lib/i18n/config';
import { getModeFromResultType, getResultHref, parseTagCounts, resolveQuizResult, resolveResultFromType } from '@/lib/results';
import { defaultResultType, isResultType, resultTypes, QuizMode, QuizTotals, ResultType } from '@/types/quiz';

interface DynamicResultPageProps {
  params: { locale: string; resultType: string };
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

function hasQuizState(searchParams?: DynamicResultPageProps['searchParams']) {
  return Boolean(searchParams?.totalFScore || searchParams?.totalTScore || searchParams?.answered || searchParams?.tags);
}

function getLocaleOrFallback(locale: string): Locale {
  return isLocale(locale) ? locale : defaultLocale;
}

function getMode(searchMode: string | undefined, resultType: ResultType): QuizMode {
  return getModeFromResultType(resultType, searchMode === 't' ? 't' : searchMode === 'f' ? 'f' : undefined);
}

export function generateStaticParams() {
  return locales.flatMap((locale) => resultTypes.map((resultType) => ({ locale, resultType })));
}

export async function generateMetadata({ params }: DynamicResultPageProps): Promise<Metadata> {
  const locale = getLocaleOrFallback(params.locale);
  const resultType = isResultType(params.resultType) ? params.resultType : defaultResultType;
  const profile = getResultProfile(locale, resultType);

  return {
    title: `${profile.title} · ${uiMessages[locale].metadata.title}`,
    description: profile.description,
    openGraph: {
      title: profile.title,
      description: profile.description,
      images: [profile.image.src],
    },
  };
}

export default function DynamicResultPage({ params, searchParams }: DynamicResultPageProps) {
  const locale = getLocaleOrFallback(params.locale);

  if (!isResultType(params.resultType)) {
    redirect(getResultHref(locale, defaultResultType));
  }

  const resultType = params.resultType;
  const mode = getMode(searchParams?.mode, resultType);

  if (hasQuizState(searchParams)) {
    const totals: QuizTotals = {
      totalFScore: toNumber(searchParams?.totalFScore),
      totalTScore: toNumber(searchParams?.totalTScore),
      answeredCount: toNumber(searchParams?.answered),
      tagCounts: parseTagCounts(searchParams?.tags),
    };

    const resolvedResult = resolveQuizResult(locale, totals);

    if (resolvedResult.profile.type !== resultType) {
      const search = new URLSearchParams();
      if (searchParams?.mode) search.set('mode', searchParams.mode);
      if (searchParams?.totalFScore) search.set('totalFScore', searchParams.totalFScore);
      if (searchParams?.totalTScore) search.set('totalTScore', searchParams.totalTScore);
      if (searchParams?.answered) search.set('answered', searchParams.answered);
      if (searchParams?.tags) search.set('tags', searchParams.tags);
      redirect(`${getResultHref(locale, resolvedResult.profile.type)}?${search.toString()}`);
    }

    return (
      <Layout locale={locale}>
        <div className="flex flex-1 items-center py-8">
          <ResultCard locale={locale} mode={mode} modeLabel={uiMessages[locale].modes[mode].title} result={resolvedResult} />
        </div>
      </Layout>
    );
  }

  const result = resolveResultFromType(locale, resultType);

  return (
    <Layout locale={locale}>
      <div className="flex flex-1 items-center py-8">
        <ResultCard locale={locale} mode={mode} modeLabel={uiMessages[locale].modes[mode].title} result={result} />
      </div>
    </Layout>
  );
}
