// app/(auth)/register/page.tsx
import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Register | Real Estate Admin",
  description: "Create a new admin account",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-xl border border-border bg-background rounded-xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <Building2 className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Create Admin Account
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Fill in the details to register a new admin user.
          </CardDescription>
        </CardHeader>
        <Separator className="mb-4" />
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
