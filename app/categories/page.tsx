"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { perfumes } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import { FiltersSidebar } from "@/components/filters-sidebar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SlidersHorizontal, Grid3X3, LayoutGrid } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "name"

export default function CategoriesPage() {
  const [selectedGenders, setSelectedGenders] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedVolumes, setSelectedVolumes] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState<SortOption>("default")
  const [gridCols, setGridCols] = useState<2 | 3>(3)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filteredAndSorted = useMemo(() => {
    let result = [...perfumes]

    if (selectedGenders.length > 0) {
      result = result.filter((p) => selectedGenders.includes(p.gender))
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand))
    }

    if (selectedVolumes.length > 0) {
      result = result.filter((p) => {
        const vol = Number.parseInt(p.volume)
        return selectedVolumes.some((v) => {
          if (v === "100мл+") return vol >= 100
          return p.volume === v
        })
      })
    }

    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating)
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return result
  }, [selectedGenders, selectedBrands, selectedVolumes, minRating, sortBy])

  const activeFiltersCount =
    selectedGenders.length + selectedBrands.length + selectedVolumes.length + (minRating > 0 ? 1 : 0)

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-secondary/30 py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground sm:text-sm sm:tracking-[0.3em]">
            Наша коллекция
          </span>
          <h1 className="mt-3 text-3xl font-light tracking-tight text-foreground sm:mt-4 sm:text-4xl md:text-5xl">
            Все <span className="font-semibold text-primary">ароматы</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl px-4 text-sm text-muted-foreground sm:mt-4 sm:px-0 sm:text-base">
            Исследуйте полную коллекцию оргиниальных духов от лучших парфюмерных домов мира
          </p>
        </div>
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="flex gap-6 lg:gap-8">
          {/* Desktop Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden w-64 shrink-0 lg:block"
          >
            <div className="sticky top-24">
              <FiltersSidebar
                selectedGenders={selectedGenders}
                setSelectedGenders={setSelectedGenders}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                selectedVolumes={selectedVolumes}
                setSelectedVolumes={setSelectedVolumes}
                minRating={minRating}
                setMinRating={setMinRating}
              />
            </div>
          </motion.aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-6 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Mobile Filters */}
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="h-10 bg-transparent lg:hidden">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      <span className="hidden xs:inline">Фильтры</span>
                      {activeFiltersCount > 0 && (
                        <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          {activeFiltersCount}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[85vw] max-w-sm overflow-y-auto p-4 sm:w-80 sm:p-6">
                    <FiltersSidebar
                      selectedGenders={selectedGenders}
                      setSelectedGenders={setSelectedGenders}
                      selectedBrands={selectedBrands}
                      setSelectedBrands={setSelectedBrands}
                      selectedVolumes={selectedVolumes}
                      setSelectedVolumes={setSelectedVolumes}
                      minRating={minRating}
                      setMinRating={setMinRating}
                      onClose={() => setMobileFiltersOpen(false)}
                      isMobile
                    />
                  </SheetContent>
                </Sheet>

                <span className="text-xs text-muted-foreground sm:text-sm">{filteredAndSorted.length} товаров</span>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <div className="hidden items-center gap-1 xs:flex sm:flex">
                  <Button
                    variant={gridCols === 2 ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setGridCols(2)}
                    className="h-9 w-9 sm:h-10 sm:w-10"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={gridCols === 3 ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setGridCols(3)}
                    className="hidden h-9 w-9 sm:flex sm:h-10 sm:w-10"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                </div>

                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="h-10 w-32 text-xs sm:w-48 sm:text-sm">
                    <SelectValue placeholder="Сортировка" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">По умолчанию</SelectItem>
                    <SelectItem value="price-asc">Цена ↑</SelectItem>
                    <SelectItem value="price-desc">Цена ↓</SelectItem>
                    <SelectItem value="rating">По рейтингу</SelectItem>
                    <SelectItem value="name">По названию</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {filteredAndSorted.length > 0 ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`grid gap-3 sm:gap-4 md:gap-6 ${
                    gridCols === 2 ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {filteredAndSorted.map((perfume, index) => (
                    <motion.div
                      key={perfume.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                    >
                      <ProductCard perfume={perfume} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 text-center sm:py-20"
                >
                  <p className="text-base text-muted-foreground sm:text-lg">
                    Нет товаров, соответствующих вашим фильтрам
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 bg-transparent"
                    onClick={() => {
                      setSelectedGenders([])
                      setSelectedBrands([])
                      setSelectedVolumes([])
                      setMinRating(0)
                    }}
                  >
                    Сбросить все фильтры
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
