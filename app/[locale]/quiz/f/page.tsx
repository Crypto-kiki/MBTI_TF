import { redirect } from 'next/navigation';

import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config';

interface LocalizedFQuizPageProps {
  params: { locale: string };
}

export default function LocalizedFQuizPage({ params }: LocalizedFQuizPageProps) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  redirect(`/${locale}/series/core/quiz/f`);
}
