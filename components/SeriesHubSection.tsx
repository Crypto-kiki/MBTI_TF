import { Layers3, Sparkles } from 'lucide-react';

import { getSeriesList } from '@/data/series';
import { Locale } from '@/lib/i18n/config';

import { SeriesHubCard } from './SeriesHubCard';

interface SeriesHubSectionProps {
  locale: Locale;
}

function getHubCopy(locale: Locale) {
  if (locale === 'ko') {
    return {
      label: '시리즈 허브',
      title: '지금 시작할 시리즈를 고르세요.',
      description: '각 시리즈의 주제와 소요 시간을 먼저 보고, 마음에 드는 흐름으로 바로 시작할 수 있어요.',
      statLabel: '바로 진행하는 순서',
      statValue: '3단계',
      patternTitle: '시작 가이드',
      points: [
        '시리즈를 고른다',
        '테스트를 시작한다',
        '결과를 읽고 공유한다',
      ],
    };
  }

  if (locale === 'ja') {
    return {
      label: 'シリーズハブ',
      title: '今始めるシリーズを選びましょう。',
      description: '各シリーズのテーマと所要時間を見て、気になる流れからすぐ始められます。',
      statLabel: 'すぐ進める流れ',
      statValue: '3 steps',
      patternTitle: 'スタートガイド',
      points: [
        'シリーズを選ぶ',
        'テストを始める',
        '結果を読んでシェアする',
      ],
    };
  }

  if (locale === 'zh-TW') {
    return {
      label: '系列中心',
      title: '先選一個你想開始的系列。',
      description: '先看主題與時間，再直接從最適合你的流程開始就好。',
      statLabel: '立即開始流程',
      statValue: '3 steps',
      patternTitle: '開始方式',
      points: [
        '先選系列',
        '再開始測驗',
        '最後看結果並分享',
      ],
    };
  }

  return {
    label: 'Series hub',
    title: 'Choose the series you want to start now.',
    description: 'Check the topic and timing first, then move straight into the flow that fits you best.',
    statLabel: 'Fastest path',
    statValue: '3 steps',
    patternTitle: 'Start guide',
    points: [
      'Pick a series',
      'Start the quiz',
      'Read and share your result',
    ],
  };
}

export function SeriesHubSection({ locale }: SeriesHubSectionProps) {
  const seriesList = getSeriesList(locale);
  const copy = getHubCopy(locale);

  return (
    <section className="flex flex-1 flex-col gap-8 py-3 sm:gap-10 sm:py-8">
      <div className="glass-panel relative overflow-hidden rounded-[2.25rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div className="brand-chip mb-5">
          <Sparkles className="h-4 w-4" />
          {copy.label}
        </div>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_22rem] xl:items-start">
          <div>
            <h1 className="text-balance font-serif text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl lg:text-7xl">F와 T 사이</h1>
            <p className="mt-5 max-w-4xl text-balance text-lg leading-8 text-ink sm:text-[1.35rem]">{copy.title}</p>
            <p className="mt-3 max-w-3xl text-balance text-base leading-7 text-ink/68 sm:text-lg">{copy.description}</p>
          </div>

          <div className="surface-panel-strong p-5 text-white">
            <div className="section-label">
              <Layers3 className="h-3.5 w-3.5" />
              {copy.patternTitle}
            </div>
            <div className="mt-4 rounded-[1.35rem] border border-white/10 bg-black/18 p-4">
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-white/48">{copy.statLabel}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{copy.statValue}</p>
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/74 sm:text-base sm:leading-7">
              {copy.points.map((point, index) => (
                <li key={point} className="rounded-[1.2rem] border border-white/12 bg-white/8 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/14 text-xs font-semibold text-white/92">
                      {index + 1}
                    </span>
                    <span>{point}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {seriesList.map((series) => (
          <SeriesHubCard key={series.key} locale={locale} series={series} />
        ))}
      </div>
    </section>
  );
}
