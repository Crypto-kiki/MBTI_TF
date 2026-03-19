import { ImageResponse } from 'next/og';

import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config';
import { getResultShareMetadata } from '@/lib/result-meta';
import { defaultResultType, isResultType, type ResultType } from '@/types/quiz';

export const runtime = 'edge';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

interface OgImageProps {
  params: {
    locale: string;
    resultType: string;
  };
}

function getLocaleOrFallback(locale: string): Locale {
  return isLocale(locale) ? locale : defaultLocale;
}

function getResultTypeOrFallback(resultType: string): ResultType {
  return isResultType(resultType) ? resultType : defaultResultType;
}

export default function OgImage({ params }: OgImageProps) {
  const locale = getLocaleOrFallback(params.locale);
  const resultType = getResultTypeOrFallback(params.resultType);
  const metadata = getResultShareMetadata(locale, resultType);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${metadata.palette.from} 0%, ${metadata.palette.to} 100%)`,
          color: metadata.palette.ink,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at top left, rgba(255,255,255,0.95), transparent 34%), radial-gradient(circle at bottom right, rgba(255,255,255,0.55), transparent 28%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: 76,
            top: 82,
            width: 282,
            height: 282,
            borderRadius: 999,
            background: 'rgba(255,255,255,0.38)',
            boxShadow: '0 34px 90px rgba(42, 24, 48, 0.12)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 124,
            top: 130,
            width: 192,
            height: 192,
            borderRadius: 999,
            background: metadata.palette.mist,
            border: '1px solid rgba(255,255,255,0.75)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 148,
            top: 154,
            width: 144,
            height: 144,
            borderRadius: 999,
            background: 'rgba(255,255,255,0.72)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: metadata.palette.accent,
            fontSize: 38,
            fontWeight: 600,
            letterSpacing: '0.18em',
          }}
        >
          {metadata.profile.title
            .split(/\s+/)
            .map((word) => word[0])
            .join('')
            .slice(0, 3)
            .toUpperCase()}
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            padding: '60px 68px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              width: 'fit-content',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.74)',
              border: '1px solid rgba(255,255,255,0.82)',
              padding: '12px 20px',
              color: metadata.palette.accent,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: '0.24em',
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: metadata.palette.accent,
              }}
            />
            {metadata.serviceName}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 700 }}>
            <div
              style={{
                fontSize: 76,
                lineHeight: 1.02,
                fontWeight: 700,
                letterSpacing: '-0.04em',
                color: metadata.palette.ink,
              }}
            >
              {metadata.profile.title}
            </div>
            <div
              style={{
                marginTop: 18,
                fontSize: 30,
                lineHeight: 1.35,
                color: metadata.palette.accent,
              }}
            >
              {metadata.subtitle}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <div
              style={{
                display: 'flex',
                maxWidth: 620,
                fontSize: 22,
                lineHeight: 1.55,
                color: 'rgba(49, 37, 57, 0.75)',
              }}
            >
              {metadata.ogDescription}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                borderRadius: 999,
                background: 'rgba(255,255,255,0.72)',
                padding: '10px 16px',
                color: metadata.palette.accent,
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              Shared Result
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
