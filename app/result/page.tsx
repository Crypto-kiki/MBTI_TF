import { Layout } from '@/components/Layout';
import { ResultCard } from '@/components/ResultCard';
import { getResultSummary } from '@/lib/results';
import { QuizTotals, QuizMode } from '@/types/quiz';

interface ResultPageProps {
  searchParams?: {
    mode?: string;
    fScore?: string;
    tScore?: string;
    answered?: string;
  };
}

function toNumber(value?: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function ResultPage({ searchParams }: ResultPageProps) {
  const mode: QuizMode = searchParams?.mode === 't' ? 't' : 'f';
  const totals: QuizTotals = {
    fScore: toNumber(searchParams?.fScore),
    tScore: toNumber(searchParams?.tScore),
    answeredCount: toNumber(searchParams?.answered),
  };
  const summary = getResultSummary(mode, totals);

  return (
    <Layout>
      <div className="flex flex-1 items-center py-8">
        <ResultCard
          mode={mode}
          modeLabel={mode === 'f' ? 'F Mode' : 'T Mode'}
          fScore={totals.fScore}
          tScore={totals.tScore}
          answeredCount={totals.answeredCount}
          summary={summary}
        />
      </div>
    </Layout>
  );
}
