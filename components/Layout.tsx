import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-align-bg text-align-text font-sans selection:bg-align-accent selection:text-white flex flex-col items-center">
      <div className="w-full max-w-3xl px-6 py-12 md:py-20 flex flex-col gap-8">
        {children}
      </div>
      <footer className="w-full text-center py-8 text-align-accent/40 text-sm mt-auto">
        Inna Campo &copy; {new Date().getFullYear()} &middot; 
      </footer>
    </div>
  );
};

export default Layout;