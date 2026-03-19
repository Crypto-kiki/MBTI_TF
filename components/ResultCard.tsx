import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

import { getTagLabel, uiMessages } from '@/data/i18n/messages';
import { Locale } from '@/lib/i18n/config';
import { QuizMode, ResolvedQuizResult } from '@/types/quiz';
import { ResultImageCard } from '@/components/ResultImageCard';
import { ResultShareCard } from '@/components/ResultShareCard';

interface ResultCardProps {
  locale: Locale;
  mode: QuizMode;
  modeLabel: string;
  result: ResolvedQuizResult;
}

function getScoreInsight(locale: Locale, totalFScore: number, totalTScore: number) {
  const diff = Math.abs(totalFScore - totalTScore);

  if (locale === 'ko') {
    if (diff < 8) {
      return {
        headline: '당신은 F와 T 사이의 균형을 꽤 안정적으로 유지하고 있어요.',
        detail: '감정의 흐름을 읽으면서도 판단 기준을 함께 붙드는 편입니다.',
      };
    }

    if (totalFScore > totalTScore) {
      return diff < 18
        ? {
            headline: '당신은 F 쪽에 조금 더 가까운 균형형이에요.',
            detail: '먼저 마음의 결을 읽지만, 판단 기준도 놓치지 않으려는 흐름이 보입니다.',
          }
        : {
            headline: '당신은 F 흐름이 더 또렷하게 드러나는 편이에요.',
            detail: '사람의 감정과 관계의 온도를 먼저 읽으며 해석하는 경향이 강합니다.',
          };
    }

    return diff < 18
      ? {
          headline: '당신은 T 쪽에 조금 더 가까운 균형형이에요.',
          detail: '판단 기준이 비교적 선명하지만, 관계의 온도도 함께 살피는 편입니다.',
        }
      : {
          headline: '당신은 T 흐름이 더 또렷하게 드러나는 편이에요.',
          detail: '기준과 구조를 먼저 세우되, 감정 신호도 완전히 놓치지는 않는 타입입니다.',
        };
  }

  if (locale === 'ja') {
    if (diff < 8) {
      return {
        headline: 'あなたは F と T のあいだで、かなり安定したバランスを保っています。',
        detail: '感情の流れを受け取りながら、判断の軸も一緒に持てるタイプです。',
      };
    }

    if (totalFScore > totalTScore) {
      return diff < 18
        ? {
            headline: 'あなたは F に少し近いバランス型です。',
            detail: '気持ちの流れを先に読みつつ、判断の基準も保とうとする傾向があります。',
          }
        : {
            headline: 'あなたは F の流れがよりはっきり出ています。',
            detail: '人の感情や関係の温度を先に読んで解釈する傾向が強めです。',
          };
    }

    return diff < 18
      ? {
          headline: 'あなたは T に少し近いバランス型です。',
          detail: '判断基準は比較的明確ですが、関係の温度も一緒に見ています。',
        }
      : {
          headline: 'あなたは T の流れがよりはっきり出ています。',
          detail: '基準や構造を先に立てつつ、感情のサインも完全には見落としません。',
        };
  }

  if (locale === 'zh-TW') {
    if (diff < 8) {
      return {
        headline: '你在 F 與 T 之間維持了相當穩定的平衡。',
        detail: '你會讀情緒流動，也能同時保留自己的判斷基準。',
      };
    }

    if (totalFScore > totalTScore) {
      return diff < 18
        ? {
            headline: '你是稍微更偏向 F 的平衡型。',
            detail: '你會先感受情緒脈絡，但也沒有放掉自己的判準。',
          }
        : {
            headline: '你的 F 傾向表現得更明顯。',
            detail: '你通常會先讀懂人的感受與關係溫度，再展開解讀。',
          };
    }

    return diff < 18
      ? {
          headline: '你是稍微更偏向 T 的平衡型。',
          detail: '你的判準比較清楚，但也沒有忽略關係裡的溫度。',
        }
      : {
          headline: '你的 T 傾向表現得更明顯。',
          detail: '你會先建立標準與結構，同時也不會完全忽略情緒訊號。',
        };
  }

  if (diff < 8) {
    return {
      headline: 'You hold a fairly steady balance between F and T.',
      detail: 'You tend to read emotional flow while still keeping your judgment criteria in place.',
    };
  }

  if (totalFScore > totalTScore) {
    return diff < 18
      ? {
          headline: 'You lean slightly toward F while still staying balanced.',
          detail: 'You often read feeling first, but you keep your judgment criteria active too.',
        }
      : {
          headline: 'Your F tendency comes through more clearly.',
          detail: 'You are more likely to interpret a situation through emotion and relational tone first.',
        };
  }

  return diff < 18
    ? {
        headline: 'You lean slightly toward T while still staying balanced.',
        detail: 'Your criteria are fairly clear, but you still keep an eye on emotional temperature.',
      }
    : {
        headline: 'Your T tendency comes through more clearly.',
        detail: 'You usually establish structure and criteria first, without fully ignoring emotional cues.',
      };
}

function getReactionPatterns(locale: Locale, tags: string[]) {
  return tags.slice(0, 3).map((tag, index) => {
    const label = getTagLabel(locale, tag);

    if (locale === 'ko') {
      return [
        `${label} 신호를 먼저 살피는 반응`,
        `${label} 흐름을 기준으로 해석하는 반응`,
        `${label} 포인트를 놓치지 않으려는 선택`,
      ][index] ?? `${label} 단서를 따라가는 반응`;
    }

    if (locale === 'ja') {
      return [
        `${label} のサインを先に見る反応`,
        `${label} の流れを基準に読む反応`,
        `${label} のポイントを見落とさない選択`,
      ][index] ?? `${label} を手がかりにする反応`;
    }

    if (locale === 'zh-TW') {
      return [
        `會先留意「${label}」訊號的反應`,
        `以「${label}」脈絡來解讀的反應`,
        `不想漏掉「${label}」重點的選擇`,
      ][index] ?? `跟著「${label}」線索走的反應`;
    }

    return [
      `A response that notices ${label.toLowerCase()} cues first`,
      `A response that reads situations through ${label.toLowerCase()} flow`,
      `A choice that tries not to miss ${label.toLowerCase()} points`,
    ][index] ?? `A response guided by ${label.toLowerCase()} cues`;
  });
}

export function ResultCard({ locale, mode, modeLabel, result }: ResultCardProps) {
  const otherRoute = mode === 'f' ? `/${locale}/quiz/t` : `/${locale}/quiz/f`;
  const messages = uiMessages[locale].result;
  const compatibilityHref = `/${locale}/result/${result.profile.compatibility.type}`;
  const axisLabel =
    result.axis === 'balanced' ? messages.axis.balanced : result.axis === 'f' ? messages.axis.f : messages.axis.t;
  const hasAnsweredStats = result.totals.answeredCount > 0;
  const scoreInsight = getScoreInsight(locale, result.totals.totalFScore, result.totals.totalTScore);
  const reactionPatterns = getReactionPatterns(locale, result.dominantTags);

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="glass-panel overflow-hidden rounded-[2.6rem] bg-hero-glow p-5 sm:p-8 lg:p-10">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] xl:items-center">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="brand-chip bg-white/92 px-3.5 py-1.5 text-[0.7rem] tracking-[0.24em] text-plum/88 shadow-soft">
                <Sparkles className="h-3.5 w-3.5" />
                {messages.finalBadge}
              </div>
              <span className="rounded-full border border-plum/10 bg-white/78 px-3 py-1 text-xs font-medium tracking-[0.16em] text-plum/72">
                {modeLabel}
              </span>
              <span className="rounded-full bg-plum/10 px-3 py-1 text-sm text-plum">{axisLabel}</span>
            </div>

            <h1 className="mt-6 text-balance text-[2.6rem] font-semibold leading-[0.95] text-ink sm:text-[3.35rem] lg:text-[4.05rem]">
              {result.profile.title}
            </h1>
            <p className="mt-4 max-w-2xl text-xl font-medium leading-8 text-plum sm:text-[1.45rem] sm:leading-9">
              {result.profile.subtitle}
            </p>

            <div className="mt-5 rounded-[1.75rem] border border-white/75 bg-white/76 px-5 py-4 shadow-soft">
              <p className="text-base leading-8 text-ink sm:text-lg">{result.profile.quickSummary}</p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              {result.dominantTags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/84 px-3 py-1 text-sm text-plum/78 shadow-sm">
                  #{getTagLabel(locale, tag)}
                </span>
              ))}
            </div>

            <div className="mt-7 rounded-[2rem] bg-white/72 p-5 sm:p-6">
              <p className="max-w-2xl text-sm leading-8 text-ink/72 sm:text-base">{result.profile.description}</p>

              {hasAnsweredStats ? (
                <div className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.8rem] bg-gradient-to-br from-plum to-[#7a6677] p-5 text-white shadow-soft">
                      <p className="text-sm uppercase tracking-[0.24em] text-white/72">{messages.totalF}</p>
                      <p className="mt-3 text-4xl font-semibold">{result.totals.totalFScore}</p>
                      <p className="mt-2 text-sm text-white/72">{messages.fHint}</p>
                    </div>
                    <div className="rounded-[1.8rem] bg-gradient-to-br from-[#2d344a] to-[#5c6b87] p-5 text-white shadow-soft">
                      <p className="text-sm uppercase tracking-[0.24em] text-white/72">{messages.totalT}</p>
                      <p className="mt-3 text-4xl font-semibold">{result.totals.totalTScore}</p>
                      <p className="mt-2 text-sm text-white/72">{messages.tHint}</p>
                    </div>
                  </div>

                  <div className="rounded-[1.8rem] border border-plum/8 bg-white/88 p-5 shadow-soft">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-plum/58">{messages.scoreReport}</p>
                    <p className="mt-3 text-lg font-semibold text-ink">{scoreInsight.headline}</p>
                    <p className="mt-2 text-sm leading-7 text-ink/70">{scoreInsight.detail}</p>

                    <div className="mt-5">
                      <div className="flex items-center justify-between text-[0.72rem] font-medium uppercase tracking-[0.18em] text-plum/58">
                        <span>{messages.totalF}</span>
                        <span>{messages.totalT}</span>
                      </div>
                      <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#ede5f0]">
                        <div className="flex h-full">
                          <div className="bg-gradient-to-r from-plum to-[#a28097]" style={{ width: `${result.totals.totalFScore}%` }} />
                          <div className="bg-gradient-to-r from-[#60738C] to-[#8ca0bb]" style={{ width: `${result.totals.totalTScore}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="xl:pl-2">
            <ResultImageCard image={result.profile.image} title={result.profile.title} subtitle={result.profile.subtitle} variant="hero" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="w-full max-w-xl">
          <ResultShareCard
            locale={locale}
            resultType={result.profile.type}
            image={result.profile.image}
            title={result.profile.title}
            subtitle={result.profile.subtitle}
            messages={messages.share}
          />
        </div>
      </div>

      <div className="glass-panel rounded-[2.2rem] bg-white/82 p-6 shadow-soft sm:p-8">
        {reactionPatterns.length > 0 ? (
          <div className="mb-6 rounded-[2rem] border border-plum/8 bg-[#f8f5fb] p-5 sm:p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-plum/58">{messages.patternsTitle}</p>
            <p className="mt-3 text-sm leading-7 text-ink/68">{messages.patternsHint}</p>
            <ul className="mt-4 grid gap-3 lg:grid-cols-3">
              {reactionPatterns.map((pattern) => (
                <li key={pattern} className="rounded-[1.3rem] bg-white/90 px-4 py-4 text-sm leading-7 text-ink/72 shadow-sm">
                  {pattern}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-3">
          <div>
            <h2 className="text-lg font-semibold text-ink">{messages.strengths}</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-ink/70">
              {result.profile.strengths.map((strength) => (
                <li key={strength} className="flex gap-3 rounded-2xl bg-plum/5 px-4 py-3">
                  <span className="mt-1 text-plum">✦</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">{messages.tips}</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-ink/70">
              {result.profile.tips.map((tip) => (
                <li key={tip} className="flex gap-3 rounded-2xl bg-rose-50 px-4 py-3">
                  <span className="mt-1 text-plum">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">{messages.goodMatch}</h2>
            <div className="mt-4 rounded-[1.7rem] bg-[#f8f3ff] px-4 py-4">
              <p className="text-base font-semibold text-ink">{result.profile.compatibility.title}</p>
              <p className="mt-1 text-sm text-plum">{result.profile.compatibility.subtitle}</p>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-plum/60">{messages.goodMatchReason}</p>
              <p className="mt-2 text-sm leading-7 text-ink/70">{result.profile.compatibility.reason}</p>
              <Link
                href={compatibilityHref}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-plum transition hover:text-plum/80"
              >
                {result.profile.compatibility.title}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[1.9rem] bg-gradient-to-r from-[#1d1b22] via-plum to-[#8d7488] px-6 py-6 text-white shadow-float">
          <p className="text-sm uppercase tracking-[0.24em] text-white/70">{messages.cta}</p>
          <p className="mt-3 max-w-2xl text-lg leading-8">{result.profile.cta}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href={otherRoute} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-plum to-[#8d7488] px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-float">
          {messages.tryOther}
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link href={`/${locale}`} className="inline-flex items-center justify-center rounded-full border border-plum/12 bg-white/82 px-5 py-3 text-sm font-medium text-plum transition duration-300 hover:-translate-y-0.5 hover:bg-white">
          {messages.backHome}
        </Link>
      </div>
    </section>
  );
}
