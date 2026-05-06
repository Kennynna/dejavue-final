import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { brands, volumeFilters } from "../lib/data"
import { Button } from "./ui/button"

interface FiltersSidebarProps {
  selectedGenders: string[]
  setSelectedGenders: (genders: string[]) => void
  selectedBrands: string[]
  setSelectedBrands: (brands: string[]) => void
  selectedVolume: string
  setSelectedVolume: (volume: string) => void
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
  selectedVolume,
  setSelectedVolume,
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

  return (
    <div className="flex h-full flex-col space-y-5 sm:space-y-6">
      {isMobile && (
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-lg font-semibold">Фильтры</h2>
        </div>
      )}


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
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-foreground sm:mb-4">Бренды</h3>
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
                  {brand.toUpperCase()}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Volume */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-foreground sm:mb-4">Объём</h3>
          <RadioGroup
            value={selectedVolume}
            onValueChange={setSelectedVolume}
            className="space-y-2 sm:space-y-3"
          >
            {volumeFilters.map((volume) => (
              <div key={volume.value} className="flex items-center gap-3">
                <RadioGroupItem
                  id={`volume-${volume.value}`}
                  value={volume.value}
                  className="h-5 w-5"
                />
                <Label
                  htmlFor={`volume-${volume.value}`}
                  className="cursor-pointer py-1 text-sm text-foreground/80 sm:text-base"
                >
                  {volume.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

      </div>

    </div>
  )
}
