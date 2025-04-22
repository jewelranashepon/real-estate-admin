"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QrCode, Camera, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface QrScannerProps {
  onSuccess: (result: string) => void;
}

export function QrScanner({ onSuccess }: QrScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);

  // In a real implementation, this would use a QR code scanning library
  // For this demo, we'll simulate scanning with a progress bar
  const startScanning = () => {
    setIsScanning(true);
    setScanProgress(0);

    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          // Simulate successful scan
          const mockLicenseId =
            "FAL-" + Math.floor(100000 + Math.random() * 900000);
          onSuccess(mockLicenseId);
          setIsScanning(false);
          return 0;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="space-y-4">
      <Card className="aspect-video relative overflow-hidden flex items-center justify-center bg-muted">
        {isScanning ? (
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <QrCode className="h-16 w-16 text-primary mb-2 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Scanning...</p>
            <div className="w-48 mt-4">
              <Progress value={scanProgress} className="h-1" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Camera className="h-16 w-16 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Camera preview</p>
            <p className="text-xs text-muted-foreground mt-1">
              Click "Scan QR Code" to start scanning
            </p>
          </div>
        )}
      </Card>

      <Button
        onClick={startScanning}
        disabled={isScanning || !hasCamera}
        className="w-full"
      >
        {isScanning ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Scanning...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <QrCode className="h-4 w-4" />
            Scan QR Code
          </span>
        )}
      </Button>

      {!hasCamera && (
        <p className="text-sm text-destructive text-center">
          Camera access is required to scan QR codes
        </p>
      )}
    </div>
  );
}
