"use client"

import { motion } from "framer-motion"
import { perfumes } from "@/lib/data"
import { ProductCard } from "./product-card"

const featured = perfumes.filter((p) => p.featured).slice(0, 6)

export function FeaturedProducts() {
  return (
    <section className="bg-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground sm:text-sm sm:tracking-[0.3em]">
            Избранная коллекция
          </span>
          <h2 className="mt-3 text-3xl font-light tracking-tight text-foreground sm:mt-4 sm:text-4xl md:text-5xl">
            Популярные <span className="font-semibold text-primary">ароматы</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl px-4 text-sm text-muted-foreground sm:mt-4 sm:px-0 sm:text-base">
            Наши самые любимые духи, тщательно отобранные для истинных ценителей
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:gap-6 lg:mt-16 lg:grid-cols-3">
          {featured.map((perfume, index) => (
            <motion.div
              key={perfume.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard perfume={perfume} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
