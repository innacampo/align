import React, { useState } from 'react';
import { ScriptOption } from '../types';

interface ScriptCardProps {
  script: ScriptOption;
  index: number;
}

const accentColors = [
  { bg: 'bg-align-teal/10', text: 'text-align-teal', border: 'border-align-teal/30', pill: 'bg-align-teal' },
  { bg: 'bg-align-coral/10', text: 'text-align-coral', border: 'border-align-coral/30', pill: 'bg-align-coral' },
  { bg: 'bg-align-navy/10', text: 'text-align-navy', border: 'border-align-navy/30', pill: 'bg-align-navy' },
];

const ScriptCard: React.FC<ScriptCardProps> = ({ script, index }) => {
  const [copied, setCopied] = useState(false);
  const accent = accentColors[index % accentColors.length];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = script.content;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      className="group bg-align-card border border-align-border rounded-2xl p-6 md:p-8 hover:shadow-card-hover hover:border-align-border-dark transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-3">
          <span className={`w-2 h-2 rounded-full ${accent.pill}`} />
          <span className={`text-xs font-bold uppercase tracking-wider ${accent.text}`}>
            {script.type}
          </span>
          {script.tone && (
            <span className="text-xs text-align-text-secondary/60 font-medium">
              &middot; {script.tone}
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200
            ${copied 
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                : 'bg-align-bg text-align-text-secondary border border-align-border hover:bg-align-teal hover:text-white hover:border-align-teal'
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
      
      <div className={`rounded-xl ${accent.bg} ${accent.border} border p-5`}>
        <p className="text-sm leading-relaxed text-align-text whitespace-pre-wrap">
          {script.content}
        </p>
      </div>
    </div>
  );
};

export default ScriptCard;