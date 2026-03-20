import type { Route } from 'next';
import Link from 'next/link';
import { ArrowRight, Compass, Layers3, TimerReset } from 'lucide-react';

import { uiMessages } from '@/data/i18n/messages';
import { getSeriesQuizHubHref, getSeriesTypesHref } from '@/lib/series';
import { Locale } from '@/lib/i18n/config';
import { SeriesKey } from '@/types/series';

interface SeriesHubCardProps {
  locale: Locale;
  series: {
    key: SeriesKey;
    badge: string;
    accentClass: string;
    surfaceClass: string;
    content: {
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
    };
  };
  companionSeriesLabel?: string;
}

function getMetricLabels(locale: Locale) {
  if (locale === 'ko') {
    return {
      questions: '문항 수',
      time: '예상 시간',
      focus: '리포트 성격',
      topic: '무엇을 읽는지',
      bestFor: '추천하는 상황',
      includes: '리포트 구성',
      browse: '시리즈 둘러보기',
      next: '다음으로 이어보기',
      independent: '독립된 시리즈',
    };
  }

  if (locale === 'ja') {
    return {
      questions: '設問数',
      time: '所要時間',
      focus: 'レポートの性格',
      topic: '読み取ること',
      bestFor: 'おすすめの場面',
      includes: 'レポート構成',
      browse: 'シリーズを見る',
      next: '次に続ける',
      independent: '独立したシリーズ',
    };
  }

  if (locale === 'zh-TW') {
    return {
      questions: '題數',
      time: '時間',
      focus: '報告類型',
      topic: '閱讀重點',
      bestFor: '推薦情境',
      includes: '報告內容',
      browse: '瀏覽系列',
      next: '下一步延伸',
      independent: '獨立系列',
    };
  }

  return {
    questions: 'Questions',
    time: 'Time',
    focus: 'Report style',
    topic: 'What it reads',
    bestFor: 'Best for',
    includes: 'What’s inside',
    browse: 'Browse series',
    next: 'Continue with',
    independent: 'Independent series',
  };
}

export function SeriesHubCard({ locale, series, companionSeriesLabel }: SeriesHubCardProps) {
  const labels = getMetricLabels(locale);
  const messages = uiMessages[locale];

  return (
    <article className={`glass-panel overflow-hidden rounded-[2rem] border border-white/75 p-5 shadow-soft sm:p-6 ${series.surfaceClass}`}>
      <div className="flex h-full flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/82 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.22em] text-plum/76 shadow-sm">
            {series.badge}
          </span>
          <span className="rounded-full bg-plum/8 px-3 py-1 text-xs font-medium text-plum/72">{series.content.label}</span>
          <span className="rounded-full border border-white/75 bg-white/66 px-3 py-1 text-[0.68rem] font-medium tracking-[0.16em] text-plum/62">
            {labels.independent}
          </span>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-plum/54">{series.content.eyebrow}</p>
          <h2 className="text-3xl font-semibold text-ink sm:text-[2.15rem]">{series.content.title}</h2>
          <p className="text-base font-medium leading-7 text-plum/82">{series.content.summaryLine}</p>
          <p className="max-w-2xl text-sm leading-7 text-ink/70 sm:text-base">{series.content.description}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-[1.35rem] border border-white/70 bg-white/74 px-4 py-3 shadow-sm">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-plum/54">{labels.questions}</p>
            <p className="mt-2 text-base font-semibold text-ink">{series.content.questionCount}</p>
          </div>
          <div className="rounded-[1.35rem] border border-white/70 bg-white/74 px-4 py-3 shadow-sm">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-plum/54">{labels.time}</p>
            <p className="mt-2 text-base font-semibold text-ink">{series.content.estimatedTime}</p>
          </div>
          <div className="rounded-[1.35rem] border border-white/70 bg-white/74 px-4 py-3 shadow-sm">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-plum/54">{labels.focus}</p>
            <p className="mt-2 text-base font-semibold text-ink">{series.content.accentLabel}</p>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          <div className="rounded-[1.55rem] border border-white/72 bg-white/78 px-4 py-4 shadow-soft">
            <div className="flex items-center gap-2 text-plum/70">
              <Compass className="h-4 w-4" />
              <p className="text-[0.68rem] uppercase tracking-[0.18em]">{labels.topic}</p>
            </div>
            <p className="mt-2 text-sm leading-7 text-ink/72 sm:text-base">{series.content.topicSummary}</p>
          </div>
          <div className="rounded-[1.55rem] border border-white/72 bg-white/78 px-4 py-4 shadow-soft">
            <div className="flex items-center gap-2 text-plum/70">
              <TimerReset className="h-4 w-4" />
              <p className="text-[0.68rem] uppercase tracking-[0.18em]">{labels.bestFor}</p>
            </div>
            <p className="mt-2 text-sm leading-7 text-ink/72 sm:text-base">{series.content.recommendedFor}</p>
          </div>
        </div>

        <div className="rounded-[1.55rem] border border-white/72 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(248,243,255,0.86))] px-4 py-4 shadow-soft">
          <div className="flex items-center gap-2 text-plum/70">
            <Layers3 className="h-4 w-4" />
            <p className="text-[0.68rem] uppercase tracking-[0.18em]">{labels.includes}</p>
          </div>
          <p className="mt-2 text-sm leading-7 text-ink/72 sm:text-base">{series.content.reportIncludes}</p>
          {companionSeriesLabel ? (
            <p className="mt-3 text-xs font-medium tracking-[0.06em] text-plum/58 sm:text-sm">
              {labels.next}: {companionSeriesLabel}
            </p>
          ) : null}
        </div>

        <div className="mt-auto flex flex-col gap-3 sm:flex-row">
          <Link
            href={getSeriesQuizHubHref(locale, series.key) as Route}
            className={`interactive-card inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r px-5 py-3 text-sm font-semibold text-white shadow-soft ${series.accentClass}`}
          >
            {messages.modes.start}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={getSeriesTypesHref(locale, series.key) as Route}
            className="interactive-card inline-flex items-center justify-center rounded-full border border-plum/12 bg-white/84 px-5 py-3 text-sm font-medium text-plum hover:bg-white"
          >
            {labels.browse}
          </Link>
        </div>
      </div>
    </article>
  );
}
