"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { useProductCategories } from "./product-categories-provider"

export function ProductCategoriesDrawer() {
  const { selectedItems, setSelectedItems, drawerOpen, setDrawerOpen } = useProductCategories()

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
    <div className="fixed top-1/2 -translate-y-1/2 right-0 z-10 pointer-events-none">
      <div
        className={`flex transition-transform duration-300 pointer-events-auto ${
          drawerOpen ? "translate-x-0" : "translate-x-[calc(100%-40px)]"
        }`}
      >
        <div
          className="bg-[#f0f0f0] rounded-l-lg flex items-center justify-center w-10 h-10 cursor-pointer"
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          {drawerOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </div>

        <div className="w-[280px] max-h-[80vh] overflow-y-auto bg-white shadow-lg">
          <div className="p-5">
            <h3 className="font-semibold mb-4 text-[#231f20]">Product Categories</h3>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-start space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedItems[category.id as keyof typeof selectedItems]}
                    onCheckedChange={() => handleCheckboxChange(category.id)}
                    className="mt-0.5"
                  />
                  <Label htmlFor={category.id} className="text-sm leading-tight whitespace-pre-line">
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
