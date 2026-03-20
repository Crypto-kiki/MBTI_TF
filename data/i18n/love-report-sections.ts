import { LocalizedRecord } from '@/lib/i18n/localized';

export const loveReportSectionContent: LocalizedRecord<{
  conflict: {
    label: string;
    leftLabel: string;
    rightLabel: string;
    leftSummary: string;
    rightSummary: string;
    balancedSummary: string;
  };
  contact: {
    label: string;
    leftLabel: string;
    rightLabel: string;
    leftSummary: string;
    rightSummary: string;
    balancedSummary: string;
  };
  hurt: {
    label: string;
    leftLabel: string;
    rightLabel: string;
    leftSummary: string;
    rightSummary: string;
    balancedSummary: string;
  };
  affection: {
    label: string;
    leftLabel: string;
    rightLabel: string;
    leftSummary: string;
    rightSummary: string;
    balancedSummary: string;
  };
  reassurance: {
    label: string;
    leftLabel: string;
    rightLabel: string;
    leftSummary: string;
    rightSummary: string;
    balancedSummary: string;
  };
  repair: {
    label: string;
    leftLabel: string;
    rightLabel: string;
    leftSummary: string;
    rightSummary: string;
    balancedSummary: string;
  };
}> = {
  ko: {
    conflict: {
      label: '갈등 반응',
      leftLabel: '감정 충격 먼저',
      rightLabel: '쟁점 정리 먼저',
      leftSummary: '상대가 얼마나 상처받았는지가 가장 먼저 보여요.',
      rightSummary: '감정보다 무엇이 문제인지부터 분명해져야 마음이 놓여요.',
      balancedSummary: '감정도 중요하지만, 결국 쟁점 정리까지 함께 되어야 해요.',
    },
    contact: {
      label: '연락 리듬',
      leftLabel: '자주 연결되는 흐름',
      rightLabel: '안정적으로 이어지는 흐름',
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
  ja: {
    conflict: {
      label: '衝突への反応',
      leftLabel: '感情の痛みを先に見る',
      rightLabel: '論点整理を先にする',
      leftSummary: '相手がどれだけ傷ついているかが最初に気になります。',
      rightSummary: '感情よりも、何が問題なのかがはっきりすると落ち着きます。',
      balancedSummary: '感情も大事ですが、最終的には論点整理まで必要です。',
    },
    contact: {
      label: '連絡のリズム',
      leftLabel: '頻繁につながる流れ',
      rightLabel: '安定して続く流れ',
      leftSummary: '連絡の頻度と温度が関係の鼓動のように感じられます。',
      rightSummary: '回数よりも、一定の流れが続くことに安心します。',
      balancedSummary: '頻度そのものより、リズムが途切れないことが大切です。',
    },
    hurt: {
      label: '傷つきやすいポイント',
      leftLabel: '表現と感情の受け止め方',
      rightLabel: '優先順位と実行基準',
      leftSummary: '自分の気持ちがどう受け取られたかが強く残ります。',
      rightSummary: '言葉よりも、実際の優先順位と繰り返される行動が残ります。',
      balancedSummary: '表現も大切ですが、最終的には行動と優先順位も見ています。',
    },
    affection: {
      label: '愛情表現の形',
      leftLabel: '言葉と確認が中心',
      rightLabel: '行動と実感が中心',
      leftSummary: 'やさしい言葉や表現が愛の温度を作ると感じます。',
      rightSummary: '愛情は最終的に行動と責任で示されると感じます。',
      balancedSummary: '言葉と行動がそろったときに最も本気を感じます。',
    },
    reassurance: {
      label: '安心感の基準',
      leftLabel: '感情的に味方でいてくれること',
      rightLabel: '一貫性と予測しやすさ',
      leftSummary: '気持ちが揺れるときも、情緒的に寄り添ってくれることが大切です。',
      rightSummary: '約束やパターンが安定して続くことが大切です。',
      balancedSummary: '情緒的な支えと一貫性の両方があると、いちばん安心できます。',
    },
    repair: {
      label: '衝突後の回復スタイル',
      leftLabel: '十分な感情の時間',
      rightLabel: '納得できる説明と合意',
      leftSummary: '感情が本当にほどけるまで時間が必要です。',
      rightSummary: 'なぜ起きたのか、どう変わるのかが説明されてこそ落ち着きます。',
      balancedSummary: '気持ちを整理する時間と説明の両方があってこそ回復できます。',
    },
  },
  'zh-TW': {
    conflict: {
      label: '衝突反應',
      leftLabel: '先在意情緒受傷',
      rightLabel: '先整理問題爭點',
      leftSummary: '你最先會在意的是彼此是不是受傷了。',
      rightSummary: '比起情緒，你會先想把真正的問題釐清。',
      balancedSummary: '情緒重要，但最後還是需要把爭點一起整理清楚。',
    },
    contact: {
      label: '聯絡節奏',
      leftLabel: '常常連上線的感覺',
      rightLabel: '穩定持續的節奏',
      leftSummary: '你會把聯絡的頻率與溫度感受成關係的心跳。',
      rightSummary: '比起次數，你更在意的是節奏是否穩定。',
      balancedSummary: '不一定要常常聯絡，但節奏不能突然斷掉。',
    },
    hurt: {
      label: '受傷點',
      leftLabel: '表達與情緒被接住',
      rightLabel: '優先順序與實際行動',
      leftSummary: '你最在意的是自己的情緒有沒有被真正接住。',
      rightSummary: '比起說法，你更在意實際順位與反覆出現的模式。',
      balancedSummary: '表達重要，但最後你也會一起看行動與順位。',
    },
    affection: {
      label: '愛意表達方式',
      leftLabel: '語言與確認感',
      rightLabel: '行動與實際感',
      leftSummary: '溫柔的話語與確認，會讓你感受到愛的溫度。',
      rightSummary: '你會覺得愛最終還是要靠行動與責任來證明。',
      balancedSummary: '當話語與行動一致時，你最能感受到真心。',
    },
    reassurance: {
      label: '安全感基準',
      leftLabel: '情緒上站在我這邊',
      rightLabel: '一致性與可預測性',
      leftSummary: '即使情緒起伏，你也希望對方在情緒上仍然靠近你。',
      rightSummary: '你更在意承諾、模式與節奏是否一直穩定。',
      balancedSummary: '情緒支持與一致性同時存在時，你最有安全感。',
    },
    repair: {
      label: '衝突後的修復方式',
      leftLabel: '足夠的情緒時間',
      rightLabel: '能理解的說明與共識',
      leftSummary: '你需要等情緒真的鬆開，才算開始修復。',
      rightSummary: '你需要知道為什麼會發生，以及之後會怎麼改。',
      balancedSummary: '有情緒整理的時間，也有清楚說明時，修復才算完整。',
    },
  },
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
