
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className={cn(
        "flex-grow pt-20 pb-10 px-4 md:px-6 lg:px-8",
        "transition-all duration-300 animate-fade-in"
      )}>
        <div className="container mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
