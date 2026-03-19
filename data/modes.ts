import { ModeConfig } from '@/types/quiz';

export const modeConfigs: ModeConfig[] = [
  {
    mode: 'f',
    title: 'F 모드',
    subtitle: '감정 해석 · 공감 훈련',
    description:
      '표정과 문장 사이의 감정을 읽어내며, 관계 속 해석 습관을 부드럽게 점검해보세요.',
    accentClass: 'from-rose-100 via-white to-lilac',
    route: '/quiz/f',
  },
  {
    mode: 't',
    title: 'T 모드',
    subtitle: '논리 판단 · 구조화 훈련',
    description:
      '정보를 정리하고 기준을 세우며, 상황을 차분하게 구조화하는 연습을 시작해보세요.',
    accentClass: 'from-sky-100 via-white to-sage',
    route: '/quiz/t',
  },
];
