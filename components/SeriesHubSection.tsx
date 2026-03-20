import { Layers3, Sparkles } from 'lucide-react';

import { getSeriesList } from '@/data/series';
import { Locale } from '@/lib/i18n/config';

import { SeriesHubCard } from './SeriesHubCard';

interface SeriesHubSectionProps {
  locale: Locale;
}

function getHubCopy(locale: Locale, seriesCount: number) {
  if (locale === 'ko') {
    return {
      label: '시리즈 허브',
      title: '하나의 테스트가 아니라, 여러 리포트 시리즈를 탐색하는 구조로 정리했어요.',
      description:
        '기본편과 연애편을 각각 독립된 콘텐츠처럼 보이게 정리하고, 어느 시리즈에서 시작해도 자연스럽게 다음 흐름으로 이어질 수 있도록 홈 구조를 다시 잡았습니다.',
      statLabel: '현재 공개된 시리즈',
      statValue: `${seriesCount}개`,
      patternTitle: '복잡해 보이지 않게 한 방식',
      points: [
        '시리즈마다 질문 수, 예상 시간, 리포트 성격을 같은 위치에서 보여줍니다.',
        '기본편과 연애편을 각각 독립된 카드로 분리해 서로 다른 콘텐츠임을 바로 이해하게 합니다.',
        '결과와 전체 유형 보기에서도 같은 시리즈 라벨과 흐름을 유지합니다.',
      ],
    };
  }

  if (locale === 'ja') {
    return {
      label: 'シリーズハブ',
      title: 'ひとつのテストではなく、複数のレポートシリーズを見渡せる構造に整えました。',
      description:
        '基本編と恋愛編をそれぞれ独立したコンテンツとして見せながら、どのシリーズから始めても次の流れに自然につながるようにホームの構造を整理しています。',
      statLabel: '公開中のシリーズ',
      statValue: `${seriesCount}`,
      patternTitle: '複雑に見せないためのルール',
      points: [
        '各シリーズで設問数・所要時間・レポートの性格を同じ位置に配置しました。',
        '基本編と恋愛編を独立したカードに分けて、別コンテンツとしてすぐわかるようにしています。',
        '結果ページと全タイプ一覧でも、同じシリーズラベルと導線を保っています。',
      ],
    };
  }

  if (locale === 'zh-TW') {
    return {
      label: '系列中心',
      title: '這裡不再像只有一份測驗，而是能清楚瀏覽多個報告系列的入口。',
      description:
        '基本篇與戀愛篇各自被整理成獨立內容，同時又能在完成其中一個之後，自然延伸到下一個系列。',
      statLabel: '目前系列數',
      statValue: `${seriesCount}`,
      patternTitle: '讓內容增加也不顯亂的方法',
      points: [
        '每個系列都用同一套位置展示題數、時間與報告性質。',
        '基本篇與戀愛篇各自獨立成卡片，第一眼就能分辨。',
        '結果頁與全部類型頁也沿用相同的系列標籤與流程提示。',
      ],
    };
  }

  return {
    label: 'Series hub',
    title: 'The service now reads as a collection of report series, not just a single quiz.',
    description:
      'Core and Love are framed as independent content tracks while still connecting into a clear next step, so the product can grow without the experience feeling crowded.',
    statLabel: 'Live series',
    statValue: `${seriesCount}`,
    patternTitle: 'Why it still feels simple',
    points: [
      'Each series shows questions, time, and report style in the same information slots.',
      'Core and Love are separated into independent cards so their roles are obvious at a glance.',
      'Result pages and type catalogs keep the same series labels and movement patterns.',
    ],
  };
}

export function SeriesHubSection({ locale }: SeriesHubSectionProps) {
  const seriesList = getSeriesList(locale);
  const copy = getHubCopy(locale, seriesList.length);

  return (
    <section className="flex flex-1 flex-col gap-8 py-3 sm:gap-10 sm:py-8">
      <div className="glass-panel relative overflow-hidden rounded-[2.25rem] bg-hero-glow px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div className="brand-chip mb-5">
          <Sparkles className="h-4 w-4" />
          {copy.label}
        </div>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_20rem] xl:items-start">
          <div>
            <h1 className="text-balance font-serif text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl lg:text-7xl">F와 T 사이</h1>
            <p className="mt-5 max-w-4xl text-balance text-lg leading-8 text-plum/84 sm:text-[1.35rem]">{copy.title}</p>
            <p className="mt-4 max-w-3xl text-balance text-base leading-8 text-ink/72 sm:text-lg">{copy.description}</p>
          </div>

          <div className="rounded-[1.7rem] border border-white/75 bg-white/72 p-5 shadow-soft">
            <div className="inline-flex items-center gap-2 rounded-full bg-plum/8 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-plum/74">
              <Layers3 className="h-3.5 w-3.5" />
              {copy.patternTitle}
            </div>
            <div className="mt-4 rounded-[1.35rem] bg-[linear-gradient(135deg,rgba(248,242,248,0.94),rgba(255,255,255,0.9))] p-4">
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-plum/54">{copy.statLabel}</p>
              <p className="mt-2 text-3xl font-semibold text-ink">{copy.statValue}</p>
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-ink/72 sm:text-base sm:leading-7">
              {copy.points.map((point) => (
                <li key={point} className="rounded-[1.15rem] bg-white/82 px-4 py-3 shadow-sm">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {seriesList.map((series, index) => (
          <SeriesHubCard
            key={series.key}
            locale={locale}
            series={series}
            companionSeriesLabel={seriesList[(index + 1) % seriesList.length]?.content.label}
          />
        ))}
      </div>
    </section>
  );
}
