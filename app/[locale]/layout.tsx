import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { uiMessages } from '@/data/i18n/messages';
import { defaultLocale, isLocale, locales } from '@/lib/i18n/config';

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const metadata = uiMessages[locale].metadata;

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  if (!isLocale(params.locale)) {
    redirect(`/${defaultLocale}`);
  }

  return children;
}
