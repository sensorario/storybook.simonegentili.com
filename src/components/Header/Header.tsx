import type { ReactNode } from 'react';
import './Header.css';

interface HeaderProps {
  onNavigate?: (page: string) => void;
  title?: string;
  homePageKey?: string;
  children?: ReactNode;
}

export const Header = ({
  onNavigate,
  title = 'Simone Gentili - senior web developer, tech author and chess enthusiast',
  homePageKey = 'home',
  children,
}: HeaderProps) => {
  const handleLogoClick = () => {
    onNavigate?.(homePageKey);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={handleLogoClick}>
          <h1 className="logo-text">{title}</h1>
        </div>
        {children && <div className="header-actions">{children}</div>}
      </div>
    </header>
  );
};