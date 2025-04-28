import Image from "next/image"

export function FormHeader() {
  const steps = [
    { id: 1, name: "Customer Details" },
    { id: 2, name: "Tile Layout" },
    { id: 3, name: "Items & Signature" },
  ]

  // Determine current step based on URL
  let currentStep = 1
  if (typeof window !== "undefined") {
    const path = window.location.pathname
    if (path.includes("/grid")) currentStep = 2
    else if (path.includes("/items")) currentStep = 3
  }

  return (
    <div className="mb-2">
      <div className="flex justify-center mb-4">
        <Image src="/lanka-tiles-logo.png" alt="Lanka Tiles Logo" width={160} height={40} className="h-10 w-auto" />
      </div>

      <div className="flex justify-between mb-2">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`text-xs font-medium ${step.id === currentStep ? "text-[#f02424]" : "text-[#231f20]/60"}`}
          >
            {step.name}
          </div>
        ))}
      </div>

      <div className="flex mb-2">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`h-1 flex-1 ${
              step.id <= currentStep ? "bg-[#f02424]" : "bg-gray-200"
            } ${step.id !== steps.length ? "mr-1" : ""}`}
          />
        ))}
      </div>
    </div>
  )
}
