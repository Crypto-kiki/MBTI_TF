'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { ImageOff } from 'lucide-react';

import { ResultImage } from '@/types/quiz';

interface ResultImageCardProps {
  image: ResultImage;
  title: string;
  subtitle: string;
  variant?: 'default' | 'hero';
}

export function ResultImageCard({ image, title, subtitle, variant = 'default' }: ResultImageCardProps) {
  const [hasError, setHasError] = useState(false);
  const isHero = variant === 'hero';

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
      className={`relative overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(17,18,31,0.96),rgba(10,11,22,0.92))] shadow-soft ${
        isHero ? 'rounded-[2.15rem] p-3 shadow-float sm:rounded-[2.4rem] sm:p-3.5' : 'rounded-[1.8rem] p-2.5 sm:rounded-[2rem] sm:p-3'
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-[1.7rem] bg-gradient-to-br from-[#1d2035] via-[#171a2e] to-[#10121f] ${
          isHero ? 'aspect-[16/11] min-h-[15.5rem] sm:min-h-[18rem] lg:min-h-[20rem]' : 'aspect-[16/10]'
        }`}
      >
        {isHero ? <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_24%,rgba(171,137,255,0.14)_78%,rgba(35,43,77,0.2)_100%)]" /> : null}
        {!hasError ? (
          <Image
            src={image.src}
            alt={`${title} representative artwork`}
            fill
            sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, (min-width: 640px) 88vw, 100vw"
            className={isHero ? 'object-contain p-4 drop-shadow-[0_22px_36px_rgba(65,45,72,0.18)] sm:p-5 lg:p-6' : 'object-contain p-5 sm:p-7'}
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
