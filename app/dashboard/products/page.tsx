import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Calculator,
  Download,
  MoreHorizontal,
  Plus,
  Printer,
  QrCode,
  Search,
  PackagePlus,
  PackageMinus,
} from "lucide-react"
import Link from "next/link"

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Produk</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/products/calculator">
              <Calculator className="mr-2 h-4 w-4" />
              Kalkulator Harga
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/products/stock/add">
              <PackagePlus className="mr-2 h-4 w-4" />
              Tambah Stok
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/products/stock/reduce">
              <PackageMinus className="mr-2 h-4 w-4" />
              Kurangi Stok
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Produk
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Cari produk..." className="w-full pl-8" />
        </div>
        <div className="flex items-center gap-2 self-end">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print QR Code
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Data
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Kode</TableHead>
              <TableHead>Nama Produk</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead className="text-right">Harga</TableHead>
              <TableHead className="text-center">Stok</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.code}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">Rp {product.price.toLocaleString("id-ID")}</TableCell>
                <TableCell className="text-center">{product.stock}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={product.status === "Aktif" ? "default" : "destructive"}>{product.status}</Badge>
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
                        <Link href={`/dashboard/products/${product.id}`} className="flex w-full">
                          Lihat Detail
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/dashboard/products/${product.id}/edit`} className="flex w-full">
                          Edit Produk
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href={`/dashboard/products/stock/add`} className="flex w-full">
                          <PackagePlus className="mr-2 h-4 w-4" />
                          Tambah Stok
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/dashboard/products/stock/reduce`} className="flex w-full">
                          <PackageMinus className="mr-2 h-4 w-4" />
                          Kurangi Stok
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href={`/dashboard/products/${product.id}/qrcode`} className="flex w-full">
                          <QrCode className="mr-2 h-4 w-4" />
                          Cetak QR Code
                        </Link>
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

const products = [
  {
    id: "1",
    code: "P001",
    name: "Kemeja Flanel Premium",
    category: "Pakaian",
    price: 150000,
    stock: 45,
    status: "Aktif",
  },
  {
    id: "2",
    code: "P002",
    name: "Celana Chino Slim Fit",
    category: "Pakaian",
    price: 200000,
    stock: 30,
    status: "Aktif",
  },
  {
    id: "3",
    code: "P003",
    name: "Sepatu Sneakers Casual",
    category: "Sepatu",
    price: 350000,
    stock: 15,
    status: "Aktif",
  },
  {
    id: "4",
    code: "P004",
    name: "Tas Ransel Kanvas",
    category: "Aksesoris",
    price: 175000,
    stock: 20,
    status: "Aktif",
  },
  {
    id: "5",
    code: "P005",
    name: "Jaket Denim Vintage",
    category: "Pakaian",
    price: 275000,
    stock: 0,
    status: "Habis",
  },
]
