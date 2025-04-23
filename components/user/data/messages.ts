export interface Message {
  id: string;
  subject: string;
  content: string;
  sender: {
    id: string;
    name: string;
    image?: string;
    isAgent: boolean;
  };
  timestamp: string;
  read: boolean;
  propertyId?: string;
}

export const messages: Message[] = [
  {
    id: "m1",
    subject: "Inquiry about Modern Apartment",
    content:
      "Hello, I'm interested in the Modern Apartment with City View. Is it still available for the dates mentioned? Also, I was wondering if the building has a fitness center and if pets are allowed. Looking forward to your response!",
    sender: {
      id: "a1",
      name: "Jane Smith",
      isAgent: true,
    },
    timestamp: "2023-05-15T10:30:00Z",
    read: false,
    propertyId: "1",
  },
  {
    id: "m2",
    subject: "Offer Accepted for Downtown Loft",
    content:
      "Great news! The owner has accepted your offer for the Downtown Loft with Industrial Charm. I've attached the necessary paperwork for you to review and sign. Please let me know if you have any questions about the next steps in the process. Congratulations!",
    sender: {
      id: "a3",
      name: "Sarah Williams",
      isAgent: true,
    },
    timestamp: "2023-05-14T15:45:00Z",
    read: false,
    propertyId: "3",
  },
  {
    id: "m3",
    subject: "Viewing Appointment Confirmation",
    content:
      "This is to confirm your appointment to view the Luxury Condo in Downtown on May 20th at 2:00 PM. I'll meet you at the lobby of the building. Please bring a photo ID for security purposes. Looking forward to showing you this beautiful property!",
    sender: {
      id: "a2",
      name: "Michael Johnson",
      isAgent: true,
    },
    timestamp: "2023-05-13T09:15:00Z",
    read: true,
    propertyId: "2",
  },
  {
    id: "m4",
    subject: "Lease Agreement for Review",
    content:
      "Attached is the lease agreement for the Stylish Studio in Trendy Neighborhood. Please review it carefully and let me know if you have any questions or concerns. Once you're ready, you can sign it electronically through the secure link provided. We'll need the signed agreement and the security deposit to finalize the rental.",
    sender: {
      id: "a1",
      name: "Jane Smith",
      isAgent: true,
    },
    timestamp: "2023-05-12T14:20:00Z",
    read: true,
    propertyId: "6",
  },
  {
    id: "m5",
    subject: "Property Maintenance Update",
    content:
      "I wanted to inform you that the maintenance team will be conducting routine checks of the HVAC systems in all units next Tuesday between 10 AM and 2 PM. They will need access to your apartment during this time. If this schedule doesn't work for you, please let me know so we can arrange an alternative time.",
    sender: {
      id: "s1",
      name: "Building Management",
      isAgent: false,
    },
    timestamp: "2023-05-11T11:05:00Z",
    read: true,
  },
];
