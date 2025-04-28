"use client"

import { createContext, useState, useContext, type ReactNode } from "react"

interface ProductCategoriesContextType {
  selectedItems: Record<string, boolean>
  setSelectedItems: (items: Record<string, boolean>) => void
}

const ProductCategoriesContext = createContext<ProductCategoriesContextType | undefined>(undefined)

export function ProductCategoriesProvider({ children }: { children: ReactNode }) {
  const [selectedItems, setSelectedItems] = useState({
    floorTiles: true,
    wallTiles: true,
    mosaicTiles: true,
    sanitaryWare: false,
    faucets: false,
    accessories: false,
    tileMortar: true,
    grout: true,
    groutSealers: true,
    spacers: true,
    silicon: false,
    skimCoat: false,
    waterProofer: false,
    paint: false,
    cleaners: true,
    pebbles: false,
    aluminiumDoors: false,
    windows: false,
    skirting: false,
    beading: false,
    ladders: false,
  })

  return (
    <ProductCategoriesContext.Provider value={{ selectedItems, setSelectedItems }}>
      {children}
    </ProductCategoriesContext.Provider>
  )
}

export function useProductCategories() {
  const context = useContext(ProductCategoriesContext)
  if (context === undefined) {
    throw new Error("useProductCategories must be used within a ProductCategoriesProvider")
  }
  return context
}
