import { Layout } from '@/components/Layout';
import { ResultCard } from '@/components/ResultCard';
import { parseTagCounts, resolveQuizResult } from '@/lib/results';
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config';
import { QuizMode, QuizTotals } from '@/types/quiz';
import { uiMessages } from '@/data/i18n/messages';

interface LocalizedResultPageProps {
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

export default function LocalizedResultPage({ params, searchParams }: LocalizedResultPageProps) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const mode: QuizMode = searchParams?.mode === 't' ? 't' : 'f';
  const totals: QuizTotals = {
    totalFScore: toNumber(searchParams?.totalFScore),
    totalTScore: toNumber(searchParams?.totalTScore),
    answeredCount: toNumber(searchParams?.answered),
    tagCounts: parseTagCounts(searchParams?.tags),
  };
  const result = resolveQuizResult(locale, totals);

  return (
    <Layout locale={locale}>
      <div className="flex flex-1 items-center py-8">
        <ResultCard locale={locale} mode={mode} modeLabel={uiMessages[locale].modes[mode].title} result={result} />
      </div>
    </Layout>
  );
}
