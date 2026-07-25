import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Header } from '../../Header/Header';
import Authenticator from '../../Authenticator/Authenticator';
import LoginModal from '../../LoginModal/LoginModal';
import './QuadratoHeader.css';

const DEFAULT_COOKIE_NAME = 'simonegentili.com-access-token';

const hasCookie = (name: string): boolean =>
  document.cookie
    .split('; ')
    .some((entry) => entry.startsWith(`${name}=`) && entry.slice(name.length + 1).length > 0);

const getCookieValue = (name: string): string | null => {
  const entry = document.cookie.split('; ').find((e) => e.startsWith(`${name}=`));
  return entry ? entry.slice(name.length + 1) : null;
};

const decodeJwtField = (token: string, field: string): string | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    return payload[field] ?? null;
  } catch {
    return null;
  }
};

interface QuadratoHeaderProps {
  title?: string;
  homePageKey?: string;
  onNavigate?: (page: string) => void;
  /** Name of the shared .simonegentili.com auth cookie to check. */
  cookieName?: string;
  /** Username to display once authenticated. If omitted, falls back to decoding `usernameJwtField` from the JWT cookie. */
  username?: string | null;
  /** JWT claim to use as username when `username` prop is not provided. Default: 'sub' */
  usernameJwtField?: string;
  /** Delegated login call, e.g. AjaxRepository.authenticate. Must set the auth cookie on success. */
  onLogin: (username: string, password: string) => void | Promise<void>;
  /** Delegated logout call. Must clear the auth cookie. */
  onLogout?: () => void;
  /** Notified on mount and after every login/logout with the current auth state. */
  onUserAuthenticated?: (isAuthenticated: boolean, username: string | null) => void;
}

export interface QuadratoHeaderHandle {
  /** Forces the login modal open, e.g. when a consumer action requires auth first. */
  openLoginModal: () => void;
}

export const QuadratoHeader = forwardRef<QuadratoHeaderHandle, QuadratoHeaderProps>(({
  title = 'Quadrato',
  homePageKey = 'home',
  onNavigate,
  cookieName = DEFAULT_COOKIE_NAME,
  username = null,
  usernameJwtField = 'sub',
  onLogin,
  onLogout,
  onUserAuthenticated,
}, ref) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => hasCookie(cookieName));
  const [showLoginModal, setShowLoginModal] = useState(false);

  useImperativeHandle(ref, () => ({
    openLoginModal: () => setShowLoginModal(true),
  }));

  const effectiveUsername =
    username ?? (isAuthenticated ? decodeJwtField(getCookieValue(cookieName) ?? '', usernameJwtField) : null);

  useEffect(() => {
    onUserAuthenticated?.(isAuthenticated, isAuthenticated ? effectiveUsername : null);
    // Only report the initial state on mount; login/logout report their own state below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (loginUsername: string, password: string) => {
    await onLogin(loginUsername, password);
    const authenticated = hasCookie(cookieName);
    setIsAuthenticated(authenticated);
    setShowLoginModal(false);
    onUserAuthenticated?.(authenticated, authenticated ? (username ?? loginUsername) : null);
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
          {isAuthenticated && effectiveUsername && (
            <span className="quadrato-header-username">{effectiveUsername}</span>
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
});

QuadratoHeader.displayName = 'QuadratoHeader';
