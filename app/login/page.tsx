import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Login | Real Estate Admin",
  description: "Login to the admin panel",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md p-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Real Estate Admin</h1>
          <p className="text-muted-foreground">Login to your admin account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

