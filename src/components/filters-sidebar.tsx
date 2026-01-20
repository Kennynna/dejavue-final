import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { brands, volumes } from "../lib/data"
import { Button } from "./ui/button"

interface FiltersSidebarProps {
  selectedGenders: string[]
  setSelectedGenders: (genders: string[]) => void
  selectedBrands: string[]
  setSelectedBrands: (brands: string[]) => void
  selectedVolumes: string[]
  setSelectedVolumes: (volumes: string[]) => void
  onClose?: () => void
  isMobile?: boolean
}

const genderLabels: Record<string, string> = {
  male: "Мужской",
  female: "Женский",
  unisex: "Унисекс",
}

export function FiltersSidebar({
  selectedGenders,
  setSelectedGenders,
  selectedBrands,
  setSelectedBrands,
  selectedVolumes,
  setSelectedVolumes,
  onClose,
  isMobile,
}: FiltersSidebarProps) {
  const genders = ["male", "female", "unisex"]

  const toggleGender = (gender: string) => {
    setSelectedGenders(
      selectedGenders.includes(gender) ? selectedGenders.filter((g) => g !== gender) : [...selectedGenders, gender],
    )
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands(
      selectedBrands.includes(brand) ? selectedBrands.filter((b) => b !== brand) : [...selectedBrands, brand],
    )
  }

  const toggleVolume = (volume: string) => {
    setSelectedVolumes(
      selectedVolumes.includes(volume) ? selectedVolumes.filter((v) => v !== volume) : [...selectedVolumes, volume],
    )
  }

  const clearAll = () => {
    setSelectedGenders([])
    setSelectedBrands([])
    setSelectedVolumes([])
  }

  const hasFilters =
    selectedGenders.length > 0 || selectedBrands.length > 0 || selectedVolumes.length > 0

  return (
    <div className="flex h-full flex-col space-y-5 sm:space-y-6">
      {isMobile && (
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-lg font-semibold">Фильтры</h2>
        </div>
      )}


        <Button variant="secondary" size="sm" onClick={clearAll} className={`h-10 text-muted-foreground `} disabled={!hasFilters}>
          Сбросить все фильтры
        </Button>

      <div className="flex-1 space-y-5 overflow-y-auto scroll-smooth-touch sm:space-y-6">
        {/* Gender */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-foreground sm:mb-4">Пол</h3>
          <div className="space-y-2 sm:space-y-3">
            {genders.map((gender) => (
              <div key={gender} className="flex items-center gap-3">
                <Checkbox
                  id={`gender-${gender}`}
                  checked={selectedGenders.includes(gender)}
                  onCheckedChange={() => toggleGender(gender)}
                  className="h-5 w-5"
                />
                <Label
                  htmlFor={`gender-${gender}`}
                  className="cursor-pointer py-1 text-sm text-foreground/80 sm:text-base"
                >
                  {genderLabels[gender]}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-foreground sm:mb-4">Популярые бренды</h3>
          <div className="max-h-40 space-y-2 overflow-y-auto pr-2 scrollbar-hide sm:max-h-48 sm:space-y-3">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center gap-3">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => toggleBrand(brand)}
                  className="h-5 w-5"
                />
                <Label
                  htmlFor={`brand-${brand}`}
                  className="cursor-pointer py-1 text-sm text-foreground/80 sm:text-base"
                >
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Volume */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-foreground sm:mb-4">Объём</h3>
          <div className="space-y-2 sm:space-y-3">
            {volumes.map((volume) => (
              <div key={volume} className="flex items-center gap-3">
                <Checkbox
                  id={`volume-${volume}`}
                  checked={selectedVolumes.includes(volume)}
                  onCheckedChange={() => toggleVolume(volume)}
                  className="h-5 w-5"
                />
                <Label
                  htmlFor={`volume-${volume}`}
                  className="cursor-pointer py-1 text-sm text-foreground/80 sm:text-base"
                >
                  {volume}
                </Label>
              </div>
            ))}
          </div>
        </div>

      </div>

      {isMobile && (
        <div className="border-t border-border pt-4 safe-bottom">
          <Button onClick={onClose} className="h-12 w-full text-base">
            Применить фильтры
          </Button>
        </div>
      )}
    </div>
  )
}
