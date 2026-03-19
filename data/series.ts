import { uiMessages } from '@/data/i18n/messages';
import { getModeConfigs as getBaseModeConfigs } from '@/data/modes';
import { getLocalizedQuestions as getBaseLocalizedQuestions } from '@/data/quizzes';
import { getLocalizedResultProfiles as getBaseLocalizedResultProfiles, getResultProfile as getBaseResultProfile } from '@/data/results';
import { Locale } from '@/lib/i18n/config';
import { Question, QuizMode, ResultProfile, ResultType } from '@/types/quiz';
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
        questionCount: '10문항',
        estimatedTime: '약 3분',
        topicSummary: '일상적 해석 습관 · 공감 · 판단 균형',
        eyebrow: '가장 먼저 해보기 좋은 기본 시리즈',
        accentLabel: '일상 해석',
      },
      ja: {
        label: '基本編',
        title: '基本編',
        description: '感情と判断のあいだで、自分が状況を読む基本的な癖を見つめるシリーズです。',
        questionCount: '10問',
        estimatedTime: '約3分',
        topicSummary: '日常の読み取り習慣・共感・判断のバランス',
        eyebrow: '最初に触れやすいベーシックシリーズ',
        accentLabel: '日常の読み取り',
      },
      'zh-TW': {
        label: '基本篇',
        title: '基本篇',
        description: '用來觀察你在感受與判斷之間，平常如何解讀情境的基礎系列。',
        questionCount: '10題',
        estimatedTime: '約3分鐘',
        topicSummary: '日常解讀習慣 · 共感 · 判準平衡',
        eyebrow: '最適合先開始的基礎系列',
        accentLabel: '日常解讀',
      },
      en: {
        label: 'Core',
        title: 'Core',
        description: 'A foundational series for noticing how you usually read situations between feeling and judgment.',
        questionCount: '10 questions',
        estimatedTime: 'About 3 min',
        topicSummary: 'Everyday interpretation · empathy · judgment balance',
        eyebrow: 'The best place to start',
        accentLabel: 'Everyday reading',
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
        description: '관계가 가까워질수록 드러나는 감정 해석, 거리감, 표현 습관을 가볍게 살펴보는 시리즈예요.',
        questionCount: '10문항',
        estimatedTime: '약 3분',
        topicSummary: '연애 감정선 · 표현 방식 · 관계 온도 읽기',
        eyebrow: '가까운 관계의 해석 습관을 보는 시리즈',
        accentLabel: '연애 해석',
      },
      ja: {
        label: '恋愛編',
        title: '恋愛編',
        description: '距離が近い関係の中で表れやすい感情の読み方や表現の癖を見つめるシリーズです。',
        questionCount: '10問',
        estimatedTime: '約3分',
        topicSummary: '恋愛の感情線・表現・関係の温度',
        eyebrow: '近い関係での読み取りをみるシリーズ',
        accentLabel: '恋愛の読み取り',
      },
      'zh-TW': {
        label: '戀愛篇',
        title: '戀愛篇',
        description: '觀察在更親近的關係裡，你如何解讀情緒、距離感與表達方式的系列。',
        questionCount: '10題',
        estimatedTime: '約3分鐘',
        topicSummary: '戀愛情緒線 · 表達方式 · 關係溫度',
        eyebrow: '用來看親密關係解讀習慣的系列',
        accentLabel: '戀愛解讀',
      },
      en: {
        label: 'Love',
        title: 'Love',
        description: 'A relationship-focused series for noticing how emotion, distance, and expression show up in close connections.',
        questionCount: '10 questions',
        estimatedTime: 'About 3 min',
        topicSummary: 'Romantic cues · expression style · relational temperature',
        eyebrow: 'A closer-relationship reading series',
        accentLabel: 'Relationship reading',
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
  return getBaseModeConfigs(locale).map((config) => ({
    ...config,
    route: `/${locale}/series/${series}/quiz/${config.mode}`,
  }));
}

export function getSeriesQuestions(series: SeriesKey, locale: Locale, mode: QuizMode): Question[] {
  void series;
  return getBaseLocalizedQuestions(locale, mode);
}

export function getSeriesResultProfile(series: SeriesKey, locale: Locale, type: ResultType): ResultProfile {
  void series;
  return getBaseResultProfile(locale, type);
}

export function getSeriesLocalizedResultProfiles(series: SeriesKey, locale: Locale): Record<ResultType, ResultProfile> {
  void series;
  return getBaseLocalizedResultProfiles(locale);
}

export function getSeriesModeLabel(locale: Locale, mode: QuizMode) {
  return uiMessages[locale].modes[mode].title;
}
