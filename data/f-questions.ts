import { Question } from '@/types/quiz';

export const fQuestions: Question[] = [
  {
    id: 'f-1',
    prompt: '친구가 “괜찮아”라고 말했지만 표정이 어두워 보여요.',
    context: '말보다 분위기를 먼저 읽게 되는 순간을 떠올려보세요.',
    choices: [
      { id: 'f-1-a', text: '괜찮지 않은 이유가 있을지 조심스럽게 물어본다.', fScore: 4, tScore: 1, tags: ['공감', '세심함'] },
      { id: 'f-1-b', text: '조금 기다렸다가 편해 보일 때 다시 말을 건넨다.', fScore: 3, tScore: 2, tags: ['배려', '관찰'] },
      { id: 'f-1-c', text: '정확한 사실을 모르는 만큼 우선 그대로 받아들인다.', fScore: 2, tScore: 3, tags: ['신중함', '거리두기'] },
      { id: 'f-1-d', text: '굳이 파고들지 않고 다른 이야기로 분위기를 바꾼다.', fScore: 1, tScore: 4, tags: ['전환', '실용'] },
    ],
  },
  {
    id: 'f-2',
    prompt: '답장이 평소보다 짧을 때 가장 먼저 떠오르는 생각은?',
    context: '당신의 해석 습관이 자연스럽게 드러나는 장면입니다.',
    choices: [
      { id: 'f-2-a', text: '오늘 많이 지쳤거나 마음의 여유가 없을 수 있다.', fScore: 4, tScore: 1, tags: ['해석', '배려'] },
      { id: 'f-2-b', text: '다른 맥락이 있는지 조금 더 지켜본다.', fScore: 3, tScore: 2, tags: ['맥락', '균형'] },
      { id: 'f-2-c', text: '메시지 길이만으로는 판단하기 어렵다고 생각한다.', fScore: 2, tScore: 3, tags: ['판단유보', '논리'] },
      { id: 'f-2-d', text: '필요한 말만 한 것 같아 별 의미를 두지 않는다.', fScore: 1, tScore: 4, tags: ['효율', '단순화'] },
    ],
  },
  {
    id: 'f-3',
    prompt: '회의에서 누군가 유난히 말이 적어 보입니다.',
    context: '겉으로 드러나지 않은 감정을 읽는 방식에 주목해보세요.',
    choices: [
      { id: 'f-3-a', text: '부담을 느끼는지 눈치채고 따로 컨디션을 살핀다.', fScore: 4, tScore: 1, tags: ['관계', '공감'] },
      { id: 'f-3-b', text: '말할 타이밍이 오면 자연스럽게 참여를 유도한다.', fScore: 3, tScore: 2, tags: ['배려', '조율'] },
      { id: 'f-3-c', text: '발언량보다 내용이 중요하니 우선 지켜본다.', fScore: 2, tScore: 3, tags: ['관찰', '기준'] },
      { id: 'f-3-d', text: '의견이 없거나 준비가 덜 됐다고 판단한다.', fScore: 1, tScore: 4, tags: ['결론', '효율'] },
    ],
  },
  {
    id: 'f-4',
    prompt: '친한 사람이 약속 직전에 갑자기 취소했어요.',
    context: '실망감과 해석이 동시에 올라오는 상황입니다.',
    choices: [
      { id: 'f-4-a', text: '무슨 일이 있는지 먼저 걱정이 된다.', fScore: 4, tScore: 1, tags: ['걱정', '관심'] },
      { id: 'f-4-b', text: '아쉽지만 상대도 사정이 있었겠다고 생각한다.', fScore: 3, tScore: 2, tags: ['이해', '유연함'] },
      { id: 'f-4-c', text: '취소 사유가 합리적인지부터 확인하고 싶다.', fScore: 2, tScore: 3, tags: ['확인', '판단'] },
      { id: 'f-4-d', text: '다음부터는 약속 신뢰도를 다시 생각해본다.', fScore: 1, tScore: 4, tags: ['기준', '거리두기'] },
    ],
  },
  {
    id: 'f-5',
    prompt: '상대가 “네가 편한 대로 해”라고 말할 때 어떻게 느끼나요?',
    context: '표현의 표면과 속마음 사이를 해석하는 장면입니다.',
    choices: [
      { id: 'f-5-a', text: '진짜 괜찮은지 한 번 더 확인하고 싶다.', fScore: 4, tScore: 1, tags: ['확인', '감정읽기'] },
      { id: 'f-5-b', text: '상대의 말투나 분위기를 함께 살핀다.', fScore: 3, tScore: 2, tags: ['분위기', '관찰'] },
      { id: 'f-5-c', text: '말한 그대로 받아들이되 선택은 빠르게 정한다.', fScore: 2, tScore: 3, tags: ['실행', '명료함'] },
      { id: 'f-5-d', text: '의사결정 권한을 넘긴 것으로 이해한다.', fScore: 1, tScore: 4, tags: ['권한', '구조'] },
    ],
  },
  {
    id: 'f-6',
    prompt: '누군가 자신의 실수를 농담처럼 넘기고 있어요.',
    context: '가벼운 말 뒤의 감정을 어떻게 읽는지 살펴봅니다.',
    choices: [
      { id: 'f-6-a', text: '민망함을 감추려는 건 아닐까 생각한다.', fScore: 4, tScore: 1, tags: ['숨은감정', '이해'] },
      { id: 'f-6-b', text: '괜찮은 척하지만 속으론 신경 쓸 수 있다고 본다.', fScore: 3, tScore: 2, tags: ['추론', '배려'] },
      { id: 'f-6-c', text: '본인이 괜찮다니 상황을 더 키우지 않는다.', fScore: 2, tScore: 3, tags: ['존중', '거리'] },
      { id: 'f-6-d', text: '정리할 문제만 남았다면 감정은 부차적이라 본다.', fScore: 1, tScore: 4, tags: ['문제해결', '효율'] },
    ],
  },
  {
    id: 'f-7',
    prompt: '새로운 팀에 들어갔을 때 가장 먼저 보는 것은?',
    context: '환경을 읽는 기준이 감정 중심인지 판단 중심인지 드러납니다.',
    choices: [
      { id: 'f-7-a', text: '사람들 사이의 공기와 서로 대하는 온도감', fScore: 4, tScore: 1, tags: ['분위기', '관계'] },
      { id: 'f-7-b', text: '누가 어떤 역할을 하지만 표정도 함께 본다.', fScore: 3, tScore: 2, tags: ['역할', '공감'] },
      { id: 'f-7-c', text: '업무 흐름과 의사결정 방식부터 파악한다.', fScore: 2, tScore: 3, tags: ['구조', '분석'] },
      { id: 'f-7-d', text: '기대치와 규칙이 명확한지 먼저 확인한다.', fScore: 1, tScore: 4, tags: ['규칙', '효율'] },
    ],
  },
  {
    id: 'f-8',
    prompt: '지인이 “요즘 좀 애매해”라고 말합니다.',
    context: '불분명한 감정을 대할 때의 반응을 떠올려보세요.',
    choices: [
      { id: 'f-8-a', text: '무엇이 애매한지 차분히 풀어낼 수 있게 도와준다.', fScore: 4, tScore: 1, tags: ['경청', '지지'] },
      { id: 'f-8-b', text: '한두 가지 가능성을 함께 정리해본다.', fScore: 3, tScore: 2, tags: ['정리', '공감'] },
      { id: 'f-8-c', text: '상황을 구체화해야 도와줄 수 있다고 느낀다.', fScore: 2, tScore: 3, tags: ['구체화', '판단'] },
      { id: 'f-8-d', text: '핵심 문제가 뭔지 먼저 정의하자고 말한다.', fScore: 1, tScore: 4, tags: ['정의', '논리'] },
    ],
  },
  {
    id: 'f-9',
    prompt: '상대가 고마움을 길게 표현하지 않았을 때는?',
    context: '표현 방식의 차이를 어떻게 받아들이는지 생각해보세요.',
    choices: [
      { id: 'f-9-a', text: '표현이 서툰 사람일 수 있다고 이해한다.', fScore: 4, tScore: 1, tags: ['이해', '유연함'] },
      { id: 'f-9-b', text: '말보다 행동에서 진심이 보였는지 떠올린다.', fScore: 3, tScore: 2, tags: ['행동', '해석'] },
      { id: 'f-9-c', text: '고마움의 정도를 표현 길이로 판단하지 않는다.', fScore: 2, tScore: 3, tags: ['기준', '객관'] },
      { id: 'f-9-d', text: '필요한 의사 전달만 됐다면 충분하다고 본다.', fScore: 1, tScore: 4, tags: ['기능', '효율'] },
    ],
  },
  {
    id: 'f-10',
    prompt: '누군가 예민해 보이는 날, 당신은 보통 어떻게 하나요?',
    context: '상대 감정의 결을 대하는 방식입니다.',
    choices: [
      { id: 'f-10-a', text: '괜찮은지 먼저 살피고 조심스럽게 다가간다.', fScore: 4, tScore: 1, tags: ['배려', '접근'] },
      { id: 'f-10-b', text: '필요해 보이면 조용히 도울 준비를 한다.', fScore: 3, tScore: 2, tags: ['대기', '배려'] },
      { id: 'f-10-c', text: '감정보다 상황의 원인을 먼저 파악하려 한다.', fScore: 2, tScore: 3, tags: ['원인', '분석'] },
      { id: 'f-10-d', text: '업무나 일정에 영향이 있는지부터 본다.', fScore: 1, tScore: 4, tags: ['영향도', '실용'] },
    ],
  },
  {
    id: 'f-11',
    prompt: '갈등 상황에서 당신이 더 중요하게 보는 것은?',
    context: '문제 해결보다 관계의 온도에 더 반응하는지 확인합니다.',
    choices: [
      { id: 'f-11-a', text: '서로 상처받지 않게 대화가 이어지는 것', fScore: 4, tScore: 1, tags: ['관계', '안전감'] },
      { id: 'f-11-b', text: '감정도 풀리고 문제도 정리되는 균형', fScore: 3, tScore: 2, tags: ['균형', '조율'] },
      { id: 'f-11-c', text: '핵심 쟁점이 명확히 정리되는 것', fScore: 2, tScore: 3, tags: ['쟁점', '정리'] },
      { id: 'f-11-d', text: '누가 어떤 책임을 지는지 분명해지는 것', fScore: 1, tScore: 4, tags: ['책임', '구조'] },
    ],
  },
  {
    id: 'f-12',
    prompt: '누군가 “괜히 말했나”라고 후회할 때 당신은?',
    context: '상대의 취약함을 어떻게 받아내는지 보는 문항입니다.',
    choices: [
      { id: 'f-12-a', text: '그 마음이 민망하지 않도록 다정하게 받아준다.', fScore: 4, tScore: 1, tags: ['수용', '안심'] },
      { id: 'f-12-b', text: '말해줘서 고맙다고 하며 천천히 이어간다.', fScore: 3, tScore: 2, tags: ['경청', '격려'] },
      { id: 'f-12-c', text: '공유된 정보 중 무엇이 중요한지 정리한다.', fScore: 2, tScore: 3, tags: ['정리', '판단'] },
      { id: 'f-12-d', text: '앞으로 어떻게 행동할지 결론부터 잡는다.', fScore: 1, tScore: 4, tags: ['행동', '결론'] },
    ],
  },
  {
    id: 'f-13',
    prompt: '낯선 공간에 들어섰을 때 먼저 감지하는 것은?',
    context: '감정적 민감도와 구조적 민감도의 차이를 봅니다.',
    choices: [
      { id: 'f-13-a', text: '공간의 분위기와 사람들의 표정', fScore: 4, tScore: 1, tags: ['분위기', '감지'] },
      { id: 'f-13-b', text: '어색함이 있는지, 편안한지의 정도', fScore: 3, tScore: 2, tags: ['온도감', '직관'] },
      { id: 'f-13-c', text: '동선과 자리 배치, 운영 방식', fScore: 2, tScore: 3, tags: ['동선', '분석'] },
      { id: 'f-13-d', text: '규칙과 순서, 해야 할 일', fScore: 1, tScore: 4, tags: ['절차', '명확성'] },
    ],
  },
  {
    id: 'f-14',
    prompt: '상대가 실망했을 것 같은데 표현은 하지 않습니다.',
    context: '말하지 않는 감정을 다루는 방식입니다.',
    choices: [
      { id: 'f-14-a', text: '내가 놓친 게 있었는지 조심스럽게 묻는다.', fScore: 4, tScore: 1, tags: ['점검', '공감'] },
      { id: 'f-14-b', text: '시간을 두고 자연스럽게 대화 기회를 만든다.', fScore: 3, tScore: 2, tags: ['기다림', '배려'] },
      { id: 'f-14-c', text: '표현하지 않은 감정은 섣불리 가정하지 않는다.', fScore: 2, tScore: 3, tags: ['유보', '객관'] },
      { id: 'f-14-d', text: '문제가 있다면 직접 말할 것이라 생각한다.', fScore: 1, tScore: 4, tags: ['직접성', '기준'] },
    ],
  },
  {
    id: 'f-15',
    prompt: '하루를 돌아볼 때 가장 오래 남는 장면은?',
    context: '당신의 주의가 어디에 더 머무르는지 보여줍니다.',
    choices: [
      { id: 'f-15-a', text: '누군가의 표정이나 말투에서 느껴진 감정', fScore: 4, tScore: 1, tags: ['회상', '감정'] },
      { id: 'f-15-b', text: '사람들과 주고받은 분위기와 온도감', fScore: 3, tScore: 2, tags: ['관계', '분위기'] },
      { id: 'f-15-c', text: '무엇을 잘했고 놓친 게 무엇인지', fScore: 2, tScore: 3, tags: ['점검', '평가'] },
      { id: 'f-15-d', text: '다음 일정과 우선순위 정리', fScore: 1, tScore: 4, tags: ['우선순위', '계획'] },
    ],
  },
];
