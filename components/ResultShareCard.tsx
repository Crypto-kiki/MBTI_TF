'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Check, Copy, Link2, Share2 } from 'lucide-react';

import { Locale } from '@/lib/i18n/config';
import { getResultHref } from '@/lib/results';
import { ResultImage, ResultType } from '@/types/quiz';

interface ResultShareMessages {
  badge: string;
  title: string;
  hint: string;
  previewLabel: string;
  share: string;
  shareHint: string;
  copy: string;
  copyHint: string;
  copied: string;
  failed: string;
  shared: string;
  templates: string[];
}

interface ResultShareCardProps {
  locale: Locale;
  resultType: ResultType;
  image: ResultImage;
  title: string;
  subtitle: string;
  messages: ResultShareMessages;
}

function buildShareText(resultType: ResultType, title: string, templates: string[]) {
  if (templates.length === 0) {
    return title;
  }

  const index = Array.from(resultType).reduce((sum, char) => sum + char.charCodeAt(0), 0) % templates.length;
  return templates[index].replace('{title}', title);
}

export function ResultShareCard({ locale, resultType, image, title, subtitle, messages }: ResultShareCardProps) {
  const [shareSupported, setShareSupported] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: 'success' | 'error'; message: string } | null>(null);
  const shareText = buildShareText(resultType, title, messages.templates);

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }

    return getResultHref(locale, resultType);
  };

  useEffect(() => {
    setShareSupported(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timer = window.setTimeout(() => setFeedback(null), 2200);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  const showFeedback = (tone: 'success' | 'error', message: string) => {
    setFeedback({ tone, message });
  };

  const copyToClipboard = async () => {
    try {
      const sharePayload = `${shareText}\n${getShareUrl()}`;

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(sharePayload);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = sharePayload;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const copied = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (!copied) {
          throw new Error('copy-failed');
        }
      }

      showFeedback('success', messages.copied);
    } catch {
      showFeedback('error', messages.failed);
    }
  };

  const handleNativeShare = async () => {
    if (!shareSupported) {
      await copyToClipboard();
      return;
    }

    try {
      await navigator.share({
        title,
        text: shareText,
        url: getShareUrl(),
      });
      showFeedback('success', messages.shared);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }

      showFeedback('error', messages.failed);
    }
  };

  return (
    <div className="glass-panel rounded-[1.85rem] border border-white/75 bg-white/78 p-4 shadow-soft sm:rounded-[1.95rem] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div>
          <div className="brand-chip border-white/75 bg-white/92 px-3 py-1 text-[0.68rem] tracking-[0.24em] shadow-none">
            <Link2 className="h-3.5 w-3.5" />
            {messages.badge}
          </div>
          <h2 className="mt-3 text-base font-semibold text-ink sm:mt-4 sm:text-lg">{messages.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/68 sm:leading-7">{messages.hint}</p>
        </div>
        {feedback ? (
          <div
            className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-2 text-xs font-medium shadow-sm ${
              feedback.tone === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}
          >
            {feedback.tone === 'success' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {feedback.message}
          </div>
        ) : null}
      </div>

      <div className="mt-4 overflow-hidden rounded-[1.45rem] border border-white/80 bg-white/92 shadow-sm sm:mt-5 sm:rounded-[1.6rem]">
        <div className="grid grid-cols-[4.6rem_minmax(0,1fr)] items-stretch sm:grid-cols-[5.2rem_minmax(0,1fr)]">
          <div className="relative min-h-[4.6rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.98),rgba(246,233,230,0.82)_38%,rgba(221,212,239,0.78)_100%)] sm:min-h-[5.2rem]">
            <Image src={image.src} alt={`${title} preview`} fill sizes="84px" className="object-contain p-2.5 sm:p-3" />
          </div>
          <div className="p-3.5 sm:p-4">
            <p className="text-[0.64rem] font-medium uppercase tracking-[0.2em] text-plum/55 sm:text-[0.68rem]">{messages.previewLabel}</p>
            <p className="mt-1.5 text-sm font-semibold text-ink sm:mt-2">{title}</p>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-plum/78 sm:leading-6">{subtitle}</p>
            <p className="mt-2.5 text-sm leading-6 text-ink/68 sm:mt-3">{shareText}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleNativeShare}
          aria-label={messages.share}
          title={messages.share}
          className="interactive-card inline-flex min-h-[4.4rem] items-center justify-between rounded-[1.25rem] bg-plum px-4 py-3 text-left text-white shadow-soft hover:bg-plum/92 sm:rounded-[1.35rem]"
        >
          <span className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/16 sm:h-11 sm:w-11">
              <Share2 className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold">{messages.share}</span>
              <span className="mt-1 block text-xs leading-5 text-white/74">{messages.shareHint}</span>
            </span>
          </span>
        </button>

        <button
          type="button"
          onClick={copyToClipboard}
          aria-label={messages.copy}
          title={messages.copy}
          className="interactive-card inline-flex min-h-[4.4rem] items-center justify-between rounded-[1.25rem] border border-plum/12 bg-white/88 px-4 py-3 text-left text-plum shadow-soft hover:bg-white sm:rounded-[1.35rem]"
        >
          <span className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-plum/8 sm:h-11 sm:w-11">
              <Copy className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold">{messages.copy}</span>
              <span className="mt-1 block text-xs leading-5 text-plum/62">{messages.copyHint}</span>
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
