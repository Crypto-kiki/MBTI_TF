import { fQuestions } from '@/data/f-questions';
import { tQuestions } from '@/data/t-questions';
import { Locale } from '@/lib/i18n/config';
import { Question, QuizMode } from '@/types/quiz';

const localizedContexts: Record<Locale, Record<QuizMode, string>> = {
  ko: {
    f: '말보다 분위기와 감정의 결에 집중해보세요.',
    t: '상황을 정리하는 기준과 흐름에 집중해보세요.',
  },
  ja: {
    f: '言葉よりも空気や感情のニュアンスに意識を向けてみてください。',
    t: '状況を整理する基準と流れに意識を向けてみてください。',
  },
  'zh-TW': {
    f: '請把注意力放在語氣、氛圍與情緒細節上。',
    t: '請把注意力放在整理情境的基準與邏輯上。',
  },
  en: {
    f: 'Focus on the emotional texture and atmosphere behind the words.',
    t: 'Focus on the criteria and structure behind the situation.',
  },
};

export function getLocalizedQuestions(locale: Locale, mode: QuizMode): Question[] {
  const baseQuestions = mode === 'f' ? fQuestions : tQuestions;
  const localizedContext = localizedContexts[locale][mode];

  return baseQuestions.map((question) => ({
    ...question,
    context: locale === 'ko' ? question.context : localizedContext,
  }));
}
