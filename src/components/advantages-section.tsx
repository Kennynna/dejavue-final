import { motion } from "framer-motion"
import { Truck, Award, Package, Clock } from "lucide-react"

const advantages = [
  {
    icon: Truck,
    title: "Бесплатная доставка",
    description: "При заказе от 3 позиций",
  },
  {
    icon: Award,
    title: "Оригинальная продукция",
    description: "100% подлинные духи",
  },
  {
    icon: Package,
    title: "Широкий ассортимент",
    description: "Бренды со всего мира",
  },
  {
    icon: Clock,
    title: "Быстрая доставка",
    description: "Оперативная доставка по Грозному",
  },
]

export function AdvantagesSection() {
  return (
    <section className="border-y border-border bg-secondary/30 py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col items-center text-center"
            >
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground sm:h-14 sm:w-14 lg:h-16 lg:w-16"
                whileHover={{ scale: 1.05 }}
              >
                <advantage.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
              </motion.div>
              <h3 className="mt-3 text-sm font-semibold text-foreground sm:mt-4 sm:text-base lg:text-lg">
                {advantage.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground sm:mt-2 sm:text-sm">{advantage.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
