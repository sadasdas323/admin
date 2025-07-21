"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Calendar,
  ClipboardList,
  Clock,
  Home,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBag,
  Users,
  Video,
  Package2,
  ChevronDown,
  DollarSign,
  TrendingUp,
  Database,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface SidebarItemProps {
  icon: React.ElementType
  label: string
  href: string
  active?: boolean
}

function SidebarItem({ icon: Icon, label, href, active }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
        active ? "bg-accent text-accent-foreground" : "text-muted-foreground",
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  )
}

interface SidebarSubItemProps {
  icon: React.ElementType
  label: string
  href: string
  active?: boolean
}

function SidebarSubItem({ icon: Icon, label, href, active }: SidebarSubItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-6 py-2 text-sm transition-all hover:bg-accent",
        active ? "bg-accent text-accent-foreground" : "text-muted-foreground",
      )}
    >
      <Icon className="h-3 w-3" />
      <span>{label}</span>
    </Link>
  )
}

export default function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isReportsOpen, setIsReportsOpen] = useState(pathname.startsWith("/dashboard/reports"))

  return (
    <div
      className={cn("flex flex-col border-r bg-background transition-all duration-300", isCollapsed ? "w-16" : "w-64")}
    >
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6" />
          {!isCollapsed && <span className="font-bold">DIY Store</span>}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("h-4 w-4 transition-transform", isCollapsed ? "rotate-180" : "rotate-0")}
          >
            <path d="m15 6-6 6 6 6" />
          </svg>
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <SidebarItem icon={Home} label="Dashboard" href="/dashboard" active={pathname === "/dashboard"} />
          <SidebarItem
            icon={Package}
            label="Manajemen Produk"
            href="/dashboard/products"
            active={pathname.startsWith("/dashboard/products")}
          />
          <SidebarItem
            icon={Package2}
            label="Manajemen Stok"
            href="/dashboard/stock"
            active={pathname.startsWith("/dashboard/stock")}
          />
          <SidebarItem
            icon={ShoppingBag}
            label="Manajemen Penjualan"
            href="/dashboard/sales"
            active={pathname.startsWith("/dashboard/sales")}
          />
          <SidebarItem
            icon={Video}
            label="Jadwal Live Stream"
            href="/dashboard/livestream"
            active={pathname.startsWith("/dashboard/livestream")}
          />

          {/* Reports Section with Submenu */}
          <Collapsible open={isReportsOpen} onOpenChange={setIsReportsOpen}>
            <CollapsibleTrigger asChild>
              <button
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                  pathname.startsWith("/dashboard/reports")
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
                )}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Laporan</span>
                <ChevronDown
                  className={cn("ml-auto h-4 w-4 transition-transform", isReportsOpen ? "rotate-180" : "")}
                />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1">
              <SidebarSubItem
                icon={DollarSign}
                label="Laporan Keuangan"
                href="/dashboard/reports/financial"
                active={pathname === "/dashboard/reports/financial"}
              />
              <SidebarSubItem
                icon={TrendingUp}
                label="Laporan Penjualan"
                href="/dashboard/reports/sales"
                active={pathname === "/dashboard/reports/sales"}
              />
              <SidebarSubItem
                icon={Package}
                label="Riwayat Stok"
                href="/dashboard/reports/stock-history"
                active={pathname === "/dashboard/reports/stock-history"}
              />
            </CollapsibleContent>
          </Collapsible>

          <SidebarItem
            icon={Calendar}
            label="Kampanye"
            href="/dashboard/campaigns"
            active={pathname.startsWith("/dashboard/campaigns")}
          />
          <SidebarItem
            icon={ClipboardList}
            label="Tugas Karyawan"
            href="/dashboard/tasks"
            active={pathname.startsWith("/dashboard/tasks")}
          />
          <SidebarItem
            icon={Clock}
            label="Absensi"
            href="/dashboard/attendance"
            active={pathname.startsWith("/dashboard/attendance")}
          />
          <SidebarItem
            icon={Users}
            label="Karyawan"
            href="/dashboard/employees"
            active={pathname.startsWith("/dashboard/employees")}
          />
          {/* New Master Data Link */}
          <SidebarItem
            icon={Database}
            label="Master Data"
            href="/dashboard/master-data"
            active={pathname.startsWith("/dashboard/master-data")}
          />
          {/* New Access Control Link */}
          <SidebarItem
            icon={ShieldCheck}
            label="Kontrol Akses"
            href="/dashboard/access-control"
            active={pathname.startsWith("/dashboard/access-control")}
          />
          <SidebarItem
            icon={Settings}
            label="Pengaturan"
            href="/dashboard/settings"
            active={pathname.startsWith("/dashboard/settings")}
          />
        </nav>
      </div>
    </div>
  )
}
