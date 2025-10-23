/**
 * ReservationsTableWithBulk - Wrapper qui ajoute les actions en masse
 *
 * 🎯 AJOUTE :
 * - BulkActions pour actions groupées
 * - Checkboxes dans le tableau pour sélection individuelle
 */

'use client';

import { useState } from 'react';
import ReservationsTableClient from './ReservationsTableClient';
import BulkActions from './BulkActions';

export default function ReservationsTableWithBulk() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleRefresh() {
    setRefreshKey((k) => k + 1);
    setSelectedIds([]); // Réinitialiser la sélection après refresh
    // Déclencher le rafraîchissement du tableau
    window.dispatchEvent(new Event('dashboard:refresh'));
  }

  return (
    <>
      <BulkActions
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        totalItems={0}
        onRefresh={handleRefresh}
      />
      <ReservationsTableClient
        key={refreshKey}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
      />
    </>
  );
}
