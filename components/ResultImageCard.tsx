'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { ImageOff } from 'lucide-react';

import { ResultImage } from '@/types/quiz';
import { SeriesKey } from '@/types/series';

interface ResultImageCardProps {
  image: ResultImage;
  title: string;
  subtitle: string;
  series?: SeriesKey;
  variant?: 'default' | 'hero';
}

export function ResultImageCard({ image, title, subtitle, series, variant = 'default' }: ResultImageCardProps) {
  const [hasError, setHasError] = useState(false);
  const isHero = variant === 'hero';
  const isLoveSeries = series === 'love' || image.src.includes('/love-');

  const shellClass = isLoveSeries
    ? 'border-[#e5d2e2] bg-white shadow-soft'
    : 'border-plum/8 bg-white shadow-soft';
  const frameClass = isLoveSeries
    ? 'bg-[radial-gradient(circle_at_18%_18%,rgba(255,224,238,0.88),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(213,224,246,0.8),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.98),rgba(248,243,248,0.96))]'
    : 'bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(246,242,247,0.96),rgba(241,241,246,0.94))]';
  const badgeLabel = isLoveSeries ? 'LOVE SERIES' : 'CORE SERIES';
  const badgeClass = isLoveSeries
    ? 'border-[#e5d2e2] bg-white/80 text-plum'
    : 'border-plum/10 bg-white/80 text-plum/82';

  const fallbackInitials = useMemo(
    () =>
      title
        .split(/\s+/)
        .map((word) => word[0])
        .join('')
        .slice(0, 3)
        .toUpperCase(),
    [title],
  );

  return (
    <div
      className={`relative overflow-hidden border ${shellClass} ${
        isHero ? 'rounded-[2.15rem] p-3 shadow-float sm:rounded-[2.4rem] sm:p-3.5' : 'rounded-[1.8rem] p-2.5 sm:rounded-[2rem] sm:p-3'
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-[1.7rem] ${frameClass} ${
          isHero ? 'aspect-[16/11] min-h-[15.5rem] sm:min-h-[18rem] lg:min-h-[20rem]' : 'aspect-[16/10]'
        }`}
      >
        {isHero ? (
          <div
            className={`absolute inset-0 ${
              isLoveSeries
                ? 'bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_26%,rgba(255,172,211,0.12)_72%,rgba(88,113,188,0.16)_100%)]'
                : 'bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_24%,rgba(171,137,255,0.14)_78%,rgba(35,43,77,0.2)_100%)]'
            }`}
          />
        ) : null}
        <div className="absolute inset-[6%] rounded-[1.5rem] border border-white/10" />
        <div className="absolute inset-[12%] rounded-[1.35rem] border border-white/6" />
        {isLoveSeries ? (
          <>
            <div className="absolute -left-10 top-8 h-40 w-40 rounded-full border border-plum/10" />
            <div className="absolute -right-12 bottom-6 h-52 w-52 rounded-full border border-plum/10" />
            <div className="absolute left-[14%] top-[16%] h-px w-[72%] bg-gradient-to-r from-transparent via-plum/12 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-x-0 top-[24%] border-t border-plum/6" />
            <div className="absolute inset-x-0 bottom-[24%] border-t border-plum/6" />
            <div className="absolute inset-y-0 left-[24%] border-l border-plum/6" />
            <div className="absolute inset-y-0 right-[24%] border-l border-plum/6" />
          </>
        )}
        <div className={`absolute left-4 top-4 z-10 inline-flex items-center rounded-full border px-3 py-1 text-[0.62rem] font-semibold tracking-[0.24em] ${badgeClass}`}>
          {badgeLabel}
        </div>
        {!hasError ? (
          <Image
            src={image.src}
            alt={`${title} representative artwork`}
            fill
            sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, (min-width: 640px) 88vw, 100vw"
            className={
              isHero
                ? `object-contain ${isLoveSeries ? 'p-3.5 drop-shadow-[0_28px_54px_rgba(38,18,46,0.34)] sm:p-4 lg:p-5' : 'p-4 drop-shadow-[0_22px_36px_rgba(65,45,72,0.18)] sm:p-5 lg:p-6'}`
                : `object-contain ${isLoveSeries ? 'p-4 drop-shadow-[0_22px_42px_rgba(41,16,47,0.32)] sm:p-5' : 'p-5 sm:p-7'}`
            }
            onError={() => setHasError(true)}
            priority={false}
          />
        ) : (
          <div className="flex h-full flex-col justify-between bg-[radial-gradient(circle_at_top_left,rgba(35,38,63,0.98),rgba(20,22,39,0.94)_45%,rgba(14,16,28,0.92)_100%)] p-5 sm:p-6">
            <div className="brand-chip w-fit border-white/12 bg-white/8 text-[0.7rem] tracking-[0.24em] text-white/82 shadow-none">
              <ImageOff className="h-3.5 w-3.5" />
            </div>
            <div className="space-y-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-[1.65rem] border border-white/10 bg-white/8 text-2xl font-semibold tracking-[0.18em] text-white shadow-sm sm:h-24 sm:w-24 sm:text-3xl">
                {fallbackInitials}
              </div>
              <div>
                <p className="font-serif text-2xl text-white sm:text-3xl">{title}</p>
                <p className="mt-2 max-w-xs text-sm leading-6 text-white/62">{subtitle}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
