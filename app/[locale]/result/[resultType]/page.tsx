import { redirect } from 'next/navigation';

import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config';

interface LegacyDynamicResultPageProps {
  params: { locale: string; resultType: string };
  searchParams?: Record<string, string | undefined>;
}

export default function LegacyDynamicResultPage({ params, searchParams }: LegacyDynamicResultPageProps) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const nextSearch = new URLSearchParams();

  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    if (value) nextSearch.set(key, value);
  });

  const query = nextSearch.toString();
  redirect(`/${locale}/series/core/result/${params.resultType}${query ? `?${query}` : ''}`);
}
