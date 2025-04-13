import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { z } from "zod"

// Validation schema for message creation
const createMessageSchema = z.object({
  sender: z.string().min(1, "Sender name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
  propertyId: z.string().optional(),
  propertyName: z.string().optional(),
})

export async function GET() {
  try {
    const messages = await db.message.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const validatedData = createMessageSchema.parse(body)

    const message = await db.message.create({
      data: {
        sender: validatedData.sender,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
        propertyId: validatedData.propertyId,
        propertyName: validatedData.propertyName,
        status: "Unread",
        isStarred: false,
      },
    });

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    console.error("Error creating message:", error)
    return NextResponse.json({ error: "Failed to create message" }, { status: 500 })
  }
}
