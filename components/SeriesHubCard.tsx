import type { Route } from 'next';
import Link from 'next/link';
import { ArrowRight, Compass, TimerReset } from 'lucide-react';

import { uiMessages } from '@/data/i18n/messages';
import { Locale } from '@/lib/i18n/config';
import { getSeriesQuizHubHref, getSeriesTypesHref } from '@/lib/series';
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
}

function getMetricLabels(locale: Locale) {
  if (locale === 'ko') {
    return {
      questions: '문항 수',
      time: '예상 시간',
      topic: '무엇을 읽는지',
      bestFor: '추천하는 상황',
      browse: '전체 유형 보기',
    };
  }

  if (locale === 'ja') {
    return {
      questions: '設問数',
      time: '所要時間',
      topic: '読み取ること',
      bestFor: 'おすすめの場面',
      browse: '全タイプを見る',
    };
  }

  if (locale === 'zh-TW') {
    return {
      questions: '題數',
      time: '時間',
      topic: '閱讀重點',
      bestFor: '推薦情境',
      browse: '查看全部類型',
    };
  }

  return {
    questions: 'Questions',
    time: 'Time',
    topic: 'What it reads',
    bestFor: 'Best for',
    browse: 'Browse all types',
  };
}

export function SeriesHubCard({ locale, series }: SeriesHubCardProps) {
  const labels = getMetricLabels(locale);
  const messages = uiMessages[locale];

  return (
    <article className={`glass-panel overflow-hidden rounded-[2rem] border border-plum/8 p-5 shadow-soft sm:p-6 ${series.surfaceClass}`}>
      <div className="flex h-full flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="pill-accent">{series.badge}</span>
          <span className="pill-muted">{series.content.label}</span>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-plum/44">{series.content.eyebrow}</p>
          <h2 className="text-3xl font-semibold text-ink sm:text-[2.15rem]">{series.content.title}</h2>
          <p className="text-base font-medium leading-7 text-ink/86">{series.content.summaryLine}</p>
          <p className="max-w-2xl text-sm leading-7 text-ink/68 sm:text-base">{series.content.description}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="metric-tile">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-plum/46">{labels.questions}</p>
            <p className="mt-2 text-base font-semibold text-ink">{series.content.questionCount}</p>
          </div>
          <div className="metric-tile">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-plum/46">{labels.time}</p>
            <p className="mt-2 text-base font-semibold text-ink">{series.content.estimatedTime}</p>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          <div className="surface-panel-muted px-4 py-4">
            <div className="flex items-center gap-2 text-plum/74">
              <Compass className="h-4 w-4" />
              <p className="text-[0.68rem] uppercase tracking-[0.18em]">{labels.topic}</p>
            </div>
            <p className="mt-3 text-sm leading-7 text-ink/76 sm:text-base">{series.content.topicSummary}</p>
          </div>
          <div className="surface-panel-muted px-4 py-4">
            <div className="flex items-center gap-2 text-plum/74">
              <TimerReset className="h-4 w-4" />
              <p className="text-[0.68rem] uppercase tracking-[0.18em]">{labels.bestFor}</p>
            </div>
            <p className="mt-3 text-sm leading-7 text-ink/76 sm:text-base">{series.content.recommendedFor}</p>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3 sm:flex-row">
          <Link href={getSeriesQuizHubHref(locale, series.key) as Route} className="button-primary">
            {messages.modes.start}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href={getSeriesTypesHref(locale, series.key) as Route} className="button-secondary">
            {labels.browse}
          </Link>
        </div>
      </div>
    </article>
  );
}
