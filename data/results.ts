import { defaultLocale, type Locale } from '@/lib/i18n/config';
import { ResultContent, ResultDefinition, ResultImage, ResultProfile, ResultType } from '@/types/quiz';

const RESULT_IMAGE_SIZE = { width: 1200, height: 630 } as const;

function createResultImage(src: string): ResultImage {
  return {
    src,
    ...RESULT_IMAGE_SIZE,
  };
}

function createResultDefinition(type: ResultType, image: string, content: Record<Locale, ResultContent>): ResultDefinition {
  return {
    type,
    image: createResultImage(image),
    content,
  };
}

export const resultDefinitions: Record<ResultType, ResultDefinition> = {
  f_empathy: createResultDefinition('f_empathy', '/images/results/f-empathy.svg', {
    ko: {
      title: 'Velvet Ember',
      subtitle: '마음의 온도를 먼저 읽는 섬세한 사람',
      description: '당신은 말보다 마음의 떨림을 먼저 감지하는 편이에요. 누군가 애써 괜찮은 척해도 그 결을 놓치지 않고, 관계 안에서 부드럽게 손을 내밀 줄 아는 타입입니다.',
      strengths: ['상대의 감정을 빠르게 눈치챔', '다정한 분위기를 만드는 힘', '관계에서 안정감을 주는 태도'],
      tips: ['모든 감정을 다 책임지려 하진 말기', '확인보다 추측이 앞설 땐 한 번 숨 고르기', '내 감정도 같은 비중으로 돌보기'],
      cta: '오늘의 다정함을, 나에게도 조금 나눠주세요.',
    },
    ja: {
      title: 'Velvet Ember',
      subtitle: '心の温度を先に受け取る繊細な人',
      description: 'あなたは言葉そのものより、先に気持ちの揺れを受け取るタイプです。誰かが平気なふりをしていてもその気配を見逃さず、関係の中でやわらかく手を差し伸べられます。',
      strengths: ['相手の感情の変化にすばやく気づける', 'やさしい空気をつくる力がある', '関係の中で安心感を渡せる'],
      tips: ['すべての感情を背負いすぎない', '確認より想像が先に走るときは一呼吸おく', '自分の気持ちも同じ温度で扱う'],
      cta: '今日のやさしさを、少しだけ自分にも向けてみてください。',
    },
    'zh-TW': {
      title: 'Velvet Ember',
      subtitle: '先感受到人心溫度的細膩類型',
      description: '你常常不是先聽到話，而是先感覺到情緒的震動。即使有人努力表現得若無其事，你也能察覺那道細微的裂縫，並溫柔地伸出手。',
      strengths: ['很快察覺他人的情緒變化', '能營造柔和安心的氛圍', '在人際中帶來穩定感'],
      tips: ['不要把所有人的情緒都扛在自己身上', '當想像跑在確認前面時，先慢一下', '也把自己的感受放在同樣重要的位置'],
      cta: '今天的溫柔，也分一點給自己吧。',
    },
    en: {
      title: 'Velvet Ember',
      subtitle: 'A gentle reader of emotional warmth',
      description: 'You tend to notice the tremor in a feeling before you trust the words on the surface. Even when someone is trying to look fine, you sense the hidden softness underneath and respond with care.',
      strengths: ['Quick to notice emotional shifts', 'Creates a gentle and safe atmosphere', 'Brings steadiness into relationships'],
      tips: ['Do not carry every feeling as your responsibility', 'Pause when imagination rushes ahead of confirmation', 'Treat your own feelings with the same care'],
      cta: 'Let a little of today’s kindness turn back toward you, too.',
    },
  }),
  f_nuance: createResultDefinition('f_nuance', '/images/results/f-nuance.svg', {
    ko: {
      title: 'Moon Ripple',
      subtitle: '표정과 맥락 사이를 자연스럽게 해석하는 타입',
      description: '당신은 드러난 말보다 숨은 의미를 더 잘 읽어요. 작은 말투 변화나 공기의 결도 놓치지 않아, 사람들의 미묘한 감정을 이해하는 데 강점을 보입니다.',
      strengths: ['미묘한 분위기 변화를 잘 읽음', '맥락을 넓게 보는 해석력', '표현 뒤에 숨은 의미를 포착함'],
      tips: ['지나친 해석으로 스스로 피곤해지지 않기', '불확실할 땐 가볍게 확인 질문하기', '직감과 사실을 함께 놓고 보기'],
      cta: '당신의 섬세한 촉은 이미 충분히 아름다워요.',
    },
    ja: {
      title: 'Moon Ripple',
      subtitle: '表情と文脈のあいだを自然に読み取るタイプ',
      description: 'あなたは見えている言葉より、その裏にある意味を読むのが得意です。小さな言い回しの変化や空気の揺れまで受け取り、人の微妙な感情を理解する感覚に優れています。',
      strengths: ['微妙な空気の変化をつかめる', '文脈を広く見渡す解釈力がある', '表現の奥にある意味を見つけやすい'],
      tips: ['読みすぎて自分を疲れさせない', '曖昧なときは軽く確認する', '直感と事実を並べて見てみる'],
      cta: 'その繊細な感受性は、もう十分に美しいものです。',
    },
    'zh-TW': {
      title: 'Moon Ripple',
      subtitle: '自然讀懂表情與脈絡之間細節的人',
      description: '你很擅長讀懂話語背後真正的意思。細小的語氣變化、空氣裡不明說的感受，你都能捕捉，所以對微妙情緒特別敏感。',
      strengths: ['能讀出細微的氣氛變化', '擅長從更大的脈絡理解事情', '容易察覺表達背後的含義'],
      tips: ['不要因過度解讀而讓自己太累', '不確定時可以輕輕確認一下', '把直覺與事實放在一起看'],
      cta: '你的細膩感受力，本身就很迷人。',
    },
    en: {
      title: 'Moon Ripple',
      subtitle: 'A natural interpreter of subtle context',
      description: 'You are good at reading what sits beneath the visible words. A change in tone, a tiny pause, or the air in the room often tells you more than the sentence itself.',
      strengths: ['Reads subtle shifts in mood well', 'Sees situations through a wider context', 'Catches the meaning behind expression'],
      tips: ['Do not exhaust yourself by reading too far ahead', 'Use light confirmation when things feel unclear', 'Place instinct and fact side by side'],
      cta: 'Your sensitivity is already something quietly beautiful.',
    },
  }),
  f_warmth: createResultDefinition('f_warmth', '/images/results/f-warmth.svg', {
    ko: {
      title: 'Rose Hush',
      subtitle: '사람과 사람 사이의 공기를 부드럽게 읽는 스타일',
      description: '당신은 누가 편안한지, 누가 긴장했는지 먼저 보는 사람입니다. 대화의 흐름과 관계의 온도를 함께 살피며, 부드러운 조율로 상황을 안정시키는 힘이 있어요.',
      strengths: ['관계의 공기를 편안하게 만듦', '조율과 배려의 감각이 좋음', '사람들이 안심하고 말하게 만드는 분위기'],
      tips: ['모두를 편하게 하려다 내 기준을 놓치지 않기', '필요할 땐 분명한 경계도 세우기', '내가 느낀 분위기를 언어로 정리해보기'],
      cta: '당신의 다정함은 공간의 표정을 바꾸는 힘이 있어요.',
    },
    ja: {
      title: 'Rose Hush',
      subtitle: '人と人の空気をやわらかく整えるスタイル',
      description: 'あなたは誰が緊張していて、誰が安心しているのかをよく見ています。会話の流れと関係の温度を一緒に感じ取り、やわらかな調整で場を落ち着かせる力があります。',
      strengths: ['関係の空気を心地よく整えられる', '配慮と調整の感覚がよい', '人が安心して話せる雰囲気をつくる'],
      tips: ['みんなを楽にしようとして自分の軸を失わない', '必要なときは境界線もはっきり引く', '感じた空気を言葉にしてみる'],
      cta: 'あなたのやさしさは、空間の表情そのものを変えていきます。',
    },
    'zh-TW': {
      title: 'Rose Hush',
      subtitle: '擅長溫柔照看人際氛圍的風格',
      description: '你很容易看出誰放鬆、誰緊繃。你會一起感受對話的流動與關係的溫度，並用柔和的方式把場面慢慢安定下來。',
      strengths: ['能讓人際氛圍變得更舒服', '很有照顧與協調的感覺', '能創造讓人安心開口的空間'],
      tips: ['別為了讓所有人舒服而丟掉自己的基準', '需要時也要畫出清楚邊界', '試著把你感受到的氛圍說成語言'],
      cta: '你的溫柔，真的會改變一個空間的表情。',
    },
    en: {
      title: 'Rose Hush',
      subtitle: 'A soft curator of relational atmosphere',
      description: 'You often notice who feels tense and who feels safe. You read the flow of conversation and the temperature of a relationship together, then soften the space without forcing it.',
      strengths: ['Makes relational spaces feel gentler', 'Has strong instincts for care and adjustment', 'Helps people feel safe enough to speak'],
      tips: ['Do not lose your own center while easing everyone else', 'Clear boundaries can also be kind', 'Try naming the atmosphere you sense'],
      cta: 'Your softness can change the expression of a whole room.',
    },
  }),
  t_calm: createResultDefinition('t_calm', '/images/results/t-calm.svg', {
    ko: {
      title: 'Quiet Pivot',
      subtitle: '감정에 휩쓸리기보다 상황을 정리해보는 사람',
      description: '당신은 상황을 조금 떨어져 바라보며 판단하는 편이에요. 감정보다 사실과 맥락을 분리해 생각하고, 흔들림 속에서도 기준을 잃지 않는 안정감이 있습니다.',
      strengths: ['복잡한 상황에서도 침착함 유지', '문제의 핵심을 잘 분리함', '의사결정에서 과열을 줄여줌'],
      tips: ['설명할 때 상대 감정을 한 줄 더 챙기기', '정답보다 납득을 만드는 대화 시도하기', '차분함이 차갑게 보이지 않도록 표현 보완하기'],
      cta: '당신의 안정감은 주변에게 든든한 기준점이 됩니다.',
    },
    ja: {
      title: 'Quiet Pivot',
      subtitle: '感情に流されず状況を整えて見る人',
      description: 'あなたは一歩引いた場所から状況を見ることができます。感情より先に事実と文脈を分けて考え、揺れる場面でも基準を失わない安定感があります。',
      strengths: ['複雑な場面でも落ち着いていられる', '問題の核を分けて見られる', '過熱しすぎた判断を落ち着かせる'],
      tips: ['説明のときに相手の気持ちも一行添える', '正しさだけでなく納得感も意識する', '落ち着きが冷たく見えないよう表現を整える'],
      cta: 'あなたの静かな安定感は、周りにとって頼れる基準になります。',
    },
    'zh-TW': {
      title: 'Quiet Pivot',
      subtitle: '不被情緒推著走、會先整理情境的人',
      description: '你擅長退後一步看整體。比起先被情緒帶著走，你更能把事實與脈絡拆開來看，因此在混亂裡也保有穩定的判斷感。',
      strengths: ['在複雜情況下依然沉著', '能看出問題真正的核心', '能讓過熱的判斷重新冷靜下來'],
      tips: ['說明時，也替對方的感受留一點空間', '除了正確，也別忘了可被理解的方式', '讓沉著不要被誤解成冷淡'],
      cta: '你的穩定感，會成為別人心裡可靠的定點。',
    },
    en: {
      title: 'Quiet Pivot',
      subtitle: 'A calm sorter of messy situations',
      description: 'You tend to step back and look at a situation with distance. Instead of moving with the first emotional wave, you separate facts from interpretation and keep your footing in complexity.',
      strengths: ['Stays composed in complicated moments', 'Separates the core issue cleanly', 'Cools down overheated decision-making'],
      tips: ['Leave a little room for the other person’s feelings when you explain', 'Aim for understanding, not only correctness', 'Let calmness read as warmth, not distance'],
      cta: 'Your steadiness becomes a reliable reference point for others.',
    },
  }),
  t_criteria: createResultDefinition('t_criteria', '/images/results/t-criteria.svg', {
    ko: {
      title: 'Frame Setter',
      subtitle: '무엇을 볼지 먼저 정하고 움직이는 구조형',
      description: '당신은 결론을 급히 내리기보다 먼저 판단의 기준을 세워요. 그래서 선택의 이유가 분명하고, 복잡한 상황에서도 흔들리지 않는 선명함이 느껴집니다.',
      strengths: ['판단 기준을 명확히 세움', '선택의 이유를 설명하기 쉬움', '우선순위 설정에 강함'],
      tips: ['기준이 너무 단단해지면 예외를 놓칠 수 있음', '상대의 감정 변수도 기준표에 넣어보기', '완벽한 정보가 아니어도 유연하게 조정하기'],
      cta: '당신의 선명한 기준은 혼란 속에서 길을 만들어줘요.',
    },
    ja: {
      title: 'Frame Setter',
      subtitle: '先に基準を置いてから動く構造型',
      description: 'あなたは急いで結論を出すより先に、何を基準に見るかを決めます。だから選択の理由が明確で、複雑な状況でもぶれにくい輪郭を持っています。',
      strengths: ['判断基準をはっきり置ける', '選択の理由を説明しやすい', '優先順位づけが得意'],
      tips: ['基準が固くなりすぎると例外を見落とすことがある', '感情という変数も基準表に入れてみる', '完全な情報を待ちすぎず柔軟に調整する'],
      cta: 'あなたのはっきりした基準は、混乱の中に道筋をつくります。',
    },
    'zh-TW': {
      title: 'Frame Setter',
      subtitle: '會先建立判斷標準再行動的結構型',
      description: '你不急著下結論，而是先決定要用什麼標準來看。也因此你的選擇通常理由清楚，在複雜局面裡也不容易被拉偏。',
      strengths: ['能建立清晰的判準', '容易說明自己為何做出那個選擇', '擅長安排優先順序'],
      tips: ['標準太硬時，可能會錯過例外情況', '也把情緒因素放進判準裡看看', '不一定要等所有資訊都完整才前進'],
      cta: '你清楚的標準，總能在混亂裡畫出路徑。',
    },
    en: {
      title: 'Frame Setter',
      subtitle: 'A type that sets criteria before moving',
      description: 'You rarely rush straight to a conclusion. You first decide what matters, and that makes your choices feel clean, explainable, and surprisingly steady even in complex situations.',
      strengths: ['Sets clear decision criteria', 'Explains the reason behind choices well', 'Strong at organizing priorities'],
      tips: ['Very firm criteria can miss special cases', 'Let emotional variables into the frame when needed', 'Stay flexible even without perfect information'],
      cta: 'Your clear criteria create direction inside confusion.',
    },
  }),
  t_structure: createResultDefinition('t_structure', '/images/results/t-structure.svg', {
    ko: {
      title: 'Pattern Smith',
      subtitle: '문제를 쪼개고 다시 세우는 데 강한 타입',
      description: '당신은 복잡한 문제를 구조로 바꾸는 재능이 있어요. 흐릿한 상황도 정리 가능한 조각으로 나누고, 실행 가능한 해답으로 연결하는 힘이 돋보입니다.',
      strengths: ['복잡한 문제를 체계적으로 정리함', '실행 가능한 해법을 빠르게 찾음', '구조화된 설명으로 팀을 이끎'],
      tips: ['사람의 속도까지 함께 고려하면 더 완성도 높아짐', '해결 과정에서 감정적 맥락도 체크하기', '정리한 구조를 너무 빨리 확정하지 않기'],
      cta: '당신은 어수선한 장면 속에서도 길을 설계하는 사람이에요.',
    },
    ja: {
      title: 'Pattern Smith',
      subtitle: '問題をほどいて組み直すのが得意なタイプ',
      description: 'あなたには複雑な問題を構造へ変える力があります。ぼんやりした状況も整理できる単位に分け、実行できる解決へつなぐ感覚が際立っています。',
      strengths: ['複雑な問題を体系的に整えられる', '実行可能な解決を素早く見つけやすい', '構造的な説明で周囲を導ける'],
      tips: ['人のペースも一緒に見ると完成度が上がる', '解決の途中でも感情的文脈を確認する', '組み立てた構造を早く確定しすぎない'],
      cta: 'あなたは散らかった場面の中でも、道を設計できる人です。',
    },
    'zh-TW': {
      title: 'Pattern Smith',
      subtitle: '擅長拆解問題再重新組裝的類型',
      description: '你很擅長把複雜問題轉成可以整理的結構。再模糊的情況，你也能拆成可處理的片段，最後串成可執行的解法。',
      strengths: ['能系統化整理複雜問題', '很快找到可執行的解法', '能用有結構的說法帶動團隊'],
      tips: ['把人的節奏一起算進去會更完整', '在解決過程中也記得查看情緒脈絡', '不要太快把結構定死'],
      cta: '你是在混亂之中，也能畫出藍圖的人。',
    },
    en: {
      title: 'Pattern Smith',
      subtitle: 'A problem-solver who thinks in structure',
      description: 'You have a gift for turning complexity into structure. Even blurry situations can become manageable pieces in your mind, and those pieces often lead to practical next steps.',
      strengths: ['Organizes complex problems systematically', 'Finds workable solutions quickly', 'Guides others through structured explanation'],
      tips: ['The result gets better when you also account for people’s pace', 'Check the emotional context while solving', 'Do not lock the structure too early'],
      cta: 'You are the kind of person who can sketch a path inside chaos.',
    },
  }),
  b_balance: createResultDefinition('b_balance', '/images/results/b-balance.svg', {
    ko: {
      title: 'Soft Compass',
      subtitle: '공감과 판단의 무게를 나란히 두는 사람',
      description: '당신은 마음을 살피면서도 기준을 놓치지 않아요. 따뜻함과 명료함이 한쪽으로 쏠리지 않아, 상황을 무리 없이 안정적으로 읽어내는 편입니다.',
      strengths: ['감정과 판단을 함께 고려함', '상황에 맞게 시야를 전환함', '사람과 일 모두를 챙길 수 있음'],
      tips: ['균형을 잡느라 결정을 미루지 않기', '내가 중요하게 보는 기준을 더 선명히 말하기', '완벽한 중간점보다 지금의 최선 찾기'],
      cta: '당신의 균형감은 관계와 결정 사이를 부드럽게 이어줘요.',
    },
    ja: {
      title: 'Soft Compass',
      subtitle: '共感と判断の重さを並べて持てる人',
      description: 'あなたは気持ちを見ながらも、基準を手放しません。やわらかさと明瞭さがどちらか一方に偏らず、状況を無理なく安定して読めるタイプです。',
      strengths: ['感情と判断を一緒に扱える', '状況に応じて視点を切り替えられる', '人と仕事の両方を見られる'],
      tips: ['バランスを取ることが決断の先延ばしにならないようにする', '自分が大切にする基準をもう少し言葉にする', '完璧な中間より今の最善を見る'],
      cta: 'あなたのバランス感覚は、関係と決定のあいだをやわらかくつないでくれます。',
    },
    'zh-TW': {
      title: 'Soft Compass',
      subtitle: '能把共感與判斷放在同一條線上的人',
      description: '你會看見情緒，也不會放掉基準。溫柔與清楚不會偏向其中一邊，所以你通常能用穩定而不勉強的方式理解情境。',
      strengths: ['能同時照顧情緒與判斷', '會依情況切換視角', '人和事都看得見'],
      tips: ['別因為想保持平衡而拖延決定', '把你真正重視的標準說得更清楚', '比起完美中間點，先選眼前的最好'],
      cta: '你的平衡感，會柔和地連起關係與決定。',
    },
    en: {
      title: 'Soft Compass',
      subtitle: 'A balanced reader between heart and logic',
      description: 'You can notice emotion without losing your standards. Warmth and clarity stay close together for you, which lets you interpret situations with quiet balance rather than dramatic swings.',
      strengths: ['Handles feeling and judgment together', 'Shifts perspective depending on the moment', 'Can care for both people and tasks'],
      tips: ['Do not let balance turn into delayed decisions', 'Name your own criteria more clearly', 'Look for the best present option, not the perfect midpoint'],
      cta: 'Your sense of balance gently connects relationships and decisions.',
    },
  }),
  b_steady: createResultDefinition('b_steady', '/images/results/b-steady.svg', {
    ko: {
      title: 'Still Bloom',
      subtitle: '부드럽지만 중심이 분명한 균형형',
      description: '당신은 상대의 감정을 충분히 읽으면서도 쉽게 휩쓸리진 않아요. 다정한 태도와 단단한 기준이 함께 있어, 편안하면서도 신뢰감 있는 인상을 줍니다.',
      strengths: ['공감하면서도 자기 중심을 지킴', '말의 온도와 내용의 선명함을 함께 챙김', '관계 안에서 안정적인 신뢰를 줌'],
      tips: ['스스로 단단하다고 해서 무리하지 않기', '중심을 지키는 이유를 말로 나눠보기', '가끔은 결정보다 위로가 먼저일 수 있음을 기억하기'],
      cta: '당신의 단단한 다정함은 오래 남는 신뢰를 만듭니다.',
    },
    ja: {
      title: 'Still Bloom',
      subtitle: 'やさしいのに芯がぶれないバランス型',
      description: 'あなたは相手の気持ちを十分に受け取りながらも、簡単には流されません。やわらかさと確かな軸が同時にあるので、安心感と信頼感を一緒に与えるタイプです。',
      strengths: ['共感しながら自分の軸を保てる', '言葉の温度と内容の明瞭さを両立できる', '関係の中で安定した信頼をつくる'],
      tips: ['自分が平気だからと無理しすぎない', '軸を守る理由を言葉で共有してみる', 'ときには結論より慰めが先でもよいと覚えておく'],
      cta: 'あなたのしなやかな強さは、長く残る信頼を育てます。',
    },
    'zh-TW': {
      title: 'Still Bloom',
      subtitle: '溫柔但內在很穩的平衡型',
      description: '你能接住別人的感受，卻不會輕易被捲走。柔和的態度和穩定的核心同時存在，讓人感到舒服也感到可靠。',
      strengths: ['能共感，同時守住自己的中心', '能兼顧語氣的溫度與內容的清晰', '在人際裡帶來長久的信任感'],
      tips: ['不要因為自己撐得住就一直逞強', '試著把自己堅持的理由說出來', '有些時候，比起結論，安慰更重要'],
      cta: '你溫柔而堅定的樣子，會留下很深的信任。',
    },
    en: {
      title: 'Still Bloom',
      subtitle: 'A gentle interpreter with a steady core',
      description: 'You can take in someone else’s feelings without being easily pulled away from your own center. That mix of softness and steadiness makes you feel both warm and dependable.',
      strengths: ['Keeps empathy without losing personal grounding', 'Balances emotional tone and clear content', 'Builds stable trust in relationships'],
      tips: ['Do not overextend just because you can hold a lot', 'Share the reasons behind the center you keep', 'Sometimes comfort matters more than conclusion'],
      cta: 'Your quiet steadiness leaves a lasting kind of trust.',
    },
  }),
  b_bridge: createResultDefinition('b_bridge', '/images/results/b-bridge.svg', {
    ko: {
      title: 'Twin Current',
      subtitle: '사람과 구조 사이를 이어주는 브릿지형',
      description: '당신은 사람의 마음을 읽는 일과 상황을 정리하는 일을 함께 해낼 수 있어요. 감정과 구조를 번갈아 보며, 팀이나 관계 안에서 연결자 역할을 잘 해냅니다.',
      strengths: ['사람과 일의 언어를 모두 이해함', '중재와 연결에 강함', '정리된 공감, 따뜻한 판단이 가능함'],
      tips: ['모든 연결을 혼자 맡지 않기', '무엇을 우선할지 순간순간 정해주기', '설명과 위로 중 지금 필요한 쪽을 골라주기'],
      cta: '당신은 서로 다른 결을 자연스럽게 이어주는 사람입니다.',
    },
    ja: {
      title: 'Twin Current',
      subtitle: '人と構造のあいだをつなぐブリッジ型',
      description: 'あなたは人の心を読むことと、状況を整えることの両方ができます。感情と構造を行き来しながら、チームや関係の中で自然なつなぎ役になれる人です。',
      strengths: ['人と仕事の両方の言葉を理解できる', '仲介と接続に強い', '整理された共感とあたたかな判断ができる'],
      tips: ['すべての橋渡しを一人で抱え込まない', 'その場で何を優先するかを決める', '説明と慰めのどちらが必要かを選ぶ'],
      cta: 'あなたは異なる温度を自然につないでいける人です。',
    },
    'zh-TW': {
      title: 'Twin Current',
      subtitle: '連接人與結構之間的橋樑型',
      description: '你能同時理解人的感受，也能整理情境本身。你在情緒和結構之間切換得自然，所以很適合成為關係與團隊裡的連接者。',
      strengths: ['同時懂人與事情的語言', '擅長協調與連接', '能做出有條理又有溫度的判斷'],
      tips: ['不要把所有連結工作都攬在自己身上', '每個當下都先決定要優先哪一邊', '分清楚現在更需要解釋還是安慰'],
      cta: '你是能把不同節奏自然接起來的人。',
    },
    en: {
      title: 'Twin Current',
      subtitle: 'A bridge between people and structure',
      description: 'You can read people and organize situations at the same time. Because you move naturally between emotional and structural language, you often become a connecting force in teams and relationships.',
      strengths: ['Understands both human and task language', 'Strong at mediation and connection', 'Brings warm judgment with organized empathy'],
      tips: ['Do not take every bridge-building role on alone', 'Decide what deserves priority in each moment', 'Choose whether the room needs explanation or comfort first'],
      cta: 'You are someone who can connect different rhythms with grace.',
    },
  }),
};

export function getResultDefinition(type: ResultType): ResultDefinition {
  return resultDefinitions[type];
}

export function getResultProfile(locale: Locale, type: ResultType): ResultProfile {
  const definition = getResultDefinition(type);
  const content = definition.content[locale] ?? definition.content[defaultLocale];

  return {
    type,
    image: definition.image,
    ...content,
  };
}

export function getLocalizedResultProfiles(locale: Locale): Record<ResultType, ResultProfile> {
  return Object.fromEntries(
    (Object.keys(resultDefinitions) as ResultType[]).map((type) => [type, getResultProfile(locale, type)]),
  ) as Record<ResultType, ResultProfile>;
}
