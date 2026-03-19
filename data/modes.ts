import { uiMessages } from '@/data/i18n/messages';
import { Locale } from '@/lib/i18n/config';
import { ModeConfig } from '@/types/quiz';

export function getModeConfigs(locale: Locale): ModeConfig[] {
  const messages = uiMessages[locale].modes;

  return [
    {
      mode: 'f',
      title: messages.f.title,
      subtitle: messages.f.subtitle,
      description: messages.f.description,
      accentClass: 'from-rose-100 via-white to-lilac',
      route: `/${locale}/quiz/f`,
    },
    {
      mode: 't',
      title: messages.t.title,
      subtitle: messages.t.subtitle,
      description: messages.t.description,
      accentClass: 'from-sky-100 via-white to-sage',
      route: `/${locale}/quiz/t`,
    },
  ];
}
