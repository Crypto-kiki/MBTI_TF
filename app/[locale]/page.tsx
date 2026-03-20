import { Layout } from '@/components/Layout';
import { SeriesHubSection } from '@/components/SeriesHubSection';
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config';

interface LocalizedHomePageProps {
  params: { locale: string };
}

export default function LocalizedHomePage({ params }: LocalizedHomePageProps) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;

  return (
    <Layout locale={locale}>
      <SeriesHubSection locale={locale} />
    </Layout>
  );
}
