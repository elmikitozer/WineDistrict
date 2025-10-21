import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// GET: Récupérer les favoris d'un utilisateur
export async function GET() {
  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const favoris = await prisma.favorisCaviste.findMany({
      where: { userId: String(session.userId) },
      include: {
        caviste: {
          include: {
            stocks: {
              include: {
                vin: true,
              },
              take: 5, // Limiter à 5 vins pour l'aperçu
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ favoris });
  } catch (error) {
    console.error('Erreur lors de la récupération des favoris:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST: Ajouter un caviste aux favoris
export async function POST(req: Request) {
  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const { cavisteId } = await req.json();

    if (!cavisteId || typeof cavisteId !== 'number') {
      return NextResponse.json({ error: 'ID caviste invalide' }, { status: 400 });
    }

    // Vérifier que le caviste existe
    const caviste = await prisma.caviste.findUnique({
      where: { id: cavisteId },
    });

    if (!caviste) {
      return NextResponse.json({ error: 'Caviste introuvable' }, { status: 404 });
    }

    // Ajouter aux favoris (ou ignorer si déjà présent grâce à la contrainte unique)
    const favori = await prisma.favorisCaviste.upsert({
      where: {
        favoris_unique: {
          userId: String(session.userId),
          cavisteId,
        },
      },
      create: {
        id: crypto.randomUUID(),
        userId: String(session.userId),
        cavisteId,
      },
      update: {}, // Ne rien faire si déjà présent
    });

    return NextResponse.json({ success: true, favori });
  } catch (error) {
    console.error("Erreur lors de l'ajout aux favoris:", error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE: Retirer un caviste des favoris
export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const { cavisteId } = await req.json();

    if (!cavisteId || typeof cavisteId !== 'number') {
      return NextResponse.json({ error: 'ID caviste invalide' }, { status: 400 });
    }

    await prisma.favorisCaviste.deleteMany({
      where: {
        userId: String(session.userId),
        cavisteId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la suppression des favoris:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
