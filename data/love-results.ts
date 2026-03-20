import { defaultLocale, type Locale } from '@/lib/i18n/config';
import { LoveResultType, ReportSection, ResultContent, ResultDefinition, ResultImage, ResultProfile } from '@/types/quiz';

const RESULT_IMAGE_SIZE = { width: 1200, height: 630 } as const;

type LocalizedRecord<T> = Record<Locale, T>;

function createResultImage(src: string): ResultImage {
  return {
    src,
    ...RESULT_IMAGE_SIZE,
  };
}

function localizedResultContent(ko: ResultContent, en: ResultContent): LocalizedRecord<ResultContent> {
  return {
    ko,
    ja: ko,
    'zh-TW': ko,
    en,
  };
}

function createLoveResultDefinition(type: LoveResultType, image: string, content: LocalizedRecord<ResultContent>): ResultDefinition {
  return {
    type,
    image: createResultImage(image),
    content,
  };
}

export const loveResultAxisMap: Record<LoveResultType, 'f' | 't' | 'balanced'> = {
  love_resonant_anchor: 'f',
  love_midnight_listener: 'f',
  love_heartbeat_reader: 'f',
  love_tender_guardian: 'f',
  love_signal_cartographer: 't',
  love_boundary_strategist: 't',
  love_clear_current: 't',
  love_repair_architect: 't',
  love_steady_weaver: 'balanced',
  love_gentle_negotiator: 'balanced',
};

export const loveClusterTags: Record<LoveResultType, string[]> = {
  love_resonant_anchor: ['affection_words', 'reassurance_consistency', 'conflict_emotion'],
  love_midnight_listener: ['hurt_expression', 'repair_time', 'conflict_emotion'],
  love_heartbeat_reader: ['contact_frequency', 'affection_words', 'hurt_expression'],
  love_tender_guardian: ['affection_actions', 'reassurance_consistency', 'repair_time'],
  love_signal_cartographer: ['contact_stability', 'hurt_priority', 'repair_explanation'],
  love_boundary_strategist: ['hurt_priority', 'reassurance_consistency', 'conflict_logic'],
  love_clear_current: ['contact_stability', 'affection_actions', 'conflict_logic'],
  love_repair_architect: ['repair_explanation', 'conflict_logic', 'reassurance_consistency'],
  love_steady_weaver: ['reassurance_consistency', 'contact_frequency', 'affection_actions'],
  love_gentle_negotiator: ['conflict_emotion', 'conflict_logic', 'repair_explanation'],
};

const compatibilityDefinitions: Record<LoveResultType, LocalizedRecord<{ type: LoveResultType; reason: string }>> = {
  love_resonant_anchor: {
    ko: { type: 'love_repair_architect', reason: '당신의 정서적 공명에 이 타입의 복구 설계력이 더해지면, 감정도 구조도 놓치지 않는 관계가 됩니다.' },
    ja: { type: 'love_repair_architect', reason: '당신の情緒的な共鳴に、このタイプの修復設計力が加わると、感情も構造も 놓치지 않는 관계になります.' },
    'zh-TW': { type: 'love_repair_architect', reason: '你的情緒共鳴加上這種類型的修復設計感，能讓關係同時照顧情感與結構。' },
    en: { type: 'love_repair_architect', reason: 'Your emotional resonance pairs well with this type’s repair structure, creating a relationship that holds both feeling and clarity.' },
  },
  love_midnight_listener: {
    ko: { type: 'love_clear_current', reason: '당신이 서운함의 결을 깊게 들어줄수록, 이 타입의 명료한 정리가 관계를 덜 소모적으로 만들어줍니다.' },
    ja: { type: 'love_clear_current', reason: 'あなたが気持ちの細部を丁寧に受け止めるほど、このタイプの明快さが関係を整えます。' },
    'zh-TW': { type: 'love_clear_current', reason: '你越能聽懂情緒深處，這種類型的清楚整理就越能讓關係少一點內耗。' },
    en: { type: 'love_clear_current', reason: 'Your depth of listening works especially well with this type’s clarity, reducing unnecessary relational drag.' },
  },
  love_heartbeat_reader: {
    ko: { type: 'love_boundary_strategist', reason: '당신이 연락의 리듬을 예민하게 읽는 만큼, 이 타입의 기준 감각이 관계의 불안을 안정적으로 잡아줍니다.' },
    ja: { type: 'love_boundary_strategist', reason: '連絡のリズムを敏感に読むあなたに、このタイプの基準感覚が安心感を与えてくれます。' },
    'zh-TW': { type: 'love_boundary_strategist', reason: '你很會讀懂聯絡節奏，這種類型的邊界感則能替關係穩住不安。' },
    en: { type: 'love_boundary_strategist', reason: 'You read relational rhythm closely, and this type brings the boundaries that keep that sensitivity from becoming anxiety.' },
  },
  love_tender_guardian: {
    ko: { type: 'love_signal_cartographer', reason: '당신의 돌봄은 이 타입의 패턴 읽기와 만나면 더 오래 가는 실질적 안정감으로 연결됩니다.' },
    ja: { type: 'love_signal_cartographer', reason: 'あなたのケアは、このタイプのパターン把握と組み合わさることで、より長く続く安心感になります。' },
    'zh-TW': { type: 'love_signal_cartographer', reason: '你的照顧力遇上這種類型的模式判讀，會變成更長久、實際的安全感。' },
    en: { type: 'love_signal_cartographer', reason: 'Your care becomes more durable when paired with this type’s ability to map patterns and keep the relationship grounded.' },
  },
  love_signal_cartographer: {
    ko: { type: 'love_tender_guardian', reason: '당신이 관계 신호를 패턴처럼 읽어낼 때, 이 타입의 온기가 상대의 체감을 부드럽게 채워줍니다.' },
    ja: { type: 'love_tender_guardian', reason: 'あなたが関係のサインをパターンとして読むなら、このタイプの温かさが体感をやわらかく支えます。' },
    'zh-TW': { type: 'love_tender_guardian', reason: '你擅長讀懂關係訊號，而這種類型的溫度能把感受層面補得更柔軟。' },
    en: { type: 'love_tender_guardian', reason: 'You map the signals; this type brings the warmth that keeps the connection emotionally felt.' },
  },
  love_boundary_strategist: {
    ko: { type: 'love_heartbeat_reader', reason: '당신의 선명한 기준은 이 타입의 감정 감도를 만나면 차갑지 않은 안정감으로 작동합니다.' },
    ja: { type: 'love_heartbeat_reader', reason: 'あなたの明確な基準は、このタイプの感受性と組み合わさることで、冷たくない安定感になります。' },
    'zh-TW': { type: 'love_heartbeat_reader', reason: '你的清楚基準若配上這種類型的敏感節奏感，穩定感會更有溫度。' },
    en: { type: 'love_heartbeat_reader', reason: 'Your clear standards feel steadier and less cold when paired with this type’s sensitivity to rhythm and reassurance.' },
  },
  love_clear_current: {
    ko: { type: 'love_midnight_listener', reason: '당신이 흐름을 정리해주고 이 타입이 감정을 깊게 들어주면, 회복 속도가 훨씬 부드러워집니다.' },
    ja: { type: 'love_midnight_listener', reason: 'あなたが流れを整理し、このタイプが気持ちを深く受け止めることで、回復がより自然になります。' },
    'zh-TW': { type: 'love_midnight_listener', reason: '你負責把脈絡理清，這種類型則能接住更深的情緒，讓修復更順。' },
    en: { type: 'love_midnight_listener', reason: 'You bring clarity, this type brings emotional depth, and together the repair process becomes much gentler.' },
  },
  love_repair_architect: {
    ko: { type: 'love_resonant_anchor', reason: '당신이 수습의 구조를 세우면, 이 타입의 정서적 공명이 관계를 더 따뜻하게 봉합해줍니다.' },
    ja: { type: 'love_resonant_anchor', reason: 'あなたが修復の構造を整えるほど、このタイプの情緒的な共鳴が関係を温かくつなぎ直します。' },
    'zh-TW': { type: 'love_resonant_anchor', reason: '你擅長建立修復結構，而這種類型的情緒共鳴會讓關係重新接起來時更有溫度。' },
    en: { type: 'love_resonant_anchor', reason: 'You build the repair structure; this type brings the emotional resonance that makes repair actually feel healing.' },
  },
  love_steady_weaver: {
    ko: { type: 'love_gentle_negotiator', reason: '당신의 안정적인 연결감에 이 타입의 부드러운 조율이 더해지면, 갈등과 애정 표현이 모두 자연스러워집니다.' },
    ja: { type: 'love_gentle_negotiator', reason: 'あなたの安定したつながりに、このタイプのやわらかな調整力が加わると、関係全体の呼吸が整います。' },
    'zh-TW': { type: 'love_gentle_negotiator', reason: '你帶來穩定連結，而這種類型的柔和協調能讓衝突與親密都更自然。' },
    en: { type: 'love_gentle_negotiator', reason: 'Your steady connection pairs beautifully with this type’s soft negotiation, making both intimacy and conflict feel more workable.' },
  },
  love_gentle_negotiator: {
    ko: { type: 'love_steady_weaver', reason: '당신의 조율력은 이 타입의 꾸준한 연결감과 만나면, 감정과 기준이 동시에 살아 있는 관계를 만듭니다.' },
    ja: { type: 'love_steady_weaver', reason: 'あなたの調整力は、このタイプの一貫したつながりと合わさることで、感情と基準が両立する関係をつくります。' },
    'zh-TW': { type: 'love_steady_weaver', reason: '你的協調力遇上這種類型穩定的連結感，就能讓情緒與規則一起被照顧。' },
    en: { type: 'love_steady_weaver', reason: 'Your negotiation strength works especially well with this type’s steady relational thread, letting feeling and clarity coexist.' },
  },
};

export const loveResultDefinitions: Record<LoveResultType, ResultDefinition> = {
  love_resonant_anchor: createLoveResultDefinition(
    'love_resonant_anchor',
    '/images/results/f-empathy.svg',
    localizedResultContent(
      {
        title: 'Resonant Anchor',
        subtitle: '감정의 파장을 안정감으로 바꾸는 연애형',
        summary: '상대의 감정 파동을 빠르게 감지하고, 그 감정을 안전하게 머물게 만드는 타입이에요.',
        keywords: ['감정 공명', '말로 안심', '정서적 연결'],
        description: '당신은 연애에서 감정의 떨림을 가장 먼저 읽습니다. 다정한 말 한마디, 먼저 건네는 안부, 흔들리는 순간에도 관계를 놓지 않는 태도로 사랑을 지키려 해요.',
        strengths: ['감정의 온도 변화를 빠르게 읽음', '말로 애정을 확인하고 안심을 주는 힘', '갈등 속에서도 정서적 연결을 끊지 않음'],
        tips: ['상대의 감정까지 모두 책임지려 들지 않기', '안심을 주는 말과 내 경계도 함께 세우기', '불안을 표현할 땐 원하는 방식도 같이 말하기'],
        cta: '당신의 따뜻한 공명은 관계의 흔들림을 붙잡는 닻이 됩니다.',
        compatibility: { type: 'love_repair_architect', reason: '' },
      },
      {
        title: 'Resonant Anchor',
        subtitle: 'Turns emotional waves into reassurance',
        summary: 'You quickly sense emotional movement and make it feel safe enough to stay in the room.',
        keywords: ['emotional resonance', 'verbal reassurance', 'emotional closeness'],
        description: 'In love, you read emotional vibration first. You protect the relationship through warm words, timely check-ins, and a steady refusal to emotionally drop the bond when things shake.',
        strengths: ['Reads emotional temperature quickly', 'Offers reassurance through words and warmth', 'Keeps emotional connection intact during conflict'],
        tips: ['Do not carry both people’s emotions alone', 'Pair reassurance with healthy boundaries', 'When naming anxiety, also name what you need'],
        cta: 'Your resonance becomes the anchor that keeps love from drifting.',
        compatibility: { type: 'love_repair_architect', reason: '' },
      },
    ),
  ),
  love_midnight_listener: createLoveResultDefinition(
    'love_midnight_listener',
    '/images/results/f-nuance.svg',
    localizedResultContent(
      {
        title: 'Midnight Listener',
        subtitle: '말하지 못한 서운함까지 끝까지 듣는 연애형',
        summary: '감정이 정리될 때까지 충분히 들어주고, 서운함의 결을 놓치지 않는 타입이에요.',
        keywords: ['깊은 경청', '서운함 해석', '감정 회복'],
        description: '당신은 싸움의 표면보다 그 아래 깔린 감정을 더 중요하게 봅니다. 상대가 무엇 때문에 아팠는지, 어느 지점에서 마음이 닫혔는지를 길게 듣고 이해하려는 힘이 커요.',
        strengths: ['숨은 서운함과 상처를 잘 포착함', '회복에 필요한 정서적 시간을 존중함', '상대가 안전하게 마음을 풀어놓게 만듦'],
        tips: ['회복 시간이 끝없이 늘어지지 않도록 마감점도 잡기', '내 감정도 같은 깊이로 돌보기', '이해한 내용을 짧게 정리해 상대와 공유하기'],
        cta: '당신의 깊은 경청은 상처를 풀어낼 공간을 만들어줍니다.',
        compatibility: { type: 'love_clear_current', reason: '' },
      },
      {
        title: 'Midnight Listener',
        subtitle: 'Stays long enough to hear what hurt',
        summary: 'You listen until emotion has actually been processed, not just mentioned.',
        keywords: ['deep listening', 'hurt decoding', 'emotional repair'],
        description: 'You care less about the surface of a fight and more about the feeling underneath it. You want to know what truly hurt, where the heart closed, and what it will take for the relationship to feel safe again.',
        strengths: ['Catches hidden disappointment and hurt', 'Respects the emotional time needed for repair', 'Creates a space where feelings can be spoken safely'],
        tips: ['Do not let recovery become endless without direction', 'Give your own feelings the same depth of care', 'Summarize what you understood so repair can move'],
        cta: 'Your listening creates the room where hurt can finally soften.',
        compatibility: { type: 'love_clear_current', reason: '' },
      },
    ),
  ),
  love_heartbeat_reader: createLoveResultDefinition(
    'love_heartbeat_reader',
    '/images/results/f-warmth.svg',
    localizedResultContent(
      {
        title: 'Heartbeat Reader',
        subtitle: '연락의 리듬으로 마음의 온도를 읽는 연애형',
        summary: '연락 빈도와 연결감을 사랑의 체온처럼 느끼는 타입이에요.',
        keywords: ['연락 리듬', '애정 확인', '연결감 감지'],
        description: '당신에게 연락은 단순한 정보 전달이 아니라 관계의 맥박입니다. 자주 이어지는 안부, 짧아도 마음이 담긴 표현, 끊기지 않는 리듬이 곧 사랑의 안정감으로 번져요.',
        strengths: ['연결감의 미세한 변화에 민감함', '따뜻한 표현과 애정 확인에 능숙함', '관계의 온도를 빠르게 회복시키는 힘'],
        tips: ['연락 리듬과 애정의 크기를 완전히 동일시하지 않기', '불안이 올라오면 혼자 해석하기보다 먼저 확인하기', '원하는 연락 감각을 구체적으로 말해주기'],
        cta: '당신은 사랑의 맥박을 누구보다 빠르게 읽어내는 사람입니다.',
        compatibility: { type: 'love_boundary_strategist', reason: '' },
      },
      {
        title: 'Heartbeat Reader',
        subtitle: 'Reads love through rhythm and contact',
        summary: 'For you, contact rhythm feels like the heartbeat of the relationship.',
        keywords: ['contact rhythm', 'warm reassurance', 'connection sensing'],
        description: 'Messages are never just logistics to you. Reaching out, keeping the thread alive, and feeling warmth in small exchanges become the emotional pulse that tells you the bond is still there.',
        strengths: ['Sensitive to subtle shifts in connection', 'Naturally expressive and warm in contact', 'Good at restoring emotional warmth quickly'],
        tips: ['Do not fully equate contact rhythm with the size of love', 'When anxiety rises, check instead of only interpreting', 'State the kind of contact rhythm that helps you feel secure'],
        cta: 'You are someone who hears the heartbeat of love very clearly.',
        compatibility: { type: 'love_boundary_strategist', reason: '' },
      },
    ),
  ),
  love_tender_guardian: createLoveResultDefinition(
    'love_tender_guardian',
    '/images/results/f-shelter.svg',
    localizedResultContent(
      {
        title: 'Tender Guardian',
        subtitle: '말보다 돌봄과 실질감으로 사랑을 지키는 연애형',
        summary: '애정이 행동과 챙김으로 드러날 때 가장 진심에 가깝다고 느끼는 타입이에요.',
        keywords: ['행동형 애정', '실질적 돌봄', '안정감 제공'],
        description: '당신은 사랑을 보여줄 때 실제 행동으로 증명하는 편입니다. 필요한 걸 챙기고, 흔들리는 순간 생활을 받쳐주며, 관계를 오래 가게 만드는 실질적인 따뜻함을 만들어요.',
        strengths: ['행동으로 애정을 꾸준히 전달함', '관계의 안전감을 현실적으로 지켜줌', '회복 단계에서 실질적인 도움을 제공함'],
        tips: ['행동만큼 말로도 마음을 확인해주기', '챙김이 통제처럼 느껴지지 않도록 점검하기', '돌봄의 부담을 혼자 떠안지 않기'],
        cta: '당신의 다정함은 말보다 오래 남는 형태로 관계를 지켜줍니다.',
        compatibility: { type: 'love_signal_cartographer', reason: '' },
      },
      {
        title: 'Tender Guardian',
        subtitle: 'Protects love through care and action',
        summary: 'You trust love most when it becomes visible through care, help, and consistency.',
        keywords: ['action-based love', 'practical care', 'steady support'],
        description: 'You show love by doing. You take care of what matters, support the bond in unstable moments, and create the kind of practical warmth that helps a relationship last.',
        strengths: ['Expresses affection consistently through action', 'Protects security in practical ways', 'Offers real help during recovery'],
        tips: ['Let your words confirm what your actions already show', 'Check that care is not being felt as control', 'Do not carry the whole burden of caretaking alone'],
        cta: 'Your tenderness protects love in forms that last longer than words.',
        compatibility: { type: 'love_signal_cartographer', reason: '' },
      },
    ),
  ),
  love_signal_cartographer: createLoveResultDefinition(
    'love_signal_cartographer',
    '/images/results/t-signal.svg',
    localizedResultContent(
      {
        title: 'Signal Cartographer',
        subtitle: '관계 신호를 패턴처럼 읽고 정리하는 연애형',
        summary: '연락, 우선순위, 반복 패턴을 통해 관계의 상태를 해석하는 타입이에요.',
        keywords: ['패턴 해석', '신호 분석', '관계 지도'],
        description: '당신은 연애를 감정만으로 읽지 않습니다. 어떤 연락 패턴이 이어지는지, 무엇이 반복되는지, 설명과 행동이 일치하는지를 보며 관계의 지도를 그립니다.',
        strengths: ['관계 패턴을 빠르게 구조화함', '불안을 사실과 흐름으로 정리함', '반복 문제의 핵심 신호를 잘 포착함'],
        tips: ['패턴 분석이 감정 무시처럼 보이지 않게 표현하기', '상대의 체감 언어도 함께 받아들이기', '문제 정의 후에도 안심을 주는 한마디 남기기'],
        cta: '당신의 정리력은 관계의 안개 속에 지도를 그려줍니다.',
        compatibility: { type: 'love_tender_guardian', reason: '' },
      },
      {
        title: 'Signal Cartographer',
        subtitle: 'Maps the relationship through patterns',
        summary: 'You read the state of love through rhythm, priorities, and repeated signals.',
        keywords: ['pattern reading', 'signal analysis', 'relationship mapping'],
        description: 'You do not read love through feeling alone. You track patterns in contact, priority, consistency, and explanation, building a map of what the relationship is actually doing over time.',
        strengths: ['Structures relational patterns quickly', 'Turns anxiety into something observable', 'Spots the true signals behind repeated issues'],
        tips: ['Make sure analysis does not sound like emotional dismissal', 'Receive your partner’s felt experience too', 'After defining the issue, still offer reassurance'],
        cta: 'Your clarity draws a map through the fog of uncertainty.',
        compatibility: { type: 'love_tender_guardian', reason: '' },
      },
    ),
  ),
  love_boundary_strategist: createLoveResultDefinition(
    'love_boundary_strategist',
    '/images/results/t-criteria.svg',
    localizedResultContent(
      {
        title: 'Boundary Strategist',
        subtitle: '우선순위와 기준으로 관계를 안정시키는 연애형',
        summary: '감정의 크기보다도 관계를 지탱하는 기준과 선을 중요하게 보는 타입이에요.',
        keywords: ['우선순위', '관계 기준', '경계 설정'],
        description: '당신은 사랑이 오래 가려면 감정만큼 기준이 필요하다고 믿습니다. 무엇이 중요한지, 어디까지 괜찮은지, 반복되는 문제를 어떤 룰로 다룰지 정리할 때 안심이 생겨요.',
        strengths: ['우선순위와 경계를 분명히 세움', '불필요한 혼선을 줄이는 기준 감각', '관계를 오래 가게 하는 구조를 만듦'],
        tips: ['기준을 말할 때 상대 감정도 함께 인정하기', '원칙이 통제처럼 들리지 않게 설명하기', '안정감이 필요한 이유를 따뜻하게 공유하기'],
        cta: '당신의 선명한 기준은 관계를 오래 버티게 하는 골격이 됩니다.',
        compatibility: { type: 'love_heartbeat_reader', reason: '' },
      },
      {
        title: 'Boundary Strategist',
        subtitle: 'Stabilizes love through standards and boundaries',
        summary: 'You trust relationships more when expectations, priorities, and limits are clear.',
        keywords: ['clear priorities', 'relationship standards', 'boundaries'],
        description: 'You believe love needs more than feeling to last. You feel safest when priorities are visible, limits are understandable, and recurring issues are met with clearer agreements.',
        strengths: ['Sets clear priorities and boundaries', 'Reduces confusion with clean standards', 'Builds the structure that helps relationships endure'],
        tips: ['Name the other person’s feelings while stating standards', 'Explain principles so they do not sound controlling', 'Share the tenderness behind your need for clarity'],
        cta: 'Your clarity becomes the framework that helps love hold.',
        compatibility: { type: 'love_heartbeat_reader', reason: '' },
      },
    ),
  ),
  love_clear_current: createLoveResultDefinition(
    'love_clear_current',
    '/images/results/t-calm.svg',
    localizedResultContent(
      {
        title: 'Clear Current',
        subtitle: '감정보다 흐름 정리를 먼저 해주는 연애형',
        summary: '갈등 상황에서도 무엇이 일어났는지 명료하게 정리할 때 관계가 풀린다고 느끼는 타입이에요.',
        keywords: ['쟁점 정리', '흐름 설명', '명료한 회복'],
        description: '당신은 감정의 파도 속에서도 사건의 흐름을 정리하려고 합니다. 무엇이 쟁점이었는지, 어디서 오해가 생겼는지, 다음엔 무엇을 바꾸면 되는지 명확해질수록 마음도 편해져요.',
        strengths: ['복잡한 갈등을 명확한 흐름으로 정리함', '문제의 핵심을 빠르게 짚음', '설명과 합의를 통해 회복 속도를 높임'],
        tips: ['정리가 빠를수록 감정 속도는 더 천천히 맞추기', '상대가 체감한 아픔도 해석의 일부로 다루기', '해결책 전에 공감 한 줄을 먼저 건네기'],
        cta: '당신의 명료함은 복잡한 감정에 흐름을 만들어줍니다.',
        compatibility: { type: 'love_midnight_listener', reason: '' },
      },
      {
        title: 'Clear Current',
        subtitle: 'Untangles love by clarifying the flow',
        summary: 'You feel repair begin when the sequence of what happened becomes understandable.',
        keywords: ['issue clarity', 'sequence reading', 'clear repair'],
        description: 'Even inside emotional turbulence, you want to clarify what happened, where the misunderstanding began, and what should change next. Clarity helps your heart settle too.',
        strengths: ['Organizes conflict into a clear flow', 'Finds the core issue quickly', 'Speeds repair through explanation and agreement'],
        tips: ['The faster your mind resolves, the slower you may need to pace emotion', 'Treat felt pain as part of the actual issue', 'Offer one line of empathy before the solution'],
        cta: 'Your clarity gives emotion a current it can move through.',
        compatibility: { type: 'love_midnight_listener', reason: '' },
      },
    ),
  ),
  love_repair_architect: createLoveResultDefinition(
    'love_repair_architect',
    '/images/results/t-structure.svg',
    localizedResultContent(
      {
        title: 'Repair Architect',
        subtitle: '갈등 후 복구 시나리오를 세우는 연애형',
        summary: '화해는 감정 진정뿐 아니라 재발 방지 설계까지 있어야 완성된다고 느끼는 타입이에요.',
        keywords: ['복구 설계', '재발 방지', '합의 구조'],
        description: '당신은 싸움을 끝내는 것보다 제대로 수습하는 것을 더 중요하게 봅니다. 설명, 합의, 다음 행동 계획이 만들어질 때 비로소 관계가 복구되었다고 느껴요.',
        strengths: ['회복 과정을 구조적으로 설계함', '재발 방지 기준을 잘 세움', '감정 소모를 줄이는 실질적 합의를 만듦'],
        tips: ['설계 전에 감정 정리가 충분했는지 확인하기', '합의가 상대를 압박하지 않는지 살피기', '회복 과정에도 따뜻한 표현을 섞어주기'],
        cta: '당신의 복구 설계력은 관계가 다시 무너지지 않게 받쳐줍니다.',
        compatibility: { type: 'love_resonant_anchor', reason: '' },
      },
      {
        title: 'Repair Architect',
        subtitle: 'Builds the structure that helps love recover',
        summary: 'For you, reconciliation feels complete when the repair process is actually designed.',
        keywords: ['repair design', 'prevention', 'structured agreement'],
        description: 'You care less about ending the fight quickly and more about repairing it well. Explanation, agreement, and a clear next-step plan help you feel the relationship is truly back on solid ground.',
        strengths: ['Designs recovery in a structured way', 'Sets strong recurrence-prevention standards', 'Creates practical agreements that reduce emotional waste'],
        tips: ['Check that emotion has had enough room before structuring', 'Make sure agreements do not feel like pressure', 'Blend tenderness into the repair process too'],
        cta: 'Your repair design keeps love from collapsing in the same place twice.',
        compatibility: { type: 'love_resonant_anchor', reason: '' },
      },
    ),
  ),
  love_steady_weaver: createLoveResultDefinition(
    'love_steady_weaver',
    '/images/results/b_attune.svg',
    localizedResultContent(
      {
        title: 'Steady Weaver',
        subtitle: '감정과 기준을 함께 엮어 관계를 오래 가게 하는 연애형',
        summary: '표현의 온도와 행동의 일관성을 함께 챙기며, 관계를 촘촘하게 엮어가는 타입이에요.',
        keywords: ['균형형 애정', '일관성', '관계 리듬'],
        description: '당신은 한쪽으로 치우치기보다 관계를 오래 가게 하는 균형을 압니다. 다정한 연결감과 현실적인 안정감이 모두 필요하다고 느끼며, 두 축을 함께 엮어 사랑을 견고하게 만들어요.',
        strengths: ['감정과 기준을 동시에 챙김', '연락, 표현, 행동의 균형을 잘 맞춤', '관계를 오래 가게 하는 안정적 리듬을 만듦'],
        tips: ['균형을 지키느라 내 욕구가 흐려지지 않게 하기', '상대에게도 내가 중요하게 보는 축을 말하기', '완벽한 균형보다 지금 필요한 쪽을 먼저 고르기'],
        cta: '당신은 관계를 오래 가게 만드는 촘촘한 결을 짜는 사람입니다.',
        compatibility: { type: 'love_gentle_negotiator', reason: '' },
      },
      {
        title: 'Steady Weaver',
        subtitle: 'Weaves feeling and stability together',
        summary: 'You keep both emotional warmth and practical steadiness in the same relationship frame.',
        keywords: ['balanced affection', 'consistency', 'relationship rhythm'],
        description: 'You rarely believe love survives on only one thing. You want warmth and consistency, expression and action, tenderness and reliability, and you are good at weaving them into one durable bond.',
        strengths: ['Holds emotion and standards together', 'Balances contact, expression, and action well', 'Creates a stable rhythm that helps love last'],
        tips: ['Do not let your own needs blur while keeping balance', 'Tell your partner what kinds of steadiness matter to you', 'Choose what is most needed now instead of chasing perfect balance'],
        cta: 'You are the kind of person who weaves relationships so they last.',
        compatibility: { type: 'love_gentle_negotiator', reason: '' },
      },
    ),
  ),
  love_gentle_negotiator: createLoveResultDefinition(
    'love_gentle_negotiator',
    '/images/results/b_bridge.svg',
    localizedResultContent(
      {
        title: 'Gentle Negotiator',
        subtitle: '서운함도 구조도 부드럽게 조율하는 연애형',
        summary: '감정 해석과 문제 정리를 둘 다 놓치지 않으며, 관계의 호흡을 맞추는 타입이에요.',
        keywords: ['부드러운 조율', '감정 번역', '합의 감각'],
        description: '당신은 누가 더 맞고 틀렸는지보다, 이 관계가 어떻게 다시 맞춰질 수 있는지에 집중합니다. 감정을 번역하고 쟁점을 정리하며, 둘 사이의 언어를 다시 맞추는 힘이 커요.',
        strengths: ['감정과 논리를 동시에 번역함', '충돌 상황에서 대화의 호흡을 다시 맞춤', '관계를 위한 현실적 합의를 부드럽게 이끔'],
        tips: ['중재 역할에만 머물지 말고 내 입장도 분명히 하기', '모두가 편해지는 답만 찾느라 핵심을 흐리지 않기', '합의 이후에도 감정의 잔여물을 확인하기'],
        cta: '당신의 조율력은 갈등을 관계의 새로운 언어로 바꿔줍니다.',
        compatibility: { type: 'love_steady_weaver', reason: '' },
      },
      {
        title: 'Gentle Negotiator',
        subtitle: 'Brings feeling and structure back into rhythm',
        summary: 'You translate both emotion and issue structure so the relationship can breathe again.',
        keywords: ['soft negotiation', 'emotion translation', 'shared agreement'],
        description: 'You focus less on who was right and more on how the bond can be recalibrated. You are good at translating feeling, organizing issues, and helping two people find a shared language again.',
        strengths: ['Translates emotion and logic at the same time', 'Resets conversational rhythm during conflict', 'Guides practical agreement without losing softness'],
        tips: ['Do not stay only in mediator mode; state your own position too', 'Avoid smoothing so much that the core issue disappears', 'After agreement, still check for emotional residue'],
        cta: 'Your coordination turns conflict into a new shared language.',
        compatibility: { type: 'love_steady_weaver', reason: '' },
      },
    ),
  ),
};

export const loveReportSectionContent: LocalizedRecord<
  Record<
    string,
    {
      label: string;
      leftLabel: string;
      rightLabel: string;
      leftSummary: string;
      rightSummary: string;
      balancedSummary: string;
    }
  >
> = {
  ko: {
    conflict: {
      label: '갈등 반응',
      leftLabel: '감정 결 먼저 읽기',
      rightLabel: '쟁점 구조 먼저 정리하기',
      leftSummary: '감정이 다치지 않는지가 먼저 중요해요.',
      rightSummary: '무엇이 문제였는지 정리되어야 마음이 놓여요.',
      balancedSummary: '감정과 쟁점을 함께 다뤄야 갈등이 풀린다고 느껴요.',
    },
    contact: {
      label: '연락 감각',
      leftLabel: '자주 이어지는 연결감',
      rightLabel: '예측 가능한 안정 패턴',
      leftSummary: '연락의 빈도와 온도가 관계의 맥박처럼 느껴져요.',
      rightSummary: '연락 횟수보다도 일정한 흐름이 더 큰 안심을 줘요.',
      balancedSummary: '자주 연결되든 아니든, 리듬이 끊기지 않는지가 중요해요.',
    },
    hurt: {
      label: '서운함 포인트',
      leftLabel: '표현과 감정 수용',
      rightLabel: '우선순위와 실행 기준',
      leftSummary: '내 마음이 어떻게 받아들여졌는지가 가장 크게 남아요.',
      rightSummary: '말보다 실제 우선순위와 반복 패턴이 더 크게 남아요.',
      balancedSummary: '표현도 중요하지만, 결국 행동과 우선순위까지 함께 봐요.',
    },
    affection: {
      label: '애정 표현 방식',
      leftLabel: '말과 확인 중심',
      rightLabel: '행동과 실질감 중심',
      leftSummary: '다정한 말과 표현이 사랑의 체온을 만든다고 느껴요.',
      rightSummary: '애정은 결국 행동과 책임으로 증명된다고 느껴요.',
      balancedSummary: '말과 행동이 함께 맞아떨어질 때 가장 진심으로 느껴져요.',
    },
    reassurance: {
      label: '안정감 기준',
      leftLabel: '감정적으로 내 편인 느낌',
      rightLabel: '일관성과 예측 가능성',
      leftSummary: '감정이 흔들릴 때도 정서적으로 붙어주는지가 중요해요.',
      rightSummary: '약속과 패턴이 일관되게 유지되는지가 중요해요.',
      balancedSummary: '정서적 지지와 일관성이 함께 있을 때 가장 안심돼요.',
    },
    repair: {
      label: '갈등 후 회복 방식',
      leftLabel: '충분한 감정 시간',
      rightLabel: '납득 가능한 설명과 합의',
      leftSummary: '감정이 실제로 풀릴 때까지 시간이 필요해요.',
      rightSummary: '왜 그런 일이 생겼고 어떻게 달라질지 설명되어야 풀려요.',
      balancedSummary: '감정이 정리되는 시간과 설명 둘 다 있어야 회복이 완성돼요.',
    },
  },
  ja: {} as LocalizedRecord<Record<string, never>>['ko'],
  'zh-TW': {} as LocalizedRecord<Record<string, never>>['ko'],
  en: {
    conflict: {
      label: 'Conflict response',
      leftLabel: 'Emotional impact first',
      rightLabel: 'Issue structure first',
      leftSummary: 'You care first about whether hearts are being hurt.',
      rightSummary: 'You relax once the actual issue becomes clear.',
      balancedSummary: 'You want emotion and issue structure handled together.',
    },
    contact: {
      label: 'Contact rhythm',
      leftLabel: 'Frequent connection',
      rightLabel: 'Stable pattern',
      leftSummary: 'Contact frequency feels like the heartbeat of the bond.',
      rightSummary: 'Predictable rhythm matters more than constant contact.',
      balancedSummary: 'You care about rhythm staying alive, not just raw volume.',
    },
    hurt: {
      label: 'Hurt trigger',
      leftLabel: 'Emotional reception',
      rightLabel: 'Priority and follow-through',
      leftSummary: 'What lingers most is how your feelings were received.',
      rightSummary: 'What lingers most is where you stood in priority and action.',
      balancedSummary: 'Expression matters, but action and priority matter too.',
    },
    affection: {
      label: 'Affection style',
      leftLabel: 'Words and reassurance',
      rightLabel: 'Actions and proof',
      leftSummary: 'Warm words feel like the clearest shape of love.',
      rightSummary: 'Love feels most real when it becomes action.',
      balancedSummary: 'Love feels best when words and action align.',
    },
    reassurance: {
      label: 'Reassurance basis',
      leftLabel: 'Feeling emotionally held',
      rightLabel: 'Consistency and predictability',
      leftSummary: 'You feel safest when the bond stays emotionally close.',
      rightSummary: 'You feel safest when patterns and promises stay steady.',
      balancedSummary: 'You want both emotional holding and consistency.',
    },
    repair: {
      label: 'Repair style',
      leftLabel: 'Time to feel through it',
      rightLabel: 'Explanation and agreement',
      leftSummary: 'Repair begins when emotion has had enough room.',
      rightSummary: 'Repair begins when what happened makes sense.',
      balancedSummary: 'You need both emotional processing and explanation.',
    },
  },
};

loveReportSectionContent.ja = loveReportSectionContent.ko;
loveReportSectionContent['zh-TW'] = loveReportSectionContent.ko;

export function getLoveResultProfile(locale: Locale, type: LoveResultType): ResultProfile {
  const definition = loveResultDefinitions[type];
  const content = definition.content[locale] ?? definition.content[defaultLocale];
  const compatibility = compatibilityDefinitions[type][locale] ?? compatibilityDefinitions[type][defaultLocale];
  const compatibilityContent = loveResultDefinitions[compatibility.type].content[locale] ?? loveResultDefinitions[compatibility.type].content[defaultLocale];

  return {
    type,
    image: definition.image,
    ...content,
    summary: content.summary ?? content.quickSummary ?? content.description,
    quickSummary: content.quickSummary ?? content.summary ?? content.description,
    compatibility: {
      ...compatibility,
      title: compatibilityContent.title,
      subtitle: compatibilityContent.subtitle,
    },
  };
}

export function getLocalizedLoveResultProfiles(locale: Locale): Record<LoveResultType, ResultProfile> {
  return Object.fromEntries(
    (Object.keys(loveResultDefinitions) as LoveResultType[]).map((type) => [type, getLoveResultProfile(locale, type)]),
  ) as Record<LoveResultType, ResultProfile>;
}

export function createLoveReportSection(
  locale: Locale,
  key: keyof typeof loveReportSectionContent.ko,
  leftScore: number,
  rightScore: number,
  dominantTags: string[],
): ReportSection {
  const content = loveReportSectionContent[locale][key] ?? loveReportSectionContent[defaultLocale][key];
  const diff = leftScore - rightScore;
  const dominantSide = diff >= 2 ? 'f' : diff <= -2 ? 't' : 'balanced';

  return {
    key,
    label: content.label,
    leftLabel: content.leftLabel,
    rightLabel: content.rightLabel,
    summary:
      dominantSide === 'f' ? content.leftSummary : dominantSide === 't' ? content.rightSummary : content.balancedSummary,
    detail: `${content.leftLabel} ${leftScore} · ${content.rightLabel} ${rightScore}`,
    dominantSide,
    dominantTags,
    leftScore,
    rightScore,
  };
}
