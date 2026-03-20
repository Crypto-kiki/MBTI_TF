import { Locale } from '@/lib/i18n/config';

export const localizedLoveModeContent: Record<Locale, { title: string; subtitle: string; description: string; modeLabel: string }> = {
  ko: {
    title: '종합 연애 리포트',
    subtitle: '30문항으로 갈등, 연락, 서운함, 애정 표현, 안정감, 회복 방식을 한 번에 읽어요.',
    description: '세부 테스트로 쪼개지지 않는 한 번의 연애 종합 테스트예요.',
    modeLabel: '연애 종합 리포트',
  },
  ja: {
    title: '恋愛総合レポート',
    subtitle: '30問で衝突、連絡感覚、寂しさ、愛情表現、安心感、回復の流れをまとめて読みます。',
    description: '細かいテストに分かれない、一回完結の恋愛総合テストです。',
    modeLabel: '恋愛総合レポート',
  },
  'zh-TW': {
    title: '戀愛綜合報告',
    subtitle: '用 30 題一次讀出衝突、聯絡節奏、受傷點、愛意表達、安全感與修復方式。',
    description: '這不是拆成多個小測驗，而是一份一次完成的戀愛整體測驗。',
    modeLabel: '戀愛綜合報告',
  },
  en: {
    title: 'Love Relationship Report',
    subtitle: 'A single 30-question read on conflict, contact, hurt, affection, reassurance, and repair.',
    description: 'A single integrated relationship test rather than multiple split quizzes.',
    modeLabel: 'Love Relationship Report',
  },
};
