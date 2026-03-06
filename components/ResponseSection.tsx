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
    <div ref={containerRef} className="space-y-8 animate-fade-in pt-8 border-t border-align-accent/20 pb-8">
      {/* The Reframe */}
      <section className="space-y-3">
        <h2 className="text-2xl font-serif text-white flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-align-accent"></span>
          The Reframe
        </h2>
        <div className="bg-gradient-to-r from-align-accent/10 to-transparent border-l-4 border-align-accent p-6 rounded-r-lg">
          <p className="text-lg md:text-xl text-white italic font-serif leading-relaxed opacity-90">
            "{data.reframe}"
          </p>
        </div>
      </section>

      {/* The Science */}
      <section className="space-y-3">
        <h2 className="text-xl font-serif text-white/90 flex items-center gap-3">
           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-align-accent"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
           The Science
        </h2>
        <p className="text-align-text/80 leading-relaxed pl-1">
          {data.science}
        </p>
      </section>

      {/* The Professional Script */}
      <section className="space-y-4">
        <h2 className="text-xl font-serif text-white/90 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-align-accent"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          The Professional Scripts
        </h2>
        <div className="grid gap-4">
          {data.scripts.map((script, index) => (
            <ScriptCard key={index} script={script} />
          ))}
        </div>
      </section>

      {/* Reset Action */}
      <div className="flex justify-center pt-12 border-t border-align-accent/10 mt-8">
        <button
          onClick={onReset}
          className="group flex items-center gap-2 px-8 py-3 rounded-full border border-align-accent/30 text-align-accent/80 hover:bg-align-accent hover:text-white hover:border-transparent transition-all duration-300 text-xs font-bold uppercase tracking-widest"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-rotate-180 transition-transform duration-500"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12"></path><path d="M3 3v9h9"></path></svg>
          Start New Reframe
        </button>
      </div>
    </div>
  );
};

export default ResponseSection;