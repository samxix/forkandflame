import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DELIVERY_FEE, FREE_DELIVERY_FROM } from '../data/menu';

const CartContext = createContext(null);
const STORAGE_KEY = 'fork-and-flame-cart-v1';

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage may be unavailable (private mode) — cart still works in-memory.
    }
  }, [items]);

  const addItem = (product) =>
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 }];
    });

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const setQty = (id, qty) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    );

  const clearCart = () => setItems([]);

  const { subtotal, deliveryFee, total, count } = useMemo(() => {
    const sub = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const fee = sub === 0 ? 0 : sub >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
    return {
      subtotal: sub,
      deliveryFee: fee,
      total: sub + fee,
      count: items.reduce((sum, i) => sum + i.qty, 0),
    };
  }, [items]);

  const value = {
    items,
    addItem,
    removeItem,
    setQty,
    clearCart,
    subtotal,
    deliveryFee,
    total,
    count,
    isCartOpen,
    setCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
