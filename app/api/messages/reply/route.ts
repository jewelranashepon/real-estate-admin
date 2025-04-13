import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { z } from "zod"
import { sendEmail } from "@/lib/email"

// Validation schema for reply
const replySchema = z.object({
  messageId: z.string(),
  replyText: z.string().min(1, "Reply text is required"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const validatedData = replySchema.parse(body)

    // Get the original message
    const message = await db.message.findUnique({
      where: {
        id: validatedData.messageId,
      },
    })

    if (!message) {
      return NextResponse.json({ error: "Original message not found" }, { status: 404 })
    }

    // Update message status to replied
    await db.message.update({
      where: {
        id: validatedData.messageId,
      },
      data: {
        status: "Replied",
      },
    })

    // In a real application, you would send an email here
    // This is a placeholder for the email sending functionality
    await sendEmail({
      to: message.email,
      subject: `Re: ${message.subject}`,
      text: validatedData.replyText,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    console.error("Error sending reply:", error)
    return NextResponse.json({ error: "Failed to send reply" }, { status: 500 })
  }
}
