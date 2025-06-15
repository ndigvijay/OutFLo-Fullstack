import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <div className="main-layout">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">
            <span className="logo-icon">🌊</span>
            OutFlo
          </h1>
          <nav className="nav">
            <Link to="/" className={isActive('/')}>
              Dashboard
            </Link>
            <Link to="/message-generator" className={isActive('/message-generator')}>
              Message Generator
            </Link>
          </nav>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default MainLayout; 