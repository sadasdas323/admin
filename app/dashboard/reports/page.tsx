"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart3, DollarSign, Package, TrendingUp } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Laporan</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <CardTitle>Laporan Keuangan</CardTitle>
                <CardDescription>Analisis pendapatan, keuntungan, dan arus kas</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Total Pendapatan</span>
                <span className="font-medium">Rp 45.231.000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Keuntungan Bersih</span>
                <span className="font-medium text-green-600">Rp 13.825.000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Margin Keuntungan</span>
                <span className="font-medium">30.6%</span>
              </div>
            </div>
            <Button asChild className="w-full">
              <Link href="/dashboard/reports/financial">Lihat Detail Laporan</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle>Laporan Penjualan</CardTitle>
                <CardDescription>Data penjualan, produk terlaris, dan performa marketplace</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Total Penjualan</span>
                <span className="font-medium">1,234 order</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Produk Terjual</span>
                <span className="font-medium">2,456 unit</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Rata-rata Order</span>
                <span className="font-medium">Rp 285.000</span>
              </div>
            </div>
            <Button asChild className="w-full">
              <Link href="/dashboard/reports/sales">Lihat Detail Laporan</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Package className="h-8 w-8 text-orange-600" />
              <div>
                <CardTitle>Laporan Riwayat Stok</CardTitle>
                <CardDescription>Pergerakan stok, adjustment, dan monitoring inventory</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Stok Masuk</span>
                <span className="font-medium text-green-600">+2,450</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Stok Keluar</span>
                <span className="font-medium text-red-600">-1,890</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Produk Stok Rendah</span>
                <span className="font-medium text-yellow-600">12 produk</span>
              </div>
            </div>
            <Button asChild className="w-full">
              <Link href="/dashboard/reports/stock-history">Lihat Detail Laporan</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Performa Bisnis</CardTitle>
          <CardDescription>Overview singkat dari semua aspek bisnis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">Rp 45.2M</div>
              <div className="text-sm text-muted-foreground">Total Pendapatan</div>
              <div className="flex items-center justify-center mt-1">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs text-green-500">+20.1%</span>
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">1,234</div>
              <div className="text-sm text-muted-foreground">Total Penjualan</div>
              <div className="flex items-center justify-center mt-1">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs text-green-500">+12.5%</span>
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">560</div>
              <div className="text-sm text-muted-foreground">Net Stok Movement</div>
              <div className="flex items-center justify-center mt-1">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs text-green-500">+4.3%</span>
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">30.6%</div>
              <div className="text-sm text-muted-foreground">Margin Keuntungan</div>
              <div className="flex items-center justify-center mt-1">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs text-green-500">+2.1%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
