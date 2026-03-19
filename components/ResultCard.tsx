import type { Route } from 'next';
import Link from 'next/link';
import { ArrowRight, Fingerprint, Lightbulb, Sparkles } from 'lucide-react';

import { getTagLabel, uiMessages } from '@/data/i18n/messages';
import { Locale } from '@/lib/i18n/config';
import { getAxisFromResultType } from '@/lib/results';
import { getSeriesQuizModeHref, getSeriesResultHref } from '@/lib/series';
import { QuizMode, ResolvedQuizResult } from '@/types/quiz';
import { SeriesKey } from '@/types/series';
import { ResultImageCard } from '@/components/ResultImageCard';
import { ResultShareCard } from '@/components/ResultShareCard';

interface ResultCardProps {
  locale: Locale;
  series: SeriesKey;
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

function getCompatibilityLead(locale: Locale, compatibilityAxis: 'f' | 't' | 'balanced') {
  if (locale === 'ko') {
    if (compatibilityAxis === 'f') {
      return '정서적 맥락을 잘 읽어주면서도 지금의 해석 흐름을 부드럽게 이어주는 연결입니다.';
    }

    if (compatibilityAxis === 't') {
      return '판단 기준과 구조를 보완해주면서 당신의 결을 더 또렷하게 살려주는 연결입니다.';
    }

    return '감정과 판단의 호흡을 비슷하게 맞추며 안정적으로 시너지를 내기 좋은 연결입니다.';
  }

  if (locale === 'ja') {
    if (compatibilityAxis === 'f') {
      return '感情の文脈を受け止めながら、あなたの読み取りの流れをやわらかく支えてくれる相手です。';
    }

    if (compatibilityAxis === 't') {
      return '判断基準や構造を補いながら、あなたの持ち味をよりはっきり引き出してくれる相手です。';
    }

    return '感情と判断の呼吸を合わせやすく、安定した相乗効果を作りやすい相手です。';
  }

  if (locale === 'zh-TW') {
    if (compatibilityAxis === 'f') {
      return '能接住情緒脈絡，同時溫柔延續你解讀節奏的搭配。';
    }

    if (compatibilityAxis === 't') {
      return '能補上判準與結構，讓你的特質更清楚發揮出來的搭配。';
    }

    return '在感受與判斷上都容易對到節奏，屬於穩定又有默契的搭配。';
  }

  if (compatibilityAxis === 'f') {
    return 'This pairing supports emotional context while gently extending the way you naturally read situations.';
  }

  if (compatibilityAxis === 't') {
    return 'This pairing reinforces structure and criteria while making your strengths feel sharper and clearer.';
  }

  return 'This pairing tends to match your emotional and judgment rhythm in a steadier, more balanced way.';
}

function getCompatibilityTags(locale: Locale, compatibilityAxis: 'f' | 't' | 'balanced') {
  if (locale === 'ko') {
    if (compatibilityAxis === 'f') {
      return ['#정서조율', '#관계호흡', '#온도보완'];
    }

    if (compatibilityAxis === 't') {
      return ['#판단보완', '#속도정리', '#기준시너지'];
    }

    return ['#조율', '#균형호흡', '#상호보완'];
  }

  if (locale === 'ja') {
    if (compatibilityAxis === 'f') {
      return ['#感情の調律', '#関係の呼吸', '#温度補完'];
    }

    if (compatibilityAxis === 't') {
      return ['#判断補完', '#ペース整理', '#基準シナジー'];
    }

    return ['#バランス', '#呼吸が合う', '#相互補完'];
  }

  if (locale === 'zh-TW') {
    if (compatibilityAxis === 'f') {
      return ['#情緒協調', '#關係節奏', '#溫度補位'];
    }

    if (compatibilityAxis === 't') {
      return ['#判準補位', '#節奏整理', '#結構互補'];
    }

    return ['#平衡協調', '#節奏契合', '#互相補位'];
  }

  if (compatibilityAxis === 'f') {
    return ['#emotional-fit', '#relational-rhythm', '#tone-balance'];
  }

  if (compatibilityAxis === 't') {
    return ['#criteria-support', '#pace-balance', '#clearer-structure'];
  }

  return ['#balanced-fit', '#shared-rhythm', '#mutual-support'];
}

function getCompatibilityCta(locale: Locale) {
  if (locale === 'ko') {
    return '왜 잘 맞는지 자세히 보기';
  }

  if (locale === 'ja') {
    return 'なぜ相性がいいのか見る';
  }

  if (locale === 'zh-TW') {
    return '查看為什麼這麼合拍';
  }

  return 'See why this pairing works';
}

function getGuidanceMessage(locale: Locale, axis: 'f' | 't' | 'balanced') {
  if (locale === 'ko') {
    if (axis === 'f') {
      return {
        lead: '지금의 공감 감각은 분명한 강점이에요.',
        support: '상대의 마음을 읽은 뒤, 내 판단 기준을 한 번 더 붙여보면 해석이 더 단단해집니다.',
      };
    }

    if (axis === 't') {
      return {
        lead: '지금의 판단 감각은 충분히 선명해요.',
        support: '기준을 세운 다음 관계의 온도를 한 번만 더 확인하면 전달력까지 더 좋아집니다.',
      };
    }

    return {
      lead: '지금의 균형 감각은 꽤 안정적이에요.',
      support: '상황마다 어느 쪽에 조금 더 힘을 줄지만 정하면, 해석과 표현이 한층 또렷해집니다.',
    };
  }

  if (locale === 'ja') {
    if (axis === 'f') {
      return {
        lead: '今の共感の感度は、はっきりした強みです。',
        support: '気持ちを受け取ったあとに自分の判断軸を一度添えると、読み取りがより安定します。',
      };
    }

    if (axis === 't') {
      return {
        lead: '今の判断の感度は、十分に明確です。',
        support: '基準を立てたあとに関係の温度をもう一度見ると、伝わり方まで整いやすくなります。',
      };
    }

    return {
      lead: '今のバランス感覚はかなり安定しています。',
      support: '場面ごとにどちらへ少し重心を置くか決めると、読み取りと表現がさらに明瞭になります。',
    };
  }

  if (locale === 'zh-TW') {
    if (axis === 'f') {
      return {
        lead: '你現在的共感感受力，是很清楚的優勢。',
        support: '先接住情緒，再補上一點自己的判準，解讀就會更穩。',
      };
    }

    if (axis === 't') {
      return {
        lead: '你現在的判斷感受力，已經相當清楚。',
        support: '先建立標準，再多看一次關係裡的溫度，表達會更完整。',
      };
    }

    return {
      lead: '你現在的平衡感，已經很穩定。',
      support: '如果每個情境都先決定要多偏向哪一側一點，解讀與表達會更清楚。',
    };
  }

  if (axis === 'f') {
    return {
      lead: 'Your empathic read is a real strength right now.',
      support: 'After noticing the emotional cue, add one pass of your own criteria to make your interpretation feel steadier.',
    };
  }

  if (axis === 't') {
    return {
      lead: 'Your judgment sense already feels clear and usable.',
      support: 'After setting the criteria, check the emotional temperature once more to make your delivery land better.',
    };
  }

  return {
    lead: 'Your balance between feeling and judgment is already solid.',
    support: 'If you decide which side to lean on slightly in each moment, your interpretation and expression will feel even clearer.',
  };
}

export function ResultCard({ locale, series, mode, modeLabel, result }: ResultCardProps) {
  const otherRoute = getSeriesQuizModeHref(locale, series, mode === 'f' ? 't' : 'f');
  const messages = uiMessages[locale].result;
  const compatibilityHref = getSeriesResultHref(locale, series, result.profile.compatibility.type);
  const compatibilityAxis = getAxisFromResultType(result.profile.compatibility.type);
  const compatibilityLead = getCompatibilityLead(locale, compatibilityAxis);
  const compatibilityTags = getCompatibilityTags(locale, compatibilityAxis);
  const compatibilityCta = getCompatibilityCta(locale);
  const guidanceMessage = getGuidanceMessage(locale, result.axis);
  const axisLabel =
    result.axis === 'balanced' ? messages.axis.balanced : result.axis === 'f' ? messages.axis.f : messages.axis.t;
  const hasAnsweredStats = result.totals.answeredCount > 0;
  const scoreInsight = getScoreInsight(locale, result.totals.totalFScore, result.totals.totalTScore);
  const reactionPatterns = getReactionPatterns(locale, result.dominantTags);

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:gap-5">
      <div className="glass-panel overflow-hidden rounded-[2.1rem] bg-hero-glow p-4 sm:rounded-[2.6rem] sm:p-7 lg:p-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.02fr)_minmax(22rem,0.98fr)] xl:items-start xl:gap-8">
          <div className="max-w-3xl xl:pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="brand-chip bg-white/92 px-3 py-1.5 text-[0.66rem] tracking-[0.22em] text-plum/88 shadow-soft sm:px-3.5 sm:text-[0.7rem] sm:tracking-[0.24em]">
                <Sparkles className="h-3.5 w-3.5" />
                {messages.finalBadge}
              </div>
              <span className="rounded-full border border-plum/10 bg-white/78 px-3 py-1 text-[0.68rem] font-medium tracking-[0.14em] text-plum/72 sm:text-xs sm:tracking-[0.16em]">
                {modeLabel}
              </span>
              <span className="rounded-full bg-plum/10 px-3 py-1 text-xs text-plum sm:text-sm">{axisLabel}</span>
            </div>

            <h1 className="mt-5 text-balance text-[2.2rem] font-semibold leading-[0.96] text-ink sm:mt-6 sm:text-[3.25rem] lg:text-[3.95rem]">
              {result.profile.title}
            </h1>
            <p className="mt-3 text-lg font-medium leading-7 text-plum sm:mt-4 sm:max-w-2xl sm:text-[1.42rem] sm:leading-9">
              {result.profile.subtitle}
            </p>

            <div className="mt-5 rounded-[1.65rem] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(248,242,248,0.92),rgba(242,236,251,0.88))] p-4 shadow-soft sm:rounded-[1.9rem] sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-plum/8 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-plum/74 sm:text-[0.72rem]">
                  {messages.summaryCard}
                </div>
                <p className="text-xs font-medium tracking-[0.08em] text-plum/50 sm:text-[0.78rem]">{messages.summaryHint}</p>
              </div>
              <p className="mt-3 text-base font-semibold leading-7 text-ink sm:text-[1.08rem] sm:leading-8">{result.profile.quickSummary}</p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-5 sm:gap-2.5">
              {result.dominantTags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/84 px-3 py-1 text-xs text-plum/78 shadow-sm sm:text-sm">
                  #{getTagLabel(locale, tag)}
                </span>
              ))}
            </div>

            <div className="mt-5 rounded-[1.55rem] bg-white/74 p-4 sm:mt-6 sm:rounded-[1.9rem] sm:p-5">
              <p className="max-w-2xl text-sm leading-7 text-ink/72 sm:text-base sm:leading-8">{result.profile.description}</p>

              {hasAnsweredStats ? (
                <div className="mt-6 space-y-4 sm:mt-7 sm:space-y-5">
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    <div className="rounded-[1.45rem] bg-gradient-to-br from-plum to-[#7a6677] p-4 text-white shadow-soft sm:rounded-[1.8rem] sm:p-5">
                      <p className="text-[0.68rem] uppercase tracking-[0.2em] text-white/72 sm:text-sm sm:tracking-[0.24em]">{messages.totalF}</p>
                      <p className="mt-2.5 text-3xl font-semibold sm:mt-3 sm:text-4xl">{result.totals.totalFScore}</p>
                      <p className="mt-1.5 text-xs leading-5 text-white/72 sm:mt-2 sm:text-sm">{messages.fHint}</p>
                    </div>
                    <div className="rounded-[1.45rem] bg-gradient-to-br from-[#2d344a] to-[#5c6b87] p-4 text-white shadow-soft sm:rounded-[1.8rem] sm:p-5">
                      <p className="text-[0.68rem] uppercase tracking-[0.2em] text-white/72 sm:text-sm sm:tracking-[0.24em]">{messages.totalT}</p>
                      <p className="mt-2.5 text-3xl font-semibold sm:mt-3 sm:text-4xl">{result.totals.totalTScore}</p>
                      <p className="mt-1.5 text-xs leading-5 text-white/72 sm:mt-2 sm:text-sm">{messages.tHint}</p>
                    </div>
                  </div>

                  <div className="rounded-[1.55rem] border border-plum/8 bg-white/88 px-4 py-4 shadow-soft sm:rounded-[1.8rem] sm:px-5 sm:py-5">
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-plum/58 sm:text-xs sm:tracking-[0.2em]">{messages.scoreReport}</p>
                    <p className="mt-3 text-[1.02rem] font-semibold leading-7 text-ink sm:mt-3.5 sm:text-[1.14rem] sm:leading-8">
                      {scoreInsight.headline}
                    </p>
                    <p className="mt-2.5 text-sm leading-6 text-ink/74 sm:text-[0.96rem] sm:leading-7">{scoreInsight.detail}</p>

                    <div className="mt-5 sm:mt-6">
                      <div className="flex items-center justify-between text-[0.68rem] font-medium uppercase tracking-[0.16em] text-plum/58 sm:text-[0.72rem] sm:tracking-[0.18em]">
                        <span>{messages.totalF}</span>
                        <span>{messages.totalT}</span>
                      </div>
                      <div className="mt-3.5 h-3 overflow-hidden rounded-full bg-[#ede5f0] sm:mt-4">
                        <div className="flex h-full">
                          <div className="bg-gradient-to-r from-plum to-[#a28097]" style={{ width: `${result.totals.totalFScore}%` }} />
                          <div className="bg-gradient-to-r from-[#60738C] to-[#8ca0bb]" style={{ width: `${result.totals.totalTScore}%` }} />
                        </div>
                      </div>
                      <p className="mt-3 text-xs leading-5 text-plum/52 sm:mt-3.5">{messages.summaryHint}</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="relative xl:pl-2">
            <ResultImageCard image={result.profile.image} title={result.profile.title} subtitle={result.profile.subtitle} variant="hero" />
            <div className="relative z-10 mx-2 -mt-4 sm:mx-5 sm:-mt-6 lg:mx-6 xl:mx-7">
              <ResultShareCard
                locale={locale}
                series={series}
                resultType={result.profile.type}
                image={result.profile.image}
                title={result.profile.title}
                subtitle={result.profile.subtitle}
                messages={messages.share}
                variant="embedded"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-[1.95rem] bg-white/82 p-4 shadow-soft sm:rounded-[2.2rem] sm:p-8">
        {reactionPatterns.length > 0 ? (
          <div className="mb-5 rounded-[1.7rem] border border-plum/10 bg-[linear-gradient(180deg,rgba(248,245,251,0.96),rgba(255,255,255,0.9))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] sm:mb-6 sm:rounded-[2rem] sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-plum/8 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-plum/74 sm:text-[0.72rem]">
                  <Fingerprint className="h-3.5 w-3.5" />
                  {messages.patternsTitle}
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/68 sm:text-[0.96rem] sm:leading-7">{messages.patternsHint}</p>
              </div>
              <p className="text-xs font-medium tracking-[0.08em] text-plum/52 sm:text-sm">{messages.summaryHint}</p>
            </div>

            <ul className="mt-4 grid gap-3 lg:grid-cols-3">
              {reactionPatterns.map((pattern, index) => (
                <li
                  key={pattern}
                  className="rounded-[1.25rem] border border-white/90 bg-white/94 px-4 py-4 text-sm leading-6 text-ink/74 shadow-sm sm:rounded-[1.35rem] sm:leading-7"
                >
                  <div className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-plum/10 px-2 text-[0.68rem] font-semibold text-plum/74">
                    0{index + 1}
                  </div>
                  <p className="mt-3">{pattern}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          <div>
            <h2 className="text-lg font-semibold text-ink">{messages.strengths}</h2>
            <ul className="mt-3.5 space-y-3 text-sm leading-6 text-ink/70 sm:mt-4 sm:leading-7">
              {result.profile.strengths.map((strength) => (
                <li key={strength} className="flex gap-3 rounded-[1.2rem] bg-plum/5 px-4 py-3 sm:rounded-2xl">
                  <span className="mt-1 text-plum">✦</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">{messages.tips}</h2>
            <ul className="mt-3.5 space-y-3 text-sm leading-6 text-ink/70 sm:mt-4 sm:leading-7">
              {result.profile.tips.map((tip) => (
                <li key={tip} className="flex gap-3 rounded-[1.2rem] bg-rose-50 px-4 py-3 sm:rounded-2xl">
                  <span className="mt-1 text-plum">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">{messages.goodMatch}</h2>
            <div className="mt-3.5 rounded-[1.6rem] border border-plum/10 bg-[linear-gradient(180deg,rgba(248,243,255,0.98),rgba(255,255,255,0.9))] px-4 py-4 shadow-soft sm:mt-4 sm:rounded-[1.85rem] sm:p-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-plum/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-plum/74 sm:text-[0.72rem]">
                <Sparkles className="h-3.5 w-3.5" />
                {messages.goodMatch}
              </div>
              <p className="mt-3 text-base font-semibold text-ink">{result.profile.compatibility.title}</p>
              <p className="mt-1 text-sm text-plum">{result.profile.compatibility.subtitle}</p>
              <p className="mt-4 text-sm leading-6 text-ink/74 sm:leading-7">{compatibilityLead}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {compatibilityTags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-plum/76 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-plum/58 sm:text-xs sm:tracking-[0.18em]">
                {messages.goodMatchReason}
              </p>
              <p className="mt-2 text-sm leading-6 text-ink/70 sm:leading-7">{result.profile.compatibility.reason}</p>
              <Link
                href={compatibilityHref as Route}
                className="interactive-card mt-5 inline-flex items-center gap-2 rounded-full border border-plum/14 bg-white px-4 py-2.5 text-sm font-semibold text-plum hover:border-plum/24 hover:bg-plum hover:text-white"
              >
                {compatibilityCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-[1.6rem] bg-gradient-to-r from-[#1d1b22] via-plum to-[#8d7488] px-4 py-5 text-white shadow-float sm:mt-6 sm:rounded-[1.9rem] sm:px-6 sm:py-6">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/14">
              <Lightbulb className="h-5 w-5" />
            </span>
            <div className="max-w-3xl">
              <p className="text-[0.68rem] uppercase tracking-[0.2em] text-white/70 sm:text-sm sm:tracking-[0.24em]">{messages.cta}</p>
              <p className="mt-2 text-base font-semibold leading-7 text-white sm:text-[1.06rem] sm:leading-8">{guidanceMessage.lead}</p>
              <p className="mt-2 text-sm leading-6 text-white/76 sm:text-[0.96rem] sm:leading-7">{guidanceMessage.support}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:pt-0">
        <Link
          href={otherRoute as Route}
          className="interactive-card inline-flex min-h-[3.35rem] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-plum to-[#8d7488] px-6 py-3.5 text-sm font-semibold text-white shadow-soft hover:shadow-float sm:flex-1 sm:min-h-[3.5rem] sm:flex-none"
        >
          {messages.tryOther}
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href={`/${locale}` as Route}
          className="interactive-card inline-flex min-h-[3.35rem] items-center justify-center rounded-full border border-plum/12 bg-white/84 px-5 py-3 text-sm font-medium text-plum hover:bg-white sm:min-h-[3.5rem]"
        >
          {messages.backHome}
        </Link>
      </div>
    </section>
  );
}
