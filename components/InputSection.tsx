import React, { useState } from 'react';

interface InputSectionProps {
  onSubmit: (situation: string) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onSubmit, isLoading }) => {
  const [situation, setSituation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (situation.trim()) {
      onSubmit(situation);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
      <p className="text-align-text/60 text-sm md:text-base font-light mb-2 pl-1 tracking-wide">
        ALIGN helps translate moments of physiological disruption into professional clarity.
      </p>

      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-align-accent to-align-hover rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
        <div className="relative">
          <textarea
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="Describe the workplace situation... (e.g., 'I lost my train of thought in a meeting due to brain fog')"
            className="w-full h-32 md:h-40 bg-align-card border border-align-accent/30 rounded-xl p-4 text-align-text placeholder-align-text/30 focus:outline-none focus:border-align-accent focus:ring-1 focus:ring-align-accent transition-all resize-none text-base leading-relaxed"
            disabled={isLoading}
          />
        </div>
      </div>
      
      <div className="w-full">
        <button
          type="submit"
          disabled={!situation.trim() || isLoading}
          className={`
            w-full py-4 rounded-xl font-bold text-white tracking-widest uppercase text-sm transition-all duration-300 shadow-lg
            ${!situation.trim() || isLoading 
              ? 'bg-align-card border border-align-accent/10 text-align-text/20 cursor-not-allowed' 
              : 'bg-[#3A6F9A] hover:bg-[#4A7FAA] border border-align-accent/50 hover:border-white/20 hover:shadow-align-accent/20 active:translate-y-0.5'}
          `}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Aligning...
            </span>
          ) : (
            'Help Me Reframe'
          )}
        </button>
      </div>
    </form>
  );
};

export default InputSection;