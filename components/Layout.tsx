import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-soft-grid blur-3xl" />
      <div className="absolute left-[-4rem] top-24 -z-10 h-56 w-56 rounded-full bg-rose-100/55 blur-3xl" />
      <div className="absolute right-[-5rem] top-16 -z-10 h-64 w-64 rounded-full bg-lilac/45 blur-3xl" />

      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-5 sm:px-8 sm:py-7 lg:px-12">
        <header className="mb-6 flex items-center justify-between gap-4">
          <Link href="/" className="brand-chip px-3.5 py-2 text-xs font-medium tracking-[0.24em] sm:text-sm">
            F와 T 사이
          </Link>
          <p className="hidden text-sm text-plum/60 sm:block">감정과 판단 사이의 해석 습관 연습</p>
        </header>
        {children}
      </main>
    </div>
  );
}
