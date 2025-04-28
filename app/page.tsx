"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FormHeader } from "@/components/form-header"
import { CustomerForm } from "@/components/customer-form"
import { ProductCategoriesCard } from "@/components/product-categories-card"
import { StatusDropdown } from "@/components/status-dropdown"

export default function Home() {
  const router = useRouter()
  const [selectedTileColor, setSelectedTileColor] = useState("default")

  const handleNext = () => {
    // Pass the selected tile color to the grid page
    router.push(`/grid?tileColor=${selectedTileColor}`)
  }

  return (
    <main className="min-h-screen p-4 pb-20">
      <FormHeader />
      <ProductCategoriesCard />
      <StatusDropdown />

      <Card className="mb-6">
        <CardContent className="p-4 pt-6">
          <h2 className="text-xl font-bold mb-4">Customer Information</h2>
          <CustomerForm onTileColorChange={setSelectedTileColor} />
        </CardContent>
      </Card>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-20">
        <Button onClick={handleNext} className="w-full bg-[#f02424] hover:bg-[#d01414]">
          Next: Tile Layout
        </Button>
      </div>
    </main>
  )
}
