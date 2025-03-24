// import { redirect } from "next/navigation"

// export default function Home() {
//   // Redirect to the admin dashboard
//   redirect("/admin/dashboard")
// }



import { redirect } from "next/navigation"
import { auth } from "@/lib/auth" // make sure this path is correct


export default async function Home() {
  const session = await auth()

  // Redirect to admin dashboard if logged in, otherwise to login page
  if (session?.user) {
    redirect("/admin/dashboard")
  } else {
    redirect("/login")
  }
}
