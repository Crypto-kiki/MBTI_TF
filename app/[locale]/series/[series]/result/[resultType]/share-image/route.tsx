import { ImageResponse } from 'next/og';

import { getTagLabel, uiMessages } from '@/data/i18n/messages';
import { getSeriesDefaultResultType, getSeriesModeLabel, isSeriesKey, isSeriesQuizMode, isSeriesResultType } from '@/data/series';
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config';
import { defaultSeries } from '@/lib/series';
import { getModeFromResultType, parseTagCounts, resolveQuizResult, resolveResultFromType } from '@/lib/results';
import { getResultShareMetadata } from '@/lib/result-meta';
import { QuizMode, QuizTotals, ResultType } from '@/types/quiz';

export const runtime = 'edge';

const size = {
  width: 1200,
  height: 630,
};

function getLocaleOrFallback(locale: string): Locale {
  return isLocale(locale) ? locale : defaultLocale;
}

function getResultTypeOrFallback(series: string, resultType: string): ResultType {
  if (isSeriesKey(series) && isSeriesResultType(series, resultType)) {
    return resultType;
  }

  return getSeriesDefaultResultType(isSeriesKey(series) ? series : defaultSeries);
}

function toNumber(value?: string | null) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function hasQuizState(searchParams: URLSearchParams) {
  return Boolean(
    searchParams.get('totalFScore') || searchParams.get('totalTScore') || searchParams.get('answered') || searchParams.get('tags'),
  );
}

function getMode(series: string, searchParams: URLSearchParams, resultType: ResultType): QuizMode {
  const explicitMode = searchParams.get('mode');
  if (isSeriesKey(series) && explicitMode && isSeriesQuizMode(series, explicitMode)) {
    return explicitMode;
  }
  return getModeFromResultType(resultType);
}

function createTotals(searchParams: URLSearchParams): QuizTotals {
  return {
    totalFScore: toNumber(searchParams.get('totalFScore')),
    totalTScore: toNumber(searchParams.get('totalTScore')),
    answeredCount: toNumber(searchParams.get('answered')),
    tagCounts: parseTagCounts(searchParams.get('tags') ?? undefined),
  };
}

function clampText(value: string, maxLength: number) {
  return value.length > maxLength ? `${value.slice(0, maxLength - 1).trim()}…` : value;
}

export async function GET(request: Request, { params }: { params: { locale: string; series: string; resultType: string } }) {
  const locale = getLocaleOrFallback(params.locale);
  const series = isSeriesKey(params.series) ? params.series : defaultSeries;
  const resultType = getResultTypeOrFallback(series, params.resultType);
  const searchParams = new URL(request.url).searchParams;
  const metadata = getResultShareMetadata(
    locale,
    resultType,
    {
      mode: searchParams.get('mode') ?? undefined,
      totalFScore: searchParams.get('totalFScore') ?? undefined,
      totalTScore: searchParams.get('totalTScore') ?? undefined,
      answered: searchParams.get('answered') ?? undefined,
      tags: searchParams.get('tags') ?? undefined,
    },
    series,
  );
  const mode = getMode(series, searchParams, resultType);
  const messages = uiMessages[locale].result;
  const result = hasQuizState(searchParams) ? resolveQuizResult(locale, createTotals(searchParams), series) : resolveResultFromType(locale, resultType, series);
  const imageUrl = new URL(result.profile.image.src, request.url).toString();
  const description = clampText(result.profile.description, 145);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          padding: 32,
          background: `linear-gradient(135deg, ${metadata.palette.from} 0%, ${metadata.palette.to} 100%)`,
          color: metadata.palette.ink,
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at top left, rgba(255,255,255,0.92), transparent 28%), radial-gradient(circle at bottom right, rgba(255,255,255,0.5), transparent 26%)',
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            width: '100%',
            height: '100%',
            borderRadius: 36,
            background: 'rgba(255,255,255,0.58)',
            border: '1px solid rgba(255,255,255,0.72)',
            boxShadow: '0 20px 80px rgba(44, 28, 52, 0.12)',
            padding: 30,
            gap: 26,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 16px',
                borderRadius: 999,
                width: 'fit-content',
                border: '1px solid rgba(255,255,255,0.78)',
                background: 'rgba(255,255,255,0.78)',
                color: metadata.palette.accent,
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              ✦ {getSeriesModeLabel(locale, mode, series)}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 18 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '9px 16px',
                  borderRadius: 999,
                  background: 'rgba(114, 89, 122, 0.1)',
                  color: metadata.palette.accent,
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                {result.axis === 'balanced' ? messages.axis.balanced : result.axis === 'f' ? messages.axis.f : messages.axis.t}
              </div>
              {result.dominantTags.slice(0, 3).map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '9px 16px',
                    borderRadius: 999,
                    background: 'rgba(255,255,255,0.76)',
                    color: metadata.palette.ink,
                    fontSize: 18,
                  }}
                >
                  #{getTagLabel(locale, tag)}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 28 }}>
              <div style={{ fontSize: 70, lineHeight: 0.96, fontWeight: 700, letterSpacing: '-0.05em' }}>{result.profile.title}</div>
              <div style={{ fontSize: 28, lineHeight: 1.35, color: metadata.palette.accent }}>{result.profile.subtitle}</div>
              <div style={{ fontSize: 21, lineHeight: 1.62, maxWidth: 640, color: 'rgba(49, 37, 57, 0.8)' }}>{description}</div>
            </div>

            {result.totals.answeredCount > 0 ? (
              <div style={{ display: 'flex', gap: 14, marginTop: 'auto' }}>
                {[
                  { label: messages.totalF, value: result.totals.totalFScore, accent: '#7f5e75' },
                  { label: messages.totalT, value: result.totals.totalTScore, accent: '#60738C' },
                  { label: messages.answered, value: result.totals.answeredCount, accent: '#9A6B77' },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      minWidth: 132,
                      padding: '16px 18px',
                      borderRadius: 24,
                      background: 'rgba(255,255,255,0.8)',
                      border: '1px solid rgba(255,255,255,0.72)',
                    }}
                  >
                    <div style={{ fontSize: 14, letterSpacing: '0.18em', textTransform: 'uppercase', color: item.accent }}>{item.label}</div>
                    <div style={{ fontSize: 38, lineHeight: 1.1, marginTop: 8, fontWeight: 700, color: metadata.palette.ink }}>{item.value}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 'auto',
                  width: 'fit-content',
                  padding: '10px 16px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.72)',
                  color: metadata.palette.accent,
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                {messages.finalBadge}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', width: 360, gap: 18 }}>
            <div
              style={{
                display: 'flex',
                width: '100%',
                height: 360,
                borderRadius: 30,
                overflow: 'hidden',
                background: metadata.palette.mist,
                border: '1px solid rgba(255,255,255,0.72)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img src={imageUrl} width={320} height={320} alt={result.profile.title} />
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
