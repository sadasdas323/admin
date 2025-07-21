import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>SN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Siti Nurhaliza</p>
          <p className="text-sm text-muted-foreground">siti@example.com</p>
        </div>
        <div className="ml-auto font-medium">+Rp520.000</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>BS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Budi Santoso</p>
          <p className="text-sm text-muted-foreground">budi@example.com</p>
        </div>
        <div className="ml-auto font-medium">+Rp350.000</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>RA</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Rina Anggraini</p>
          <p className="text-sm text-muted-foreground">rina@example.com</p>
        </div>
        <div className="ml-auto font-medium">+Rp275.000</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Andi Susanto</p>
          <p className="text-sm text-muted-foreground">andi@example.com</p>
        </div>
        <div className="ml-auto font-medium">+Rp180.000</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>DW</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Dewi Wijaya</p>
          <p className="text-sm text-muted-foreground">dewi@example.com</p>
        </div>
        <div className="ml-auto font-medium">+Rp120.000</div>
      </div>
    </div>
  )
}
