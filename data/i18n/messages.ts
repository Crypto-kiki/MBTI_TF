import { localeLabels, type Locale } from '@/lib/i18n/config';

export const uiMessages: Record<
  Locale,
  {
    metadata: { title: string; description: string };
    header: { tagline: string };
    hero: {
      eyebrow: string;
      title: string;
      description: string;
      moodPoints: string[];
      cards: { moodLabel: string; moodValue: string; experienceLabel: string; experienceValue: string; resultLabel: string; resultValue: string };
    };
    modes: {
      f: { title: string; subtitle: string; description: string; badge: string; accentText: string };
      t: { title: string; subtitle: string; description: string; badge: string; accentText: string };
      start: string;
      modeSelect: string;
    };
    quiz: {
      flowF: string;
      flowT: string;
      home: string;
      title: string;
      intro: string;
      questionLabel: string;
      focusF: string;
      focusT: string;
      helper: string;
      previous: string;
      next: string;
      result: string;
      progress: string;
      progressHint: string;
    };
    result: {
      axis: { f: string; t: string; balanced: string };
      summaryCard: string;
      summaryHint: string;
      totalF: string;
      totalT: string;
      answered: string;
      fHint: string;
      tHint: string;
      answeredHint: string;
      strengths: string;
      tips: string;
      cta: string;
      backHome: string;
      tryOther: string;
    };
    localeSwitcher: { label: string };
  }
> = {
  ko: {
    metadata: { title: 'F와 T 사이', description: '감정과 판단 사이, 당신의 해석 습관을 연습해보세요.' },
    header: { tagline: '감정과 판단 사이의 해석 습관 연습' },
    hero: {
      eyebrow: '감정과 판단 사이를 연습하는 작은 브랜드 테스트',
      title: 'F와 T 사이',
      description: '감정과 판단 사이, 당신의 해석 습관을 연습해보세요. 공감의 결을 읽는 시선과 구조를 세우는 시선을 각각 차분하게 경험할 수 있어요.',
      moodPoints: ['감정 해석', '논리 판단', '모바일 친화적인 카드 경험'],
      cards: {
        moodLabel: 'mood', moodValue: '귀엽지만 담백하게',
        experienceLabel: 'experience', experienceValue: '한 문항씩 천천히',
        resultLabel: 'result', resultValue: '정적 점수 + 태그 매핑',
      },
    },
    modes: {
      f: { title: 'F 모드', subtitle: '감정 해석 · 공감 훈련', description: '표정과 문장 사이의 감정을 읽어내며, 관계 속 해석 습관을 부드럽게 점검해보세요.', badge: '공감 & 해석', accentText: '표정과 맥락의 온도를 읽는 연습' },
      t: { title: 'T 모드', subtitle: '논리 판단 · 구조화 훈련', description: '정보를 정리하고 기준을 세우며, 상황을 차분하게 구조화하는 연습을 시작해보세요.', badge: '판단 & 구조화', accentText: '기준과 우선순위를 세우는 연습' },
      start: '테스트 시작하기',
      modeSelect: 'Mode Select',
    },
    quiz: {
      flowF: '감정 해석 흐름', flowT: '논리 판단 흐름', home: '홈으로', title: '해석 연습 시작', intro: '한 문항씩 천천히 살펴보며, 지금 가장 자연스럽게 떠오르는 해석을 골라보세요.', questionLabel: 'Question', focusF: '마음의 온도에 집중해보세요', focusT: '판단의 기준을 떠올려보세요', helper: '답을 바꿔도 괜찮아요. 너무 오래 고민하기보다 지금의 감각에 가까운 선택을 따라가보세요.', previous: '이전 질문', next: '다음 질문', result: '결과 보기', progress: '진행도', progressHint: '답을 고르며 천천히 당신의 해석 결을 따라가보세요.',
    },
    result: {
      axis: { f: 'F 우세', t: 'T 우세', balanced: '균형형' }, summaryCard: '결과 요약 카드', summaryHint: '정적 점수와 태그 빈도를 바탕으로, 가장 닮은 해석 톤을 골라 보여드렸어요.', totalF: 'Total F', totalT: 'Total T', answered: 'Answered', fHint: '감정과 해석 쪽으로 기운 점수', tHint: '판단과 구조 쪽으로 기운 점수', answeredHint: '정적 결과 매핑으로 완성된 프로필', strengths: '당신의 강점', tips: '작은 팁', cta: 'CTA', backHome: '처음으로', tryOther: '다른 모드 해보기',
    },
    localeSwitcher: { label: '언어' },
  },
  ja: {
    metadata: { title: 'FとTのあいだ', description: '感情と判断のあいだで、あなたの読み取りの癖をやさしく練習しましょう。' },
    header: { tagline: '感情と判断のあいだにある読み取り習慣の練習' },
    hero: {
      eyebrow: '感情と判断のあいだをたどる小さなブランドテスト',
      title: 'FとTのあいだ',
      description: '感情と判断のあいだで、あなたの読み取りの癖をやさしく練習しましょう。共感のニュアンスを見る視線と、構造を整える視線をそれぞれ静かに体験できます。',
      moodPoints: ['感情の読解', '論理的な判断', 'モバイルにやさしいカード体験'],
      cards: { moodLabel: 'mood', moodValue: 'かわいいけれど上品に', experienceLabel: 'experience', experienceValue: '一問ずつゆっくり', resultLabel: 'result', resultValue: '静的スコア + タグマッピング' },
    },
    modes: {
      f: { title: 'Fモード', subtitle: '感情の解釈・共感トレーニング', description: '表情と言葉のあいだにある感情を読み取り、関係の中の解釈の癖をやわらかく見つめてみましょう。', badge: '共感 & 解釈', accentText: '表情と文脈の温度を読む練習' },
      t: { title: 'Tモード', subtitle: '論理判断・構造化トレーニング', description: '情報を整理し基準を立てながら、状況を落ち着いて構造化する練習を始めましょう。', badge: '判断 & 構造化', accentText: '基準と優先順位を立てる練習' },
      start: 'テストを始める', modeSelect: 'Mode Select',
    },
    quiz: {
      flowF: '感情解釈フロー', flowT: '論理解釈フロー', home: 'ホームへ', title: '読み取りの練習', intro: '一問ずつゆっくり見ながら、いちばん自然に浮かぶ解釈を選んでください。', questionLabel: 'Question', focusF: '気持ちの温度に意識を向けてみてください', focusT: '判断の基準を思い浮かべてみてください', helper: '答えを変えても大丈夫です。長く悩みすぎず、今の感覚に近い選択を選んでみてください。', previous: '前へ', next: '次へ', result: '結果を見る', progress: '進行状況', progressHint: '答えを選びながら、自分の解釈の流れをゆっくりたどってみましょう。',
    },
    result: {
      axis: { f: 'F優勢', t: 'T優勢', balanced: 'バランス型' }, summaryCard: '結果サマリーカード', summaryHint: '静的なスコアとタグ頻度をもとに、あなたに近い解釈トーンを選んで表示しています。', totalF: 'Total F', totalT: 'Total T', answered: 'Answered', fHint: '感情と解釈に寄ったスコア', tHint: '判断と構造に寄ったスコア', answeredHint: '静的マッピングで完成したプロフィール', strengths: 'あなたの強み', tips: '小さなヒント', cta: 'CTA', backHome: 'はじめに戻る', tryOther: '別のモードを試す',
    },
    localeSwitcher: { label: '言語' },
  },
  'zh-TW': {
    metadata: { title: 'F與T之間', description: '在感受與判斷之間，練習你解讀情境的習慣。' },
    header: { tagline: '練習感受與判斷之間的解讀習慣' },
    hero: {
      eyebrow: '一個練習感受與判斷之間視角的小型品牌測驗',
      title: 'F與T之間',
      description: '在感受與判斷之間，練習你解讀情境的習慣。你可以安靜地體驗偏向共感的視角，以及偏向結構整理的視角。',
      moodPoints: ['情感解讀', '邏輯判斷', '適合手機的卡片式體驗'],
      cards: { moodLabel: 'mood', moodValue: '可愛但不幼稚', experienceLabel: 'experience', experienceValue: '一次一題慢慢做', resultLabel: 'result', resultValue: '靜態分數 + 標籤映射' },
    },
    modes: {
      f: { title: 'F 模式', subtitle: '情緒解讀・共感練習', description: '閱讀表情與句子之間的情緒，溫柔地檢視你在人際關係中的解讀習慣。', badge: '共感 & 解讀', accentText: '練習讀懂表情與語境的溫度' },
      t: { title: 'T 模式', subtitle: '邏輯判斷・結構化練習', description: '整理資訊、建立判斷基準，並練習冷靜地將情境結構化。', badge: '判斷 & 結構化', accentText: '練習建立基準與優先順序' },
      start: '開始測驗', modeSelect: 'Mode Select',
    },
    quiz: {
      flowF: '情感解讀流程', flowT: '邏輯判斷流程', home: '回首頁', title: '開始練習解讀', intro: '一題一題慢慢看，選出此刻最自然浮現的解讀。', questionLabel: 'Question', focusF: '先把注意力放在情緒溫度上', focusT: '先想想你的判斷基準', helper: '改答案也沒關係。不要想太久，跟著當下最接近的感覺走就好。', previous: '上一題', next: '下一題', result: '查看結果', progress: '進度', progressHint: '在作答的同時，也慢慢看見自己的解讀節奏。',
    },
    result: {
      axis: { f: 'F 偏高', t: 'T 偏高', balanced: '平衡型' }, summaryCard: '結果摘要卡', summaryHint: '根據靜態分數與標籤頻率，挑出最接近你的解讀氣質。', totalF: 'Total F', totalT: 'Total T', answered: 'Answered', fHint: '偏向情感與解讀的分數', tHint: '偏向判斷與結構的分數', answeredHint: '由靜態映射完成的結果類型', strengths: '你的優勢', tips: '小提示', cta: 'CTA', backHome: '回到最初', tryOther: '試試其他模式',
    },
    localeSwitcher: { label: '語言' },
  },
  en: {
    metadata: { title: 'Between F and T', description: 'Practice your interpretation habits between feeling and judgment.' },
    header: { tagline: 'A gentle practice space between feeling and judgment' },
    hero: {
      eyebrow: 'A small brand-like quiz for practicing the space between feeling and judgment',
      title: 'Between F and T',
      description: 'Practice your interpretation habits between feeling and judgment. You can quietly explore a more empathic lens and a more structured lens, side by side.',
      moodPoints: ['Emotional reading', 'Logical judgment', 'Mobile-friendly card experience'],
      cards: { moodLabel: 'mood', moodValue: 'Cute, but still refined', experienceLabel: 'experience', experienceValue: 'One question at a time', resultLabel: 'result', resultValue: 'Static scores + tag mapping' },
    },
    modes: {
      f: { title: 'F Mode', subtitle: 'Emotion Reading · Empathy Practice', description: 'Read the emotions between facial expressions and words, and gently reflect on your interpretation habits in relationships.', badge: 'Empathy & Reading', accentText: 'Practice reading the temperature of tone and context' },
      t: { title: 'T Mode', subtitle: 'Logical Judgment · Structuring Practice', description: 'Organize information, set criteria, and practice structuring situations with calm clarity.', badge: 'Judgment & Structure', accentText: 'Practice setting criteria and priorities' },
      start: 'Start the quiz', modeSelect: 'Mode Select',
    },
    quiz: {
      flowF: 'Emotional reading flow', flowT: 'Logical judgment flow', home: 'Back home', title: 'Start your reading practice', intro: 'Move through one question at a time and choose the interpretation that feels most natural right now.', questionLabel: 'Question', focusF: 'Focus on the temperature of the feeling', focusT: 'Think about the criteria behind your judgment', helper: 'It is okay to change your answer. Instead of overthinking, follow the option that feels closest to your current instinct.', previous: 'Previous', next: 'Next', result: 'See result', progress: 'Progress', progressHint: 'As you answer, slowly trace the shape of your own interpretation style.',
    },
    result: {
      axis: { f: 'F-led', t: 'T-led', balanced: 'Balanced' }, summaryCard: 'Result summary card', summaryHint: 'Based on static scores and tag frequency, we matched you with the closest interpretation tone.', totalF: 'Total F', totalT: 'Total T', answered: 'Answered', fHint: 'Score leaning toward feeling and interpretation', tHint: 'Score leaning toward judgment and structure', answeredHint: 'Profile resolved through static mapping', strengths: 'Your strengths', tips: 'Small tips', cta: 'CTA', backHome: 'Back to start', tryOther: 'Try the other mode',
    },
    localeSwitcher: { label: 'Language' },
  },
};

export const translatedTagLabels: Record<Locale, Record<string, string>> = {
  ko: {},
  ja: { 공감: '共感', 배려: '配慮', 해석: '解釈', 맥락: '文脈', 분위기: '雰囲気', 관계: '関係', 구조: '構造', 분석: '分析', 기준: '基準', 판단: '判断', 정리: '整理', 우선순위: '優先順位', 실행: '実行', 균형: 'バランス', 신중함: '慎重さ', 경청: '傾聴', 이해: '理解' },
  'zh-TW': { 공감: '共感', 배려: '體貼', 해석: '解讀', 맥락: '脈絡', 분위기: '氛圍', 관계: '關係', 구조: '結構', 분석: '分析', 기준: '標準', 판단: '判斷', 정리: '整理', 우선순위: '優先順序', 실행: '執行', 균형: '平衡', 신중함: '審慎', 경청: '傾聽', 이해: '理解' },
  en: { 공감: 'empathy', 배려: 'care', 해석: 'reading', 맥락: 'context', 분위기: 'mood', 관계: 'relationship', 구조: 'structure', 분석: 'analysis', 기준: 'criteria', 판단: 'judgment', 정리: 'clarity', 우선순위: 'priority', 실행: 'action', 균형: 'balance', 신중함: 'carefulness', 경청: 'listening', 이해: 'understanding' },
};

export function getTagLabel(locale: Locale, tag: string) {
  return translatedTagLabels[locale][tag] ?? tag;
}

export function getLocaleDisplayLabel(locale: Locale) {
  return localeLabels[locale];
}
