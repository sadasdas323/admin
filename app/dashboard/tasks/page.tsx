"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { CalendarIcon, Plus, CheckCircle, Clock, AlertTriangle, User } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(1, "Judul tugas harus diisi"),
  description: z.string().min(1, "Deskripsi tugas harus diisi"),
  assignee: z.string().min(1, "Pilih karyawan yang ditugaskan"),
  priority: z.string().min(1, "Pilih prioritas tugas"),
  deadline: z.date({
    required_error: "Pilih tanggal deadline",
  }),
  category: z.string().min(1, "Pilih kategori tugas"),
})

export default function TasksPage() {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Tugas berhasil dibuat",
      description: `Tugas "${values.title}" telah diberikan kepada ${values.assignee}.`,
    })
    setOpen(false)
    form.reset()
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Tugas Karyawan</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Buat Tugas Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Buat Tugas Baru</DialogTitle>
              <DialogDescription>Berikan tugas baru kepada karyawan dengan deadline dan prioritas</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul Tugas</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan judul tugas" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi Tugas</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Jelaskan detail tugas yang harus dikerjakan"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="assignee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ditugaskan Kepada</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih karyawan" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="rina">Rina</SelectItem>
                            <SelectItem value="budi">Budi</SelectItem>
                            <SelectItem value="dewi">Dewi</SelectItem>
                            <SelectItem value="andi">Andi</SelectItem>
                            <SelectItem value="sari">Sari</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prioritas</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih prioritas" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Rendah</SelectItem>
                            <SelectItem value="medium">Sedang</SelectItem>
                            <SelectItem value="high">Tinggi</SelectItem>
                            <SelectItem value="urgent">Mendesak</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kategori</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="inventory">Inventori</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="customer-service">Customer Service</SelectItem>
                            <SelectItem value="content">Konten</SelectItem>
                            <SelectItem value="admin">Administrasi</SelectItem>
                            <SelectItem value="other">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Deadline</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd MMMM yyyy", { locale: id })
                                ) : (
                                  <span>Pilih tanggal deadline</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit">Buat Tugas</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tugas</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 tugas baru hari ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tugas Selesai</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">75% completion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dalam Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Sedang dikerjakan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terlambat</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Perlu perhatian</p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul Tugas</TableHead>
              <TableHead>Ditugaskan Kepada</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead className="text-center">Prioritas</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>{task.assignee}</TableCell>
                <TableCell>{task.category}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={getPriorityVariant(task.priority)}>{task.priority}</Badge>
                </TableCell>
                <TableCell>{task.deadline}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Buka menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Lihat Detail
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Tugas
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Hapus Tugas
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function getPriorityVariant(priority: string) {
  switch (priority) {
    case "Mendesak":
      return "destructive"
    case "Tinggi":
      return "default"
    case "Sedang":
      return "secondary"
    case "Rendah":
      return "outline"
    default:
      return "secondary"
  }
}

function getStatusVariant(status: string) {
  switch (status) {
    case "Selesai":
      return "default"
    case "Dalam Progress":
      return "secondary"
    case "Belum Mulai":
      return "outline"
    case "Terlambat":
      return "destructive"
    default:
      return "secondary"
  }
}

const tasks = [
  {
    id: "1",
    title: "Update Stok Produk Musim Dingin",
    assignee: "Rina",
    category: "Inventori",
    priority: "Mendesak",
    deadline: "22 Jul 2025",
    status: "Dalam Progress",
  },
  {
    id: "2",
    title: "Persiapan Kampanye 11.11",
    assignee: "Budi",
    category: "Marketing",
    priority: "Tinggi",
    deadline: "25 Jul 2025",
    status: "Belum Mulai",
  },
  {
    id: "3",
    title: "Foto Produk Baru Koleksi Autumn",
    assignee: "Dewi",
    category: "Konten",
    priority: "Sedang",
    deadline: "28 Jul 2025",
    status: "Dalam Progress",
  },
  {
    id: "4",
    title: "Balas Review Pelanggan",
    assignee: "Andi",
    category: "Customer Service",
    priority: "Sedang",
    deadline: "23 Jul 2025",
    status: "Selesai",
  },
  {
    id: "5",
    title: "Input Data Penjualan Bulan Lalu",
    assignee: "Sari",
    category: "Administrasi",
    priority: "Rendah",
    deadline: "20 Jul 2025",
    status: "Terlambat",
  },
  {
    id: "6",
    title: "Riset Kompetitor Produk Sepatu",
    assignee: "Rina",
    category: "Marketing",
    priority: "Sedang",
    deadline: "30 Jul 2025",
    status: "Belum Mulai",
  },
  {
    id: "7",
    title: "Optimasi Listing Produk di Shopee",
    assignee: "Budi",
    category: "Marketing",
    priority: "Tinggi",
    deadline: "26 Jul 2025",
    status: "Dalam Progress",
  },
  {
    id: "8",
    title: "Cek Kualitas Produk Masuk",
    assignee: "Dewi",
    category: "Inventori",
    priority: "Tinggi",
    deadline: "24 Jul 2025",
    status: "Selesai",
  },
]
