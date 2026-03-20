import { Sparkles } from 'lucide-react';

import { getSeriesList } from '@/data/series';
import { Locale } from '@/lib/i18n/config';

import { SeriesHubCard } from './SeriesHubCard';

interface SeriesHubSectionProps {
  locale: Locale;
}

function getHubCopy(locale: Locale) {
  if (locale === 'ko') {
    return {
      label: '콘텐츠 허브',
      description:
        '기본편과 연애편처럼 서로 다른 콘텐츠 시리즈를 한곳에서 탐색하고, 같은 서비스 톤 안에서 다른 질문 경험으로 자연스럽게 이어질 수 있는 허브예요.',
    };
  }

  if (locale === 'ja') {
    return {
      label: 'コンテンツハブ',
      description:
        '基本編と恋愛編のように、異なるコンテンツシリーズをひとつの場所で見比べながら、同じサービスの空気感のまま別の質問体験へ進めるハブです。',
    };
  }

  if (locale === 'zh-TW') {
    return {
      label: '內容中心',
      description:
        '你可以先在這裡瀏覽基本篇、戀愛篇等不同系列，再用一致的整體體驗自然進入不同主題的測驗。',
    };
  }

  return {
    label: 'Content Hub',
    description:
      'Browse multiple content series like Core and Love in one place, then move into different quiz experiences without losing the same overall tone.',
  };
}

export function SeriesHubSection({ locale }: SeriesHubSectionProps) {
  const seriesList = getSeriesList(locale);
  const copy = getHubCopy(locale);

  return (
    <section className="flex flex-1 flex-col gap-8 py-3 sm:gap-10 sm:py-8">
      <div className="glass-panel relative overflow-hidden rounded-[2.25rem] bg-hero-glow px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div className="brand-chip mb-5">
          <Sparkles className="h-4 w-4" />
          {copy.label}
        </div>
        <h1 className="text-balance font-serif text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
          F와 T 사이
        </h1>
        <p className="mt-5 max-w-3xl text-balance text-base leading-8 text-ink/72 sm:text-lg">{copy.description}</p>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {seriesList.map((series) => (
          <SeriesHubCard key={series.key} locale={locale} series={series} />
        ))}
      </div>
    </section>
  );
}
