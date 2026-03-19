import { redirect } from 'next/navigation';

import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config';

interface LegacyTypesPageProps {
  params: { locale: string };
}

export default function LegacyTypesPage({ params }: LegacyTypesPageProps) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  redirect(`/${locale}/series/core/types`);
}
