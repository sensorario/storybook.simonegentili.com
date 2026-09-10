import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import './cookie-consent.css';

const COOKIE_NAME = 'simonegentili.com-cookie-consent';
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

function hasConsentCookie(): boolean {
  return document.cookie
    .split('; ')
    .some((entry) => entry.startsWith(`${COOKIE_NAME}=`));
}

// Shared across all *.simonegentili.com subdomains, same as the auth
// cookie, so accepting once covers every app in the family.
function setConsentCookie() {
  document.cookie = `${COOKIE_NAME}=accepted; path=/; domain=.simonegentili.com; max-age=${COOKIE_MAX_AGE_SECONDS}; secure; samesite=strict`;
}

interface CookieConsentProps {
  privacyPolicyHref?: string;
}

export const CookieConsent = ({
  privacyPolicyHref = 'https://simonegentili.com/privacy',
}: CookieConsentProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!hasConsentCookie());
  }, []);

  if (!visible) {
    return null;
  }

  const handleAccept = () => {
    setConsentCookie();
    setVisible(false);
  };

  return (
    <div className="cookie-consent" role="region" aria-label="Informativa sui cookie">
      <p className="cookie-consent-text">
        Questo sito utilizza esclusivamente cookie tecnici necessari al funzionamento (es.
        autenticazione). Non sono presenti cookie di profilazione o di terze parti. Per saperne di
        più consulta la{' '}
        <a href={privacyPolicyHref} target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        .
      </p>
      <Button label="Accetta" onClick={handleAccept} className="cookie-consent-accept" />
    </div>
  );
};
