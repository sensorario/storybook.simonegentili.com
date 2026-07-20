import { useEffect, useState } from 'react';
import { Header } from '../../Header/Header';
import Authenticator from '../../Authenticator/Authenticator';
import LoginModal from '../../LoginModal/LoginModal';
import './QuadratoHeader.css';

const DEFAULT_COOKIE_NAME = 'simonegentili.com-access-token';

const hasCookie = (name: string): boolean =>
  document.cookie
    .split('; ')
    .some((entry) => entry.startsWith(`${name}=`) && entry.slice(name.length + 1).length > 0);

interface QuadratoHeaderProps {
  title?: string;
  homePageKey?: string;
  onNavigate?: (page: string) => void;
  /** Name of the shared .simonegentili.com auth cookie to check. */
  cookieName?: string;
  /** Username to display once authenticated (the cookie itself carries no username). */
  username?: string | null;
  /** Delegated login call, e.g. AjaxRepository.authenticate. Must set the auth cookie on success. */
  onLogin: (username: string, password: string) => void | Promise<void>;
  /** Delegated logout call. Must clear the auth cookie. */
  onLogout?: () => void;
  /** Notified on mount and after every login/logout with the current auth state. */
  onUserAuthenticated?: (isAuthenticated: boolean, username: string | null) => void;
}

export const QuadratoHeader = ({
  title = 'Quadrato',
  homePageKey = 'home',
  onNavigate,
  cookieName = DEFAULT_COOKIE_NAME,
  username = null,
  onLogin,
  onLogout,
  onUserAuthenticated,
}: QuadratoHeaderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => hasCookie(cookieName));
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    onUserAuthenticated?.(isAuthenticated, isAuthenticated ? username : null);
    // Only report the initial state on mount; login/logout report their own state below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (loginUsername: string, password: string) => {
    await onLogin(loginUsername, password);
    const authenticated = hasCookie(cookieName);
    setIsAuthenticated(authenticated);
    setShowLoginModal(false);
    onUserAuthenticated?.(authenticated, authenticated ? loginUsername : null);
  };

  const handleLogout = () => {
    onLogout?.();
    const authenticated = hasCookie(cookieName);
    setIsAuthenticated(authenticated);
    onUserAuthenticated?.(authenticated, null);
  };

  return (
    <>
      <Header onNavigate={onNavigate} title={title} homePageKey={homePageKey}>
        <div className="quadrato-header-auth">
          {isAuthenticated && username && (
            <span className="quadrato-header-username">{username}</span>
          )}
          <Authenticator
            isLoggedIn={isAuthenticated}
            handleLogin={() => setShowLoginModal(true)}
            handleLogout={handleLogout}
          />
        </div>
      </Header>
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />
    </>
  );
};
