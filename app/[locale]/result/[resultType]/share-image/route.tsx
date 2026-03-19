import { ImageResponse } from 'next/og';

import { getTagLabel, uiMessages } from '@/data/i18n/messages';
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config';
import { getModeFromResultType, parseTagCounts, resolveQuizResult, resolveResultFromType } from '@/lib/results';
import { getResultShareMetadata } from '@/lib/result-meta';
import { defaultResultType, isResultType, QuizMode, QuizTotals, ResultType } from '@/types/quiz';

export const runtime = 'edge';

const size = {
  width: 1200,
  height: 630,
};

function getLocaleOrFallback(locale: string): Locale {
  return isLocale(locale) ? locale : defaultLocale;
}

function getResultTypeOrFallback(resultType: string): ResultType {
  return isResultType(resultType) ? resultType : defaultResultType;
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

function getMode(searchParams: URLSearchParams, resultType: ResultType): QuizMode {
  const explicitMode = searchParams.get('mode');
  return getModeFromResultType(resultType, explicitMode === 't' ? 't' : explicitMode === 'f' ? 'f' : undefined);
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

export async function GET(request: Request, { params }: { params: { locale: string; resultType: string } }) {
  const locale = getLocaleOrFallback(params.locale);
  const resultType = getResultTypeOrFallback(params.resultType);
  const searchParams = new URL(request.url).searchParams;
  const metadata = getResultShareMetadata(locale, resultType, {
    mode: searchParams.get('mode') ?? undefined,
    totalFScore: searchParams.get('totalFScore') ?? undefined,
    totalTScore: searchParams.get('totalTScore') ?? undefined,
    answered: searchParams.get('answered') ?? undefined,
    tags: searchParams.get('tags') ?? undefined,
  });
  const mode = getMode(searchParams, resultType);
  const messages = uiMessages[locale].result;
  const result = hasQuizState(searchParams) ? resolveQuizResult(locale, createTotals(searchParams)) : resolveResultFromType(locale, resultType);
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
              ✦ {uiMessages[locale].modes[mode].title} Result
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
                Shared Result
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', width: 360, gap: 18 }}>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                overflow: 'hidden',
                borderRadius: 30,
                background: 'rgba(255,255,255,0.52)',
                border: '1px solid rgba(255,255,255,0.72)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.65)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={result.profile.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(25,22,32,0.04) 58%, rgba(27,24,36,0.26) 100%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 18,
                  right: 18,
                  bottom: 18,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  padding: '16px 18px',
                  borderRadius: 24,
                  background: 'rgba(255,255,255,0.74)',
                  border: '1px solid rgba(255,255,255,0.72)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div style={{ fontSize: 14, letterSpacing: '0.24em', textTransform: 'uppercase', color: metadata.palette.accent }}>
                  Result Image
                </div>
                <div style={{ fontSize: 26, lineHeight: 1.05, fontWeight: 700 }}>{result.profile.title}</div>
                <div style={{ fontSize: 17, lineHeight: 1.45, color: 'rgba(49, 37, 57, 0.76)' }}>{clampText(result.profile.subtitle, 48)}</div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                padding: '20px 22px',
                borderRadius: 28,
                background: 'rgba(255,255,255,0.62)',
                border: '1px solid rgba(255,255,255,0.74)',
              }}
            >
              <div style={{ fontSize: 15, letterSpacing: '0.16em', textTransform: 'uppercase', color: metadata.palette.accent }}>
                {metadata.serviceName}
              </div>
              <div style={{ fontSize: 18, lineHeight: 1.5, color: 'rgba(49, 37, 57, 0.76)' }}>{metadata.ogDescription}</div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
