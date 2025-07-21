"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Download, Search, TrendingUp, TrendingDown, Package, AlertTriangle } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

const stockMovements = [
  {
    id: "SM001",
    date: "2024-01-15",
    time: "10:30",
    product: "Kemeja Flanel Premium",
    type: "Masuk",
    quantity: 50,
    reason: "Pembelian dari supplier",
    user: "Admin",
    stockBefore: 25,
    stockAfter: 75,
  },
  {
    id: "SM002",
    date: "2024-01-15",
    time: "14:20",
    product: "Celana Chino Slim Fit",
    type: "Keluar",
    quantity: 15,
    reason: "Penjualan online",
    user: "System",
    stockBefore: 40,
    stockAfter: 25,
  },
  {
    id: "SM003",
    date: "2024-01-14",
    time: "09:15",
    product: "Sepatu Sneakers Casual",
    type: "Masuk",
    quantity: 30,
    reason: "Restok produk",
    user: "Admin",
    stockBefore: 5,
    stockAfter: 35,
  },
  {
    id: "SM004",
    date: "2024-01-14",
    time: "16:45",
    product: "Tas Ransel Kanvas",
    type: "Keluar",
    quantity: 8,
    reason: "Penjualan offline",
    user: "Kasir 1",
    stockBefore: 20,
    stockAfter: 12,
  },
  {
    id: "SM005",
    date: "2024-01-13",
    time: "11:30",
    product: "Jaket Denim Vintage",
    type: "Adjustment",
    quantity: -3,
    reason: "Stock opname - barang rusak",
    user: "Admin",
    stockBefore: 18,
    stockAfter: 15,
  },
]

const stockTrendData = [
  { name: "Jan", masuk: 450, keluar: 320, adjustment: -15 },
  { name: "Feb", masuk: 380, keluar: 290, adjustment: -8 },
  { name: "Mar", masuk: 520, keluar: 410, adjustment: -12 },
  { name: "Apr", masuk: 420, keluar: 380, adjustment: -5 },
  { name: "Mei", masuk: 490, keluar: 350, adjustment: -18 },
  { name: "Jun", masuk: 380, keluar: 320, adjustment: -10 },
  { name: "Jul", masuk: 550, keluar: 420, adjustment: -7 },
]

const lowStockProducts = [
  { name: "Kemeja Polo Basic", currentStock: 5, minStock: 20, status: "Kritis" },
  { name: "Celana Jeans Skinny", currentStock: 8, minStock: 15, status: "Rendah" },
  { name: "Sepatu Boots Leather", currentStock: 3, minStock: 10, status: "Kritis" },
  { name: "Tas Tote Canvas", currentStock: 12, minStock: 25, status: "Rendah" },
]

export default function StockHistoryReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  const filteredMovements = stockMovements.filter((movement) => {
    const matchesSearch =
      movement.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.reason.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || movement.type.toLowerCase() === selectedType.toLowerCase()
    return matchesSearch && matchesType
  })

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Laporan Riwayat Stok</h1>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Harian</SelectItem>
              <SelectItem value="weekly">Mingguan</SelectItem>
              <SelectItem value="monthly">Bulanan</SelectItem>
              <SelectItem value="yearly">Tahunan</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
          <CalendarDateRangePicker />
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Ekspor Laporan
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stok Masuk</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,450</div>
            <p className="text-xs text-muted-foreground">+12.5% dari periode sebelumnya</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stok Keluar</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,890</div>
            <p className="text-xs text-muted-foreground">+8.2% dari periode sebelumnya</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Adjustment</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-85</div>
            <p className="text-xs text-muted-foreground">Penyesuaian stok bulan ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stok Rendah</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Produk perlu restok</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tren Pergerakan Stok</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stockTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="masuk" fill="#22c55e" name="Stok Masuk" />
                <Bar dataKey="keluar" fill="#ef4444" name="Stok Keluar" />
                <Bar dataKey="adjustment" fill="#f59e0b" name="Adjustment" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Produk Stok Rendah</CardTitle>
            <CardDescription>Produk yang perlu segera direstok</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Stok: {product.currentStock} / Min: {product.minStock}
                    </p>
                  </div>
                  <Badge variant={product.status === "Kritis" ? "destructive" : "secondary"}>{product.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Pergerakan Stok</CardTitle>
          <CardDescription>Detail semua transaksi stok</CardDescription>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari produk atau alasan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="masuk">Masuk</SelectItem>
                <SelectItem value="keluar">Keluar</SelectItem>
                <SelectItem value="adjustment">Adjustment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Produk</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead>Alasan</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="text-right">Stok Sebelum</TableHead>
                  <TableHead className="text-right">Stok Sesudah</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMovements.map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell className="font-medium">{movement.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{movement.date}</div>
                        <div className="text-sm text-muted-foreground">{movement.time}</div>
                      </div>
                    </TableCell>
                    <TableCell>{movement.product}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          movement.type === "Masuk"
                            ? "default"
                            : movement.type === "Keluar"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {movement.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={
                          movement.type === "Masuk"
                            ? "text-green-600"
                            : movement.type === "Keluar"
                              ? "text-red-600"
                              : "text-yellow-600"
                        }
                      >
                        {movement.type === "Masuk" ? "+" : movement.type === "Keluar" ? "-" : ""}
                        {Math.abs(movement.quantity)}
                      </span>
                    </TableCell>
                    <TableCell>{movement.reason}</TableCell>
                    <TableCell>{movement.user}</TableCell>
                    <TableCell className="text-right">{movement.stockBefore}</TableCell>
                    <TableCell className="text-right font-medium">{movement.stockAfter}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
