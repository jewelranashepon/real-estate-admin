import { Link } from "@/i18n/navigation";
import { SignupForm } from "@/components/auth/register-form";

export default async function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-muted-foreground">
              Your account information to continue
            </p>
          </div>
          <SignupForm />
          <div className="text-center text-sm">
            <p>
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-primary underline underline-offset-4"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
