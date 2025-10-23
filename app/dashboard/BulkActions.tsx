/**
 * BulkActions - Actions en masse sur les réservations
 *
 * 🎯 PERMET :
 * 1. Sélection multiple de réservations
 * 2. Confirmation en masse
 * 3. Annulation en masse
 * 4. Export des sélectionnées
 */

'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmModal from '@/components/ConfirmModal';

interface BulkActionsProps {
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  totalItems: number;
  onRefresh: () => void;
}

export default function BulkActions({
  selectedIds,
  onSelectionChange,
  totalItems,
  onRefresh,
}: BulkActionsProps) {
  const [loading, setLoading] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    confirmColor: 'green' | 'red';
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    confirmText: '',
    confirmColor: 'green',
    onConfirm: () => {},
  });

  // Tout sélectionner / tout désélectionner
  function toggleSelectAll(allIds: string[]) {
    if (selectedIds.length === allIds.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(allIds);
    }
  }

  // Action en masse : Confirmer
  function promptConfirmSelected() {
    if (selectedIds.length === 0) return;

    setModalConfig({
      isOpen: true,
      title: 'Confirmer les réservations',
      message: `Êtes-vous sûr de vouloir confirmer ${selectedIds.length} réservation(s) ?`,
      confirmText: 'Confirmer',
      confirmColor: 'green',
      onConfirm: async () => {
        setLoading(true);
        try {
          const res = await fetch('/api/dashboard/bulk-actions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'confirm',
              reservationIds: selectedIds,
            }),
          });

          if (!res.ok) throw new Error('Erreur serveur');

          const data = await res.json();
          toast.success(`${data.updated} réservation(s) confirmée(s) !`);
          onSelectionChange([]);
          onRefresh();
        } catch (error) {
          console.error(error);
          toast.error('Erreur lors de la confirmation');
        } finally {
          setLoading(false);
        }
      },
    });
  }

  // Action en masse : Annuler
  function promptCancelSelected() {
    if (selectedIds.length === 0) return;

    setModalConfig({
      isOpen: true,
      title: 'Annuler les réservations',
      message: `Êtes-vous sûr de vouloir annuler ${selectedIds.length} réservation(s) ?`,
      confirmText: 'Oui, annuler',
      confirmColor: 'red',
      onConfirm: async () => {
        setLoading(true);
        try {
          const res = await fetch('/api/dashboard/bulk-actions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'cancel',
              reservationIds: selectedIds,
            }),
          });

          if (!res.ok) throw new Error('Erreur serveur');

          const data = await res.json();
          toast.success(`${data.updated} réservation(s) annulée(s) !`);
          onSelectionChange([]);
          onRefresh();
        } catch (error) {
          console.error(error);
          toast.error("Erreur lors de l'annulation");
        } finally {
          setLoading(false);
        }
      },
    });
  }

  // Export CSV des sélectionnées
  async function exportSelected() {
    if (selectedIds.length === 0) return;

    try {
      const params = new URLSearchParams();
      selectedIds.forEach((id) => params.append('ids', id));

      const res = await fetch(`/api/dashboard/reservations/export?${params.toString()}`);
      if (!res.ok) throw new Error('Erreur export');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reservations-selection-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success('Export réussi !');
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'export");
    }
  }

  if (selectedIds.length === 0) return null;

  return (
    <>
      <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-medium text-rose-900">
              ✓ {selectedIds.length} sélectionnée(s)
            </span>
            <button
              onClick={() => onSelectionChange([])}
              className="text-sm text-rose-600 hover:text-rose-800 underline"
            >
              Tout désélectionner
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={promptConfirmSelected}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium text-sm disabled:opacity-50"
            >
              ✓ Confirmer tout
            </button>
            <button
              onClick={promptCancelSelected}
              disabled={loading}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition font-medium text-sm disabled:opacity-50"
            >
              ✗ Annuler tout
            </button>
            <button
              onClick={exportSelected}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm disabled:opacity-50"
            >
              📥 Exporter sélection
            </button>
          </div>
        </div>
      </div>

      {/* Modal de confirmation */}
      <ConfirmModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        confirmColor={modalConfig.confirmColor}
        onConfirm={modalConfig.onConfirm}
        onCancel={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />
    </>
  );
}
