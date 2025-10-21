'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  vinId: number;
  cavisteId: number;
  vinNom: string;
  vinDomaine: string;
  vinAnnee: number;
  cavisteNom: string;
  cavisteAdresse: string;
  cavisteSlug?: string | null;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (vinId: number, cavisteId: number) => void;
  clearCart: () => void;
  itemCount: number;
  isInCart: (vinId: number, cavisteId: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Charger le panier depuis localStorage au montage
  useEffect(() => {
    const saved = localStorage.getItem('wine-cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Erreur chargement panier:', e);
      }
    }
    setMounted(true);
  }, []);

  // Sauvegarder le panier dans localStorage à chaque changement
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('wine-cart', JSON.stringify(items));
    }
  }, [items, mounted]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      // Vérifier si l'item existe déjà
      const exists = prev.some((i) => i.vinId === item.vinId && i.cavisteId === item.cavisteId);
      if (exists) return prev;
      return [...prev, item];
    });
  };

  const removeItem = (vinId: number, cavisteId: number) => {
    setItems((prev) => prev.filter((i) => !(i.vinId === vinId && i.cavisteId === cavisteId)));
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (vinId: number, cavisteId: number) => {
    return items.some((i) => i.vinId === vinId && i.cavisteId === cavisteId);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        itemCount: items.length,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
