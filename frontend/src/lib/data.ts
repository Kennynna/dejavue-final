import { PRODUCTS } from "@/data/products"

export const brands = [...new Set(PRODUCTS.map((p) => p.brand.toLowerCase()))].sort()

export const volumeFilters = [
  { value: "all", label: "Все объемы" },
  { value: "30", label: "до 30мл" },
  { value: "50", label: "до 50мл" },
  { value: "75", label: "до 75мл" },
  { value: "100+", label: "100мл+" },
]
