import type { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Register | Real Estate Admin",
  description: "Create a new admin account",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md p-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Real Estate Admin</h1>
          <p className="text-muted-foreground">Create a new admin account</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}

