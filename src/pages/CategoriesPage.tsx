import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { FiltersSidebar } from "../components/filters-sidebar"
import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet"
import { VirtualProductGrid } from "@/components/virtual-product-grid"

type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "name"

export default function CategoriesPage() {
  const [selectedGenders, setSelectedGenders] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedVolume, setSelectedVolume] = useState<string>("all")
  const [sortBy, setSortBy] = useState<SortOption>("default")
  const [gridCols] = useState<2 | 3>(2)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  // Плавный скролл к сетке товаров при изменении фильтров
  const scrollToGrid = useCallback(() => {
    if (gridRef.current) {
      const offset = gridRef.current.offsetTop - 100
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      })
    }
  }, [])

  // Следим за изменениями фильтров (кроме первого рендера)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    scrollToGrid()
  }, [selectedGenders, selectedBrands, selectedVolume, sortBy, scrollToGrid])

  const activeFiltersCount =
    selectedGenders.length + selectedBrands.length + (selectedVolume !== "all" ? 1 : 0)

  const clearFilters = () => {
    setSelectedGenders([])
    setSelectedBrands([])
    setSelectedVolume("all")
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
            Наша коллекция
          </span>
          <h1 className="mt-3 text-3xl font-light tracking-tight text-foreground sm:mt-4 sm:text-4xl md:text-5xl">
            Все <span className="font-semibold text-primary">ароматы</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl px-4 text-sm text-muted-foreground sm:mt-4 sm:px-0 sm:text-base">
            Исследуйте полную коллекцию оригинальных духов от лучших парфюмерных домов мира
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
                selectedVolume={selectedVolume}
                setSelectedVolume={setSelectedVolume}
              />
              {activeFiltersCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full"
                  onClick={clearFilters}
                >
                  Сбросить фильтры ({activeFiltersCount})
                </Button>
              )}
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
                      selectedVolume={selectedVolume}
                      setSelectedVolume={setSelectedVolume}
                      isMobile
                    />
                    {activeFiltersCount > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 w-full"
                        onClick={() => {
                          clearFilters()
                          setMobileFiltersOpen(false)
                        }}
                      >
                        Сбросить фильтры ({activeFiltersCount})
                      </Button>
                    )}
                  </SheetContent>
                </Sheet>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">

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

            {/* Виртуализированная сетка с infinite scroll */}
            <div ref={gridRef}>
              <VirtualProductGrid
                gridCols={gridCols}
                filters={{
                  genders: selectedGenders,
                  brands: selectedBrands,
                  volume: selectedVolume,
                }}
                sortBy={sortBy}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
