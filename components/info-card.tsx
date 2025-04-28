"use client"

import { Card, CardContent } from "@/components/ui/card"
import { usePathname } from "next/navigation"

export function InfoCard() {
  const pathname = usePathname()

  // Content based on current page
  const getContent = () => {
    if (pathname === "/") {
      return {
        title: "Customer Information",
        description: "Fill in customer details, construction information, and select tile colors for your project.",
      }
    } else if (pathname === "/grid") {
      return {
        title: "Tile Layout Design",
        description: "Design your tile layout by drawing on the grid and placing bathroom fixtures.",
      }
    } else if (pathname === "/items") {
      return {
        title: "Items & Signatures",
        description: "Add items to your order, calculate totals, and collect required signatures.",
      }
    }

    return {
      title: "Lanka Tiles Report",
      description: "Complete your tile project planning and ordering.",
    }
  }

  const content = getContent()

  return (
    <Card className="mb-4">
      <CardContent className="p-3">
        <h3 className="text-sm font-semibold">{content.title}</h3>
        <p className="text-xs text-gray-600">{content.description}</p>
      </CardContent>
    </Card>
  )
}
