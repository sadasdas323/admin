"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Package, Plus } from "lucide-react"
import Link from "next/link"

export default function AddStockPage() {
  const [selectedProduct, setSelectedProduct] = useState("")
  const [quantity, setQuantity] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle stock addition logic here
    console.log("Adding stock:", { selectedProduct, quantity, notes })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tambah Stok</h1>
          <p className="text-muted-foreground">Tambahkan stok produk ke dalam inventory</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Form Penambahan Stok
          </CardTitle>
          <CardDescription>Pilih produk dan masukkan jumlah stok yang ingin ditambahkan</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="product">Pilih Produk</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih produk yang akan ditambah stoknya" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        <span>
                          {product.code} - {product.name}
                        </span>
                        <span className="text-muted-foreground">(Stok: {product.stock})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Jumlah Stok Ditambah</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Masukkan jumlah stok yang akan ditambahkan"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Catatan (Opsional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tambahkan catatan untuk penambahan stok ini..."
                rows={3}
              />
            </div>

            {selectedProduct && quantity && (
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Ringkasan Penambahan Stok:</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Produk:</span> {products.find((p) => p.id === selectedProduct)?.name}
                  </p>
                  <p>
                    <span className="font-medium">Stok Saat Ini:</span>{" "}
                    {products.find((p) => p.id === selectedProduct)?.stock}
                  </p>
                  <p>
                    <span className="font-medium">Jumlah Ditambah:</span> +{quantity}
                  </p>
                  <p>
                    <span className="font-medium">Stok Setelah Penambahan:</span>{" "}
                    {(products.find((p) => p.id === selectedProduct)?.stock || 0) + Number.parseInt(quantity || "0")}
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button type="submit" disabled={!selectedProduct || !quantity}>
                <Plus className="mr-2 h-4 w-4" />
                Tambah Stok
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/products">Batal</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

const products = [
  {
    id: "1",
    code: "P001",
    name: "Kemeja Flanel Premium",
    category: "Pakaian",
    price: 150000,
    stock: 45,
    status: "Aktif",
  },
  {
    id: "2",
    code: "P002",
    name: "Celana Chino Slim Fit",
    category: "Pakaian",
    price: 200000,
    stock: 30,
    status: "Aktif",
  },
  {
    id: "3",
    code: "P003",
    name: "Sepatu Sneakers Casual",
    category: "Sepatu",
    price: 350000,
    stock: 15,
    status: "Aktif",
  },
  {
    id: "4",
    code: "P004",
    name: "Tas Ransel Kanvas",
    category: "Aksesoris",
    price: 175000,
    stock: 20,
    status: "Aktif",
  },
  {
    id: "5",
    code: "P005",
    name: "Jaket Denim Vintage",
    category: "Pakaian",
    price: 275000,
    stock: 0,
    status: "Habis",
  },
]
