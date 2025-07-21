"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, QrCode } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function ProductQRCodePage({ params }: { params: { id: string } }) {
  const { toast } = useToast()

  const handlePrint = () => {
    window.print()
    toast({
      title: "QR Code dicetak",
      description: "QR Code produk berhasil dicetak.",
    })
  }

  const handleDownload = () => {
    toast({
      title: "QR Code diunduh",
      description: "QR Code produk berhasil diunduh.",
    })
  }

  // Mock product data
  const product = {
    id: params.id,
    name: "Kemeja Flanel Premium",
    code: "P001",
    price: 150000,
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">QR Code Produk</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              QR Code
            </CardTitle>
            <CardDescription>
              QR Code untuk produk {product.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-white border-2 border-gray-200 rounded-lg">
              <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="h-16 w-16 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">QR Code untuk {product.code}</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-muted-foreground">Kode: {product.code}</p>
              <p className="text-sm text-muted-foreground">Harga: Rp {product.price.toLocaleString("id-ID")}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informasi Produk</CardTitle>
            <CardDescription>Detail produk yang terkait dengan QR Code</CardDescription>
          </Car\
