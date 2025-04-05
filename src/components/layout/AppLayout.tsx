
import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
