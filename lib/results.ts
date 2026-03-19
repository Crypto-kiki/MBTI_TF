import { Mode, ResultSummary } from '@/types/quiz';

const resultMap: Record<Mode, ResultSummary[]> = {
  f: [
    {
      title: '섬세한 공감형',
      description: '감정의 결을 빠르게 포착하며, 관계 속 숨은 신호를 세심하게 읽는 편입니다.',
      mood: '따뜻한 해석과 공감이 강점인 타입',
    },
    {
      title: '균형 잡힌 해석형',
      description: '감정과 사실을 함께 살피며, 성급하지 않게 상황을 이해하려는 태도가 돋보입니다.',
      mood: '차분한 공감과 현실감의 균형',
    },
    {
      title: '직접 확인형',
      description: '추측보다 확인을 선호하며, 감정보다 명시적인 표현을 신뢰하는 경향이 있습니다.',
      mood: '명료함을 중시하는 담백한 해석',
    },
  ],
  t: [
    {
      title: '구조 설계형',
      description: '판단 기준을 먼저 세우고, 복잡한 상황도 체계적으로 정리하는 데 강합니다.',
      mood: '논리와 구조를 선명하게 세우는 타입',
    },
    {
      title: '현실 조율형',
      description: '논리와 실행 가능성을 함께 보며, 무리 없는 판단을 만들어가는 편입니다.',
      mood: '실용성과 균형을 갖춘 판단 감각',
    },
    {
      title: '직관 실행형',
      description: '빠르게 결론을 내리고 움직이며, 이후에 조정하는 방식이 자연스러운 편입니다.',
      mood: '속도감 있는 판단과 실행 중심',
    },
  ],
};

export function getResultSummary(mode: Mode, score: number): ResultSummary {
  const summaries = resultMap[mode];

  if (score >= 6) {
    return summaries[0];
  }

  if (score >= 4) {
    return summaries[1];
  }

  return summaries[2];
}
