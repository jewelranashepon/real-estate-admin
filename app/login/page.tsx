import type { Metadata } from "next"
import { LoginForm } from "@/app/[locale]/auth/login-form"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Building2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Login | Real Estate Admin",
  description: "Login to the admin panel",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-xl border border-border bg-background rounded-xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <Building2 className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome back, Admin</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Login to manage real estate properties, users, and more.
          </CardDescription>
        </CardHeader>
        <Separator className="mb-4" />
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}