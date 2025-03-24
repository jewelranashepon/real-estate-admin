import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { hash } from "bcrypt"

export async function GET() {
  try {
    // Create property types if they don't exist
    const propertyTypes = ["Apartment", "House", "Condo", "Townhouse", "Villa", "Land", "Commercial"]

    for (const type of propertyTypes) {
      await prisma.propertyType.upsert({
        where: { value: type },
        update: {},
        create: { value: type },
      })
    }

    // Create property statuses if they don't exist
    const propertyStatuses = ["Published", "Draft", "Sold", "Pending"]

    for (const status of propertyStatuses) {
      await prisma.propertyStatus.upsert({
        where: { value: status },
        update: {},
        create: { value: status },
      })
    }

    // Create a demo admin user if it doesn't exist
    const adminEmail = "admin@example.com"
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    })

    if (!existingAdmin) {
      const hashedPassword = await hash("password123", 10)
      await prisma.user.create({
        data: {
          email: adminEmail,
          firstName: "Admin",
          lastName: "User",
          hashedPassword,
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
    })
  } catch (error) {
    console.error("Seed error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to seed database",
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}

