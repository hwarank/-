
import { FortuneResult, UserSelection } from './types';

/**
 * A simple seeded random number generator to ensure consistent 
 * fortunes for the same sign on the same day.
 */
function seededRandom(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  
  return function() {
    hash = (hash * 16807) % 2147483647;
    return (hash - 1) / 2147483646;
  };
}

const OVERALL_PHRASES = [
  "오늘은 우주의 기운이 당신을 향해 흐르는 날입니다. 새로운 시작을 하기에 최적의 시기입니다.",
  "평소보다 직관이 예리해지는 날입니다. 중요한 결정을 내릴 때 자신의 내면의 소리에 귀를 기울이세요.",
  "작은 변화가 큰 행복으로 이어질 수 있는 하루입니다. 주변의 사소한 신호들을 놓치지 마세요.",
  "에너지가 넘치는 하루가 예상됩니다. 미뤄두었던 일들을 처리하기에 아주 좋은 타이밍입니다.",
  "차분하게 자신을 돌아보는 시간이 필요한 날입니다. 서두르기보다 한 걸음 물러나 관찰하세요.",
  "긍정적인 마인드가 행운을 불러오는 열쇠입니다. 웃음으로 하루를 시작하면 좋은 소식이 찾아올 것입니다.",
  "주변 사람들과의 조화가 빛을 발하는 날입니다. 협력과 소통을 통해 문제를 해결해 보세요.",
  "창의적인 영감이 샘솟는 하루입니다. 새로운 아이디어를 기록하고 실행에 옮겨보세요."
];

const LOVE_PHRASES = [
  "진심 어린 대화가 관계를 더욱 깊게 만들어줍니다. 솔직한 감정을 표현해 보세요.",
  "예상치 못한 곳에서 설레는 만남이 있을 수 있습니다. 마음의 문을 활짝 열어두세요.",
  "상대방의 배려에 감사함을 느끼는 하루입니다. 작은 선물이나 따뜻한 말 한마디를 건네보세요.",
  "과거의 오해가 풀리고 화해의 기운이 감도는 날입니다. 먼저 손을 내미는 용기가 필요합니다.",
  "함께하는 시간의 소중함을 깨닫게 됩니다. 평범한 일상 속에서 특별한 행복을 찾아보세요.",
  "자기 자신을 먼저 사랑할 때 타인과의 관계도 건강해집니다. 스스로를 돌보는 시간을 가지세요."
];

const WEALTH_PHRASES = [
  "재물운이 상승 곡선을 그리는 날입니다. 계획했던 투자가 있다면 긍정적인 신호가 보입니다.",
  "지출 관리에 유의해야 하는 시기입니다. 꼭 필요한 소비인지 다시 한번 생각해보세요.",
  "생각지도 못한 작은 이익이 발생할 수 있는 운세입니다. 겸손한 자세로 행운을 맞이하세요.",
  "성실함이 곧 경제적 이득으로 연결되는 날입니다. 맡은 바 책임을 다하면 보상이 따릅니다.",
  "금전적인 부분에서 안정을 찾아가는 과정입니다. 장기적인 계획을 세우기에 적합한 날입니다.",
  "주변의 조언을 귀담아들으면 재정적 손실을 막을 수 있습니다. 신중한 판단이 요구됩니다."
];

const CAREER_PHRASES = [
  "능력을 인정받고 리더십을 발휘할 기회가 찾아옵니다. 자신감을 가지고 도전하세요.",
  "동료들과의 협업이 큰 성과를 만들어냅니다. 의견 차이를 조율하며 팀워크를 다지세요.",
  "새로운 배움이나 기술 습득에 행운이 따르는 날입니다. 자기계발에 시간을 투자해보세요.",
  "어려웠던 문제가 실마리를 찾게 됩니다. 끈기 있게 집중하면 결국 해답을 얻을 것입니다.",
  "업무적인 스트레스를 해소할 수 있는 기분 좋은 성취가 있습니다. 꾸준함이 승리합니다.",
  "계획했던 일들이 순조롭게 진행되는 하루입니다. 세부적인 사항들을 꼼꼼히 점검하세요."
];

const ADVICE_PHRASES = [
  "가장 큰 위험은 아무것도 시도하지 않는 것입니다.",
  "서두르지 마세요. 가장 좋은 것은 시간이 걸리기 마련입니다.",
  "당신의 직관을 믿으세요. 마음은 이미 답을 알고 있습니다.",
  "타인의 시선보다 자신의 행복에 집중하는 하루를 보내세요.",
  "작은 친절이 타인의 하루를 바꾸고, 결국 당신에게 돌아옵니다.",
  "지나간 일에 연연하기보다 다가올 내일을 준비하세요.",
  "오늘의 실패는 내일의 성공을 위한 소중한 거름이 됩니다.",
  "진정한 휴식은 게으름이 아니라 다음 도약을 위한 준비입니다."
];

const COLORS = ["인디고 블루", "로즈 골드", "에메랄드 그린", "미스틱 퍼플", "썬샤인 옐로우", "퓨어 화이트", "클래식 블랙", "스카이 블루", "라벤더", "테라코타"];
const DIRECTIONS = ["동쪽", "서쪽", "남쪽", "북쪽", "북동쪽", "남서쪽", "북서쪽", "남동쪽"];

export async function generateFortune(selection: UserSelection): Promise<FortuneResult> {
  // Simulate network delay for a more "mystic" feel
  await new Promise(resolve => setTimeout(resolve, 1500));

  const today = new Date().toISOString().split('T')[0];
  const seed = `${today}-${selection.sign.id}-${selection.type}`;
  const random = seededRandom(seed);

  const getRandomItem = (arr: string[]) => arr[Math.floor(random() * arr.length)];
  
  const score = Math.floor(random() * 41) + 60; // Generate a score between 60 and 100 for a positive vibe
  const luckyNumber = Math.floor(random() * 9) + 1;
  const luckyNumber2 = Math.floor(random() * 45) + 1;

  return {
    overall: getRandomItem(OVERALL_PHRASES),
    love: getRandomItem(LOVE_PHRASES),
    wealth: getRandomItem(WEALTH_PHRASES),
    career: getRandomItem(CAREER_PHRASES),
    luckyNumber: `${luckyNumber}, ${luckyNumber2}`,
    luckyColor: getRandomItem(COLORS),
    luckyDirection: getRandomItem(DIRECTIONS),
    advice: getRandomItem(ADVICE_PHRASES),
    score: score
  };
}
