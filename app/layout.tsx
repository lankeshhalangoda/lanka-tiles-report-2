import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ProductCategoriesProvider } from "@/components/product-categories-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lanka Tiles Report",
  description: "Mobile application for Lanka Tiles reports",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProductCategoriesProvider>
          {children}
          <Toaster />
        </ProductCategoriesProvider>
      </body>
    </html>
  )
}
