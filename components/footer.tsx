"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-border bg-secondary/50 safe-bottom"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-xl font-semibold text-primary sm:text-2xl">Dejavue Parfume</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:mt-4">
              Откройте для себя искусство парфюмерии в Dejavue Parfume. Мы предлагаем лучшую коллекцию оригинальных ароматов
              от всемирно известных брендов с доставкой по Грозному и всей России.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">Навигация</h4>
            <ul className="mt-3 space-y-1 sm:mt-4 sm:space-y-2">
              <li>
                <Link
                  href="/"
                  className="inline-block py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary active:text-primary sm:py-0"
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="inline-block py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary active:text-primary sm:py-0"
                >
                  Каталог
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="inline-block py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary active:text-primary sm:py-0"
                >
                  Корзина
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">Контакты</h4>
            <ul className="mt-3 space-y-1 sm:mt-4 sm:space-y-2">
              <li className="text-sm text-muted-foreground">Грозный, Чечня</li>
              <li>
                <a
                  href="tel:+79991234567"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary active:text-primary"
                >
                  +7 (999) 123-45-67
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@dejavue-parfume.ru"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary active:text-primary"
                >
                  info@dejavue-parfume.ru
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center sm:mt-12 sm:pt-8">
          <p className="text-xs text-muted-foreground sm:text-sm">
            © {new Date().getFullYear()} Dejavue Parfume. Все права защищены.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
