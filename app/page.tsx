
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[90%] max-w-lg text-center space-y-4">
        <div className="flex justify-center">
          <Image
            src="/images/logo-real.jpeg" // Replace with your actual logo path
            alt="Birds of Eden Logo"
            width={120}
            height={130}
            className="rounded-full"
          />
        </div>
        <h1 className="text-3xl font-bold">Birds of Eden</h1>
        <h2 className="text-2xl font-semibold">Welcome to the Admin Panel</h2>
        <p className="text-gray-600 mb-6">Please sign in to continue</p>
        <Button asChild className="w-full">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
