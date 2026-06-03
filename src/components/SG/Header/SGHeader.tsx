import { Header } from '../../Header/Header';

interface SGHeaderProps {
  onNavigate?: (page: string) => void;
}

export const SGHeader = ({ onNavigate }: SGHeaderProps) => {
  return (
    <Header
      onNavigate={onNavigate}
      title="Simone Gentili - senior web developer, tech author and chess enthusiast"
      homePageKey="home"
    />
  );
};