"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FormHeader } from "@/components/form-header"
import { DrawableGrid } from "@/components/drawable-grid"
import { TileDimensions } from "@/components/tile-dimensions"
import { ProductCategoriesCard } from "@/components/product-categories-card"
import { StatusDropdown } from "@/components/status-dropdown"
import { FixturePalette } from "@/components/fixture-palette"
import { useSearchParams } from "next/navigation"

export default function GridPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 5, height: 5 })

  // Get the selected tile color from URL params
  const selectedTileColor = searchParams.get("tileColor") || "default"

  const handleNext = () => {
    router.push("/items")
  }

  const handleBack = () => {
    router.push("/")
  }

  const handleFixtureDragStart = (fixture: any) => {
    // This will be passed to the DrawableGrid component
  }

  return (
    <main className="min-h-screen p-4 pb-20">
      <FormHeader />
      <ProductCategoriesCard />
      <StatusDropdown />

      <FixturePalette onDragStart={handleFixtureDragStart} />

      <Card className="mb-6">
        <CardContent className="p-4 pt-6">
          <h2 className="text-xl font-bold mb-4">Tile Layout</h2>
          <p className="text-sm text-gray-600 mb-4">
            Draw the tile layout by selecting dimensions and drawing on the grid.
          </p>

          <TileDimensions dimensions={dimensions} setDimensions={setDimensions} />

          <DrawableGrid canvasRef={canvasRef} dimensions={dimensions} selectedTileColor={selectedTileColor} />
        </CardContent>
      </Card>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-20">
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={handleBack} variant="outline">
            Back
          </Button>
          <Button onClick={handleNext} className="bg-[#f02424] hover:bg-[#d01414]">
            Next: Items
          </Button>
        </div>
      </div>
    </main>
  )
}
