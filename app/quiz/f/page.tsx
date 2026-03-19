import { Layout } from '@/components/Layout';
import { QuizFlow } from '@/components/QuizFlow';
import { fQuestions } from '@/data/f-questions';

export default function FQuizPage() {
  return (
    <Layout>
      <div className="flex flex-1 items-center py-8">
        <QuizFlow mode="f" modeLabel="F Mode" questions={fQuestions} />
      </div>
    </Layout>
  );
}
