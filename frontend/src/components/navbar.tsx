import { Link } from "react-router-dom"
import { useCart } from "./cart-context"
import { ShoppingBag, Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const { totalItems } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 safe-top"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <motion.span
            className="text-xl font-semibold tracking-wide text-primary sm:text-2xl lg:text-3xl"
            whileHover={{ scale: 1.02 }}
          >
            Déjà vu Parfume

            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground sm:text-sm sm:tracking-[0.3em]">
              Теперь и в Грозном
            </p>
          </motion.span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium uppercase tracking-widest text-foreground/80 transition-colors hover:text-primary"
          >
            Главная
          </Link>
          <Link
            to="/categories"
            className="text-sm font-medium uppercase tracking-widest text-foreground/80 transition-colors hover:text-primary"
          >
            Каталог
          </Link>
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {mounted && totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground"
                >
                  {totalItems}
                </motion.span>
              )}
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="relative h-11 w-11 touch-target">
              <ShoppingBag className="h-5 w-5" />
              {mounted && totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-11 w-11 touch-target"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute left-0 right-0 top-full border-b border-border bg-background md:hidden"
          >
            <div className="safe-x flex flex-col items-center px-4 py-6">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-14 items-center text-base font-medium uppercase tracking-widest text-foreground/80 touch-target active:text-primary"
              >
                Главная
              </Link>
              <Link
                to="/categories"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-14 items-center text-base font-medium uppercase tracking-widest text-foreground/80 touch-target active:text-primary"
              >
                Каталог
              </Link>
              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-14 items-center text-base font-medium uppercase tracking-widest text-foreground/80 touch-target active:text-primary"
              >
                Корзина {mounted && totalItems > 0 && `(${totalItems})`}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
