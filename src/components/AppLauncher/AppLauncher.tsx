import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '../Icon/Icon';
import { Logo } from '../Logo/Logo';
import { isLogoKey } from '../Logo/logos';
import { sgI18n } from '../../i18n';
import './AppLauncher.css';

export const DEFAULT_APPS_URL = 'https://api.simonegentili.com/heimdall/launcher';

// Gap between the panel and the window's edges.
const VIEWPORT_MARGIN = 12;
const PANEL_WIDTH = 320;

export type LauncherApp = {
    name: string;
    url: string;
    /** Not granted to the logged-in user: opening it shows AppAccessGate's "Richiedi accesso". */
    locked?: boolean;
    /** Tile background, set from Heimdall's "App" page. */
    color?: string | null;
    /** One of LOGOS' keys, drawn instead of the initial. */
    icon?: string | null;
};

interface AppLauncherProps {
    /** Endpoint returning `{ apps: LauncherApp[] }` - the enabled apps, managed from Heimdall. */
    appsUrl?: string;
    /** Accessible name of the grid button. Default: the translated "App". */
    label?: string;
    /** Logged-in user's JWT: the API then lists only the apps this user may use. */
    token?: string | null;
}

// Google-style "grid" menu listing every simonegentili.com app. The list is
// fetched on first open, not on mount, so pages that never open it don't pay
// for the request.
export const AppLauncher = ({ appsUrl = DEFAULT_APPS_URL, label, token = null }: AppLauncherProps) => {
    const { t } = useTranslation('sg', { i18n: sgI18n });
    const buttonLabel = label ?? t('launcher.label');
    const [open, setOpen] = useState(false);
    // Keyed by token, so logging in or out makes the list stale and it's refetched.
    const [loaded, setLoaded] = useState<{ token: string | null; apps: LauncherApp[] } | null>(null);
    const apps = loaded?.token === token ? loaded.apps : null;
    const [failed, setFailed] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const [panelStyle, setPanelStyle] = useState<CSSProperties>({});

    // The panel is position: fixed, placed from the button on every open, resize and scroll:
    // an absolute panel gets clipped by any ancestor that hides overflow (e.g. a short page's
    // body with overflow-x: hidden), and anchored to the button it can run off a phone screen.
    // A layout effect, so the panel never paints once in the wrong place.
    useLayoutEffect(() => {
        if (!open) return;
        const place = () => {
            const button = toggleRef.current?.getBoundingClientRect();
            if (!button) return;
            const width = Math.min(PANEL_WIDTH, window.innerWidth - 2 * VIEWPORT_MARGIN);
            const left = Math.min(
                Math.max(button.right - width, VIEWPORT_MARGIN),
                window.innerWidth - VIEWPORT_MARGIN - width
            );
            const top = button.bottom + 8;
            setPanelStyle({ top, left, width, maxHeight: window.innerHeight - top - VIEWPORT_MARGIN });
        };
        place();
        window.addEventListener('resize', place);
        window.addEventListener('scroll', place, true);
        return () => {
            window.removeEventListener('resize', place);
            window.removeEventListener('scroll', place, true);
        };
    }, [open]);

    useEffect(() => {
        if (!open || apps !== null) return;
        fetch(appsUrl, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined)
            .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
            .then((data: { apps: LauncherApp[] }) => setLoaded({ token, apps: data.apps }))
            .catch(() => setFailed(true));
    }, [open, apps, appsUrl, token]);

    useEffect(() => {
        if (!open) return;
        const handlePointerDown = (e: PointerEvent) => {
            if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open]);

    const toggle = () => {
        if (!open) setFailed(false);
        setOpen(!open);
    };

    return (
        <div className="sg-app-launcher" ref={rootRef}>
            <button
                type="button"
                ref={toggleRef}
                className="sg-app-launcher-toggle"
                aria-label={buttonLabel}
                title={buttonLabel}
                aria-expanded={open}
                onClick={toggle}
            >
                <Icon name="grid" size={22} />
            </button>
            {open && (
                <div className="sg-app-launcher-panel" style={panelStyle}>
                    {failed ? (
                        <p className="sg-app-launcher-message">{t('launcher.loadFailed')}</p>
                    ) : apps === null ? (
                        <p className="sg-app-launcher-message">{t('launcher.loading')}</p>
                    ) : (
                        <ul className="sg-app-launcher-grid">
                            {apps.map((app) => (
                                <li key={app.url}>
                                    <a
                                        href={app.url}
                                        className={[
                                            'sg-app-launcher-app',
                                            new URL(app.url).origin === window.location.origin ? 'current' : '',
                                            app.locked ? 'locked' : '',
                                        ]
                                            .filter(Boolean)
                                            .join(' ')}
                                        title={app.locked ? `${app.name}: ${t('launcher.locked')}` : undefined}
                                    >
                                        <span
                                            className="sg-app-launcher-tile"
                                            aria-hidden="true"
                                            style={app.color ? ({ '--tile-bg': app.color } as CSSProperties) : undefined}
                                        >
                                            {isLogoKey(app.icon) ? <Logo name={app.icon} size={22} /> : app.name.charAt(0).toUpperCase()}
                                            {app.locked && (
                                                <span className="sg-app-launcher-lock">
                                                    <Icon name="lock" size={12} />
                                                </span>
                                            )}
                                        </span>
                                        <span className="sg-app-launcher-name">
                                            {app.name}
                                            {app.locked && <span className="sg-visually-hidden"> ({t('launcher.locked')})</span>}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default AppLauncher;
