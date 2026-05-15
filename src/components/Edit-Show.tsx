import { motion } from "framer-motion"
import { ProductCard } from "./product-card"
import { useProducts } from "@/hooks/useProducts.tsx"
import { useMemo } from "react"
import type { IProduct } from "@/types"

// Ссылка на сгенерированные lifestyle-картинки, адаптированные под палитру
const storytellingContent = [
  {
    title: "Магия ночного города",
    description: "Густой, обволакивающий шлейф, который оставляет послевкусие тайны. Аромат для тех моментов, когда хочется покорять с первого взгляда.",
    image: "edit/1.png", // Промпт: Запястье, бокал, бордовый бархат, золото.
  },
  {
    title: "Дыхание океана",
    description: "Легкий, как утренний бриз, и дерзкий, как морская волна. Идеальный спутник, который заряжает энергией и дарит ощущение свободы.",
    image: "edit/2.png", // Промпт: Отбеленное дерево, кремовый песок, золотые блики. No blue water.
  },
  {
    title: "Древесная симфония",
    description: "Благородство в каждой капле. Глубокий аккорд кедра и теплого сандала создает ауру уверенности. Аромат, который говорит за вас.",
    image: "edit/3.png", // Промпт: Текстура кедра с золотой позолотой.
  }
]

export function EditorialShowcase() {
  const { data, isLoading } = useProducts()

  // Берем только 3 товара для презентации (по одному на каждый концепт)
  const showcaseProducts: IProduct[] = useMemo(() => {
    return data?.filter((p) => p.featured).slice(0, 3) ?? []
  }, [data])

  if (isLoading) {
    return <div className="py-20 text-center text-muted-foreground">Загрузка магии...</div>
  }

  if (showcaseProducts.length === 0) return null;

  return (
    // bg-background — твоя кремовая палитра
    <section className="bg-background py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок секции, стиль соответствует image_0.png */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="font-medium tracking-[0.2em] text-primary text-sm uppercase">
            Выбор парфюмеров
          </span>
          <h2 className="mt-4 text-4xl font-light tracking-tight text-foreground md:text-5xl">
            Искусство <span className="font-serif italic text-primary">аромата</span>
          </h2>
        </motion.div>

        {/* Сетка Lookbook (Zig-zag) */}
        <div className="flex flex-col gap-20 lg:gap-32">
          {showcaseProducts.map((perfume, index) => {
            const content = storytellingContent[index] || storytellingContent[0];
            const isEven = index % 2 !== 0; // Для шахматного порядка

            return (
              <div 
                key={perfume.id} 
                className={`flex flex-col gap-8 md:gap-12 lg:gap-16 items-stretch ${
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* Левая/Правая часть: Атмосферное фото */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="w-full md:w-1/2 self-stretch flex min-h-[280px] md:min-h-0"
                >
                  <div className="relative flex-1 overflow-hidden rounded-2xl bg-secondary/20 group">
                    <img
                      src={`/${content.image}`}
                      alt={content.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Легкий градиент, адаптированный под теплые тона */}
                    <div className="absolute inset-0 bg-primary/5 transition-opacity group-hover:bg-transparent" />
                  </div>
                </motion.div>

                {/* Правая/Левая часть: Текст + карточка товара */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
                >
                  {/* Текст соответствует цветовой схеме */}
                  <h3 className="text-3xl font-light md:text-4xl lg:text-5xl mb-4 text-foreground">
                    {content.title}
                  </h3>
                  <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-md">
                    {content.description}
                  </p>
                  
                  {/* Контейнер, ограничивающий ширину, чтобы не сломать карточку */}
                  <div className="w-full max-w-[320px] md:max-w-[280px] lg:max-w-[320px]">
                    {/* Вызов ТВОЕЙ оригинальной карточки, без изменений */}
                    <ProductCard perfume={perfume} />
                  </div>
                </motion.div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}