import Link from 'next/link';

import { Locale } from '@/lib/i18n/config';
import { getResultHref } from '@/lib/results';
import { ResultProfile } from '@/types/quiz';

import { ResultImageCard } from './ResultImageCard';

interface ResultCatalogCardProps {
  locale: Locale;
  profile: ResultProfile;
  strengthsLabel: string;
  tipsLabel: string;
  goodMatchLabel: string;
  goodMatchReasonLabel: string;
  viewLabel: string;
}

export function ResultCatalogCard({
  locale,
  profile,
  strengthsLabel,
  tipsLabel,
  goodMatchLabel,
  goodMatchReasonLabel,
  viewLabel,
}: ResultCatalogCardProps) {
  return (
    <article className="glass-panel rounded-[2rem] bg-white/82 p-4 shadow-soft sm:p-5">
      <ResultImageCard image={profile.image} title={profile.title} subtitle={profile.subtitle} />

      <div className="mt-4">
        <h2 className="text-2xl font-semibold text-ink">{profile.title}</h2>
        <p className="mt-2 text-sm leading-7 text-plum">{profile.subtitle}</p>
        <p className="mt-4 text-sm leading-7 text-ink/68">{profile.description}</p>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-plum/60">{strengthsLabel}</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/68">
            {profile.strengths.slice(0, 2).map((strength) => (
              <li key={strength} className="rounded-2xl bg-plum/5 px-3 py-3">
                {strength}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-plum/60">{tipsLabel}</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/68">
            {profile.tips.slice(0, 2).map((tip) => (
              <li key={tip} className="rounded-2xl bg-rose-50 px-3 py-3">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 rounded-[1.7rem] bg-[#f8f3ff] p-4">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-plum/60">{goodMatchLabel}</p>
        <p className="mt-2 text-base font-semibold text-ink">{profile.compatibility.title}</p>
        <p className="mt-1 text-sm text-plum">{profile.compatibility.subtitle}</p>
        <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-plum/60">{goodMatchReasonLabel}</p>
        <p className="mt-2 text-sm leading-7 text-ink/68">{profile.compatibility.reason}</p>
      </div>

      <Link
        href={getResultHref(locale, profile.type)}
        className="mt-5 inline-flex items-center justify-center rounded-full border border-plum/12 bg-white px-4 py-2 text-sm font-medium text-plum transition hover:-translate-y-0.5 hover:bg-white/90"
      >
        {viewLabel}
      </Link>
    </article>
  );
}
