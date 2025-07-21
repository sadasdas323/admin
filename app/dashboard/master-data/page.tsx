import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function MasterDataPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Manajemen Master Data</h2>
      </div>
      <Separator />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Produk</CardTitle>
            <CardDescription>Kelola daftar produk, kategori, dan atribut.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for product management link/button */}
            <p className="text-sm text-muted-foreground">Fitur akan datang.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pelanggan</CardTitle>
            <CardDescription>Kelola informasi pelanggan dan riwayat pembelian.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for customer management link/button */}
            <p className="text-sm text-muted-foreground">Fitur akan datang.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Karyawan</CardTitle>
            <CardDescription>Kelola data karyawan dan informasi kontak.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for employee management link/button */}
            <p className="text-sm text-muted-foreground">Fitur akan datang.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Metode Pembayaran</CardTitle>
            <CardDescription>Atur metode pembayaran yang tersedia.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for payment method management link/button */}
            <p className="text-sm text-muted-foreground">Fitur akan datang.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sumber Penjualan</CardTitle>
            <CardDescription>Definisikan sumber-sumber penjualan (mis. online, offline).</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for sales source management link/button */}
            <p className="text-sm text-muted-foreground">Fitur akan datang.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
