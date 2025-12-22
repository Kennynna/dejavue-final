"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "./cart-context"
import type { Perfume } from "@/lib/data"
import { ShoppingBag, Star } from "lucide-react"

interface ProductCardProps {
  perfume: Perfume
}

const genderLabels: Record<string, string> = {
  male: "Мужской",
  female: "Женский",
  unisex: "Унисекс",
}

export function ProductCard({ perfume }: ProductCardProps) {
  const { addToCart } = useCart()

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="group overflow-hidden border-border/50 bg-card transition-shadow hover:shadow-lg">
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] overflow-hidden bg-secondary/30 sm:aspect-[3/4]">
            <Image
              src={perfume.image || "/placeholder.svg"}
              alt={perfume.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            {/* Quick add button on hover - hidden on mobile, shown always on touch */}
            <motion.div
              className="absolute bottom-3 left-3 right-3 hidden opacity-0 transition-opacity group-hover:opacity-100 sm:block sm:bottom-4 sm:left-4 sm:right-4"
              initial={false}
            >
              <Button onClick={() => addToCart(perfume)} className="w-full gap-2" size="sm">
                <ShoppingBag className="h-4 w-4" />В корзину
              </Button>
            </motion.div>

            <span className="absolute right-2 top-2 rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-medium text-foreground backdrop-blur-sm sm:right-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs">
              {genderLabels[perfume.gender]}
            </span>
          </div>

          <div className="p-3 sm:p-4">
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

            <div className="mt-3 flex items-center justify-between sm:mt-4">
              <span className="text-base font-semibold text-primary sm:text-xl">
                {perfume.price.toLocaleString("ru-RU")} ₽
              </span>
              <Button variant="outline" size="sm" onClick={() => addToCart(perfume)} className="h-9 w-9 p-0 sm:hidden">
                <ShoppingBag className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
