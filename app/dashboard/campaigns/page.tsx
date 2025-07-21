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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
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
import { CalendarIcon, Plus, Edit, Trash2, Eye, Target, TrendingUp, Clock } from "lucide-react"
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
import { MoreHorizontal } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(1, "Nama kampanye harus diisi"),
  type: z.string().min(1, "Pilih jenis kampanye"),
  marketplace: z.string().optional(),
  discount: z.number().min(0).max(100, "Diskon maksimal 100%"),
  startDate: z.date({
    required_error: "Pilih tanggal mulai",
  }),
  endDate: z.date({
    required_error: "Pilih tanggal berakhir",
  }),
  description: z.string().optional(),
  products: z.array(z.string()).min(1, "Pilih minimal 1 produk"),
})

export default function CampaignsPage() {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      discount: 0,
      products: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Kampanye berhasil dibuat",
      description: `Kampanye "${values.name}" telah ditambahkan ke sistem.`,
    })
    setOpen(false)
    form.reset()
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Kampanye</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Buat Kampanye Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Buat Kampanye Baru</DialogTitle>
              <DialogDescription>Buat kampanye promosi untuk marketplace atau manual</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Kampanye</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan nama kampanye" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jenis Kampanye</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih jenis kampanye" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="marketplace">Marketplace</SelectItem>
                            <SelectItem value="manual">Manual</SelectItem>
                            <SelectItem value="flash-sale">Flash Sale</SelectItem>
                            <SelectItem value="bundling">Bundling</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {form.watch("type") === "marketplace" && (
                  <FormField
                    control={form.control}
                    name="marketplace"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marketplace</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih marketplace" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="shopee">Shopee</SelectItem>
                            <SelectItem value="tokopedia">Tokopedia</SelectItem>
                            <SelectItem value="tiktok">TikTok Shop</SelectItem>
                            <SelectItem value="lazada">Lazada</SelectItem>
                            <SelectItem value="blibli">Blibli</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diskon (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="Masukkan persentase diskon"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>Masukkan persentase diskon yang akan diberikan</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Tanggal Mulai</FormLabel>
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
                                  <span>Pilih tanggal mulai</span>
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
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Tanggal Berakhir</FormLabel>
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
                                  <span>Pilih tanggal berakhir</span>
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

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan deskripsi kampanye (opsional)"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit">Buat Kampanye</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kampanye Aktif</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Penjualan Kampanye</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 12.450.000</div>
            <p className="text-xs text-muted-foreground">+18.2% dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Diskon</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22%</div>
            <p className="text-xs text-muted-foreground">Optimal untuk profit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kampanye Berakhir</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Dalam 7 hari ke depan</p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Kampanye</TableHead>
              <TableHead>Jenis</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead className="text-center">Diskon</TableHead>
              <TableHead>Periode</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Penjualan</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>{campaign.type}</TableCell>
                <TableCell>{campaign.platform}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary">{campaign.discount}%</Badge>
                </TableCell>
                <TableCell>{campaign.period}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={getStatusVariant(campaign.status)}>{campaign.status}</Badge>
                </TableCell>
                <TableCell className="text-right">Rp {campaign.sales.toLocaleString("id-ID")}</TableCell>
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
                        Edit Kampanye
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Hapus Kampanye
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

function getStatusVariant(status: string) {
  switch (status) {
    case "Aktif":
      return "default"
    case "Berakhir":
      return "secondary"
    case "Dijadwalkan":
      return "outline"
    case "Dibatalkan":
      return "destructive"
    default:
      return "secondary"
  }
}

const campaigns = [
  {
    id: "1",
    name: "Flash Sale Shopee 7.7",
    type: "Flash Sale",
    platform: "Shopee",
    discount: 25,
    period: "7-9 Jul 2025",
    status: "Berakhir",
    sales: 3250000,
  },
  {
    id: "2",
    name: "Promo Akhir Bulan",
    type: "Manual",
    platform: "Semua",
    discount: 15,
    period: "25-31 Jul 2025",
    status: "Aktif",
    sales: 1850000,
  },
  {
    id: "3",
    name: "Bundling Tokopedia",
    type: "Bundling",
    platform: "Tokopedia",
    discount: 20,
    period: "15-22 Jul 2025",
    status: "Aktif",
    sales: 2100000,
  },
  {
    id: "4",
    name: "TikTok Live Sale",
    type: "Flash Sale",
    platform: "TikTok Shop",
    discount: 30,
    period: "1-3 Agu 2025",
    status: "Dijadwalkan",
    sales: 0,
  },
  {
    id: "5",
    name: "Harbolnas 11.11",
    type: "Marketplace",
    platform: "Semua",
    discount: 35,
    period: "11-12 Nov 2025",
    status: "Dijadwalkan",
    sales: 0,
  },
]
