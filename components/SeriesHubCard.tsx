import type { Route } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
    };
  };
}

function getMetricLabels(locale: Locale) {
  if (locale === 'ko') {
    return { questions: '문항 수', time: '예상 시간', focus: '주제', topic: '측정 포인트' };
  }

  if (locale === 'ja') {
    return { questions: '設問数', time: '所要時間', focus: 'テーマ', topic: '見るポイント' };
  }

  if (locale === 'zh-TW') {
    return { questions: '題數', time: '時間', focus: '主題', topic: '測量重點' };
  }

  return { questions: 'Questions', time: 'Time', focus: 'Focus', topic: 'What it reads' };
}

export function SeriesHubCard({ locale, series }: SeriesHubCardProps) {
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
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-plum/54">{series.content.eyebrow}</p>
          <h2 className="mt-2 text-3xl font-semibold text-ink sm:text-[2.15rem]">{series.content.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/70 sm:text-base">{series.content.description}</p>
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

        <div className="rounded-[1.55rem] border border-white/72 bg-white/78 px-4 py-4 shadow-soft">
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-plum/54">{labels.topic}</p>
          <p className="mt-2 text-sm leading-7 text-ink/72 sm:text-base">{series.content.topicSummary}</p>
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
            {messages.header.typesTab}
          </Link>
        </div>
      </div>
    </article>
  );
}
