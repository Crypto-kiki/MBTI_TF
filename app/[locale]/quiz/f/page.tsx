import { Layout } from '@/components/Layout';
import { QuizFlow } from '@/components/QuizFlow';
import { uiMessages } from '@/data/i18n/messages';
import { getLocalizedQuestions } from '@/data/quizzes';
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config';

interface LocalizedFQuizPageProps {
  params: { locale: string };
}

export default function LocalizedFQuizPage({ params }: LocalizedFQuizPageProps) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;

  return (
    <Layout locale={locale}>
      <div className="flex flex-1 items-center py-8">
        <QuizFlow locale={locale} mode="f" modeLabel={uiMessages[locale].modes.f.title} questions={getLocalizedQuestions(locale, 'f')} />
      </div>
    </Layout>
  );
}
