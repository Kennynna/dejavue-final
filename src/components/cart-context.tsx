import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Perfume } from "../lib/data"

export interface CartItem {
  perfume: Perfume
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (perfume: Perfume) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("dejavue-cart")
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch {
        setItems([])
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("dejavue-cart", JSON.stringify(items))
    }
  }, [items, mounted])

  const addToCart = (perfume: Perfume) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.perfume.id === perfume.id)
      if (existing) {
        return prev.map((item) => (item.perfume.id === perfume.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { perfume, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.perfume.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id)
      return
    }
    setItems((prev) => prev.map((item) => (item.perfume.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.perfume.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
