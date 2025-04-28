"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Eraser, Pencil, Trash2 } from "lucide-react"
import { tileOptions } from "./customer-form"
import Image from "next/image"
import type { Fixture } from "./fixture-palette"

interface DrawableGridProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  dimensions: { width: number; height: number }
  selectedTileColor?: string
}

interface PlacedFixture extends Fixture {
  x: number
  y: number
}

export function DrawableGrid({ canvasRef, dimensions, selectedTileColor = "default" }: DrawableGridProps) {
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState<"pencil" | "eraser">("pencil")
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 300 })
  const [tileImagePath, setTileImagePath] = useState<string | null>(null)
  const [cellSize, setCellSize] = useState({ width: 60, height: 60 })
  const gridRef = useRef<HTMLDivElement>(null)
  const [placedFixtures, setPlacedFixtures] = useState<PlacedFixture[]>([])
  const [draggedFixture, setDraggedFixture] = useState<Fixture | null>(null)
  const [isDraggingPlaced, setIsDraggingPlaced] = useState(false)
  const [draggedPlacedIndex, setDraggedPlacedIndex] = useState<number>(-1)
  const containerRef = useRef<HTMLDivElement>(null)

  // Helper function to handle touch-to-drag conversion
  const touchToDrag = (touch: Touch, element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    return {
      clientX: touch.clientX,
      clientY: touch.clientY,
      offsetX: touch.clientX - rect.left,
      offsetY: touch.clientY - rect.top,
    }
  }

  // Helper to create and dispatch a drag event
  const createDragEvent = (eventType: string, touch: Touch, target: HTMLElement) => {
    const touchPoint = touchToDrag(touch, target)

    // Create a synthetic mouse event
    const event = new MouseEvent(eventType, {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: touchPoint.clientX,
      clientY: touchPoint.clientY,
    })

    // Add dataTransfer property for drag events
    Object.defineProperty(event, "dataTransfer", {
      value: new DataTransfer(),
      writable: false,
    })

    return event
  }

  // Update tile image path when selected color changes
  useEffect(() => {
    const selectedTile = tileOptions.find((tile) => tile.value === selectedTileColor)
    if (selectedTile) {
      setTileImagePath(selectedTile.imagePath)
    }
  }, [selectedTileColor])

  useEffect(() => {
    // Set grid size based on container width
    const updateGridSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 2 // Subtract border width

        // Calculate the height based on the aspect ratio of dimensions
        const containerHeight = (containerWidth / dimensions.width) * dimensions.height

        setCanvasSize({
          width: containerWidth,
          height: containerHeight,
        })

        // Calculate cell size based on dimensions
        setCellSize({
          width: containerWidth / dimensions.width,
          height: containerHeight / dimensions.height,
        })
      }
    }

    updateGridSize()

    const resizeObserver = new ResizeObserver(updateGridSize)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    window.addEventListener("resize", updateGridSize)

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
      window.removeEventListener("resize", updateGridSize)
    }
  }, [dimensions, containerRef])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = canvasSize.width
    canvas.height = canvasSize.height

    const context = canvas.getContext("2d", { willReadFrequently: true })
    if (!context) return

    context.lineCap = "round"
    context.strokeStyle = "#231f20"
    context.lineWidth = 2
    contextRef.current = context
  }, [canvasRef, canvasSize])

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
    context.strokeStyle = tool === "pencil" ? "#231f20" : "#ffffff"
    context.lineWidth = tool === "pencil" ? 2 : 10
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
    const canvas = canvasRef.current
    const context = contextRef.current
    if (!canvas || !context) return

    context.clearRect(0, 0, canvas.width, canvas.height)

    // Also clear all fixtures
    setPlacedFixtures([])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent | React.TouchEvent) => {
    e.preventDefault()

    if (!gridRef.current) return

    const gridRect = gridRef.current.getBoundingClientRect()
    let clientX, clientY

    // Handle both drag and touch events
    if ("touches" in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else if ("changedTouches" in e && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX
      clientY = e.changedTouches[0].clientY
    } else if ("clientX" in e) {
      clientX = e.clientX
      clientY = e.clientY
    } else {
      return // Exit if we can't determine position
    }

    const x = clientX - gridRect.left
    const y = clientY - gridRect.top

    // Calculate grid cell position
    const cellX = Math.floor(x / cellSize.width)
    const cellY = Math.floor(y / cellSize.height)

    if (isDraggingPlaced) {
      // Moving an existing fixture
      if (draggedPlacedIndex >= 0) {
        const updatedFixtures = [...placedFixtures]
        updatedFixtures[draggedPlacedIndex] = {
          ...updatedFixtures[draggedPlacedIndex],
          x: cellX,
          y: cellY,
        }
        setPlacedFixtures(updatedFixtures)
      }
      setIsDraggingPlaced(false)
      setDraggedPlacedIndex(-1)
    } else if (draggedFixture) {
      // Adding a new fixture from draggedFixture state
      if (cellX + draggedFixture.width <= dimensions.width && cellY + draggedFixture.height <= dimensions.height) {
        setPlacedFixtures([
          ...placedFixtures,
          {
            ...draggedFixture,
            x: cellX,
            y: cellY,
          },
        ])
      }
    } else {
      // Try to get fixture data from dataTransfer
      const dataTransfer = "dataTransfer" in e ? e.dataTransfer : null
      if (dataTransfer) {
        const fixtureData = dataTransfer.getData("fixture")
        if (fixtureData) {
          try {
            const fixture = JSON.parse(fixtureData) as Fixture

            // Check if fixture fits within grid
            if (cellX + fixture.width <= dimensions.width && cellY + fixture.height <= dimensions.height) {
              setPlacedFixtures([
                ...placedFixtures,
                {
                  ...fixture,
                  x: cellX,
                  y: cellY,
                },
              ])
            }
          } catch (error) {
            console.error("Error parsing fixture data:", error)
          }
        }
      }
    }

    setDraggedFixture(null)
  }

  const handleFixtureDragStart = (fixture: Fixture) => {
    setDraggedFixture(fixture)
  }

  const handlePlacedFixtureDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("fixtureIndex", index.toString())
    setIsDraggingPlaced(true)
    setDraggedPlacedIndex(index)
  }

  const removeFixture = (index: number) => {
    const updatedFixtures = [...placedFixtures]
    updatedFixtures.splice(index, 1)
    setPlacedFixtures(updatedFixtures)
  }

  // Generate grid cells based on dimensions
  const renderGridCells = () => {
    const cells = []
    for (let y = 0; y < dimensions.height; y++) {
      for (let x = 0; x < dimensions.width; x++) {
        cells.push(
          <div
            key={`${x}-${y}`}
            className="relative border border-gray-300"
            style={{
              width: cellSize.width,
              height: cellSize.height,
            }}
          >
            {tileImagePath && (
              <Image
                src={tileImagePath || "/placeholder.svg"}
                alt="Tile"
                fill
                sizes={`${cellSize.width}px`}
                className="object-cover"
              />
            )}
          </div>,
        )
      }
    }
    return cells
  }

  // Render placed fixtures
  const renderFixtures = () => {
    return placedFixtures.map((fixture, index) => (
      <div
        key={`fixture-${index}`}
        className="absolute border-2 border-blue-500 cursor-move bg-white/80 z-20 touch-manipulation"
        style={{
          left: fixture.x * cellSize.width,
          top: fixture.y * cellSize.height,
          width: fixture.width * cellSize.width,
          height: fixture.height * cellSize.height,
        }}
        draggable="true"
        onDragStart={(e) => handlePlacedFixtureDragStart(e, index)}
        onTouchStart={(e) => {
          // Visual feedback
          const target = e.currentTarget
          target.classList.add("opacity-90", "scale-105", "shadow-lg")

          // Set up drag data
          setIsDraggingPlaced(true)
          setDraggedPlacedIndex(index)

          // Create synthetic drag event
          const dataTransfer = new DataTransfer()
          dataTransfer.setData("fixtureIndex", index.toString())

          const dragEvent = new DragEvent("dragstart", {
            bubbles: true,
            cancelable: true,
            dataTransfer: dataTransfer as any,
          })

          setTimeout(() => {
            target.dispatchEvent(dragEvent)
          }, 50)
        }}
        onTouchEnd={(e) => {
          // Remove visual feedback
          e.currentTarget.classList.remove("opacity-90", "scale-105", "shadow-lg")
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src={fixture.image || "/placeholder.svg"}
            alt={fixture.name}
            fill
            className="object-cover p-1"
            sizes={`${fixture.width * cellSize.width}px`}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 flex justify-between items-center">
            <span className="truncate pr-1">{fixture.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                removeFixture(index)
              }}
              className="p-1 hover:text-red-300"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    ))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between mb-2">
        <div className="flex space-x-2">
          <Button
            variant={tool === "pencil" ? "default" : "outline"}
            size="sm"
            onClick={() => setTool("pencil")}
            className={tool === "pencil" ? "bg-[#f02424] hover:bg-[#d01414]" : ""}
          >
            <Pencil className="h-4 w-4 mr-1" /> Draw
          </Button>
          <Button
            variant={tool === "eraser" ? "default" : "outline"}
            size="sm"
            onClick={() => setTool("eraser")}
            className={tool === "eraser" ? "bg-[#f02424] hover:bg-[#d01414]" : ""}
          >
            <Eraser className="h-4 w-4 mr-1" /> Erase
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={clearCanvas}>
          Clear All
        </Button>
      </div>

      <div className="border rounded-md overflow-hidden relative w-full touch-manipulation" ref={containerRef}>
        <div
          className="relative"
          ref={gridRef}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onTouchEnd={(e) => {
            if (draggedFixture) {
              e.preventDefault()
              handleDrop(e)
            }
          }}
          style={{
            width: canvasSize.width,
            height: canvasSize.height,
          }}
        >
          {/* Tile grid */}
          <div
            className="grid absolute top-0 left-0 z-0"
            style={{
              gridTemplateColumns: `repeat(${dimensions.width}, ${cellSize.width}px)`,
              gridTemplateRows: `repeat(${dimensions.height}, ${cellSize.height}px)`,
              width: canvasSize.width,
              height: canvasSize.height,
            }}
          >
            {renderGridCells()}
          </div>

          {/* Placed fixtures */}
          {renderFixtures()}

          {/* Drawing canvas */}
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
            className="touch-none absolute top-0 left-0 z-10 bg-transparent"
          />
        </div>
      </div>
      <p className="text-xs text-[#231f20]/70 text-center">
        Draw your tile layout on the grid. Use the pencil to draw and eraser to remove lines. Drag and drop fixtures
        from the palette above.
      </p>
    </div>
  )
}
