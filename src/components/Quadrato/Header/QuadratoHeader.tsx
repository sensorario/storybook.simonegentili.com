import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Header } from '../../Header/Header';
import { AppAccessGate, DEFAULT_HEIMDALL_URL } from '../../AppAccessGate/AppAccessGate';
import { AppLauncher } from '../../AppLauncher/AppLauncher';
import { Avatar } from '../../Avatar/Avatar';
import Authenticator from '../../Authenticator/Authenticator';
import LoginModal from '../../LoginModal/LoginModal';
import './QuadratoHeader.css';

const DEFAULT_COOKIE_NAME = 'simonegentili.com-access-token';

/** Dispatch on `window` with the new avatar (data URL or null) as `detail` after changing it, so the header updates without a reload. */
export const AVATAR_CHANGE_EVENT = 'sg-avatar-change';

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
  /** Endpoint of the app launcher menu. Default: the Heimdall-managed list on api.simonegentili.com. */
  appsUrl?: string;
  /** Base URL of the Heimdall API, used to check whether the logged-in user may use this app. */
  heimdallUrl?: string;
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
  appsUrl,
  heimdallUrl = DEFAULT_HEIMDALL_URL,
}, ref) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => hasCookie(cookieName));
  const [showLoginModal, setShowLoginModal] = useState(false);

  useImperativeHandle(ref, () => ({
    openLoginModal: () => setShowLoginModal(true),
  }));

  const token = isAuthenticated ? getCookieValue(cookieName) : null;
  const effectiveUsername = username ?? (token ? decodeJwtField(token, usernameJwtField) : null);

  // keyed by token, so a stale avatar never shows after logout or a user switch
  const [avatar, setAvatar] = useState<{ token: string; src: string | null } | null>(null);
  const avatarSrc = token && avatar?.token === token ? avatar.src : null;

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    fetch(`${heimdallUrl}/me/avatar`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => { if (!cancelled) setAvatar({ token, src: data?.avatar ?? null }); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [token, heimdallUrl]);

  useEffect(() => {
    if (!token) return;
    const onChange = (e: Event) => setAvatar({ token, src: (e as CustomEvent<string | null>).detail });
    window.addEventListener(AVATAR_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(AVATAR_CHANGE_EVENT, onChange);
  }, [token]);

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
      <Header onNavigate={onNavigate} title={title} homePageKey={homePageKey} className="quadrato-header">
        <AppLauncher appsUrl={appsUrl} token={token} />
        <div className="quadrato-header-auth">
          {isAuthenticated && avatarSrc && (
            <Avatar src={avatarSrc} />
          )}
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
      <AppAccessGate token={token} heimdallUrl={heimdallUrl} />
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />
    </>
  );
});

QuadratoHeader.displayName = 'QuadratoHeader';
