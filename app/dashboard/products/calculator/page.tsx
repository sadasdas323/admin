"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calculator, RotateCcw } from "lucide-react"
import Link from "next/link"

export default function CalculatorPage() {
  const [cogs, setCogs] = useState("")
  const [margin, setMargin] = useState("")
  const [discount, setDiscount] = useState("")
  const [tax, setTax] = useState("")

  // Format number with thousand separators
  const formatNumber = (value: string) => {
    const number = value.replace(/\D/g, "")
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const handleNumberInput = (value: string, setter: (value: string) => void) => {
    const formatted = formatNumber(value)
    setter(formatted)
  }

  // Parse formatted number back to actual number for calculations
  const parseNumber = (value: string) => {
    return Number.parseInt(value.replace(/\./g, "")) || 0
  }

  const cogsValue = parseNumber(cogs)
  const marginValue = parseNumber(margin)
  const discountValue = parseNumber(discount)
  const taxValue = parseNumber(tax)

  // Calculations
  const basePrice = cogsValue + marginValue
  const priceAfterDiscount = basePrice - discountValue
  const finalPrice = priceAfterDiscount + taxValue

  const handleReset = () => {
    setCogs("")
    setMargin("")
    setDiscount("")
    setTax("")
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
          <h1 className="text-3xl font-bold tracking-tight">Kalkulator Harga Produk</h1>
          <p className="text-muted-foreground">Hitung harga jual produk berdasarkan COGS dan margin</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Input Perhitungan
            </CardTitle>
            <CardDescription>Masukkan nilai-nilai untuk menghitung harga jual produk</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cogs">COGS (Harga Pokok Penjualan)</Label>
              <Input
                id="cogs"
                type="text"
                value={cogs}
                onChange={(e) => handleNumberInput(e.target.value, setCogs)}
                placeholder="Masukkan COGS"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="margin">Margin Keuntungan</Label>
              <Input
                id="margin"
                type="text"
                value={margin}
                onChange={(e) => handleNumberInput(e.target.value, setMargin)}
                placeholder="Masukkan margin keuntungan"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount">Diskon (Opsional)</Label>
              <Input
                id="discount"
                type="text"
                value={discount}
                onChange={(e) => handleNumberInput(e.target.value, setDiscount)}
                placeholder="Masukkan diskon"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tax">Pajak/Biaya Tambahan (Opsional)</Label>
              <Input
                id="tax"
                type="text"
                value={tax}
                onChange={(e) => handleNumberInput(e.target.value, setTax)}
                placeholder="Masukkan pajak atau biaya tambahan"
              />
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full bg-transparent">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hasil Perhitungan</CardTitle>
            <CardDescription>Breakdown harga berdasarkan input yang diberikan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">COGS:</span>
                <span>Rp {cogsValue.toLocaleString("id-ID")}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Margin:</span>
                <span className="text-green-600">+ Rp {marginValue.toLocaleString("id-ID")}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-medium">
                <span>Harga Dasar:</span>
                <span>Rp {basePrice.toLocaleString("id-ID")}</span>
              </div>

              {discountValue > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Diskon:</span>
                  <span className="text-red-600">- Rp {discountValue.toLocaleString("id-ID")}</span>
                </div>
              )}

              {taxValue > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pajak/Biaya:</span>
                  <span className="text-orange-600">+ Rp {taxValue.toLocaleString("id-ID")}</span>
                </div>
              )}

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Harga Jual Final:</span>
                <span className="text-primary">Rp {finalPrice.toLocaleString("id-ID")}</span>
              </div>

              {cogsValue > 0 && finalPrice > 0 && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Margin Percentage:</div>
                  <div className="font-medium">{((marginValue / cogsValue) * 100).toFixed(1)}%</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
