import { Locale } from '@/lib/i18n/config';
import { ResultType } from '@/types/quiz';
import { SeriesKey } from '@/types/series';

export const defaultSeries: SeriesKey = 'core';

export function getSeriesHomeHref(locale: Locale, series: SeriesKey) {
  return `/${locale}/series/${series}`;
}

export function getSeriesQuizHubHref(locale: Locale, series: SeriesKey) {
  return `/${locale}/series/${series}/quiz`;
}

export function getSeriesTypesHref(locale: Locale, series: SeriesKey) {
  return `/${locale}/series/${series}/types`;
}

export function getSeriesQuizModeHref(locale: Locale, series: SeriesKey, mode: 'f' | 't') {
  return `/${locale}/series/${series}/quiz/${mode}`;
}

export function getSeriesResultHref(locale: Locale, series: SeriesKey, resultType: ResultType) {
  return `/${locale}/series/${series}/result/${resultType}`;
}
