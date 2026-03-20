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
      title: '여러 리포트 시리즈를 한눈에 읽고, 가장 먼저 시작할 흐름을 바로 고를 수 있게 정리했어요.',
      description:
        '기본편과 연애편을 같은 규칙으로 보여주되, 카드 위계와 CTA를 더 선명하게 만들어 어디서 시작해야 하는지 한눈에 보이도록 다듬었습니다.',
      statLabel: '현재 공개된 시리즈',
      statValue: `${seriesCount}개`,
      patternTitle: '탐색 원칙',
      points: [
        '배경은 더 어둡게, 카드와 텍스트는 더 선명하게 대비를 올렸습니다.',
        'Primary CTA는 테스트 시작, Secondary CTA는 전체 유형 보기로 위계를 분리했습니다.',
        '같은 정보는 반복하지 않고, 시리즈 비교에 필요한 핵심 정보만 남겼습니다.',
      ],
    };
  }

  if (locale === 'ja') {
    return {
      label: 'シリーズハブ',
      title: '複数のレポートシリーズを見比べて、最初に始める流れをすぐ選べるよう整理しました。',
      description:
        '基本編と恋愛編を同じルールで見せつつ、カードの強弱とCTAをはっきりさせて、どこから始めるかが一目でわかるように調整しています。',
      statLabel: '公開中のシリーズ',
      statValue: `${seriesCount}`,
      patternTitle: '探索ルール',
      points: [
        '背景はより深く、カードと文字はよりはっきり見えるようにしました。',
        'Primary CTA はテスト開始、Secondary CTA は全タイプ閲覧として役割を分けました。',
        '同じ情報を繰り返さず、比較に必要な要点だけを残しています。',
      ],
    };
  }

  if (locale === 'zh-TW') {
    return {
      label: '系列中心',
      title: '你可以先快速看懂各系列，再直接選擇最適合先開始的流程。',
      description:
        '基本篇與戀愛篇以同一套結構呈現，但重新拉開卡片與 CTA 的視覺層級，讓你第一眼就知道該從哪裡開始。',
      statLabel: '目前系列數',
      statValue: `${seriesCount}`,
      patternTitle: '瀏覽原則',
      points: [
        '整體背景更深，卡片與文字對比更清楚。',
        'Primary CTA 是開始測驗，Secondary CTA 是查看全部類型。',
        '刪掉重複資訊，只保留比較系列所需的重點。',
      ],
    };
  }

  return {
    label: 'Series hub',
    title: 'Browse the report series clearly and choose the best place to start at a glance.',
    description:
      'Core and Love now follow the same visual rules, with stronger CTA hierarchy and clearer contrast so the next action is obvious immediately.',
    statLabel: 'Live series',
    statValue: `${seriesCount}`,
    patternTitle: 'Browsing rules',
    points: [
      'The background is deeper while cards and text are much clearer against it.',
      'Primary CTA means start the quiz, while Secondary CTA means browse all types.',
      'Repeated context was removed so only comparison-worthy information remains.',
    ],
  };
}

export function SeriesHubSection({ locale }: SeriesHubSectionProps) {
  const seriesList = getSeriesList(locale);
  const copy = getHubCopy(locale, seriesList.length);

  return (
    <section className="flex flex-1 flex-col gap-8 py-3 sm:gap-10 sm:py-8">
      <div className="glass-panel relative overflow-hidden rounded-[2.25rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div className="brand-chip mb-5">
          <Sparkles className="h-4 w-4" />
          {copy.label}
        </div>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_22rem] xl:items-start">
          <div>
            <h1 className="text-balance font-serif text-5xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl">F와 T 사이</h1>
            <p className="mt-5 max-w-4xl text-balance text-lg leading-8 text-white/86 sm:text-[1.35rem]">{copy.title}</p>
            <p className="mt-4 max-w-3xl text-balance text-base leading-8 text-white/68 sm:text-lg">{copy.description}</p>
          </div>

          <div className="surface-panel-strong p-5 text-white">
            <div className="section-label">
              <Layers3 className="h-3.5 w-3.5" />
              {copy.patternTitle}
            </div>
            <div className="mt-4 rounded-[1.35rem] border border-white/10 bg-black/18 p-4">
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-white/48">{copy.statLabel}</p>
              <p className="mt-2 text-3xl font-semibold text-white">{copy.statValue}</p>
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/74 sm:text-base sm:leading-7">
              {copy.points.map((point) => (
                <li key={point} className="surface-panel-muted px-4 py-3">
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
