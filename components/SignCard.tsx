
import React from 'react';
import { Sign } from '../types';

interface SignCardProps {
  sign: Sign;
  isSelected: boolean;
  onClick: () => void;
}

const SignCard: React.FC<SignCardProps> = ({ sign, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300
        ${isSelected 
          ? 'bg-indigo-600 shadow-lg shadow-indigo-500/50 scale-105 border-2 border-indigo-400' 
          : 'bg-white/5 hover:bg-white/10 border border-white/10'}
      `}
    >
      <span className="text-4xl mb-2">{sign.emoji}</span>
      <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-slate-300'}`}>
        {sign.name}
      </span>
      {sign.period && (
        <span className="text-[10px] text-slate-400 mt-1">{sign.period}</span>
      )}
    </button>
  );
};

export default SignCard;
