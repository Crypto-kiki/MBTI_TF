import { Layout } from '@/components/Layout';
import { QuizCard } from '@/components/QuizCard';
import { quizData } from '@/data/quizzes';

export default function TQuizPage() {
  const question = quizData.t[0];

  return (
    <Layout>
      <div className="flex flex-1 items-center py-8">
        <QuizCard modeLabel="T Mode" question={question} questionNumber={1} totalQuestions={quizData.t.length} />
      </div>
    </Layout>
  );
}
