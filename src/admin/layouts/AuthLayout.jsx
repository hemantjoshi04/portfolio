import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-margin-mobile md:p-gutter bg-background text-on-surface antialiased">
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"></div>
      
      {/* Main Content */}
      <main className="relative z-10 w-full max-w-[440px]">
        {children}
        
        {/* Footer Copyright */}
        <div className="fixed bottom-8 left-0 w-full text-center px-gutter">
          <p className="font-label-caps text-[10px] text-on-surface-variant opacity-60 uppercase tracking-[0.2em]">
            © 2024 Artistry By Abhilasha • Atelier Management System
          </p>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
