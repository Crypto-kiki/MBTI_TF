'use client';

import { useMemo, useState } from 'react';

import { Locale } from '@/lib/i18n/config';
import { getAxisFromResultType } from '@/lib/results';
import { ResultProfile, ResultType } from '@/types/quiz';

import { ResultCatalogCard } from './ResultCatalogCard';

type CatalogFilter = 'all' | 'f' | 't' | 'balanced';

interface ResultCatalogExplorerProps {
  locale: Locale;
  resultTypes: readonly ResultType[];
  profiles: Record<ResultType, ResultProfile>;
  messages: {
    viewLabel: string;
    filters: { all: string; f: string; t: string; balanced: string };
    sections: {
      f: { title: string; description: string };
      t: { title: string; description: string };
      balanced: { title: string; description: string };
    };
  };
}

const filterOrder: CatalogFilter[] = ['all', 'f', 't', 'balanced'];

function getCountLabel(locale: Locale, count: number) {
  if (locale === 'ko') {
    return `${count}개 유형`;
  }

  if (locale === 'ja') {
    return `${count}タイプ`;
  }

  if (locale === 'zh-TW') {
    return `${count}種類`;
  }

  return `${count} types`;
}

export function ResultCatalogExplorer({ locale, resultTypes, profiles, messages }: ResultCatalogExplorerProps) {
  const [activeFilter, setActiveFilter] = useState<CatalogFilter>('all');

  const groupedTypes = useMemo(
    () =>
      resultTypes.reduce<Record<'f' | 't' | 'balanced', ResultType[]>>(
        (acc, type) => {
          const axis = getAxisFromResultType(type);
          acc[axis].push(type);
          return acc;
        },
        { f: [], t: [], balanced: [] },
      ),
    [resultTypes],
  );

  const visibleSections = activeFilter === 'all' ? (['f', 't', 'balanced'] as const) : ([activeFilter] as const);

  return (
    <div className="space-y-7 sm:space-y-8">
      <div className="-mx-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max gap-2">
          {filterOrder.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`interactive-card min-h-[2.9rem] rounded-full px-4 py-2 text-sm font-medium sm:min-h-[3rem] ${
                  isActive
                    ? 'bg-gradient-to-r from-plum to-[#7a6677] text-white shadow-soft'
                    : 'border border-white/70 bg-white/82 text-plum/78 shadow-soft hover:bg-white hover:text-plum'
                }`}
              >
                {messages.filters[filter]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-8 sm:space-y-10">
        {visibleSections.map((section) => (
          <section key={section} className="space-y-4 sm:space-y-5">
            <div className="rounded-[1.45rem] border border-white/72 bg-white/64 px-4 py-4 shadow-soft sm:rounded-[1.7rem] sm:px-5 sm:py-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-ink sm:text-2xl">{messages.sections[section].title}</h2>
                  <p className="mt-1.5 max-w-2xl text-sm leading-6 text-ink/64 sm:mt-2 sm:leading-7">
                    {messages.sections[section].description}
                  </p>
                </div>
                <span className="inline-flex w-fit items-center rounded-full border border-plum/10 bg-white/88 px-3 py-1 text-xs font-medium tracking-[0.08em] text-plum/70 shadow-sm sm:text-sm">
                  {getCountLabel(locale, groupedTypes[section].length)}
                </span>
              </div>
            </div>

            <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
              {groupedTypes[section].map((type) => (
                <ResultCatalogCard key={type} locale={locale} profile={profiles[type]} viewLabel={messages.viewLabel} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
