// API Route pour générer des placeholders SVG pour les vins
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const colors = {
  rouge: {
    bg: 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)',
    text: '#FFF',
  },
  blanc: {
    bg: 'linear-gradient(135deg, #F5DEB3 0%, #FFE4B5 100%)',
    text: '#333',
  },
  rose: {
    bg: 'linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 100%)',
    text: '#8B0000',
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nom = searchParams.get('nom') || 'Vin';
  const domaine = searchParams.get('domaine') || 'Domaine';
  const annee = searchParams.get('annee') || '2020';
  const couleurParam = searchParams.get('couleur') || 'rouge';
  const couleur = couleurParam as keyof typeof colors;

  const color = colors[couleur] || colors.rouge;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: color.bg,
          color: color.text,
          fontFamily: 'system-ui, sans-serif',
          padding: '40px',
        }}
      >
        {/* Icône de bouteille */}
        <svg
          width="120"
          height="200"
          viewBox="0 0 120 200"
          style={{ marginBottom: '20px', opacity: 0.3 }}
        >
          <path
            d="M 40 0 L 40 30 L 35 40 L 35 200 L 85 200 L 85 40 L 80 30 L 80 0 Z"
            fill={color.text}
          />
          <ellipse cx="60" cy="15" rx="20" ry="5" fill={color.text} />
        </svg>

        <div
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '10px',
            maxWidth: '90%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {nom}
        </div>
        <div
          style={{
            fontSize: 24,
            textAlign: 'center',
            marginBottom: '5px',
            opacity: 0.9,
          }}
        >
          {domaine}
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            marginTop: '10px',
          }}
        >
          {annee}
        </div>
      </div>
    ),
    {
      width: 600,
      height: 800,
    }
  );
}
