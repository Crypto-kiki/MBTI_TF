import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Cormorant_Garamond, Noto_Sans_KR } from 'next/font/google';

import './globals.css';

const sans = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'F와 T 사이',
  description: '감정과 판단 사이, 당신의 해석 습관을 연습해보세요.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${sans.variable} ${serif.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
