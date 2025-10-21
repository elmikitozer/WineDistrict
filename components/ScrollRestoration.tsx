'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // Ne pas gérer le scroll sur la page d'accueil
    if (pathname === '/') {
      return;
    }

    // Créer une clé unique pour cette page
    const scrollKey = `scroll-${pathname}`;
    
    // Restaurer la position sauvegardée pour cette page
    const savedPosition = sessionStorage.getItem(scrollKey);
    if (savedPosition && window.history.state?.scroll !== false) {
      // Petit délai pour laisser la page se charger
      const timeoutId = setTimeout(() => {
        window.scrollTo(0, parseInt(savedPosition));
      }, 50);
      return () => clearTimeout(timeoutId);
    }

    // Sauvegarder la position actuelle avant de quitter
    const handleBeforeUnload = () => {
      sessionStorage.setItem(scrollKey, window.scrollY.toString());
    };

    // Sauvegarder aussi lors des navigations internes
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.href && link.href.startsWith(window.location.origin)) {
        sessionStorage.setItem(scrollKey, window.scrollY.toString());
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleClick);
    };
  }, [pathname]);

  return null;
}
