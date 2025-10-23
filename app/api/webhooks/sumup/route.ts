/**
 * Webhook SumUp pour recevoir les updates en temps réel
 * 
 * POST /api/webhooks/sumup
 * 
 * SumUp envoie des webhooks lors de changements (ventes, ajustements stock, etc.)
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { syncSumUpStock } from '@/lib/integrations/sumup-sync';

// Type des événements SumUp (à adapter selon leur documentation)
interface SumUpWebhookEvent {
  event_type: string; // 'transaction.created', 'product.updated', etc.
  merchant_code: string;
  timestamp: string;
  data: {
    product_id?: string;
    transaction_id?: string;
    amount?: number;
    // ... autres champs selon le type d'événement
  };
}

/**
 * Vérifier la signature du webhook (sécurité)
 * 
 * SumUp signe ses webhooks pour garantir leur authenticité
 */
function verifyWebhookSignature(
  payload: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature) return false;
  
  // TODO: Implémenter la vérification selon la doc SumUp
  // Exemple: HMAC-SHA256
  // const crypto = require('crypto');
  // const computedSignature = crypto
  //   .createHmac('sha256', secret)
  //   .update(payload)
  //   .digest('hex');
  // return computedSignature === signature;
  
  console.warn('Webhook signature verification not implemented yet');
  return true; // En dev, accepter tous les webhooks
}

export async function POST(req: NextRequest) {
  try {
    // 1. Récupérer la signature du webhook
    const signature = req.headers.get('x-sumup-signature');
    const webhookSecret = process.env.SUMUP_WEBHOOK_SECRET || '';

    // 2. Lire le payload
    const rawPayload = await req.text();
    
    // 3. Vérifier la signature
    if (!verifyWebhookSignature(rawPayload, signature, webhookSecret)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event: SumUpWebhookEvent = JSON.parse(rawPayload);

    // 4. Traiter selon le type d'événement
    switch (event.event_type) {
      case 'transaction.created':
        // Une vente a été effectuée → Mettre à jour le stock
        await handleTransactionCreated(event);
        break;

      case 'product.updated':
        // Un produit a été modifié → Re-synchroniser
        await handleProductUpdated(event);
        break;

      default:
        console.log(`Event type not handled: ${event.event_type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing SumUp webhook:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Webhook processing error' },
      { status: 500 }
    );
  }
}

/**
 * Gérer l'événement "transaction.created"
 * Décrémente le stock lors d'une vente
 */
async function handleTransactionCreated(event: SumUpWebhookEvent) {
  const merchantCode = event.merchant_code;
  
  // Trouver le caviste associé à ce merchant
  const integration = await prisma.integrationConnection.findFirst({
    where: {
      provider: 'sumup',
      merchantId: merchantCode,
    },
  });

  if (!integration) {
    console.warn(`No integration found for merchant ${merchantCode}`);
    return;
  }

  // Re-synchroniser tout le stock pour ce caviste
  // (Alternative: parser la transaction pour décrémenter seulement les produits vendus)
  await syncSumUpStock(
    integration.cavisteId,
    integration.accessToken,
    merchantCode
  );
}

/**
 * Gérer l'événement "product.updated"
 * Re-synchronise le produit spécifique
 */
async function handleProductUpdated(event: SumUpWebhookEvent) {
  const merchantCode = event.merchant_code;
  const productId = event.data.product_id;

  if (!productId) {
    console.warn('No product_id in product.updated event');
    return;
  }

  // Trouver le caviste associé
  const integration = await prisma.integrationConnection.findFirst({
    where: {
      provider: 'sumup',
      merchantId: merchantCode,
    },
  });

  if (!integration) {
    console.warn(`No integration found for merchant ${merchantCode}`);
    return;
  }

  // Re-synchroniser (dans une vraie implémentation, on pourrait optimiser
  // en synchronisant seulement ce produit spécifique)
  await syncSumUpStock(
    integration.cavisteId,
    integration.accessToken,
    merchantCode
  );
}

