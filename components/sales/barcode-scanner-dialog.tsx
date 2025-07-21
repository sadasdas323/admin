"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { QrCode } from "lucide-react"

interface BarcodeScannerDialogProps {
  isOpen: boolean
  onClose: () => void
  onScan: (data: string) => void
  scanType: "product" | "tracking"
}

export function BarcodeScannerDialog({ isOpen, onClose, onScan, scanType }: BarcodeScannerDialogProps) {
  const [scannedData, setScannedData] = useState("")
  const [showQrCode, setShowQrCode] = useState(false)

  const handleShowQrCode = () => {
    setShowQrCode(true)
    // Simulate a scan based on type
    if (scanType === "product") {
      setScannedData("PROD001") // Example product ID
    } else {
      setScannedData(
        "TRK" +
          Math.floor(Math.random() * 1000000000)
            .toString()
            .padStart(9, "0"),
      ) // Example tracking number
    }
  }

  const handleConfirm = () => {
    if (scannedData) {
      onScan(scannedData)
      setScannedData("")
      setShowQrCode(false)
    }
  }

  const handleCloseDialog = () => {
    setScannedData("")
    setShowQrCode(false)
    onClose()
  }

  const dialogTitle = scanType === "product" ? "Scan Barcode Produk" : "Scan Nomor Resi Pengiriman"
  const qrCodePlaceholder =
    scanType === "product" ? "/placeholder.svg?height=200&width=200" : "/placeholder.svg?height=200&width=200"

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>Gunakan kamera Anda untuk memindai barcode atau QR code.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center justify-center h-48 border rounded-md bg-muted">
            {showQrCode ? (
              <Image
                src={qrCodePlaceholder || "/placeholder.svg"}
                alt="QR Code Placeholder"
                width={200}
                height={200}
                className="object-contain"
              />
            ) : (
              <p className="text-muted-foreground">Area Pemindai Kamera</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="scanned-data">Data Terdeteksi</Label>
            <Input
              id="scanned-data"
              value={scannedData}
              onChange={(e) => setScannedData(e.target.value)}
              placeholder="Data barcode/QR akan muncul di sini"
              readOnly={showQrCode} // Make it read-only when QR code is shown
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleShowQrCode}>
              <QrCode className="mr-2 h-4 w-4" /> Tampilkan QR Code
            </Button>
            <Button onClick={handleConfirm} disabled={!scannedData}>
              Konfirmasi
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
