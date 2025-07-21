"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Package, DollarSign, ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // Mock product data - In a real application, you would fetch this from a database
  const product = {
    id: params.id,
    code: "P001",
    name: "Kemeja Flanel Premium",
    category: "Pakaian",
    description:
      "Kemeja flanel berkualitas tinggi dengan desain modern dan bahan yang nyaman. Cocok untuk gaya kasual sehari-hari.",
    cogs: 100000,
    operationalPacking: 5000,
    budgetIklan: 2500,
    diskonLive: 5000,
    biayaLainLain: 2500,
    margin: 35000,
    persentaseAfiliasi: 10.5,
    persentaseAdminMarketplace: 15.0,
    persentaseUpHargaCoret: 10.0,
    stock: 45,
    minStock: 10,
    weight: 300, // in grams
    dimensions: "30 x 20 x 5 cm",
    brand: "Fashionista",
    supplier: "PT. Tekstil Jaya",
    isActive: true,
    catatan: "Produk best seller, perlu restock rutin.",
    images: [
      "/placeholder.svg?height=200&width=200&text=Product+Image+1",
      "/placeholder.svg?height=200&width=200&text=Product+Image+2",
      "/placeholder.svg?height=200&width=200&text=Product+Image+3",
    ],
  }

  // Calculate selling price based on calculator logic (replicated from new/page.tsx)
  const calculatedPrice = (() => {
    const {
      cogs,
      operationalPacking,
      budgetIklan,
      diskonLive,
      biayaLainLain,
      margin,
      persentaseAfiliasi,
      persentaseAdminMarketplace,
      persentaseUpHargaCoret,
    } = product

    const other = (budgetIklan || 0) + (diskonLive || 0) + (biayaLainLain || 0)
    const hpp2 = (cogs || 0) + (operationalPacking || 0) + other + (margin || 0)
    const biayaAdmin = hpp2 * ((persentaseAdminMarketplace || 0) / 100)
    const affiliasi = hpp2 * ((persentaseAfiliasi || 0) / 100)
    const hargaJual = hpp2 + biayaAdmin + affiliasi
    const hargaFinal = hargaJual * (1 + (persentaseUpHargaCoret || 0) / 100)

    return hargaFinal
  })()

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Detail Produk</h1>
        <div className="ml-auto">
          <Button asChild>
            <Link href={`/dashboard/products/${product.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Produk
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Informasi Produk
            </CardTitle>
            <CardDescription>Detail lengkap mengenai {product.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Nama Produk</Label>
                <p className="text-base">{product.name}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">Kode Produk</Label>
                <p className="text-base">{product.code}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Kategori</Label>
                <p className="text-base">{product.category}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">Brand</Label>
                <p className="text-base">{product.brand || "-"}</p>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-medium">Deskripsi</Label>
              <p className="text-base text-muted-foreground">{product.description || "-"}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Supplier</Label>
                <p className="text-base">{product.supplier || "-"}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">Status</Label>
                <Badge variant={product.isActive ? "default" : "destructive"}>
                  {product.isActive ? "Aktif" : "Tidak Aktif"}
                </Badge>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-medium">Catatan</Label>
              <p className="text-base text-muted-foreground">{product.catatan || "-"}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Harga & Stok
            </CardTitle>
            <CardDescription>Informasi harga dan ketersediaan produk</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Harga Jual</Label>
              <p className="text-2xl font-bold text-primary">Rp {calculatedPrice.toLocaleString("id-ID")}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm font-medium">COGS (HPP)</Label>
                <p className="text-base">Rp {product.cogs.toLocaleString("id-ID")}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">Operasional Packing</Label>
                <p className="text-base">Rp {product.operationalPacking.toLocaleString("id-ID")}</p>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium">Biaya Other</Label>
              <p className="text-base">
                Rp {(product.budgetIklan + product.diskonLive + product.biayaLainLain).toLocaleString("id-ID")}
              </p>
              <p className="text-xs text-muted-foreground">
                (Iklan: Rp {product.budgetIklan.toLocaleString("id-ID")}, Diskon Live: Rp{" "}
                {product.diskonLive.toLocaleString("id-ID")}, Lain-lain: Rp{" "}
                {product.biayaLainLain.toLocaleString("id-ID")})
              </p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium">Margin</Label>
              <p className="text-base">Rp {product.margin.toLocaleString("id-ID")}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Persentase Affiliasi</Label>
                <p className="text-base">{product.persentaseAfiliasi}%</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">Persentase Admin Marketplace</Label>
                <p className="text-base">{product.persentaseAdminMarketplace}%</p>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium">Persentase Up Harga Coret</Label>
              <p className="text-base">{product.persentaseUpHargaCoret}%</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Stok Saat Ini</Label>
                <p className="text-base">{product.stock} unit</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">Stok Minimum</Label>
                <p className="text-base">{product.minStock} unit</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Berat</Label>
                <p className="text-base">{product.weight} gram</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">Dimensi</Label>
                <p className="text-base">{product.dimensions || "-"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Gambar Produk
            </CardTitle>
            <CardDescription>Galeri gambar produk</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {product.images.length > 0 ? (
                product.images.map((src, index) => (
                  <div key={index} className="relative w-full aspect-square rounded-md overflow-hidden border">
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`Product Image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-200 hover:scale-105"
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-muted-foreground py-4">Tidak ada gambar produk.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
