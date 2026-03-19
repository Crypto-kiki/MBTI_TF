export const locales = ['ko', 'ja', 'zh-TW', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ko';

export const localeLabels: Record<Locale, string> = {
  ko: '한국어',
  ja: '日本語',
  'zh-TW': '繁體中文',
  en: 'English',
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function withLocale(locale: Locale, path = '') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${normalizedPath === '/' ? '' : normalizedPath}`;
}
