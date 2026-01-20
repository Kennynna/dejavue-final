import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-secondary/30 sm:min-h-[85vh] lg:min-h-[90vh]">
      {/* Animated background particles - reduced count on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-accent/20"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, Math.random() * -500 - 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "linear",
              delay: Math.random() * 5,
            }}
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-5 py-16 text-center sm:min-h-[85vh] sm:px-6 sm:py-20 lg:min-h-[90vh] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 sm:mb-6"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground sm:text-sm sm:tracking-[0.3em]">
            Оригинальные ароматы
          </span>
        </motion.div>

        <motion.h1
          className="text-balance text-4xl font-light leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Dejavue
          </motion.span>
          <motion.span
            className="block font-semibold text-primary"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Parfume
          </motion.span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl px-2 text-pretty text-base leading-relaxed text-muted-foreground sm:mt-8 sm:max-w-2xl sm:px-0 sm:text-lg md:text-xl font-bold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Откройте для себя изысканные ароматы от самых престижных парфюмерных домов мира. Каждый аромат рассказывает
          историю, каждый флакон хранит воспоминание.
        </motion.p>

        <motion.div
          className="mt-8 w-full px-4 sm:mt-12 sm:w-auto sm:px-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Button asChild size="lg" className="group  w-full p-4 text-base ">
            <Link to="/categories">
              Смотреть коллекцию
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>

        {/* Decorative line - hidden on mobile */}
        <motion.div
          className="absolute bottom-16 left-1/2 hidden h-20 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-border to-transparent sm:bottom-20 sm:block"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        />
      </div>
    </section>
  )
}
