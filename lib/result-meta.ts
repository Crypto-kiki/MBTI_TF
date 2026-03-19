import { getResultProfile } from '@/data/results';
import type { Locale } from '@/lib/i18n/config';
import type { ResultType } from '@/types/quiz';

const OG_SERVICE_NAME = 'F와 T 사이';

const ogPalettes: Record<ResultType, { from: string; to: string; accent: string; mist: string; ink: string }> = {
  f_empathy: { from: '#F6D6E1', to: '#D6C0EF', accent: '#8C647F', mist: '#FFF4F8', ink: '#322332' },
  f_nuance: { from: '#D9D8F9', to: '#C9B9EC', accent: '#6E6593', mist: '#F8F6FF', ink: '#2E2640' },
  f_warmth: { from: '#F7DDD7', to: '#E7BED5', accent: '#9A6B77', mist: '#FFF7F8', ink: '#35252C' },
  t_calm: { from: '#D6DDEA', to: '#A9BAD0', accent: '#60738C', mist: '#F6F9FF', ink: '#243042' },
  t_criteria: { from: '#D8DBEE', to: '#C0CCDD', accent: '#5F6786', mist: '#F8FAFF', ink: '#253046' },
  t_structure: { from: '#D5E1E0', to: '#ADC1BF', accent: '#587675', mist: '#F5FAF9', ink: '#213534' },
  b_balance: { from: '#E8D9EF', to: '#D7C5E0', accent: '#85639A', mist: '#FBF7FD', ink: '#312539' },
  b_steady: { from: '#F1DADB', to: '#D8D0E8', accent: '#8B6A86', mist: '#FFF8F9', ink: '#342833' },
  b_bridge: { from: '#DBDEEF', to: '#C8DFDD', accent: '#66798B', mist: '#F8FBFC', ink: '#25323A' },
};

function clampText(value: string, maxLength: number) {
  return value.length > maxLength ? `${value.slice(0, maxLength - 1).trim()}…` : value;
}

export function getResultShareMetadata(locale: Locale, resultType: ResultType) {
  const profile = getResultProfile(locale, resultType);
  const palette = ogPalettes[resultType];
  const subtitle = clampText(profile.subtitle, 48);
  const description = clampText(profile.description, 110);
  const imagePath = `/${locale}/result/${resultType}/opengraph-image`;

  return {
    serviceName: OG_SERVICE_NAME,
    title: `${profile.title} · ${OG_SERVICE_NAME}`,
    description,
    ogTitle: `${OG_SERVICE_NAME} · ${profile.title}`,
    ogDescription: subtitle,
    imagePath,
    profile,
    subtitle,
    palette,
  };
}
