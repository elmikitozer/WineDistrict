import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const nom = searchParams.get('nom') || 'Vin Inconnu';
  const domaine = searchParams.get('domaine') || '';
  const annee = searchParams.get('annee') || '';
  const couleur = searchParams.get('couleur') || 'rouge';
  const variant = searchParams.get('variant') || '1'; // Permet de choisir le design

  // Couleurs selon le type de vin
  const colors = getColorScheme(couleur);

  // Choisir le design selon le variant
  switch (variant) {
    case '1':
      return designElegantMinimal(nom, domaine, annee, colors);
    case '2':
      return designMinimalistModern(nom, domaine, annee, colors);
    case '3':
      return designCleanTypography(nom, domaine, annee, colors);
    case '4':
      return designMinimalistLuxury(nom, domaine, annee, colors);
    case '5':
      return designElegantSimple(nom, domaine, annee, colors);
    case '6':
      return designVintageRouge(nom, domaine, annee, colors);
    case '7':
      return designVintageBlanc(nom, domaine, annee, colors);
    case '8':
      return designVintageRose(nom, domaine, annee, colors);
    case '9':
      return designVintageClassic(nom, domaine, annee, colors);
    case '10':
      return designVintageElegant(nom, domaine, annee, colors);
    default:
      return designElegantMinimal(nom, domaine, annee, colors);
  }
}

type ColorScheme = {
  bg1: string;
  bg2: string;
  text: string;
  accent: string;
  border: string;
};

function getColorScheme(couleur: string): ColorScheme {
  if (couleur === 'blanc') {
    return {
      bg1: '#F9FAFB',
      bg2: '#F3F4F6',
      text: '#1F2937',
      accent: '#D4AF37',
      border: '#E5E7EB',
    };
  } else if (couleur === 'rose') {
    return {
      bg1: '#FFF5F7',
      bg2: '#FFE4E6',
      text: '#881337',
      accent: '#FB7185',
      border: '#FECDD3',
    };
  } else {
    // rouge
    return {
      bg1: '#450A0A',
      bg2: '#7F1D1D',
      text: '#FFFFFF',
      accent: '#D4AF37',
      border: '#991B1B',
    };
  }
}

// Design 1: Elegant Minimal (Original)
function designElegantMinimal(nom: string, domaine: string, annee: string, colors: ColorScheme) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${colors.bg1}, ${colors.bg2})`,
          color: colors.text,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        {/* Bouteille minimaliste */}
        <div
          style={{
            display: 'flex',
            width: '80px',
            height: '200px',
            background: colors.accent,
            borderRadius: '40px 40px 0 0',
            marginBottom: '40px',
            opacity: 0.3,
          }}
        />

        {/* Nom du vin */}
        <div
          style={{
            fontSize: '48px',
            fontWeight: '300',
            textAlign: 'center',
            marginBottom: '16px',
            letterSpacing: '2px',
          }}
        >
          {nom}
        </div>

        {/* Domaine */}
        <div
          style={{
            fontSize: '28px',
            opacity: 0.8,
            textAlign: 'center',
            marginBottom: '24px',
            fontStyle: 'italic',
          }}
        >
          {domaine}
        </div>

        {/* Année */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: '700',
            color: colors.accent,
            textAlign: 'center',
          }}
        >
          {annee}
        </div>

        {/* Ligne décorative */}
        <div
          style={{
            display: 'flex',
            width: '200px',
            height: '2px',
            background: colors.accent,
            marginTop: '40px',
            opacity: 0.5,
          }}
        />
      </div>
    ),
    {
      width: 600,
      height: 800,
    }
  );
}

// Design 2: Minimalist Modern
function designMinimalistModern(nom: string, domaine: string, annee: string, colors: ColorScheme) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: colors.bg1,
          color: colors.text,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 60px',
        }}
      >
        {/* Ligne horizontale du haut */}
        <div
          style={{
            width: '300px',
            height: '1px',
            background: colors.accent,
            marginBottom: '60px',
          }}
        />

        {/* Nom du vin - très large */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: '100',
            textAlign: 'center',
            marginBottom: '20px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
          }}
        >
          {nom}
        </div>

        {/* Domaine - petit et discret */}
        <div
          style={{
            fontSize: '20px',
            textAlign: 'center',
            marginBottom: '80px',
            opacity: 0.6,
            letterSpacing: '2px',
          }}
        >
          {domaine}
        </div>

        {/* Année - très grande */}
        <div
          style={{
            fontSize: '120px',
            fontWeight: '200',
            color: colors.accent,
            textAlign: 'center',
            marginBottom: '60px',
            letterSpacing: '8px',
          }}
        >
          {annee}
        </div>

        {/* Ligne horizontale du bas */}
        <div
          style={{
            width: '300px',
            height: '1px',
            background: colors.accent,
          }}
        />
      </div>
    ),
    {
      width: 600,
      height: 800,
    }
  );
}

// Design 3: Clean Typography
function designCleanTypography(nom: string, domaine: string, annee: string, colors: ColorScheme) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: colors.bg1,
          color: colors.text,
          fontFamily: 'Georgia, serif',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 80px',
        }}
      >
        {/* Nom du vin - typographie classique */}
        <div
          style={{
            fontSize: '52px',
            fontWeight: '400',
            textAlign: 'center',
            marginBottom: '30px',
            letterSpacing: '1px',
            lineHeight: 1.2,
          }}
        >
          {nom}
        </div>

        {/* Séparateur élégant */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '1px',
              background: colors.accent,
            }}
          />
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: colors.accent,
              margin: '0 20px',
            }}
          />
          <div
            style={{
              width: '60px',
              height: '1px',
              background: colors.accent,
            }}
          />
        </div>

        {/* Domaine */}
        <div
          style={{
            fontSize: '24px',
            textAlign: 'center',
            marginBottom: '50px',
            fontStyle: 'italic',
            opacity: 0.8,
          }}
        >
          {domaine}
        </div>

        {/* Année dans un cadre */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '140px',
            height: '140px',
            border: `2px solid ${colors.accent}`,
            borderRadius: '50%',
            fontSize: '36px',
            fontWeight: '300',
            color: colors.accent,
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

// Design 4: Minimalist Luxury
function designMinimalistLuxury(nom: string, domaine: string, annee: string, _colors: ColorScheme) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: '#0A0A0A',
          color: '#FFFFFF',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 80px',
        }}
      >
        {/* Ligne verticale gauche */}
        <div
          style={{
            position: 'absolute',
            left: '100px',
            top: '0',
            width: '1px',
            height: '100%',
            background: '#D4AF37',
            opacity: 0.3,
          }}
        />

        {/* Ligne verticale droite */}
        <div
          style={{
            position: 'absolute',
            right: '100px',
            top: '0',
            width: '1px',
            height: '100%',
            background: '#D4AF37',
            opacity: 0.3,
          }}
        />

        {/* Nom du vin - ultra minimaliste */}
        <div
          style={{
            fontSize: '48px',
            fontWeight: '200',
            textAlign: 'center',
            marginBottom: '40px',
            letterSpacing: '6px',
            textTransform: 'uppercase',
          }}
        >
          {nom}
        </div>

        {/* Domaine */}
        <div
          style={{
            fontSize: '18px',
            textAlign: 'center',
            marginBottom: '80px',
            opacity: 0.6,
            letterSpacing: '3px',
          }}
        >
          {domaine}
        </div>

        {/* Année - très grande et élégante */}
        <div
          style={{
            fontSize: '96px',
            fontWeight: '100',
            color: '#D4AF37',
            textAlign: 'center',
            letterSpacing: '12px',
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

// Design 5: Elegant Simple
function designElegantSimple(nom: string, domaine: string, annee: string, colors: ColorScheme) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: `linear-gradient(180deg, ${colors.bg1} 0%, ${colors.bg2} 100%)`,
          color: colors.text,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 60px',
        }}
      >
        {/* Cercle décoratif en haut */}
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: `2px solid ${colors.accent}`,
            marginBottom: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            color: colors.accent,
            fontWeight: '300',
          }}
        >
          {annee}
        </div>

        {/* Nom du vin */}
        <div
          style={{
            fontSize: '44px',
            fontWeight: '400',
            textAlign: 'center',
            marginBottom: '20px',
            letterSpacing: '2px',
          }}
        >
          {nom}
        </div>

        {/* Domaine */}
        <div
          style={{
            fontSize: '22px',
            textAlign: 'center',
            marginBottom: '60px',
            fontStyle: 'italic',
            opacity: 0.8,
          }}
        >
          {domaine}
        </div>

        {/* Ligne décorative du bas */}
        <div
          style={{
            width: '200px',
            height: '2px',
            background: colors.accent,
            opacity: 0.6,
          }}
        />
      </div>
    ),
    {
      width: 600,
      height: 800,
    }
  );
}

// Design 6: Vintage Rouge (Spécial pour vins rouges)
function designVintageRouge(nom: string, domaine: string, annee: string, _colors: ColorScheme) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: '#8B0000',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        {/* Fond parcheminé avec bordure dorée */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: '#FFF8DC',
            border: '8px solid #DAA520',
            borderRadius: '12px',
            padding: '50px 40px',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            boxShadow: 'inset 0 0 30px rgba(139, 0, 0, 0.1)',
          }}
        >
          {/* Ornement du haut */}
          <div
            style={{
              fontSize: '48px',
              color: '#8B0000',
              marginBottom: '20px',
            }}
          >
            ⚜
          </div>

          {/* "Millésime" */}
          <div
            style={{
              fontSize: '16px',
              color: '#8B0000',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            Millésime
          </div>

          {/* Année vintage */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: '900',
              color: '#8B0000',
              marginBottom: '30px',
              fontFamily: 'serif',
            }}
          >
            {annee}
          </div>

          {/* Séparateur */}
          <div
            style={{
              width: '180px',
              height: '2px',
              background: '#DAA520',
              marginBottom: '30px',
            }}
          />

          {/* Nom du vin */}
          <div
            style={{
              fontSize: '40px',
              fontWeight: '700',
              textAlign: 'center',
              color: '#8B0000',
              marginBottom: '16px',
              fontFamily: 'serif',
              textTransform: 'uppercase',
            }}
          >
            {nom}
          </div>

          {/* Domaine */}
          <div
            style={{
              fontSize: '24px',
              textAlign: 'center',
              color: '#8B0000',
              fontStyle: 'italic',
              marginBottom: '30px',
            }}
          >
            {domaine}
          </div>

          {/* Ornement du bas */}
          <div
            style={{
              fontSize: '48px',
              color: '#8B0000',
            }}
          >
            ⚜
          </div>
        </div>
      </div>
    ),
    {
      width: 600,
      height: 800,
    }
  );
}

// Design 7: Vintage Blanc (Spécial pour vins blancs)
function designVintageBlanc(nom: string, domaine: string, annee: string, _colors: ColorScheme) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: '#F5F5DC',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        {/* Fond parcheminé avec bordure argentée */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: '#FFFEF7',
            border: '8px solid #C0C0C0',
            borderRadius: '12px',
            padding: '50px 40px',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            boxShadow: 'inset 0 0 30px rgba(192, 192, 192, 0.2)',
          }}
        >
          {/* Ornement du haut */}
          <div
            style={{
              fontSize: '48px',
              color: '#4682B4',
              marginBottom: '20px',
            }}
          >
            ✦
          </div>

          {/* "Millésime" */}
          <div
            style={{
              fontSize: '16px',
              color: '#4682B4',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            Millésime
          </div>

          {/* Année vintage */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: '900',
              color: '#4682B4',
              marginBottom: '30px',
              fontFamily: 'serif',
            }}
          >
            {annee}
          </div>

          {/* Séparateur */}
          <div
            style={{
              width: '180px',
              height: '2px',
              background: '#C0C0C0',
              marginBottom: '30px',
            }}
          />

          {/* Nom du vin */}
          <div
            style={{
              fontSize: '40px',
              fontWeight: '700',
              textAlign: 'center',
              color: '#2F4F4F',
              marginBottom: '16px',
              fontFamily: 'serif',
              textTransform: 'uppercase',
            }}
          >
            {nom}
          </div>

          {/* Domaine */}
          <div
            style={{
              fontSize: '24px',
              textAlign: 'center',
              color: '#2F4F4F',
              fontStyle: 'italic',
              marginBottom: '30px',
            }}
          >
            {domaine}
          </div>

          {/* Ornement du bas */}
          <div
            style={{
              fontSize: '48px',
              color: '#4682B4',
            }}
          >
            ✦
          </div>
        </div>
      </div>
    ),
    {
      width: 600,
      height: 800,
    }
  );
}

// Design 8: Vintage Rose (Spécial pour vins rosés)
function designVintageRose(nom: string, domaine: string, annee: string, _colors: ColorScheme) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: '#FFB6C1',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        {/* Fond parcheminé avec bordure rose */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: '#FFF0F5',
            border: '8px solid #FF69B4',
            borderRadius: '12px',
            padding: '50px 40px',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            boxShadow: 'inset 0 0 30px rgba(255, 105, 180, 0.1)',
          }}
        >
          {/* Ornement du haut */}
          <div
            style={{
              fontSize: '48px',
              color: '#C71585',
              marginBottom: '20px',
            }}
          >
            ♥
          </div>

          {/* "Millésime" */}
          <div
            style={{
              fontSize: '16px',
              color: '#C71585',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            Millésime
          </div>

          {/* Année vintage */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: '900',
              color: '#C71585',
              marginBottom: '30px',
              fontFamily: 'serif',
            }}
          >
            {annee}
          </div>

          {/* Séparateur */}
          <div
            style={{
              width: '180px',
              height: '2px',
              background: '#FF69B4',
              marginBottom: '30px',
            }}
          />

          {/* Nom du vin */}
          <div
            style={{
              fontSize: '40px',
              fontWeight: '700',
              textAlign: 'center',
              color: '#8B008B',
              marginBottom: '16px',
              fontFamily: 'serif',
              textTransform: 'uppercase',
            }}
          >
            {nom}
          </div>

          {/* Domaine */}
          <div
            style={{
              fontSize: '24px',
              textAlign: 'center',
              color: '#8B008B',
              fontStyle: 'italic',
              marginBottom: '30px',
            }}
          >
            {domaine}
          </div>

          {/* Ornement du bas */}
          <div
            style={{
              fontSize: '48px',
              color: '#C71585',
            }}
          >
            ♥
          </div>
        </div>
      </div>
    ),
    {
      width: 600,
      height: 800,
    }
  );
}

// Design 9: Vintage Classic (Style classique universel)
function designVintageClassic(nom: string, domaine: string, annee: string, _colors: ColorScheme) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: '#F5F1E8',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        {/* Fond parcheminé classique */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: '#FFF9F0',
            border: '12px solid #8B4513',
            borderRadius: '8px',
            padding: '50px 40px',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            boxShadow: 'inset 0 0 50px rgba(139, 69, 19, 0.1)',
          }}
        >
          {/* Ornement vintage du haut */}
          <div
            style={{
              fontSize: '60px',
              color: '#8B4513',
              marginBottom: '30px',
            }}
          >
            ⚜
          </div>

          {/* Établi en... */}
          <div
            style={{
              fontSize: '18px',
              color: '#8B4513',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '3px',
            }}
          >
            Établi en
          </div>

          {/* Année vintage */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: '900',
              color: '#8B4513',
              marginBottom: '40px',
              fontFamily: 'serif',
            }}
          >
            {annee}
          </div>

          {/* Séparateur */}
          <div
            style={{
              width: '200px',
              height: '3px',
              background: '#D4AF37',
              marginBottom: '30px',
            }}
          />

          {/* Nom du vin */}
          <div
            style={{
              fontSize: '44px',
              fontWeight: '700',
              textAlign: 'center',
              color: '#2C1810',
              marginBottom: '16px',
              fontFamily: 'serif',
              textTransform: 'uppercase',
            }}
          >
            {nom}
          </div>

          {/* Domaine */}
          <div
            style={{
              fontSize: '26px',
              textAlign: 'center',
              color: '#5D4E37',
              fontStyle: 'italic',
              marginBottom: '30px',
            }}
          >
            {domaine}
          </div>

          {/* Ornement vintage du bas */}
          <div
            style={{
              fontSize: '60px',
              color: '#8B4513',
            }}
          >
            ⚜
          </div>
        </div>
      </div>
    ),
    {
      width: 600,
      height: 800,
    }
  );
}

// Design 10: Vintage Elegant (Style vintage élégant)
function designVintageElegant(nom: string, domaine: string, annee: string, _colors: ColorScheme) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: '#2C1810',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        {/* Fond parcheminé élégant */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: '#FDF5E6',
            border: '6px solid #D4AF37',
            borderRadius: '16px',
            padding: '60px 50px',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            boxShadow: 'inset 0 0 40px rgba(212, 175, 55, 0.1)',
          }}
        >
          {/* Ornement élégant du haut */}
          <div
            style={{
              fontSize: '40px',
              color: '#8B4513',
              marginBottom: '20px',
            }}
          >
            ✦ ⚜ ✦
          </div>

          {/* "Château" */}
          <div
            style={{
              fontSize: '14px',
              color: '#8B4513',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '4px',
            }}
          >
            Château
          </div>

          {/* Année dans un cercle élégant */}
          <div
            style={{
              display: 'flex',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              border: '3px solid #D4AF37',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: '700',
              color: '#8B4513',
              marginBottom: '30px',
            }}
          >
            {annee}
          </div>

          {/* Nom du vin */}
          <div
            style={{
              fontSize: '38px',
              fontWeight: '600',
              textAlign: 'center',
              color: '#2C1810',
              marginBottom: '12px',
              fontFamily: 'serif',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {nom}
          </div>

          {/* Domaine */}
          <div
            style={{
              fontSize: '22px',
              textAlign: 'center',
              color: '#5D4E37',
              fontStyle: 'italic',
              marginBottom: '30px',
            }}
          >
            {domaine}
          </div>

          {/* Ornement élégant du bas */}
          <div
            style={{
              fontSize: '40px',
              color: '#8B4513',
            }}
          >
            ✦ ⚜ ✦
          </div>
        </div>
      </div>
    ),
    {
      width: 600,
      height: 800,
    }
  );
}
