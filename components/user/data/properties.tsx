// Property types
export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  formattedPrice: string;
  description: string;
  images: string[];
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  propertyType: "apartment" | "house" | "condo" | "townhouse" | "loft";
  features: Feature[];
  amenities: string[];
  isVerified: boolean;
  isFeatured: boolean;
  availableFrom: string;
  agent: Agent;
  createdAt: string;
}

export interface Feature {
  name: string;
  icon: string;
  available: boolean;
}

export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
  image: string;
  rating: number;
  reviewCount: number;
  properties: number;
  experience: number;
  isVerified: boolean;
}

// Sample property data
export const properties: Property[] = [
  {
    "id": "1",
    "title": "شقة عصرية بإطلالة على المدينة",
    "address": "123 طريق الملك فهد",
    "city": "الرياض",
    "state": "الرياض",
    "zip": "11564",
    "price": 9375,
    "formattedPrice": "9,375",
    "description": "هذه الشقة العصرية المذهلة تتميز بنوافذ من الأرض إلى السقف توفر إطلالات خلابة على المدينة. مساحة المعيشة المفتوحة مثالية للترفيه، بينما تشمل المطبخ الفاخر أجهزة ستانلس ستيل وأسطح كوارتز. تتضمن الغرفة الرئيسية خزانة ملابس مدمجة وحمام فاخر مع حوض استحمام ودش منفصل. تشمل مرافق المبنى بوابًا على مدار الساعة ومركز لياقة وشرفة علوية.",
    "images": [
      "/user/property-1.webp",
      "/user/property-2.jpg",
      "/user/property-3.jpg",
      "/user/property-4.jpg"
    ],
    "beds": 2,
    "baths": 2,
    "sqft": 1200,
    "yearBuilt": 2018,
    "propertyType": "شقة",
    "features": [
      { "name": "شرفة", "icon": "balcony", "available": true },
      { "name": "موقف سيارات", "icon": "parking", "available": true },
      { "name": "واي فاي", "icon": "wifi", "available": true },
      { "name": "مطبخ", "icon": "kitchen", "available": true },
      { "name": "تكييف هواء", "icon": "ac", "available": true }
    ],
    "amenities": [
      "مصعد",
      "مركز لياقة",
      "شرفة علوية",
      "بواب",
      "غسيل ملابس داخل الوحدة",
      "مسموح بالحيوانات الأليفة"
    ],
    "isVerified": true,
    "isFeatured": true,
    "availableFrom": "1 يونيو 2023",
    "agent": {
      "id": "a1",
      "name": "جين سميث",
      "phone": "(555) 123-4567",
      "email": "jane@realestate.com",
      "image": "https://avatar.iran.liara.run/public/boy",
      "rating": 4.8,
      "reviewCount": 124,
      "properties": 45,
      "experience": 7,
      "isVerified": true
    },
    "createdAt": "2023-04-15T10:30:00Z"
  },
  {
    "id": "2",
    "title": "كوندو فاخر في الرياض",
    "address": "456 شارع العليا",
    "city": "الرياض",
    "state": "الرياض",
    "zip": "12211",
    "price": 14250,
    "formattedPrice": "14,250",
    "description": "عش حياة الرفاهية في هذا الكوندو الفاخر في وسط المدينة الذي يتميز بتشطيبات عالية الجودة وإطلالات خلابة. تقدم هذه الوحدة الواسعة مخططًا مفتوحًا مع أرضيات خشبية ومطبخ الشيف مع أجهزة عالية الجودة وغرفة رئيسية مع حمام يشبه المنتجع. يوفر المبنى مرافق خمس نجوم تشمل خدمة الكونسيرج وحمام سباحة لانهاية ومركز لياقة حديث وصالة للمقيمين. يقع في قلب المدينة مع سهولة الوصول إلى التسوق والمطاعم والترفيه.",
    "images": [
      "/user/property-2.jpg",
      "/user/property-1.webp",
      "/user/property-3.jpg",
      "/user/property-4.jpg"
    ],
    "beds": 3,
    "baths": 2,
    "sqft": 1800,
    "yearBuilt": 2015,
    "propertyType": "كوندو",
    "features": [
      { "name": "شرفة", "icon": "balcony", "available": true },
      { "name": "موقف سيارات", "icon": "parking", "available": true },
      { "name": "واي فاي", "icon": "wifi", "available": true },
      { "name": "مطبخ", "icon": "kitchen", "available": true },
      { "name": "تكييف هواء", "icon": "ac", "available": true }
    ],
    "amenities": [
      "كونسيرج",
      "حمام سباحة",
      "مركز لياقة",
      "صالة للمقيمين",
      "غسيل ملابس داخل الوحدة",
      "مسموح بالحيوانات الأليفة",
      "أمن"
    ],
    "isVerified": true,
    "isFeatured": true,
    "availableFrom": "15 مايو 2023",
    "agent": {
      "id": "a2",
      "name": "مايكل جونسون",
      "phone": "(555) 987-6543",
      "email": "michael@realestate.com",
      "image": "https://avatar.iran.liara.run/public/boy",
      "rating": 4.9,
      "reviewCount": 156,
      "properties": 62,
      "experience": 9,
      "isVerified": true
    },
    "createdAt": "2023-04-10T14:45:00Z"
  },
  {
    "id": "3",
    "title": "لوفت في وسط المدينة بسحر صناعي",
    "address": "789 شارع طارق بن زياد",
    "city": "جدة",
    "state": "مكة",
    "zip": "23421",
    "price": 15750,
    "formattedPrice": "15,750",
    "description": "يجمع هذا اللوفت الرائع في وسط المدينة بين السحر الصناعي والرفاهية الحديثة. يتميز بجدران من الطوب المكشوفة وأسقف عالية مع عوارض خشبية أصلية ونوافذ كبيرة تملأ المساحة بالضوء الطبيعي. يشمل مخطط الأرضية المفتوحة مطبخًا فاخرًا مع جزيرة كبيرة وأجهزة ستانلس ستيل وخزائن مخصصة. توفر منطقة النوم الواسعة مساحة كبيرة للخزائن وحمام فاخر ملحق مع دش مدمج. تشمل الميزات الإضافية أرضيات خشبية في جميع أنحاء الوحدة وغسيل ملابس داخل الوحدة وتقنية المنزل الذكي. يقع في مبنى تاريخي مع مصعد وصول وسطح علوي يوفر إطلالات بانورامية على المدينة.",
    "images": [
      "/user/property-3.jpg",
      "/user/property-1.webp",
      "/user/property-2.jpg",
      "/user/property-4.jpg"
    ],
    "beds": 1,
    "baths": 1,
    "sqft": 950,
    "yearBuilt": 1920,
    "propertyType": "لوفت",
    "features": [
      { "name": "أسقف عالية", "icon": "ceiling", "available": true },
      { "name": "طوب مكشوف", "icon": "brick", "available": true },
      { "name": "واي فاي", "icon": "wifi", "available": true },
      { "name": "مطبخ", "icon": "kitchen", "available": true },
      { "name": "تكييف هواء", "icon": "ac", "available": true }
    ],
    "amenities": [
      "مصعد",
      "سطح علوي",
      "غسيل ملابس داخل الوحدة",
      "منزل ذكي",
      "نظام أمني",
      "تخزين دراجات"
    ],
    "isVerified": true,
    "isFeatured": false,
    "availableFrom": "15 يونيو 2023",
    "agent": {
      "id": "a3",
      "name": "سارة ويليامز",
      "phone": "(555) 234-5678",
      "email": "sarah@realestate.com",
      "image": "https://avatar.iran.liara.run/public/boy",
      "rating": 4.7,
      "reviewCount": 98,
      "properties": 37,
      "experience": 5,
      "isVerified": true
    },
    "createdAt": "2023-04-20T09:15:00Z"
  },
  {
    "id": "4",
    "title": "منزل عائلي فسيح مع حديقة",
    "address": "567 حي النخيل",
    "city": "الدمام",
    "state": "المنطقة الشرقية",
    "zip": "32414",
    "price": 20625,
    "formattedPrice": "20,625",
    "description": "منزل عائلي جميل في حي هادئ يتميز بـ 4 غرف نوم و 3 حمامات. يوفر هذا المنزل الواسع غرفة معيشة كبيرة مع مدفأة وغرفة طعام رسمية ومطبخًا حديثًا مع أسطح جرانيت وأجهزة ستانلس ستيل. تتضمن الغرفة الرئيسية خزانة ملابس مدمجة وحمامًا ملحقًا مع حوض استحمام. تحتوي الفناء الخلفي المسور على حديقة ومنطقة فناء وهيكل لعب. تشمل المرافق الإضافية مرآب لسيارتين وتخزين في الطابق السفلي وغرفة غسيل. يقع بالقرب من مدارس ممتازة وحدائق ومراكز تسوق.",
    "images": [
      "/user/property-4.jpg",
      "/user/property-1.webp",
      "/user/property-2.jpg",
      "/user/property-3.jpg"
    ],
    "beds": 4,
    "baths": 3,
    "sqft": 2400,
    "yearBuilt": 2005,
    "propertyType": "منزل",
    "features": [
      { "name": "حديقة", "icon": "garden", "available": true },
      { "name": "مرآب", "icon": "garage", "available": true },
      { "name": "مدفأة", "icon": "fireplace", "available": true },
      { "name": "طابق سفلي", "icon": "basement", "available": true },
      { "name": "تكييف هواء", "icon": "ac", "available": true }
    ],
    "amenities": [
      "فناء مسور",
      "فناء",
      "غرفة غسيل",
      "تخزين",
      "أرضيات خشبية",
      "غرفة عائلية"
    ],
    "isVerified": true,
    "isFeatured": true,
    "availableFrom": "1 يوليو 2023",
    "agent": {
      "id": "a4",
      "name": "ديفيد تشين",
      "phone": "(555) 345-6789",
      "email": "david@realestate.com",
      "image": "https://avatar.iran.liara.run/public/boy",
      "rating": 4.9,
      "reviewCount": 142,
      "properties": 53,
      "experience": 8,
      "isVerified": true
    },
    "createdAt": "2023-04-18T11:20:00Z"
  },
  {
    "id": "5",
    "title": "تاون هاوس ساحر مع شرفة علوية",
    "address": "321 طريق الخبر",
    "city": "الخبر",
    "state": "المنطقة الشرقية",
    "zip": "31952",
    "price": 12000,
    "formattedPrice": "12,000",
    "description": "تاون هاوس ساحر من ثلاث طوابق يتميز بـ 3 غرف نوم و 2.5 حمام. يقدم هذا المنزل الجميل الذي تم تجديده حديثًا أرضيات خشبية في جميع أنحاء المنزل ومطبخًا حديثًا مع أسطح كوارتز وغرفة معيشة فسيحة مع نوافذ كبيرة. تتضمن الغرفة الرئيسية حمامًا ملحقًا وخزانة ملابس مدمجة. تتميز هذه العقار بالشرفة العلوية الخاصة مع إطلالات خلابة على المدينة، مثالية للترفيه. تشمل الميزات الإضافية نصف حمام في الطابق الرئيسي وغسيل ملابس داخل الوحدة ومساحة حديقة صغيرة. يقع بالقرب من وسائل النقل العام والمطاعم والمحلات التجارية.",
    "images": [
      "/user/property-5.png",
      "/user/property-2.jpg",
      "/user/property-3.jpg",
      "/user/property-4.jpg"
    ],
    "beds": 3,
    "baths": 2.5,
    "sqft": 1650,
    "yearBuilt": 1998,
    "propertyType": "تاون هاوس",
    "features": [
      { "name": "شرفة علوية", "icon": "terrace", "available": true },
      { "name": "حديقة", "icon": "garden", "available": true },
      { "name": "واي فاي", "icon": "wifi", "available": true },
      { "name": "مطبخ", "icon": "kitchen", "available": true },
      { "name": "تكييف هواء", "icon": "ac", "available": true }
    ],
    "amenities": [
      "غسيل ملابس داخل الوحدة",
      "أرضيات خشبية",
      "خزانة ملابس مدمجة",
      "متعدد الطوابق",
      "تم تجديده",
      "إطلالات على المدينة"
    ],
    "isVerified": true,
    "isFeatured": false,
    "availableFrom": "1 يونيو 2023",
    "agent": {
      "id": "a5",
      "name": "إيميلي رودريجيز",
      "phone": "(555) 456-7890",
      "email": "emily@realestate.com",
      "image": "https://avatar.iran.liara.run/public/boy",
      "rating": 4.6,
      "reviewCount": 87,
      "properties": 29,
      "experience": 4,
      "isVerified": true
    },
    "createdAt": "2023-04-22T13:40:00Z"
  },
  {
    "id": "6",
    "title": "استوديو أنيق في حي عصري",
    "address": "987 طريق الكورنيش",
    "city": "جدة",
    "state": "مكة",
    "zip": "23432",
    "price": 6750,
    "formattedPrice": "6,750",
    "description": "استوديو أنيق في حي عصري يتميز بتصميم حديث واستخدام فعال للمساحة. تقدم هذه الوحدة التي تم تجديدها مؤخرًا أرضيات خشبية ونوافذ كبيرة مع الكثير من الضوء الطبيعي ومطبخًا أنيقًا مع أجهزة ستانلس ستيل وبار إفطار. تشمل منطقة المعيشة سريرًا مخفيًا لتعظيم المساحة خلال النهار. يتميز الحمام بدش مدمج بأبواب زجاجية وتركيبات معاصرة. تشمل مرافق المبنى صالة سطح مشتركة ومرافق غسيل ملابس وتخزين دراجات. يقع في منطقة حيوية مع العديد من المقاهي والمطاعم والمتاجر على مسافة قريبة.",
    "images": [
      "/user/property-6.jpg",
      "/user/property-2.jpg",
      "/user/property-3.jpg",
      "/user/property-4.jpg"
    ],
    "beds": 0,
    "baths": 1,
    "sqft": 550,
    "yearBuilt": 2010,
    "propertyType": "شقة",
    "features": [
      { "name": "سرير مخفي", "icon": "bed", "available": true },
      { "name": "بار إفطار", "icon": "bar", "available": true },
      { "name": "واي فاي", "icon": "wifi", "available": true },
      { "name": "مطبخ", "icon": "kitchen", "available": true },
      { "name": "تكييف هواء", "icon": "ac", "available": true }
    ],
    "amenities": [
      "صالة سطح",
      "مرافق غسيل ملابس",
      "تخزين دراجات",
      "أرضيات خشبية",
      "تم تجديده",
      "ضوء طبيعي"
    ],
    "isVerified": true,
    "isFeatured": false,
    "availableFrom": "15 مايو 2023",
    "agent": {
      "id": "a1",
      "name": "جين سميث",
      "phone": "(555) 123-4567",
      "email": "jane@realestate.com",
      "image": "https://avatar.iran.liara.run/public/boy",
      "rating": 4.8,
      "reviewCount": 124,
      "properties": 45,
      "experience": 7,
      "isVerified": true
    },
    "createdAt": "2023-04-25T15:10:00Z"
  }
];

// Search filters
export interface SearchFilters {
  priceRange: [number, number];
  beds: number | null;
  baths: number | null;
  propertyType: string | null;
  features: string[];
  sqftRange: [number, number];
  searchTerm?: string;
}

export const defaultSearchFilters: SearchFilters = {
  priceRange: [0, 37500], // ~$10,000 converted to SAR
  beds: null,
  baths: null,
  propertyType: null,
  features: [],
  sqftRange: [0, 5000],
  searchTerm: "",
};

// Property types for filter
export const propertyTypes = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "condo", label: "Condo" },
  { value: "townhouse", label: "Townhouse" },
  { value: "loft", label: "Loft" },
];

// Feature options for filter
export const featureOptions = [
  { value: "balcony", label: "Balcony" },
  { value: "parking", label: "Parking" },
  { value: "wifi", label: "Wifi" },
  { value: "kitchen", label: "Kitchen" },
  { value: "ac", label: "Air Conditioning" },
  { value: "garden", label: "Garden" },
  { value: "fireplace", label: "Fireplace" },
  { value: "terrace", label: "Rooftop Terrace" },
  { value: "garage", label: "Garage" },
];

// Sample saved searches
export const savedSearches: SearchFilters[] = [
  {
    priceRange: [5625, 11250], // ~$1,500-$3,000 converted to SAR
    beds: 2,
    baths: 1,
    propertyType: "apartment",
    features: ["balcony", "parking"],
    sqftRange: [800, 1500],
    searchTerm: "Riyadh",
  },
  {
    priceRange: [11250, 18750], // ~$3,000-$5,000 converted to SAR
    beds: 3,
    baths: 2,
    propertyType: "house",
    features: ["garden", "garage"],
    sqftRange: [1500, 3000],
    searchTerm: "Al Khobar",
  },
  {
    priceRange: [7500, 15000], // ~$2,000-$4,000 converted to SAR
    beds: 1,
    baths: 1,
    propertyType: "loft",
    features: ["wifi", "ac"],
    sqftRange: [700, 1200],
    searchTerm: "Jeddah",
  },
];
