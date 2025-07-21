"use client"

import { useState, useRef, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Camera, Scan, XCircle } from "lucide-react"

interface BarcodeScannerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onScan: (scannedData: string) => void
  scanType: "product" | "tracking" // New prop to differentiate scan type
}

export function BarcodeScannerDialog({ open, onOpenChange, onScan, scanType }: BarcodeScannerDialogProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)

  const startCamera = async () => {
    setCameraError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        streamRef.current = stream
        setIsScanning(true)
        toast({
          title: "Kamera Aktif",
          description: `Arahkan kamera ke QR Code ${scanType === "product" ? "produk" : "resi pengiriman"}.`,
        })
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setCameraError(
        "Tidak dapat mengakses kamera. Pastikan izin diberikan dan tidak ada aplikasi lain yang menggunakan kamera.",
      )
      toast({
        title: "Gagal Mengakses Kamera",
        description: "Pastikan izin kamera diberikan dan coba lagi.",
        variant: "destructive",
      })
      setIsScanning(false)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsScanning(false)
    setCameraError(null)
  }

  // Simulate barcode detection (replace with actual barcode scanning library)
  const simulateScan = () => {
    if (!isScanning) return

    let scannedData: string
    if (scanType === "product") {
      const productIds = ["P001", "P002", "P003", "P004", "P005", "P006", "P007", "P008", "P009", "P010"]
      scannedData = productIds[Math.floor(Math.random() * productIds.length)]
    } else {
      // scanType === "tracking"
      const trackingNumbers = ["INV-20250721-001", "INV-20250721-002", "INV-20250721-003", "INV-20250721-004"]
      scannedData = trackingNumbers[Math.floor(Math.random() * trackingNumbers.length)]
    }

    onScan(scannedData)
    stopCamera()
    onOpenChange(false) // Close dialog after scan
  }

  useEffect(() => {
    if (open) {
      startCamera()
    } else {
      stopCamera()
    }
    return () => {
      stopCamera()
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Scan QR Code {scanType === "product" ? "Produk" : "Resi Pengiriman"}</DialogTitle>
          <DialogDescription>
            Arahkan kamera ke QR Code {scanType === "product" ? "produk" : "resi pengiriman"} untuk memindai.
          </DialogDescription>
        </DialogHeader>
        <div className="relative w-full h-64 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
          {cameraError ? (
            <div className="text-red-500 text-center p-4 flex flex-col items-center gap-2">
              <XCircle className="h-8 w-8" />
              {cameraError}
              <Button onClick={startCamera} className="mt-2">
                Coba Lagi
              </Button>
            </div>
          ) : (
            <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
          )}
          {!isScanning && !cameraError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Button onClick={startCamera}>
                <Camera className="mr-2 h-4 w-4" />
                Mulai Kamera
              </Button>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={simulateScan} disabled={!isScanning}>
            <Scan className="mr-2 h-4 w-4" />
            Simulasikan Scan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
