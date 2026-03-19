import type { Metadata } from 'next';

import { Layout } from '@/components/Layout';
import { ResultCatalogCard } from '@/components/ResultCatalogCard';
import { uiMessages } from '@/data/i18n/messages';
import { getLocalizedResultProfiles } from '@/data/results';
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config';
import { resultTypes } from '@/types/quiz';

interface AllTypesPageProps {
  params: { locale: string };
}

function getLocaleOrFallback(locale: string): Locale {
  return isLocale(locale) ? locale : defaultLocale;
}

export async function generateMetadata({ params }: AllTypesPageProps): Promise<Metadata> {
  const locale = getLocaleOrFallback(params.locale);
  const messages = uiMessages[locale];

  return {
    title: `${messages.catalog.title} · ${messages.metadata.title}`,
    description: messages.catalog.description,
  };
}

export default function AllTypesPage({ params }: AllTypesPageProps) {
  const locale = getLocaleOrFallback(params.locale);
  const messages = uiMessages[locale];
  const profiles = getLocalizedResultProfiles(locale);

  return (
    <Layout locale={locale}>
      <section className="flex flex-1 flex-col gap-6 py-3 sm:gap-8 sm:py-8">
        <div className="glass-panel rounded-[2.25rem] bg-hero-glow px-6 py-8 sm:px-8 sm:py-10">
          <h1 className="text-balance font-serif text-4xl font-semibold leading-[1.06] text-ink sm:text-5xl">
            {messages.catalog.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-ink/72 sm:text-lg">{messages.catalog.description}</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {resultTypes.map((type) => (
            <ResultCatalogCard
              key={type}
              locale={locale}
              profile={profiles[type]}
              strengthsLabel={messages.result.strengths}
              tipsLabel={messages.result.tips}
              viewLabel={messages.catalog.viewLabel}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
}
