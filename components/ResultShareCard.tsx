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
    <div className="glass-panel rounded-[1.95rem] border border-white/75 bg-white/76 p-5 shadow-soft sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="brand-chip border-white/75 bg-white/92 px-3 py-1 text-[0.68rem] tracking-[0.24em] shadow-none">
            <Link2 className="h-3.5 w-3.5" />
            {messages.badge}
          </div>
          <h2 className="mt-4 text-lg font-semibold text-ink">{messages.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/68">{messages.hint}</p>
        </div>
        {feedback ? (
          <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium shadow-sm ${
              feedback.tone === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}
          >
            {feedback.tone === 'success' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {feedback.message}
          </div>
        ) : null}
      </div>

      <div className="mt-5 overflow-hidden rounded-[1.6rem] border border-white/80 bg-white/92 shadow-sm">
        <div className="grid grid-cols-[5.2rem_minmax(0,1fr)] items-stretch">
          <div className="relative min-h-[5.2rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.98),rgba(246,233,230,0.82)_38%,rgba(221,212,239,0.78)_100%)]">
            <Image src={image.src} alt={`${title} preview`} fill sizes="84px" className="object-contain p-3" />
          </div>
          <div className="p-4">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-plum/55">{messages.previewLabel}</p>
            <p className="mt-2 text-sm font-semibold text-ink">{title}</p>
            <p className="mt-1 text-xs leading-6 text-plum/78">{subtitle}</p>
            <p className="mt-3 text-sm leading-6 text-ink/68">{shareText}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleNativeShare}
          aria-label={messages.share}
          title={messages.share}
          className="inline-flex items-center justify-between rounded-[1.35rem] bg-plum px-4 py-3 text-left text-white shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-plum/92"
        >
          <span className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/16">
              <Share2 className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold">{messages.share}</span>
              <span className="mt-1 block text-xs text-white/74">{messages.shareHint}</span>
            </span>
          </span>
        </button>

        <button
          type="button"
          onClick={copyToClipboard}
          aria-label={messages.copy}
          title={messages.copy}
          className="inline-flex items-center justify-between rounded-[1.35rem] border border-plum/12 bg-white/86 px-4 py-3 text-left text-plum shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-white"
        >
          <span className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-plum/8">
              <Copy className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold">{messages.copy}</span>
              <span className="mt-1 block text-xs text-plum/62">{messages.copyHint}</span>
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
