"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface SignaturePadProps {
  label: string
  allowUpload?: boolean
}

export function SignaturePad({ label, allowUpload = true }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 150 })
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas size based on container width
    const updateCanvasSize = () => {
      const containerWidth = Math.min(window.innerWidth - 40, 500)
      setCanvasSize({
        width: containerWidth,
        height: containerWidth / 2,
      })
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [])

  useEffect(() => {
    if (uploadedImage) return // Don't initialize canvas if we have an uploaded image

    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = canvasSize.width
    canvas.height = canvasSize.height

    const context = canvas.getContext("2d")
    if (!context) return

    context.lineCap = "round"
    context.strokeStyle = "#231f20"
    context.lineWidth = 2
    contextRef.current = context
  }, [canvasRef, canvasSize, uploadedImage])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const context = contextRef.current
    if (!canvas || !context) return

    setIsDrawing(true)

    const rect = canvas.getBoundingClientRect()
    let clientX, clientY

    if ("touches" in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const x = clientX - rect.left
    const y = clientY - rect.top

    context.beginPath()
    context.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const context = contextRef.current
    if (!canvas || !context) return

    const rect = canvas.getBoundingClientRect()
    let clientX, clientY

    if ("touches" in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
      e.preventDefault() // Prevent scrolling while drawing
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const x = clientX - rect.left
    const y = clientY - rect.top

    context.lineTo(x, y)
    context.stroke()
  }

  const stopDrawing = () => {
    const context = contextRef.current
    if (!context) return

    context.closePath()
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    setUploadedImage(null)

    const canvas = canvasRef.current
    const context = contextRef.current
    if (!canvas || !context) return

    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadedImage(event.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-2">
      {uploadedImage ? (
        <div className="border rounded-md overflow-hidden bg-white p-2">
          <img
            src={uploadedImage || "/placeholder.svg"}
            alt={`Uploaded ${label}`}
            className="max-h-[150px] mx-auto object-contain"
          />
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden bg-white">
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="touch-none"
          />
        </div>
      )}

      <div className="flex justify-between">
        {allowUpload && (
          <div className="flex items-center">
            <Input
              type="file"
              id={`upload-${label.replace(/\s+/g, "-").toLowerCase()}`}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <Label
              htmlFor={`upload-${label.replace(/\s+/g, "-").toLowerCase()}`}
              className="flex items-center text-xs cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md"
            >
              <Upload className="h-3 w-3 mr-1" />
              Upload
            </Label>
          </div>
        )}

        <Button variant="outline" size="sm" onClick={clearCanvas}>
          Clear
        </Button>
      </div>
    </div>
  )
}
