import {useInfiniteQuery} from '@tanstack/react-query'
import {IProduct} from '@/types'

const BASE_URL = import.meta.env.VITE_BASE_URL
const PRODUCTS_ENDPOINT = import.meta.env.VITE_ALL_PRODUCTS

const PAGE_SIZE = 16 // Количество товаров на страницу (оптимально для grid 2-3 колонки)

// Типы для ответа API Strapi
interface StrapiPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

interface StrapiMeta {
  pagination: StrapiPagination
}

interface ProductsApiResponse {
  data: IProduct[]
  meta: StrapiMeta
}

// Функция для получения продуктов с пагинацией
async function fetchProducts(page: number, pageSize: number): Promise<ProductsApiResponse> {
  const url = `${BASE_URL}${PRODUCTS_ENDPOINT}?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`
  
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error(`Ошибка загрузки: ${response.status}`)
  }
  
  return response.json()
}

export const infiniteProductsKeys = {
  all: ['products', 'infinite'] as const,
  list: (pageSize: number = PAGE_SIZE) => [...infiniteProductsKeys.all, pageSize] as const,
} as const

export function useInfiniteProducts(pageSize: number = PAGE_SIZE) {
  return useInfiniteQuery({
    queryKey: infiniteProductsKeys.list(pageSize),
    queryFn: async ({ pageParam = 1 }) => {
      return await fetchProducts(pageParam, pageSize)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.meta.pagination
      // Если есть еще страницы, возвращаем следующую
      return page < pageCount ? page + 1 : undefined
    },
    getPreviousPageParam: (firstPage) => {
      const { page } = firstPage.meta.pagination
      return page > 1 ? page - 1 : undefined
    },
    staleTime: 1000 * 60 * 5, // 5 минут
    gcTime: 1000 * 60 * 15,   // 15 минут
    refetchOnWindowFocus: false,
  })
}

export default useInfiniteProducts

