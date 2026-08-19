import { getAllProducts } from "@/lib/catalogRepository"
import type { IProduct } from "@/types"

export async function getProducts(): Promise<IProduct[]> {
  return getAllProducts()
}
