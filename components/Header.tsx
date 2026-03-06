import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center space-y-4 mb-4">
      <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-white font-medium">
        ALIGN
      </h1>
      <div className="h-0.5 w-12 bg-align-accent mx-auto rounded-full opacity-70"></div>
      <p className="text-lg md:text-xl text-align-text/80 font-light max-w-lg mx-auto leading-relaxed">
        Clarity at work, when it matters.
      </p>
    </header>
  );
};

export default Header;