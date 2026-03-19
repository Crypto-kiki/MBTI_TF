import Link from 'next/link';
import { ReactNode } from 'react';

import { uiMessages } from '@/data/i18n/messages';
import { Locale } from '@/lib/i18n/config';

import { LanguageSwitcher } from './LanguageSwitcher';

interface LayoutProps {
  children: ReactNode;
  locale: Locale;
}

export function Layout({ children, locale }: LayoutProps) {
  const messages = uiMessages[locale];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-soft-grid blur-3xl" />
      <div className="absolute left-[-4rem] top-24 -z-10 h-56 w-56 rounded-full bg-rose-100/55 blur-3xl" />
      <div className="absolute right-[-5rem] top-16 -z-10 h-64 w-64 rounded-full bg-lilac/45 blur-3xl" />

      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-5 sm:px-8 sm:py-7 lg:px-12">
        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/${locale}`} className="brand-chip px-3.5 py-2 text-xs font-medium tracking-[0.24em] sm:text-sm">
              F와 T 사이
            </Link>
            <p className="hidden text-sm text-plum/60 lg:block">{messages.header.tagline}</p>
          </div>
          <LanguageSwitcher locale={locale} label={messages.localeSwitcher.label} />
        </header>
        {children}
      </main>
    </div>
  );
}
