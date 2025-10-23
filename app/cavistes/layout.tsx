import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos Cavistes Partenaires | Wine District',
  description:
    'Trouvez un caviste partenaire Wine District près de chez vous à Paris. Découvrez leur sélection de vins et réservez en ligne.',
  openGraph: {
    title: 'Nos Cavistes Partenaires | Wine District',
    description:
      'Trouvez un caviste partenaire Wine District près de chez vous à Paris.',
    type: 'website',
  },
};

export default function CavistesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

