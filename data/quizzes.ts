import { Mode, QuizQuestion } from '@/types/quiz';

export const quizData: Record<Mode, QuizQuestion[]> = {
  f: [
    {
      id: 'f-1',
      prompt: '친구가 “괜찮아”라고 말했지만 표정이 어두워 보입니다.',
      context: 'F 모드에서는 말 뒤에 숨어 있는 감정을 상상해보는 연습을 합니다.',
      choices: [
        { id: 'f-1-a', text: '괜찮지 않은 이유가 있을지 조심스럽게 묻는다.', score: 3 },
        { id: 'f-1-b', text: '조금 시간을 두고 편해질 때까지 기다린다.', score: 2 },
        { id: 'f-1-c', text: '말 그대로 괜찮다고 받아들인다.', score: 1 },
      ],
    },
    {
      id: 'f-2',
      prompt: '메시지 답장이 평소보다 짧을 때 먼저 떠오르는 해석은?',
      context: '정답보다 해석 습관을 살펴보기 위한 placeholder 문항입니다.',
      choices: [
        { id: 'f-2-a', text: '상대가 지쳐 있거나 여유가 없을 수 있다.', score: 3 },
        { id: 'f-2-b', text: '맥락을 더 봐야 판단할 수 있다.', score: 2 },
        { id: 'f-2-c', text: '나에게 마음이 식었을지도 모른다.', score: 1 },
      ],
    },
  ],
  t: [
    {
      id: 't-1',
      prompt: '회의 안건이 많고 시간이 부족할 때 가장 먼저 할 일은?',
      context: 'T 모드에서는 우선순위와 기준을 세우는 감각을 연습합니다.',
      choices: [
        { id: 't-1-a', text: '핵심 목표와 마감 영향이 큰 순서로 재정렬한다.', score: 3 },
        { id: 't-1-b', text: '일단 처음 안건부터 순서대로 본다.', score: 2 },
        { id: 't-1-c', text: '즉흥적으로 중요한 것 같아 보이는 항목부터 논의한다.', score: 1 },
      ],
    },
    {
      id: 't-2',
      prompt: '의견이 충돌하는 두 제안 중 하나를 선택해야 합니다.',
      context: 'placeholder 문항으로 결과 매핑 구조를 미리 보여줍니다.',
      choices: [
        { id: 't-2-a', text: '판단 기준을 먼저 합의한 뒤 비교한다.', score: 3 },
        { id: 't-2-b', text: '각 제안의 장단점을 메모하며 정리한다.', score: 2 },
        { id: 't-2-c', text: '더 자신 있게 말하는 사람의 제안을 따른다.', score: 1 },
      ],
    },
  ],
};
