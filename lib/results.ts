import { getResultProfile } from '@/data/results';
import { Choice, Question, QuizAnswer, QuizMode, QuizTotals, ResolvedQuizResult, ResultType } from '@/types/quiz';
import type { Locale } from '@/lib/i18n/config';

const axisThreshold = 6;

const clusterTags = {
  f_empathy: ['공감', '배려', '경청', '지지', '수용', '안심', '관심', '격려'],
  f_nuance: ['세심함', '해석', '맥락', '감정읽기', '숨은감정', '추론', '관찰', '감지', '회상'],
  f_warmth: ['분위기', '관계', '조율', '이해', '유연함', '온도감', '대기', '기다림', '접근'],
  f_shelter: ['안심', '수용', '지지', '기다림', '배려', '관심', '관계', '격려'],
  f_harmony: ['조율', '분위기', '이해', '관계', '유연함', '존중', '배려', '조화'],
  t_calm: ['실용', '효율', '실행', '기능', '결론', '평가', '영향도', '권한'],
  t_criteria: ['기준', '판단', '명확성', '정의', '규칙', '책임', '객관', '확인', '절차'],
  t_structure: ['구조', '분석', '정리', '우선순위', '계획', '문제해결', '동선', '쟁점', '원인'],
  t_signal: ['확인', '명확성', '객관', '절차', '정의', '판단', '기능', '기준'],
  t_drive: ['실행', '효율', '우선순위', '영향도', '권한', '계획', '결론', '문제해결'],
  b_balance: ['균형', '조율', '배려', '이해', '관계', '존중'],
  b_steady: ['신중함', '유보', '거리두기', '판단유보', '명료함', '확인'],
  b_bridge: ['역할', '행동', '정리', '실행', '경청', '기준', '조화'],
  b_attune: ['조화', '경청', '이해', '균형', '관계', '행동', '배려'],
  b_anchor: ['신중함', '명료함', '기준', '존중', '확인', '거리두기', '판단유보'],
} as const satisfies Record<ResultType, string[]>;

const axisProfiles: Record<'f' | 't' | 'balanced', ResultType[]> = {
  f: ['f_empathy', 'f_nuance', 'f_warmth', 'f_shelter', 'f_harmony'],
  t: ['t_calm', 't_criteria', 't_structure', 't_signal', 't_drive'],
  balanced: ['b_balance', 'b_steady', 'b_bridge', 'b_attune', 'b_anchor'],
};

const emptyTotals: QuizTotals = {
  totalFScore: 0,
  totalTScore: 0,
  answeredCount: 0,
  tagCounts: {},
};

export function getResultHref(locale: Locale, resultType: ResultType) {
  return `/${locale}/result/${resultType}`;
}

export function getAxisFromResultType(resultType: ResultType): 'f' | 't' | 'balanced' {
  if (resultType.startsWith('f_')) {
    return 'f';
  }

  if (resultType.startsWith('t_')) {
    return 't';
  }

  return 'balanced';
}

export function getModeFromResultType(resultType: ResultType, explicitMode?: QuizMode): QuizMode {
  if (explicitMode) {
    return explicitMode;
  }

  return resultType.startsWith('t_') ? 't' : 'f';
}

export function resolveResultFromType(locale: Locale, resultType: ResultType): ResolvedQuizResult {
  return {
    axis: getAxisFromResultType(resultType),
    dominantTags: clusterTags[resultType].slice(0, 3),
    profile: getResultProfile(locale, resultType),
    totals: emptyTotals,
  };
}

export function calculateQuizTotals(questions: Question[], answers: QuizAnswer[]): QuizTotals {
  const answerMap = new Map(answers.map((answer) => [answer.questionId, answer.choiceId]));

  return questions.reduce<QuizTotals>(
    (acc, question) => {
      const selectedChoiceId = answerMap.get(question.id);
      const selectedChoice = question.choices.find((choice) => choice.id === selectedChoiceId);

      if (!selectedChoice) {
        return acc;
      }

      const nextTagCounts = { ...acc.tagCounts };
      selectedChoice.tags.forEach((tag) => {
        nextTagCounts[tag] = (nextTagCounts[tag] ?? 0) + 1;
      });

      return {
        totalFScore: acc.totalFScore + selectedChoice.fScore,
        totalTScore: acc.totalTScore + selectedChoice.tScore,
        answeredCount: acc.answeredCount + 1,
        tagCounts: nextTagCounts,
      };
    },
    { totalFScore: 0, totalTScore: 0, answeredCount: 0, tagCounts: {} },
  );
}

export function serializeTagCounts(tagCounts: Record<string, number>) {
  return encodeURIComponent(JSON.stringify(tagCounts));
}

export function parseTagCounts(serialized?: string) {
  if (!serialized) {
    return {};
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(serialized));

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {};
    }

    return Object.entries(parsed).reduce<Record<string, number>>((acc, [key, value]) => {
      if (typeof value === 'number' && Number.isFinite(value)) {
        acc[key] = value;
      }
      return acc;
    }, {});
  } catch {
    return {};
  }
}

export function getTopTags(tagCounts: Record<string, number>, limit = 3) {
  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([tag]) => tag);
}

function resolveAxis(totals: QuizTotals): 'f' | 't' | 'balanced' {
  const diff = totals.totalFScore - totals.totalTScore;

  if (diff >= axisThreshold) {
    return 'f';
  }

  if (diff <= -axisThreshold) {
    return 't';
  }

  return 'balanced';
}

function getClusterScore(profileType: ResultType, tagCounts: Record<string, number>) {
  return clusterTags[profileType].reduce((sum, tag) => sum + (tagCounts[tag] ?? 0), 0);
}

function pickProfileType(axis: 'f' | 't' | 'balanced', tagCounts: Record<string, number>): ResultType {
  const candidates = axisProfiles[axis];

  return candidates.reduce((best, current) => {
    const bestScore = getClusterScore(best, tagCounts);
    const currentScore = getClusterScore(current, tagCounts);
    return currentScore > bestScore ? current : best;
  }, candidates[0]);
}

export function resolveQuizResult(locale: Locale, totals: QuizTotals): ResolvedQuizResult {
  const axis = resolveAxis(totals);
  const profileType = pickProfileType(axis, totals.tagCounts);

  return {
    axis,
    dominantTags: getTopTags(totals.tagCounts),
    profile: getResultProfile(locale, profileType),
    totals,
  };
}

export function getSelectedChoices(questions: Question[], answers: QuizAnswer[]) {
  const answerMap = new Map(answers.map((answer) => [answer.questionId, answer.choiceId]));

  return questions.flatMap((question) => {
    const selectedChoiceId = answerMap.get(question.id);
    const selectedChoice = question.choices.find((choice) => choice.id === selectedChoiceId);
    return selectedChoice ? [selectedChoice] : [];
  });
}

export function aggregateChoices(choices: Choice[]): QuizTotals {
  return choices.reduce<QuizTotals>(
    (acc, choice) => {
      const nextTagCounts = { ...acc.tagCounts };
      choice.tags.forEach((tag) => {
        nextTagCounts[tag] = (nextTagCounts[tag] ?? 0) + 1;
      });

      return {
        totalFScore: acc.totalFScore + choice.fScore,
        totalTScore: acc.totalTScore + choice.tScore,
        answeredCount: acc.answeredCount + 1,
        tagCounts: nextTagCounts,
      };
    },
    { totalFScore: 0, totalTScore: 0, answeredCount: 0, tagCounts: {} },
  );
}
