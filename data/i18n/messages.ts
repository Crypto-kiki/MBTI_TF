import { localeLabels, type Locale } from '@/lib/i18n/config';
import { translatedTagLabels } from '@/data/i18n/tag-labels';

export const uiMessages: Record<
  Locale,
  {
    metadata: { title: string; description: string };
    header: { tagline: string; typesTab: string };
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
      scoreReport: string;
      fHint: string;
      tHint: string;
      answeredHint: string;
      patternsTitle: string;
      patternsHint: string;
      strengths: string;
      tips: string;
      finalBadge: string;
      goodMatch: string;
      goodMatchReason: string;
      cta: string;
      backHome: string;
      tryOther: string;
      share: {
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
      };
    };
    catalog: {
      title: string;
      lead: string;
      description: string;
      viewLabel: string;
      filters: { all: string; f: string; t: string; balanced: string };
      sections: {
        f: { title: string; description: string };
        t: { title: string; description: string };
        balanced: { title: string; description: string };
      };
    };
    localeSwitcher: { label: string };
  }
> = {
  ko: {
    metadata: { title: 'F와 T 사이', description: '감정과 판단 사이, 당신의 해석 습관을 연습해보세요.' },
    header: { tagline: '감정과 판단 사이에서, 나의 해석 습관을 살펴보는 테스트', typesTab: '전체 유형' },
    hero: {
      eyebrow: '감정과 판단 사이를 가볍게 점검하는 해석 테스트',
      title: 'F와 T 사이',
      description: '감정과 판단 사이에서 내가 어떤 방식으로 상황을 읽는지 살펴보세요. 한 문항씩 답하면 지금의 성향을 정리한 결과 리포트를 확인할 수 있어요.',
      moodPoints: ['3분 내외', '한 문항씩 진행', '결과 리포트 제공'],
      cards: {
        moodLabel: '소요 시간', moodValue: '짧고 가볍게',
        experienceLabel: '진행 방식', experienceValue: '한 문항씩 집중',
        resultLabel: '결과 형태', resultValue: '요약 + 해석 리포트',
      },
    },
    modes: {
      f: { title: 'F 모드', subtitle: '감정 해석 · 공감 훈련', description: '표정과 문장 사이의 감정을 읽어내며, 관계 속 해석 습관을 부드럽게 점검해보세요.', badge: '공감 & 해석', accentText: '표정과 맥락의 온도를 읽는 연습' },
      t: { title: 'T 모드', subtitle: '논리 판단 · 구조화 훈련', description: '정보를 정리하고 기준을 세우며, 상황을 차분하게 구조화하는 연습을 시작해보세요.', badge: '판단 & 구조화', accentText: '기준과 우선순위를 세우는 연습' },
      start: '테스트 시작하기',
      modeSelect: '테스트 선택',
    },
    quiz: {
      flowF: '감정 해석 흐름', flowT: '논리 판단 흐름', home: '홈으로', title: '해석 연습 시작', intro: '한 문항씩 천천히 살펴보며, 지금 가장 자연스럽게 떠오르는 해석을 골라보세요.', questionLabel: '질문', focusF: '마음의 온도에 집중해보세요', focusT: '판단의 기준을 떠올려보세요', helper: '답을 바꿔도 괜찮아요. 너무 오래 고민하기보다 지금의 감각에 가까운 선택을 따라가보세요.', previous: '이전 질문', next: '다음 질문', result: '결과 보기', progress: '진행도', progressHint: '답을 고르며 천천히 당신의 해석 결을 따라가보세요.',
    },
    result: {
      axis: { f: 'F 성향', t: 'T 성향', balanced: '균형형' }, summaryCard: '한눈에 보는 결과', summaryHint: '답변 점수와 자주 고른 단서를 바탕으로 지금의 해석 성향을 정리했어요.', totalF: 'F 점수', totalT: 'T 점수', answered: '응답 수', scoreReport: '점수 해석', fHint: '감정과 관계 쪽에 더 가까운 흐름', tHint: '판단과 구조 쪽에 더 가까운 흐름', answeredHint: '실제로 답한 문항 수', patternsTitle: '자주 드러난 반응 패턴', patternsHint: '당신은 이런 단서를 자주 선택했어요.', strengths: '잘 드러난 강점', tips: '이렇게 활용해보세요', finalBadge: '당신의 결과', goodMatch: '나랑 잘 맞는 유형', goodMatchReason: '잘 맞는 이유', cta: '한 줄 제안', backHome: '처음으로', tryOther: '다른 모드도 이어서 해보기', share: { badge: 'SHARE YOUR CARD', title: '내 결과 카드 공유하기', hint: '이 결과를 그대로 보내고 친구와 서로 비교해보세요.', previewLabel: '공유 미리보기', share: '공유하기', shareHint: '추천 문구와 함께 보내기', copy: '링크 복사하기', copyHint: '추천 문구 + 링크 복사', copied: '공유 문구와 링크를 복사했어요.', failed: '링크를 복사하지 못했어요.', shared: '결과 카드 공유를 열었어요.', templates: ['나는 F와 T 사이에서 {title}가 나왔어. 너도 해봐.', '내 결과는 {title}. 너는 어떤 결과일까?'] },
    },
    catalog: {
      title: '전체 유형 보기',
      lead: '전체 결과 유형을 둘러보고, 나와 가까운 결을 찾아보세요.',
      description: '각 유형의 분위기와 특징을 미리 살펴보고, 궁금한 결과를 바로 눌러 자세히 볼 수 있어요.',
      viewLabel: '자세히 보기',
      filters: { all: '전체', f: 'F 성향', t: 'T 성향', balanced: '균형형' },
      sections: {
        f: { title: 'F 성향', description: '감정의 흐름과 관계의 온도를 먼저 읽는 유형들입니다.' },
        t: { title: 'T 성향', description: '판단 기준과 구조를 선명하게 세우는 유형들입니다.' },
        balanced: { title: '균형형', description: '감정과 판단 사이의 중심을 함께 붙드는 유형들입니다.' },
      },
    },
    localeSwitcher: { label: '언어' },
  },
  ja: {
    metadata: { title: 'FとTのあいだ', description: '感情と判断のあいだで、あなたの読み取りの癖をやさしく練習しましょう。' },
    header: { tagline: '感情と判断のあいだで、自分の読み取り方を見つめるテスト', typesTab: '全タイプ' },
    hero: {
      eyebrow: '感情と判断のあいだを軽やかに見つめる解釈テスト',
      title: 'FとTのあいだ',
      description: '感情と判断のあいだで、自分がどんなふうに状況を読んでいるのかを確かめてみましょう。一問ずつ答えると、今の傾向をまとめた結果レポートを受け取れます。',
      moodPoints: ['3分ほど', '一問ずつ進行', '結果レポートあり'],
      cards: { moodLabel: '所要時間', moodValue: '短く気軽に', experienceLabel: '進め方', experienceValue: '一問ずつ集中', resultLabel: '結果', resultValue: '要約 + レポート' },
    },
    modes: {
      f: { title: 'Fモード', subtitle: '感情の解釈・共感トレーニング', description: '表情と言葉のあいだにある感情を読み取り、関係の中の解釈の癖をやわらかく見つめてみましょう。', badge: '共感 & 解釈', accentText: '表情と文脈の温度を読む練習' },
      t: { title: 'Tモード', subtitle: '論理判断・構造化トレーニング', description: '情報を整理し基準を立てながら、状況を落ち着いて構造化する練習を始めましょう。', badge: '判断 & 構造化', accentText: '基準と優先順位を立てる練習' },
      start: 'テストを始める', modeSelect: 'テストを選ぶ',
    },
    quiz: {
      flowF: '感情解釈フロー', flowT: '論理解釈フロー', home: 'ホームへ', title: '読み取りの練習', intro: '一問ずつゆっくり見ながら、いちばん自然に浮かぶ解釈を選んでください。', questionLabel: '質問', focusF: '気持ちの温度に意識を向けてみてください', focusT: '判断の基準を思い浮かべてみてください', helper: '答えを変えても大丈夫です。長く悩みすぎず、今の感覚に近い選択を選んでみてください。', previous: '前へ', next: '次へ', result: '結果を見る', progress: '進行状況', progressHint: '答えを選びながら、自分の解釈の流れをゆっくりたどってみましょう。',
    },
    result: {
      axis: { f: 'F寄り', t: 'T寄り', balanced: 'バランス型' }, summaryCard: '結果の見どころ', summaryHint: '回答の点数とよく選んだ傾向から、今の読み取りスタイルをまとめました。', totalF: 'Fスコア', totalT: 'Tスコア', answered: '回答数', scoreReport: 'スコアの読み取り', fHint: '感情や関係に寄った流れ', tHint: '判断や構造に寄った流れ', answeredHint: '実際に答えた設問数', patternsTitle: 'よく出た反応パターン', patternsHint: 'あなたは次のような反応をよく選んでいます。', strengths: 'よく出ている強み', tips: '活かし方のヒント', finalBadge: 'あなたの結果', goodMatch: '相性のよいタイプ', goodMatchReason: '相性がよい理由', cta: 'ひとことメモ', backHome: 'はじめに戻る', tryOther: '別のモードも続けて試す', share: { badge: 'SHARE YOUR CARD', title: 'この結果カードをシェア', hint: 'この結果をそのまま送って、友だちと比べてみましょう。', previewLabel: 'シェアプレビュー', share: 'シェアする', shareHint: 'ひとこと付きで送る', copy: 'リンクをコピー', copyHint: '紹介文 + リンクをコピー', copied: '紹介文とリンクをコピーしました。', failed: 'リンクをコピーできませんでした。', shared: '結果カードの共有を開きました。', templates: ['FとTのあいだで、私の結果は {title} でした。あなたもやってみて。', '私の結果は {title}。あなたはどのタイプになる？'] },
    },
    catalog: {
      title: '全タイプを見る',
      lead: 'すべての結果タイプを眺めながら、自分に近い輪郭を探してみましょう。',
      description: '各タイプの雰囲気や特徴を先に見比べて、気になる結果をそのまま開けます。',
      viewLabel: '詳しく見る',
      filters: { all: 'すべて', f: 'F寄り', t: 'T寄り', balanced: 'バランス型' },
      sections: {
        f: { title: 'F寄りタイプ', description: '感情の流れや関係の温度を先に受け取るタイプです。' },
        t: { title: 'T寄りタイプ', description: '判断基準や構造をはっきり立てやすいタイプです。' },
        balanced: { title: 'バランス型', description: '感情と判断の中心を同時に保ちやすいタイプです。' },
      },
    },
    localeSwitcher: { label: '言語' },
  },
  'zh-TW': {
    metadata: { title: 'F與T之間', description: '在感受與判斷之間，練習你解讀情境的習慣。' },
    header: { tagline: '在感受與判斷之間，看見自己的解讀方式', typesTab: '全部類型' },
    hero: {
      eyebrow: '輕鬆查看自己解讀習慣的小測驗',
      title: 'F與T之間',
      description: '看看自己在感受與判斷之間，通常會用什麼方式讀懂情境。依序回答題目後，就能看到整理好的結果報告。',
      moodPoints: ['約 3 分鐘', '一次一題', '提供結果報告'],
      cards: { moodLabel: '所需時間', moodValue: '短時間完成', experienceLabel: '作答方式', experienceValue: '逐題作答', resultLabel: '結果內容', resultValue: '摘要 + 報告' },
    },
    modes: {
      f: { title: 'F 模式', subtitle: '情緒解讀・共感練習', description: '閱讀表情與句子之間的情緒，溫柔地檢視你在人際關係中的解讀習慣。', badge: '共感 & 解讀', accentText: '練習讀懂表情與語境的溫度' },
      t: { title: 'T 模式', subtitle: '邏輯判斷・結構化練習', description: '整理資訊、建立判斷基準，並練習冷靜地將情境結構化。', badge: '判斷 & 結構化', accentText: '練習建立基準與優先順序' },
      start: '開始測驗', modeSelect: '選擇測驗',
    },
    quiz: {
      flowF: '情感解讀流程', flowT: '邏輯判斷流程', home: '回首頁', title: '開始練習解讀', intro: '一題一題慢慢看，選出此刻最自然浮現的解讀。', questionLabel: '題目', focusF: '先把注意力放在情緒溫度上', focusT: '先想想你的判斷基準', helper: '改答案也沒關係。不要想太久，跟著當下最接近的感覺走就好。', previous: '上一題', next: '下一題', result: '查看結果', progress: '進度', progressHint: '在作答的同時，也慢慢看見自己的解讀節奏。',
    },
    result: {
      axis: { f: 'F 傾向', t: 'T 傾向', balanced: '平衡型' }, summaryCard: '結果重點', summaryHint: '根據你的作答分數和常出現的線索，整理出目前的解讀風格。', totalF: 'F 分數', totalT: 'T 分數', answered: '作答數', scoreReport: '分數解讀', fHint: '更靠近感受與關係的一側', tHint: '更靠近判斷與結構的一側', answeredHint: '實際完成的題數', patternsTitle: '常出現的反應模式', patternsHint: '你經常選擇這些解讀方向。', strengths: '目前的優勢', tips: '可試著這樣做', finalBadge: '你的結果', goodMatch: '和我很合的類型', goodMatchReason: '合拍原因', cta: '一句提醒', backHome: '回到最初', tryOther: '也試試另一種模式', share: { badge: 'SHARE YOUR CARD', title: '把我的結果卡分享出去', hint: '直接把這張結果卡傳給朋友，一起比較看看。', previewLabel: '分享預覽', share: '立即分享', shareHint: '附上推薦文案分享', copy: '複製連結', copyHint: '複製文案 + 連結', copied: '已複製分享文案與連結。', failed: '無法複製連結。', shared: '已開啟結果卡分享。', templates: ['我在 F 與 T 之間測出 {title}，你也來試試看。', '我的結果是 {title}。你會是哪一型？'] },
    },
    catalog: {
      title: '查看全部類型',
      lead: '先逛逛所有結果類型，找出最接近你氣質的方向。',
      description: '你可以先看每種類型的氛圍與特徵，再點進去讀完整結果。',
      viewLabel: '查看詳情',
      filters: { all: '全部', f: 'F 傾向', t: 'T 傾向', balanced: '平衡型' },
      sections: {
        f: { title: 'F 傾向', description: '會先讀情緒流動與關係溫度的類型。' },
        t: { title: 'T 傾向', description: '更容易先建立判準與結構的類型。' },
        balanced: { title: '平衡型', description: '能同時守住感受與判斷中心的類型。' },
      },
    },
    localeSwitcher: { label: '語言' },
  },
  en: {
    metadata: { title: 'Between F and T', description: 'Practice your interpretation habits between feeling and judgment.' },
    header: { tagline: 'A short test for noticing how you read situations', typesTab: 'All types' },
    hero: {
      eyebrow: 'A short interpretation test between feeling and judgment',
      title: 'Between F and T',
      description: 'See how you tend to read situations between feeling and judgment. Answer one question at a time and get a concise result report about your current style.',
      moodPoints: ['About 3 minutes', 'One question at a time', 'Result report included'],
      cards: { moodLabel: 'time', moodValue: 'Short and light', experienceLabel: 'format', experienceValue: 'Focused, one by one', resultLabel: 'result', resultValue: 'Summary + report' },
    },
    modes: {
      f: { title: 'F Mode', subtitle: 'Emotion Reading · Empathy Practice', description: 'Read the emotions between facial expressions and words, and gently reflect on your interpretation habits in relationships.', badge: 'Empathy & Reading', accentText: 'Practice reading the temperature of tone and context' },
      t: { title: 'T Mode', subtitle: 'Logical Judgment · Structuring Practice', description: 'Organize information, set criteria, and practice structuring situations with calm clarity.', badge: 'Judgment & Structure', accentText: 'Practice setting criteria and priorities' },
      start: 'Start the quiz', modeSelect: 'Choose a mode',
    },
    quiz: {
      flowF: 'Emotional reading flow', flowT: 'Logical judgment flow', home: 'Back home', title: 'Start your reading practice', intro: 'Move through one question at a time and choose the interpretation that feels most natural right now.', questionLabel: 'Question', focusF: 'Focus on the temperature of the feeling', focusT: 'Think about the criteria behind your judgment', helper: 'It is okay to change your answer. Instead of overthinking, follow the option that feels closest to your current instinct.', previous: 'Previous', next: 'Next', result: 'See result', progress: 'Progress', progressHint: 'As you answer, slowly trace the shape of your own interpretation style.',
    },
    result: {
      axis: { f: 'F-leaning', t: 'T-leaning', balanced: 'Balanced' }, summaryCard: 'What stands out', summaryHint: 'We summarized your current reading style from your answers and repeated patterns.', totalF: 'F score', totalT: 'T score', answered: 'Answered', scoreReport: 'Score reading', fHint: 'Closer to feeling and relationship cues', tHint: 'Closer to judgment and structure cues', answeredHint: 'Questions you actually completed', patternsTitle: 'Frequent response patterns', patternsHint: 'These are the tendencies you selected most often.', strengths: 'Strengths that stand out', tips: 'Ways to use it well', finalBadge: 'Final Result', goodMatch: 'A type that fits you well', goodMatchReason: 'Why it fits', cta: 'One takeaway', backHome: 'Back to start', tryOther: 'Try the other mode next', share: { badge: 'SHARE YOUR CARD', title: 'Share your result card', hint: 'Send this result as-is and compare it with a friend.', previewLabel: 'Share preview', share: 'Share now', shareHint: 'Send with a short intro line', copy: 'Copy link', copyHint: 'Copy intro text + link', copied: 'Share text and link copied.', failed: 'Could not copy the link.', shared: 'Opened the share sheet for your result card.', templates: ['I got {title} in Between F and T. You should try it too.', 'My result is {title}. What would yours be?'] },
    },
    catalog: {
      title: 'Browse all types',
      lead: 'Browse every result type and quickly find the one that feels closest to you.',
      description: 'Preview each type’s tone and standout traits first, then open the full report when you want more detail.',
      viewLabel: 'View details',
      filters: { all: 'All', f: 'F-leaning', t: 'T-leaning', balanced: 'Balanced' },
      sections: {
        f: { title: 'F-leaning types', description: 'These types tend to read emotional flow and relational temperature first.' },
        t: { title: 'T-leaning types', description: 'These types tend to set criteria and structure more clearly first.' },
        balanced: { title: 'Balanced types', description: 'These types tend to hold both feeling and judgment in steadier balance.' },
      },
    },
    localeSwitcher: { label: 'Language' },
  },
};

export function getTagLabel(locale: Locale, tag: string) {
  return translatedTagLabels[locale][tag] ?? tag;
}

export function getLocaleDisplayLabel(locale: Locale) {
  return localeLabels[locale];
}
