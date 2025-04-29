"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FormHeader } from "@/components/form-header"
import { ItemsList } from "@/components/items-list"
import { SignaturePad } from "@/components/signature-pad"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { ProductCategoriesCard } from "@/components/product-categories-card"
import { StatusDropdown } from "@/components/status-dropdown"
import { Plus, Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ItemsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [termsAgreed, setTermsAgreed] = useState(false)
  const [termsDialogOpen, setTermsDialogOpen] = useState(false)
  const [items, setItems] = useState([
    {
      id: 1,
      code: "FAM-LGY-7082A",
      size: "45",
      quantity: 5,
      discount: 20,
      price: 1500,
      area: "Living Room",
      storeLocation: "Colombo",
    },
  ])

  const [potentialValue, setPotentialValue] = useState("")

  // Calculate grand total
  const grandTotal = items.reduce((total, item) => {
    const itemTotal = item.price * item.quantity * (1 - item.discount / 100)
    return total + itemTotal
  }, 0)

  const handleBack = () => {
    router.push("/grid")
  }

  const handleSubmit = () => {
    if (!termsAgreed) {
      toast({
        title: "Terms and Conditions",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Report Submitted",
      description: "Your report has been successfully submitted!",
      className: "bg-[#231f20] text-white border-[#231f20]",
    })

    // Redirect to home page after 2 seconds
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  return (
    <main className="min-h-screen p-4 pb-20">
      <FormHeader />
      <ProductCategoriesCard />
      <StatusDropdown />

      <Card className="mb-6">
        <CardContent className="p-4 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Items</h2>
            <Button
              className="bg-[#f02424] hover:bg-[#d01414]"
              size="sm"
              onClick={() => {
                const newId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1
                setItems([
                  ...items,
                  {
                    id: newId,
                    code: "",
                    size: "",
                    quantity: 0,
                    discount: 0,
                    price: 0,
                    area: "",
                    storeLocation: "",
                  },
                ])
              }}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Item
            </Button>
          </div>

          <ItemsList items={items} setItems={setItems} />

          <div className="grid gap-4 mt-6">
            <div className="space-y-1">
              <Label htmlFor="potentialValue" className="text-sm">
                Potential Requirement Value
              </Label>
              <Input
                id="potentialValue"
                value={potentialValue}
                onChange={(e) => setPotentialValue(e.target.value)}
                placeholder="Enter value"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="grandTotal" className="text-sm">
                Grand Total
              </Label>
              <Input id="grandTotal" value={grandTotal.toFixed(2)} readOnly className="bg-gray-50" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-4 pt-6">
          <h2 className="text-xl font-bold mb-4">Signatures</h2>

          <div className="mb-6">
            <h3 className="font-medium mb-2">CCA's Signature</h3>
            <SignaturePad label="CCA's Signature" allowUpload={true} />
          </div>

          <div>
            <h3 className="font-medium mb-2">Customer's Signature</h3>
            <SignaturePad label="Customer's Signature" allowUpload={false} />
          </div>

          <div className="flex items-center space-x-2 mt-6">
            <Checkbox
              id="terms"
              checked={termsAgreed}
              onCheckedChange={(checked) => setTermsAgreed(checked as boolean)}
            />
            <div className="flex items-center">
              <Label htmlFor="terms" className="text-sm mr-1">
                I agree to the terms and conditions
              </Label>
              <Dialog open={termsDialogOpen} onOpenChange={setTermsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
                    <Info className="h-4 w-4 text-gray-500" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Terms and Conditions</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    <div className="mt-4 text-sm space-y-4">
                      <p>1. All prices are subject to change without prior notice.</p>
                      <p>2. Delivery will be made within 7-14 working days from the date of confirmation.</p>
                      <p>3. A 50% advance payment is required to confirm the order.</p>
                      <p>4. Goods once sold cannot be returned or exchanged.</p>
                      <p>5. Lanka Tiles is not responsible for any damage caused during installation.</p>
                      <p>6. Warranty is valid only for manufacturing defects.</p>
                      <p>7. By signing this document, you agree to all terms and conditions stated herein.</p>
                    </div>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-20">
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={handleBack} variant="outline">
            Back
          </Button>
          <Button onClick={handleSubmit} className="bg-[#f02424] hover:bg-[#d01414]">
            Submit Report
          </Button>
        </div>
      </div>
    </main>
  )
}
