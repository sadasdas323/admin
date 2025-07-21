"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QrCode, Search, Download, Clock, CheckCircle, XCircle, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AttendancePage() {
  const { toast } = useToast()
  const [scanResult, setScanResult] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState("")

  const handleQRScan = () => {
    // Simulate QR scan result
    const mockEmployeeId = "EMP001"
    setScanResult(mockEmployeeId)

    toast({
      title: "QR Code berhasil discan",
      description: "Absensi untuk Rina telah tercatat pada " + new Date().toLocaleTimeString("id-ID"),
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Absensi</h1>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <QrCode className="mr-2 h-4 w-4" />
                Scan QR Absensi
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Scan QR Code Karyawan</DialogTitle>
                <DialogDescription>Arahkan kamera ke QR code karyawan untuk mencatat absensi</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="h-16 w-16 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Arahkan QR code ke sini</p>
                  </div>
                </div>
                <Button onClick={handleQRScan} className="w-full">
                  Simulasi Scan QR Code
                </Button>
                {scanResult && (
                  <div className="w-full p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800">✅ Absensi berhasil dicatat untuk karyawan: {scanResult}</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          <CalendarDateRangePicker />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Ekspor Data
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hadir Hari Ini</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">dari 10 karyawan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tidak Hadir</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Sakit: 1, Izin: 1</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terlambat</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Rata-rata 15 menit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tingkat Kehadiran</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Bulan ini</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Cari karyawan..." className="w-full pl-8" />
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Semua karyawan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Karyawan</SelectItem>
                <SelectItem value="rina">Rina</SelectItem>
                <SelectItem value="budi">Budi</SelectItem>
                <SelectItem value="dewi">Dewi</SelectItem>
                <SelectItem value="andi">Andi</SelectItem>
                <SelectItem value="sari">Sari</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Karyawan</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Jam Masuk</TableHead>
                <TableHead>Jam Keluar</TableHead>
                <TableHead>Total Jam</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Keterangan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.name}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.checkIn}</TableCell>
                  <TableCell>{record.checkOut}</TableCell>
                  <TableCell>{record.totalHours}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getAttendanceVariant(record.status)}>{record.status}</Badge>
                  </TableCell>
                  <TableCell>{record.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

function getAttendanceVariant(status: string) {
  switch (status) {
    case "Hadir":
      return "default"
    case "Terlambat":
      return "secondary"
    case "Sakit":
      return "outline"
    case "Izin":
      return "outline"
    case "Alpha":
      return "destructive"
    default:
      return "secondary"
  }
}

const attendanceData = [
  {
    id: "1",
    name: "Rina",
    date: "21 Jul 2025",
    checkIn: "08:00",
    checkOut: "17:00",
    totalHours: "9 jam",
    status: "Hadir",
    notes: "-",
  },
  {
    id: "2",
    name: "Budi",
    date: "21 Jul 2025",
    checkIn: "08:15",
    checkOut: "17:00",
    totalHours: "8 jam 45 menit",
    status: "Terlambat",
    notes: "Terlambat 15 menit",
  },
  {
    id: "3",
    name: "Dewi",
    date: "21 Jul 2025",
    checkIn: "08:00",
    checkOut: "17:00",
    totalHours: "9 jam",
    status: "Hadir",
    notes: "-",
  },
  {
    id: "4",
    name: "Andi",
    date: "21 Jul 2025",
    checkIn: "-",
    checkOut: "-",
    totalHours: "-",
    status: "Sakit",
    notes: "Sakit demam",
  },
  {
    id: "5",
    name: "Sari",
    date: "21 Jul 2025",
    checkIn: "08:30",
    checkOut: "17:00",
    totalHours: "8 jam 30 menit",
    status: "Terlambat",
    notes: "Terlambat 30 menit",
  },
]
