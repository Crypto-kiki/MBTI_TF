import { createLoveReportSection, getLoveResultProfile, loveClusterTags, loveResultAxisMap } from '@/data/love-results';
import type { Locale } from '@/lib/i18n/config';
import { LoveResultType, QuizTotals, ReportSection, ResolvedQuizResult } from '@/types/quiz';

const axisThreshold = 8;

const loveAxisProfiles: Record<'f' | 't' | 'balanced', LoveResultType[]> = {
  f: ['love_resonant_anchor', 'love_midnight_listener', 'love_heartbeat_reader', 'love_tender_guardian'],
  t: ['love_signal_cartographer', 'love_boundary_strategist', 'love_clear_current', 'love_repair_architect'],
  balanced: ['love_steady_weaver', 'love_gentle_negotiator'],
};

const reportDimensions = {
  conflict: { leftTags: ['conflict_emotion'], rightTags: ['conflict_logic'] },
  contact: { leftTags: ['contact_frequency'], rightTags: ['contact_stability'] },
  hurt: { leftTags: ['hurt_expression'], rightTags: ['hurt_priority'] },
  affection: { leftTags: ['affection_words'], rightTags: ['affection_actions'] },
  reassurance: { leftTags: ['reassurance_consistency', 'conflict_emotion'], rightTags: ['reassurance_consistency', 'contact_stability'] },
  repair: { leftTags: ['repair_time'], rightTags: ['repair_explanation'] },
} as const;

function getAxis(totals: QuizTotals): 'f' | 't' | 'balanced' {
  const diff = totals.totalFScore - totals.totalTScore;

  if (diff >= axisThreshold) {
    return 'f';
  }

  if (diff <= -axisThreshold) {
    return 't';
  }

  return 'balanced';
}

function getTagScore(tagCounts: Record<string, number>, tags: readonly string[]) {
  return tags.reduce((sum, tag) => sum + (tagCounts[tag] ?? 0), 0);
}

function getClusterScore(tagCounts: Record<string, number>, type: LoveResultType) {
  return getTagScore(tagCounts, loveClusterTags[type]);
}

function pickLoveResultType(axis: 'f' | 't' | 'balanced', tagCounts: Record<string, number>) {
  return loveAxisProfiles[axis].reduce((best, current) => {
    const bestScore = getClusterScore(tagCounts, best);
    const currentScore = getClusterScore(tagCounts, current);
    return currentScore > bestScore ? current : best;
  }, loveAxisProfiles[axis][0]);
}

function getDimensionScores(tagCounts: Record<string, number>) {
  return Object.fromEntries(
    Object.entries(reportDimensions).map(([key, dimension]) => [key, {
      leftScore: getTagScore(tagCounts, dimension.leftTags),
      rightScore: getTagScore(tagCounts, dimension.rightTags),
      dominantTags: [...dimension.leftTags, ...dimension.rightTags].filter((tag) => (tagCounts[tag] ?? 0) > 0).slice(0, 3),
    }]),
  ) as Record<keyof typeof reportDimensions, { leftScore: number; rightScore: number; dominantTags: string[] }>;
}

function createReportSections(locale: Locale, totals: QuizTotals): ReportSection[] {
  const dimensionScores = getDimensionScores(totals.tagCounts);

  return (Object.keys(reportDimensions) as Array<keyof typeof reportDimensions>).map((key) => {
    const dimension = dimensionScores[key];
    return createLoveReportSection(locale, key, dimension.leftScore, dimension.rightScore, dimension.dominantTags);
  });
}

function getDominantTags(tagCounts: Record<string, number>) {
  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 6)
    .map(([tag]) => tag);
}

export function resolveLoveResultFromType(locale: Locale, type: LoveResultType): ResolvedQuizResult {
  return {
    axis: loveResultAxisMap[type],
    dominantTags: loveClusterTags[type].slice(0, 3),
    profile: getLoveResultProfile(locale, type),
    totals: { totalFScore: 0, totalTScore: 0, answeredCount: 0, tagCounts: {} },
  };
}

export function resolveLoveQuizResult(locale: Locale, totals: QuizTotals): ResolvedQuizResult {
  const axis = getAxis(totals);
  const type = pickLoveResultType(axis, totals.tagCounts);

  return {
    axis,
    dominantTags: getDominantTags(totals.tagCounts),
    profile: getLoveResultProfile(locale, type),
    totals,
    reportSections: createReportSections(locale, totals),
  };
}
