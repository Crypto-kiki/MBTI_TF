'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Languages } from 'lucide-react';

import { localeLabels, locales, type Locale } from '@/lib/i18n/config';

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
}

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const restPath = pathname.replace(new RegExp(`^/${locale}`), '') || '';

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/70 bg-white/78 px-2 py-1.5 shadow-soft backdrop-blur-sm">
      <div className="hidden items-center gap-2 pl-2 text-xs uppercase tracking-[0.2em] text-plum/60 sm:flex">
        <Languages className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="flex items-center gap-1">
        {locales.map((nextLocale) => {
          const href = `/${nextLocale}${restPath}` || `/${nextLocale}`;
          const isActive = nextLocale === locale;

          return (
            <Link
              key={nextLocale}
              href={href}
              className={`rounded-full px-2.5 py-1.5 text-xs font-medium transition sm:px-3 ${
                isActive ? 'bg-plum text-white shadow-sm' : 'text-plum/75 hover:bg-plum/8'
              }`}
            >
              {localeLabels[nextLocale]}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
