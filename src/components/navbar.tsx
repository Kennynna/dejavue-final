import { Link, useNavigate } from "react-router-dom"
import { useCart } from "./cart-context"
import { useAuthStore } from "@/store/useAuthStore"
import { ShoppingBag, Menu, X, Settings, LogIn, LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const navigate = useNavigate()
  const { totalItems } = useCart()
  const { isAuthenticated, user, logout } = useAuthStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    setMobileMenuOpen(false)
    navigate("/")
  }

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
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
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
          {isAuthenticated && (
            <Link
              to="/admin"
              className="text-sm font-medium uppercase tracking-widest text-foreground/80 transition-colors hover:text-primary"
            >
              Админ
            </Link>
          )}
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
          {isAuthenticated ? (
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Выйти
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="sm" className="gap-2">
                <LogIn className="h-4 w-4" />
                Войти
              </Button>
            </Link>
          )}
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
            <div className="flex flex-col items-center px-4 py-6 safe-x">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-14 items-center text-base font-medium uppercase tracking-widest text-foreground/80 active:text-primary touch-target"
              >
                Главная
              </Link>
              <Link
                to="/categories"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-14 items-center text-base font-medium uppercase tracking-widest text-foreground/80 active:text-primary touch-target"
              >
                Каталог
              </Link>
              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-14 items-center text-base font-medium uppercase tracking-widest text-foreground/80 active:text-primary touch-target"
              >
                Корзина {mounted && totalItems > 0 && `(${totalItems})`}
              </Link>
              {isAuthenticated && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-14 items-center gap-2 text-base font-medium uppercase tracking-widest text-foreground/80 active:text-primary touch-target"
                >
                  <Settings className="h-4 w-4" />
                  Админ
                </Link>
              )}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex h-14 items-center gap-2 text-base font-medium uppercase tracking-widest text-foreground/80 active:text-primary touch-target"
                >
                  <LogOut className="h-4 w-4" />
                  Выйти ({user?.email})
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-14 items-center gap-2 text-base font-medium uppercase tracking-widest text-foreground/80 active:text-primary touch-target"
                >
                  <LogIn className="h-4 w-4" />
                  Войти
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
