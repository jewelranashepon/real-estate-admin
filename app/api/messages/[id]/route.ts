import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { z } from "zod"

// Validation schema for message updates
const updateMessageSchema = z.object({
  status: z.enum(["Unread", "Read", "Replied", "Archived"]).optional(),
  isStarred: z.boolean().optional(),
})

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const message = await db.message.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json(message)
  } catch (error) {
    console.error("Error fetching message:", error)
    return NextResponse.json({ error: "Failed to fetch message" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const validatedData = updateMessageSchema.parse(body)

    const message = await db.message.update({
      where: {
        id: params.id,
      },
      data: validatedData,
    })

    return NextResponse.json(message)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    console.error("Error updating message:", error)
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await db.message.delete({
      where: {
        id: params.id,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting message:", error)
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 })
  }
}
