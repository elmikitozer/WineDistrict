import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nom = searchParams.get('nom') || 'Caviste';

  // Extraire les initiales (max 2 caractères)
  const initiales = nom
    .split(' ')
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  // Couleurs aléatoires mais déterministes basées sur le nom
  const hash = nom.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = hash % 360;

  const bgColor = `hsl(${hue}, 65%, 90%)`;
  const textColor = `hsl(${hue}, 70%, 30%)`;
  const accentColor = `hsl(${hue}, 60%, 70%)`;

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
          background: bgColor,
          position: 'relative',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Cercles décoratifs en arrière-plan */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: accentColor,
            opacity: 0.3,
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: accentColor,
            opacity: 0.3,
            display: 'flex',
          }}
        />

        {/* Initiales au centre */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'white',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            marginBottom: '30px',
          }}
        >
          <span
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: textColor,
              display: 'flex',
            }}
          >
            {initiales}
          </span>
        </div>

        {/* Nom du caviste */}
        <div
          style={{
            fontSize: '28px',
            fontWeight: '600',
            color: textColor,
            textAlign: 'center',
            maxWidth: '80%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {nom}
        </div>

        {/* Icône cave */}
        <div
          style={{
            marginTop: '20px',
            fontSize: '40px',
            display: 'flex',
          }}
        >
          🍷
        </div>
      </div>
    ),
    {
      width: 400,
      height: 400,
    }
  );
}
