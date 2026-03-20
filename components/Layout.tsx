import type { Route } from 'next';
import Link from 'next/link';
import { ReactNode } from 'react';

import { getSeriesDefinition } from '@/data/series';
import { uiMessages } from '@/data/i18n/messages';
import { Locale } from '@/lib/i18n/config';
import { SeriesKey, seriesKeys } from '@/types/series';

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
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-soft-grid blur-3xl" />
      <div className="absolute left-[-6rem] top-16 -z-10 h-72 w-72 rounded-full bg-[#a06e90]/12 blur-3xl" />
      <div className="absolute right-[-6rem] top-12 -z-10 h-80 w-80 rounded-full bg-[#6983b0]/12 blur-3xl" />
      <div className="absolute inset-x-0 bottom-[-9rem] -z-10 h-72 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),rgba(255,255,255,0))] blur-3xl" />

      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5 sm:px-8 sm:py-7 lg:px-12">
        <header className="mb-6 rounded-[1.9rem] border border-white/10 bg-[linear-gradient(135deg,rgba(10,11,22,0.94),rgba(18,19,34,0.92),rgba(35,28,55,0.9))] px-4 py-4 shadow-float backdrop-blur-2xl sm:px-5 sm:py-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <Link href={`/${locale}` as Route} className="brand-chip border-white/12 bg-white/8 px-3.5 py-2 text-xs font-medium tracking-[0.24em] text-white sm:text-sm">
                  F와 T 사이
                </Link>
              </div>

              <nav className="flex flex-wrap items-center gap-2" aria-label="Global navigation">
                {seriesKeys.map((itemKey) => {
                  const item = getSeriesDefinition(locale, itemKey);
                  const isActive = itemKey === series;

                  return (
                    <Link key={itemKey} href={`/${locale}/series/${itemKey}` as Route} className={isActive ? 'button-primary min-h-[2.8rem] px-4 py-2 text-sm' : 'button-secondary min-h-[2.8rem] px-4 py-2 text-sm'}>
                      {item.content.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center justify-end gap-3">
              <LanguageSwitcher locale={locale} label={uiMessages[locale].localeSwitcher.label} />
            </div>
          </div>
        </header>
        {series && activeNav ? <PageContextHeader locale={locale} series={series} activeNav={activeNav} contextTitle={contextTitle} /> : null}
        {children}
      </main>
    </div>
  );
}
