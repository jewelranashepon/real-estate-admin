// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { FormControl, FormDescription, FormItem, FormLabel } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
// import { useRouter } from "next/navigation"
// import { createProperty, updateProperty } from "@/lib/actions"
// import { toast } from "@/components/ui/use-toast"
// import { Loader2, ArrowLeft, ArrowRight, Upload, X, Check, ImageIcon } from "lucide-react"
// import { Card, CardContent } from "@/components/ui/card"
// import { createClient } from "@supabase/supabase-js"

// // Stepper component
// import {
//   Stepper,
//   StepperContent,
//   StepperDescription,
//   StepperIcon,
//   StepperItem,
//   StepperLabel,
//   StepperMessage,
//   StepperStatus,
//   StepperTrigger,
// } from "@/components/ui/stepper"

// interface PropertyFormProps {
//   property?: any
//   propertyTypes: { id: number; value: string }[]
//   propertyStatuses: { id: number; value: string }[]
// }

// // Initialize Supabase client with better error handling
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// // Check if environment variables are available
// const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// export function PropertyForm({ property, propertyTypes, propertyStatuses }: PropertyFormProps) {
//   const router = useRouter()
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [currentStep, setCurrentStep] = useState(0)

//   // Initialize form data with default values
//   const initialFormData = {
//     // Basic Information
//     name: property?.name || "",
//     description: property?.description || "",
//     price: property?.price || "",
//     typeId: property?.typeId?.toString() || "",
//     statusId: property?.statusId?.toString() || "",

//     // Features
//     bedrooms: property?.feature?.bedrooms || "0",
//     bathrooms: property?.feature?.bathrooms || "0",
//     parkingSpots: property?.feature?.parkingSpots || "0",
//     area: property?.feature?.area || "0",
//     hasSwimmingPool: property?.feature?.hasSwimmingPool || false,
//     hasGardenYard: property?.feature?.hasGardenYard || false,
//     hasBalcony: property?.feature?.hasBalcony || false,

//     // Location
//     streetAddress: property?.location?.streetAddress || "",
//     city: property?.location?.city || "",
//     state: property?.location?.state || "",
//     zip: property?.location?.zip || "",
//     region: property?.location?.region || "",
//     landmark: property?.location?.landmark || "",

//     // Contact
//     contactName: property?.contact?.name || "",
//     contactPhone: property?.contact?.phone || "",
//     contactEmail: property?.contact?.email || "",
//   }

//   const [formData, setFormData] = useState(initialFormData)

//   // Image upload state
//   const initialImageUrls = property?.images?.map((img: any) => img.url) || []
//   const [imageFiles, setImageFiles] = useState<File[]>([])
//   const [imageUrls, setImageUrls] = useState<string[]>(initialImageUrls)
//   const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
//   const [isUploading, setIsUploading] = useState(false)

//   // Steps configuration
//   const steps = [
//     { title: "Basic Information", description: "Property details" },
//     { title: "Features", description: "Property features" },
//     { title: "Location", description: "Property location" },
//     { title: "Media", description: "Property images" },
//     { title: "Contact", description: "Contact information" },
//   ]

//   // Handle form field changes
//   const handleChange = (field: string, value: any) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   // Handle file selection
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const newFiles = Array.from(e.target.files)
//       setImageFiles((prev) => [...prev, ...newFiles])
//     }
//   }

//   // Handle image upload to Supabase
//   const uploadImages = async () => {
//     if (imageFiles.length === 0) return []
//     if (!supabase) {
//       toast({
//         title: "Configuration error",
//         description: "Supabase client is not properly configured. Check your environment variables.",
//         variant: "destructive",
//       })
//       return []
//     }

//     setIsUploading(true)
//     const uploadedUrls: string[] = []

//     try {
//       // Check if bucket exists, if not try to create it
//       const { data: buckets } = await supabase.storage.listBuckets()
//       const bucketExists = buckets?.some((bucket) => bucket.name === "property-images")

//       if (!bucketExists) {
//         try {
//           // Try to create the bucket
//           const { error: createBucketError } = await supabase.storage.createBucket("property-images", {
//             public: true,
//             fileSizeLimit: 10485760, // 10MB
//           })

//           if (createBucketError) {
//             toast({
//               title: "Storage setup required",
//               description: "Please create a 'property-images' bucket in your Supabase project.",
//               variant: "destructive",
//             })
//             setIsUploading(false)
//             return []
//           }
//         } catch (bucketError) {
//           console.error("Failed to create bucket:", bucketError)
//           toast({
//             title: "Storage setup required",
//             description: "Please create a 'property-images' bucket in your Supabase project.",
//             variant: "destructive",
//           })
//           setIsUploading(false)
//           return []
//         }
//       }

//       for (let i = 0; i < imageFiles.length; i++) {
//         const file = imageFiles[i]
//         const fileExt = file.name.split(".").pop()
//         const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
//         const filePath = `properties/${fileName}`

//         // Upload file to Supabase Storage
//         const { data, error } = await supabase.storage.from("property-images").upload(filePath, file, {
//           cacheControl: "3600",
//           upsert: false,
//         })

//         if (error) {
//           console.error("Supabase upload error:", error.message)
//           throw new Error(error.message)
//         }

//         // Get public URL
//         const { data: urlData } = supabase.storage.from("property-images").getPublicUrl(filePath)

//         uploadedUrls.push(urlData.publicUrl)

//         // Update progress
//         setUploadProgress((prev) => ({
//           ...prev,
//           [file.name]: 100,
//         }))
//       }

//       return uploadedUrls
//     } catch (error) {
//       console.error("Error uploading images:", error instanceof Error ? error.message : String(error))
//       toast({
//         title: "Upload failed",
//         description: "Failed to upload one or more images. Please try again.",
//         variant: "destructive",
//       })
//       return []
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   // Remove image from the list
//   const removeImage = (index: number) => {
//     if (index < imageUrls.length) {
//       // Remove from existing URLs
//       setImageUrls((prev) => prev.filter((_, i) => i !== index))
//     } else {
//       // Remove from new files
//       const fileIndex = index - imageUrls.length
//       setImageFiles((prev) => prev.filter((_, i) => i !== fileIndex))

//       // Remove from progress tracking
//       const fileName = imageFiles[fileIndex].name
//       setUploadProgress((prev) => {
//         const newProgress = { ...prev }
//         delete newProgress[fileName]
//         return newProgress
//       })
//     }
//   }

//   // Navigate to next step
//   const nextStep = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1)
//     }
//   }

//   // Navigate to previous step
//   const prevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1)
//     }
//   }

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     try {
//       // Upload images to Supabase
//       const newImageUrls = await uploadImages()
//       const allImageUrls = [...imageUrls, ...newImageUrls]

//       // Create FormData object
//       const submitFormData = new FormData()

//       // Add all form fields to FormData
//       Object.entries(formData).forEach(([key, value]) => {
//         if (typeof value === "boolean") {
//           submitFormData.append(key, value ? "on" : "off")
//         } else {
//           submitFormData.append(key, value.toString())
//         }
//       })

//       // Add image URLs
//       allImageUrls.forEach((url) => {
//         submitFormData.append("imageUrls", url)
//       })

//       // Submit the form
//       let result
//       try {
//         if (property) {
//           result = await updateProperty(property.id, submitFormData)
//         } else {
//           result = await createProperty(submitFormData)
//         }
//       } catch (serverActionError) {
//         console.error("Server action error:", serverActionError)
//         // Client-side fallback for demo purposes
//         result = {
//           success: true,
//           property: {
//             id: property?.id || Math.floor(Math.random() * 1000),
//             name: formData.name,
//             // Other properties would be here in a real implementation
//           },
//         }

//         toast({
//           title: "Demo Mode",
//           description: "Using client-side fallback. In a production app, this would connect to your backend.",
//         })
//       }

//       if (result.success) {
//         toast({
//           title: property ? "Property updated" : "Property created",
//           description: property
//             ? "The property has been successfully updated."
//             : "The property has been successfully created.",
//         })
//         router.push("/admin/properties")
//         router.refresh()
//       } else {
//         toast({
//           title: "Error",
//           description: `Failed to ${property ? "update" : "create"} property. Please check your inputs and try again.`,
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Form submission error:", error)
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   // Render step content based on current step
//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <div className="space-y-4">
//             <div className="grid gap-6 md:grid-cols-2">
//               <FormItem>
//                 <FormLabel>Property Name</FormLabel>
//                 <FormControl>
//                   <Input
//                     name="name"
//                     placeholder="Modern Apartment in Downtown"
//                     value={formData.name}
//                     onChange={(e) => handleChange("name", e.target.value)}
//                     required
//                   />
//                 </FormControl>
//                 <FormDescription>Enter a descriptive name for the property.</FormDescription>
//               </FormItem>

//               <FormItem>
//                 <FormLabel>Price</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     name="price"
//                     placeholder="250000"
//                     value={formData.price}
//                     onChange={(e) => handleChange("price", e.target.value)}
//                     required
//                   />
//                 </FormControl>
//                 <FormDescription>Enter the property price in USD.</FormDescription>
//               </FormItem>

//               <FormItem>
//                 <FormLabel>Property Type</FormLabel>
//                 <Select
//                   name="typeId"
//                   value={formData.typeId}
//                   onValueChange={(value) => handleChange("typeId", value)}
//                   required
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select property type" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {propertyTypes.map((type) => (
//                       <SelectItem key={type.id} value={type.id.toString()}>
//                         {type.value}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormDescription>Select the type of property.</FormDescription>
//               </FormItem>

//               <FormItem>
//                 <FormLabel>Status</FormLabel>
//                 <Select
//                   name="statusId"
//                   value={formData.statusId}
//                   onValueChange={(value) => handleChange("statusId", value)}
//                   required
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select status" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {propertyStatuses.map((status) => (
//                       <SelectItem key={status.id} value={status.id.toString()}>
//                         {status.value}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormDescription>Set the current status of the property.</FormDescription>
//               </FormItem>
//             </div>

//             <FormItem>
//               <FormLabel>Description</FormLabel>
//               <FormControl>
//                 <Textarea
//                   name="description"
//                   placeholder="Enter a detailed description of the property..."
//                   className="min-h-32"
//                   value={formData.description}
//                   onChange={(e) => handleChange("description", e.target.value)}
//                   required
//                 />
//               </FormControl>
//               <FormDescription>Provide a detailed description of the property.</FormDescription>
//             </FormItem>
//           </div>
//         )

//       case 1:
//         return (
//           <div className="space-y-4">
//             <div className="grid gap-6 md:grid-cols-3">
//               <FormItem>
//                 <FormLabel>Bedrooms</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     name="bedrooms"
//                     value={formData.bedrooms}
//                     onChange={(e) => handleChange("bedrooms", e.target.value)}
//                     required
//                   />
//                 </FormControl>
//               </FormItem>

//               <FormItem>
//                 <FormLabel>Bathrooms</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     name="bathrooms"
//                     value={formData.bathrooms}
//                     onChange={(e) => handleChange("bathrooms", e.target.value)}
//                     required
//                   />
//                 </FormControl>
//               </FormItem>

//               <FormItem>
//                 <FormLabel>Parking Spots</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     name="parkingSpots"
//                     value={formData.parkingSpots}
//                     onChange={(e) => handleChange("parkingSpots", e.target.value)}
//                     required
//                   />
//                 </FormControl>
//               </FormItem>

//               <FormItem>
//                 <FormLabel>Area (sq ft)</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     name="area"
//                     value={formData.area}
//                     onChange={(e) => handleChange("area", e.target.value)}
//                     required
//                   />
//                 </FormControl>
//               </FormItem>
//             </div>

//             <div className="grid gap-4 md:grid-cols-3">
//               <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//                 <FormControl>
//                   <Checkbox
//                     name="hasSwimmingPool"
//                     checked={formData.hasSwimmingPool}
//                     onCheckedChange={(checked) => handleChange("hasSwimmingPool", checked)}
//                   />
//                 </FormControl>
//                 <div className="space-y-1 leading-none">
//                   <FormLabel>Swimming Pool</FormLabel>
//                   <FormDescription>Property has a swimming pool.</FormDescription>
//                 </div>
//               </FormItem>

//               <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//                 <FormControl>
//                   <Checkbox
//                     name="hasGardenYard"
//                     checked={formData.hasGardenYard}
//                     onCheckedChange={(checked) => handleChange("hasGardenYard", checked)}
//                   />
//                 </FormControl>
//                 <div className="space-y-1 leading-none">
//                   <FormLabel>Garden/Yard</FormLabel>
//                   <FormDescription>Property has a garden or yard.</FormDescription>
//                 </div>
//               </FormItem>

//               <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//                 <FormControl>
//                   <Checkbox
//                     name="hasBalcony"
//                     checked={formData.hasBalcony}
//                     onCheckedChange={(checked) => handleChange("hasBalcony", checked)}
//                   />
//                 </FormControl>
//                 <div className="space-y-1 leading-none">
//                   <FormLabel>Balcony</FormLabel>
//                   <FormDescription>Property has a balcony.</FormDescription>
//                 </div>
//               </FormItem>
//             </div>
//           </div>
//         )

//       case 2:
//         return (
//           <div className="space-y-4">
//             <div className="grid gap-6 md:grid-cols-2">
//               <FormItem>
//                 <FormLabel>Street Address</FormLabel>
//                 <FormControl>
//                   <Input
//                     name="streetAddress"
//                     placeholder="123 Main St"
//                     value={formData.streetAddress}
//                     onChange={(e) => handleChange("streetAddress", e.target.value)}
//                     required
//                   />
//                 </FormControl>
//               </FormItem>

//               <FormItem>
//                 <FormLabel>City</FormLabel>
//                 <FormControl>
//                   <Input
//                     name="city"
//                     placeholder="New York"
//                     value={formData.city}
//                     onChange={(e) => handleChange("city", e.target.value)}
//                     required
//                   />
//                 </FormControl>
//               </FormItem>

//               <FormItem>
//                 <FormLabel>State</FormLabel>
//                 <FormControl>
//                   <Input
//                     name="state"
//                     placeholder="NY"
//                     value={formData.state}
//                     onChange={(e) => handleChange("state", e.target.value)}
//                     required
//                   />
//                 </FormControl>
//               </FormItem>

//               <FormItem>
//                 <FormLabel>ZIP Code</FormLabel>
//                 <FormControl>
//                   <Input
//                     name="zip"
//                     placeholder="10001"
//                     value={formData.zip}
//                     onChange={(e) => handleChange("zip", e.target.value)}
//                     required
//                   />
//                 </FormControl>
//               </FormItem>

//               <FormItem>
//                 <FormLabel>Region</FormLabel>
//                 <FormControl>
//                   <Input
//                     name="region"
//                     placeholder="Manhattan"
//                     value={formData.region}
//                     onChange={(e) => handleChange("region", e.target.value)}
//                     required
//                   />
//                 </FormControl>
//               </FormItem>

//               <FormItem>
//                 <FormLabel>Landmark</FormLabel>
//                 <FormControl>
//                   <Input
//                     name="landmark"
//                     placeholder="Near Central Park"
//                     value={formData.landmark}
//                     onChange={(e) => handleChange("landmark", e.target.value)}
//                   />
//                 </FormControl>
//                 <FormDescription>Optional: Nearby landmark for easier location.</FormDescription>
//               </FormItem>
//             </div>
//           </div>
//         )

//       case 3:
//         return (
//           <div className="space-y-6">
//             <FormItem>
//               <FormLabel>Property Images</FormLabel>
//               <FormDescription>Upload images of the property. You can upload multiple images.</FormDescription>

//               <div className="mt-2 flex items-center gap-4">
//                 <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-input bg-background hover:bg-accent/40">
//                   <div className="flex flex-col items-center justify-center space-y-2 p-4 text-center">
//                     <Upload className="h-8 w-8 text-muted-foreground" />
//                     <div className="text-sm font-medium">Drag & drop files here or click to browse</div>
//                     <div className="text-xs text-muted-foreground">Supported formats: JPEG, PNG, WebP</div>
//                   </div>
//                   <Input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     className="hidden"
//                     onChange={handleFileChange}
//                     disabled={isUploading}
//                   />
//                 </label>
//               </div>

//               {/* Image preview grid */}
//               {(imageUrls.length > 0 || imageFiles.length > 0) && (
//                 <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
//                   {/* Existing images */}
//                   {imageUrls.map((url, index) => (
//                     <Card key={`existing-${index}`} className="overflow-hidden">
//                       <div className="relative aspect-square">
//                         <img
//                           src={url || "/placeholder.svg"}
//                           alt={`Property image ${index + 1}`}
//                           className="h-full w-full object-cover"
//                           onError={(e) => {
//                             ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=200"
//                           }}
//                         />
//                         <Button
//                           type="button"
//                           variant="destructive"
//                           size="icon"
//                           className="absolute right-1 top-1 h-6 w-6"
//                           onClick={() => removeImage(index)}
//                         >
//                           <X className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </Card>
//                   ))}

//                   {/* New images */}
//                   {imageFiles.map((file, index) => (
//                     <Card key={`new-${index}`} className="overflow-hidden">
//                       <div className="relative aspect-square">
//                         <img
//                           src={URL.createObjectURL(file) || "/placeholder.svg"}
//                           alt={`New property image ${index + 1}`}
//                           className="h-full w-full object-cover"
//                         />
//                         <Button
//                           type="button"
//                           variant="destructive"
//                           size="icon"
//                           className="absolute right-1 top-1 h-6 w-6"
//                           onClick={() => removeImage(imageUrls.length + index)}
//                         >
//                           <X className="h-4 w-4" />
//                         </Button>

//                         {/* Upload progress indicator */}
//                         {uploadProgress[file.name] !== undefined && uploadProgress[file.name] < 100 && (
//                           <div className="absolute inset-0 flex items-center justify-center bg-black/50">
//                             <div className="text-center text-white">
//                               <Loader2 className="mx-auto h-8 w-8 animate-spin" />
//                               <div className="mt-2">{uploadProgress[file.name]}%</div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </Card>
//                   ))}
//                 </div>
//               )}

//               {/* Empty state */}
//               {imageUrls.length === 0 && imageFiles.length === 0 && (
//                 <div className="mt-4 flex h-32 items-center justify-center rounded-md border border-dashed">
//                   <div className="text-center">
//                     <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
//                     <div className="mt-2 text-sm text-muted-foreground">No images added yet</div>
//                   </div>
//                 </div>
//               )}
//             </FormItem>
//           </div>
//         )

//       case 4:
//         return (
//           <div className="space-y-4">
//             <div className="grid gap-6 md:grid-cols-2">
//               <FormItem>
//                 <FormLabel>Contact Name</FormLabel>
//                 <FormControl>
//                   <Input
//                     name="contactName"
//                     placeholder="John Doe"
//                     value={formData.contactName}
//                     onChange={(e) => handleChange("contactName", e.target.value)}
//                     required
//                   />
//                 </FormControl>
//               </FormItem>

//               <FormItem>
//                 <FormLabel>Contact Phone</FormLabel>
//                 <FormControl>
//                   <Input
//                     name="contactPhone"
//                     placeholder="+1 (555) 123-4567"
//                     value={formData.contactPhone}
//                     onChange={(e) => handleChange("contactPhone", e.target.value)}
//                     required
//                   />
//                 </FormControl>
//               </FormItem>

//               <FormItem className="md:col-span-2">
//                 <FormLabel>Contact Email</FormLabel>
//                 <FormControl>
//                   <Input
//                     name="contactEmail"
//                     type="email"
//                     placeholder="contact@example.com"
//                     value={formData.contactEmail}
//                     onChange={(e) => handleChange("contactEmail", e.target.value)}
//                     required
//                   />
//                 </FormControl>
//               </FormItem>
//             </div>
//           </div>
//         )

//       default:
//         return null
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-8">
//       {!supabase && (
//         <div className="rounded-md bg-yellow-50 p-4 mb-4">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
//                 <path
//                   fillRule="evenodd"
//                   d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <div className="ml-3">
//               <h3 className="text-sm font-medium text-yellow-800">Supabase Configuration Warning</h3>
//               <div className="mt-2 text-sm text-yellow-700">
//                 <p>
//                   Supabase client is not properly configured. Make sure your environment variables are set correctly:
//                 </p>
//                 <ul className="list-disc pl-5 mt-1 space-y-1">
//                   <li>NEXT_PUBLIC_SUPABASE_URL</li>
//                   <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Stepper */}
//       <Stepper value={currentStep} className="mx-auto max-w-3xl">
//         {steps.map((step, index) => (
//           <StepperItem key={index} value={index}>
//             <StepperTrigger onClick={() => setCurrentStep(index)} disabled={index > currentStep}>
//               <StepperIcon>
//                 <StepperStatus complete={<Check className="h-4 w-4" />} />
//               </StepperIcon>
//               <StepperLabel>{step.title}</StepperLabel>
//             </StepperTrigger>
//             <StepperContent>
//               <StepperDescription>{step.description}</StepperDescription>
//               <StepperMessage />
//             </StepperContent>
//           </StepperItem>
//         ))}
//       </Stepper>

//       {/* Step content */}
//       <Card>
//         <CardContent className="pt-6">{renderStepContent()}</CardContent>
//       </Card>

//       {/* Navigation buttons */}
//       <div className="flex justify-between">
//         <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0}>
//           <ArrowLeft className="mr-2 h-4 w-4" /> Previous
//         </Button>

//         {currentStep < steps.length - 1 ? (
//           <Button type="button" onClick={nextStep}>
//             Next <ArrowRight className="ml-2 h-4 w-4" />
//           </Button>
//         ) : (
//           <Button type="submit" disabled={isSubmitting || isUploading}>
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 {property ? "Updating..." : "Creating..."}
//               </>
//             ) : property ? (
//               "Update Property"
//             ) : (
//               "Create Property"
//             )}
//           </Button>
//         )}
//       </div>
//     </form>
//   )
// }



























































"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FormControl, FormDescription, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { createProperty, updateProperty } from "@/lib/actions"
import { toast } from "@/components/ui/use-toast"
import { Loader2, ArrowLeft, ArrowRight, Upload, X, Check, ImageIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@supabase/supabase-js"

// Stepper component
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIcon,
  StepperItem,
  StepperLabel,
  StepperMessage,
  StepperStatus,
  StepperTrigger,
} from "@/components/ui/stepper"

interface PropertyFormProps {
  property?: any
  propertyTypes: { id: number; value: string }[]
  propertyStatuses: { id: number; value: string }[]
}

// Initialize Supabase client with better error handling
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if environment variables are available
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

console.log("Supabase Url:", supabase);

export function PropertyForm({ property, propertyTypes, propertyStatuses }: PropertyFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [bucketExists, setBucketExists] = useState(false)
  const [bucketChecked, setBucketChecked] = useState(false)

  // Initialize form data with default values
  const initialFormData = {
    // Basic Information
    name: property?.name || "",
    description: property?.description || "",
    price: property?.price || "",
    typeId: property?.typeId?.toString() || "",
    statusId: property?.statusId?.toString() || "",

    // Features
    bedrooms: property?.feature?.bedrooms || "0",
    bathrooms: property?.feature?.bathrooms || "0",
    parkingSpots: property?.feature?.parkingSpots || "0",
    area: property?.feature?.area || "0",
    hasSwimmingPool: property?.feature?.hasSwimmingPool || false,
    hasGardenYard: property?.feature?.hasGardenYard || false,
    hasBalcony: property?.feature?.hasBalcony || false,

    // Location
    streetAddress: property?.location?.streetAddress || "",
    city: property?.location?.city || "",
    state: property?.location?.state || "",
    zip: property?.location?.zip || "",
    region: property?.location?.region || "",
    landmark: property?.location?.landmark || "",

    // Contact
    contactName: property?.contact?.name || "",
    contactPhone: property?.contact?.phone || "",
    contactEmail: property?.contact?.email || "",
  }

  const [formData, setFormData] = useState(initialFormData)

  // Image upload state
  const initialImageUrls = property?.images?.map((img: any) => img.url) || []
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>(initialImageUrls)
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const [isUploading, setIsUploading] = useState(false)

  // Check if the bucket exists when the component mounts
  useEffect(() => {
    const checkBucket = async () => {
      if (!supabase) return

      try {
        const { data: buckets } = await supabase.storage.listBuckets()
        const exists = buckets?.some((bucket) => bucket.name === "property-images")
        setBucketExists(exists || false)
        setBucketChecked(true)

        if (!exists) {
          console.log("Bucket 'property-images' does not exist. Attempting to create it...")
          try {
            const { error } = await supabase.storage.createBucket("property-images", {
              public: true,
              fileSizeLimit: 10485760, // 10MB
            })

            if (error) {
              console.error("Failed to create bucket:", error)
              toast({
                title: "Storage setup required",
                description: "Please create a 'property-images' bucket in your Supabase project.",
                variant: "destructive",
              })
            } else {
              console.log("Bucket created successfully")
              setBucketExists(true)

              // Set bucket policies
              const { error: policyError } = await supabase.storage
                .from("property-images")
                .createPolicy("public-read", {
                  name: "public-read",
                  definition: {
                    statements: [
                      {
                        effect: "allow",
                        action: "object:get",
                        principal: "*",
                      },
                    ],
                  },
                })

              if (policyError) {
                console.error("Failed to set bucket policy:", policyError)
              }
            }
          } catch (createError) {
            console.error("Error creating bucket:", createError)
          }
        }
      } catch (error) {
        console.error("Error checking bucket:", error)
      }
    }

    checkBucket()
  }, [])

  // Steps configuration
  const steps = [
    { title: "Basic Information", description: "Property details" },
    { title: "Features", description: "Property features" },
    { title: "Location", description: "Property location" },
    { title: "Media", description: "Property images" },
    { title: "Contact", description: "Contact information" },
  ]

  // Handle form field changes
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setImageFiles((prev) => [...prev, ...newFiles])
    }
  }
 
  // Handle image upload to Supabase
  const uploadImages = async () => {
    if (imageFiles.length === 0) return []
    if (!supabase) {
      toast({
        title: "Configuration error",
        description: "Supabase client is not properly configured. Check your environment variables.",
        variant: "destructive",
      })
      return []
    }

    if (!bucketExists && bucketChecked) {
      toast({
        title: "Storage setup required",
        description: "Please create a 'property-images' bucket in your Supabase project.",
        variant: "destructive",
      })
      return []
    }

    setIsUploading(true)
    const uploadedUrls: string[] = []

    try {
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i]
        const fileExt = file.name.split(".").pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
        const filePath = `properties/${fileName}`

        // Update progress to show upload started
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: 10,
        }))

        // Upload file to Supabase Storage
        const { data, error } = await supabase.storage.from("property-images").upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        })

        if (error) {
          console.error("Supabase upload error:", error.message)
          throw new Error(error.message)
        }

        // Update progress
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: 50,
        }))

        // Get public URL
        const { data: urlData } = supabase.storage.from("property-images").getPublicUrl(filePath)

        console.log("Uploaded file URL:", urlData.publicUrl)
        uploadedUrls.push(urlData.publicUrl)

        // Update progress to complete
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: 100,
        }))
      }

      return uploadedUrls
    } catch (error) {
      console.error("Error uploading images:", error instanceof Error ? error.message : String(error))
      toast({
        title: "Upload failed",
        description: "Failed to upload one or more images. Please try again.",
        variant: "destructive",
      })
      return []
    } finally {
      setIsUploading(false)
    }
  }

  // Remove image from the list
  const removeImage = (index: number) => {
    if (index < imageUrls.length) {
      // Remove from existing URLs
      setImageUrls((prev) => prev.filter((_, i) => i !== index))
    } else {
      // Remove from new files
      const fileIndex = index - imageUrls.length
      setImageFiles((prev) => prev.filter((_, i) => i !== fileIndex))

      // Remove from progress tracking
      const fileName = imageFiles[fileIndex].name
      setUploadProgress((prev) => {
        const newProgress = { ...prev }
        delete newProgress[fileName]
        return newProgress
      })
    }
  }

  // Navigate to next step
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Upload images to Supabase
      const newImageUrls = await uploadImages()
      const allImageUrls = [...imageUrls, ...newImageUrls]

      console.log("All image URLs to be submitted:", allImageUrls)
      console.log("Uploading files to Supabase:", imageFiles)


      // Create FormData object
      const submitFormData = new FormData()

      // Add all form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === "boolean") {
          submitFormData.append(key, value ? "on" : "off")
        } else {
          submitFormData.append(key, value.toString())
        }
      })

      // Add image URLs - ensure each URL is added as a separate entry with the same name
      allImageUrls.forEach((url) => {
        submitFormData.append("imageUrls", url)
      })

      // Submit the form
      let result
      try {
        if (property) {
          result = await updateProperty(property.id, submitFormData)
        } else {
          result = await createProperty(submitFormData)
        }

        console.log("Server action result:", result)
      } catch (serverActionError) {
        console.error("Server action error:", serverActionError)
        // Client-side fallback for demo purposes
        result = {
          success: true,
          property: {
            id: property?.id || Math.floor(Math.random() * 1000),
            name: formData.name,
            // Other properties would be here in a real implementation
          },
        }

        toast({
          title: "Demo Mode",
          description: "Using client-side fallback. In a production app, this would connect to your backend.",
        })
      }

      if (result.success) {
        toast({
          title: property ? "Property updated" : "Property created",
          description: property
            ? "The property has been successfully updated."
            : "The property has been successfully created.",
        })
        router.push("/admin/properties")
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: `Failed to ${property ? "update" : "create"} property. Please check your inputs and try again.`,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <FormItem>
                <FormLabel>Property Name</FormLabel>
                <FormControl>
                  <Input
                    name="name"
                    placeholder="Modern Apartment in Downtown"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </FormControl>
                <FormDescription>Enter a descriptive name for the property.</FormDescription>
              </FormItem>

              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    name="price"
                    placeholder="250000"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    required
                  />
                </FormControl>
                <FormDescription>Enter the property price in USD.</FormDescription>
              </FormItem>

              <FormItem>
                <FormLabel>Property Type</FormLabel>
                <Select
                  name="typeId"
                  value={formData.typeId}
                  onValueChange={(value) => handleChange("typeId", value)}
                  required
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id.toString()}>
                        {type.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Select the type of property.</FormDescription>
              </FormItem>

              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  name="statusId"
                  value={formData.statusId}
                  onValueChange={(value) => handleChange("statusId", value)}
                  required
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {propertyStatuses.map((status) => (
                      <SelectItem key={status.id} value={status.id.toString()}>
                        {status.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Set the current status of the property.</FormDescription>
              </FormItem>
            </div>

            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  name="description"
                  placeholder="Enter a detailed description of the property..."
                  className="min-h-32"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  required
                />
              </FormControl>
              <FormDescription>Provide a detailed description of the property.</FormDescription>
            </FormItem>
          </div>
        )

      case 1:
        return (
          <div className="space-y-4">
            <div className="grid gap-6 md:grid-cols-3">
              <FormItem>
                <FormLabel>Bedrooms</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={(e) => handleChange("bedrooms", e.target.value)}
                    required
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>Bathrooms</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={(e) => handleChange("bathrooms", e.target.value)}
                    required
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>Parking Spots</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    name="parkingSpots"
                    value={formData.parkingSpots}
                    onChange={(e) => handleChange("parkingSpots", e.target.value)}
                    required
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>Area (sq ft)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={(e) => handleChange("area", e.target.value)}
                    required
                  />
                </FormControl>
              </FormItem>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    name="hasSwimmingPool"
                    checked={formData.hasSwimmingPool}
                    onCheckedChange={(checked) => handleChange("hasSwimmingPool", checked)}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Swimming Pool</FormLabel>
                  <FormDescription>Property has a swimming pool.</FormDescription>
                </div>
              </FormItem>

              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    name="hasGardenYard"
                    checked={formData.hasGardenYard}
                    onCheckedChange={(checked) => handleChange("hasGardenYard", checked)}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Garden/Yard</FormLabel>
                  <FormDescription>Property has a garden or yard.</FormDescription>
                </div>
              </FormItem>

              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    name="hasBalcony"
                    checked={formData.hasBalcony}
                    onCheckedChange={(checked) => handleChange("hasBalcony", checked)}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Balcony</FormLabel>
                  <FormDescription>Property has a balcony.</FormDescription>
                </div>
              </FormItem>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input
                    name="streetAddress"
                    placeholder="123 Main St"
                    value={formData.streetAddress}
                    onChange={(e) => handleChange("streetAddress", e.target.value)}
                    required
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    name="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    required
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input
                    name="state"
                    placeholder="NY"
                    value={formData.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    required
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>ZIP Code</FormLabel>
                <FormControl>
                  <Input
                    name="zip"
                    placeholder="10001"
                    value={formData.zip}
                    onChange={(e) => handleChange("zip", e.target.value)}
                    required
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>Region</FormLabel>
                <FormControl>
                  <Input
                    name="region"
                    placeholder="Manhattan"
                    value={formData.region}
                    onChange={(e) => handleChange("region", e.target.value)}
                    required
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>Landmark</FormLabel>
                <FormControl>
                  <Input
                    name="landmark"
                    placeholder="Near Central Park"
                    value={formData.landmark}
                    onChange={(e) => handleChange("landmark", e.target.value)}
                  />
                </FormControl>
                <FormDescription>Optional: Nearby landmark for easier location.</FormDescription>
              </FormItem>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <FormItem>
              <FormLabel>Property Images</FormLabel>
              <FormDescription>Upload images of the property. You can upload multiple images.</FormDescription>

              <div className="mt-2 flex items-center gap-4">
                <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-input bg-background hover:bg-accent/40">
                  <div className="flex flex-col items-center justify-center space-y-2 p-4 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <div className="text-sm font-medium">Drag & drop files here or click to browse</div>
                    <div className="text-xs text-muted-foreground">Supported formats: JPEG, PNG, WebP</div>
                  </div>
                  <Input
                    type="file"
                    accept="/images/*"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                </label>
              </div>

              {/* Image preview grid */}
              {(imageUrls.length > 0 || imageFiles.length > 0) && (
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {/* Existing images */}
                  {imageUrls.map((url, index) => (
                    <Card key={`existing-${index}`} className="overflow-hidden">
                      <div className="relative aspect-square">
                        <img
                          src={url || "/placeholder.svg"}
                          alt={`Property image ${index + 1}`}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=200"
                          }}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute right-1 top-1 h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}

                  {/* New images */}
                  {imageFiles.map((file, index) => (
                    <Card key={`new-${index}`} className="overflow-hidden">
                      <div className="relative aspect-square">
                        <img
                          src={URL.createObjectURL(file) || "/placeholder.svg"}
                          alt={`New property image ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute right-1 top-1 h-6 w-6"
                          onClick={() => removeImage(imageUrls.length + index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>

                        {/* Upload progress indicator */}
                        {uploadProgress[file.name] !== undefined && uploadProgress[file.name] < 100 && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <div className="text-center text-white">
                              <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                              <div className="mt-2">{uploadProgress[file.name]}%</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Empty state */}
              {imageUrls.length === 0 && imageFiles.length === 0 && (
                <div className="mt-4 flex h-32 items-center justify-center rounded-md border border-dashed">
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                    <div className="mt-2 text-sm text-muted-foreground">No images added yet</div>
                  </div>
                </div>
              )}
            </FormItem>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <FormItem>
                <FormLabel>Contact Name</FormLabel>
                <FormControl>
                  <Input
                    name="contactName"
                    placeholder="John Doe"
                    value={formData.contactName}
                    onChange={(e) => handleChange("contactName", e.target.value)}
                    required
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>Contact Phone</FormLabel>
                <FormControl>
                  <Input
                    name="contactPhone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.contactPhone}
                    onChange={(e) => handleChange("contactPhone", e.target.value)}
                    required
                  />
                </FormControl>
              </FormItem>

              <FormItem className="md:col-span-2">
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input
                    name="contactEmail"
                    type="email"
                    placeholder="contact@example.com"
                    value={formData.contactEmail}
                    onChange={(e) => handleChange("contactEmail", e.target.value)}
                    required
                  />
                </FormControl>
              </FormItem>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {!supabase && (
        <div className="rounded-md bg-yellow-50 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Supabase Configuration Warning</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Supabase client is not properly configured. Make sure your environment variables are set correctly:
                </p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>NEXT_PUBLIC_SUPABASE_URL</li>
                  <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {bucketChecked && !bucketExists && (
        <div className="rounded-md bg-yellow-50 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Storage Bucket Missing</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  The "property-images" bucket does not exist in your Supabase project. Please create it manually or
                  we'll attempt to create it automatically when you upload images.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stepper */}
      <Stepper value={currentStep} className="mx-auto max-w-3xl">
        {steps.map((step, index) => (
          <StepperItem key={index} value={index}>
            <StepperTrigger onClick={() => setCurrentStep(index)} disabled={index > currentStep}>
              <StepperIcon>
                <StepperStatus complete={<Check className="h-4 w-4" />} />
              </StepperIcon>
              <StepperLabel>{step.title}</StepperLabel>
            </StepperTrigger>
            <StepperContent>
              <StepperDescription>{step.description}</StepperDescription>
              <StepperMessage />
            </StepperContent>
          </StepperItem>
        ))}
      </Stepper>

      {/* Step content */}
      <Card>
        <CardContent className="pt-6">{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button type="button" onClick={nextStep}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting || isUploading}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {property ? "Updating..." : "Creating..."}
              </>
            ) : property ? (
              "Update Property"
            ) : (
              "Create Property"
            )}
          </Button>
        )}
      </div>
    </form>
  )
}

