
import React from 'react';
import { FortuneResult, UserSelection } from '../types';

interface FortuneDisplayProps {
  fortune: FortuneResult;
  selection: UserSelection;
  onReset: () => void;
}

const FortuneDisplay: React.FC<FortuneDisplayProps> = ({ fortune, selection, onReset }) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-yellow-400';
    if (score >= 60) return 'text-green-400';
    return 'text-blue-400';
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in duration-700">
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-indigo-900/40 rounded-full mb-4">
          <span className="text-6xl animate-float block">{selection.sign.emoji}</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          {selection.sign.name}의 오늘의 운세
        </h2>
        <div className="flex items-center justify-center gap-2">
          <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-slate-300">
            {new Date().toLocaleDateString('ko-KR')}
          </span>
          <span className={`text-2xl font-bold ${getScoreColor(fortune.score)}`}>
            {fortune.score}점
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Overall */}
        <div className="card-glass p-6 rounded-3xl col-span-1 md:col-span-2">
          <h3 className="text-indigo-300 font-bold mb-3 flex items-center gap-2">
            <i className="fas fa-sparkles"></i> 총평
          </h3>
          <p className="text-slate-100 leading-relaxed text-lg">
            {fortune.overall}
          </p>
        </div>

        {/* Detailed Areas */}
        <div className="card-glass p-6 rounded-3xl">
          <h3 className="text-pink-400 font-bold mb-3 flex items-center gap-2">
            <i className="fas fa-heart"></i> 애정/대인운
          </h3>
          <p className="text-slate-300 leading-relaxed">{fortune.love}</p>
        </div>

        <div className="card-glass p-6 rounded-3xl">
          <h3 className="text-amber-400 font-bold mb-3 flex items-center gap-2">
            <i className="fas fa-coins"></i> 금전/재물운
          </h3>
          <p className="text-slate-300 leading-relaxed">{fortune.wealth}</p>
        </div>

        <div className="card-glass p-6 rounded-3xl">
          <h3 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
            <i className="fas fa-briefcase"></i> 성공/직업운
          </h3>
          <p className="text-slate-300 leading-relaxed">{fortune.career}</p>
        </div>

        <div className="card-glass p-6 rounded-3xl">
          <h3 className="text-purple-400 font-bold mb-3 flex items-center gap-2">
            <i className="fas fa-lightbulb"></i> 오늘의 조언
          </h3>
          <p className="text-slate-300 leading-relaxed italic">"{fortune.advice}"</p>
        </div>
      </div>

      {/* Lucky Items */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-indigo-900/30 p-4 rounded-2xl text-center border border-indigo-500/20">
          <div className="text-indigo-400 text-xs uppercase tracking-wider mb-1">Lucky Number</div>
          <div className="text-xl font-bold text-white">{fortune.luckyNumber}</div>
        </div>
        <div className="bg-indigo-900/30 p-4 rounded-2xl text-center border border-indigo-500/20">
          <div className="text-indigo-400 text-xs uppercase tracking-wider mb-1">Lucky Color</div>
          <div className="text-xl font-bold text-white">{fortune.luckyColor}</div>
        </div>
        <div className="bg-indigo-900/30 p-4 rounded-2xl text-center border border-indigo-500/20">
          <div className="text-indigo-400 text-xs uppercase tracking-wider mb-1">Lucky Direction</div>
          <div className="text-xl font-bold text-white">{fortune.luckyDirection}</div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={onReset}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all shadow-lg shadow-indigo-600/30"
        >
          다른 운세 보기
        </button>
      </div>
    </div>
  );
};

export default FortuneDisplay;
