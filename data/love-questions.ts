import { loveQuestionTranslations } from '@/data/i18n/love-question-translations';
import { Locale } from '@/lib/i18n/config';
import { getLocalizedValue } from '@/lib/i18n/localized';
import { Question } from '@/types/quiz';

const loveQuestionContexts: Record<Locale, string> = {
  ko: '연애 상황에서 내가 실제로 가장 자주 보이는 반응을 떠올려보세요.',
  ja: '恋愛の場面で、自分がいちばん自然にしがちな反応を思い浮かべてください。',
  'zh-TW': '請想像自己在戀愛情境中最自然、最常出現的反應。',
  en: 'Think of the response you most naturally show in a romantic relationship.',
};

const loveQuestionsKo: Question[] = [
  {
    id: 'love-1',
    prompt: '연인과 다투기 시작했을 때, 당신이 먼저 신경 쓰는 것은?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-1-a', text: '지금 서로 얼마나 상처받고 있는지부터 느낀다.', fScore: 4, tScore: 1, tags: ['conflict_emotion', 'hurt_expression'] },
      { id: 'love-1-b', text: '감정이 커지기 전에 말투를 부드럽게 정리하려 한다.', fScore: 3, tScore: 2, tags: ['conflict_emotion', 'reassurance_consistency'] },
      { id: 'love-1-c', text: '왜 충돌이 났는지 쟁점을 빠르게 정리한다.', fScore: 2, tScore: 3, tags: ['conflict_logic', 'repair_explanation'] },
      { id: 'love-1-d', text: '감정보다 해결 순서와 기준부터 세운다.', fScore: 1, tScore: 4, tags: ['conflict_logic', 'hurt_priority'] },
    ],
  },
  {
    id: 'love-2',
    prompt: '다툼 중 상대가 울먹이면 당신은?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-2-a', text: '일단 감정을 달래고 안전하다는 느낌을 주고 싶다.', fScore: 4, tScore: 1, tags: ['conflict_emotion', 'reassurance_consistency'] },
      { id: 'love-2-b', text: '이야기를 멈추고 왜 힘든지 충분히 듣는다.', fScore: 3, tScore: 2, tags: ['conflict_emotion', 'repair_time'] },
      { id: 'love-2-c', text: '울게 된 핵심 원인을 차분히 짚어본다.', fScore: 2, tScore: 3, tags: ['conflict_logic', 'repair_explanation'] },
      { id: 'love-2-d', text: '감정이 가라앉으면 다시 논의하자고 제안한다.', fScore: 1, tScore: 4, tags: ['conflict_logic', 'repair_time'] },
    ],
  },
  {
    id: 'love-3',
    prompt: '갈등이 길어질수록 당신에게 더 중요한 것은?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-3-a', text: '서로 오해하지 않았다는 감정적 확인', fScore: 4, tScore: 1, tags: ['conflict_emotion', 'reassurance_consistency'] },
      { id: 'love-3-b', text: '감정도 챙기고 대화 분위기도 덜 날카롭게 만드는 것', fScore: 3, tScore: 2, tags: ['conflict_emotion', 'repair_time'] },
      { id: 'love-3-c', text: '문제가 반복되지 않도록 원인을 나누는 것', fScore: 2, tScore: 3, tags: ['conflict_logic', 'repair_explanation'] },
      { id: 'love-3-d', text: '앞으로의 룰과 기준을 명확히 정하는 것', fScore: 1, tScore: 4, tags: ['conflict_logic', 'reassurance_consistency'] },
    ],
  },
  {
    id: 'love-4',
    prompt: '상대가 “그건 네가 너무 예민한 거야”라고 했을 때의 첫 반응은?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-4-a', text: '내 감정이 무시당한 느낌이 먼저 든다.', fScore: 4, tScore: 1, tags: ['conflict_emotion', 'hurt_expression'] },
      { id: 'love-4-b', text: '왜 그렇게 말했는지 감정 배경을 궁금해한다.', fScore: 3, tScore: 2, tags: ['conflict_emotion', 'repair_explanation'] },
      { id: 'love-4-c', text: '어떤 상황을 두고 그렇게 판단했는지 묻는다.', fScore: 2, tScore: 3, tags: ['conflict_logic', 'hurt_priority'] },
      { id: 'love-4-d', text: '표현보다 핵심 쟁점이 뭔지 다시 정리한다.', fScore: 1, tScore: 4, tags: ['conflict_logic', 'repair_explanation'] },
    ],
  },
  {
    id: 'love-5',
    prompt: '싸운 뒤 먼저 화해 시도를 한다면 어떤 방식에 가깝나요?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-5-a', text: '마음이 어땠는지 솔직하게 털어놓으며 다가간다.', fScore: 4, tScore: 1, tags: ['conflict_emotion', 'affection_words'] },
      { id: 'love-5-b', text: '상대 기분을 보며 부드럽게 말을 꺼낸다.', fScore: 3, tScore: 2, tags: ['conflict_emotion', 'repair_time'] },
      { id: 'love-5-c', text: '오해 포인트를 정리한 메시지를 보낸다.', fScore: 2, tScore: 3, tags: ['conflict_logic', 'repair_explanation'] },
      { id: 'love-5-d', text: '다음엔 어떻게 하자는 합의를 제안한다.', fScore: 1, tScore: 4, tags: ['conflict_logic', 'reassurance_consistency'] },
    ],
  },
  {
    id: 'love-6',
    prompt: '연애 초반 연락 텀이 길어질 때 가장 먼저 드는 생각은?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-6-a', text: '관심이 식은 건 아닐지 마음이 흔들린다.', fScore: 4, tScore: 1, tags: ['contact_frequency', 'hurt_expression'] },
      { id: 'love-6-b', text: '바쁜 날일 수도 있지만 그래도 신경이 쓰인다.', fScore: 3, tScore: 2, tags: ['contact_frequency', 'contact_stability'] },
      { id: 'love-6-c', text: '패턴이 계속 그런지 조금 더 지켜본다.', fScore: 2, tScore: 3, tags: ['contact_stability', 'reassurance_consistency'] },
      { id: 'love-6-d', text: '연락 빈도보다 약속된 흐름이 지켜지는지가 중요하다.', fScore: 1, tScore: 4, tags: ['contact_stability', 'hurt_priority'] },
    ],
  },
  {
    id: 'love-7',
    prompt: '당신이 느끼는 “적당한 연락”은 어떤 쪽에 가까운가요?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-7-a', text: '자주, 가볍게라도 이어지는 게 안정적이다.', fScore: 4, tScore: 1, tags: ['contact_frequency', 'reassurance_consistency'] },
      { id: 'love-7-b', text: '바쁠 땐 짧아도 되지만 감정 톤은 유지돼야 한다.', fScore: 3, tScore: 2, tags: ['contact_frequency', 'contact_stability'] },
      { id: 'love-7-c', text: '연락 횟수보다 예측 가능한 패턴이 더 중요하다.', fScore: 2, tScore: 3, tags: ['contact_stability', 'reassurance_consistency'] },
      { id: 'love-7-d', text: '필요한 순간에 정확히 연결되면 충분하다.', fScore: 1, tScore: 4, tags: ['contact_stability', 'hurt_priority'] },
    ],
  },
  {
    id: 'love-8',
    prompt: '상대가 바쁜 날에도 당신이 가장 바라는 연락은?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-8-a', text: '짧아도 “생각하고 있어”가 느껴지는 연락', fScore: 4, tScore: 1, tags: ['contact_frequency', 'affection_words'] },
      { id: 'love-8-b', text: '늦어질 것 같다는 예고 한 마디', fScore: 3, tScore: 2, tags: ['contact_stability', 'reassurance_consistency'] },
      { id: 'love-8-c', text: '일이 끝난 뒤 상황 설명이 담긴 연락', fScore: 2, tScore: 3, tags: ['contact_stability', 'repair_explanation'] },
      { id: 'love-8-d', text: '정해둔 시간에만 집중해서 대화하는 흐름', fScore: 1, tScore: 4, tags: ['contact_stability', 'hurt_priority'] },
    ],
  },
  {
    id: 'love-9',
    prompt: '답장이 늦은 상대에게 마음이 상했을 때 보통 어떻게 하나요?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-9-a', text: '서운했다고 비교적 바로 표현한다.', fScore: 4, tScore: 1, tags: ['contact_frequency', 'hurt_expression'] },
      { id: 'love-9-b', text: '상대 사정을 생각하며 기다리지만 속은 복잡하다.', fScore: 3, tScore: 2, tags: ['contact_frequency', 'repair_time'] },
      { id: 'love-9-c', text: '반복되는 패턴인지 기록하듯 본다.', fScore: 2, tScore: 3, tags: ['contact_stability', 'hurt_priority'] },
      { id: 'love-9-d', text: '상황 설명이 오기 전까진 판단을 미룬다.', fScore: 1, tScore: 4, tags: ['contact_stability', 'repair_explanation'] },
    ],
  },
  {
    id: 'love-10',
    prompt: '“연락이 애정의 크기를 보여준다”는 말에 더 가까운 반응은?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-10-a', text: '꽤 그렇다. 빈도는 관심의 체온처럼 느껴진다.', fScore: 4, tScore: 1, tags: ['contact_frequency', 'affection_words'] },
      { id: 'love-10-b', text: '빈도보다도 꾸준한 연결감이 중요하다.', fScore: 3, tScore: 2, tags: ['contact_frequency', 'reassurance_consistency'] },
      { id: 'love-10-c', text: '연락보다 약속을 지키는 태도가 더 중요하다.', fScore: 2, tScore: 3, tags: ['contact_stability', 'affection_actions'] },
      { id: 'love-10-d', text: '연락은 방식일 뿐, 사랑의 증거는 따로 있다고 본다.', fScore: 1, tScore: 4, tags: ['contact_stability', 'hurt_priority'] },
    ],
  },
  {
    id: 'love-11',
    prompt: '상대에게 가장 서운한 순간은 언제인가요?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-11-a', text: '내 감정이 가볍게 넘겨졌다고 느껴질 때', fScore: 4, tScore: 1, tags: ['hurt_expression', 'conflict_emotion'] },
      { id: 'love-11-b', text: '표현은 있는데 우선순위에서 밀린 느낌이 들 때', fScore: 3, tScore: 2, tags: ['hurt_expression', 'hurt_priority'] },
      { id: 'love-11-c', text: '말보다 행동과 약속이 흔들릴 때', fScore: 2, tScore: 3, tags: ['hurt_priority', 'reassurance_consistency'] },
      { id: 'love-11-d', text: '같은 문제가 반복되는데 개선 설명이 없을 때', fScore: 1, tScore: 4, tags: ['hurt_priority', 'repair_explanation'] },
    ],
  },
  {
    id: 'love-12',
    prompt: '상대가 기념일을 놓쳤을 때 더 크게 남는 것은?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-12-a', text: '나를 떠올리는 마음이 약했던 것 같은 느낌', fScore: 4, tScore: 1, tags: ['hurt_expression', 'affection_words'] },
      { id: 'love-12-b', text: '서운하지만 진심으로 미안해하면 풀릴 수 있다.', fScore: 3, tScore: 2, tags: ['hurt_expression', 'repair_time'] },
      { id: 'love-12-c', text: '중요한 일의 우선순위가 맞지 않는다는 점', fScore: 2, tScore: 3, tags: ['hurt_priority', 'reassurance_consistency'] },
      { id: 'love-12-d', text: '다음엔 어떻게 방지할지 계획이 없는 점', fScore: 1, tScore: 4, tags: ['hurt_priority', 'repair_explanation'] },
    ],
  },
  {
    id: 'love-13',
    prompt: '상대가 사과는 했지만 여전히 마음이 남는 이유는 보통?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-13-a', text: '내 서운함의 감정 깊이가 충분히 이해되지 않았을 때', fScore: 4, tScore: 1, tags: ['hurt_expression', 'repair_explanation'] },
      { id: 'love-13-b', text: '미안하다는 말은 있지만 따뜻한 표현이 부족할 때', fScore: 3, tScore: 2, tags: ['hurt_expression', 'affection_words'] },
      { id: 'love-13-c', text: '왜 그런 일이 벌어졌는지 구조적 설명이 부족할 때', fScore: 2, tScore: 3, tags: ['hurt_priority', 'repair_explanation'] },
      { id: 'love-13-d', text: '다시는 안 그러겠다는 실행 기준이 없을 때', fScore: 1, tScore: 4, tags: ['hurt_priority', 'reassurance_consistency'] },
    ],
  },
  {
    id: 'love-14',
    prompt: '연애에서 “무심하다”는 말을 들으면 당신은?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-14-a', text: '표현이 부족했나 먼저 돌아본다.', fScore: 4, tScore: 1, tags: ['hurt_expression', 'affection_words'] },
      { id: 'love-14-b', text: '상대가 원하는 관심 방식이 뭔지 묻는다.', fScore: 3, tScore: 2, tags: ['hurt_expression', 'repair_explanation'] },
      { id: 'love-14-c', text: '무심함의 기준이 무엇인지 구체적으로 확인한다.', fScore: 2, tScore: 3, tags: ['hurt_priority', 'repair_explanation'] },
      { id: 'love-14-d', text: '표현보다 실제 책임과 행동을 보자고 생각한다.', fScore: 1, tScore: 4, tags: ['hurt_priority', 'affection_actions'] },
    ],
  },
  {
    id: 'love-15',
    prompt: '서운함이 쌓일 때 당신이 더 민감한 축은?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-15-a', text: '나를 어떻게 느끼고 말해주는지', fScore: 4, tScore: 1, tags: ['hurt_expression', 'affection_words'] },
      { id: 'love-15-b', text: '작은 관심이 꾸준히 이어지는지', fScore: 3, tScore: 2, tags: ['hurt_expression', 'reassurance_consistency'] },
      { id: 'love-15-c', text: '내가 관계의 우선순위 안에 있는지', fScore: 2, tScore: 3, tags: ['hurt_priority', 'contact_stability'] },
      { id: 'love-15-d', text: '반복 문제를 실제로 고칠 의지가 있는지', fScore: 1, tScore: 4, tags: ['hurt_priority', 'repair_explanation'] },
    ],
  },
  {
    id: 'love-16',
    prompt: '당신이 가장 사랑받는다고 느끼는 표현은?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-16-a', text: '진심이 느껴지는 말과 다정한 확인', fScore: 4, tScore: 1, tags: ['affection_words', 'reassurance_consistency'] },
      { id: 'love-16-b', text: '자주 떠올리고 챙겨주는 연락과 표현', fScore: 3, tScore: 2, tags: ['affection_words', 'contact_frequency'] },
      { id: 'love-16-c', text: '필요한 순간 직접 도와주고 움직여주는 행동', fScore: 2, tScore: 3, tags: ['affection_actions', 'reassurance_consistency'] },
      { id: 'love-16-d', text: '말보다 약속과 책임을 지켜주는 태도', fScore: 1, tScore: 4, tags: ['affection_actions', 'hurt_priority'] },
    ],
  },
  {
    id: 'love-17',
    prompt: '당신이 애정을 표현할 때 더 자연스러운 방식은?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-17-a', text: '말로 자주 확인하고 감정을 나누는 것', fScore: 4, tScore: 1, tags: ['affection_words', 'contact_frequency'] },
      { id: 'love-17-b', text: '짧아도 따뜻한 표현을 꾸준히 보내는 것', fScore: 3, tScore: 2, tags: ['affection_words', 'reassurance_consistency'] },
      { id: 'love-17-c', text: '상대에게 실제로 필요한 일을 챙겨주는 것', fScore: 2, tScore: 3, tags: ['affection_actions', 'hurt_priority'] },
      { id: 'love-17-d', text: '문제를 줄이고 생활을 편하게 만드는 것', fScore: 1, tScore: 4, tags: ['affection_actions', 'repair_explanation'] },
    ],
  },
  {
    id: 'love-18',
    prompt: '상대의 애정 표현을 오해 없이 느끼려면 무엇이 제일 큰가요?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-18-a', text: '말 속에 감정이 충분히 담겨 있는지', fScore: 4, tScore: 1, tags: ['affection_words', 'hurt_expression'] },
      { id: 'love-18-b', text: '표현이 자주, 끊기지 않고 이어지는지', fScore: 3, tScore: 2, tags: ['affection_words', 'reassurance_consistency'] },
      { id: 'love-18-c', text: '행동과 선택이 나를 향해 있는지', fScore: 2, tScore: 3, tags: ['affection_actions', 'hurt_priority'] },
      { id: 'love-18-d', text: '감정 표현보다 결과적으로 책임지는지', fScore: 1, tScore: 4, tags: ['affection_actions', 'contact_stability'] },
    ],
  },
  {
    id: 'love-19',
    prompt: '특별한 날보다 일상에서 더 설레는 장면은?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-19-a', text: '예고 없이 다정한 말을 건네주는 순간', fScore: 4, tScore: 1, tags: ['affection_words', 'contact_frequency'] },
      { id: 'love-19-b', text: '사소한 변화도 눈치채고 반응해주는 순간', fScore: 3, tScore: 2, tags: ['affection_words', 'hurt_expression'] },
      { id: 'love-19-c', text: '말하지 않아도 필요한 걸 챙겨주는 순간', fScore: 2, tScore: 3, tags: ['affection_actions', 'reassurance_consistency'] },
      { id: 'love-19-d', text: '내 삶의 일정과 약속을 진지하게 맞춰주는 순간', fScore: 1, tScore: 4, tags: ['affection_actions', 'contact_stability'] },
    ],
  },
  {
    id: 'love-20',
    prompt: '연애에서 “진심”을 가장 크게 느끼는 증거는?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-20-a', text: '감정을 숨기지 않고 솔직하게 표현하는 것', fScore: 4, tScore: 1, tags: ['affection_words', 'conflict_emotion'] },
      { id: 'love-20-b', text: '말과 태도의 온도가 꾸준히 맞는 것', fScore: 3, tScore: 2, tags: ['affection_words', 'reassurance_consistency'] },
      { id: 'love-20-c', text: '행동으로 우선순위를 보여주는 것', fScore: 2, tScore: 3, tags: ['affection_actions', 'hurt_priority'] },
      { id: 'love-20-d', text: '문제가 생겨도 실제로 책임지고 고치는 것', fScore: 1, tScore: 4, tags: ['affection_actions', 'repair_explanation'] },
    ],
  },
  {
    id: 'love-21',
    prompt: '당신이 관계에서 가장 안정감을 느끼는 순간은?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-21-a', text: '내 감정을 편하게 꺼내도 잘 받아줄 때', fScore: 4, tScore: 1, tags: ['reassurance_consistency', 'conflict_emotion'] },
      { id: 'love-21-b', text: '작은 표현이라도 꾸준히 이어질 때', fScore: 3, tScore: 2, tags: ['reassurance_consistency', 'contact_frequency'] },
      { id: 'love-21-c', text: '행동과 약속의 패턴이 한결같을 때', fScore: 2, tScore: 3, tags: ['reassurance_consistency', 'contact_stability'] },
      { id: 'love-21-d', text: '기준과 역할이 분명해서 예측 가능할 때', fScore: 1, tScore: 4, tags: ['reassurance_consistency', 'hurt_priority'] },
    ],
  },
  {
    id: 'love-22',
    prompt: '상대의 사랑을 신뢰하게 만드는 포인트는?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-22-a', text: '감정이 흔들릴 때도 내 편이 되어주는 태도', fScore: 4, tScore: 1, tags: ['reassurance_consistency', 'conflict_emotion'] },
      { id: 'love-22-b', text: '사소한 약속도 놓치지 않고 이어가는 태도', fScore: 3, tScore: 2, tags: ['reassurance_consistency', 'affection_actions'] },
      { id: 'love-22-c', text: '말과 행동이 크게 어긋나지 않는 점', fScore: 2, tScore: 3, tags: ['reassurance_consistency', 'contact_stability'] },
      { id: 'love-22-d', text: '문제가 생기면 기준 있게 대처하는 점', fScore: 1, tScore: 4, tags: ['reassurance_consistency', 'repair_explanation'] },
    ],
  },
  {
    id: 'love-23',
    prompt: '연인이 힘든 시기를 보낼 때 당신에게 중요한 안정감은?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-23-a', text: '감정적으로 가까이 붙어주는 연결감', fScore: 4, tScore: 1, tags: ['reassurance_consistency', 'contact_frequency'] },
      { id: 'love-23-b', text: '자주 확인하진 못해도 계속 신경 쓰고 있다는 신호', fScore: 3, tScore: 2, tags: ['reassurance_consistency', 'affection_words'] },
      { id: 'love-23-c', text: '필요한 지원을 구체적으로 챙겨주는 실질감', fScore: 2, tScore: 3, tags: ['reassurance_consistency', 'affection_actions'] },
      { id: 'love-23-d', text: '혼란스러워도 일정한 생활 리듬을 유지하는 것', fScore: 1, tScore: 4, tags: ['reassurance_consistency', 'contact_stability'] },
    ],
  },
  {
    id: 'love-24',
    prompt: '당신이 관계의 미래를 믿게 되는 기준은?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-24-a', text: '서로 감정을 숨기지 않고 공유할 수 있다는 점', fScore: 4, tScore: 1, tags: ['reassurance_consistency', 'affection_words'] },
      { id: 'love-24-b', text: '흔들려도 관계를 놓지 않는 꾸준함', fScore: 3, tScore: 2, tags: ['reassurance_consistency', 'repair_time'] },
      { id: 'love-24-c', text: '서로의 우선순위와 계획이 어느 정도 맞는 점', fScore: 2, tScore: 3, tags: ['reassurance_consistency', 'hurt_priority'] },
      { id: 'love-24-d', text: '문제 해결 방식이 재현 가능하게 정리되는 점', fScore: 1, tScore: 4, tags: ['reassurance_consistency', 'repair_explanation'] },
    ],
  },
  {
    id: 'love-25',
    prompt: '관계에서 안심이 깨지는 가장 큰 장면은?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-25-a', text: '내 감정을 말해도 빈손으로 돌아오는 느낌', fScore: 4, tScore: 1, tags: ['reassurance_consistency', 'hurt_expression'] },
      { id: 'love-25-b', text: '애정 표현이 갑자기 뚝 끊기는 느낌', fScore: 3, tScore: 2, tags: ['reassurance_consistency', 'contact_frequency'] },
      { id: 'love-25-c', text: '약속과 행동이 자주 흔들리는 패턴', fScore: 2, tScore: 3, tags: ['reassurance_consistency', 'contact_stability'] },
      { id: 'love-25-d', text: '문제 이후에도 기준이 다시 세워지지 않는 상태', fScore: 1, tScore: 4, tags: ['reassurance_consistency', 'repair_explanation'] },
    ],
  },
  {
    id: 'love-26',
    prompt: '싸운 뒤 회복이 시작됐다고 느끼는 신호는?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-26-a', text: '마음이 풀릴 때까지 충분히 감정을 나눈 뒤', fScore: 4, tScore: 1, tags: ['repair_time', 'conflict_emotion'] },
      { id: 'love-26-b', text: '따뜻한 말이나 제스처가 먼저 돌아온 뒤', fScore: 3, tScore: 2, tags: ['repair_time', 'affection_words'] },
      { id: 'love-26-c', text: '왜 그 일이 생겼는지 서로 납득한 뒤', fScore: 2, tScore: 3, tags: ['repair_explanation', 'conflict_logic'] },
      { id: 'love-26-d', text: '다음 행동 계획까지 정리된 뒤', fScore: 1, tScore: 4, tags: ['repair_explanation', 'reassurance_consistency'] },
    ],
  },
  {
    id: 'love-27',
    prompt: '화해 속도에 대해 당신은 어느 쪽에 가까운가요?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-27-a', text: '감정을 충분히 느끼고 정리할 시간이 필요하다.', fScore: 4, tScore: 1, tags: ['repair_time', 'hurt_expression'] },
      { id: 'love-27-b', text: '너무 길지만 않으면 자연스럽게 풀고 싶다.', fScore: 3, tScore: 2, tags: ['repair_time', 'reassurance_consistency'] },
      { id: 'love-27-c', text: '필요한 설명만 되면 비교적 빨리 넘어갈 수 있다.', fScore: 2, tScore: 3, tags: ['repair_explanation', 'hurt_priority'] },
      { id: 'love-27-d', text: '핵심 합의가 끝나면 감정보다 재정렬이 먼저다.', fScore: 1, tScore: 4, tags: ['repair_explanation', 'conflict_logic'] },
    ],
  },
  {
    id: 'love-28',
    prompt: '상대가 “그 일은 이제 끝내자”라고 할 때 당신은?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-28-a', text: '내 감정이 다 소화되지 않았으면 아직 아니다.', fScore: 4, tScore: 1, tags: ['repair_time', 'hurt_expression'] },
      { id: 'love-28-b', text: '따뜻한 확인이 함께 있다면 천천히 닫을 수 있다.', fScore: 3, tScore: 2, tags: ['repair_time', 'affection_words'] },
      { id: 'love-28-c', text: '끝내기 전에 서로 이해한 포인트를 확인하고 싶다.', fScore: 2, tScore: 3, tags: ['repair_explanation', 'conflict_logic'] },
      { id: 'love-28-d', text: '다시 안 반복될 기준만 정해지면 괜찮다.', fScore: 1, tScore: 4, tags: ['repair_explanation', 'reassurance_consistency'] },
    ],
  },
  {
    id: 'love-29',
    prompt: '갈등 후 다시 가까워지는 방식으로 더 편한 것은?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-29-a', text: '길게 대화하며 서로의 감정을 다 듣는 것', fScore: 4, tScore: 1, tags: ['repair_time', 'conflict_emotion'] },
      { id: 'love-29-b', text: '가벼운 스킨십이나 다정한 분위기부터 회복하는 것', fScore: 3, tScore: 2, tags: ['repair_time', 'affection_words'] },
      { id: 'love-29-c', text: '무엇을 바꿀지 실질적으로 정리하는 것', fScore: 2, tScore: 3, tags: ['repair_explanation', 'affection_actions'] },
      { id: 'love-29-d', text: '생활 패턴과 약속을 다시 맞추는 것', fScore: 1, tScore: 4, tags: ['repair_explanation', 'contact_stability'] },
    ],
  },
  {
    id: 'love-30',
    prompt: '“잘 회복했다”는 느낌이 드는 마지막 기준은?',
    context: loveQuestionContexts.ko,
    choices: [
      { id: 'love-30-a', text: '그 일을 떠올려도 감정이 덜 아플 때', fScore: 4, tScore: 1, tags: ['repair_time', 'hurt_expression'] },
      { id: 'love-30-b', text: '서로 다시 다정하게 연결된 느낌이 돌아올 때', fScore: 3, tScore: 2, tags: ['repair_time', 'reassurance_consistency'] },
      { id: 'love-30-c', text: '왜 틀어졌고 어떻게 다를지 서로 설명할 수 있을 때', fScore: 2, tScore: 3, tags: ['repair_explanation', 'conflict_logic'] },
      { id: 'love-30-d', text: '같은 문제가 생겨도 대응 기준이 생겼을 때', fScore: 1, tScore: 4, tags: ['repair_explanation', 'hurt_priority'] },
    ],
  },
];

export function getLoveQuestions(locale: Locale): Question[] {
  const context = getLocalizedValue(loveQuestionContexts, locale);
  const translatedQuestions = locale === 'ko' ? {} : loveQuestionTranslations[locale];

  return loveQuestionsKo.map((question) => {
    const translatedQuestion = translatedQuestions[question.id];

    return {
      ...question,
      prompt: translatedQuestion?.prompt ?? question.prompt,
      context,
      choices: question.choices.map((choice) => ({
        ...choice,
        text: translatedQuestion?.choices[choice.id] ?? choice.text,
      })),
    };
  });
}
