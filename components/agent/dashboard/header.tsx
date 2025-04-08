import type React from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Plus } from "lucide-react"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border px-6 py-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          Today
        </Button>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </div>
      {children}
    </div>
  )
}

