import { ResultSummary, QuizMode, QuizTotals, QuizAnswer, Question } from '@/types/quiz';

const resultMap: Record<QuizMode, ResultSummary[]> = {
  f: [
    {
      title: '섬세한 공감형',
      description: '표정과 맥락 속 감정을 빠르게 포착하며, 관계의 온도를 세심하게 읽는 편입니다.',
      mood: '따뜻한 공감과 정서적 민감도가 돋보이는 흐름',
    },
    {
      title: '균형 잡힌 해석형',
      description: '감정과 사실을 함께 살피며, 서두르지 않고 차분하게 의미를 해석하는 편입니다.',
      mood: '공감과 현실감이 균형 있게 섞인 흐름',
    },
    {
      title: '담백한 확인형',
      description: '추측보다는 명시적인 표현과 상황의 사실성을 우선 보며 해석하는 편입니다.',
      mood: '감정보다 명료함과 안정감을 중시하는 흐름',
    },
  ],
  t: [
    {
      title: '구조 설계형',
      description: '기준과 우선순위를 빠르게 세우고, 복잡한 상황도 분해해 판단하는 데 강합니다.',
      mood: '논리와 구조가 선명한 판단 흐름',
    },
    {
      title: '현실 조율형',
      description: '실행 가능성과 사람의 흐름을 함께 보며, 무리 없는 방향을 찾아가는 편입니다.',
      mood: '실용성과 균형감이 살아 있는 판단 흐름',
    },
    {
      title: '관계 고려형',
      description: '논리 못지않게 받아들이는 사람의 감정과 분위기도 함께 고려하며 선택하는 편입니다.',
      mood: '정서적 수용성과 판단이 함께 가는 흐름',
    },
  ],
};

export function calculateQuizTotals(questions: Question[], answers: QuizAnswer[]): QuizTotals {
  const answerMap = new Map(answers.map((answer) => [answer.questionId, answer.choiceId]));

  return questions.reduce<QuizTotals>(
    (acc, question) => {
      const selectedChoiceId = answerMap.get(question.id);
      const selectedChoice = question.choices.find((choice) => choice.id === selectedChoiceId);

      if (!selectedChoice) {
        return acc;
      }

      return {
        fScore: acc.fScore + selectedChoice.fScore,
        tScore: acc.tScore + selectedChoice.tScore,
        answeredCount: acc.answeredCount + 1,
      };
    },
    { fScore: 0, tScore: 0, answeredCount: 0 },
  );
}

export function getResultSummary(mode: QuizMode, totals: QuizTotals): ResultSummary {
  const summaries = resultMap[mode];
  const delta = mode === 'f' ? totals.fScore - totals.tScore : totals.tScore - totals.fScore;

  if (delta >= 18) {
    return summaries[0];
  }

  if (delta >= 6) {
    return summaries[1];
  }

  return summaries[2];
}
