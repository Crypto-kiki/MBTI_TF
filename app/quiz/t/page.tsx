import { Layout } from '@/components/Layout';
import { QuizFlow } from '@/components/QuizFlow';
import { tQuestions } from '@/data/t-questions';

export default function TQuizPage() {
  return (
    <Layout>
      <div className="flex flex-1 items-center py-8">
        <QuizFlow mode="t" modeLabel="T Mode" questions={tQuestions} />
      </div>
    </Layout>
  );
}
