/**
 * Service de synchronisation POS Pro → Base de données
 * 
 * Ce service récupère les produits et le stock depuis POS Pro
 * et les synchronise avec notre base de données.
 */

import { prisma } from '@/lib/prisma';

// Types POS Pro (à adapter selon leur API)
interface POSProProduct {
  id: string;
  name: string;
  price: number;
  category?: string;
  barcode?: string;
  sku?: string;
  stock_level?: number;
  // Ajoutez d'autres champs selon la documentation POS Pro
}

interface POSProSyncResult {
  success: boolean;
  productsUpdated: number;
  errors: string[];
}

/**
 * Récupère les produits depuis POS Pro API
 * 
 * @param apiKey - Clé API POS Pro
 * @param storeId - ID du magasin dans POS Pro
 */
async function fetchPOSProProducts(
  apiKey: string,
  storeId: string
): Promise<POSProProduct[]> {
  try {
    // TODO: Remplacer par l'URL réelle de l'API POS Pro
    const response = await fetch(`https://api.pospro.com/v1/stores/${storeId}/products`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`POS Pro API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.products || data.data || [];
  } catch (error) {
    console.error('Error fetching POS Pro products:', error);
    throw error;
  }
}

/**
 * Synchronise les produits POS Pro avec notre base de données
 * 
 * @param cavisteId - ID du caviste dans notre DB
 * @param apiKey - Clé API POS Pro
 * @param storeId - ID du magasin POS Pro
 */
export async function syncPOSProStock(
  cavisteId: number,
  apiKey: string,
  storeId: string
): Promise<POSProSyncResult> {
  const errors: string[] = [];
  let productsUpdated = 0;

  try {
    // 1. Récupérer les produits depuis POS Pro
    const posProProducts = await fetchPOSProProducts(apiKey, storeId);

    // 2. Pour chaque produit POS Pro
    for (const posProProduct of posProProducts) {
      try {
        // 2a. Chercher ou créer le mapping externe
        const existingMapping = await prisma.externalProductMapping.findFirst({
          where: {
            provider: 'pospro',
            cavisteId,
            externalProductId: posProProduct.id,
          },
          include: {
            vin: true,
          },
        });

        if (existingMapping) {
          // 2b. Si le mapping existe, mettre à jour le stock
          await prisma.stock.upsert({
            where: {
              stock_unique_caviste_vin: {
                cavisteId,
                vinId: existingMapping.vinId,
              },
            },
            create: {
              cavisteId,
              vinId: existingMapping.vinId,
              quantite: posProProduct.stock_level || 0,
            },
            update: {
              quantite: posProProduct.stock_level || 0,
            },
          });

          // Mettre à jour lastSeenAt
          await prisma.externalProductMapping.update({
            where: { id: existingMapping.id },
            data: { lastSeenAt: new Date() },
          });

          productsUpdated++;
        } else {
          // 2c. Produit non mappé : logger pour traitement manuel
          console.warn(`Produit POS Pro non mappé: ${posProProduct.name} (${posProProduct.id})`);
          errors.push(`Produit non mappé: ${posProProduct.name}`);
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Erreur inconnue';
        errors.push(`Erreur sur produit ${posProProduct.id}: ${msg}`);
      }
    }

    return {
      success: errors.length === 0,
      productsUpdated,
      errors,
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erreur inconnue';
    return {
      success: false,
      productsUpdated: 0,
      errors: [msg],
    };
  }
}

/**
 * Créer un mapping manuel entre un produit POS Pro et un vin de notre DB
 * 
 * À utiliser dans le dashboard caviste pour associer les produits
 */
export async function mapPOSProProductToVin(
  cavisteId: number,
  vinId: number,
  externalProductId: string,
  externalSku?: string
) {
  await prisma.externalProductMapping.upsert({
    where: {
      external_product_unique: {
        provider: 'pospro',
        cavisteId,
        externalProductId,
      },
    },
    create: {
      id: crypto.randomUUID(),
      cavisteId,
      vinId,
      provider: 'pospro',
      externalProductId,
      externalSku,
      lastSeenAt: new Date(),
    },
    update: {
      vinId,
      externalSku,
      lastSeenAt: new Date(),
    },
  });
}

/**
 * Vérifier la connexion POS Pro API
 * 
 * @param apiKey - Clé API POS Pro
 * @param storeId - ID du magasin POS Pro
 */
export async function verifyPOSProConnection(
  apiKey: string,
  storeId: string
): Promise<{ valid: boolean; error?: string }> {
  try {
    await fetchPOSProProducts(apiKey, storeId);
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Erreur de connexion',
    };
  }
}

