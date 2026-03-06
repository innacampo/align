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
    <form onSubmit={handleSubmit} className="w-full bg-align-card rounded-2xl shadow-card p-8 md:p-10 flex flex-col gap-5 border border-align-border">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-lg bg-align-teal/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-align-teal"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        </div>
        <h2 className="text-lg font-semibold text-align-navy tracking-tight">Describe Your Situation</h2>
      </div>

      <p className="text-align-text-secondary text-sm leading-relaxed">
        ALIGN helps translate moments of physiological disruption into professional clarity.
      </p>

      <textarea
        value={situation}
        onChange={(e) => setSituation(e.target.value)}
        placeholder="e.g., 'I lost my train of thought in a meeting due to brain fog'"
        className="w-full h-36 md:h-44 bg-align-bg border border-align-border rounded-xl p-5 text-align-text placeholder-align-text-secondary/40 focus:outline-none focus:border-align-teal focus:ring-2 focus:ring-align-teal/20 transition-all resize-none text-base leading-relaxed"
        disabled={isLoading}
      />
      
      <button
        type="submit"
        disabled={!situation.trim() || isLoading}
        className={`
          w-full py-4 rounded-xl font-semibold tracking-wide text-sm transition-all duration-300
          ${!situation.trim() || isLoading 
            ? 'bg-align-bg border border-align-border text-align-text-secondary/40 cursor-not-allowed' 
            : 'bg-align-teal hover:bg-align-teal-light text-white shadow-md hover:shadow-lg active:translate-y-0.5'}
        `}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-3">
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
    </form>
  );
};

export default InputSection;