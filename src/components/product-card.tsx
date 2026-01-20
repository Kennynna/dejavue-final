import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { useCart } from "./cart-context"
import { Plus, Minus, Star } from "lucide-react"
import {IProduct} from "@/types";

interface ProductCardProps {
  perfume: IProduct
}

const genderLabels: Record<string, string> = {
  male: "Мужской",
  female: "Женский",
  unisex: "Унисекс",
}

export function ProductCard({ perfume }: ProductCardProps) {
  const { addToCart, updateQuantity, items } = useCart()
  const cartItem = items.find((item) => item.perfume.id === perfume.id)
  const isInCart = !!cartItem
  const [showQuantityControls, setShowQuantityControls] = useState(isInCart)
  useEffect(() => {
    setShowQuantityControls(isInCart)
  }, [isInCart])

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="group overflow-hidden border-border/50 bg-card transition-shadow hover:shadow-lg max-[500px]:py-2">
        <CardContent className="p-0" >
          <div className="relative aspect-[3/4] overflow-hidden bg-secondary/30 sm:aspect-[3/4]">
            <img
              src={perfume?.images[0] || "/placeholder.svg"}
              alt={perfume.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />


            <span className="absolute right-2 top-2 rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-medium text-foreground backdrop-blur-sm sm:right-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs">
              {genderLabels[perfume.gender]}
            </span>
          </div>

          <div className="p-3 max-[500px]:p-1 sm:p-4 sm:h-50  h-35">
            <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground sm:text-xs">
              {perfume.brand}
            </p>
            <h3 className="mt-0.5 line-clamp-1 text-sm font-semibold text-foreground sm:mt-1 sm:text-lg">
              {perfume.name}
            </h3>
            <p className="mt-1 hidden text-sm text-muted-foreground line-clamp-1 sm:block">{perfume.description}</p>

            <div className="mt-2 flex items-center justify-between sm:mt-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${i < perfume.rating ? "fill-accent text-accent" : "text-border"}`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground sm:text-xs">{perfume.volume}</span>
            </div>

            <div className="mt-3 flex flex-col gap-2 max-[500px]:gap-1.5 sm:mt-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-base font-semibold text-primary sm:text-xl">
                {perfume.price.toLocaleString("ru-RU")} ₽
              </span>
              {showQuantityControls ? (
                <div className="flex h-8 items-center gap-1.5 rounded-md border bg-background p-1 max-[500px]:w-full max-[500px]:justify-center sm:w-auto">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      const newQuantity = (cartItem?.quantity || 1) - 1
                      if (newQuantity <= 0) {
                        updateQuantity(perfume.id, 0)
                        setShowQuantityControls(false)
                      } else {
                        updateQuantity(perfume.id, newQuantity)
                      }
                    }}
                    className="h-6 w-6 rounded-md"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="min-w-[1.5rem] text-center text-xs font-semibold">
                    {cartItem?.quantity || 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!isInCart) {
                        addToCart(perfume)
                        setShowQuantityControls(true)
                      } else {
                        const newQuantity = (cartItem?.quantity || 1) + 1
                        updateQuantity(perfume.id, newQuantity)
                      }
                    }}
                    className="h-6 w-6 rounded-md"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    addToCart(perfume)
                    setShowQuantityControls(true)
                  }}
                  className="h-8 max-[500px]:w-full sm:px-4"
                >
                  Добавить
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
