import { useRef, useMemo, useEffect } from 'react'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import { Loader2 } from 'lucide-react'
import { useInfiniteProducts } from '@/hooks/useInfiniteProducts'
import { ProductCard } from './product-card'
import { IProduct } from '@/types'
import Loader from '@/components/ui/Loader'

interface VirtualProductGridProps {
  gridCols: 2 | 3
  filters?: {
    genders: string[]
    brands: string[]
    volume: string
  }
  sortBy?: string
}

export function VirtualProductGrid({ gridCols, filters, sortBy }: VirtualProductGridProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteProducts(16)

  // Объединяем все страницы в один массив
  const allProducts = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? []
  }, [data])

  // Применяем фильтры на клиенте
  const filteredProducts = useMemo(() => {
    let result = [...allProducts]

    if (filters?.genders && filters.genders.length > 0) {
      result = result.filter((p) => filters.genders.includes(p.gender))
    }

    if (filters?.brands && filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand))
    }

    // Фильтрация по объему (одиночный выбор)
    if (filters?.volume && filters.volume !== 'all') {
      result = result.filter((p) => {
        const vol = parseInt(p.volume) || 0
        switch (filters.volume) {
          case '30':
            return vol <= 30
          case '50':
            return vol <= 50
          case '75':
            return vol <= 75
          case '100+':
            return vol >= 100
          default:
            return true
        }
      })
    }

    // Сортировка
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return result
  }, [allProducts, filters, sortBy])

  // Группируем продукты в ряды
  const rows = useMemo(() => {
    const rowsArray: IProduct[][] = []
    for (let i = 0; i < filteredProducts.length; i += gridCols) {
      rowsArray.push(filteredProducts.slice(i, i + gridCols))
    }
    return rowsArray
  }, [filteredProducts, gridCols])

  // Window Virtualizer — скролл всей страницы
  const rowVirtualizer = useWindowVirtualizer({
    count: rows.length,
    estimateSize: () => 420,
    overscan: 3,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  })

  // Intersection Observer для подгрузки (работает с window)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        root: null, // window
        rootMargin: '300px',
        threshold: 0,
      }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  if (isLoading) {
    return (
      <div className="relative min-h-[500px] overflow-hidden">
        <Loader />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="py-16 text-center">
        <p className="text-destructive">
          Ошибка загрузки: {error?.message || 'Неизвестная ошибка'}
        </p>
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="py-16 text-center sm:py-20">
        <p className="text-base text-muted-foreground sm:text-lg">
          Нет товаров, соответствующих вашим фильтрам
        </p>
      </div>
    )
  }

  const virtualRows = rowVirtualizer.getVirtualItems()

  return (
    <div>


      {/* Контейнер для виртуализации с window scroll */}
      <div
        ref={listRef}
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Рендерим только видимые ряды */}
        {virtualRows.map((virtualRow) => {
          const row = rows[virtualRow.index]

          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin}px)`,
              }}
            >
              <div
                className={`grid gap-3 pb-4 sm:gap-4 md:gap-6 ${
                  gridCols === 2 ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {row.map((product) => (
                  <ProductCard key={product.id} perfume={product} />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Триггер для Intersection Observer */}
      <div ref={loadMoreRef} className="h-1" />

      {/* Индикатор загрузки */}
      {isFetchingNextPage && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-2 text-sm text-muted-foreground">
            Загрузка...
          </span>
        </div>
      )}
    </div>
  )
}

export default VirtualProductGrid
