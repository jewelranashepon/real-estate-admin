"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Check, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FileUploadProps {
  onSuccess: (licenseId: string) => void;
}

export function FileUpload({ onSuccess }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setError(null);
    setIsSuccess(false);
    setUploadProgress(0);
  };

  const handleUpload = () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    // Check file type
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only PDF, JPEG, and PNG files are allowed");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    setError(null);

    // Simulate file upload and processing with progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setIsSuccess(true);

          // Generate a mock license ID
          const mockLicenseId =
            "FAL-" + Math.floor(100000 + Math.random() * 900000);
          onSuccess(mockLicenseId);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="fal-certificate" className="text-base font-medium">
          FAL Certificate
        </Label>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Input
              id="fal-certificate"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="flex-1"
            />
          </div>
          {file && (
            <div className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded-md">
              <FileText className="h-4 w-4 text-primary" />
              <span className="truncate font-medium">{file.name}</span>
              <span className="text-muted-foreground">
                ({(file.size / 1024).toFixed(0)} KB)
              </span>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>

      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      <Button
        onClick={handleUpload}
        disabled={!file || isUploading || isSuccess}
        className="w-full"
      >
        {isUploading ? (
          <span className="flex items-center gap-2">
            <Upload className="h-4 w-4 animate-bounce" />
            Uploading...
          </span>
        ) : isSuccess ? (
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            Uploaded Successfully
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Certificate
          </span>
        )}
      </Button>
    </div>
  );
}
