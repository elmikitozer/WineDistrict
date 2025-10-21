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
      return designMinimalistClean(nom, domaine, annee, colors);
    case '3':
      return designMinimalistBold(nom, domaine, annee, colors);
    case '4':
      return designMinimalistGeometric(nom, domaine, annee, colors);
    case '5':
      return designMinimalistSerif(nom, domaine, annee, colors);
    case '6':
      return designVintageClassic(nom, domaine, annee);
    case '7':
      return designVintageElegant(nom, domaine, annee);
    case '8':
      return designVintageRustic(nom, domaine, annee);
    case '9':
      return designVintageOrnate(nom, domaine, annee);
    case '10':
      return designVintageNoble(nom, domaine, annee);
    case '11':
      return designArtistic(nom, domaine, annee, colors);
    case '12':
      return designModern(nom, domaine, annee, colors);
    case '13':
      return designLuxury(nom, domaine, annee);
    case '14':
      return designCreative(nom, domaine, annee, colors);
    case '15':
      return designUnique(nom, domaine, annee, colors);
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

// ===== INSPIRÉS DU DESIGN #1 (Elegant Minimal) =====

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

// Design 2: Minimalist Clean
function designMinimalistClean(nom: string, domaine: string, annee: string, colors: ColorScheme) {
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
          padding: '100px 80px',
        }}
      >
        {/* Ligne du haut */}
        <div
          style={{
            width: '400px',
            height: '1px',
            background: colors.accent,
            marginBottom: '80px',
            opacity: 0.6,
          }}
        />

        {/* Nom du vin - ultra clean */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: '200',
            textAlign: 'center',
            marginBottom: '24px',
            letterSpacing: '6px',
            textTransform: 'uppercase',
          }}
        >
          {nom}
        </div>

        {/* Domaine */}
        <div
          style={{
            fontSize: '20px',
            textAlign: 'center',
            marginBottom: '100px',
            opacity: 0.7,
            letterSpacing: '3px',
          }}
        >
          {domaine}
        </div>

        {/* Année - très grande */}
        <div
          style={{
            fontSize: '140px',
            fontWeight: '100',
            color: colors.accent,
            textAlign: 'center',
            marginBottom: '80px',
            letterSpacing: '12px',
          }}
        >
          {annee}
        </div>

        {/* Ligne du bas */}
        <div
          style={{
            width: '400px',
            height: '1px',
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

// Design 3: Minimalist Bold
function designMinimalistBold(nom: string, domaine: string, annee: string, colors: ColorScheme) {
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
        {/* Cercle décoratif */}
        <div
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            border: `3px solid ${colors.accent}`,
            marginBottom: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            color: colors.accent,
            fontWeight: '700',
          }}
        >
          {annee}
        </div>

        {/* Nom du vin - bold */}
        <div
          style={{
            fontSize: '52px',
            fontWeight: '900',
            textAlign: 'center',
            marginBottom: '20px',
            letterSpacing: '3px',
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
            marginBottom: '60px',
            opacity: 0.8,
            fontStyle: 'italic',
          }}
        >
          {domaine}
        </div>

        {/* Lignes décoratives */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '2px',
              background: colors.accent,
            }}
          />
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: colors.accent,
            }}
          />
          <div
            style={{
              width: '60px',
              height: '2px',
              background: colors.accent,
            }}
          />
        </div>
      </div>
    ),
    {
      width: 600,
      height: 800,
    }
  );
}

// Design 4: Minimalist Geometric
function designMinimalistGeometric(
  nom: string,
  domaine: string,
  annee: string,
  colors: ColorScheme
) {
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
        {/* Formes géométriques */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '60px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              background: colors.accent,
              transform: 'rotate(45deg)',
            }}
          />
          <div
            style={{
              width: '40px',
              height: '40px',
              background: colors.accent,
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              width: '40px',
              height: '40px',
              background: colors.accent,
            }}
          />
        </div>

        {/* Nom du vin */}
        <div
          style={{
            fontSize: '48px',
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
            marginBottom: '40px',
            opacity: 0.8,
            fontStyle: 'italic',
          }}
        >
          {domaine}
        </div>

        {/* Année dans un carré */}
        <div
          style={{
            display: 'flex',
            width: '120px',
            height: '120px',
            background: colors.accent,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            fontWeight: '700',
            color: colors.bg1,
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

// Design 5: Minimalist Serif
function designMinimalistSerif(nom: string, domaine: string, annee: string, colors: ColorScheme) {
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
        {/* Ornement serif */}
        <div
          style={{
            fontSize: '40px',
            color: colors.accent,
            marginBottom: '40px',
          }}
        >
          ❦
        </div>

        {/* Nom du vin */}
        <div
          style={{
            fontSize: '44px',
            fontWeight: '400',
            textAlign: 'center',
            marginBottom: '20px',
            letterSpacing: '1px',
            fontStyle: 'italic',
          }}
        >
          {nom}
        </div>

        {/* Domaine */}
        <div
          style={{
            fontSize: '20px',
            textAlign: 'center',
            marginBottom: '60px',
            opacity: 0.8,
            letterSpacing: '2px',
          }}
        >
          {domaine}
        </div>

        {/* Année */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: '300',
            color: colors.accent,
            textAlign: 'center',
            marginBottom: '40px',
            fontStyle: 'italic',
          }}
        >
          {annee}
        </div>

        {/* Ornement serif */}
        <div
          style={{
            fontSize: '40px',
            color: colors.accent,
          }}
        >
          ❦
        </div>
      </div>
    ),
    {
      width: 600,
      height: 800,
    }
  );
}

// ===== INSPIRÉS DU DESIGN #4 (Vintage) =====

// Design 6: Vintage Classic
function designVintageClassic(nom: string, domaine: string, annee: string) {
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

// Design 7: Vintage Elegant
function designVintageElegant(nom: string, domaine: string, annee: string) {
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

// Design 8: Vintage Rustic
function designVintageRustic(nom: string, domaine: string, annee: string) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: '#8B4513',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '50px',
        }}
      >
        {/* Fond rustique */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: '#DEB887',
            border: '8px solid #654321',
            borderRadius: '4px',
            padding: '40px 30px',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            boxShadow: 'inset 0 0 30px rgba(101, 67, 33, 0.3)',
          }}
        >
          {/* Ornement rustique */}
          <div
            style={{
              fontSize: '50px',
              color: '#654321',
              marginBottom: '20px',
            }}
          >
            ⚔
          </div>

          {/* "Depuis" */}
          <div
            style={{
              fontSize: '16px',
              color: '#654321',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            Depuis
          </div>

          {/* Année */}
          <div
            style={{
              fontSize: '60px',
              fontWeight: '900',
              color: '#8B4513',
              marginBottom: '30px',
              fontFamily: 'serif',
            }}
          >
            {annee}
          </div>

          {/* Ligne rustique */}
          <div
            style={{
              width: '180px',
              height: '2px',
              background: '#654321',
              marginBottom: '30px',
            }}
          />

          {/* Nom du vin */}
          <div
            style={{
              fontSize: '40px',
              fontWeight: '800',
              textAlign: 'center',
              color: '#2F1B14',
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
              color: '#654321',
              fontStyle: 'italic',
              marginBottom: '30px',
            }}
          >
            {domaine}
          </div>

          {/* Ornement rustique */}
          <div
            style={{
              fontSize: '50px',
              color: '#654321',
            }}
          >
            ⚔
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

// Design 9: Vintage Ornate
function designVintageOrnate(nom: string, domaine: string, annee: string) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: '#1A1A1A',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        {/* Fond orné */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: '#FFF8DC',
            border: '10px solid #DAA520',
            borderRadius: '20px',
            padding: '50px 40px',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            boxShadow: 'inset 0 0 50px rgba(218, 165, 32, 0.2)',
          }}
        >
          {/* Ornements du haut */}
          <div
            style={{
              fontSize: '30px',
              color: '#DAA520',
              marginBottom: '20px',
            }}
          >
            ✦ ✧ ✦ ✧ ✦
          </div>

          {/* "Millésime" */}
          <div
            style={{
              fontSize: '16px',
              color: '#8B4513',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '3px',
            }}
          >
            Millésime
          </div>

          {/* Année ornée */}
          <div
            style={{
              fontSize: '56px',
              fontWeight: '900',
              color: '#8B4513',
              marginBottom: '30px',
              fontFamily: 'serif',
            }}
          >
            {annee}
          </div>

          {/* Séparateur orné */}
          <div
            style={{
              width: '200px',
              height: '3px',
              background: '#DAA520',
              marginBottom: '30px',
            }}
          />

          {/* Nom du vin */}
          <div
            style={{
              fontSize: '42px',
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
              fontSize: '24px',
              textAlign: 'center',
              color: '#5D4E37',
              fontStyle: 'italic',
              marginBottom: '30px',
            }}
          >
            {domaine}
          </div>

          {/* Ornements du bas */}
          <div
            style={{
              fontSize: '30px',
              color: '#DAA520',
            }}
          >
            ✦ ✧ ✦ ✧ ✦
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

// Design 10: Vintage Noble
function designVintageNoble(nom: string, domaine: string, annee: string) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: '#000000',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        {/* Fond noble */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: '#F5F5DC',
            border: '8px solid #B8860B',
            borderRadius: '12px',
            padding: '50px 40px',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            boxShadow: 'inset 0 0 40px rgba(184, 134, 11, 0.1)',
          }}
        >
          {/* Couronne */}
          <div
            style={{
              fontSize: '60px',
              color: '#B8860B',
              marginBottom: '30px',
            }}
          >
            ♔
          </div>

          {/* "Noble" */}
          <div
            style={{
              fontSize: '18px',
              color: '#B8860B',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '4px',
            }}
          >
            Noble
          </div>

          {/* Année */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: '900',
              color: '#8B4513',
              marginBottom: '40px',
              fontFamily: 'serif',
            }}
          >
            {annee}
          </div>

          {/* Séparateur noble */}
          <div
            style={{
              width: '220px',
              height: '2px',
              background: '#B8860B',
              marginBottom: '30px',
            }}
          />

          {/* Nom du vin */}
          <div
            style={{
              fontSize: '46px',
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

          {/* Couronne */}
          <div
            style={{
              fontSize: '60px',
              color: '#B8860B',
            }}
          >
            ♔
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

// ===== DESIGNS COMPLÈTEMENT DIFFÉRENTS =====

// Design 11: Artistic
function designArtistic(nom: string, domaine: string, annee: string, colors: ColorScheme) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at 30% 20%, ${colors.accent}20, ${colors.bg1} 50%)`,
          color: colors.text,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 60px',
        }}
      >
        {/* Forme artistique */}
        <div
          style={{
            display: 'flex',
            width: '300px',
            height: '300px',
            borderRadius: '50% 20% 50% 20%',
            background: `linear-gradient(45deg, ${colors.accent}40, ${colors.accent}10)`,
            marginBottom: '40px',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            fontWeight: '700',
            color: colors.accent,
            transform: 'rotate(-15deg)',
          }}
        >
          {annee}
        </div>

        {/* Nom du vin - artistique */}
        <div
          style={{
            fontSize: '44px',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '20px',
            letterSpacing: '1px',
            transform: 'rotate(2deg)',
          }}
        >
          {nom}
        </div>

        {/* Domaine */}
        <div
          style={{
            fontSize: '22px',
            textAlign: 'center',
            marginBottom: '40px',
            opacity: 0.8,
            fontStyle: 'italic',
            transform: 'rotate(-1deg)',
          }}
        >
          {domaine}
        </div>

        {/* Éléments décoratifs */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              background: colors.accent,
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              width: '30px',
              height: '3px',
              background: colors.accent,
            }}
          />
          <div
            style={{
              width: '20px',
              height: '20px',
              background: colors.accent,
              transform: 'rotate(45deg)',
            }}
          />
        </div>
      </div>
    ),
    {
      width: 600,
      height: 800,
    }
  );
}

// Design 12: Modern
function designModern(nom: string, domaine: string, annee: string, colors: ColorScheme) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${colors.bg1} 0%, ${colors.bg2} 50%, ${colors.accent}20 100%)`,
          color: colors.text,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Forme moderne en arrière-plan */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '40px',
            width: '200px',
            height: '200px',
            background: colors.accent,
            borderRadius: '20px',
            transform: 'rotate(45deg)',
            opacity: 0.1,
          }}
        />

        {/* Année en très gros en arrière-plan */}
        <div
          style={{
            position: 'absolute',
            top: '100px',
            left: '40px',
            fontSize: '200px',
            fontWeight: '900',
            color: colors.accent,
            opacity: 0.05,
            transform: 'rotate(-15deg)',
          }}
        >
          {annee}
        </div>

        {/* Contenu principal */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            zIndex: 10,
            maxWidth: '400px',
          }}
        >
          {/* Nom du vin */}
          <div
            style={{
              fontSize: '52px',
              fontWeight: '800',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '-1px',
              lineHeight: 1.1,
            }}
          >
            {nom}
          </div>

          {/* Domaine */}
          <div
            style={{
              fontSize: '28px',
              fontWeight: '300',
              marginBottom: '30px',
              opacity: 0.9,
            }}
          >
            {domaine}
          </div>

          {/* Année avec barre colorée */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div
              style={{
                width: '100px',
                height: '4px',
                background: colors.accent,
              }}
            />
            <div
              style={{
                fontSize: '48px',
                fontWeight: '700',
                color: colors.accent,
              }}
            >
              {annee}
            </div>
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

// Design 13: Luxury
function designLuxury(nom: string, domaine: string, annee: string) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: '#000000',
          color: '#FFFFFF',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 80px',
        }}
      >
        {/* Ligne verticale gauche */}
        <div
          style={{
            position: 'absolute',
            left: '120px',
            top: '0',
            width: '2px',
            height: '100%',
            background: '#D4AF37',
            opacity: 0.3,
          }}
        />

        {/* Ligne verticale droite */}
        <div
          style={{
            position: 'absolute',
            right: '120px',
            top: '0',
            width: '2px',
            height: '100%',
            background: '#D4AF37',
            opacity: 0.3,
          }}
        />

        {/* Nom du vin - ultra luxe */}
        <div
          style={{
            fontSize: '48px',
            fontWeight: '200',
            textAlign: 'center',
            marginBottom: '40px',
            letterSpacing: '8px',
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
            fontSize: '120px',
            fontWeight: '100',
            color: '#D4AF37',
            textAlign: 'center',
            letterSpacing: '16px',
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

// Design 14: Creative
function designCreative(nom: string, domaine: string, annee: string, colors: ColorScheme) {
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
        {/* Formes créatives */}
        <div
          style={{
            display: 'flex',
            gap: '15px',
            marginBottom: '50px',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              background: colors.accent,
              borderRadius: '50% 20% 50% 20%',
            }}
          />
          <div
            style={{
              width: '60px',
              height: '60px',
              background: colors.accent,
              borderRadius: '20% 50% 20% 50%',
            }}
          />
          <div
            style={{
              width: '60px',
              height: '60px',
              background: colors.accent,
              borderRadius: '50%',
            }}
          />
        </div>

        {/* Nom du vin - créatif */}
        <div
          style={{
            fontSize: '46px',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '20px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          {nom}
        </div>

        {/* Domaine */}
        <div
          style={{
            fontSize: '22px',
            textAlign: 'center',
            marginBottom: '50px',
            opacity: 0.8,
            fontStyle: 'italic',
          }}
        >
          {domaine}
        </div>

        {/* Année dans une forme créative */}
        <div
          style={{
            display: 'flex',
            width: '140px',
            height: '140px',
            background: colors.accent,
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            fontWeight: '700',
            color: colors.bg1,
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

// Design 15: Unique
function designUnique(nom: string, domaine: string, annee: string, colors: ColorScheme) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: `conic-gradient(from 45deg, ${colors.bg1}, ${colors.bg2}, ${colors.accent}20, ${colors.bg1})`,
          color: colors.text,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 60px',
        }}
      >
        {/* Forme unique */}
        <div
          style={{
            display: 'flex',
            width: '250px',
            height: '250px',
            background: colors.accent,
            borderRadius: '50% 20% 50% 20%',
            marginBottom: '40px',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            fontWeight: '700',
            color: colors.bg1,
            transform: 'rotate(15deg)',
          }}
        >
          {annee}
        </div>

        {/* Nom du vin - unique */}
        <div
          style={{
            fontSize: '48px',
            fontWeight: '500',
            textAlign: 'center',
            marginBottom: '20px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            transform: 'rotate(-2deg)',
          }}
        >
          {nom}
        </div>

        {/* Domaine */}
        <div
          style={{
            fontSize: '24px',
            textAlign: 'center',
            marginBottom: '40px',
            opacity: 0.9,
            fontStyle: 'italic',
            transform: 'rotate(1deg)',
          }}
        >
          {domaine}
        </div>

        {/* Éléments décoratifs uniques */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              background: colors.accent,
              borderRadius: '50% 20% 50% 20%',
              transform: 'rotate(45deg)',
            }}
          />
          <div
            style={{
              width: '60px',
              height: '3px',
              background: colors.accent,
            }}
          />
          <div
            style={{
              width: '40px',
              height: '40px',
              background: colors.accent,
              borderRadius: '20% 50% 20% 50%',
              transform: 'rotate(-45deg)',
            }}
          />
        </div>
      </div>
    ),
    {
      width: 600,
      height: 800,
    }
  );
}
