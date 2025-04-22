export interface Agent {
  id: string
  name: string
  email: string
  phone: string
  licenseNumber: string
  licenseExpiry: string
  avatar: string
  notifications: number
}

export const agent: Agent = {
  id: "agent-1",
  name: "Ahmed Khan",
  email: "ahmed.khan@example.com",
  phone: "+966 50 123 4567",
  licenseNumber: "FAL-12345",
  licenseExpiry: "2024-12-31",
  avatar: "/placeholder.svg?height=200&width=200",
  notifications: 3,
}
