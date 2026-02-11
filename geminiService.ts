
import { GoogleGenAI, Type } from "@google/genai";
import { FortuneResult, UserSelection, SignType } from './types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateFortune(selection: UserSelection): Promise<FortuneResult> {
  const model = "gemini-3-flash-preview";
  
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  const prompt = `
    당신은 신비롭고 정확한 운세 분석가입니다. 
    오늘(${today})의 운세를 다음 정보를 바탕으로 분석해 주세요.
    - 구분: ${selection.type === SignType.ZODIAC ? '띠' : '별자리'}
    - 대상: ${selection.sign.name}
    ${selection.birthDate ? `- 생년월일: ${selection.birthDate}` : ''}

    사용자에게 희망과 조언을 주는 따뜻하고 품격 있는 문체로 답변해 주세요.
    모든 답변은 한국어로 작성해야 합니다.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overall: { type: Type.STRING, description: '전반적인 오늘의 운세 총평 (2-3문장)' },
          love: { type: Type.STRING, description: '애정운 및 대인관계운' },
          wealth: { type: Type.STRING, description: '금전운 및 재물운' },
          career: { type: Type.STRING, description: '직업운, 학업운 및 성공운' },
          luckyNumber: { type: Type.STRING, description: '오늘의 행운의 숫자 (1-2개)' },
          luckyColor: { type: Type.STRING, description: '오늘의 행운의 색상' },
          luckyDirection: { type: Type.STRING, description: '오늘의 행운의 방향' },
          advice: { type: Type.STRING, description: '오늘의 특별한 조언이나 주의사항 (1문장)' },
          score: { type: Type.NUMBER, description: '오늘의 종합 운세 점수 (0-100)' },
        },
        required: ["overall", "love", "wealth", "career", "luckyNumber", "luckyColor", "luckyDirection", "advice", "score"],
      },
    },
  });

  try {
    const result = JSON.parse(response.text);
    return result as FortuneResult;
  } catch (error) {
    console.error("Failed to parse fortune JSON:", error);
    throw new Error("운세를 분석하는 중에 오류가 발생했습니다.");
  }
}
