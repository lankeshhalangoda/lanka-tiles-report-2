"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function StatusDropdown() {
  return (
    <div className="mb-4 mt-4 grid grid-cols-3 gap-4">
      <div>
        <Label htmlFor="status" className="text-xs mb-1 block">
          Status
        </Label>
        <Select defaultValue="invoice">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="invoice">Invoice</SelectItem>
            <SelectItem value="quotation">Quotation</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="formNo" className="text-xs mb-1 block">
          Form No.
        </Label>
        <Input id="formNo" placeholder="e.g. 52283" />
      </div>

      <div>
        <Label htmlFor="contactNo" className="text-xs mb-1 block">
          Contact No.
        </Label>
        <Input id="contactNo" placeholder="e.g. 077 123 4567" />
      </div>
    </div>
  )
}
