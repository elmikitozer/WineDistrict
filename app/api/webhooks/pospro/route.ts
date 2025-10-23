/**
 * Webhook POS Pro pour recevoir les updates en temps réel
 *
 * POST /api/webhooks/pospro
 *
 * POS Pro envoie des webhooks lors de changements (ventes, ajustements stock, etc.)
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { syncPOSProStock } from '@/lib/integrations/pospro-sync';

// Type des événements POS Pro (à adapter selon leur documentation)
interface POSProWebhookEvent {
  event: string; // 'sale.completed', 'inventory.updated', etc.
  store_id: string;
  timestamp: string;
  data: {
    product_id?: string;
    sale_id?: string;
    quantity_change?: number;
    // ... autres champs selon le type d'événement
  };
}

/**
 * Vérifier la signature du webhook (sécurité)
 */
function verifyWebhookSignature(
  payload: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature) return false;

  // TODO: Implémenter la vérification selon la doc POS Pro
  console.warn('Webhook signature verification not implemented yet');
  return true; // En dev, accepter tous les webhooks
}

export async function POST(req: NextRequest) {
  try {
    // 1. Récupérer la signature du webhook
    const signature = req.headers.get('x-pospro-signature');
    const webhookSecret = process.env.POSPRO_WEBHOOK_SECRET || '';

    // 2. Lire le payload
    const rawPayload = await req.text();

    // 3. Vérifier la signature
    if (!verifyWebhookSignature(rawPayload, signature, webhookSecret)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event: POSProWebhookEvent = JSON.parse(rawPayload);

    // 4. Traiter selon le type d'événement
    switch (event.event) {
      case 'sale.completed':
        // Une vente a été effectuée → Mettre à jour le stock
        await handleSaleCompleted(event);
        break;

      case 'inventory.updated':
        // Le stock a été ajusté manuellement → Re-synchroniser
        await handleInventoryUpdated(event);
        break;

      default:
        console.log(`Event type not handled: ${event.event}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing POS Pro webhook:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Webhook processing error' },
      { status: 500 }
    );
  }
}

/**
 * Gérer l'événement "sale.completed"
 * Décrémente le stock lors d'une vente
 */
async function handleSaleCompleted(event: POSProWebhookEvent) {
  const storeId = event.store_id;

  // Trouver le caviste associé à ce magasin
  const integration = await prisma.integrationConnection.findFirst({
    where: {
      provider: 'pospro',
      merchantId: storeId,
    },
  });

  if (!integration) {
    console.warn(`No integration found for store ${storeId}`);
    return;
  }

  // Re-synchroniser tout le stock pour ce caviste
  await syncPOSProStock(
    integration.cavisteId,
    integration.accessToken,
    storeId
  );
}

/**
 * Gérer l'événement "inventory.updated"
 * Re-synchronise le stock
 */
async function handleInventoryUpdated(event: POSProWebhookEvent) {
  const storeId = event.store_id;
  const productId = event.data.product_id;

  if (!productId) {
    console.warn('No product_id in inventory.updated event');
    return;
  }

  // Trouver le caviste associé
  const integration = await prisma.integrationConnection.findFirst({
    where: {
      provider: 'pospro',
      merchantId: storeId,
    },
  });

  if (!integration) {
    console.warn(`No integration found for store ${storeId}`);
    return;
  }

  // Re-synchroniser
  await syncPOSProStock(
    integration.cavisteId,
    integration.accessToken,
    storeId
  );
}

