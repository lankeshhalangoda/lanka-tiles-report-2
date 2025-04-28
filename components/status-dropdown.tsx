import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function StatusDropdown() {
  return (
    <div className="mb-4 mt-4">
      <Select defaultValue="invoice">
        <SelectTrigger className="w-[140px]">
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
  )
}
