/**
 * NotificationBadge - Badge de notifications pour la navbar
 *
 * 🎯 AFFICHE :
 * - Nombre de nouvelles réservations en attente
 * - Badge rouge avec le nombre
 *
 * 🔄 Se rafraîchit automatiquement toutes les 30 secondes
 */

'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function NotificationBadge({ cavisteId }: { cavisteId?: number | null }) {
  const [count, setCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    if (!cavisteId) return;

    async function fetchNotifications() {
      try {
        const res = await fetch(`/api/dashboard/notifications?cavisteId=${cavisteId}`);
        if (res.ok) {
          const data = await res.json();
          setCount(data.pendingCount || 0);
        }
      } catch (error) {
        console.error('Erreur notifications:', error);
      }
    }

    // Charger au montage
    fetchNotifications();

    // Rafraîchir toutes les 30 secondes
    const interval = setInterval(fetchNotifications, 30000);

    // Rafraîchir quand on revient sur le dashboard
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchNotifications();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [cavisteId]);

  // Réinitialiser le compteur quand on est sur le dashboard
  useEffect(() => {
    if (pathname === '/dashboard') {
      setCount(0);
    }
  }, [pathname]);

  if (!cavisteId || count === 0) return null;

  return (
    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
      {count > 9 ? '9+' : count}
    </span>
  );
}
