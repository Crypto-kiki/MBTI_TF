'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { ImageOff, Sparkles } from 'lucide-react';

import { ResultImage } from '@/types/quiz';

interface ResultImageCardProps {
  image: ResultImage;
  title: string;
  subtitle: string;
}

export function ResultImageCard({ image, title, subtitle }: ResultImageCardProps) {
  const [hasError, setHasError] = useState(false);

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
    <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),rgba(246,233,230,0.82)_38%,rgba(221,212,239,0.75)_100%)] p-3 shadow-soft">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.55rem] bg-gradient-to-br from-white via-[#f8f2f7] to-[#e7e0f3]">
        {!hasError ? (
          <>
            <Image
              src={image.src}
              alt={`${title} representative artwork`}
              fill
              sizes="(min-width: 1280px) 420px, (min-width: 1024px) 34vw, (min-width: 640px) 88vw, 100vw"
              className="object-contain p-6 sm:p-7"
              onError={() => setHasError(true)}
              priority={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#211d28]/18 via-transparent to-white/16" />
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

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <div className="rounded-[1.4rem] border border-white/60 bg-white/72 p-4 shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-2 text-plum/78">
              <Sparkles className="h-4 w-4" />
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.28em]">Result Image</span>
            </div>
            <p className="mt-2 font-serif text-2xl leading-none text-ink sm:text-[2rem]">{title}</p>
            <p className="mt-2 text-sm leading-6 text-ink/62">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
