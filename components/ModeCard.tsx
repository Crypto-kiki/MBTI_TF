import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { ModeConfig } from '@/types/quiz';

interface ModeCardProps {
  config: ModeConfig;
}

export function ModeCard({ config }: ModeCardProps) {
  return (
    <Link
      href={config.route}
      className={`group rounded-[2rem] border border-white/70 bg-gradient-to-br ${config.accentClass} p-6 shadow-glow transition duration-300 hover:-translate-y-1 hover:shadow-2xl`}
    >
      <div className="flex h-full flex-col gap-5">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-plum/60">Mode Select</p>
          <h3 className="text-2xl font-semibold text-ink">{config.title}</h3>
          <p className="text-sm text-plum/70">{config.subtitle}</p>
        </div>
        <p className="flex-1 leading-7 text-ink/70">{config.description}</p>
        <div className="flex items-center justify-between text-sm font-medium text-plum">
          <span>테스트 시작하기</span>
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
