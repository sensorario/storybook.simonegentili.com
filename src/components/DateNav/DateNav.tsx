import { useTranslation } from 'react-i18next';
import { sgI18n } from '../../i18n';
import './DateNav.css';

const pad = (n: number) => String(n).padStart(2, '0');
const dayOf = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
// Read at noon, so no daylight-saving change moves the day.
const noonOf = (day: string) => new Date(`${day}T12:00:00`);

const offsetDay = (day: string, days: number) => {
    const date = noonOf(day);
    date.setDate(date.getDate() + days);
    return dayOf(date);
};

interface DateNavProps {
    /** The day shown, "YYYY-MM-DD" where the browser is. */
    value: string;
    onChange: (day: string) => void;
    /** The last day it moves to, e.g. today for a diary; none to go on into the future. */
    max?: string;
    disabled?: boolean;
    /** The app moves the day with ← → and t too: the buttons' tooltips say so. */
    shortcuts?: boolean;
    className?: string;
}

// ‹ the day before, the day shown ("Oggi", else its date: a click goes back to today), the day after ›.
export const DateNav = ({ value, onChange, max, disabled = false, shortcuts = false, className }: DateNavProps) => {
    const { t, i18n } = useTranslation('sg', { i18n: sgI18n });
    const today = dayOf(new Date());
    const isToday = value === today;
    const withKey = (label: string, key: string) => (shortcuts ? `${label} (${key})` : label);

    return (
        <div className={['sg-date-nav', className].filter(Boolean).join(' ')}>
            <button
                type="button"
                className="sg-date-nav-step"
                disabled={disabled}
                onClick={() => onChange(offsetDay(value, -1))}
                title={withKey(t('dateNav.previousDay'), '←')}
                aria-label={t('dateNav.previousDay')}
                aria-keyshortcuts={shortcuts ? 'ArrowLeft' : undefined}
            >
                ‹
            </button>
            <button
                type="button"
                className={isToday ? 'sg-date-nav-current sg-date-nav-current--today' : 'sg-date-nav-current'}
                disabled={disabled}
                onClick={() => { if (!isToday) onChange(today); }}
                title={isToday ? undefined : withKey(t('dateNav.backToToday'), 't')}
                aria-keyshortcuts={shortcuts ? 't' : undefined}
            >
                {isToday
                    ? t('dateNav.today')
                    : noonOf(value).toLocaleDateString(i18n.language, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </button>
            <button
                type="button"
                className="sg-date-nav-step"
                disabled={disabled || (max !== undefined && value >= max)}
                onClick={() => onChange(offsetDay(value, 1))}
                title={withKey(t('dateNav.nextDay'), '→')}
                aria-label={t('dateNav.nextDay')}
                aria-keyshortcuts={shortcuts ? 'ArrowRight' : undefined}
            >
                ›
            </button>
        </div>
    );
};

export default DateNav;
