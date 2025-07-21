import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker"
import { Button } from "@/components/ui/button"
import { CreditCard, DollarSign, Package, Users } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <CalendarDateRangePicker />
          <Button>Download</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
          <TabsTrigger value="analytics">Analitik</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Rp 45.231.000</div>
                <p className="text-xs text-muted-foreground">+20.1% dari bulan lalu</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Penjualan</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">+12.2% dari bulan lalu</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Produk Aktif</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-muted-foreground">+4 produk baru bulan ini</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Karyawan Aktif</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 karyawan baru</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Ikhtisar</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Penjualan Terbaru</CardTitle>
                <CardDescription>Anda memiliki 265 penjualan bulan ini.</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Performa Produk</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Produk</CardTitle>
                <CardDescription>5 produk terlaris bulan ini</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Jadwal Live Stream</CardTitle>
            <CardDescription>Jadwal live stream untuk 7 hari ke depan</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Sesi Pagi</p>
                  <p className="text-sm text-muted-foreground">Hari ini, 09:00 - 11:00</p>
                </div>
                <div className="text-sm font-medium">Rina</div>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Sesi Sore</p>
                  <p className="text-sm text-muted-foreground">Hari ini, 15:00 - 17:00</p>
                </div>
                <div className="text-sm font-medium">Budi</div>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Sesi Malam</p>
                  <p className="text-sm text-muted-foreground">Hari ini, 19:00 - 21:00</p>
                </div>
                <div className="text-sm font-medium">Dewi</div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kampanye Aktif</CardTitle>
            <CardDescription>Kampanye yang sedang berjalan</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Flash Sale Shopee</p>
                  <p className="text-sm text-muted-foreground">Berakhir dalam 2 hari</p>
                </div>
                <div className="text-sm font-medium text-red-500">-25%</div>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Promo Akhir Bulan</p>
                  <p className="text-sm text-muted-foreground">Berakhir dalam 5 hari</p>
                </div>
                <div className="text-sm font-medium text-red-500">-15%</div>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Bundling Tokopedia</p>
                  <p className="text-sm text-muted-foreground">Berakhir dalam 7 hari</p>
                </div>
                <div className="text-sm font-medium text-red-500">-20%</div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tugas Karyawan</CardTitle>
            <CardDescription>Tugas yang perlu diselesaikan</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Update Stok Produk</p>
                  <p className="text-sm text-muted-foreground">Deadline: Hari ini</p>
                </div>
                <div className="text-sm font-medium text-amber-500">Mendesak</div>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Persiapan Kampanye 11.11</p>
                  <p className="text-sm text-muted-foreground">Deadline: 3 hari lagi</p>
                </div>
                <div className="text-sm font-medium text-blue-500">Sedang</div>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Foto Produk Baru</p>
                  <p className="text-sm text-muted-foreground">Deadline: 5 hari lagi</p>
                </div>
                <div className="text-sm font-medium text-green-500">Normal</div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
