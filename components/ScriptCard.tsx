import React, { useState } from 'react';
import { ScriptOption } from '../types';

interface ScriptCardProps {
  script: ScriptOption;
}

const ScriptCard: React.FC<ScriptCardProps> = ({ script }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(script.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative bg-align-card/40 border border-align-accent/20 rounded-xl p-6 hover:border-align-accent/50 hover:bg-align-card/60 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      <div className="flex justify-between items-start mb-5">
        <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-white bg-align-accent/80 px-2.5 py-1 rounded w-fit shadow-sm">
                {script.type}
            </span>
            {script.tone && (
                <span className="text-[10px] font-medium uppercase tracking-wide text-align-accent/80 pl-0.5">
                    {script.tone}
                </span>
            )}
        </div>

        <button
          onClick={handleCopy}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200
            ${copied 
                ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                : 'bg-align-accent/10 text-align-accent border border-align-accent/20 hover:bg-align-accent hover:text-white hover:border-align-accent hover:shadow-md'
            }
          `}
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Copied
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              Copy
            </>
          )}
        </button>
      </div>
      
      <div className="relative">
        <div className="font-mono text-sm leading-relaxed text-align-text/90 whitespace-pre-wrap bg-align-dark/40 p-5 rounded-lg border border-white/5 group-hover:border-align-accent/10 transition-colors">
            {script.content}
        </div>
      </div>
    </div>
  );
};

export default ScriptCard;