import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { z } from "zod"

// Validation schema for lead updates
const updateLeadSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().min(1, "Phone is required").optional(),
  propertyInterest: z.string().optional(),
  status: z.enum(["New", "Contacted", "Qualified", "Converted", "Lost"]).optional(),
  source: z.string().optional(),
})

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const lead = await db.lead.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 })
    }

    return NextResponse.json(lead)
  } catch (error) {
    console.error("Error fetching lead:", error)
    return NextResponse.json({ error: "Failed to fetch lead" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const validatedData = updateLeadSchema.parse(body)

    const lead = await db.lead.update({
      where: {
        id: params.id,
      },
      data: validatedData,
    })

    return NextResponse.json(lead)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    console.error("Error updating lead:", error)
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await db.lead.delete({
      where: {
        id: params.id,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting lead:", error)
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 })
  }
}
