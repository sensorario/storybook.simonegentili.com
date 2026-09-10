import { Footer } from '../../Footer/Footer';
import { CookieConsent } from '../../CookieConsent/CookieConsent';

const links = [
  { label: 'guitar', href: 'https://guitar.simonegentili.com' },
  { label: 'tome', href: 'https://tome.simonegentili.com' },
  { label: 'quadrato', href: 'https://quadrato.simonegentili.com' },
  { label: 'gantt', href: 'https://gantt.simonegentili.com' },
  { label: 'code2image', href: 'https://code2image.simonegentili.com' },
];

export const SGFooter = () => {
  return (
    <>
      <Footer
        href="https://simonegentili.com"
        copyright="© 2026 simonegentili.com"
        links={links}
      />
      <CookieConsent />
    </>
  );
};
