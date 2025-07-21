"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Settings, Store, Bell, Shield, Database, Palette } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  })

  const handleSave = () => {
    toast({
      title: "Pengaturan berhasil disimpan",
      description: "Semua perubahan telah disimpan ke sistem.",
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Pengaturan Sistem</h1>
        <Button onClick={handleSave}>
          <Settings className="mr-2 h-4 w-4" />
          Simpan Pengaturan
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="store">Toko</TabsTrigger>
          <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
          <TabsTrigger value="security">Keamanan</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Pengaturan Umum
              </CardTitle>
              <CardDescription>Konfigurasi dasar untuk sistem manajemen toko</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="app-name">Nama Aplikasi</Label>
                  <Input id="app-name" defaultValue="DIY Store Management" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona Waktu</Label>
                  <Select defaultValue="asia-jakarta">
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia-jakarta">Asia/Jakarta (WIB)</SelectItem>
                      <SelectItem value="asia-makassar">Asia/Makassar (WITA)</SelectItem>
                      <SelectItem value="asia-jayapura">Asia/Jayapura (WIT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Mata Uang</Label>
                  <Select defaultValue="idr">
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="idr">Rupiah (IDR)</SelectItem>
                      <SelectItem value="usd">US Dollar (USD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Bahasa</Label>
                  <Select defaultValue="id">
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="id">Bahasa Indonesia</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-format">Format Tanggal</Label>
                <Select defaultValue="dd-mm-yyyy">
                  <SelectTrigger id="date-format">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Tampilan
              </CardTitle>
              <CardDescription>Kustomisasi tampilan dan tema aplikasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mode Gelap</Label>
                  <p className="text-sm text-muted-foreground">
                    Aktifkan mode gelap untuk tampilan yang lebih nyaman di mata
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sidebar Kompak</Label>
                  <p className="text-sm text-muted-foreground">Tampilkan sidebar dalam mode kompak</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="store" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Informasi Toko
              </CardTitle>
              <CardDescription>Kelola informasi dasar toko Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Nama Toko</Label>
                  <Input id="store-name" defaultValue="DIY Fashion Store" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-phone">Telepon Toko</Label>
                  <Input id="store-phone" defaultValue="021-12345678" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-address">Alamat Toko</Label>
                <Textarea
                  id="store-address"
                  defaultValue="Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10110"
                  className="resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="store-email">Email Toko</Label>
                  <Input id="store-email" type="email" defaultValue="info@diyfashion.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-website">Website</Label>
                  <Input id="store-website" defaultValue="https://diyfashion.com" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Operasional</CardTitle>
              <CardDescription>Konfigurasi jam operasional dan kebijakan toko</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="open-time">Jam Buka</Label>
                  <Input id="open-time" type="time" defaultValue="08:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="close-time">Jam Tutup</Label>
                  <Input id="close-time" type="time" defaultValue="21:00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="return-policy">Kebijakan Pengembalian (hari)</Label>
                <Input id="return-policy" type="number" defaultValue="7" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Buka di Hari Minggu</Label>
                  <p className="text-sm text-muted-foreground">Aktifkan jika toko buka di hari Minggu</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Pengaturan Notifikasi
              </CardTitle>
              <CardDescription>Kelola cara Anda menerima notifikasi dari sistem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifikasi Email</Label>
                  <p className="text-sm text-muted-foreground">Terima notifikasi melalui email</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifikasi Push</Label>
                  <p className="text-sm text-muted-foreground">Terima notifikasi push di browser</p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifikasi SMS</Label>
                  <p className="text-sm text-muted-foreground">Terima notifikasi melalui SMS untuk hal penting</p>
                </div>
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Jenis Notifikasi</CardTitle>
              <CardDescription>Pilih jenis notifikasi yang ingin Anda terima</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Stok Produk Menipis</Label>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label>Pesanan Baru</Label>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label>Pembayaran Diterima</Label>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label>Laporan Harian</Label>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label>Tugas Deadline</Label>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Keamanan Sistem
              </CardTitle>
              <CardDescription>Kelola pengaturan keamanan dan akses sistem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Password Saat Ini</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Password Baru</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button>Ubah Password</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Akses</CardTitle>
              <CardDescription>Konfigurasi tingkat akses dan keamanan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Autentikasi Dua Faktor</Label>
                  <p className="text-sm text-muted-foreground">Tambahkan lapisan keamanan ekstra</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Logout</Label>
                  <p className="text-sm text-muted-foreground">Logout otomatis setelah tidak aktif</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Timeout Session (menit)</Label>
                <Input id="session-timeout" type="number" defaultValue="30" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Backup & Restore
              </CardTitle>
              <CardDescription>Kelola backup data dan restore sistem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Backup Otomatis</Label>
                  <p className="text-sm text-muted-foreground">Backup data secara otomatis setiap hari</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backup-time">Waktu Backup Harian</Label>
                <Input id="backup-time" type="time" defaultValue="02:00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backup-retention">Simpan Backup (hari)</Label>
                <Input id="backup-retention" type="number" defaultValue="30" />
              </div>
              <div className="flex gap-2">
                <Button>Backup Sekarang</Button>
                <Button variant="outline">Restore Data</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Riwayat Backup</CardTitle>
              <CardDescription>Daftar backup yang tersedia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="font-medium">Backup_2025-07-21_02-00.sql</p>
                    <p className="text-sm text-muted-foreground">21 Juli 2025, 02:00 WIB</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      Restore
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="font-medium">Backup_2025-07-20_02-00.sql</p>
                    <p className="text-sm text-muted-foreground">20 Juli 2025, 02:00 WIB</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      Restore
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="font-medium">Backup_2025-07-19_02-00.sql</p>
                    <p className="text-sm text-muted-foreground">19 Juli 2025, 02:00 WIB</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      Restore
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
