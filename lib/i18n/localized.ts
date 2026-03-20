import { defaultLocale, Locale, locales } from '@/lib/i18n/config';

export type LocalizedRecord<T> = Record<Locale, T>;
export type LocalizedOverrides<T> = Partial<Record<Locale, T>>;

export function getLocalizedValue<T>(record: Partial<Record<Locale, T>>, locale: Locale, fallbackLocale: Locale = defaultLocale): T {
  const localized = record[locale];
  if (localized !== undefined) {
    return localized;
  }

  const fallback = record[fallbackLocale];
  if (fallback !== undefined) {
    return fallback;
  }

  for (const nextLocale of locales) {
    const value = record[nextLocale];
    if (value !== undefined) {
      return value;
    }
  }

  throw new Error(`Missing localized value for locale: ${locale}`);
}

export function mergeLocalizedObject<T extends object>(base: T, override?: Partial<T>): T {
  return override ? { ...base, ...override } : base;
}
