'use client';

import { useEffect, useMemo, useState } from 'react';
import { Check, Copy, Link2, Share2 } from 'lucide-react';

import { Locale } from '@/lib/i18n/config';
import { getResultHref } from '@/lib/results';
import { ResultType } from '@/types/quiz';

interface ResultShareMessages {
  title: string;
  hint: string;
  share: string;
  copy: string;
  copied: string;
  failed: string;
  shared: string;
}

interface ResultShareCardProps {
  locale: Locale;
  resultType: ResultType;
  title: string;
  subtitle: string;
  messages: ResultShareMessages;
}

export function ResultShareCard({ locale, resultType, title, subtitle, messages }: ResultShareCardProps) {
  const [shareSupported, setShareSupported] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: 'success' | 'error'; message: string } | null>(null);

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') {
      return getResultHref(locale, resultType);
    }

    return new URL(getResultHref(locale, resultType), window.location.origin).toString();
  }, [locale, resultType]);

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
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
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
        text: subtitle,
        url: shareUrl,
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
    <div className="glass-panel rounded-[1.85rem] bg-white/80 p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="brand-chip px-3 py-1 text-[0.68rem] tracking-[0.24em]">
            <Link2 className="h-3.5 w-3.5" />
            SHARE
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

      <div className="mt-4 rounded-[1.4rem] border border-plum/10 bg-gradient-to-r from-white to-plum/5 px-4 py-3 text-sm text-ink/62 shadow-sm">
        <span className="block truncate">{shareUrl}</span>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        {shareSupported ? (
          <button
            type="button"
            onClick={handleNativeShare}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-plum px-5 py-3 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-plum/92"
          >
            <Share2 className="h-4 w-4" />
            {messages.share}
          </button>
        ) : null}

        <button
          type="button"
          onClick={copyToClipboard}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-plum/12 bg-white/82 px-5 py-3 text-sm font-medium text-plum transition duration-300 hover:-translate-y-0.5 hover:bg-white"
        >
          <Copy className="h-4 w-4" />
          {messages.copy}
        </button>
      </div>
    </div>
  );
}
