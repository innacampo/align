import React, { useEffect, useRef } from 'react';
import { AlignResponse } from '../types';
import ScriptCard from './ScriptCard';

interface ResponseSectionProps {
  data: AlignResponse;
  onReset: () => void;
}

const ResponseSection: React.FC<ResponseSectionProps> = ({ data, onReset }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [data]);

  return (
    <div ref={containerRef} className="space-y-8 animate-fade-in">
      {/* Section header bar */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-1 bg-align-coral rounded-full" />
        <span className="text-align-coral text-xs font-semibold uppercase tracking-[0.2em]">Your Results</span>
      </div>

      {/* The Reframe */}
      <section className="bg-align-navy rounded-2xl p-8 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-align-teal/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-2 h-2 rounded-full bg-align-teal" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-align-teal">The Reframe</h2>
          </div>
          <p className="text-xl md:text-2xl text-white italic font-serif leading-relaxed">
            "{data.reframe}"
          </p>
        </div>
      </section>

      {/* The Science */}
      <section className="bg-align-card rounded-2xl shadow-card border border-align-border p-8 md:p-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-align-coral/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-align-coral"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          </div>
          <h2 className="text-lg font-semibold text-align-navy tracking-tight">The Science</h2>
        </div>
        <p className="text-align-text-secondary leading-relaxed text-base">
          {data.science}
        </p>
      </section>

      {/* The Professional Scripts */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-align-teal/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-align-teal"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          </div>
          <h2 className="text-lg font-semibold text-align-navy tracking-tight">Professional Scripts</h2>
        </div>
        <div className="grid gap-4">
          {data.scripts.map((script, index) => (
            <ScriptCard key={index} script={script} index={index} />
          ))}
        </div>
      </section>

      {/* Reset Action */}
      <div className="flex justify-center pt-8">
        <button
          onClick={onReset}
          className="group flex items-center gap-3 px-8 py-3.5 rounded-xl border-2 border-align-navy/20 text-align-navy hover:bg-align-navy hover:text-white hover:border-align-navy transition-all duration-300 text-sm font-semibold tracking-wide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-rotate-180 transition-transform duration-500"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12"></path><path d="M3 3v9h9"></path></svg>
          Start New Reframe
        </button>
      </div>
    </div>
  );
};

export default ResponseSection;