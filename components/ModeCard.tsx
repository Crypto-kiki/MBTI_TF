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

  return (
    <Link
      href={config.route as Route}
      className={`group relative overflow-hidden rounded-[2rem] border border-plum/8 bg-gradient-to-br ${config.accentClass} p-[1px] shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-float`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.72),rgba(255,255,255,0)_42%)] opacity-90" />
      <div className="relative flex h-full flex-col gap-5 rounded-[calc(2rem-1px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,244,248,0.94))] p-6 sm:p-7">
        <div className="absolute right-5 top-5 rounded-full border border-plum/10 bg-white p-3 text-plum shadow-soft">
          <Icon className="h-5 w-5" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="pill-accent">{accentBadge}</span>
          </div>
          <div>
            <h3 className="mt-2 text-3xl font-semibold text-ink">{config.title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/74">{config.subtitle}</p>
          </div>
        </div>

        <p className="flex-1 text-sm leading-7 text-ink/82 sm:text-base">{config.description}</p>

        <div className="surface-panel-muted flex items-center justify-between p-4 text-ink">
          <span className="text-sm font-semibold text-ink">{messages.start}</span>
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-plum/8 text-plum">
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
