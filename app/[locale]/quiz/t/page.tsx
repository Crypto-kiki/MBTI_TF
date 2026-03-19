import { Layout } from '@/components/Layout';
import { QuizFlow } from '@/components/QuizFlow';
import { uiMessages } from '@/data/i18n/messages';
import { getLocalizedQuestions } from '@/data/quizzes';
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config';

interface LocalizedTQuizPageProps {
  params: { locale: string };
}

export default function LocalizedTQuizPage({ params }: LocalizedTQuizPageProps) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;

  return (
    <Layout locale={locale}>
      <div className="flex flex-1 items-center py-8">
        <QuizFlow locale={locale} mode="t" modeLabel={uiMessages[locale].modes.t.title} questions={getLocalizedQuestions(locale, 't')} />
      </div>
    </Layout>
  );
}
