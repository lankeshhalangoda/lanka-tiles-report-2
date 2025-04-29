"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface Fixture {
  id: string
  name: string
  image: string
  width: number
  height: number
  category: string
}

interface FixturePaletteProps {
  onDragStart: (fixture: Fixture) => void
}

export function FixturePalette({ onDragStart }: FixturePaletteProps) {
  const [activeCategory, setActiveCategory] = useState("bathroom")

  const fixtures: Fixture[] = [
    // Bathroom fixtures
    {
      id: "bathtub",
      name: "Bathtub",
      image: "/fixtures/bathtub.jpeg",
      width: 3,
      height: 2,
      category: "bathroom",
    },
    {
      id: "toilet",
      name: "Toilet",
      image: "/fixtures/toilet.webp",
      width: 2,
      height: 2,
      category: "bathroom",
    },
    {
      id: "sink",
      name: "Sink",
      image: "/fixtures/sink.jpeg",
      width: 2,
      height: 1,
      category: "bathroom",
    },
    {
      id: "shower",
      name: "Shower",
      image: "/fixtures/cube-icon.png",
      width: 2,
      height: 2,
      category: "bathroom",
    },
    // Kitchen fixtures
    {
      id: "kitchen-sink",
      name: "Kitchen Sink",
      image: "/fixtures/cube-icon.png",
      width: 2,
      height: 1,
      category: "kitchen",
    },
    {
      id: "stove",
      name: "Stove",
      image: "/fixtures/cube-icon.png",
      width: 2,
      height: 2,
      category: "kitchen",
    },
    {
      id: "refrigerator",
      name: "Refrigerator",
      image: "/fixtures/cube-icon.png",
      width: 2,
      height: 2,
      category: "kitchen",
    },
    // Bedroom fixtures
    {
      id: "bed",
      name: "Bed",
      image: "/fixtures/cube-icon.png",
      width: 4,
      height: 3,
      category: "bedroom",
    },
    {
      id: "wardrobe",
      name: "Wardrobe",
      image: "/fixtures/cube-icon.png",
      width: 3,
      height: 1,
      category: "bedroom",
    },
    {
      id: "dresser",
      name: "Dresser",
      image: "/fixtures/cube-icon.png",
      width: 2,
      height: 1,
      category: "bedroom",
    },
    // Living room fixtures
    {
      id: "sofa",
      name: "Sofa",
      image: "/fixtures/cube-icon.png",
      width: 4,
      height: 2,
      category: "living",
    },
    {
      id: "tv",
      name: "TV Stand",
      image: "/fixtures/cube-icon.png",
      width: 3,
      height: 1,
      category: "living",
    },
    {
      id: "coffee-table",
      name: "Coffee Table",
      image: "/fixtures/cube-icon.png",
      width: 2,
      height: 2,
      category: "living",
    },
  ]

  const categories = [
    { id: "bathroom", name: "Bathroom" },
    { id: "kitchen", name: "Kitchen" },
    { id: "bedroom", name: "Bedroom" },
    { id: "living", name: "Living Room" },
  ]

  const filteredFixtures = fixtures.filter((fixture) => fixture.category === activeCategory)

  const handleDragStart = (e: React.DragEvent, fixture: Fixture) => {
    e.dataTransfer.setData("fixture", JSON.stringify(fixture))
    onDragStart(fixture)
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Room Fixtures</h3>
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const currentIndex = categories.findIndex((c) => c.id === activeCategory)
                const prevIndex = (currentIndex - 1 + categories.length) % categories.length
                setActiveCategory(categories[prevIndex].id)
              }}
              className="h-7 w-7 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const currentIndex = categories.findIndex((c) => c.id === activeCategory)
                const nextIndex = (currentIndex + 1) % categories.length
                setActiveCategory(categories[nextIndex].id)
              }}
              className="h-7 w-7 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center mb-3">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-3 py-1 text-xs rounded-md ${
                  activeCategory === category.id
                    ? "bg-white shadow-sm text-[#f02424]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {filteredFixtures.map((fixture) => (
            <div
              key={fixture.id}
              className="flex flex-col items-center cursor-grab active:cursor-grabbing touch-manipulation"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, fixture)}
              onTouchStart={(e) => {
                // Create a visual feedback for touch
                const target = e.currentTarget
                target.classList.add("opacity-70", "scale-105")

                // Prepare the drag data
                const dataTransfer = new DataTransfer()
                dataTransfer.setData("fixture", JSON.stringify(fixture))

                // Create a synthetic drag event
                const dragEvent = new DragEvent("dragstart", {
                  bubbles: true,
                  cancelable: true,
                  dataTransfer: dataTransfer as any,
                })

                // Dispatch the event
                setTimeout(() => {
                  target.dispatchEvent(dragEvent)
                  onDragStart(fixture)
                }, 50)
              }}
              onTouchEnd={(e) => {
                // Remove visual feedback
                e.currentTarget.classList.remove("opacity-70", "scale-105")
              }}
            >
              <div className="relative w-16 h-16 mb-1 border rounded overflow-hidden shadow-sm hover:shadow-md transition-all duration-150">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
                <Image
                  src={fixture.image || "/placeholder.svg"}
                  alt={fixture.name}
                  fill
                  className={`object-${fixture.image.includes("cube-icon") ? "contain p-2" : "cover"}`}
                  sizes="64px"
                />
              </div>
              <span className="text-xs text-center">{fixture.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
