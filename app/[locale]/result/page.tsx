import { redirect } from 'next/navigation';

import { defaultResultType, QuizMode, QuizTotals } from '@/types/quiz';
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config';
import { getResultHref, parseTagCounts, resolveQuizResult } from '@/lib/results';

interface LegacyLocalizedResultPageProps {
  params: { locale: string };
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

function hasQuizState(searchParams?: LegacyLocalizedResultPageProps['searchParams']) {
  return Boolean(searchParams?.totalFScore || searchParams?.totalTScore || searchParams?.answered || searchParams?.tags);
}

export default function LegacyLocalizedResultPage({ params, searchParams }: LegacyLocalizedResultPageProps) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;

  if (!hasQuizState(searchParams)) {
    redirect(getResultHref(locale, defaultResultType, 'core'));
  }

  const totals: QuizTotals = {
    totalFScore: toNumber(searchParams?.totalFScore),
    totalTScore: toNumber(searchParams?.totalTScore),
    answeredCount: toNumber(searchParams?.answered),
    tagCounts: parseTagCounts(searchParams?.tags),
  };
  const result = resolveQuizResult(locale, totals);
  const mode: QuizMode = searchParams?.mode === 't' ? 't' : 'f';
  const nextSearch = new URLSearchParams({
    mode,
    totalFScore: String(totals.totalFScore),
    totalTScore: String(totals.totalTScore),
    answered: String(totals.answeredCount),
    tags: searchParams?.tags ?? '',
  });

  redirect(`${getResultHref(locale, result.profile.type, 'core')}?${nextSearch.toString()}`);
}
