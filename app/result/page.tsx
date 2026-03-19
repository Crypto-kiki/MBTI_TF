import { Layout } from '@/components/Layout';
import { ResultCard } from '@/components/ResultCard';
import { getResultSummary } from '@/lib/results';

export default function ResultPage() {
  const score = 5;
  const summary = getResultSummary('f', score);

  return (
    <Layout>
      <div className="flex flex-1 items-center py-8">
        <ResultCard modeLabel="F Mode" score={score} summary={summary} />
      </div>
    </Layout>
  );
}
