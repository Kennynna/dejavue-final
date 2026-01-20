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
export const volumes = ["30мл", "50мл", "75мл", "100мл+"]
