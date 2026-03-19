import type { Route } from 'next';
import Link from 'next/link';
import { ArrowRight, HeartHandshake, ScanSearch } from 'lucide-react';

import { uiMessages } from '@/data/i18n/messages';
import { Locale } from '@/lib/i18n/config';
import { ModeConfig } from '@/types/quiz';

interface ModeCardProps {
  config: ModeConfig;
  locale: Locale;
}

export function ModeCard({ config, locale }: ModeCardProps) {
  const isFMode = config.mode === 'f';
  const Icon = isFMode ? HeartHandshake : ScanSearch;
  const messages = uiMessages[locale].modes;
  const accentBadge = isFMode ? messages.f.badge : messages.t.badge;
  const accentText = isFMode ? messages.f.accentText : messages.t.accentText;

  return (
    <Link
      href={config.route as Route}
      className={`group relative overflow-hidden rounded-[2rem] border border-white/75 bg-gradient-to-br ${config.accentClass} p-6 shadow-glow transition duration-300 hover:-translate-y-1 hover:shadow-float sm:p-7`}
    >
      <div className="absolute right-5 top-5 rounded-full border border-white/70 bg-white/65 p-3 text-plum/80 shadow-soft">
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex h-full flex-col gap-5">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-medium tracking-[0.22em] text-plum/75">
              {accentBadge}
            </span>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-plum/55">{messages.modeSelect}</p>
            <h3 className="mt-2 text-3xl font-semibold text-ink">{config.title}</h3>
            <p className="mt-2 text-sm text-plum/72">{config.subtitle}</p>
          </div>
        </div>

        <p className="flex-1 text-sm leading-7 text-ink/72 sm:text-base">{config.description}</p>

        <div className="rounded-[1.5rem] border border-white/65 bg-white/65 p-4 shadow-soft backdrop-blur-sm">
          <p className="text-sm font-medium text-ink">{accentText}</p>
          <div className="mt-3 flex items-center justify-between text-sm font-medium text-plum">
            <span>{messages.start}</span>
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
