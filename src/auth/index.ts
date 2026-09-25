export const ACCESS_TOKEN_COOKIE = 'simonegentili.com-access-token';

const readCookie = (name: string): string | null => {
    const entry = document.cookie.split('; ').find((e) => e.startsWith(`${name}=`));
    const value = entry?.slice(name.length + 1);
    return value ? value : null;
};

/** `domain` and `secure` only where the browser honors them: otherwise it drops the whole cookie (e.g. http://localhost). */
export const cookieScope = (): string =>
    (window.location.hostname.endsWith('simonegentili.com') ? '; domain=.simonegentili.com' : '') +
    (window.location.protocol === 'https:' ? '; secure' : '');

export const writeCookie = (name: string, value: string, maxAgeSeconds: number, sameSite: 'strict' | 'lax' = 'strict') => {
    document.cookie = `${name}=${value}; path=/; max-age=${maxAgeSeconds}; samesite=${sameSite}${cookieScope()}`;
};

/** The JWT shared by every .simonegentili.com app, or null when logged out. */
export const getAccessToken = (cookieName = ACCESS_TOKEN_COOKIE): string | null => readCookie(cookieName);

export const setAccessToken = (token: string, maxAgeSeconds = 7 * 24 * 3600, cookieName = ACCESS_TOKEN_COOKIE) =>
    writeCookie(cookieName, token, maxAgeSeconds);

export const clearAccessToken = (cookieName = ACCESS_TOKEN_COOKIE) => {
    writeCookie(cookieName, '', 0);
    // Older logins in some apps wrote a host-only cookie (no domain), which
    // the line above doesn't reach.
    document.cookie = `${cookieName}=; path=/; max-age=0`;
};

/** Reads one claim of the token payload without verifying it (the API does that). Default: the username. */
export const getTokenClaim = (token: string | null = getAccessToken(), claim = 'sub'): string | null => {
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        return typeof payload[claim] === 'string' ? payload[claim] : null;
    } catch {
        return null;
    }
};
