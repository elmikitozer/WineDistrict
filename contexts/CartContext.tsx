'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  vinId: number;
  cavisteId: number;
  vinNom: string;
  vinDomaine: string;
  vinAnnee: number;
  vinCouleur: string;
  cavisteNom: string;
  cavisteAdresse: string;
  cavisteSlug?: string | null;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  addItem: (item: CartItem) => void;
  removeItem: (vinId: number, cavisteId: number) => void;
  updateQuantity: (vinId: number, cavisteId: number, quantity: number) => void;
  clearCart: () => void;
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
      const existingIndex = prev.findIndex(
        (i) => i.vinId === item.vinId && i.cavisteId === item.cavisteId
      );

      if (existingIndex >= 0) {
        // Si l'item existe, on augmente la quantité
        const newItems = [...prev];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + item.quantity,
        };
        return newItems;
      }

      // Sinon on ajoute le nouvel item
      return [...prev, item];
    });
  };

  const removeItem = (vinId: number, cavisteId: number) => {
    setItems((prev) => prev.filter((i) => !(i.vinId === vinId && i.cavisteId === cavisteId)));
  };

  const updateQuantity = (vinId: number, cavisteId: number, quantity: number) => {
    setItems((prev) =>
      prev.map((i) => (i.vinId === vinId && i.cavisteId === cavisteId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount: items.length,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
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
