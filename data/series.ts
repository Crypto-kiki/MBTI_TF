import { uiMessages } from '@/data/i18n/messages';
import { localizedLoveModeContent } from '@/data/i18n/series-ui';
import { getModeConfigs as getBaseModeConfigs } from '@/data/modes';
import { getLoveQuestions } from '@/data/love-questions';
import { getLocalizedLoveResultProfiles, getLoveResultProfile } from '@/data/love-results';
import { getLocalizedQuestions as getBaseLocalizedQuestions } from '@/data/quizzes';
import { getLocalizedResultProfiles as getBaseLocalizedResultProfiles, getResultProfile as getBaseResultProfile } from '@/data/results';
import { Locale } from '@/lib/i18n/config';
import { coreResultTypes, defaultLoveResultType, defaultResultType, loveResultTypes, Question, QuizMode, ResultProfile, ResultType } from '@/types/quiz';
import { SeriesKey, seriesKeys } from '@/types/series';

interface LocalizedSeriesContent {
  label: string;
  title: string;
  description: string;
  questionCount: string;
  estimatedTime: string;
  topicSummary: string;
  eyebrow: string;
  accentLabel: string;
  summaryLine: string;
  recommendedFor: string;
  reportIncludes: string;
}

interface SeriesDefinition {
  key: SeriesKey;
  badge: string;
  accentClass: string;
  surfaceClass: string;
  localized: Record<Locale, LocalizedSeriesContent>;
}

const seriesDefinitions: Record<SeriesKey, SeriesDefinition> = {
  core: {
    key: 'core',
    badge: 'CORE',
    accentClass: 'from-rose-100 via-white to-lilac',
    surfaceClass: 'bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(246,233,230,0.9),rgba(235,228,248,0.88))]',
    localized: {
      ko: {
        label: '기본편',
        title: '기본편',
        description: '감정과 판단 사이에서 내가 상황을 읽는 기본 해석 습관을 살펴보는 시리즈예요.',
        questionCount: '10문항 × 2모드',
        estimatedTime: '약 3분',
        topicSummary: '일상적 해석 습관 · 공감 · 판단 균형',
        eyebrow: '가장 먼저 해보기 좋은 기본 시리즈',
        accentLabel: '일상 해석',
        summaryLine: '감정과 판단 사이의 기본 성향 리포트',
        recommendedFor: '서비스를 처음 시작하거나, 내 기본 해석 습관부터 가볍게 보고 싶을 때 좋아요.',
        reportIncludes: '두 개의 짧은 모드로 공감, 판단, 해석 균형을 차분하게 정리해요.',
      },
      ja: {
        label: '基本編',
        title: '基本編',
        description: '感情と判断のあいだで、自分が状況を読む基本的な癖を見つめるシリーズです。',
        questionCount: '10問 × 2モード',
        estimatedTime: '約3分',
        topicSummary: '日常の読み取り習慣・共感・判断のバランス',
        eyebrow: '最初に触れやすいベーシックシリーズ',
        accentLabel: '日常の読み取り',
        summaryLine: '感情と判断のあいだにある基本傾向レポート',
        recommendedFor: 'まず最初に始めたいときや、自分の基本的な読み取り癖を軽く見たいときに向いています。',
        reportIncludes: '短い2つのモードで、共感・判断・解釈のバランスを見ていきます。',
      },
      'zh-TW': {
        label: '基本篇',
        title: '基本篇',
        description: '用來觀察你在感受與判斷之間，平常如何解讀情境的基礎系列。',
        questionCount: '10題 × 2模式',
        estimatedTime: '約3分鐘',
        topicSummary: '日常解讀習慣 · 共感 · 判準平衡',
        eyebrow: '最適合先開始的基礎系列',
        accentLabel: '日常解讀',
        summaryLine: '感受與判斷之間的基礎傾向報告',
        recommendedFor: '適合第一次使用服務，或想先快速理解自己日常解讀習慣的時候。',
        reportIncludes: '用兩個簡短模式整理你的共感、判準與解讀平衡。',
      },
      en: {
        label: 'Core',
        title: 'Core',
        description: 'A foundational series for noticing how you usually read situations between feeling and judgment.',
        questionCount: '10 questions × 2 modes',
        estimatedTime: 'About 3 min',
        topicSummary: 'Everyday interpretation · empathy · judgment balance',
        eyebrow: 'The best place to start',
        accentLabel: 'Everyday reading',
        summaryLine: 'A foundational report on how you usually read situations.',
        recommendedFor: 'Best when you are new here or want a quick read on your baseline interpretation style first.',
        reportIncludes: 'Two short modes that map empathy, judgment, and your everyday balance between them.',
      },
    },
  },
  love: {
    key: 'love',
    badge: 'LOVE',
    accentClass: 'from-[#f9dbe5] via-white to-[#f4d9ee]',
    surfaceClass: 'bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(249,219,229,0.9),rgba(244,217,238,0.88))]',
    localized: {
      ko: {
        label: '연애편',
        title: '연애편',
        description: '한 번의 종합 테스트로 싸움 반응, 연락 텀 감각, 서운함 포인트, 애정 표현, 안정감 기준, 회복 방식까지 함께 읽어내는 시리즈예요.',
        questionCount: '30문항 종합 테스트',
        estimatedTime: '약 7분',
        topicSummary: '갈등 반응 · 연락 감각 · 애정 표현 · 회복 방식',
        eyebrow: '연애 속 F/T 성향을 한 번에 읽는 종합 리포트',
        accentLabel: '연애 리포트',
        summaryLine: '연애 속 갈등, 연락, 서운함, 표현 방식을 읽는 종합 리포트',
        recommendedFor: '기본 성향을 넘어서 관계 안에서 내가 어떻게 반응하는지 더 입체적으로 보고 싶을 때 좋아요.',
        reportIncludes: '한 번의 30문항 테스트로 갈등 반응, 연락 감각, 애정 표현, 안정감, 회복 흐름까지 함께 읽어요.',
      },
      ja: {
        label: '恋愛編',
        title: '恋愛編',
        description: 'ひとつの総合テストで、ケンカの反応、連絡感覚、愛情表現、安心の基準、回復のしかたまで読み解くシリーズです。',
        questionCount: '30問 総合テスト',
        estimatedTime: '約7分',
        topicSummary: '衝突反応・連絡感覚・愛情表現・回復スタイル',
        eyebrow: '恋愛での F/T をひとつのレポートにまとめるシリーズ',
        accentLabel: '恋愛レポート',
        summaryLine: '恋愛での衝突・連絡・愛情表現を読む総合レポート',
        recommendedFor: '基本傾向だけでなく、関係の中で自分がどう反応するかを立体的に見たいときに向いています。',
        reportIncludes: '30問の一回完結テストで、衝突反応・連絡感覚・愛情表現・安心・回復までまとめて見ます。',
      },
      'zh-TW': {
        label: '戀愛篇',
        title: '戀愛篇',
        description: '用一次完整測試，同時讀出衝突反應、聯絡節奏、受傷點、愛意表達、安心感與修復方式。',
        questionCount: '30題綜合測試',
        estimatedTime: '約7分鐘',
        topicSummary: '衝突反應 · 聯絡感覺 · 愛意表達 · 修復方式',
        eyebrow: '把戀愛中的 F/T 傾向整理成一份完整報告',
        accentLabel: '戀愛報告',
        summaryLine: '讀懂你在戀愛中的衝突、聯絡與表達方式的完整報告',
        recommendedFor: '適合想從基礎傾向再往下看，理解自己在關係裡如何反應的人。',
        reportIncludes: '一次 30 題測試，同時整理衝突反應、聯絡節奏、愛意表達、安心感與修復方式。',
      },
      en: {
        label: 'Love',
        title: 'Love',
        description: 'One integrated relationship test that reads conflict style, contact rhythm, hurt triggers, affection language, reassurance, and repair patterns together.',
        questionCount: '30-question relationship report',
        estimatedTime: 'About 7 min',
        topicSummary: 'Conflict response · contact rhythm · affection · repair',
        eyebrow: 'A single report for your F/T style in love',
        accentLabel: 'Love report',
        summaryLine: 'An integrated report on conflict, contact, hurt, and affection in relationships.',
        recommendedFor: 'Best when you want a fuller relationship-specific read beyond your baseline style.',
        reportIncludes: 'One 30-question report that reads conflict response, contact rhythm, affection, reassurance, and repair together.',
      },
    },
  },
};

export function isSeriesKey(value: string): value is SeriesKey {
  return (seriesKeys as readonly string[]).includes(value);
}

export function getSeriesDefinition(locale: Locale, series: SeriesKey) {
  const definition = seriesDefinitions[series];
  return {
    ...definition,
    content: definition.localized[locale],
  };
}

export function getSeriesList(locale: Locale) {
  return seriesKeys.map((series) => getSeriesDefinition(locale, series));
}

export function getSeriesModeConfigs(locale: Locale, series: SeriesKey) {
  if (series === 'love') {
    const content = localizedLoveModeContent[locale];

    return [
      {
        mode: 'f' as const,
        title: content.title,
        subtitle: content.subtitle,
        description: content.description,
        accentClass: 'from-[#f9dbe5] via-white to-[#f4d9ee]',
        route: `/${locale}/series/${series}/quiz/f`,
      },
    ];
  }

  return getBaseModeConfigs(locale).map((config) => ({
    ...config,
    route: `/${locale}/series/${series}/quiz/${config.mode}`,
  }));
}

export function getSeriesQuestions(series: SeriesKey, locale: Locale, mode: QuizMode): Question[] {
  if (series === 'love') {
    void mode;
    return getLoveQuestions(locale);
  }

  return getBaseLocalizedQuestions(locale, mode);
}

export function getSeriesResultProfile(series: SeriesKey, locale: Locale, type: ResultType): ResultProfile {
  if (series === 'love' && (loveResultTypes as readonly string[]).includes(type)) {
    return getLoveResultProfile(locale, type as (typeof loveResultTypes)[number]);
  }

  return getBaseResultProfile(locale, type as (typeof coreResultTypes)[number]);
}

export function getSeriesLocalizedResultProfiles(series: SeriesKey, locale: Locale): Record<ResultType, ResultProfile> {
  return series === 'love'
    ? (getLocalizedLoveResultProfiles(locale) as Record<ResultType, ResultProfile>)
    : (getBaseLocalizedResultProfiles(locale) as Record<ResultType, ResultProfile>);
}

export function getSeriesResultTypes(series: SeriesKey): readonly ResultType[] {
  return series === 'love' ? loveResultTypes : coreResultTypes;
}

export function getSeriesDefaultResultType(series: SeriesKey): ResultType {
  return series === 'love' ? defaultLoveResultType : defaultResultType;
}

export function isSeriesResultType(series: SeriesKey, value: string): value is ResultType {
  return (getSeriesResultTypes(series) as readonly string[]).includes(value);
}

export function isSeriesQuizMode(series: SeriesKey, mode: string): mode is QuizMode {
  return series === 'love' ? mode === 'f' : mode === 'f' || mode === 't';
}

export function getSeriesPrimaryMode(series: SeriesKey): QuizMode {
  return series === 'love' ? 'f' : 'f';
}

export function getSeriesModeLabel(locale: Locale, mode: QuizMode, series?: SeriesKey) {
  if (series === 'love') {
    return localizedLoveModeContent[locale].modeLabel;
  }

  return uiMessages[locale].modes[mode].title;
}
