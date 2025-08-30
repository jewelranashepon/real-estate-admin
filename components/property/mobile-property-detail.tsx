// "use client"

// import { useState } from "react"
// import { useTranslations } from "next-intl"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// import {
//   ChevronLeft,
//   ChevronRight,
//   Camera,
//   Heart,
//   Share,
//   MapPin,
//   Phone,
//   MessageSquare,
//   Star,
//   AlertTriangle,
//   Tag,
//   FileText,
//   Info,
// } from "lucide-react"
// import { cn } from "@/lib/utils"
// import Link from "next/link"
// import LanguageSelector from "../home/language-selector"

// interface MobilePropertyDetailProps {
//   id: string
//   locale: string
// }

// export default function MobilePropertyDetail({ id, locale }: MobilePropertyDetailProps) {
//   const t = useTranslations("app.property")
//   const isRtl = locale === "ar"
//   const [activeTab, setActiveTab] = useState("details")

//   return (
//     <main className="flex flex-col h-screen bg-white">
//       {/* Property Image Header */}
//       <div className="relative h-64 bg-gray-200">
//         <Image src="/dt4.jpg" alt="Property" fill className="object-cover" />

//         {/* Top Navigation */}
//         <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
//           <Link href={`/${locale}`}>
//             <Button size="sm" variant="outline" className="bg-white/80 h-8 px-2">
//               <ChevronLeft className="h-4 w-4 mr-1" />
//               {t('Back')}
//             </Button>
//           </Link>
//           <div className="flex gap-2">
//             <LanguageSelector/>
//             <Button size="icon" variant="outline" className="bg-white/80 h-8 w-8 rounded-full">
//               <Share className="h-4 w-4" />
//             </Button>
//             <Button size="icon" variant="outline" className="bg-white/80 h-8 w-8 rounded-full">
//               <Heart className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>

//         {/* Image Counter */}
//         <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center">
//           <Camera className="h-3 w-3 mr-1" />
//           {t('seeAllPhotos')}
//         </div>
//       </div>

//       {/* Content Area */}
//       <div className="flex-1 overflow-y-auto">
//         <Tabs defaultValue="details" className="w-full">
//           <div className="px-4 pt-4 pb-2">
//             <div className="flex items-center mb-2">
//               <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white mr-2">
//                 م.ع
//               </div>
//               <div>
//                 <h2 className="font-bold text-lg">م. عمر المصيريع</h2>
//                 <div className="flex items-center">
//                   <Star className="h-4 w-4 text-yellow-400 mr-1" />
//                   <span className="text-sm">{t('Reviews')} (10)</span>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Buttons */}
//             <div className="grid grid-cols-3 gap-2 mb-4">
//               <Button className="bg-green-500 hover:bg-green-600 flex items-center justify-center">
//                 <Phone className="h-4 w-4 mr-1" />
//                 {t('Call')}
//               </Button>
//               <Button className="bg-green-400 hover:bg-green-500 flex items-center justify-center">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="mr-1"
//                 >
//                   <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
//                 </svg>
//                 {t('Whatsapp')}
//               </Button>
//               <Button className="bg-blue-500 hover:bg-blue-600 flex items-center justify-center">
//                 <MessageSquare className="h-4 w-4 mr-1" />
//                 {t('Chat')}
//               </Button>
//             </div>

//             {/* Advertisement Notice */}
//             <div className="bg-gray-100 p-3 rounded-md mb-4 flex items-start">
//               <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
//               <p className="text-xs text-gray-600">
//                {t('Ads')}
//               </p>
//             </div>

//             <h3 className="font-bold text-lg mb-2">{t('Dist')}</h3>

//             <div className="flex items-center mb-4">
//               <div className="mr-2">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path
//                     d="M2 12H4M20 12H22M12 2V4M12 20V22M6.34 6.34L4.93 4.93M19.07 4.93L17.66 6.34M17.66 17.66L19.07 19.07M4.93 19.07L6.34 17.66"
//                     stroke="#10B981"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                   />
//                   <path
//                     d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
//                     stroke="#10B981"
//                     strokeWidth="2"
//                   />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-sm font-medium">{t('Avg')}</p>
//                 <p className="text-sm text-gray-600">{t('SemiAnnually')}</p>
//               </div>
//             </div>

//             <p className="text-xs text-gray-500 mb-4">{t('Platform')}</p>
//           </div>

//           {/* Tabs Navigation */}
//           <TabsList className="grid grid-cols-3 bg-gray-100 p-1 rounded-none border-y">
//             <TabsTrigger
//               value="details"
//               className={cn("rounded-md text-sm", activeTab === "details" ? "bg-white shadow-sm" : "")}
//               onClick={() => setActiveTab("details")}
//             >
//              {t('LD')}
//             </TabsTrigger>
//             <TabsTrigger
//               value="additional"
//               className={cn("rounded-md text-sm", activeTab === "additional" ? "bg-white shadow-sm" : "")}
//               onClick={() => setActiveTab("additional")}
//             >
//              {t('AddInfo')}
//             </TabsTrigger>
//             <TabsTrigger
//               value="location"
//               className={cn("rounded-md text-sm", activeTab === "location" ? "bg-white shadow-sm" : "")}
//               onClick={() => setActiveTab("location")}
//             >
//              {t('Location')}
//             </TabsTrigger>
//           </TabsList>

//           {/* Tab Contents */}
//           <TabsContent value="details" className="p-4 mt-0">
//             <div className="space-y-4">
//               <div className="border-b pb-4">
//                 <h2 className="text-xl font-bold mb-2">{t('Sale')}</h2>
//                 <p className="text-green-600 font-bold text-xl mb-4">1,100,000 SAR</p>

//                 <div className="flex justify-between mb-4">
//                   <span className="text-gray-600">{t('property')}</span>
//                   <Button variant="outline" className="text-blue-500 border-blue-500 h-8">
//                     {t('financingOptions')}
//                   </Button>
//                 </div>

//                 <h3 className="font-bold mb-2">{t('LD')}</h3>

//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <FileText className="h-5 w-5 mr-2 text-gray-500" />
//                       <span>{t('Area')}</span>
//                     </div>
//                     <span className="font-medium">1013</span>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <Tag className="h-5 w-5 mr-2 text-gray-500" />
//                       <span>{t('PPM')}</span>
//                     </div>
//                     <span className="font-medium">1085 Riyal</span>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <MapPin className="h-5 w-5 mr-2 text-gray-500" />
//                       <span>{t('SD')}</span>
//                     </div>
//                     <span className="font-medium">3 {t('Streets')}</span>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <Info className="h-5 w-5 mr-2 text-gray-500" />
//                       <span>{t('Type')}</span>
//                     </div>
//                     <span className="font-medium">{t("Residential")}</span>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="20"
//                         height="20"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="mr-2 text-gray-500"
//                       >
//                         <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
//                       </svg>
//                       <span>{t('StreetWidth')}</span>
//                     </div>
//                     <span className="font-medium">{t('25Meter')}</span>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <h3 className="font-bold mb-2">{t('PropertyFeatures')}</h3>
//                 {/* Features would go here */}
//               </div>
//             </div>
//           </TabsContent>

//           <TabsContent value="additional" className="p-4 mt-0">
//             <div className="space-y-3">
//               <div className="flex items-center justify-between py-2 border-b">
//                 <span className="text-gray-600">{t('ListingID')}</span>
//                 <span className="font-medium">6100932</span>
//               </div>

//               <div className="flex items-center justify-between py-2 border-b">
//                 <span className="text-gray-600">{t('CreatedAt')}</span>
//                 <span className="font-medium">2025/02/11</span>
//               </div>

//               <div className="flex items-center justify-between py-2 border-b">
//                 <span className="text-gray-600">{t('LicenseNumber')}</span>
//                 <span className="font-medium">7200438430</span>
//               </div>

//               <div className="flex items-center justify-between py-2 border-b">
//                 <span className="text-gray-600">{t('LastUpdated')}</span>
//                 <span className="font-medium">3 {t('DaysAgo')}</span>
//               </div>

//               <div className="flex items-center justify-between py-2 border-b">
//                 <span className="text-gray-600">{t('LED')}</span>
//                 <span className="font-medium">01/02/2026</span>
//               </div>

//               <div className="flex items-center justify-between py-2 border-b">
//                 <span className="text-gray-600">{t('Source')}</span>
//                 <span className="font-medium text-right">الهيئة العامة للعقار</span>
//               </div>

//               <div className="flex items-center justify-between py-2 border-b">
//                 <span className="text-gray-600">{t('DeedArea')}</span>
//                 <span className="font-medium">1013.87 M2</span>
//               </div>

//               <div className="flex justify-center mt-4">
//                 <Button variant="outline" className="text-red-500 border-red-500">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="16"
//                     height="16"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="mr-2 text-red-500"
//                   >
//                     <path d="M3 6h18"></path>
//                     <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
//                     <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
//                     <line x1="10" y1="11" x2="10" y2="17"></line>
//                     <line x1="14" y1="11" x2="14" y2="17"></line>
//                   </svg>
//                  {t('ReportAdd')}
//                 </Button>
//               </div>
//             </div>
//           </TabsContent>

//           <TabsContent value="location" className="mt-0">
//             <div className="p-4">
//               <h3 className="font-bold mb-2">{t('Extra')}</h3>
//               <p className="text-gray-600 mb-4 text-right">
//                 للبيع أرض سكنية على ثلاث شوارع حي جوهرة الأحمد داخل النطاق العمراني المدينة المنورة
//               </p>
//               <Button variant="link" className="text-blue-500 p-0 h-auto mb-4">
//                {t('RM')}
//               </Button>
//             </div>

//             <div className="px-4 pb-4">
//               <div className="bg-green-500 text-white p-4 rounded-lg flex items-center mb-4">
//                 <div className="mr-4">
//                   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path
//                       d="M20 9V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V17"
//                       stroke="white"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                     />
//                     <path
//                       d="M12 12H21M21 12L18 9M21 12L18 15"
//                       stroke="white"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-lg">أجرة تسويق</h4>
//                   <p>إدفع بعد البيع</p>
//                 </div>
//                 <div className="ml-auto">
//                   <Image
//                     src="/QRCode.png"
//                     alt="QR Code"
//                     width={60}
//                     height={60}
//                     className="bg-white p-1 rounded"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="px-4 pb-4">
//               <h3 className="font-bold mb-2">{t('Location')}</h3>
//               <div className="h-48 bg-gray-200 rounded-lg overflow-hidden relative">
//                 <Image src="/map.png" alt="Map" fill className="object-cover" />
//               </div>
//             </div>
//           </TabsContent>
//         </Tabs>

//         <div className="p-4">
//           <h3 className="font-bold mb-3">{t('Similaradsnearby')}</h3>
//           <div className="space-y-3">
//             <SimilarListing
//               title="Store for sale"
//               price="5,200,000 SAR"
//               area="322m²"
//               type="Commercial or residential"
//               imageUrl="/dt3.jpg"
//             />
//             <SimilarListing
//               title="Apartment for sale"
//               price="1,200,000 SAR"
//               area="240m²"
//               type="Commercial or residential"
//               imageUrl="/dt4.jpg"
//             />
//             <SimilarListing
//               title="Villa for sale"
//               price="3,500,000 SAR"
//               area="344m²"
//               type="Commercial or residential"
//               imageUrl="/dt5.webp"
//             />
//             <SimilarListing
//               title="Lounge for Sale"
//               price="1,700,000 SAR"
//               area="344m²"
//               type="Commercial or residential"
//               imageUrl="/pj1.jpg"
//             />
//           </div>

//           <Button className="w-full mt-4 bg-green-500 hover:bg-green-600">{t('Follow')}</Button>
//         </div>
//       </div>

//       {/* Bottom Navigation */}
//       <div className="grid grid-cols-5 border-t">
//         <Button variant="ghost" className="flex flex-col items-center justify-center py-2 rounded-none">
//           <ChevronLeft className="h-5 w-5" />
//         </Button>
//         <Button variant="ghost" className="flex flex-col items-center justify-center py-2 rounded-none">
//           <Phone className="h-5 w-5 text-green-500" />
//         </Button>
//         <Button variant="ghost" className="flex flex-col items-center justify-center py-2 rounded-none">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="20"
//             height="20"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="text-green-500"
//           >
//             <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
//           </svg>
//         </Button>
//         <Button variant="ghost" className="flex flex-col items-center justify-center py-2 rounded-none">
//           <MessageSquare className="h-5 w-5 text-blue-500" />
//         </Button>
//         <Button variant="ghost" className="flex flex-col items-center justify-center py-2 rounded-none">
//           <ChevronRight className="h-5 w-5" />
//         </Button>
//       </div>
//     </main>
//   )
// }

// interface SimilarListingProps {
//   title: string
//   price: string
//   area: string
//   type: string
//   imageUrl: string
// }

// function SimilarListing({ title, price, area, type, imageUrl }: SimilarListingProps) {
//   return (
//     <div className="flex items-center border-b pb-3">
//       <div className="flex-1">
//         <h4 className="font-medium text-sm text-green-600">{title}</h4>
//         <p className="text-green-600 text-sm">{price}</p>
//         <div className="flex items-center mt-1">
//           <div className="bg-gray-100 text-xs px-2 py-0.5 rounded-sm">{area}</div>
//         </div>
//         <div className="text-gray-500 text-xs mt-1">• {type}</div>
//         <div className="text-gray-500 text-xs mt-1 text-right">• شارع الخليج، الخبر، المملكة العربية الأردن</div>
//       </div>
//       <div className="w-20 h-20 relative ml-3">
//         <Image
//           src={imageUrl || "/placeholder.svg"}
//           alt={title}
//           width={80}
//           height={80}
//           className="object-cover rounded"
//         />
//       </div>
//     </div>
//   )
// }




"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  ChevronLeft,
  ChevronRight,
  Camera,
  Heart,
  Share,
  MapPin,
  Phone,
  MessageSquare,
  Star,
  AlertTriangle,
  Tag,
  FileText,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import LanguageSelector from "../home/language-selector"
import { PropertyMessageForm } from "./PropertyMessageForm "

interface MobilePropertyDetailProps {
  id: string
  locale: string
}

export default function MobilePropertyDetail({ id, locale }: MobilePropertyDetailProps) {
  const t = useTranslations("app.property")
  const isRtl = locale === "ar"
  const [activeTab, setActiveTab] = useState("details")
  const [messageFormOpen, setMessageFormOpen] = useState(false)

  // This would typically come from your database
  const propertyName = "Land for sale in Al-Ahmad district"

  const handleChatClick = () => {
    setMessageFormOpen(true)
  }

  return (
    <main className="flex flex-col h-screen bg-white">
      {/* Property Image Header */}
      <div className="relative h-64 bg-gray-200">
        <Image src="/dt4.jpg" alt="Property" fill className="object-cover" />

        {/* Top Navigation */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
          <Link href={`/${locale}`}>
            <Button size="sm" variant="outline" className="bg-white/80 h-8 px-2">
              <ChevronLeft className="h-4 w-4 mr-1" />
              {t("Back")}
            </Button>
          </Link>
          <div className="flex gap-2">
            <LanguageSelector />
            <Button size="icon" variant="outline" className="bg-white/80 h-8 w-8 rounded-full">
              <Share className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" className="bg-white/80 h-8 w-8 rounded-full">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center">
          <Camera className="h-3 w-3 mr-1" />
          {t("seeAllPhotos")}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="details" className="w-full">
          <div className="px-4 pt-4 pb-2">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white mr-2">
                م.ع
              </div>
              <div>
                <h2 className="font-bold text-lg">م. عمر المصيريع</h2>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm">{t("Reviews")} (10)</span>
                </div>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <Button className="bg-green-500 hover:bg-green-600 flex items-center justify-center">
                <Phone className="h-4 w-4 mr-1" />
                {t("Call")}
              </Button>
              <Button className="bg-green-400 hover:bg-green-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                {t("Whatsapp")}
              </Button>
              <Button
                className="bg-blue-500 hover:bg-blue-600 flex items-center justify-center"
                onClick={handleChatClick}
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                {t("Chat")}
              </Button>
            </div>

            {/* Advertisement Notice */}
            <div className="bg-gray-100 p-3 rounded-md mb-4 flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600">{t("Ads")}</p>
            </div>

            <h3 className="font-bold text-lg mb-2">{t("Dist")}</h3>

            <div className="flex items-center mb-4">
              <div className="mr-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2 12H4M20 12H22M12 2V4M12 20V22M6.34 6.34L4.93 4.93M19.07 4.93L17.66 6.34M17.66 17.66L19.07 19.07M4.93 19.07L6.34 17.66"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
                    stroke="#10B981"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">{t("Avg")}</p>
                <p className="text-sm text-gray-600">{t("SemiAnnually")}</p>
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-4">{t("Platform")}</p>
          </div>

          {/* Tabs Navigation */}
          <TabsList className="grid grid-cols-3 bg-gray-100 p-1 rounded-none border-y">
            <TabsTrigger
              value="details"
              className={cn("rounded-md text-sm", activeTab === "details" ? "bg-white shadow-sm" : "")}
              onClick={() => setActiveTab("details")}
            >
              {t("LD")}
            </TabsTrigger>
            <TabsTrigger
              value="additional"
              className={cn("rounded-md text-sm", activeTab === "additional" ? "bg-white shadow-sm" : "")}
              onClick={() => setActiveTab("additional")}
            >
              {t("AddInfo")}
            </TabsTrigger>
            <TabsTrigger
              value="location"
              className={cn("rounded-md text-sm", activeTab === "location" ? "bg-white shadow-sm" : "")}
              onClick={() => setActiveTab("location")}
            >
              {t("Location")}
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="details" className="p-4 mt-0">
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h2 className="text-xl font-bold mb-2">{t("Sale")}</h2>
                <p className="text-green-600 font-bold text-xl mb-4">1,100,000 SAR</p>

                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">{t("property")}</span>
                  <Button variant="outline" className="text-blue-500 border-blue-500 h-8">
                    {t("financingOptions")}
                  </Button>
                </div>

                <h3 className="font-bold mb-2">{t("LD")}</h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-gray-500" />
                      <span>{t("Area")}</span>
                    </div>
                    <span className="font-medium">1013</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Tag className="h-5 w-5 mr-2 text-gray-500" />
                      <span>{t("PPM")}</span>
                    </div>
                    <span className="font-medium">1085 Riyal</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                      <span>{t("SD")}</span>
                    </div>
                    <span className="font-medium">3 {t("Streets")}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Info className="h-5 w-5 mr-2 text-gray-500" />
                      <span>{t("Type")}</span>
                    </div>
                    <span className="font-medium">{t("Residential")}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-gray-500"
                      >
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                      </svg>
                      <span>{t("StreetWidth")}</span>
                    </div>
                    <span className="font-medium">{t("25Meter")}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2">{t("PropertyFeatures")}</h3>
                {/* Features would go here */}
              </div>
            </div>
          </TabsContent>

          {/* Other tab contents remain the same */}
          {/* ... */}
        </Tabs>

        {/* Similar listings section remains the same */}
        {/* ... */}
      </div>

      {/* Bottom Navigation */}
      <div className="grid grid-cols-5 border-t">
        <Button variant="ghost" className="flex flex-col items-center justify-center py-2 rounded-none">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" className="flex flex-col items-center justify-center py-2 rounded-none">
          <Phone className="h-5 w-5 text-green-500" />
        </Button>
        <Button variant="ghost" className="flex flex-col items-center justify-center py-2 rounded-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-500"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </Button>
        <Button
          variant="ghost"
          className="flex flex-col items-center justify-center py-2 rounded-none"
          onClick={handleChatClick}
        >
          <MessageSquare className="h-5 w-5 text-blue-500" />
        </Button>
        <Button variant="ghost" className="flex flex-col items-center justify-center py-2 rounded-none">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Message Form Dialog */}
      <PropertyMessageForm
        open={messageFormOpen}
        onOpenChange={setMessageFormOpen}
        propertyId={id}
        propertyName={propertyName}
      />
    </main>
  )
}

interface SimilarListingProps {
  title: string
  price: string
  area: string
  type: string
  imageUrl: string
}

function SimilarListing({ title, price, area, type, imageUrl }: SimilarListingProps) {
  return (
    <div className="flex items-center border-b pb-3">
      <div className="flex-1">
        <h4 className="font-medium text-sm text-green-600">{title}</h4>
        <p className="text-green-600 text-sm">{price}</p>
        <div className="flex items-center mt-1">
          <div className="bg-gray-100 text-xs px-2 py-0.5 rounded-sm">{area}</div>
        </div>
        <div className="text-gray-500 text-xs mt-1">• {type}</div>
        <div className="text-gray-500 text-xs mt-1 text-right">• شارع الخليج، الخبر، المملكة العربية الأردن</div>
      </div>
      <div className="w-20 h-20 relative ml-3">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={80}
          height={80}
          className="object-cover rounded"
        />
      </div>
    </div>
  )
}
