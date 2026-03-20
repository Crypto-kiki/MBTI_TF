export const seriesKeys = ['core', 'love'] as const;

export type SeriesKey = (typeof seriesKeys)[number];
