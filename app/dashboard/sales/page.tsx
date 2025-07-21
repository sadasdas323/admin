"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ArrowDownUp, BarChart3, Calendar, Download, Plus, QrCode, Search, ShoppingBag, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarcodeScannerDialog } from "@/components/sales/barcode-scanner-dialog" // Import the new component

interface Product {
  id: string
  name: string
  price: number
  stock: number
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

const availableProducts: Product[] = [
  { id: "P001", name: "Kemeja Flanel Premium", price: 150000, stock: 25 },
  { id: "P002", name: "Celana Chino Slim Fit", price: 200000, stock: 18 },
  { id: "P003", name: "Jaket Denim Vintage", price: 275000, stock: 12 },
  { id: "P004", name: "Kaos Polo Classic", price: 85000, stock: 30 },
  { id: "P005", name: "Sepatu Sneakers Canvas", price: 225000, stock: 15 },
  { id: "P006", name: "Tas Ransel Laptop", price: 180000, stock: 20 },
  { id: "P007", name: "Topi Baseball", price: 50000, stock: 40 },
  { id: "P008", name: "Jam Tangan Kulit", price: 300000, stock: 10 },
  { id: "P009", name: "Dompet Pria", price: 120000, stock: 22 },
  { id: "P010", name: "Kacamata Hitam", price: 95000, stock: 28 },
]

export default function SalesPage() {
  const { toast } = useToast()
  const [open, setOpen] = useState(false) // State for main sales dialog
  const [productDialogOpen, setProductDialogOpen] = useState(false) // State for add product dialog
  const [productScannerOpen, setProductScannerOpen] = useState(false) // State for product barcode scanner dialog
  const [trackingScannerOpen, setTrackingScannerOpen] = useState(false) // State for tracking number barcode scanner dialog

  const [trackingNumber, setTrackingNumber] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<CartItem[]>([])
  const [selectedProductId, setSelectedProductId] = useState("")
  const [productQuantity, setProductQuantity] = useState(1)

  const handleScannedTrackingNumber = (scannedData: string) => {
    setTrackingNumber(scannedData)
    toast({
      title: "Resi Terdeteksi",
      description: `Nomor resi ${scannedData} berhasil diisi.`,
    })
    setTrackingScannerOpen(false)
  }

  const handleScannedProduct = (scannedProductId: string) => {
    const product = availableProducts.find((p) => p.id === scannedProductId)

    if (!product) {
      toast({
        title: "Produk Tidak Ditemukan",
        description: `QR Code tidak cocok dengan produk manapun.`,
        variant: "destructive",
      })
      return
    }

    if (product.stock <= 0) {
      toast({
        title: "Stok Habis",
        description: `Produk ${product.name} (ID: ${product.id}) stoknya habis.`,
        variant: "destructive",
      })
      return
    }

    const existingItem = selectedProducts.find((item) => item.id === product.id)

    if (existingItem) {
      const newQuantity = existingItem.quantity + 1
      if (newQuantity > product.stock) {
        toast({
          title: "Stok Tidak Cukup",
          description: `Tidak bisa menambahkan ${product.name}. Jumlah melebihi stok yang tersedia.`,
          variant: "destructive",
        })
        return
      }
      setSelectedProducts((prev) =>
        prev.map((item) => (item.id === product.id ? { ...item, quantity: newQuantity } : item)),
      )
    } else {
      setSelectedProducts((prev) => [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1, // Add one quantity by default on scan
        },
      ])
    }

    toast({
      title: "Produk Terdeteksi",
      description: `${product.name} berhasil ditambahkan ke keranjang.`,
    })
    setProductScannerOpen(false) // Close scanner after successful scan
  }

  const handleAddProduct = () => {
    const product = availableProducts.find((p) => p.id === selectedProductId)
    if (!product) {
      toast({
        title: "Error",
        description: "Pilih produk terlebih dahulu",
        variant: "destructive",
      })
      return
    }

    if (productQuantity > product.stock) {
      toast({
        title: "Error",
        description: "Jumlah melebihi stok yang tersedia",
        variant: "destructive",
      })
      return
    }

    const existingItem = selectedProducts.find((item) => item.id === product.id)

    if (existingItem) {
      const newQuantity = existingItem.quantity + productQuantity
      if (newQuantity > product.stock) {
        toast({
          title: "Error",
          description: "Total jumlah melebihi stok yang tersedia",
          variant: "destructive",
        })
        return
      }

      setSelectedProducts((prev) =>
        prev.map((item) => (item.id === product.id ? { ...item, quantity: newQuantity } : item)),
      )
    } else {
      setSelectedProducts((prev) => [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: productQuantity,
        },
      ])
    }

    toast({
      title: "Produk ditambahkan",
      description: `${product.name} berhasil ditambahkan ke keranjang`,
    })

    setSelectedProductId("")
    setProductQuantity(1)
    setProductDialogOpen(false)
  }

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((item) => item.id !== productId))
    toast({
      title: "Produk dihapus",
      description: "Produk berhasil dihapus dari keranjang",
    })
  }

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    const product = availableProducts.find((p) => p.id === productId)
    if (!product) return

    if (newQuantity > product.stock) {
      toast({
        title: "Error",
        description: "Jumlah melebihi stok yang tersedia",
        variant: "destructive",
      })
      return
    }

    if (newQuantity <= 0) {
      handleRemoveProduct(productId)
      return
    }

    setSelectedProducts((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)),
    )
  }

  const calculateSubtotal = () => {
    return selectedProducts.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateShipping = () => {
    return selectedProducts.length > 0 ? 20000 : 0
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping()
  }

  const handleAddSale = () => {
    if (selectedProducts.length === 0) {
      toast({
        title: "Error",
        description: "Tambahkan minimal satu produk",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Penjualan berhasil ditambahkan",
      description: "Data penjualan telah disimpan ke dalam sistem",
    })
    setOpen(false)
    setTrackingNumber("")
    setSelectedProducts([])
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Penjualan</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Penjualan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Penjualan Baru</DialogTitle>
              <DialogDescription>
                Masukkan data penjualan baru dari marketplace atau penjualan langsung
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="marketplace" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
                <TabsTrigger value="direct">Penjualan Langsung</TabsTrigger>
              </TabsList>
              <TabsContent value="marketplace" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="marketplace">Marketplace</Label>
                      <Select>
                        <SelectTrigger id="marketplace">
                          <SelectValue placeholder="Pilih marketplace" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shopee">Shopee</SelectItem>
                          <SelectItem value="tokopedia">Tokopedia</SelectItem>
                          <SelectItem value="tiktok">TikTok Shop</SelectItem>
                          <SelectItem value="lazada">Lazada</SelectItem>
                          <SelectItem value="blibli">Blibli</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tracking">Nomor Resi</Label>
                      <div className="flex gap-2">
                        <Input
                          id="tracking"
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value)}
                          placeholder="Masukkan atau scan nomor resi"
                        />
                        <Button variant="outline" size="icon" onClick={() => setTrackingScannerOpen(true)}>
                          <QrCode className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {trackingNumber && (
                    <div className="rounded-md border p-4">
                      <h4 className="font-medium mb-2">Detail Pesanan</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Pembeli:</p>
                          <p className="font-medium">Siti Nurhaliza</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Alamat:</p>
                          <p className="font-medium">Jl. Merdeka No. 123, Jakarta</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Tanggal Pesanan:</p>
                          <p className="font-medium">21 Juli 2025</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status:</p>
                          <Badge>Perlu Dikirim</Badge>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Produk</Label>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => setProductScannerOpen(true)}>
                          <QrCode className="mr-2 h-3 w-3" />
                          Scan Barcode
                        </Button>
                        <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Plus className="mr-2 h-3 w-3" />
                              Tambah Produk
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Tambah Produk</DialogTitle>
                              <DialogDescription>Pilih produk dan tentukan jumlahnya</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="product-select">Produk</Label>
                                <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                                  <SelectTrigger id="product-select">
                                    <SelectValue placeholder="Pilih produk" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availableProducts.map((product) => (
                                      <SelectItem key={product.id} value={product.id}>
                                        <div className="flex flex-col">
                                          <span>{product.name}</span>
                                          <span className="text-sm text-muted-foreground">
                                            Rp {product.price.toLocaleString("id-ID")} - Stok: {product.stock}
                                          </span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="quantity">Jumlah</Label>
                                <Input
                                  id="quantity"
                                  type="number"
                                  min="1"
                                  max={availableProducts.find((p) => p.id === selectedProductId)?.stock || 1}
                                  value={productQuantity}
                                  onChange={(e) => setProductQuantity(Number.parseInt(e.target.value) || 1)}
                                />
                              </div>
                              {selectedProductId && (
                                <div className="rounded-md border p-3 bg-muted/50">
                                  <div className="text-sm space-y-1">
                                    <div className="flex justify-between">
                                      <span>Harga Satuan:</span>
                                      <span>
                                        Rp{" "}
                                        {availableProducts
                                          .find((p) => p.id === selectedProductId)
                                          ?.price.toLocaleString("id-ID")}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Jumlah:</span>
                                      <span>{productQuantity}</span>
                                    </div>
                                    <div className="flex justify-between font-medium">
                                      <span>Total:</span>
                                      <span>
                                        Rp{" "}
                                        {(
                                          (availableProducts.find((p) => p.id === selectedProductId)?.price || 0) *
                                          productQuantity
                                        ).toLocaleString("id-ID")}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setProductDialogOpen(false)}>
                                Batal
                              </Button>
                              <Button onClick={handleAddProduct}>Tambah ke Keranjang</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Produk</TableHead>
                            <TableHead className="text-right">Harga</TableHead>
                            <TableHead className="text-center">Jumlah</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="text-center">Aksi</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedProducts.length === 0 ? (
                            <TableRow>
                              <TableCell className="text-center text-muted-foreground" colSpan={5}>
                                Belum ada produk yang dipilih
                              </TableCell>
                            </TableRow>
                          ) : (
                            selectedProducts.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell className="text-right">Rp {item.price.toLocaleString("id-ID")}</TableCell>
                                <TableCell className="text-center">
                                  <Input
                                    type="number"
                                    min="1"
                                    max={availableProducts.find((p) => p.id === item.id)?.stock || 1}
                                    value={item.quantity}
                                    onChange={(e) =>
                                      handleUpdateQuantity(item.id, Number.parseInt(e.target.value) || 1)
                                    }
                                    className="w-16 text-center"
                                  />
                                </TableCell>
                                <TableCell className="text-right">
                                  Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                                </TableCell>
                                <TableCell className="text-center">
                                  <Button variant="outline" size="sm" onClick={() => handleRemoveProduct(item.id)}>
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                          {selectedProducts.length > 0 && (
                            <>
                              <TableRow>
                                <TableCell colSpan={3} className="text-right font-medium">
                                  Subtotal
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                  Rp {calculateSubtotal().toLocaleString("id-ID")}
                                </TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell colSpan={3} className="text-right font-medium">
                                  Ongkos Kirim
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                  Rp {calculateShipping().toLocaleString("id-ID")}
                                </TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell colSpan={3} className="text-right font-bold">
                                  Total
                                </TableCell>
                                <TableCell className="text-right font-bold">
                                  Rp {calculateTotal().toLocaleString("id-ID")}
                                </TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                            </>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="direct" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customer">Nama Pelanggan</Label>
                      <Input id="customer" placeholder="Masukkan nama pelanggan (opsional)" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="payment-method">Metode Pembayaran</Label>
                      <Select>
                        <SelectTrigger id="payment-method">
                          <SelectValue placeholder="Pilih metode pembayaran" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Tunai</SelectItem>
                          <SelectItem value="transfer">Transfer Bank</SelectItem>
                          <SelectItem value="qris">QRIS</SelectItem>
                          <SelectItem value="card">Kartu Debit/Kredit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Produk</Label>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => setProductScannerOpen(true)}>
                          <QrCode className="mr-2 h-3 w-3" />
                          Scan Barcode
                        </Button>
                        <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Plus className="mr-2 h-3 w-3" />
                              Tambah Produk
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Tambah Produk</DialogTitle>
                              <DialogDescription>Pilih produk dan tentukan jumlahnya</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="product-select-direct">Produk</Label>
                                <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                                  <SelectTrigger id="product-select-direct">
                                    <SelectValue placeholder="Pilih produk" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availableProducts.map((product) => (
                                      <SelectItem key={product.id} value={product.id}>
                                        <div className="flex flex-col">
                                          <span>{product.name}</span>
                                          <span className="text-sm text-muted-foreground">
                                            Rp {product.price.toLocaleString("id-ID")} - Stok: {product.stock}
                                          </span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="quantity-direct">Jumlah</Label>
                                <Input
                                  id="quantity-direct"
                                  type="number"
                                  min="1"
                                  max={availableProducts.find((p) => p.id === selectedProductId)?.stock || 1}
                                  value={productQuantity}
                                  onChange={(e) => setProductQuantity(Number.parseInt(e.target.value) || 1)}
                                />
                              </div>
                              {selectedProductId && (
                                <div className="rounded-md border p-3 bg-muted/50">
                                  <div className="text-sm space-y-1">
                                    <div className="flex justify-between">
                                      <span>Harga Satuan:</span>
                                      <span>
                                        Rp{" "}
                                        {availableProducts
                                          .find((p) => p.id === selectedProductId)
                                          ?.price.toLocaleString("id-ID")}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Jumlah:</span>
                                      <span>{productQuantity}</span>
                                    </div>
                                    <div className="flex justify-between font-medium">
                                      <span>Total:</span>
                                      <span>
                                        Rp{" "}
                                        {(
                                          (availableProducts.find((p) => p.id === selectedProductId)?.price || 0) *
                                          productQuantity
                                        ).toLocaleString("id-ID")}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setProductDialogOpen(false)}>
                                Batal
                              </Button>
                              <Button onClick={handleAddProduct}>Tambah ke Keranjang</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Produk</TableHead>
                            <TableHead className="text-right">Harga</TableHead>
                            <TableHead className="text-center">Jumlah</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="text-center">Aksi</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedProducts.length === 0 ? (
                            <TableRow>
                              <TableCell className="text-center text-muted-foreground" colSpan={5}>
                                Belum ada produk yang dipilih
                              </TableCell>
                            </TableRow>
                          ) : (
                            selectedProducts.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell className="text-right">Rp {item.price.toLocaleString("id-ID")}</TableCell>
                                <TableCell className="text-center">
                                  <Input
                                    type="number"
                                    min="1"
                                    max={availableProducts.find((p) => p.id === item.id)?.stock || 1}
                                    value={item.quantity}
                                    onChange={(e) =>
                                      handleUpdateQuantity(item.id, Number.parseInt(e.target.value) || 1)
                                    }
                                    className="w-16 text-center"
                                  />
                                </TableCell>
                                <TableCell className="text-right">
                                  Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                                </TableCell>
                                <TableCell className="text-center">
                                  <Button variant="outline" size="sm" onClick={() => handleRemoveProduct(item.id)}>
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                          {selectedProducts.length > 0 && (
                            <>
                              <TableRow>
                                <TableCell colSpan={3} className="text-right font-medium">
                                  Subtotal
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                  Rp {calculateSubtotal().toLocaleString("id-ID")}
                                </TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell colSpan={3} className="text-right font-bold">
                                  Total
                                </TableCell>
                                <TableCell className="text-right font-bold">
                                  Rp {calculateSubtotal().toLocaleString("id-ID")}
                                </TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                            </>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleAddSale}>Simpan Penjualan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Penjualan Hari Ini</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5 dari kemarin</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendapatan Hari Ini</CardTitle>
            <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 4.250.000</div>
            <p className="text-xs text-muted-foreground">+12% dari kemarin</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Penjualan Marketplace</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">75% dari total penjualan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Penjualan Langsung</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">25% dari total penjualan</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Cari penjualan..." className="w-full pl-8" />
          </div>
          <div className="flex items-center gap-2 self-end">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Ekspor Data
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Pelanggan</TableHead>
                <TableHead>Sumber</TableHead>
                <TableHead>Nomor Resi</TableHead> {/* New column for tracking number */}
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
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
      </div>
      <BarcodeScannerDialog
        open={productScannerOpen}
        onOpenChange={setProductScannerOpen}
        onScan={handleScannedProduct}
        scanType="product"
      />
      <BarcodeScannerDialog
        open={trackingScannerOpen}
        onOpenChange={setTrackingScannerOpen}
        onScan={handleScannedTrackingNumber}
        scanType="tracking"
      />
    </div>
  )
}

function getBadgeVariant(status: string) {
  switch (status) {
    case "Selesai":
      return "default"
    case "Dikirim":
      return "secondary"
    case "Diproses":
      return "outline"
    case "Dibatalkan":
      return "destructive"
    default:
      return "secondary"
  }
}

const sales = [
  {
    id: "INV-001",
    date: "21 Jul 2025",
    customer: "Siti Nurhaliza",
    source: "Shopee",
    status: "Dikirim",
    total: 520000,
    trackingNumber: "SHP123456789",
  },
  {
    id: "INV-002",
    date: "21 Jul 2025",
    customer: "Budi Santoso",
    source: "Tokopedia",
    status: "Diproses",
    total: 350000,
    trackingNumber: "TKP987654321",
  },
  {
    id: "INV-003",
    date: "21 Jul 2025",
    customer: "Rina Anggraini",
    source: "TikTok Shop",
    status: "Selesai",
    total: 275000,
    trackingNumber: "TTK112233445",
  },
  {
    id: "INV-004",
    date: "20 Jul 2025",
    customer: "Andi Susanto",
    source: "Lazada",
    status: "Dikirim",
    total: 180000,
    trackingNumber: "LZD556677889",
  },
  {
    id: "INV-005",
    date: "20 Jul 2025",
    customer: "Dewi Wijaya",
    source: "Penjualan Langsung",
    status: "Selesai",
    total: 120000,
    trackingNumber: null, // Direct sale, no tracking number
  },
  {
    id: "INV-006",
    date: "20 Jul 2025",
    customer: "Ahmad Rahman",
    source: "Blibli",
    status: "Dibatalkan",
    total: 450000,
    trackingNumber: "BLB001122334",
  },
  {
    id: "INV-007",
    date: "19 Jul 2025",
    customer: "Maya Sari",
    source: "Shopee",
    status: "Selesai",
    total: 320000,
    trackingNumber: "SHP998877665",
  },
  {
    id: "INV-008",
    date: "19 Jul 2025",
    customer: "Rudi Hartono",
    source: "Tokopedia",
    status: "Dikirim",
    total: 280000,
    trackingNumber: "TKP445566778",
  },
]
