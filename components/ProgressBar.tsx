interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = total === 0 ? 0 : Math.min(100, Math.round((current / total) * 100));

  return (
    <div className="rounded-[1.5rem] border border-white/65 bg-white/72 p-4 shadow-soft backdrop-blur-sm">
      <div className="flex items-center justify-between text-sm text-plum/70">
        <span className="font-medium">진행도</span>
        <span>
          {current}/{total}
        </span>
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-plum/8">
        <div
          className="h-full rounded-full bg-gradient-to-r from-plum via-[#8f6f8b] to-[#c79fb8] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-plum/55">답을 고르며 천천히 당신의 해석 결을 따라가보세요.</p>
    </div>
  );
}
