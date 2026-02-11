
import React, { useState, useCallback } from 'react';
import { SignType, Sign, UserSelection, FortuneResult } from './types';
import { ZODIAC_SIGNS, HOROSCOPE_SIGNS } from './constants';
import { generateFortune } from './geminiService';
import SignCard from './components/SignCard';
import FortuneDisplay from './components/FortuneDisplay';

const App: React.FC = () => {
  const [signType, setSignType] = useState<SignType>(SignType.HOROSCOPE);
  const [selectedSign, setSelectedSign] = useState<Sign | null>(null);
  const [birthDate, setBirthDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [fortune, setFortune] = useState<FortuneResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetFortune = useCallback(async () => {
    if (!selectedSign) return;

    setLoading(true);
    setError(null);
    try {
      const selection: UserSelection = {
        type: signType,
        sign: selectedSign,
        birthDate: birthDate || undefined
      };
      const result = await generateFortune(selection);
      setFortune(result);
    } catch (err: any) {
      setError(err.message || '운세를 가져오는 도중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [selectedSign, signType, birthDate]);

  const handleReset = () => {
    setFortune(null);
    setSelectedSign(null);
    setBirthDate('');
    setError(null);
  };

  return (
    <div className="min-h-screen mystic-gradient text-slate-100 flex flex-col items-center py-12 px-4 sm:px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
          Mystic Insight
        </h1>
        <p className="text-slate-400 text-lg max-w-md mx-auto">
          AI가 전하는 신비로운 오늘의 운세로 하루를 더 의미 있게 맞이하세요.
        </p>
      </header>

      {!fortune && !loading && (
        <div className="w-full max-w-2xl bg-white/5 p-8 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-8 duration-500">
          {/* Sign Type Selector */}
          <div className="flex bg-slate-900/50 p-1 rounded-xl mb-8">
            <button
              onClick={() => { setSignType(SignType.HOROSCOPE); setSelectedSign(null); }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${signType === SignType.HOROSCOPE ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              별자리로 보기
            </button>
            <button
              onClick={() => { setSignType(SignType.ZODIAC); setSelectedSign(null); }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${signType === SignType.ZODIAC ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              띠별로 보기
            </button>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-indigo-200">
              {signType === SignType.HOROSCOPE ? '별자리를 선택해 주세요' : '띠를 선택해 주세요'}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {(signType === SignType.HOROSCOPE ? HOROSCOPE_SIGNS : ZODIAC_SIGNS).map((sign) => (
                <SignCard
                  key={sign.id}
                  sign={sign}
                  isSelected={selectedSign?.id === sign.id}
                  onClick={() => setSelectedSign(sign)}
                />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-lg font-semibold mb-2 text-indigo-200" htmlFor="birthdate">
              생년월일 (선택사항)
            </label>
            <input
              type="date"
              id="birthdate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
            <p className="text-[10px] text-slate-500 mt-2 ml-1">
              * 생년월일을 입력하시면 더욱 구체적인 운세 분석이 가능합니다.
            </p>
          </div>

          <button
            onClick={handleGetFortune}
            disabled={!selectedSign}
            className={`w-full py-4 rounded-xl text-lg font-bold transition-all shadow-xl
              ${selectedSign 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] active:scale-95 text-white' 
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'}
            `}
          >
            {selectedSign ? `${selectedSign.name} 운세 보기` : '대상을 선택해 주세요'}
          </button>
          
          {error && <p className="mt-4 text-center text-red-400 text-sm">{error}</p>}
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-3xl">🔮</div>
          </div>
          <h2 className="text-2xl font-bold text-indigo-200 mb-2">운세를 읽는 중입니다...</h2>
          <p className="text-slate-400">우주의 기운이 당신의 길을 비추고 있습니다.</p>
        </div>
      )}

      {fortune && selectedSign && !loading && (
        <FortuneDisplay 
          fortune={fortune} 
          selection={{ type: signType, sign: selectedSign, birthDate }} 
          onReset={handleReset} 
        />
      )}

      <footer className="mt-auto pt-12 text-slate-500 text-sm text-center">
        <p>&copy; 2024 Mystic Insight AI. All rights reserved.</p>
        <p className="mt-1">이 운세는 AI 기술을 기반으로 생성되었으며 참고용으로만 활용해 주세요.</p>
      </footer>
    </div>
  );
};

export default App;
