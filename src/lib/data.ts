export interface Perfume {
  id: number
  name: string
  brand: string
  price: number
  image: string
  gender: "male" | "female" | "unisex"
  volume: string
  rating: number
  description: string
  featured?: boolean
}


const brandsArr = ["Chanel", "Dior","Sauvage","Gucci","Dolce & Gabbana","Tom Ford"]


export const brands = [...new Set(brandsArr.map((p) => p))].sort()
export const volumeFilters = [
  { value: "all", label: "Все объемы" },
  { value: "30", label: "до 30мл" },
  { value: "50", label: "до 50мл" },
  { value: "75", label: "до 75мл" },
  { value: "100+", label: "100мл+" },
]
