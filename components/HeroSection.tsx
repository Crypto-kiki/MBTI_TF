import { Flower2, Sparkles } from 'lucide-react';

import { uiMessages } from '@/data/i18n/messages';
import { getModeConfigs } from '@/data/modes';
import { Locale } from '@/lib/i18n/config';

import { ModeCard } from './ModeCard';

interface HeroSectionProps {
  locale: Locale;
}

export function HeroSection({ locale }: HeroSectionProps) {
  const messages = uiMessages[locale];
  const modeConfigs = getModeConfigs(locale);

  return (
    <section className="flex flex-1 flex-col gap-8 py-3 sm:gap-10 sm:py-8">
      <div className="glass-panel relative overflow-hidden rounded-[2.25rem] bg-hero-glow px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div className="absolute right-6 top-6 hidden rounded-full border border-white/70 bg-white/60 p-3 text-plum/80 shadow-soft sm:block">
          <Flower2 className="h-5 w-5" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="brand-chip mb-5">
              <Sparkles className="h-4 w-4" />
              {messages.hero.eyebrow}
            </div>
            <h1 className="text-balance font-serif text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
              {messages.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-balance text-base leading-8 text-ink/72 sm:text-lg">
              {messages.hero.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {messages.hero.moodPoints.map((point) => (
                <span key={point} className="rounded-full border border-white/65 bg-white/70 px-3.5 py-2 text-sm text-plum/80">
                  {point}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-3 rounded-[1.75rem] border border-white/65 bg-white/70 p-5 shadow-soft backdrop-blur-sm sm:grid-cols-3 lg:grid-cols-1">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-plum/55">{messages.hero.cards.moodLabel}</p>
              <p className="mt-2 text-lg font-semibold text-ink">{messages.hero.cards.moodValue}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-plum/55">{messages.hero.cards.experienceLabel}</p>
              <p className="mt-2 text-lg font-semibold text-ink">{messages.hero.cards.experienceValue}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-plum/55">{messages.hero.cards.resultLabel}</p>
              <p className="mt-2 text-lg font-semibold text-ink">{messages.hero.cards.resultValue}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {modeConfigs.map((config) => (
          <ModeCard key={config.mode} config={config} locale={locale} />
        ))}
      </div>
    </section>
  );
}
