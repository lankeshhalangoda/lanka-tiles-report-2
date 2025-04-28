"use client"

import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import { usePathname } from "next/navigation"

export function FormHeader() {
  // Determine current step and progress based on URL
  const pathname = usePathname()
  let currentStep = 1
  let progress = 33

  if (pathname?.includes("/grid")) {
    currentStep = 2
    progress = 66
  } else if (pathname?.includes("/items")) {
    currentStep = 3
    progress = 100
  }

  return (
    <div className="mb-6">
      <div className="flex justify-center mb-4">
        <Image src="/lanka-tiles-logo.png" alt="Lanka Tiles Logo" width={160} height={40} className="h-10 w-auto" />
      </div>

      <Progress value={progress} className="h-2" />
    </div>
  )
}
