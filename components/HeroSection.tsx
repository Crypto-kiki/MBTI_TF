import { Sparkles } from 'lucide-react';

import { modeConfigs } from '@/data/modes';

import { ModeCard } from './ModeCard';

export function HeroSection() {
  return (
    <section className="flex flex-1 flex-col justify-center gap-10 py-8 sm:py-12">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm text-plum shadow-sm backdrop-blur">
          <Sparkles className="h-4 w-4" />
          감정과 판단 사이의 해석 연습
        </div>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
          F와 T 사이
        </h1>
        <p className="mt-5 text-balance text-base leading-7 text-ink/70 sm:text-lg">
          감정과 판단 사이, 당신의 해석 습관을 연습해보세요.
          <br className="hidden sm:block" />
          감성적인 분위기 속에서 공감과 구조화를 각각 다른 방식으로 경험할 수 있어요.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {modeConfigs.map((config) => (
          <ModeCard key={config.mode} config={config} />
        ))}
      </div>
    </section>
  );
}
