"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { CalendarIcon, Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  employee: z.string({
    required_error: "Pilih karyawan",
  }),
  date: z.date({
    required_error: "Pilih tanggal",
  }),
  session: z.string({
    required_error: "Pilih sesi",
  }),
  platform: z.string({
    required_error: "Pilih platform",
  }),
  notes: z.string().optional(),
})

export default function LivestreamSchedulePage() {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Jadwal berhasil ditambahkan",
      description: `Jadwal live stream untuk ${values.employee} pada ${format(values.date, "EEEE, dd MMMM yyyy", { locale: id })} (${values.session}) telah ditambahkan.`,
    })
    setOpen(false)
    form.reset()
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Jadwal Live Stream</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Jadwal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tambah Jadwal Live Stream</DialogTitle>
              <DialogDescription>Buat jadwal live stream baru untuk karyawan</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="employee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Karyawan</FormLabel>
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
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tanggal</FormLabel>
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
                                format(field.value, "EEEE, dd MMMM yyyy", { locale: id })
                              ) : (
                                <span>Pilih tanggal</span>
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
                  name="session"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sesi</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih sesi" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pagi">Pagi (09:00 - 11:00)</SelectItem>
                          <SelectItem value="siang">Siang (13:00 - 15:00)</SelectItem>
                          <SelectItem value="sore">Sore (15:00 - 17:00)</SelectItem>
                          <SelectItem value="malam">Malam (19:00 - 21:00)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platform</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih platform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="shopee">Shopee</SelectItem>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="tokopedia">Tokopedia</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catatan</FormLabel>
                      <FormControl>
                        <Input placeholder="Catatan tambahan (opsional)" {...field} />
                      </FormControl>
                      <FormDescription>Tambahkan catatan khusus untuk sesi ini</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Simpan Jadwal</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {livestreamSchedules.map((schedule) => (
          <Card key={schedule.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{schedule.employee}</CardTitle>
              <CardDescription>
                {schedule.date} • {schedule.time}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Platform:</span>
                  <span className="text-sm">{schedule.platform}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Sesi:</span>
                  <span className="text-sm">{schedule.session}</span>
                </div>
                {schedule.campaign && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Kampanye:</span>
                    <span className="text-sm">{schedule.campaign}</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Edit Jadwal
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

const livestreamSchedules = [
  {
    id: "1",
    employee: "Rina",
    date: "Senin, 22 Juli 2025",
    time: "09:00 - 11:00",
    session: "Pagi",
    platform: "Shopee",
    campaign: "Flash Sale Shopee",
  },
  {
    id: "2",
    employee: "Budi",
    date: "Senin, 22 Juli 2025",
    time: "15:00 - 17:00",
    session: "Sore",
    platform: "TikTok",
    campaign: null,
  },
  {
    id: "3",
    employee: "Dewi",
    date: "Senin, 22 Juli 2025",
    time: "19:00 - 21:00",
    session: "Malam",
    platform: "Instagram",
    campaign: "Promo Akhir Bulan",
  },
  {
    id: "4",
    employee: "Andi",
    date: "Selasa, 23 Juli 2025",
    time: "13:00 - 15:00",
    session: "Siang",
    platform: "Tokopedia",
    campaign: "Bundling Tokopedia",
  },
  {
    id: "5",
    employee: "Rina",
    date: "Selasa, 23 Juli 2025",
    time: "19:00 - 21:00",
    session: "Malam",
    platform: "Shopee",
    campaign: null,
  },
  {
    id: "6",
    employee: "Budi",
    date: "Rabu, 24 Juli 2025",
    time: "09:00 - 11:00",
    session: "Pagi",
    platform: "TikTok",
    campaign: null,
  },
]
