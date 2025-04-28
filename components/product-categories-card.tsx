"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useProductCategories } from "./product-categories-provider"

export function ProductCategoriesCard() {
  const { selectedItems, setSelectedItems } = useProductCategories()

  const handleCheckboxChange = (item: string) => {
    setSelectedItems({
      ...selectedItems,
      [item]: !selectedItems[item],
    })
  }

  const categories = [
    { id: "floorTiles", label: "Floor Tiles" },
    { id: "wallTiles", label: "Wall Tiles" },
    { id: "mosaicTiles", label: "Mosaic Tiles" },
    { id: "sanitaryWare", label: "Sanitary Ware" },
    { id: "faucets", label: "Faucets" },
    { id: "accessories", label: "Accessories" },
    { id: "tileMortar", label: "Tile Mortar" },
    { id: "grout", label: "Grout" },
    { id: "groutSealers", label: "Grout Sealers" },
    { id: "spacers", label: "Spacers/\nCap/Post" },
    { id: "silicon", label: "Silicon" },
    { id: "skimCoat", label: "Skim Coat" },
    { id: "waterProofer", label: "Water Proofer" },
    { id: "paint", label: "Paint" },
    { id: "cleaners", label: "Cleaners" },
    { id: "pebbles", label: "Pebbles" },
    { id: "aluminiumDoors", label: "Aluminium Doors" },
    { id: "windows", label: "Windows" },
    { id: "skirting", label: "Skirting" },
    { id: "beading", label: "Beading" },
    { id: "ladders", label: "Ladders" },
  ]

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h3 className="font-semibold mb-3 text-[#231f20]">Product Categories</h3>

        <div className="grid grid-cols-3 gap-x-4 gap-y-2 sm:grid-cols-4 md:grid-cols-5">
          {categories.map((category) => (
            <div key={category.id} className="flex items-start space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedItems[category.id as keyof typeof selectedItems]}
                onCheckedChange={() => handleCheckboxChange(category.id)}
                className="mt-0.5"
              />
              <Label htmlFor={category.id} className="text-xs leading-tight whitespace-pre-line">
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
