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
      className="group block rounded-[2rem] transition duration-300 hover:-translate-y-1"
    >
      <article className="glass-panel rounded-[2rem] border border-white/70 bg-white/82 p-4 shadow-soft transition duration-300 group-hover:border-plum/18 group-hover:bg-white group-hover:shadow-float sm:p-5">
        <ResultImageCard image={profile.image} title={profile.title} subtitle={profile.subtitle} />

        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-ink">{profile.title}</h2>
          <p className="mt-2 line-clamp-1 text-sm leading-7 text-plum">{profile.subtitle}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {profile.strengths.slice(0, 3).map((strength) => (
            <span key={strength} className="rounded-full bg-plum/7 px-3 py-1 text-xs font-medium text-plum/78">
              {strength}
            </span>
          ))}
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-7 text-ink/68">{profile.quickSummary}</p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-plum/12 bg-white px-4 py-2 text-sm font-medium text-plum transition duration-300 group-hover:border-plum/24 group-hover:bg-plum group-hover:text-white">
          {viewLabel}
          <ArrowRight className="h-4 w-4" />
        </div>
      </article>
    </Link>
  );
}
