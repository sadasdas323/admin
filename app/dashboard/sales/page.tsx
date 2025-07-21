"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { BarcodeScannerDialog } from "@/components/sales/barcode-scanner-dialog"
import { PlusCircle, MinusCircle, Scan, Truck } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  stock: number
}

interface CartItem {
  product: Product
  quantity: number
}

interface Sale {
  id: string
  date: string
  customer: string
  source: string
  trackingNumber?: string
  status: "Completed" | "Pending" | "Cancelled"
  total: number
}

const dummyProducts: Product[] = [
  { id: "PROD001", name: "Kuas Cat", price: 25000, stock: 100 },
  { id: "PROD002", name: "Palu", price: 50000, stock: 50 },
  { id: "PROD003", name: "Obeng Set", price: 75000, stock: 75 },
  { id: "PROD004", name: "Meteran", price: 30000, stock: 120 },
  { id: "PROD005", name: "Gergaji", price: 120000, stock: 30 },
]

const dummySales: Sale[] = [
  {
    id: "SALE001",
    date: "2023-10-26",
    customer: "Budi Santoso",
    source: "Online",
    trackingNumber: "TRK123456789",
    status: "Completed",
    total: 150000,
  },
  {
    id: "SALE002",
    date: "2023-10-25",
    customer: "Siti Aminah",
    source: "Offline",
    trackingNumber: undefined,
    status: "Pending",
    total: 75000,
  },
  {
    id: "SALE003",
    date: "2023-10-24",
    customer: "Joko Susilo",
    source: "Online",
    trackingNumber: "TRK987654321",
    status: "Completed",
    total: 200000,
  },
  {
    id: "SALE004",
    date: "2023-10-23",
    customer: "Dewi Lestari",
    source: "Offline",
    trackingNumber: undefined,
    status: "Cancelled",
    total: 45000,
  },
  {
    id: "SALE005",
    date: "2023-10-22",
    customer: "Agus Salim",
    source: "Online",
    trackingNumber: "TRK112233445",
    status: "Completed",
    total: 90000,
  },
]

export default function SalesPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [trackingNumber, setTrackingNumber] = useState<string>("")
  const [isProductScannerOpen, setIsProductScannerOpen] = useState(false)
  const [isTrackingScannerOpen, setIsTrackingScannerOpen] = useState(false)

  const addProductToCart = (productId: string) => {
    const existingItem = cart.find((item) => item.product.id === productId)
    const productToAdd = dummyProducts.find((p) => p.id === productId)

    if (!productToAdd) {
      console.log("Product not found:", productId)
      return
    }

    if (existingItem) {
      setCart(cart.map((item) => (item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { product: productToAdd, quantity: 1 }])
    }
  }

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) => (item.product.id === productId ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
      return updatedCart
    })
  }

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const calculateTotal = () => {
    // For simplicity, let's assume no tax or discount for now
    return calculateSubtotal()
  }

  const handleProductScan = (scannedData: string) => {
    addProductToCart(scannedData)
    setIsProductScannerOpen(false)
  }

  const handleTrackingScan = (scannedData: string) => {
    setTrackingNumber(scannedData)
    setIsTrackingScannerOpen(false)
  }

  const getBadgeVariant = (status: Sale["status"]) => {
    switch (status) {
      case "Completed":
        return "default"
      case "Pending":
        return "secondary"
      case "Cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Manajemen Penjualan</h2>
      </div>
      <Separator />
      <Tabs defaultValue="live-sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="live-sales">Penjualan Langsung</TabsTrigger>
          <TabsTrigger value="sales-history">Riwayat Penjualan</TabsTrigger>
        </TabsList>
        <TabsContent value="live-sales" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Input Penjualan</CardTitle>
                <CardDescription>Tambahkan produk ke keranjang dan proses penjualan.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Nomor Resi Pengiriman"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={() => setIsTrackingScannerOpen(true)} variant="outline" size="icon">
                    <Truck className="h-4 w-4" />
                    <span className="sr-only">Scan Tracking Number</span>
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Scan Barcode Produk atau Masukkan ID"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addProductToCart(e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                    className="flex-1"
                  />
                  <Button onClick={() => setIsProductScannerOpen(true)} variant="outline" size="icon">
                    <Scan className="h-4 w-4" />
                    <span className="sr-only">Scan Product Barcode</span>
                  </Button>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Keranjang Belanja</h3>
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground">Keranjang kosong.</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Produk</TableHead>
                          <TableHead className="w-[100px] text-center">Jumlah</TableHead>
                          <TableHead className="text-right">Harga</TableHead>
                          <TableHead className="text-right">Subtotal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cart.map((item) => (
                          <TableRow key={item.product.id}>
                            <TableCell className="font-medium">{item.product.name}</TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center space-x-1">
                                <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.product.id, -1)}>
                                  <MinusCircle className="h-4 w-4" />
                                </Button>
                                <span>{item.quantity}</span>
                                <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.product.id, 1)}>
                                  <PlusCircle className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              Rp {item.product.price.toLocaleString("id-ID")}
                            </TableCell>
                            <TableCell className="text-right">
                              Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>Rp {calculateTotal().toLocaleString("id-ID")}</span>
                </div>
                <Button className="w-full">Proses Pembayaran</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Detail Pelanggan</CardTitle>
                <CardDescription>Informasi pelanggan untuk penjualan ini.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Placeholder for customer details */}
                <p className="text-muted-foreground">Fitur manajemen pelanggan akan datang.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="sales-history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Penjualan</CardTitle>
              <CardDescription>Daftar semua transaksi penjualan yang tercatat.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID Penjualan</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Pelanggan</TableHead>
                      <TableHead>Sumber</TableHead>
                      <TableHead>Nomor Resi</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummySales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell className="font-medium">{sale.id}</TableCell>
                        <TableCell>{sale.date}</TableCell>
                        <TableCell>{sale.customer}</TableCell>
                        <TableCell>{sale.source}</TableCell>
                        <TableCell>{sale.trackingNumber || "-"}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={getBadgeVariant(sale.status)}>{sale.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">Rp {sale.total.toLocaleString("id-ID")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <BarcodeScannerDialog
        isOpen={isProductScannerOpen}
        onClose={() => setIsProductScannerOpen(false)}
        onScan={handleProductScan}
        scanType="product"
      />
      <BarcodeScannerDialog
        isOpen={isTrackingScannerOpen}
        onClose={() => setIsTrackingScannerOpen(false)}
        onScan={handleTrackingScan}
        scanType="tracking"
      />
    </div>
  )
}
