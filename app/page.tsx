import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg text-center space-y-6">
        <div className="flex justify-center">
          <Image
            src="/images/logo-real.jpeg"
            alt="Birds of Eden Logo"
            width={120}
            height={130}
            className="rounded-full object-cover"
          />
        </div>

        <h2 className="text-2xl font-medium text-gray-600">Welcome to the Real-Estate-App</h2>
        <h1 className="text-3xl font-bold text-gray-800">Birds of Eden's</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Admin Panel Demo</h2>

        <p className="text-gray-500">Please sign in to continue</p>

        <Button asChild className="w-full text-base font-medium">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
