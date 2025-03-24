// "use server"

// import { revalidatePath } from "next/cache"
// import prisma from "@/lib/prisma"
// import { redirect } from "next/navigation"
// import { z } from "zod"
// import { hash } from "bcryptjs"
// import { auth } from "./auth"

// // Property Types
// export async function getPropertyTypes() {
//   return await prisma.propertyType.findMany()
// }

// // Property Statuses
// export async function getPropertyStatuses() {
//   return await prisma.propertyStatus.findMany()
// }

// // Properties
// export async function getProperties() {
//   try {
//     const properties = await prisma.property.findMany({
//       include: {
//         type: true,
//         status: true,
//         feature: true,
//         location: true,
//         images: true,
//         user: {
//           select: {
//             firstName: true,
//             lastName: true,
//             email: true,
//           },
//         },
//       },
//     })
//     return properties
//   } catch (error) {
//     console.error("Failed to fetch properties:", error)
//     return []
//   }
// }

// export async function getPropertyById(id: number) {
//   try {
//     const property = await prisma.property.findUnique({
//       where: { id },
//       include: {
//         type: true,
//         status: true,
//         feature: true,
//         location: true,
//         images: true,
//         contact: true,
//         user: {
//           select: {
//             firstName: true,
//             lastName: true,
//             email: true,
//           },
//         },
//       },
//     })
//     return property
//   } catch (error) {
//     console.error(`Failed to fetch property with ID ${id}:`, error)
//     return null
//   }
// }

// const PropertyFormSchema = z.object({
//   name: z.string().min(5, "Title must be at least 5 characters"),
//   description: z.string().min(10, "Description must be at least 10 characters"),
//   price: z.coerce.number().positive("Price must be a positive number"),
//   typeId: z.coerce.number(),
//   statusId: z.coerce.number(),
//   // Location
//   streetAddress: z.string().min(1, "Street address is required"),
//   city: z.string().min(1, "City is required"),
//   state: z.string().min(1, "State is required"),
//   zip: z.string().min(1, "ZIP code is required"),
//   region: z.string().min(1, "Region is required"),
//   landmark: z.string().optional(),
//   // Features
//   bedrooms: z.coerce.number().int().min(0),
//   bathrooms: z.coerce.number().int().min(0),
//   parkingSpots: z.coerce.number().int().min(0),
//   area: z.coerce.number().positive("Area must be a positive number"),
//   hasSwimmingPool: z.boolean().default(false),
//   hasGardenYard: z.boolean().default(false),
//   hasBalcony: z.boolean().default(false),
//   // Contact
//   contactName: z.string().min(1, "Contact name is required"),
//   contactPhone: z.string().min(1, "Contact phone is required"),
//   contactEmail: z.string().email("Invalid email address"),
//   // Images
//   imageUrls: z.array(z.string()).optional(),
// })

// export async function createProperty(formData: FormData) {
//   try {
//     const session = await auth()
//     if (!session?.user) {
//       return { success: false, error: "Authentication required" }
//     }

//     const rawData = Object.fromEntries(formData.entries())

//     // Handle checkboxes
//     const hasSwimmingPool = formData.get("hasSwimmingPool") === "on"
//     const hasGardenYard = formData.get("hasGardenYard") === "on"
//     const hasBalcony = formData.get("hasBalcony") === "on"

//     // Handle image URLs (in a real app, you'd handle file uploads)
//     const imageUrls = formData.getAll("imageUrls").map((url) => url.toString())

//     const data = {
//       ...rawData,
//       hasSwimmingPool,
//       hasGardenYard,
//       hasBalcony,
//       imageUrls,
//     }

//     try {
//       const validatedData = PropertyFormSchema.parse(data)

//       const property = await prisma.property.create({
//         data: {
//           name: validatedData.name,
//           description: validatedData.description,
//           price: validatedData.price,
//           typeId: validatedData.typeId,
//           statusId: validatedData.statusId,
//           userId: session.user.id,
//           location: {
//             create: {
//               streetAddress: validatedData.streetAddress,
//               city: validatedData.city,
//               state: validatedData.state,
//               zip: validatedData.zip,
//               region: validatedData.region,
//               landmark: validatedData.landmark || "",
//             },
//           },
//           feature: {
//             create: {
//               bedrooms: validatedData.bedrooms,
//               bathrooms: validatedData.bathrooms,
//               parkingSpots: validatedData.parkingSpots,
//               area: validatedData.area,
//               hasSwimmingPool: validatedData.hasSwimmingPool,
//               hasGardenYard: validatedData.hasGardenYard,
//               hasBalcony: validatedData.hasBalcony,
//             },
//           },
//           contact: {
//             create: {
//               name: validatedData.contactName,
//               phone: validatedData.contactPhone,
//               email: validatedData.contactEmail,
//             },
//           },
//           images: {
//             create: validatedData.imageUrls?.map((url) => ({ url })) || [],
//           },
//         },
//       })

//       revalidatePath("/admin/properties")
//       return { success: true, property }
//     } catch (error) {
//       console.error("Failed to create property:", error)
//       return { success: false, error }
//     }
//   } catch (authError) {
//     console.error("Authentication error:", authError)
//     return { success: false, error: "Authentication failed" }
//   }
// }

// export async function updateProperty(id: number, formData: FormData) {
//   try {
//     const session = await auth()
//     if (!session?.user) {
//       return { success: false, error: "Authentication required" }
//     }

//     const rawData = Object.fromEntries(formData.entries())

//     // Handle checkboxes
//     const hasSwimmingPool = formData.get("hasSwimmingPool") === "on"
//     const hasGardenYard = formData.get("hasGardenYard") === "on"
//     const hasBalcony = formData.get("hasBalcony") === "on"

//     // Handle image URLs
//     const imageUrls = formData.getAll("imageUrls").map((url) => url.toString())

//     const data = {
//       ...rawData,
//       hasSwimmingPool,
//       hasGardenYard,
//       hasBalcony,
//       imageUrls,
//     }

//     try {
//       const validatedData = PropertyFormSchema.parse(data)

//       // Update the property and its related records
//       const property = await prisma.property.update({
//         where: { id },
//         data: {
//           name: validatedData.name,
//           description: validatedData.description,
//           price: validatedData.price,
//           typeId: validatedData.typeId,
//           statusId: validatedData.statusId,
//           location: {
//             update: {
//               streetAddress: validatedData.streetAddress,
//               city: validatedData.city,
//               state: validatedData.state,
//               zip: validatedData.zip,
//               region: validatedData.region,
//               landmark: validatedData.landmark || "",
//             },
//           },
//           feature: {
//             update: {
//               bedrooms: validatedData.bedrooms,
//               bathrooms: validatedData.bathrooms,
//               parkingSpots: validatedData.parkingSpots,
//               area: validatedData.area,
//               hasSwimmingPool: validatedData.hasSwimmingPool,
//               hasGardenYard: validatedData.hasGardenYard,
//               hasBalcony: validatedData.hasBalcony,
//             },
//           },
//           contact: {
//             update: {
//               name: validatedData.contactName,
//               phone: validatedData.contactPhone,
//               email: validatedData.contactEmail,
//             },
//           },
//         },
//       })

//       // Handle images - delete existing and create new ones
//       await prisma.propertyImage.deleteMany({
//         where: { propertyId: id },
//       })

//       if (validatedData.imageUrls && validatedData.imageUrls.length > 0) {
//         await prisma.propertyImage.createMany({
//           data: validatedData.imageUrls.map((url) => ({
//             url,
//             propertyId: id,
//           })),
//         })
//       }

//       revalidatePath("/admin/properties")
//       revalidatePath(`/admin/properties/${id}`)
//       return { success: true, property }
//     } catch (error) {
//       console.error(`Failed to update property with ID ${id}:`, error)
//       return { success: false, error }
//     }
//   } catch (authError) {
//     console.error("Authentication error:", authError)
//     return { success: false, error: "Authentication failed" }
//   }
// }

// export async function deleteProperty(id: number) {
//   const session = await auth()
//   if (!session?.user) {
//     redirect("/login")
//   }

//   try {
//     await prisma.property.delete({
//       where: { id },
//     })

//     revalidatePath("/admin/properties")
//     return { success: true }
//   } catch (error) {
//     console.error(`Failed to delete property with ID ${id}:`, error)
//     return { success: false, error }
//   }
// }

// // Users
// export async function getUsers() {
//   try {
//     const users = await prisma.user.findMany({
//       select: {
//         id: true,
//         firstName: true,
//         lastName: true,
//         email: true,
//         avatarUrl: true,
//         createdAt: true,
//         _count: {
//           select: {
//             Property: true,
//           },
//         },
//       },
//     })
//     return users
//   } catch (error) {
//     console.error("Failed to fetch users:", error)
//     return []
//   }
// }

// // Dashboard stats
// export async function getDashboardStats() {
//   try {
//     const [propertyCount, userCount, propertyTypeStats, propertyStatusStats] = await Promise.all([
//       prisma.property.count(),
//       prisma.user.count(),
//       prisma.property.groupBy({
//         by: ["typeId"],
//         _count: true,
//         orderBy: {
//           _count: {
//             typeId: "desc",
//           },
//         },
//         take: 5,
//       }),
//       prisma.property.groupBy({
//         by: ["statusId"],
//         _count: true,
//       }),
//     ])

//     // Get property types for the stats
//     const propertyTypes = await prisma.propertyType.findMany({
//       where: {
//         id: {
//           in: propertyTypeStats.map((stat) => stat.typeId),
//         },
//       },
//     })

//     // Get property statuses for the stats
//     const propertyStatuses = await prisma.propertyStatus.findMany({
//       where: {
//         id: {
//           in: propertyStatusStats.map((stat) => stat.statusId),
//         },
//       },
//     })

//     // Map type IDs to names
//     const typeStats = propertyTypeStats.map((stat) => ({
//       typeId: stat.typeId,
//       count: stat._count,
//       typeName: propertyTypes.find((type) => type.id === stat.typeId)?.value || "Unknown",
//     }))

//     // Map status IDs to names
//     const statusStats = propertyStatusStats.map((stat) => ({
//       statusId: stat.statusId,
//       count: stat._count,
//       statusName: propertyStatuses.find((status) => status.id === stat.statusId)?.value || "Unknown",
//     }))

//     return {
//       propertyCount,
//       userCount,
//       typeStats,
//       statusStats,
//     }
//   } catch (error) {
//     console.error("Failed to fetch dashboard stats:", error)
//     return {
//       propertyCount: 0,
//       userCount: 0,
//       typeStats: [],
//       statusStats: [],
//     }
//   }
// }

// // Recent properties
// export async function getRecentProperties(limit = 5) {
//   try {
//     const properties = await prisma.property.findMany({
//       take: limit,
//       orderBy: {
//         id: "desc",
//       },
//       include: {
//         type: true,
//         status: true,
//         location: true,
//         images: {
//           take: 1,
//         },
//       },
//     })
//     return properties
//   } catch (error) {
//     console.error("Failed to fetch recent properties:", error)
//     return []
//   }
// }

// // Auth
// export async function registerUser(formData: FormData) {
//   const email = formData.get("email") as string
//   const password = formData.get("password") as string
//   const firstName = formData.get("firstName") as string
//   const lastName = formData.get("lastName") as string

//   // Validate input
//   if (!email || !password || !firstName || !lastName) {
//     return { success: false, error: "Missing required fields" }
//   }

//   try {
//     // Check if user already exists
//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     })

//     if (existingUser) {
//       return { success: false, error: "User already exists" }
//     }

//     // Hash password
//     const hashedPassword = await hash(password, 10)

//     // Create user
//     const user = await prisma.user.create({
//       data: {
//         email,
//         hashedPassword,
//         firstName,
//         lastName,
//       },
//     })

//     return { success: true, user: { id: user.id, email: user.email } }
//   } catch (error) {
//     console.error("Failed to register user:", error)
//     return { success: false, error: "Failed to register user" }
//   }
// }









































"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { z } from "zod"
import { hash } from "bcryptjs"
import { auth } from "./auth"

// Property Types
export async function getPropertyTypes() {
  return await prisma.propertyType.findMany()
}

// Property Statuses
export async function getPropertyStatuses() {
  return await prisma.propertyStatus.findMany()
}

// Properties
export async function getProperties() {
  try {
    const properties = await prisma.property.findMany({
      include: {
        type: true,
        status: true,
        feature: true,
        location: true,
        images: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    })
    return properties
  } catch (error) {
    console.error("Failed to fetch properties:", error)
    return []
  }
}

export async function getPropertyById(id: number) {
  try {
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        type: true,
        status: true,
        feature: true,
        location: true,
        images: true,
        contact: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    })
    return property
  } catch (error) {
    console.error(`Failed to fetch property with ID ${id}:`, error)
    return null
  }
}

const PropertyFormSchema = z.object({
  name: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  typeId: z.coerce.number(),
  statusId: z.coerce.number(),
  // Location
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
  region: z.string().min(1, "Region is required"),
  landmark: z.string().optional(),
  // Features
  bedrooms: z.coerce.number().int().min(0),
  bathrooms: z.coerce.number().int().min(0),
  parkingSpots: z.coerce.number().int().min(0),
  area: z.coerce.number().positive("Area must be a positive number"),
  hasSwimmingPool: z.boolean().default(false),
  hasGardenYard: z.boolean().default(false),
  hasBalcony: z.boolean().default(false),
  // Contact
  contactName: z.string().min(1, "Contact name is required"),
  contactPhone: z.string().min(1, "Contact phone is required"),
  contactEmail: z.string().email("Invalid email address"),
  // Images
  imageUrls: z.array(z.string()).optional(),
})

export async function createProperty(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "Authentication required" }
    }

    const rawData = Object.fromEntries(formData.entries())

    // Handle checkboxes
    const hasSwimmingPool = formData.get("hasSwimmingPool") === "on"
    const hasGardenYard = formData.get("hasGardenYard") === "on"
    const hasBalcony = formData.get("hasBalcony") === "on"

    // Handle image URLs - Get all values with the same name
    const imageUrls = formData.getAll("imageUrls").map((url) => url.toString())

    console.log("Image URLs from form:", imageUrls) // Debug log

    const data = {
      ...rawData,
      hasSwimmingPool,
      hasGardenYard,
      hasBalcony,
      imageUrls,
    }

    try {
      const validatedData = PropertyFormSchema.parse(data)

      // Create the property with all related data
      const property = await prisma.property.create({
        data: {
          name: validatedData.name,
          description: validatedData.description,
          price: validatedData.price,
          typeId: validatedData.typeId,
          statusId: validatedData.statusId,
          userId: session.user.id,
          location: {
            create: {
              streetAddress: validatedData.streetAddress,
              city: validatedData.city,
              state: validatedData.state,
              zip: validatedData.zip,
              region: validatedData.region,
              landmark: validatedData.landmark || "",
            },
          },
          feature: {
            create: {
              bedrooms: validatedData.bedrooms,
              bathrooms: validatedData.bathrooms,
              parkingSpots: validatedData.parkingSpots,
              area: validatedData.area,
              hasSwimmingPool: validatedData.hasSwimmingPool,
              hasGardenYard: validatedData.hasGardenYard,
              hasBalcony: validatedData.hasBalcony,
            },
          },
          contact: {
            create: {
              name: validatedData.contactName,
              phone: validatedData.contactPhone,
              email: validatedData.contactEmail,
            },
          },
        },
      })

      // Create image records separately if there are any image URLs
      if (validatedData.imageUrls && validatedData.imageUrls.length > 0) {
        console.log("Creating image records for property ID:", property.id)

        // Create each image record individually to ensure they're all created
        for (const url of validatedData.imageUrls) {
          await prisma.propertyImage.create({
            data: {
              url: url,
              propertyId: property.id,
            },
          })
        }
      }

      revalidatePath("/admin/properties")
      return { success: true, property }
    } catch (error) {
      console.error("Failed to create property:", error)
      return { success: false, error }
    }
  } catch (authError) {
    console.error("Authentication error:", authError)
    return { success: false, error: "Authentication failed" }
  }
}

export async function updateProperty(id: number, formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "Authentication required" }
    }

    const rawData = Object.fromEntries(formData.entries())

    // Handle checkboxes
    const hasSwimmingPool = formData.get("hasSwimmingPool") === "on"
    const hasGardenYard = formData.get("hasGardenYard") === "on"
    const hasBalcony = formData.get("hasBalcony") === "on"

    // Handle image URLs - Get all values with the same name
    const imageUrls = formData.getAll("imageUrls").map((url) => url.toString())

    console.log("Image URLs from form (update):", imageUrls) // Debug log

    const data = {
      ...rawData,
      hasSwimmingPool,
      hasGardenYard,
      hasBalcony,
      imageUrls,
    }

    try {
      const validatedData = PropertyFormSchema.parse(data)

      // Update the property and its related records
      const property = await prisma.property.update({
        where: { id },
        data: {
          name: validatedData.name,
          description: validatedData.description,
          price: validatedData.price,
          typeId: validatedData.typeId,
          statusId: validatedData.statusId,
          location: {
            update: {
              streetAddress: validatedData.streetAddress,
              city: validatedData.city,
              state: validatedData.state,
              zip: validatedData.zip,
              region: validatedData.region,
              landmark: validatedData.landmark || "",
            },
          },
          feature: {
            update: {
              bedrooms: validatedData.bedrooms,
              bathrooms: validatedData.bathrooms,
              parkingSpots: validatedData.parkingSpots,
              area: validatedData.area,
              hasSwimmingPool: validatedData.hasSwimmingPool,
              hasGardenYard: validatedData.hasGardenYard,
              hasBalcony: validatedData.hasBalcony,
            },
          },
          contact: {
            update: {
              name: validatedData.contactName,
              phone: validatedData.contactPhone,
              email: validatedData.contactEmail,
            },
          },
        },
      })

      // Handle images - delete existing and create new ones
      await prisma.propertyImage.deleteMany({
        where: { propertyId: id },
      })

      if (validatedData.imageUrls && validatedData.imageUrls.length > 0) {
        console.log("Creating updated image records for property ID:", id)

        // Create each image record individually
        for (const url of validatedData.imageUrls) {
          await prisma.propertyImage.create({
            data: {
              url: url,
              propertyId: id,
            },
          })
        }
      }

      revalidatePath("/admin/properties")
      revalidatePath(`/admin/properties/${id}`)
      return { success: true, property }
    } catch (error) {
      console.error(`Failed to update property with ID ${id}:`, error)
      return { success: false, error }
    }
  } catch (authError) {
    console.error("Authentication error:", authError)
    return { success: false, error: "Authentication failed" }
  }
}

export async function deleteProperty(id: number) {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }

  try {
    await prisma.property.delete({
      where: { id },
    })

    revalidatePath("/admin/properties")
    return { success: true }
  } catch (error) {
    console.error(`Failed to delete property with ID ${id}:`, error)
    return { success: false, error }
  }
}

// Users
export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
        _count: {
          select: {
            Property: true,
          },
        },
      },
    })
    return users
  } catch (error) {
    console.error("Failed to fetch users:", error)
    return []
  }
}

// Dashboard stats
export async function getDashboardStats() {
  try {
    const [propertyCount, userCount, propertyTypeStats, propertyStatusStats] = await Promise.all([
      prisma.property.count(),
      prisma.user.count(),
      prisma.property.groupBy({
        by: ["typeId"],
        _count: true,
        orderBy: {
          _count: {
            typeId: "desc",
          },
        },
        take: 5,
      }),
      prisma.property.groupBy({
        by: ["statusId"],
        _count: true,
      }),
    ])

    // Get property types for the stats
    const propertyTypes = await prisma.propertyType.findMany({
      where: {
        id: {
          in: propertyTypeStats.map((stat) => stat.typeId),
        },
      },
    })

    // Get property statuses for the stats
    const propertyStatuses = await prisma.propertyStatus.findMany({
      where: {
        id: {
          in: propertyStatusStats.map((stat) => stat.statusId),
        },
      },
    })

    // Map type IDs to names
    const typeStats = propertyTypeStats.map((stat) => ({
      typeId: stat.typeId,
      count: stat._count,
      typeName: propertyTypes.find((type) => type.id === stat.typeId)?.value || "Unknown",
    }))

    // Map status IDs to names
    const statusStats = propertyStatusStats.map((stat) => ({
      statusId: stat.statusId,
      count: stat._count,
      statusName: propertyStatuses.find((status) => status.id === stat.statusId)?.value || "Unknown",
    }))

    return {
      propertyCount,
      userCount,
      typeStats,
      statusStats,
    }
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error)
    return {
      propertyCount: 0,
      userCount: 0,
      typeStats: [],
      statusStats: [],
    }
  }
}

// Recent properties
export async function getRecentProperties(limit = 5) {
  try {
    const properties = await prisma.property.findMany({
      take: limit,
      orderBy: {
        id: "desc",
      },
      include: {
        type: true,
        status: true,
        location: true,
        images: {
          take: 1,
        },
      },
    })
    return properties
  } catch (error) {
    console.error("Failed to fetch recent properties:", error)
    return []
  }
}

// Auth
export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string

  // Validate input
  if (!email || !password || !firstName || !lastName) {
    return { success: false, error: "Missing required fields" }
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { success: false, error: "User already exists" }
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        firstName,
        lastName,
      },
    })

    return { success: true, user: { id: user.id, email: user.email } }
  } catch (error) {
    console.error("Failed to register user:", error)
    return { success: false, error: "Failed to register user" }
  }
}

