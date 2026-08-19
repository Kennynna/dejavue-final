import { motion } from "framer-motion"

export function AboutSection() {
  return (
    <section className="bg-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
            О нашем магазине
          </p>

          <h2 className="mt-3 text-3xl leading-tight text-foreground sm:mt-4 sm:text-4xl lg:text-5xl">
            Мы помогаем найти аромат, который расскажет вашу историю
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-base">
            Dejavue Parfume - это пространство, где классика парфюмерии встречается с современными ароматами.
            Мы тщательно отбираем коллекции, чтобы вы могли подобрать парфюм для любого настроения, сезона
            и повода.
          </p>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
            В каталоге представлены оригинальные композиции от известных брендов, а команда магазина всегда
            готова помочь с выбором и ответить на вопросы. Мы ценим комфорт клиентов: удобная навигация,
            прозрачный сервис и быстрая доставка.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
