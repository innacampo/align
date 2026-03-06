import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="relative overflow-hidden bg-align-navy rounded-2xl px-8 py-12 md:px-14 md:py-16">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-align-teal/10 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-align-coral/10 rounded-full translate-y-1/2 -translate-x-1/4" />
      
      <div className="relative z-10 max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-1 bg-align-teal rounded-full" />
          <span className="text-align-teal text-xs font-semibold uppercase tracking-[0.2em]">Professional Clarity Tool</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-medium leading-tight tracking-tight">
          ALIGN
        </h1>
        
        <p className="mt-5 text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-lg">
          Clarity at work, when it matters.
        </p>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-align-teal" />
            <span className="text-white/50 text-xs uppercase tracking-wider">Reframe</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-align-coral" />
            <span className="text-white/50 text-xs uppercase tracking-wider">Understand</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span className="text-white/50 text-xs uppercase tracking-wider">Respond</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;