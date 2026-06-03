import './Header.css';

interface HeaderProps {
  onNavigate?: (page: string) => void;
}

export const Header = ({ onNavigate }: HeaderProps) => {
  const handleLogoClick = () => {
    onNavigate?.('home');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={handleLogoClick}>
          <h1 className="logo-text">Simone Gentili - senior web developer, tech author and chess enthusiast</h1>
        </div>
      </div>
    </header>
  );
};