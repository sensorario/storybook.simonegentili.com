import { Footer } from '../Footer/Footer';

const links = [
  { label: 'guitar.simonegentili.com', href: 'https://guitar.simonegentili.com' },
  { label: 'quadrato.simonegentili.com', href: 'https://quadrato.simonegentili.com' },
  { label: 'gantt.simonegentili.com', href: 'https://gantt.simonegentili.com' },
  { label: 'code2image.simonegentili.com', href: 'https://code2image.simonegentili.com' },
];

export const SGFooter = () => {
  return (
    <Footer
      copyright="© 2026 simonegentili.com"
      links={links}
    />
  );
};
