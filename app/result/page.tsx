import { Layout } from '@/components/Layout';
import { ResultCard } from '@/components/ResultCard';
import { parseTagCounts, resolveQuizResult } from '@/lib/results';
import { QuizMode, QuizTotals } from '@/types/quiz';

interface ResultPageProps {
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

export default function ResultPage({ searchParams }: ResultPageProps) {
  const mode: QuizMode = searchParams?.mode === 't' ? 't' : 'f';
  const totals: QuizTotals = {
    totalFScore: toNumber(searchParams?.totalFScore),
    totalTScore: toNumber(searchParams?.totalTScore),
    answeredCount: toNumber(searchParams?.answered),
    tagCounts: parseTagCounts(searchParams?.tags),
  };
  const result = resolveQuizResult(totals);

  return (
    <Layout>
      <div className="flex flex-1 items-center py-8">
        <ResultCard mode={mode} modeLabel={mode === 'f' ? 'F Mode' : 'T Mode'} result={result} />
      </div>
    </Layout>
  );
}
