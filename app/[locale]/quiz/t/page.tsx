import { redirect } from 'next/navigation';

import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config';

interface LocalizedTQuizPageProps {
  params: { locale: string };
}

export default function LocalizedTQuizPage({ params }: LocalizedTQuizPageProps) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  redirect(`/${locale}/series/core/quiz/t`);
}
