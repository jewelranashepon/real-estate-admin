"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface AddEnvironmentVariablesProps {
  names: string[]
}

export function AddEnvironmentVariables({ names }: AddEnvironmentVariablesProps) {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Missing Environment Variables</AlertTitle>
      <AlertDescription>
        Please add the following environment variables to your project: {names.join(", ")}
      </AlertDescription>
    </Alert>
  )
}

