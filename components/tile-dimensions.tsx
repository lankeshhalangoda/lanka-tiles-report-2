"use client"

import type React from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

interface TileDimensionsProps {
  dimensions: { width: number; height: number }
  setDimensions: React.Dispatch<React.SetStateAction<{ width: number; height: number }>>
}

export function TileDimensions({ dimensions, setDimensions }: TileDimensionsProps) {
  const incrementWidth = () => {
    setDimensions((prev) => ({ ...prev, width: Math.min(prev.width + 1, 20) }))
  }

  const decrementWidth = () => {
    setDimensions((prev) => ({ ...prev, width: Math.max(prev.width - 1, 2) }))
  }

  const incrementHeight = () => {
    setDimensions((prev) => ({ ...prev, height: Math.min(prev.height + 1, 20) }))
  }

  const decrementHeight = () => {
    setDimensions((prev) => ({ ...prev, height: Math.max(prev.height - 1, 2) }))
  }

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="space-y-2">
        <Label htmlFor="width">Width (cells)</Label>
        <div className="flex">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={decrementWidth}
            onTouchStart={decrementWidth}
            className="rounded-r-none"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            id="width"
            type="number"
            value={dimensions.width}
            onChange={(e) => {
              const value = Number.parseInt(e.target.value)
              if (!isNaN(value) && value >= 2 && value <= 20) {
                setDimensions((prev) => ({ ...prev, width: value }))
              }
            }}
            className="rounded-none text-center"
            min={2}
            max={20}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={incrementWidth}
            onTouchStart={incrementWidth}
            className="rounded-l-none"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="height">Height (cells)</Label>
        <div className="flex">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={decrementHeight}
            onTouchStart={decrementHeight}
            className="rounded-r-none"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            id="height"
            type="number"
            value={dimensions.height}
            onChange={(e) => {
              const value = Number.parseInt(e.target.value)
              if (!isNaN(value) && value >= 2 && value <= 20) {
                setDimensions((prev) => ({ ...prev, height: value }))
              }
            }}
            className="rounded-none text-center"
            min={2}
            max={20}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={incrementHeight}
            onTouchStart={incrementHeight}
            className="rounded-l-none"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
