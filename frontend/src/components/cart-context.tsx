import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { IProduct } from "@/types"

const STORAGE_KEY = "dejavue-cart-v2"

export interface CartItem {
  perfume: IProduct
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (perfume: IProduct) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function normalizePerfume(raw: Record<string, unknown>): IProduct | null {
  const id = Number(raw.id)
  if (!Number.isFinite(id)) return null
  const images = Array.isArray(raw.images)
    ? (raw.images as unknown[]).filter((x): x is string => typeof x === "string")
    : typeof raw.image === "string"
      ? [raw.image]
      : ["/placeholder.svg"]
  const gender = typeof raw.gender === "string" ? raw.gender : "unisex"
  return {
    id,
    name: typeof raw.name === "string" ? raw.name : "",
    brand: typeof raw.brand === "string" ? raw.brand : "",
    price: typeof raw.price === "number" ? raw.price : 0,
    images: images.length ? images : ["/placeholder.svg"],
    gender,
    volume: typeof raw.volume === "string" ? raw.volume : "",
    rating: typeof raw.rating === "number" ? raw.rating : 0,
    description: typeof raw.description === "string" ? raw.description : "",
    featured: Boolean(raw.featured),
  }
}

function parseStoredCart(json: string): CartItem[] {
  try {
    const parsed = JSON.parse(json) as unknown
    if (!Array.isArray(parsed)) return []
    const out: CartItem[] = []
    for (const row of parsed) {
      if (!row || typeof row !== "object") continue
      const o = row as Record<string, unknown>
      const quantity = typeof o.quantity === "number" ? o.quantity : 0
      const perfumeRaw = o.perfume
      if (!perfumeRaw || typeof perfumeRaw !== "object") continue
      const perfume = normalizePerfume(perfumeRaw as Record<string, unknown>)
      if (!perfume || quantity < 1) continue
      out.push({ perfume, quantity })
    }
    return out
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setItems(parseStoredCart(saved))
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, mounted])

  const addToCart = (perfume: IProduct) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.perfume.id === perfume.id)
      if (existing) {
        return prev.map((item) => (item.perfume.id === perfume.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { perfume, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((item) => item.perfume.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
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
