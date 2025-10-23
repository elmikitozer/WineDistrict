/**
 * StatsCardsClient - Version client des cartes statistiques
 *
 * 🎯 Charge les données via API (contrairement à StatsCards qui est Server Component)
 */

'use client';

import { useEffect, useState } from 'react';
import StatsCardLinkClient from './StatsCardLinkClient';

interface StatsCardsClientProps {
  cavisteId: number;
  activeStatus?: '' | 'en_attente' | 'confirmee' | 'annulee';
  q?: string;
}

export default function StatsCardsClient({ cavisteId, activeStatus, q }: StatsCardsClientProps) {
  const [stats, setStats] = useState({
    total: 0,
    enAttente: 0,
    confirmee: 0,
    annulee: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const res = await fetch(`/api/dashboard/count-stats?cavisteId=${cavisteId}`);
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Erreur chargement stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();

    // 🔄 Écouter l'événement de refresh depuis les actions en masse
    const handleRefresh = () => fetchStats();
    window.addEventListener('dashboard:refresh', handleRefresh);

    return () => {
      window.removeEventListener('dashboard:refresh', handleRefresh);
    };
  }, [cavisteId]);

  const cards: Array<{
    key: 'en_attente' | 'confirmee' | 'annulee' | 'total';
    title: string;
    value: number;
  }> = [
    { key: 'total', title: 'Total', value: stats.total },
    { key: 'en_attente', title: 'En attente', value: stats.enAttente },
    { key: 'confirmee', title: 'Confirmées', value: stats.confirmee },
    { key: 'annulee', title: 'Annulées', value: stats.annulee },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border rounded-lg p-4 h-24 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => {
        const isActive =
          (c.key === 'total' && !activeStatus) || (c.key !== 'total' && activeStatus === c.key);
        // Build URL with explicit status handling and q preservation
        const sp = new URLSearchParams();
        if (c.key !== 'total') sp.set('status', String(c.key));
        if (q && q.trim()) sp.set('q', q.trim());
        const href = sp.toString() ? `/dashboard?${sp.toString()}` : '/dashboard';
        return (
          <StatsCardLinkClient
            key={c.title}
            k={c.key}
            title={c.title}
            value={c.value}
            href={href}
            ssrActive={isActive}
          />
        );
      })}
    </div>
  );
}
