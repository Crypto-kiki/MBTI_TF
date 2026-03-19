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
      className="interactive-card group block rounded-[1.8rem] sm:rounded-[2rem]"
    >
      <article className="glass-panel rounded-[1.8rem] border border-white/70 bg-white/84 p-3.5 shadow-soft transition duration-300 group-hover:border-plum/18 group-hover:bg-white group-hover:shadow-float sm:rounded-[2rem] sm:p-5">
        <ResultImageCard image={profile.image} title={profile.title} subtitle={profile.subtitle} />

        <div className="mt-3.5 sm:mt-4">
          <h2 className="text-[1.55rem] font-semibold leading-tight text-ink sm:text-2xl">{profile.title}</h2>
          <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-plum sm:mt-2 sm:line-clamp-1 sm:leading-7">{profile.subtitle}</p>
        </div>

        <div className="mt-3.5 flex flex-wrap gap-2 sm:mt-4">
          {profile.strengths.slice(0, 3).map((strength) => (
            <span key={strength} className="rounded-full bg-plum/7 px-3 py-1 text-xs font-medium text-plum/78">
              {strength}
            </span>
          ))}
        </div>

        <p className="mt-3.5 line-clamp-4 text-sm leading-6 text-ink/68 sm:mt-4 sm:line-clamp-3 sm:leading-7">{profile.quickSummary}</p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-plum/12 bg-white px-4 py-2 text-sm font-medium text-plum transition duration-300 group-hover:border-plum/24 group-hover:bg-plum group-hover:text-white sm:mt-5">
          {viewLabel}
          <ArrowRight className="h-4 w-4" />
        </div>
      </article>
    </Link>
  );
}
