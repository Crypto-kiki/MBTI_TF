'use client';

import { useEffect, useState } from 'react';
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
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(getShareUrl());
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = getShareUrl();
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

      <div className="mt-5 flex items-center gap-3">
        {shareSupported ? (
          <button
            type="button"
            onClick={handleNativeShare}
            aria-label={messages.share}
            title={messages.share}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-plum text-white shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-plum/92"
          >
            <Share2 className="h-5 w-5" />
          </button>
        ) : null}

        <button
          type="button"
          onClick={copyToClipboard}
          aria-label={messages.copy}
          title={messages.copy}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-plum/12 bg-white/82 text-plum shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-white"
        >
          <Copy className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
