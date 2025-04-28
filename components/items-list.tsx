"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface Item {
  id: number
  code: string
  size: string
  quantity: number
  discount: number
  price: number
  area: string
  storeLocation: string
}

interface ItemsListProps {
  items: Item[]
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
}

export function ItemsList({ items, setItems }: ItemsListProps) {
  const updateItem = (id: number, field: keyof Item, value: string | number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const calculateItemTotal = (item: Item) => {
    return item.price * item.quantity * (1 - item.discount / 100)
  }

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <p className="text-center text-[#231f20]/60 py-4">No items added yet. Click "Add Item" to begin.</p>
      ) : (
        items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">Item #{item.id}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-red-500"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="space-y-1">
                  <Label htmlFor={`area-${item.id}`} className="text-xs">
                    Area
                  </Label>
                  <Input
                    id={`area-${item.id}`}
                    value={item.area}
                    onChange={(e) => updateItem(item.id, "area", e.target.value)}
                    placeholder="e.g. Living Room"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor={`storeLocation-${item.id}`} className="text-xs">
                    Store Location
                  </Label>
                  <Input
                    id={`storeLocation-${item.id}`}
                    value={item.storeLocation}
                    onChange={(e) => updateItem(item.id, "storeLocation", e.target.value)}
                    placeholder="e.g. Colombo"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="space-y-1">
                  <Label htmlFor={`code-${item.id}`} className="text-xs">
                    Item Code
                  </Label>
                  <Input
                    id={`code-${item.id}`}
                    value={item.code}
                    onChange={(e) => updateItem(item.id, "code", e.target.value)}
                    placeholder="e.g. FAM-LGY-7082A"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor={`size-${item.id}`} className="text-xs">
                    Size (cm)
                  </Label>
                  <Input
                    id={`size-${item.id}`}
                    value={item.size}
                    onChange={(e) => updateItem(item.id, "size", e.target.value)}
                    placeholder="e.g. 45"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="space-y-1">
                  <Label htmlFor={`quantity-${item.id}`} className="text-xs">
                    Quantity (Nos)
                  </Label>
                  <Input
                    id={`quantity-${item.id}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, "quantity", Number.parseInt(e.target.value) || 0)}
                    placeholder="e.g. 5"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor={`price-${item.id}`} className="text-xs">
                    Unit Price (Rs)
                  </Label>
                  <Input
                    id={`price-${item.id}`}
                    type="number"
                    value={item.price}
                    onChange={(e) => updateItem(item.id, "price", Number.parseFloat(e.target.value) || 0)}
                    placeholder="e.g. 1500"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor={`discount-${item.id}`} className="text-xs">
                    Discount (%)
                  </Label>
                  <Input
                    id={`discount-${item.id}`}
                    type="number"
                    value={item.discount}
                    onChange={(e) => updateItem(item.id, "discount", Number.parseInt(e.target.value) || 0)}
                    placeholder="e.g. 20"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-gray-50 px-3 py-2 rounded-md">
                  <span className="text-sm font-medium">Total: Rs {calculateItemTotal(item).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
