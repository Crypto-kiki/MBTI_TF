import { HeroSection } from '@/components/HeroSection';
import { Layout } from '@/components/Layout';
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config';

interface LocalizedHomePageProps {
  params: { locale: string };
}

export default function LocalizedHomePage({ params }: LocalizedHomePageProps) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;

  return (
    <Layout locale={locale}>
      <HeroSection locale={locale} />
    </Layout>
  );
}
