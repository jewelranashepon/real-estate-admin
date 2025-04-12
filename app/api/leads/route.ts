import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { z } from "zod"

// Validation schema for lead creation
const createLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  propertyInterest: z.string().optional(),
  source: z.string().optional(),
})

export async function GET() {
  try {
    const leads = await db.lead.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(leads)
  } catch (error) {
    console.error("Error fetching leads:", error)
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const validatedData = createLeadSchema.parse(body)

    const lead = await db.lead.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        propertyInterest: validatedData.propertyInterest || "",
        status: "New",
        source: validatedData.source || "Website",
      },
    })

    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    console.error("Error creating lead:", error)
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 })
  }
}
