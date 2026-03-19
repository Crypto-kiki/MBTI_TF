import type { Metadata } from 'next';

import { Layout } from '@/components/Layout';
import { ResultCatalogExplorer } from '@/components/ResultCatalogExplorer';
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
    <Layout locale={locale} activeNav="types">
      <section className="flex flex-1 flex-col gap-6 py-3 sm:gap-8 sm:py-8">
        <div className="glass-panel rounded-[2.25rem] bg-hero-glow px-6 py-8 sm:px-8 sm:py-10">
          <h1 className="text-balance font-serif text-4xl font-semibold leading-[1.06] text-ink sm:text-5xl">
            {messages.catalog.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-plum sm:text-xl">{messages.catalog.lead}</p>
          <p className="mt-3 max-w-3xl text-base leading-8 text-ink/72 sm:text-lg">{messages.catalog.description}</p>
        </div>

        <ResultCatalogExplorer locale={locale} resultTypes={resultTypes} profiles={profiles} messages={messages.catalog} />
      </section>
    </Layout>
  );
}
