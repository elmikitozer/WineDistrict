/**
 * Service de synchronisation SumUp → Base de données
 * 
 * Ce service récupère les produits et le stock depuis SumUp
 * et les synchronise avec notre base de données.
 */

import { prisma } from '@/lib/prisma';

// Types SumUp (basés sur leur API)
interface SumUpProduct {
  id: string;
  name: string;
  price: number;
  category?: string;
  sku?: string;
  stock_quantity?: number;
  // Ajoutez d'autres champs selon la documentation SumUp
}

interface SumUpSyncResult {
  success: boolean;
  productsUpdated: number;
  errors: string[];
}

/**
 * Récupère les produits depuis SumUp API
 * 
 * Note: SumUp n'a pas d'API publique pour le catalogue produit.
 * Cette fonction est un squelette à adapter selon votre accès API.
 */
async function fetchSumUpProducts(
  accessToken: string,
  merchantId: string
): Promise<SumUpProduct[]> {
  // TODO: Adapter selon l'API SumUp disponible
  // Pour l'instant, retourne un tableau vide
  
  // Exemple d'appel si l'API existe :
  // const response = await fetch(`https://api.sumup.com/v1/me/products`, {
  //   headers: {
  //     'Authorization': `Bearer ${accessToken}`,
  //   },
  // });
  // 
  // if (!response.ok) {
  //   throw new Error(`SumUp API error: ${response.status}`);
  // }
  // 
  // const data = await response.json();
  // return data.products || [];

  console.warn('SumUp product API not yet implemented');
  return [];
}

/**
 * Synchronise les produits SumUp avec notre base de données
 * 
 * @param cavisteId - ID du caviste dans notre DB
 * @param accessToken - Token d'accès SumUp
 * @param merchantId - ID marchand SumUp
 */
export async function syncSumUpStock(
  cavisteId: number,
  accessToken: string,
  merchantId: string
): Promise<SumUpSyncResult> {
  const errors: string[] = [];
  let productsUpdated = 0;

  try {
    // 1. Récupérer les produits depuis SumUp
    const sumupProducts = await fetchSumUpProducts(accessToken, merchantId);

    // 2. Pour chaque produit SumUp
    for (const sumupProduct of sumupProducts) {
      try {
        // 2a. Chercher ou créer le mapping externe
        const existingMapping = await prisma.externalProductMapping.findFirst({
          where: {
            provider: 'sumup',
            cavisteId,
            externalProductId: sumupProduct.id,
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
              quantite: sumupProduct.stock_quantity || 0,
            },
            update: {
              quantite: sumupProduct.stock_quantity || 0,
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
          console.warn(`Produit SumUp non mappé: ${sumupProduct.name} (${sumupProduct.id})`);
          errors.push(`Produit non mappé: ${sumupProduct.name}`);
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Erreur inconnue';
        errors.push(`Erreur sur produit ${sumupProduct.id}: ${msg}`);
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
 * Créer un mapping manuel entre un produit SumUp et un vin de notre DB
 * 
 * À utiliser dans le dashboard caviste pour associer les produits
 */
export async function mapSumUpProductToVin(
  cavisteId: number,
  vinId: number,
  externalProductId: string,
  externalSku?: string
) {
  await prisma.externalProductMapping.upsert({
    where: {
      external_product_unique: {
        provider: 'sumup',
        cavisteId,
        externalProductId,
      },
    },
    create: {
      id: crypto.randomUUID(),
      cavisteId,
      vinId,
      provider: 'sumup',
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

