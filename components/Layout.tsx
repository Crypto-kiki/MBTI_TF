import type { Route } from 'next';
import Link from 'next/link';
import { ReactNode } from 'react';

import { uiMessages } from '@/data/i18n/messages';
import { getSeriesDefinition } from '@/data/series';
import { Locale } from '@/lib/i18n/config';
import { getSeriesHomeHref, getSeriesTypesHref } from '@/lib/series';
import { SeriesKey } from '@/types/series';

import { LanguageSwitcher } from './LanguageSwitcher';
import { PageContextHeader } from './PageContextHeader';

interface LayoutProps {
  children: ReactNode;
  locale: Locale;
  activeNav?: 'overview' | 'quiz' | 'types' | 'result';
  series?: SeriesKey;
  contextTitle?: string;
}

export function Layout({ children, locale, activeNav, series, contextTitle }: LayoutProps) {
  const messages = uiMessages[locale];
  const isTypesActive = activeNav === 'types';
  const seriesDefinition = series ? getSeriesDefinition(locale, series) : null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-soft-grid blur-3xl" />
      <div className="absolute left-[-4rem] top-24 -z-10 h-56 w-56 rounded-full bg-rose-100/55 blur-3xl" />
      <div className="absolute right-[-5rem] top-16 -z-10 h-64 w-64 rounded-full bg-lilac/45 blur-3xl" />

      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-5 sm:px-8 sm:py-7 lg:px-12">
        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Link href={(series ? getSeriesHomeHref(locale, series) : `/${locale}`) as Route} className="brand-chip px-3.5 py-2 text-xs font-medium tracking-[0.24em] sm:text-sm">
              F와 T 사이
            </Link>
            <Link
              href={(series ? getSeriesTypesHref(locale, series) : getSeriesTypesHref(locale, 'core')) as Route}
              className={`inline-flex items-center rounded-full px-3.5 py-2 text-xs font-medium tracking-[0.08em] shadow-soft transition sm:text-sm ${
                isTypesActive
                  ? 'border border-plum/16 bg-plum/8 text-plum'
                  : 'border border-white/70 bg-white/68 text-plum/80 hover:bg-white'
              }`}
            >
              {messages.header.typesTab}
            </Link>
            {seriesDefinition ? (
              <span className="hidden rounded-full bg-white/76 px-3 py-1 text-xs font-medium text-plum/68 shadow-sm lg:inline-flex">
                {seriesDefinition.content.label}
              </span>
            ) : null}
            <p className="hidden text-sm text-plum/60 xl:block">{messages.header.tagline}</p>
          </div>
          <LanguageSwitcher locale={locale} label={messages.localeSwitcher.label} />
        </header>
        {series && activeNav ? <PageContextHeader locale={locale} series={series} activeNav={activeNav} contextTitle={contextTitle} /> : null}
        {children}
      </main>
    </div>
  );
}
