"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"

const DELIVERY_FEE = 300

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart()
  const [deliveryEnabled, setDeliveryEnabled] = useState(false)

  const total = subtotal + (deliveryEnabled ? DELIVERY_FEE : 0)

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary sm:mb-8 sm:h-24 sm:w-24">
              <ShoppingBag className="h-10 w-10 text-muted-foreground sm:h-12 sm:w-12" />
            </div>
            <h1 className="text-2xl font-light text-foreground sm:text-3xl md:text-4xl">
              Ваша корзина <span className="font-semibold text-primary">пуста</span>
            </h1>
            <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">
              Откройте для себя нашу изысканную коллекцию оригинальных ароматов
            </p>
            <Button asChild className="mt-6 h-12 w-full sm:mt-8 sm:h-auto sm:w-auto" size="lg">
              <Link href="/categories">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Продолжить покупки
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-secondary/30 py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground sm:text-sm sm:tracking-[0.3em]">
            Покупки
          </span>
          <h1 className="mt-3 text-3xl font-light tracking-tight text-foreground sm:mt-4 sm:text-4xl md:text-5xl">
            Ваша <span className="font-semibold text-primary">корзина</span>
          </h1>
        </div>
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.perfume.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="mb-3 overflow-hidden border-border/50 sm:mb-4">
                    <CardContent className="p-0">
                      <div className="flex gap-3 p-3 sm:gap-4 sm:p-4">
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-secondary/30 sm:h-32 sm:w-24">
                          <Image
                            src={item.perfume.image || "/placeholder.svg"}
                            alt={item.perfume.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground sm:text-xs">
                              {item.perfume.brand}
                            </p>
                            <h3 className="mt-0.5 text-sm font-semibold text-foreground sm:mt-1 sm:text-lg">
                              {item.perfume.name}
                            </h3>
                            <p className="text-xs text-muted-foreground sm:text-sm">{item.perfume.volume}</p>
                          </div>

                          <div className="mt-2 flex items-center justify-between sm:mt-0">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-transparent touch-target"
                                onClick={() => updateQuantity(item.perfume.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-6 text-center text-sm font-medium sm:w-8">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-transparent touch-target"
                                onClick={() => updateQuantity(item.perfume.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive touch-target"
                              onClick={() => removeFromCart(item.perfume.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="hidden flex-col items-end justify-between sm:flex">
                          <span className="text-lg font-semibold text-primary">
                            {(item.perfume.price * item.quantity).toLocaleString("ru-RU")} ₽
                          </span>
                          {item.quantity > 1 && (
                            <span className="text-sm text-muted-foreground">
                              {item.perfume.price.toLocaleString("ru-RU")} ₽ за шт.
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-border/50 bg-secondary/20 px-3 py-2 sm:hidden">
                        <span className="text-xs text-muted-foreground">
                          {item.quantity > 1 && `${item.perfume.price.toLocaleString("ru-RU")} ₽ × ${item.quantity}`}
                        </span>
                        <span className="text-base font-semibold text-primary">
                          {(item.perfume.price * item.quantity).toLocaleString("ru-RU")} ₽
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button variant="ghost" asChild className="h-11 justify-center sm:justify-start">
                <Link href="/categories">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Продолжить покупки
                </Link>
              </Button>
              <Button variant="outline" onClick={clearCart} className="h-11 bg-transparent">
                Очистить корзину
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="border-border/50 lg:sticky lg:top-24">
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-lg font-semibold text-foreground sm:text-xl">Итого заказа</h2>

                  <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground sm:text-base">Подытог</span>
                      <span className="font-medium text-foreground">{subtotal.toLocaleString("ru-RU")} ₽</span>
                    </div>

                    {/* Delivery Toggle */}
                    <div className="rounded-lg border border-border bg-secondary/30 p-3 sm:p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1">
                          <Label htmlFor="delivery" className="text-sm font-medium text-foreground sm:text-base">
                            Курьерская доставка
                          </Label>
                          <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">
                            +{DELIVERY_FEE}₽ по Грозному
                          </p>
                        </div>
                        <Switch id="delivery" checked={deliveryEnabled} onCheckedChange={setDeliveryEnabled} />
                      </div>
                    </div>

                    {deliveryEnabled && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-muted-foreground sm:text-base">Доставка</span>
                        <span className="font-medium text-foreground">{DELIVERY_FEE.toLocaleString("ru-RU")} ₽</span>
                      </motion.div>
                    )}

                    <div className="border-t border-border pt-3 sm:pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-foreground sm:text-lg">Итого</span>
                        <span className="text-xl font-bold text-primary sm:text-2xl">
                          {total.toLocaleString("ru-RU")} ₽
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button className="mt-4 h-12 w-full text-base sm:mt-6 sm:h-auto sm:text-sm" size="lg">
                    Оформить заказ
                  </Button>

                  <p className="mt-3 text-center text-[10px] text-muted-foreground sm:mt-4 sm:text-xs">
                    Бесплатная доставка при заказе от 5000₽
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
