
export enum SignType {
  ZODIAC = 'ZODIAC', // 12 Chinese Zodiac (띠)
  HOROSCOPE = 'HOROSCOPE' // 12 Western Zodiac (별자리)
}

export interface Sign {
  id: string;
  name: string;
  emoji: string;
  period?: string;
}

export interface FortuneResult {
  overall: string;
  love: string;
  wealth: string;
  career: string;
  luckyNumber: string;
  luckyColor: string;
  luckyDirection: string;
  advice: string;
  score: number;
}

export interface UserSelection {
  type: SignType;
  sign: Sign;
  birthDate?: string;
}
