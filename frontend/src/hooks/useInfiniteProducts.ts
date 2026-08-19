import { useInfiniteQuery } from "@tanstack/react-query"
import { getProductsPage } from "@/lib/catalogRepository"
import type { IProduct } from "@/types"

const PAGE_SIZE = 16

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

async function fetchProducts(page: number, pageSize: number): Promise<ProductsApiResponse> {
  return getProductsPage(page, pageSize)
}

export const infiniteProductsKeys = {
  all: ["products", "infinite"] as const,
  list: (pageSize: number = PAGE_SIZE) => [...infiniteProductsKeys.all, pageSize] as const,
} as const

export function useInfiniteProducts(pageSize: number = PAGE_SIZE) {
  return useInfiniteQuery({
    queryKey: infiniteProductsKeys.list(pageSize),
    queryFn: async ({ pageParam = 1 }) => {
      return fetchProducts(pageParam, pageSize)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.meta.pagination
      return page < pageCount ? page + 1 : undefined
    },
    getPreviousPageParam: (firstPage) => {
      const { page } = firstPage.meta.pagination
      return page > 1 ? page - 1 : undefined
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  })
}

export default useInfiniteProducts
