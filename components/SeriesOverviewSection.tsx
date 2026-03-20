import type { Route } from 'next';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

import { getSeriesDefinition, getSeriesModeConfigs } from '@/data/series';
import { uiMessages } from '@/data/i18n/messages';
import { getSeriesTypesHref } from '@/lib/series';
import { Locale } from '@/lib/i18n/config';
import { SeriesKey } from '@/types/series';

import { ModeCard } from './ModeCard';

interface SeriesOverviewSectionProps {
  locale: Locale;
  series: SeriesKey;
}

export function SeriesOverviewSection({ locale, series }: SeriesOverviewSectionProps) {
  const seriesDefinition = getSeriesDefinition(locale, series);
  const modeConfigs = getSeriesModeConfigs(locale, series);
  const messages = uiMessages[locale];

  return (
    <section className="flex flex-1 flex-col gap-8 py-3 sm:gap-10 sm:py-8">
      <div className={`glass-panel relative overflow-hidden rounded-[2.25rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14 ${seriesDefinition.surfaceClass}`}>
        <div className="brand-chip mb-5">
          <Sparkles className="h-4 w-4" />
          {seriesDefinition.content.eyebrow}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/82 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.22em] text-plum/76 shadow-sm">
            {seriesDefinition.badge}
          </span>
          <span className="rounded-full bg-plum/8 px-3 py-1 text-xs font-medium text-plum/72">{seriesDefinition.content.label}</span>
        </div>
        <h1 className="mt-5 text-balance font-serif text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
          {seriesDefinition.content.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-ink/72 sm:text-lg">{seriesDefinition.content.description}</p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {[seriesDefinition.content.questionCount, seriesDefinition.content.estimatedTime, seriesDefinition.content.topicSummary].map((item) => (
            <span key={item} className="rounded-full border border-white/65 bg-white/72 px-3.5 py-2 text-sm text-plum/80">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-6">
          <Link
            href={getSeriesTypesHref(locale, series) as Route}
            className="interactive-card inline-flex items-center justify-center rounded-full border border-plum/12 bg-white/84 px-5 py-3 text-sm font-medium text-plum hover:bg-white"
          >
            {messages.header.typesTab}
          </Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {modeConfigs.map((config) => (
          <ModeCard key={config.mode} config={config} locale={locale} />
        ))}
      </div>
    </section>
  );
}
