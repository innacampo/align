import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-align-bg text-align-text font-sans flex flex-col">
      {/* Top accent bar */}
      <div className="w-full h-1 bg-gradient-to-r from-align-teal via-align-coral to-align-teal" />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 md:px-10 py-10 md:py-16 flex flex-col gap-10">
        {children}
      </main>

      <footer className="w-full border-t border-align-border bg-align-navy">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm font-light tracking-wide">
            &copy; {new Date().getFullYear()} Inna Campo
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-align-teal" />
            <span className="text-white/40 text-xs uppercase tracking-widest">ALIGN</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;