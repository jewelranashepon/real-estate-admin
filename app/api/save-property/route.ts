import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth-client" // Use your actual path to this file
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const session = await getSession()

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { propertyId } = await req.json()
  const userId = session.user.id

  await prisma.savedProperty.create({
    data: {
      userId,
      propertyId,
    },
  })

  return NextResponse.json({ success: true })
}
