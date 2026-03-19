import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Locale } from '@/lib/i18n/config';
import { getResultHref } from '@/lib/results';
import { ResultProfile } from '@/types/quiz';

import { ResultImageCard } from './ResultImageCard';

interface ResultCatalogCardProps {
  locale: Locale;
  profile: ResultProfile;
  viewLabel: string;
}

export function ResultCatalogCard({ locale, profile, viewLabel }: ResultCatalogCardProps) {
  return (
    <Link
      href={getResultHref(locale, profile.type)}
      className="interactive-card group block h-full rounded-[1.8rem] sm:rounded-[2rem]"
    >
      <article className="glass-panel flex h-full flex-col rounded-[1.8rem] border border-white/70 bg-white/84 p-3.5 shadow-soft transition duration-300 group-hover:border-plum/18 group-hover:bg-white group-hover:shadow-float sm:rounded-[2rem] sm:p-5">
        <ResultImageCard image={profile.image} title={profile.title} subtitle={profile.subtitle} />

        <div className="mt-3.5 min-h-[4.9rem] sm:mt-4 sm:min-h-[5.35rem]">
          <h2 className="line-clamp-2 max-w-[14ch] text-[1.35rem] font-semibold leading-tight text-ink sm:text-[1.55rem]">
            {profile.title}
          </h2>
          <p className="mt-1.5 line-clamp-1 text-sm leading-6 text-plum/88">{profile.subtitle}</p>
        </div>

        <div className="mt-3.5 flex min-h-[2.4rem] flex-wrap gap-2 sm:mt-4">
          {profile.strengths.slice(0, 3).map((strength) => (
            <span key={strength} className="rounded-full bg-plum/7 px-3 py-1 text-[0.72rem] font-medium text-plum/78">
              {strength}
            </span>
          ))}
        </div>

        <p className="mt-3 line-clamp-2 min-h-[3rem] text-sm leading-6 text-ink/66 sm:mt-3.5">{profile.quickSummary}</p>

        <div className="mt-auto pt-4 sm:pt-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-plum/12 bg-white px-4 py-2 text-sm font-medium text-plum transition duration-300 group-hover:border-plum/24 group-hover:bg-plum group-hover:text-white">
            {viewLabel}
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </article>
    </Link>
  );
}
