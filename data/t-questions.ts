import { Question } from '@/types/quiz';

export const tQuestions: Question[] = [
  {
    id: 't-1',
    prompt: '회의 안건이 많고 시간이 부족할 때 가장 먼저 할 일은?',
    context: '판단 기준을 세우는 순서를 떠올려보세요.',
    choices: [
      { id: 't-1-a', text: '목표와 영향도가 큰 순서대로 안건을 재정렬한다.', fScore: 1, tScore: 4, tags: ['우선순위', '구조화'] },
      { id: 't-1-b', text: '급한 안건을 추린 뒤 팀 상황도 함께 고려한다.', fScore: 2, tScore: 3, tags: ['조율', '실행'] },
      { id: 't-1-c', text: '참석자들의 부담을 보며 흐름을 맞춘다.', fScore: 3, tScore: 2, tags: ['분위기', '배려'] },
      { id: 't-1-d', text: '누가 가장 답답해하는지 보고 순서를 바꾼다.', fScore: 4, tScore: 1, tags: ['감정', '반응'] },
    ],
  },
  {
    id: 't-2',
    prompt: '서로 다른 두 제안 중 하나를 골라야 합니다.',
    context: '의견보다 기준을 먼저 세우는지 보세요.',
    choices: [
      { id: 't-2-a', text: '판단 기준을 먼저 정의한 뒤 각 제안을 비교한다.', fScore: 1, tScore: 4, tags: ['기준', '비교'] },
      { id: 't-2-b', text: '장단점을 표처럼 적어보며 정리한다.', fScore: 2, tScore: 3, tags: ['정리', '분석'] },
      { id: 't-2-c', text: '구성원들이 더 편안해할 선택지를 본다.', fScore: 3, tScore: 2, tags: ['관계', '조율'] },
      { id: 't-2-d', text: '직감상 덜 상처받을 선택지를 고른다.', fScore: 4, tScore: 1, tags: ['직감', '감정'] },
    ],
  },
  {
    id: 't-3',
    prompt: '프로젝트가 지연되고 있을 때 당신의 첫 반응은?',
    context: '원인과 감정을 어디에 먼저 두는지 생각해보세요.',
    choices: [
      { id: 't-3-a', text: '병목 지점을 찾아 일정과 역할을 다시 조정한다.', fScore: 1, tScore: 4, tags: ['문제해결', '구조'] },
      { id: 't-3-b', text: '원인을 나눈 뒤 우선 해결 가능한 것부터 처리한다.', fScore: 2, tScore: 3, tags: ['분석', '실행'] },
      { id: 't-3-c', text: '팀원들이 얼마나 지쳤는지 먼저 살핀다.', fScore: 3, tScore: 2, tags: ['컨디션', '배려'] },
      { id: 't-3-d', text: '분위기가 무거워지지 않게 긴장을 먼저 푼다.', fScore: 4, tScore: 1, tags: ['정서', '완충'] },
    ],
  },
  {
    id: 't-4',
    prompt: '새로운 일을 맡았을 때 가장 먼저 확인하는 것은?',
    context: '시작점이 구조인지 감정인지 보는 문항입니다.',
    choices: [
      { id: 't-4-a', text: '목표, 마감, 성공 기준', fScore: 1, tScore: 4, tags: ['목표', '명확성'] },
      { id: 't-4-b', text: '필요 자원과 예상 리스크', fScore: 2, tScore: 3, tags: ['리스크', '준비'] },
      { id: 't-4-c', text: '함께 일할 사람들의 기대와 분위기', fScore: 3, tScore: 2, tags: ['기대', '협업'] },
      { id: 't-4-d', text: '내가 이 일을 하며 어떤 감정을 느낄지', fScore: 4, tScore: 1, tags: ['자기감정', '직관'] },
    ],
  },
  {
    id: 't-5',
    prompt: '복잡한 정보를 설명해야 할 때 당신은?',
    context: '정리 방식의 습관을 봅니다.',
    choices: [
      { id: 't-5-a', text: '핵심 결론부터 말하고 근거를 순서대로 붙인다.', fScore: 1, tScore: 4, tags: ['결론', '논리'] },
      { id: 't-5-b', text: '큰 틀을 먼저 보여주고 예시를 덧붙인다.', fScore: 2, tScore: 3, tags: ['프레임', '설명'] },
      { id: 't-5-c', text: '듣는 사람 반응을 보며 설명 순서를 바꾼다.', fScore: 3, tScore: 2, tags: ['조절', '배려'] },
      { id: 't-5-d', text: '상대가 덜 부담스러울 표현을 우선 고른다.', fScore: 4, tScore: 1, tags: ['표현', '감정'] },
    ],
  },
  {
    id: 't-6',
    prompt: '의견 충돌이 생기면 무엇부터 정리하나요?',
    context: '갈등을 구조화하는 방식을 떠올려보세요.',
    choices: [
      { id: 't-6-a', text: '사실, 해석, 요구를 구분한다.', fScore: 1, tScore: 4, tags: ['분리', '구조화'] },
      { id: 't-6-b', text: '공통 목표가 무엇인지 먼저 합의한다.', fScore: 2, tScore: 3, tags: ['목표', '정렬'] },
      { id: 't-6-c', text: '서로 왜 예민해졌는지 감정선을 읽는다.', fScore: 3, tScore: 2, tags: ['감정선', '공감'] },
      { id: 't-6-d', text: '우선 상처가 덜 남는 분위기를 만든다.', fScore: 4, tScore: 1, tags: ['분위기', '완충'] },
    ],
  },
  {
    id: 't-7',
    prompt: '해야 할 일이 많은 날, 당신의 정리 방식은?',
    context: '우선순위 감각을 보는 질문입니다.',
    choices: [
      { id: 't-7-a', text: '중요도와 마감을 기준으로 목록을 다시 짠다.', fScore: 1, tScore: 4, tags: ['우선순위', '계획'] },
      { id: 't-7-b', text: '쉬운 일과 어려운 일을 적절히 섞어 배치한다.', fScore: 2, tScore: 3, tags: ['배치', '실행'] },
      { id: 't-7-c', text: '오늘 만나는 사람들과의 에너지를 먼저 고려한다.', fScore: 3, tScore: 2, tags: ['에너지', '관계'] },
      { id: 't-7-d', text: '그때그때 가장 마음 쓰이는 일부터 한다.', fScore: 4, tScore: 1, tags: ['직감', '감정'] },
    ],
  },
  {
    id: 't-8',
    prompt: '불확실한 상황에서 결정을 내려야 한다면?',
    context: '확신이 부족할 때 어떤 기준을 세우는지 봅니다.',
    choices: [
      { id: 't-8-a', text: '현재 정보로 세울 수 있는 최소 기준을 만든다.', fScore: 1, tScore: 4, tags: ['기준', '의사결정'] },
      { id: 't-8-b', text: '가정과 변수들을 나눠서 검토한다.', fScore: 2, tScore: 3, tags: ['가정', '검토'] },
      { id: 't-8-c', text: '사람들이 심리적으로 받아들이기 쉬운 선택을 본다.', fScore: 3, tScore: 2, tags: ['수용성', '배려'] },
      { id: 't-8-d', text: '내가 더 편안하게 느끼는 쪽으로 기운다.', fScore: 4, tScore: 1, tags: ['편안함', '감정'] },
    ],
  },
  {
    id: 't-9',
    prompt: '누군가 설명을 장황하게 할 때 당신은?',
    context: '정보를 압축하는 습관을 떠올려보세요.',
    choices: [
      { id: 't-9-a', text: '핵심 결론이 무엇인지 먼저 묻는다.', fScore: 1, tScore: 4, tags: ['핵심', '요약'] },
      { id: 't-9-b', text: '중간중간 포인트를 메모하며 구조를 잡는다.', fScore: 2, tScore: 3, tags: ['메모', '구조'] },
      { id: 't-9-c', text: '상대가 왜 길게 말하는지 정서를 읽어본다.', fScore: 3, tScore: 2, tags: ['정서', '이해'] },
      { id: 't-9-d', text: '끊기 민망해 끝까지 들어준다.', fScore: 4, tScore: 1, tags: ['배려', '관계'] },
    ],
  },
  {
    id: 't-10',
    prompt: '문제가 재발했을 때 가장 필요한 것은?',
    context: '반복 문제를 대하는 기준을 봅니다.',
    choices: [
      { id: 't-10-a', text: '원인 분석과 재발 방지 규칙', fScore: 1, tScore: 4, tags: ['원인', '재발방지'] },
      { id: 't-10-b', text: '기록과 체크리스트 정비', fScore: 2, tScore: 3, tags: ['체크리스트', '정리'] },
      { id: 't-10-c', text: '당사자들이 덜 위축되는 피드백 방식', fScore: 3, tScore: 2, tags: ['피드백', '배려'] },
      { id: 't-10-d', text: '서운함이 쌓이지 않도록 감정을 풀어주는 것', fScore: 4, tScore: 1, tags: ['감정정리', '관계'] },
    ],
  },
  {
    id: 't-11',
    prompt: '새 아이디어를 평가할 때 가장 먼저 보는 것은?',
    context: '가능성과 실행성을 어떻게 바라보는지 확인합니다.',
    choices: [
      { id: 't-11-a', text: '문제 해결에 실제로 도움이 되는가', fScore: 1, tScore: 4, tags: ['실효성', '판단'] },
      { id: 't-11-b', text: '리소스 대비 효율이 괜찮은가', fScore: 2, tScore: 3, tags: ['효율', '비용'] },
      { id: 't-11-c', text: '팀이 이 아이디어를 즐겁게 받아들일까', fScore: 3, tScore: 2, tags: ['수용', '분위기'] },
      { id: 't-11-d', text: '왠지 끌리는 감각이 있는가', fScore: 4, tScore: 1, tags: ['직감', '감성'] },
    ],
  },
  {
    id: 't-12',
    prompt: '누군가 “그냥 느낌이 안 좋아”라고 말하면?',
    context: '추상적인 의견을 처리하는 방식입니다.',
    choices: [
      { id: 't-12-a', text: '어떤 근거와 패턴이 있었는지 구체화를 요청한다.', fScore: 1, tScore: 4, tags: ['구체화', '근거'] },
      { id: 't-12-b', text: '느낌의 이유를 사례로 정리해보자고 한다.', fScore: 2, tScore: 3, tags: ['사례', '정리'] },
      { id: 't-12-c', text: '그 불편함 자체가 중요한 신호일 수 있다고 본다.', fScore: 3, tScore: 2, tags: ['신호', '감정'] },
      { id: 't-12-d', text: '일단 그 감정을 존중하고 방향을 맞춘다.', fScore: 4, tScore: 1, tags: ['존중', '조율'] },
    ],
  },
  {
    id: 't-13',
    prompt: '피드백을 줄 때 더 중요하게 생각하는 것은?',
    context: '정확성과 정서적 수용성의 균형을 봅니다.',
    choices: [
      { id: 't-13-a', text: '무엇이 문제였고 어떻게 바꿀지 명확히 전달하는 것', fScore: 1, tScore: 4, tags: ['명확성', '개선'] },
      { id: 't-13-b', text: '사실과 제안을 분리해 이해하기 쉽게 말하는 것', fScore: 2, tScore: 3, tags: ['구분', '설명'] },
      { id: 't-13-c', text: '상대가 방어적이지 않게 느끼는 것', fScore: 3, tScore: 2, tags: ['수용', '배려'] },
      { id: 't-13-d', text: '말을 듣고 상처받지 않는 분위기', fScore: 4, tScore: 1, tags: ['분위기', '정서'] },
    ],
  },
  {
    id: 't-14',
    prompt: '계획이 틀어졌을 때 가장 먼저 하는 행동은?',
    context: '예상 밖 상황에서의 재정렬 습관입니다.',
    choices: [
      { id: 't-14-a', text: '변한 조건을 반영해 계획을 다시 짠다.', fScore: 1, tScore: 4, tags: ['재계획', '적응'] },
      { id: 't-14-b', text: '당장 중요한 것과 미뤄도 되는 것을 나눈다.', fScore: 2, tScore: 3, tags: ['분류', '우선순위'] },
      { id: 't-14-c', text: '함께 있는 사람들의 기분부터 살핀다.', fScore: 3, tScore: 2, tags: ['관계', '배려'] },
      { id: 't-14-d', text: '아쉬운 마음을 먼저 정리하고 싶다.', fScore: 4, tScore: 1, tags: ['감정정리', '회복'] },
    ],
  },
  {
    id: 't-15',
    prompt: '하루를 마무리할 때 가장 만족스러운 순간은?',
    context: '당신이 성취를 느끼는 기준입니다.',
    choices: [
      { id: 't-15-a', text: '복잡했던 일을 명확하게 정리해냈을 때', fScore: 1, tScore: 4, tags: ['정리', '성취'] },
      { id: 't-15-b', text: '계획한 일을 무리 없이 끝냈을 때', fScore: 2, tScore: 3, tags: ['완수', '안정'] },
      { id: 't-15-c', text: '주변 사람들과의 흐름이 편안했을 때', fScore: 3, tScore: 2, tags: ['조화', '관계'] },
      { id: 't-15-d', text: '마음이 괜히 뿌듯하고 따뜻할 때', fScore: 4, tScore: 1, tags: ['감정', '여운'] },
    ],
  },
];
