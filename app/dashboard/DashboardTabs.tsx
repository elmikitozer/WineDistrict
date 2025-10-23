/**
 * DashboardTabs - Système d'onglets pour le dashboard caviste
 *
 * 🎯 ONGLETS :
 * - Réservations : Tableau + filtres + actions
 * - Statistiques : Graphiques uniquement
 */

'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import DashboardCharts from './DashboardCharts';
import StatsCardsClient from './StatsCardsClient';
import Toolbar from './Toolbar';
import AdvancedFilters from './AdvancedFilters';
import ReservationsTableWithBulk from './ReservationsTableWithBulk';

type Tab = 'reservations' | 'stats';

interface DashboardTabsProps {
  cavisteId: number;
  activeStatus: string;
  qParam: string;
}

export default function DashboardTabs({ cavisteId, activeStatus, qParam }: DashboardTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabFromUrl = (searchParams.get('tab') || 'reservations') as Tab;
  const [activeTab, setActiveTab] = useState<Tab>(tabFromUrl);

  function switchTab(tab: Tab) {
    setActiveTab(tab);
    const sp = new URLSearchParams(searchParams);
    sp.set('tab', tab);
    router.push(`/dashboard?${sp.toString()}`);
  }

  return (
    <div className="space-y-6">
      {/* BARRE D'ONGLETS */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => switchTab('reservations')}
          className={`px-6 py-3 font-medium transition relative ${
            activeTab === 'reservations'
              ? 'text-rose-600 border-b-2 border-rose-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📋 Réservations
        </button>
        <button
          onClick={() => switchTab('stats')}
          className={`px-6 py-3 font-medium transition relative ${
            activeTab === 'stats'
              ? 'text-rose-600 border-b-2 border-rose-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📊 Statistiques
        </button>
      </div>

      {/* CONTENU DES ONGLETS */}
      {activeTab === 'reservations' ? (
        // ONGLET RÉSERVATIONS
        <div className="space-y-4">
          <StatsCardsClient cavisteId={cavisteId} activeStatus={activeStatus} q={qParam} />
          <Toolbar />

          {/* 🔍 FILTRES AVANCÉS */}
          <AdvancedFilters />

          <div className="border rounded-xl overflow-hidden">
            <ReservationsTableWithBulk key={`${activeStatus}|${qParam}`} />
          </div>
        </div>
      ) : (
        // ONGLET STATISTIQUES
        <div className="space-y-6">
          <DashboardCharts cavisteId={cavisteId} />
        </div>
      )}
    </div>
  );
}
