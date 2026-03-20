import type { Route } from 'next';
import Link from 'next/link';
import { ReactNode } from 'react';

import { uiMessages } from '@/data/i18n/messages';
import { getSeriesDefinition, getSeriesList } from '@/data/series';
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

function getHeaderCopy(locale: Locale) {
  if (locale === 'ko') {
    return { home: '메인 홈', seriesHub: '시리즈 허브' };
  }

  if (locale === 'ja') {
    return { home: 'メインホーム', seriesHub: 'シリーズハブ' };
  }

  if (locale === 'zh-TW') {
    return { home: '主首頁', seriesHub: '系列中心' };
  }

  return { home: 'Main home', seriesHub: 'Series hub' };
}

export function Layout({ children, locale, activeNav, series, contextTitle }: LayoutProps) {
  const messages = uiMessages[locale];
  const isTypesActive = activeNav === 'types';
  const seriesDefinition = series ? getSeriesDefinition(locale, series) : null;
  const seriesList = getSeriesList(locale);
  const copy = getHeaderCopy(locale);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-soft-grid blur-3xl" />
      <div className="absolute left-[-6rem] top-16 -z-10 h-72 w-72 rounded-full bg-[#a06e90]/20 blur-3xl" />
      <div className="absolute right-[-6rem] top-12 -z-10 h-80 w-80 rounded-full bg-[#6983b0]/18 blur-3xl" />
      <div className="absolute inset-x-0 bottom-[-9rem] -z-10 h-72 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(255,255,255,0))] blur-3xl" />

      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5 sm:px-8 sm:py-7 lg:px-12">
        <header className="mb-6 rounded-[1.9rem] border border-white/10 bg-[linear-gradient(135deg,rgba(20,19,28,0.82),rgba(40,31,51,0.74),rgba(74,58,92,0.64))] px-4 py-4 shadow-float backdrop-blur-xl sm:px-5 sm:py-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <Link href={`/${locale}` as Route} className="brand-chip border-white/10 bg-white/10 px-3.5 py-2 text-xs font-medium tracking-[0.24em] text-white sm:text-sm">
                  F와 T 사이
                </Link>
                <p className="hidden text-sm text-white/62 lg:block">{messages.header.tagline}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/${locale}` as Route}
                  className="inline-flex min-h-[2.8rem] items-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm font-medium text-white/78 transition hover:bg-white/10 hover:text-white"
                >
                  {series ? copy.seriesHub : copy.home}
                </Link>
                {seriesList.map((item) => {
                  const isActive = item.key === series;

                  return (
                    <Link
                      key={item.key}
                      href={getSeriesHomeHref(locale, item.key) as Route}
                      className={`inline-flex min-h-[2.8rem] items-center rounded-full px-4 py-2 text-sm font-medium transition ${
                        isActive
                          ? 'bg-white text-ink shadow-soft'
                          : 'border border-white/12 bg-white/6 text-white/78 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {item.content.label}
                    </Link>
                  );
                })}
                {seriesDefinition ? (
                  <Link
                    href={getSeriesTypesHref(locale, seriesDefinition.key) as Route}
                    className={`inline-flex min-h-[2.8rem] items-center rounded-full px-4 py-2 text-sm font-medium transition ${
                      isTypesActive
                        ? 'bg-gradient-to-r from-[#f2d7e5] to-white text-ink shadow-soft'
                        : 'border border-white/12 bg-white/6 text-white/78 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {messages.header.typesTab}
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="flex items-center justify-end">
              <LanguageSwitcher locale={locale} label={messages.localeSwitcher.label} />
            </div>
          </div>
        </header>
        {series && activeNav ? <PageContextHeader locale={locale} series={series} activeNav={activeNav} contextTitle={contextTitle} /> : null}
        {children}
      </main>
    </div>
  );
}
