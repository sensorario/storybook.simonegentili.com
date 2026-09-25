import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sgI18n } from '../../i18n';
import { Button } from '../Button/Button';
import './AppAccessGate.css';

export const DEFAULT_HEIMDALL_URL = 'https://api.simonegentili.com/heimdall';

type Access = 'open' | 'approved' | 'pending' | 'rejected' | 'none';

type AccessApp = {
    name: string;
    url: string;
    slug: string;
    access: Access;
};

interface AppAccessGateProps {
    /** Logged-in user's JWT. Without it there's nothing to check: the app's own login flow applies. */
    token: string | null;
    /** Base URL of the Heimdall API (`/access`, `/access-requests`). */
    heimdallUrl?: string;
}

const withSlash = (url: string) => (url.endsWith('/') ? url : `${url}/`);

// Picks the Heimdall app this page belongs to by longest URL prefix, so an app
// living under a path (e.g. simonegentili.com/chess) wins over its host's own entry.
const currentApp = (apps: AccessApp[]): AccessApp | null => {
    const here = withSlash(window.location.origin + window.location.pathname);
    return (
        apps
            .filter((app) => here.startsWith(withSlash(app.url)))
            .sort((a, b) => b.url.length - a.url.length)[0] ?? null
    );
};

// Covers the page when the logged-in user hasn't been granted this app. The
// API already refuses its protected routes (403, code 5006); this only keeps
// the UI from pretending otherwise, and lets the user ask for access.
export const AppAccessGate = ({ token, heimdallUrl = DEFAULT_HEIMDALL_URL }: AppAccessGateProps) => {
    const { t } = useTranslation('sg', { i18n: sgI18n });
    const [checked, setChecked] = useState<{ token: string; app: AccessApp | null } | null>(null);
    const [sending, setSending] = useState(false);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if (!token) return;
        fetch(`${heimdallUrl}/access`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
            .then((data: { apps: AccessApp[] }) => setChecked({ token, app: currentApp(data.apps) }))
            .catch(() => setChecked({ token, app: null }));
    }, [token, heimdallUrl]);

    const app = checked?.token === token ? checked.app : null;

    if (!token || app === null || app.access === 'open' || app.access === 'approved') return null;

    const requestAccess = async () => {
        setSending(true);
        setFailed(false);
        try {
            const res = await fetch(`${heimdallUrl}/access-requests`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ app: app.slug }),
            });
            if (res.ok || res.status === 409) {
                setChecked({ token, app: { ...app, access: 'pending' } });
            } else {
                setFailed(true);
            }
        } catch {
            setFailed(true);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="sg-access-gate" role="dialog" aria-modal="true" aria-labelledby="sg-access-gate-title">
            <div className="sg-access-gate-card">
                <h2 id="sg-access-gate-title">{t('accessGate.title', { app: app.name })}</h2>
                {app.access === 'pending' ? (
                    <p>{t('accessGate.pending')}</p>
                ) : (
                    <>
                        <p>
                            {app.access === 'rejected' ? t('accessGate.rejected') : t('accessGate.none')}
                        </p>
                        {failed && <p className="sg-access-gate-error">{t('accessGate.failed')}</p>}
                        <Button
                            label={sending ? t('accessGate.sending') : t('accessGate.request')}
                            disabled={sending}
                            onClick={requestAccess}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default AppAccessGate;
