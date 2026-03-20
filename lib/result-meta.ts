import { getSeriesResultProfile } from '@/data/series';
import { defaultSeries } from '@/lib/series';
import type { Locale } from '@/lib/i18n/config';
import type { ResultType } from '@/types/quiz';
import type { SeriesKey } from '@/types/series';

const OG_SERVICE_NAME = 'F와 T 사이';

const ogPalettes: Record<ResultType, { from: string; to: string; accent: string; mist: string; ink: string }> = {
  f_empathy: { from: '#F6D6E1', to: '#D6C0EF', accent: '#8C647F', mist: '#FFF4F8', ink: '#322332' },
  f_nuance: { from: '#D9D8F9', to: '#C9B9EC', accent: '#6E6593', mist: '#F8F6FF', ink: '#2E2640' },
  f_warmth: { from: '#F7DDD7', to: '#E7BED5', accent: '#9A6B77', mist: '#FFF7F8', ink: '#35252C' },
  f_shelter: { from: '#F2DDE3', to: '#D7CBE9', accent: '#8C6A7E', mist: '#FFF8FA', ink: '#33262F' },
  f_harmony: { from: '#F8E1D6', to: '#E7C7DA', accent: '#9B6E79', mist: '#FFF8F8', ink: '#382730' },
  t_calm: { from: '#D6DDEA', to: '#A9BAD0', accent: '#60738C', mist: '#F6F9FF', ink: '#243042' },
  t_criteria: { from: '#D8DBEE', to: '#C0CCDD', accent: '#5F6786', mist: '#F8FAFF', ink: '#253046' },
  t_structure: { from: '#D5E1E0', to: '#ADC1BF', accent: '#587675', mist: '#F5FAF9', ink: '#213534' },
  t_signal: { from: '#DCE2EF', to: '#BCC8DF', accent: '#5B6D8D', mist: '#F7FAFF', ink: '#263246' },
  t_drive: { from: '#D8E0E8', to: '#B6C5D2', accent: '#577085', mist: '#F6FAFC', ink: '#23313C' },
  b_balance: { from: '#E8D9EF', to: '#D7C5E0', accent: '#85639A', mist: '#FBF7FD', ink: '#312539' },
  b_steady: { from: '#F1DADB', to: '#D8D0E8', accent: '#8B6A86', mist: '#FFF8F9', ink: '#342833' },
  b_bridge: { from: '#DBDEEF', to: '#C8DFDD', accent: '#66798B', mist: '#F8FBFC', ink: '#25323A' },
  b_attune: { from: '#E4DDF0', to: '#D0DDE3', accent: '#717A96', mist: '#FAFCFD', ink: '#2D3441' },
  b_anchor: { from: '#E7DDE8', to: '#D7D6E5', accent: '#7E6E88', mist: '#FCFAFD', ink: '#312936' },
  love_resonant_anchor: { from: '#F7D9E8', to: '#E7C5E8', accent: '#9A617B', mist: '#FFF7FB', ink: '#3A2434' },
  love_midnight_listener: { from: '#ECDCF7', to: '#D9C8F0', accent: '#7C6799', mist: '#FCF8FF', ink: '#31283F' },
  love_heartbeat_reader: { from: '#F8E1D9', to: '#F0C8D9', accent: '#A06A79', mist: '#FFF8F8', ink: '#39262D' },
  love_tender_guardian: { from: '#F5DEE5', to: '#E8CFE0', accent: '#91677D', mist: '#FFF8FA', ink: '#382831' },
  love_signal_cartographer: { from: '#DBE1F1', to: '#C9D2EA', accent: '#61749A', mist: '#F7FAFF', ink: '#263247' },
  love_boundary_strategist: { from: '#DDE0F0', to: '#CFD4E7', accent: '#66708F', mist: '#F8FAFF', ink: '#2A3144' },
  love_clear_current: { from: '#DDE6EC', to: '#C9D8E0', accent: '#607C8B', mist: '#F7FBFC', ink: '#24343B' },
  love_repair_architect: { from: '#DBE4E2', to: '#C4D3D1', accent: '#5D7775', mist: '#F6FBFA', ink: '#233534' },
  love_steady_weaver: { from: '#E8DFF1', to: '#D9D5E9', accent: '#7A6E92', mist: '#FCFAFE', ink: '#312B39' },
  love_gentle_negotiator: { from: '#E4E0F2', to: '#D7E1E7', accent: '#707B97', mist: '#FBFCFE', ink: '#2F3441' },
};

function clampText(value: string, maxLength: number) {
  return value.length > maxLength ? `${value.slice(0, maxLength - 1).trim()}…` : value;
}

interface ResultShareSearchParams {
  mode?: string;
  totalFScore?: string;
  totalTScore?: string;
  answered?: string;
  tags?: string;
}

function buildShareImagePath(locale: Locale, resultType: ResultType, searchParams?: ResultShareSearchParams, series: SeriesKey = defaultSeries) {
  const query = new URLSearchParams();

  if (searchParams?.mode) query.set('mode', searchParams.mode);
  if (searchParams?.totalFScore) query.set('totalFScore', searchParams.totalFScore);
  if (searchParams?.totalTScore) query.set('totalTScore', searchParams.totalTScore);
  if (searchParams?.answered) query.set('answered', searchParams.answered);
  if (searchParams?.tags) query.set('tags', searchParams.tags);

  const basePath = `/${locale}/series/${series}/result/${resultType}/share-image`;
  const search = query.toString();
  return search ? `${basePath}?${search}` : basePath;
}

export function getResultShareMetadata(locale: Locale, resultType: ResultType, searchParams?: ResultShareSearchParams, series: SeriesKey = defaultSeries) {
  const profile = getSeriesResultProfile(series, locale, resultType);
  const palette = ogPalettes[resultType];
  const subtitle = clampText(profile.subtitle, 48);
  const description = clampText(profile.description, 110);
  const imagePath = buildShareImagePath(locale, resultType, searchParams, series);

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
