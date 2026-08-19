import { PRODUCTS } from "@/data/products"
import type { IProduct } from "@/types"

export interface ProductsPageResponse {
  data: IProduct[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export function getAllProducts(): IProduct[] {
  return PRODUCTS
}

export function getProductsPage(page: number, pageSize: number): ProductsPageResponse {
  const total = PRODUCTS.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(1, page), pageCount)
  const start = (safePage - 1) * pageSize
  const data = PRODUCTS.slice(start, start + pageSize)
  return {
    data,
    meta: {
      pagination: {
        page: safePage,
        pageSize,
        pageCount,
        total,
      },
    },
  }
}
