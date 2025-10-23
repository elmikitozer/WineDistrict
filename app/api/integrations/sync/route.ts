/**
 * API Route pour synchroniser le stock depuis les intégrations externes
 *
 * POST /api/integrations/sync
 * Body: { cavisteId: number, provider: 'sumup' | 'pospro' }
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { syncSumUpStock } from '@/lib/integrations/sumup-sync';
import { syncPOSProStock } from '@/lib/integrations/pospro-sync';

export async function POST(req: NextRequest) {
  try {
    // 1. Vérifier l'authentification
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    // 2. Récupérer les paramètres
    const { cavisteId, provider } = await req.json();

    if (!cavisteId || typeof cavisteId !== 'number') {
      return NextResponse.json({ error: 'cavisteId invalide' }, { status: 400 });
    }

    if (!provider || !['sumup', 'pospro'].includes(provider)) {
      return NextResponse.json({ error: 'provider invalide (sumup ou pospro)' }, { status: 400 });
    }

    // 3. Vérifier que l'utilisateur a accès à ce caviste
    const user = await prisma.user.findUnique({
      where: { id: String(session.userId) },
      include: { caviste: true },
    });

    if (!user || user.cavisteId !== cavisteId) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }

    // 4. Récupérer la connexion d'intégration
    const integration = await prisma.integrationConnection.findFirst({
      where: {
        cavisteId,
        provider,
      },
    });

    if (!integration) {
      return NextResponse.json(
        { error: `Aucune intégration ${provider} trouvée pour ce caviste` },
        { status: 404 }
      );
    }

    // 5. Vérifier que le token n'est pas expiré
    if (integration.expiresAt && integration.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Token expiré, reconnexion requise' }, { status: 401 });
    }

    // 6. Synchroniser selon le provider
    let result;
    if (provider === 'sumup') {
      result = await syncSumUpStock(
        cavisteId,
        integration.accessToken,
        integration.merchantId || ''
      );
    } else if (provider === 'pospro') {
      // Pour POS Pro, on utilise merchantId comme storeId
      result = await syncPOSProStock(
        cavisteId,
        integration.accessToken,
        integration.merchantId || ''
      );
    } else {
      return NextResponse.json({ error: 'Provider non supporté' }, { status: 400 });
    }

    // 7. Mettre à jour la date de dernière sync
    await prisma.integrationConnection.update({
      where: { id: integration.id },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json({
      success: result.success,
      productsUpdated: result.productsUpdated,
      errors: result.errors,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in sync route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur serveur' },
      { status: 500 }
    );
  }
}

