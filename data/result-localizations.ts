import { resultProfiles } from '@/data/results';
import { Locale } from '@/lib/i18n/config';
import { ResultProfile, ResultType } from '@/types/quiz';

const localizedResultOverrides: Partial<Record<Locale, Partial<Record<ResultType, Partial<ResultProfile>>>>> = {
  ja: {
    f_empathy: { subtitle: '心の温度を先に受け取る繊細な人' },
    f_nuance: { subtitle: '表情と文脈のあいだを自然に読み取るタイプ' },
    f_warmth: { subtitle: '人と人の空気をやわらかく整えるスタイル' },
    t_calm: { subtitle: '感情に流されず状況を整えて見る人' },
    t_criteria: { subtitle: '先に基準を置いてから動く構造型' },
    t_structure: { subtitle: '問題をほどいて組み直すのが得意なタイプ' },
    b_balance: { subtitle: '共感と判断の重さを並べて持てる人' },
    b_steady: { subtitle: 'やさしいのに芯がぶれないバランス型' },
    b_bridge: { subtitle: '人と構造のあいだをつなぐブリッジ型' },
  },
  'zh-TW': {
    f_empathy: { subtitle: '先感受到人心溫度的細膩類型' },
    f_nuance: { subtitle: '自然讀懂表情與脈絡之間細節的人' },
    f_warmth: { subtitle: '擅長溫柔照看人際氛圍的風格' },
    t_calm: { subtitle: '不被情緒推著走、會先整理情境的人' },
    t_criteria: { subtitle: '會先建立判斷標準再行動的結構型' },
    t_structure: { subtitle: '擅長拆解問題再重新組裝的類型' },
    b_balance: { subtitle: '能把共感與判斷放在同一條線上的人' },
    b_steady: { subtitle: '溫柔但內在很穩的平衡型' },
    b_bridge: { subtitle: '連接人與結構之間的橋樑型' },
  },
  en: {
    f_empathy: { subtitle: 'A gentle reader of emotional warmth' },
    f_nuance: { subtitle: 'A natural interpreter of subtle context' },
    f_warmth: { subtitle: 'A soft curator of relational atmosphere' },
    t_calm: { subtitle: 'A calm sorter of messy situations' },
    t_criteria: { subtitle: 'A type that sets criteria before moving' },
    t_structure: { subtitle: 'A problem-solver who thinks in structure' },
    b_balance: { subtitle: 'A balanced reader between heart and logic' },
    b_steady: { subtitle: 'A gentle interpreter with a steady core' },
    b_bridge: { subtitle: 'A bridge between people and structure' },
  },
};

export function getLocalizedResultProfiles(locale: Locale): Record<ResultType, ResultProfile> {
  const overrides = localizedResultOverrides[locale] ?? {};

  return Object.fromEntries(
    Object.entries(resultProfiles).map(([type, profile]) => [
      type,
      {
        ...profile,
        ...overrides[type as ResultType],
      },
    ]),
  ) as Record<ResultType, ResultProfile>;
}
