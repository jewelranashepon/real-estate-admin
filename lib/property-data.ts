export interface PropertyData {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  price: number;
  area: number;
  type: {
    en: string;
    ar: string;
  };
  address: {
    en: string;
    ar: string;
  };
  imageUrl: string;
  showPrice?: boolean;
}

export const propertyListings: PropertyData[] = [
  {
    id: "1",
    title: {
      en: "Lounge for Sale",
      ar: "صالة للبيع",
    },
    price: 325000,
    area: 322,
    type: {
      en: "Commercial or residential",
      ar: "تجاري أو سكني",
    },
    address: {
      en: "Abdoun, Amman, Jordan",
      ar: "عبدون، عمّان، الأردن",
    },
    imageUrl: "/dt3.jpg",
  },
  {
    id: "2",
    title: {
      en: "Store for sale",
      ar: "محل للبيع",
    },
    price: 300000,
    area: 280,
    type: {
      en: "Commercial or residential",
      ar: "تجاري أو سكني",
    },
    address: {
      en: "Al Abdali, Amman, Jordan",
      ar: "العبدلي، عمّان، الأردن",
    },
    imageUrl: "/dt3.jpg",
  },
  {
    id: "3",
    title: {
      en: "Apartment for sale",
      ar: "شقة للبيع",
    },
    price: 200000,
    area: 322,
    type: {
      en: "Commercial or residential",
      ar: "تجاري أو سكني",
    },
    address: {
      en: "Jabal Amman, Amman, Jordan",
      ar: "جبل عمّان، عمّان، الأردن",
    },
    imageUrl: "/dt3.jpg",
  },
  {
    id: "4",
    title: {
      en: "Villa for sale",
      ar: "فيلا للبيع",
    },
    price: 200000,
    area: 344,
    type: {
      en: "Commercial or residential",
      ar: "تجاري أو سكني",
    },
    address: {
      en: "Dabouq, Amman, Jordan",
      ar: "دابوق، عمّان، الأردن",
    },
    imageUrl: "/dt3.jpg",
  },
  {
    id: "5",
    title: {
      en: "Apartment for sale",
      ar: "شقة للبيع",
    },
    price: 0,
    area: 0,
    type: {
      en: "Commercial or residential",
      ar: "تجاري أو سكني",
    },
    address: {
      en: "Sweifieh, Amman, Jordan",
      ar: "الصويفية، عمّان، الأردن",
    },
    imageUrl: "/dt3.jpg",
    showPrice: false,
  },
];
