"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, AlertTriangle, TrendingUp, TrendingDown, Search, Plus, Minus } from "lucide-react"

export default function StockManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [stockData, setStockData] = useState(initialStockData)
  const [addStockData, setAddStockData] = useState({ productId: "", quantity: "", notes: "" })
  const [reduceStockData, setReduceStockData] = useState({ productId: "", quantity: "", notes: "" })
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isReduceModalOpen, setIsReduceModalOpen] = useState(false)

  const filteredData = stockData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("id-ID").format(num)
  }

  const handleAddStock = (productId: string, quantity: string) => {
    if (!quantity || Number.parseInt(quantity) <= 0) return

    setStockData((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, stock: item.stock + Number.parseInt(quantity) } : item)),
    )
  }

  const handleReduceStock = (productId: string, quantity: string) => {
    if (!quantity || Number.parseInt(quantity) <= 0) return

    setStockData((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, stock: Math.max(0, item.stock - Number.parseInt(quantity)) } : item,
      ),
    )
  }

  const handleAddStockSubmit = () => {
    if (addStockData.productId && addStockData.quantity) {
      handleAddStock(addStockData.productId, addStockData.quantity)
      setAddStockData({ productId: "", quantity: "", notes: "" })
      setIsAddModalOpen(false)
    }
  }

  const handleReduceStockSubmit = () => {
    if (reduceStockData.productId && reduceStockData.quantity) {
      handleReduceStock(reduceStockData.productId, reduceStockData.quantity)
      setReduceStockData({ productId: "", quantity: "", notes: "" })
      setIsReduceModalOpen(false)
    }
  }

  const selectedProductForAdd = stockData.find((p) => p.id === addStockData.productId)
  const selectedProductForReduce = stockData.find((p) => p.id === reduceStockData.productId)
  const willBeNegative =
    selectedProductForReduce && Number.parseInt(reduceStockData.quantity || "0") > selectedProductForReduce.stock

  const addStockValue =
    selectedProductForAdd && addStockData.quantity
      ? selectedProductForAdd.price * Number.parseInt(addStockData.quantity)
      : 0

  const reduceStockValue =
    selectedProductForReduce && reduceStockData.quantity
      ? selectedProductForReduce.price * Number.parseInt(reduceStockData.quantity)
      : 0

  const totalStockValue = stockData.reduce((total, item) => total + item.stock * item.price, 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Stok</h1>
          <p className="text-muted-foreground">Kelola stok produk dan pantau pergerakan inventory</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Stok
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Stok Produk</DialogTitle>
                <DialogDescription>Pilih produk dan masukkan jumlah stok yang ingin ditambahkan</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="add-product">Pilih Produk</Label>
                  <Select
                    value={addStockData.productId}
                    onValueChange={(value) => setAddStockData((prev) => ({ ...prev, productId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih produk" />
                    </SelectTrigger>
                    <SelectContent>
                      {stockData.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.code} - {product.name} (Stok: {formatNumber(product.stock)}) -{" "}
                          {formatCurrency(product.price)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-quantity">Jumlah Ditambah</Label>
                  <Input
                    id="add-quantity"
                    type="number"
                    min="1"
                    value={addStockData.quantity}
                    onChange={(e) => setAddStockData((prev) => ({ ...prev, quantity: e.target.value }))}
                    placeholder="Masukkan jumlah"
                  />
                  {selectedProductForAdd && addStockData.quantity && (
                    <div className="text-sm space-y-1">
                      <p className="text-muted-foreground">
                        Harga per unit: {formatCurrency(selectedProductForAdd.price)}
                      </p>
                      <p className="font-medium text-green-600">
                        Total nilai penambahan: {formatCurrency(addStockValue)}
                      </p>
                      <p className="text-muted-foreground">
                        Stok setelah penambahan:{" "}
                        {formatNumber(selectedProductForAdd.stock + Number.parseInt(addStockData.quantity))}
                      </p>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-notes">Catatan</Label>
                  <Textarea
                    id="add-notes"
                    value={addStockData.notes}
                    onChange={(e) => setAddStockData((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="Catatan tambahan (supplier, tanggal pembelian, dll)..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Batal
                </Button>
                <Button onClick={handleAddStockSubmit} disabled={!addStockData.productId || !addStockData.quantity}>
                  Tambah Stok
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isReduceModalOpen} onOpenChange={setIsReduceModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Minus className="mr-2 h-4 w-4" />
                Kurangi Stok
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Kurangi Stok Produk</DialogTitle>
                <DialogDescription>Pilih produk dan masukkan jumlah stok yang ingin dikurangi</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reduce-product">Pilih Produk</Label>
                  <Select
                    value={reduceStockData.productId}
                    onValueChange={(value) => setReduceStockData((prev) => ({ ...prev, productId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih produk" />
                    </SelectTrigger>
                    <SelectContent>
                      {stockData
                        .filter((p) => p.stock > 0)
                        .map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.code} - {product.name} (Stok: {formatNumber(product.stock)}) -{" "}
                            {formatCurrency(product.price)}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reduce-quantity">Jumlah Dikurangi</Label>
                  <Input
                    id="reduce-quantity"
                    type="number"
                    min="1"
                    max={selectedProductForReduce?.stock || undefined}
                    value={reduceStockData.quantity}
                    onChange={(e) => setReduceStockData((prev) => ({ ...prev, quantity: e.target.value }))}
                    placeholder="Masukkan jumlah"
                  />
                  {selectedProductForReduce && (
                    <div className="text-sm space-y-1">
                      <p className="text-muted-foreground">
                        Stok tersedia: {formatNumber(selectedProductForReduce.stock)}
                      </p>
                      <p className="text-muted-foreground">
                        Harga per unit: {formatCurrency(selectedProductForReduce.price)}
                      </p>
                      {reduceStockData.quantity && (
                        <>
                          <p className="font-medium text-red-600">
                            Total nilai pengurangan: {formatCurrency(reduceStockValue)}
                          </p>
                          <p className="text-muted-foreground">
                            Stok setelah pengurangan:{" "}
                            {formatNumber(
                              Math.max(0, selectedProductForReduce.stock - Number.parseInt(reduceStockData.quantity)),
                            )}
                          </p>
                        </>
                      )}
                    </div>
                  )}
                  {willBeNegative && (
                    <p className="text-sm text-red-600">Jumlah tidak boleh melebihi stok yang tersedia</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reduce-notes">Catatan</Label>
                  <Textarea
                    id="reduce-notes"
                    value={reduceStockData.notes}
                    onChange={(e) => setReduceStockData((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="Alasan pengurangan (rusak, hilang, terjual, expired, dll)..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsReduceModalOpen(false)}>
                  Batal
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleReduceStockSubmit}
                  disabled={!reduceStockData.productId || !reduceStockData.quantity || willBeNegative}
                >
                  Kurangi Stok
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stock Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stockData.length}</div>
            <p className="text-xs text-muted-foreground">+2 dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stok Rendah</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {stockData.filter((item) => item.stock > 0 && item.stock <= item.minStock).length}
            </div>
            <p className="text-xs text-muted-foreground">Perlu restok segera</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stok Habis</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stockData.filter((item) => item.stock === 0).length}</div>
            <p className="text-xs text-muted-foreground">Produk tidak tersedia</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nilai Inventory</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalStockValue)}</div>
            <p className="text-xs text-muted-foreground">+12% dari bulan lalu</p>
          </CardContent>
        </Card>
      </div>

      {/* Stock Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Stok Produk</CardTitle>
          <CardDescription>Pantau dan kelola stok semua produk</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari produk..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Nama Produk</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Harga Satuan</TableHead>
                <TableHead>Stok Saat Ini</TableHead>
                <TableHead>Stok Minimum</TableHead>
                <TableHead>Nilai Stok</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.code}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{formatCurrency(item.price)}</TableCell>
                  <TableCell>
                    <span className={item.stock <= item.minStock ? "text-red-600 font-medium" : ""}>
                      {formatNumber(item.stock)}
                    </span>
                  </TableCell>
                  <TableCell>{formatNumber(item.minStock)}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(item.stock * item.price)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={item.stock === 0 ? "destructive" : item.stock <= item.minStock ? "secondary" : "default"}
                    >
                      {item.stock === 0 ? "Habis" : item.stock <= item.minStock ? "Stok Rendah" : "Normal"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

const initialStockData = [
  {
    id: "1",
    code: "P001",
    name: "Kemeja Flanel Premium",
    category: "Pakaian",
    stock: 45,
    minStock: 10,
    price: 125000,
  },
  {
    id: "2",
    code: "P002",
    name: "Celana Chino Slim Fit",
    category: "Pakaian",
    stock: 30,
    minStock: 15,
    price: 185000,
  },
  {
    id: "3",
    code: "P003",
    name: "Sepatu Sneakers Casual",
    category: "Sepatu",
    stock: 5,
    minStock: 10,
    price: 350000,
  },
  {
    id: "4",
    code: "P004",
    name: "Tas Ransel Kanvas",
    category: "Aksesoris",
    stock: 20,
    minStock: 8,
    price: 275000,
  },
  {
    id: "5",
    code: "P005",
    name: "Jaket Denim Vintage",
    category: "Pakaian",
    stock: 0,
    minStock: 5,
    price: 225000,
  },
  {
    id: "6",
    code: "P006",
    name: "Kaos Polos Cotton",
    category: "Pakaian",
    stock: 8,
    minStock: 20,
    price: 65000,
  },
  {
    id: "7",
    code: "P007",
    name: "Topi Baseball Cap",
    category: "Aksesoris",
    stock: 25,
    minStock: 10,
    price: 85000,
  },
  {
    id: "8",
    code: "P008",
    name: "Sandal Slide Comfort",
    category: "Sepatu",
    stock: 0,
    minStock: 12,
    price: 95000,
  },
]
