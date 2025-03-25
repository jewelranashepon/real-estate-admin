import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="grid place-items-center h-screen">
      <div>
        <h1 className="mb-3">Home Page</h1>
        <Button asChild>
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
