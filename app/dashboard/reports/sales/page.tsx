"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, TrendingUp, Package, ShoppingCart } from "lucide-react"
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip, Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"

const productData = [
  { name: "Pakaian", value: 400, color: "#0088FE" },
  { name: "Sepatu", value: 300, color: "#00C49F" },
  { name: "Aksesoris", value: 200, color: "#FFBB28" },
  { name: "Tas", value: 100, color: "#FF8042" },
]

const topProducts = [
  { name: "Kemeja Flanel Premium", sold: 145, revenue: 21750000 },
  { name: "Celana Chino Slim Fit", sold: 98, revenue: 19600000 },
  { name: "Sepatu Sneakers Casual", sold: 67, revenue: 23450000 },
  { name: "Tas Ransel Kanvas", sold: 89, revenue: 15575000 },
  { name: "Jaket Denim Vintage", sold: 54, revenue: 14850000 },
]

const marketplaceData = [
  { name: "Shopee", orders: 245, revenue: 18450000, fee: 1845000, profit: 8250000, performance: "Baik" },
  { name: "Tokopedia", orders: 189, revenue: 14230000, fee: 1280000, profit: 6850000, performance: "Baik" },
  { name: "TikTok Shop", orders: 156, revenue: 9850000, fee: 985000, profit: 4250000, performance: "Sedang" },
  { name: "Lazada", orders: 78, revenue: 5680000, fee: 568000, profit: 2450000, performance: "Rendah" },
]

const salesTrendData = [
  { name: "Jan", penjualan: 245 },
  { name: "Feb", penjualan: 189 },
  { name: "Mar", penjualan: 298 },
  { name: "Apr", penjualan: 267 },
  { name: "Mei", penjualan: 189 },
  { name: "Jun", penjualan: 239 },
  { name: "Jul", penjualan: 349 },
]

export default function SalesReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Laporan Penjualan</h1>
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
            <CardTitle className="text-sm font-medium">Total Penjualan</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +12.5% dari periode sebelumnya
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produk Terjual</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,456</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +18.2% dari periode sebelumnya
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Order</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 285.000</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-red-500" />
              -2.1% dari periode sebelumnya
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +0.5% dari periode sebelumnya
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Tren Penjualan Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={salesTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="penjualan" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Distribusi Kategori Produk</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={productData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Produk Terlaris</CardTitle>
            <CardDescription>Berdasarkan jumlah unit terjual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sold} unit terjual</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Rp {product.revenue.toLocaleString("id-ID")}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Performa Marketplace</CardTitle>
            <CardDescription>Penjualan per platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Platform</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketplaceData.map((marketplace) => (
                    <TableRow key={marketplace.name}>
                      <TableCell className="font-medium">{marketplace.name}</TableCell>
                      <TableCell className="text-right">{marketplace.orders}</TableCell>
                      <TableCell className="text-right">Rp {marketplace.revenue.toLocaleString("id-ID")}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            marketplace.performance === "Baik"
                              ? "default"
                              : marketplace.performance === "Sedang"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {marketplace.performance}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
