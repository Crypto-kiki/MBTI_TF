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
      <div className="absolute inset-x-0 top-0 -z-10 h-[22rem] bg-soft-grid opacity-70 blur-2xl" />
      <div className="absolute left-[-6rem] top-16 -z-10 h-72 w-72 rounded-full bg-[#ceb3c7]/20 blur-3xl" />
      <div className="absolute right-[-6rem] top-12 -z-10 h-80 w-80 rounded-full bg-[#c7d4ea]/18 blur-3xl" />
      <div className="absolute inset-x-0 bottom-[-9rem] -z-10 h-72 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.75),rgba(255,255,255,0))] blur-3xl" />

      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5 sm:px-8 sm:py-7 lg:px-12">
        <header className="mb-6 rounded-[1.6rem] border border-plum/8 bg-white/88 px-4 py-4 shadow-soft backdrop-blur-xl sm:px-5 sm:py-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <Link href={`/${locale}` as Route} className="brand-chip border-plum/10 bg-white px-3.5 py-2 text-xs font-semibold tracking-[0.2em] text-ink sm:text-sm">
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
