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
      className={`relative overflow-hidden border border-white/70 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.98),rgba(246,233,230,0.88)_34%,rgba(221,212,239,0.82)_100%)] shadow-soft ${
        isHero ? 'rounded-[2.4rem] p-4 shadow-float' : 'rounded-[2rem] p-3'
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-white via-[#f8f2f7] to-[#e7e0f3] ${
          isHero ? 'aspect-[5/5.8] min-h-[22rem] sm:min-h-[28rem]' : 'aspect-[16/10]'
        }`}
      >
        {isHero ? <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_28%,rgba(117,86,113,0.12)_82%,rgba(52,44,67,0.18)_100%)]" /> : null}
        {!hasError ? (
          <>
            <Image
              src={image.src}
              alt={`${title} representative artwork`}
              fill
              sizes="(min-width: 1280px) 420px, (min-width: 1024px) 34vw, (min-width: 640px) 88vw, 100vw"
              className={isHero ? 'object-contain p-8 drop-shadow-[0_28px_48px_rgba(65,45,72,0.22)] sm:p-10' : 'object-contain p-6 sm:p-7'}
              onError={() => setHasError(true)}
              priority={false}
            />
          </>
        ) : (
          <div className="flex h-full flex-col justify-between bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.98),rgba(248,240,246,0.92)_45%,rgba(227,220,242,0.9)_100%)] p-5 sm:p-6">
            <div className="brand-chip w-fit border-white/80 bg-white/80 text-[0.7rem] tracking-[0.24em] text-plum/80 shadow-none">
              <ImageOff className="h-3.5 w-3.5" />
              FALLBACK
            </div>
            <div className="space-y-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-[1.65rem] border border-white/80 bg-white/85 text-2xl font-semibold tracking-[0.18em] text-plum shadow-sm sm:h-24 sm:w-24 sm:text-3xl">
                {fallbackInitials}
              </div>
              <div>
                <p className="font-serif text-2xl text-ink sm:text-3xl">{title}</p>
                <p className="mt-2 max-w-xs text-sm leading-6 text-ink/62">{subtitle}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
