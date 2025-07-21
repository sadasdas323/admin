"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, TrendingUp, DollarSign } from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

const salesData = [
  { name: "Jan", penjualan: 4000, keuntungan: 2400 },
  { name: "Feb", penjualan: 3000, keuntungan: 1398 },
  { name: "Mar", penjualan: 2000, keuntungan: 9800 },
  { name: "Apr", penjualan: 2780, keuntungan: 3908 },
  { name: "Mei", penjualan: 1890, keuntungan: 4800 },
  { name: "Jun", penjualan: 2390, keuntungan: 3800 },
  { name: "Jul", penjualan: 3490, keuntungan: 4300 },
]

export default function FinancialReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Laporan Keuangan</h1>
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
            <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 45.231.000</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +20.1% dari periode sebelumnya
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Keuntungan</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 18.925.000</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +15.3% dari periode sebelumnya
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">HPP Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 26.306.000</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-red-500" />
              +8.2% dari periode sebelumnya
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Margin Keuntungan</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30.6%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +2.1% dari periode sebelumnya
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Keuangan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm">Total Penjualan</span>
              <span className="font-medium">Rp 45.231.000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">HPP (Harga Pokok Penjualan)</span>
              <span className="font-medium">Rp 26.306.000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Biaya Operasional</span>
              <span className="font-medium">Rp 3.250.000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Biaya Marketing</span>
              <span className="font-medium">Rp 1.850.000</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold">
              <span>Keuntungan Bersih</span>
              <span className="text-green-600">Rp 13.825.000</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Margin Keuntungan</span>
              <span>30.6%</span>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Arus Kas Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: number) => `Rp ${value.toLocaleString("id-ID")}`} />
                <Bar dataKey="penjualan" fill="#8884d8" />
                <Bar dataKey="keuntungan" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tren Pendapatan & Keuntungan</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => `Rp ${value.toLocaleString("id-ID")}`} />
              <Legend />
              <Line type="monotone" dataKey="penjualan" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="keuntungan" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
