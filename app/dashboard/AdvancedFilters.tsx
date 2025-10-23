/**
 * AdvancedFilters - Filtres avancés pour le dashboard
 *
 * 🎯 FILTRES :
 * 1. Plage de dates (du ... au ...)
 * 2. Filtre par vin
 * 3. Filtre par client (nom, email)
 *
 * Ces filtres s'ajoutent aux filtres existants (statut, recherche)
 */

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface AdvancedFiltersProps {
  vins?: Array<{ id: number; nom: string; domaine: string }>;
}

export default function AdvancedFilters({ vins = [] }: AdvancedFiltersProps) {
  const router = useRouter();
  const params = useSearchParams();

  // États locaux pour les filtres
  const [dateFrom, setDateFrom] = useState(params.get('dateFrom') || '');
  const [dateTo, setDateTo] = useState(params.get('dateTo') || '');
  const [vinId, setVinId] = useState(params.get('vinId') || '');
  const [clientSearch, setClientSearch] = useState(params.get('clientSearch') || '');

  // État pour afficher/masquer les filtres avancés
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Appliquer les filtres
  function applyFilters() {
    const sp = new URLSearchParams(params);

    // Garder les filtres existants (status, q, sortOrder, page)
    if (dateFrom) sp.set('dateFrom', dateFrom);
    else sp.delete('dateFrom');

    if (dateTo) sp.set('dateTo', dateTo);
    else sp.delete('dateTo');

    if (vinId) sp.set('vinId', vinId);
    else sp.delete('vinId');

    if (clientSearch) sp.set('clientSearch', clientSearch);
    else sp.delete('clientSearch');

    // Réinitialiser la page à 1
    sp.delete('page');

    router.push(`/dashboard?${sp.toString()}`);
  }

  // Réinitialiser les filtres avancés
  function resetAdvancedFilters() {
    setDateFrom('');
    setDateTo('');
    setVinId('');
    setClientSearch('');

    const sp = new URLSearchParams(params);
    sp.delete('dateFrom');
    sp.delete('dateTo');
    sp.delete('vinId');
    sp.delete('clientSearch');
    sp.delete('page');

    router.push(`/dashboard?${sp.toString()}`);
  }

  // Compter le nombre de filtres actifs
  const activeFiltersCount = [dateFrom, dateTo, vinId, clientSearch].filter(Boolean).length;

  return (
    <div className="bg-white border rounded-lg p-4 mb-4">
      {/* Bouton pour afficher/masquer */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">🔍 Filtres avancés</span>
          {activeFiltersCount > 0 && (
            <span className="bg-rose-600 text-white text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <span className="text-gray-400">{showAdvanced ? '▲' : '▼'}</span>
      </button>

      {/* Filtres détaillés */}
      {showAdvanced && (
        <div className="mt-4 space-y-4">
          {/* Plage de dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                📅 Date de début
              </label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">📅 Date de fin</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>
          </div>

          {/* Filtre par vin */}
          {vins.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                🍷 Filtrer par vin
              </label>
              <select
                value={vinId}
                onChange={(e) => setVinId(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
              >
                <option value="">Tous les vins</option>
                {vins.map((vin) => (
                  <option key={vin.id} value={vin.id}>
                    {vin.nom} ({vin.domaine})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Filtre par client */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              👤 Recherche client (nom, email)
            </label>
            <input
              type="text"
              value={clientSearch}
              onChange={(e) => setClientSearch(e.target.value)}
              placeholder="Ex: Dupont, jean@example.com"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={applyFilters}
              className="flex-1 bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition font-medium"
            >
              Appliquer les filtres
            </button>
            <button
              onClick={resetAdvancedFilters}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
