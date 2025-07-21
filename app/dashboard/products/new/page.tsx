"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Upload, Plus, X } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const formSchema = z.object({
  name: z.string().min(1, "Nama produk harus diisi"),
  code: z.string().min(1, "Kode produk harus diisi"),
  category: z.string().min(1, "Pilih kategori produk"),
  description: z.string().optional(),
  cogs: z.number().min(0, "COGS harus lebih dari 0"),
  operationalPacking: z.number().min(0, "Biaya operasional tidak boleh negatif"),
  budgetIklan: z.number().min(0, "Budget iklan tidak boleh negatif"),
  diskonLive: z.number().min(0, "Diskon live tidak boleh negatif"),
  biayaLainLain: z.number().min(0, "Biaya lain-lain tidak boleh negatif"),
  margin: z.number().min(0, "Margin tidak boleh negatif"),
  persentaseAfiliasi: z.number().min(0, "Persentase affiliasi tidak boleh negatif"),
  persentaseAdminMarketplace: z.number().min(0, "Persentase admin marketplace tidak boleh negatif"),
  persentaseUpHargaCoret: z.number().min(0, "Persentase up harga coret tidak boleh negatif"),
  stock: z.number().min(0, "Stok tidak boleh negatif"),
  minStock: z.number().min(0, "Stok minimum tidak boleh negatif"),
  weight: z.number().min(0, "Berat harus lebih dari 0"),
  dimensions: z.string().optional(),
  brand: z.string().optional(),
  supplier: z.string().optional(),
  isActive: z.boolean().default(true),
  catatan: z.string().optional(),
})

export default function NewProductPage() {
  const { toast } = useToast()
  const [images, setImages] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cogs: 0,
      operationalPacking: 0,
      budgetIklan: 0,
      diskonLive: 0,
      biayaLainLain: 0,
      margin: 0,
      persentaseAfiliasi: 0,
      persentaseAdminMarketplace: 0,
      persentaseUpHargaCoret: 0,
      stock: 0,
      minStock: 0,
      weight: 0,
      isActive: true,
    },
  })

  // Calculate selling price based on calculator logic
  const watchedValues = form.watch()
  const calculatedPrice = (() => {
    const {
      cogs,
      operationalPacking,
      budgetIklan,
      diskonLive,
      biayaLainLain,
      margin,
      persentaseAfiliasi,
      persentaseAdminMarketplace,
      persentaseUpHargaCoret,
    } = watchedValues

    const other = (budgetIklan || 0) + (diskonLive || 0) + (biayaLainLain || 0)
    const hpp2 = (cogs || 0) + (operationalPacking || 0) + other + (margin || 0)
    const biayaAdmin = hpp2 * ((persentaseAdminMarketplace || 0) / 100)
    const affiliasi = hpp2 * ((persentaseAfiliasi || 0) / 100)
    const hargaJual = hpp2 + biayaAdmin + affiliasi
    const hargaFinal = hargaJual * (1 + (persentaseUpHargaCoret || 0) / 100)

    return hargaFinal
  })()

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Produk berhasil ditambahkan",
      description: `${values.name} telah ditambahkan ke katalog produk dengan harga Rp ${calculatedPrice.toLocaleString("id-ID")}.`,
    })
    // Redirect to products page
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const addImage = () => {
    // Simulate image upload
    const newImage = `/placeholder.svg?height=200&width=200&text=Product+${images.length + 1}`
    setImages([...images, newImage])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Tambah Produk Baru</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Dasar</CardTitle>
                <CardDescription>Masukkan informasi dasar produk</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Produk</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nama produk" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kode Produk</FormLabel>
                        <FormControl>
                          <Input placeholder="P001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                            <SelectItem value="pakaian">Pakaian</SelectItem>
                            <SelectItem value="sepatu">Sepatu</SelectItem>
                            <SelectItem value="aksesoris">Aksesoris</SelectItem>
                            <SelectItem value="tas">Tas</SelectItem>
                            <SelectItem value="elektronik">Elektronik</SelectItem>
                          </SelectContent>
                        </Select>
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
                        <Textarea placeholder="Masukkan deskripsi produk" className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand</FormLabel>
                        <FormControl>
                          <Input placeholder="Nama brand" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="supplier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supplier</FormLabel>
                        <FormControl>
                          <Input placeholder="Nama supplier" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Status Aktif</FormLabel>
                        <FormDescription>Produk akan ditampilkan di katalog jika aktif</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Perhitungan Harga</CardTitle>
                <CardDescription>Masukkan data untuk perhitungan harga jual</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="cogs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>COGS (Harga Pokok Penjualan)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="32000"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="operationalPacking"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Operasional Packing</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-2">
                  <FormField
                    control={form.control}
                    name="budgetIklan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget Iklan</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="diskonLive"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diskon Live</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="biayaLainLain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Biaya Lain</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="margin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Margin</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="persentaseAfiliasi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Persentase Affiliasi (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="10.5"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="persentaseAdminMarketplace"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Admin Marketplace (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="15.0"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="persentaseUpHargaCoret"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Up Harga Coret (%) - Opsional</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="10.0"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>Campaign internal</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {calculatedPrice > 0 && (
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-md">
                    <p className="text-sm font-medium text-primary">Harga Jual Terhitung:</p>
                    <p className="text-2xl font-bold text-primary">Rp {calculatedPrice.toLocaleString("id-ID")}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Stok & Fisik</CardTitle>
                <CardDescription>Informasi stok dan dimensi produk</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stok Saat Ini</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="100"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="minStock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stok Minimum</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="10"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>Peringatan jika stok di bawah ini</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Berat (gram)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="500"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dimensions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dimensi (P x L x T cm)</FormLabel>
                        <FormControl>
                          <Input placeholder="20 x 15 x 5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="catatan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catatan</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Catatan tambahan (opsional)" className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media & Tags</CardTitle>
                <CardDescription>Upload gambar dan tambahkan tags</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Gambar Produk (maksimal 5)</p>
                  <div className="grid grid-cols-3 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Product ${index + 1}`}
                          className="w-full h-24 object-cover rounded-md border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    {images.length < 5 && (
                      <Button
                        type="button"
                        variant="outline"
                        className="h-24 border-dashed bg-transparent"
                        onClick={addImage}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Tags Produk</p>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Masukkan tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                        {tag}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/dashboard/products">Batal</Link>
            </Button>
            <Button type="submit">Simpan Produk</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
