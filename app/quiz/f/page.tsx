import { Layout } from '@/components/Layout';
import { QuizCard } from '@/components/QuizCard';
import { quizData } from '@/data/quizzes';

export default function FQuizPage() {
  const question = quizData.f[0];

  return (
    <Layout>
      <div className="flex flex-1 items-center py-8">
        <QuizCard modeLabel="F Mode" question={question} questionNumber={1} totalQuestions={quizData.f.length} />
      </div>
    </Layout>
  );
}
