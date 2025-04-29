"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

// Define tile colors with their corresponding image paths
export const tileOptions = [
  { name: "Default (Plain)", value: "default", imagePath: null },
  { name: "Ivory White", value: "ivory-white", imagePath: "/tiles/tile-ivory.jpeg" },
  { name: "Charcoal Grey", value: "charcoal-grey", imagePath: "/tiles/tile-grey.jpeg" },
  { name: "Beige", value: "beige", imagePath: "/tiles/tile-ivory.jpeg" },
  { name: "Terracotta", value: "terracotta", imagePath: "/tiles/tile-grey.jpeg" },
  { name: "Rustic Brown", value: "rustic-brown", imagePath: "/tiles/tile-grey.jpeg" },
  { name: "Midnight Black", value: "midnight-black", imagePath: "/tiles/tile-grey.jpeg" },
  { name: "Ocean Blue", value: "ocean-blue", imagePath: "/tiles/tile-grey.jpeg" },
  { name: "Forest Green", value: "forest-green", imagePath: "/tiles/tile-grey.jpeg" },
  { name: "Burgundy Red", value: "burgundy-red", imagePath: "/tiles/tile-grey.jpeg" },
  { name: "Sandstone", value: "sandstone", imagePath: "/tiles/tile-ivory.jpeg" },
]

interface CustomerFormProps {
  onTileColorChange?: (color: string) => void
}

export function CustomerForm({ onTileColorChange }: CustomerFormProps) {
  const [constructionType, setConstructionType] = useState("new")
  const [constructionStage, setConstructionStage] = useState("foundation")
  const [selectedTileColor, setSelectedTileColor] = useState("default")
  const [customerRole, setCustomerRole] = useState("homeowner")

  const handleTileColorChange = (value: string) => {
    setSelectedTileColor(value)
    if (onTileColorChange) {
      onTileColorChange(value)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input id="customerName" placeholder="Enter customer name" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="customerRole">Customer Role</Label>
            <Select defaultValue={customerRole} onValueChange={setCustomerRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="homeowner">House Owner</SelectItem>
                <SelectItem value="contractor">Contractor</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="mason">Mason</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" placeholder="Enter address" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="tilerName">Tiler Name</Label>
          <Input id="tilerName" placeholder="Enter tiler name" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="tilerContact">Tiler Contact</Label>
          <Input id="tilerContact" placeholder="Enter tiler contact" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="time">Time</Label>
            <Input id="time" type="time" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Construction Type</h3>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant={constructionType === "new" ? "default" : "outline"}
            className={`${
              constructionType === "new" ? "bg-[#fde8e8] text-[#231f20] hover:bg-[#fbd5d5] border border-[#f8b4b4]" : ""
            } w-full`}
            onClick={() => setConstructionType("new")}
          >
            New
          </Button>
          <Button
            type="button"
            variant={constructionType === "renovation" ? "default" : "outline"}
            className={`${
              constructionType === "renovation"
                ? "bg-[#fde8e8] text-[#231f20] hover:bg-[#fbd5d5] border border-[#f8b4b4]"
                : ""
            } w-full`}
            onClick={() => setConstructionType("renovation")}
          >
            Renovation
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Construction Stage</h3>
        <div className="grid grid-cols-3 gap-4">
          <Button
            type="button"
            variant={constructionStage === "foundation" ? "default" : "outline"}
            className={`${
              constructionStage === "foundation"
                ? "bg-[#fde8e8] text-[#231f20] hover:bg-[#fbd5d5] border border-[#f8b4b4]"
                : ""
            } w-full`}
            onClick={() => setConstructionStage("foundation")}
          >
            Foundation
          </Button>
          <Button
            type="button"
            variant={constructionStage === "roofingLevel" ? "default" : "outline"}
            className={`${
              constructionStage === "roofingLevel"
                ? "bg-[#fde8e8] text-[#231f20] hover:bg-[#fbd5d5] border border-[#f8b4b4]"
                : ""
            } w-full`}
            onClick={() => setConstructionStage("roofingLevel")}
          >
            Roofing Level
          </Button>
          <Button
            type="button"
            variant={constructionStage === "finishing" ? "default" : "outline"}
            className={`${
              constructionStage === "finishing"
                ? "bg-[#fde8e8] text-[#231f20] hover:bg-[#fbd5d5] border border-[#f8b4b4]"
                : ""
            } w-full`}
            onClick={() => setConstructionStage("finishing")}
          >
            Finishing
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Referencing Tile Colors</h3>
        <Select onValueChange={handleTileColorChange} value={selectedTileColor}>
          <SelectTrigger>
            <SelectValue placeholder="Select tile color" />
          </SelectTrigger>
          <SelectContent>
            {tileOptions.map((tile) => (
              <SelectItem key={tile.value} value={tile.value}>
                {tile.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
