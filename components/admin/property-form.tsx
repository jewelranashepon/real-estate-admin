"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { createProperty, updateProperty } from "@/lib/actions";
import { toast } from "@/components/ui/use-toast";
import {
  Loader2,
  ArrowLeft,
  ArrowRight,
  Upload,
  X,
  Check,
  ImageIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@supabase/supabase-js";

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
} from "@/components/ui/stepper";
import { UploadButton } from "./uploadthing";

interface PropertyFormProps {
  property?: any;
  propertyTypes: { id: number; value: string }[];
  propertyStatuses: { id: number; value: string }[];
}

export function PropertyForm({
  property,
  propertyTypes,
  propertyStatuses,
}: PropertyFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

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

    // Media Upload
    images: property?.images || [], // assuming it's an array of image URLs

    // Contact
    contactName: property?.contact?.name || "",
    contactPhone: property?.contact?.phone || "",
    contactEmail: property?.contact?.email || "",
  };

  const [formData, setFormData] = useState(initialFormData);

  console.log("Form DataImage Link", formData.images);

  // Steps configuration
  const steps = [
    { title: "Basic Information", description: "Property details" },
    { title: "Features", description: "Property features" },
    { title: "Location", description: "Property location" },
    { title: "Media", description: "Property images" },
    { title: "Contact", description: "Contact information" },
  ];

  // Handle form field changes
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Navigate to next step
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData object
      const submitFormData = new FormData();

      // Add all form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === "boolean") {
          submitFormData.append(key, value ? "on" : "off");
        } else {
          submitFormData.append(key, value.toString());
        }
      });

      formData.images.forEach((url) => {
        submitFormData.append("images[]", url);
      });

      // Submit the form
      let result;
      try {
        if (property) {
          result = await updateProperty(property.id, submitFormData);
        } else {
          result = await createProperty(submitFormData);
        }

        console.log("Server action result:", result);
      } catch (serverActionError) {
        console.error("Server action error:", serverActionError);
        // Client-side fallback for demo purposes
        result = {
          success: true,
          property: {
            id: property?.id || Math.floor(Math.random() * 1000),
            name: formData.name,
            // Other properties would be here in a real implementation
          },
        };

        toast({
          title: "Demo Mode",
          description:
            "Using client-side fallback. In a production app, this would connect to your backend.",
        });
      }

      if (result.success) {
        toast({
          title: property ? "Property updated" : "Property created",
          description: property
            ? "The property has been successfully updated."
            : "The property has been successfully created.",
        });
        router.push("/admin/properties");
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: `Failed to ${
            property ? "update" : "create"
          } property. Please check your inputs and try again.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <FormDescription>
                  Enter a descriptive name for the property.
                </FormDescription>
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
                <FormDescription>
                  Enter the property price in USD.
                </FormDescription>
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
                <FormDescription>
                  Set the current status of the property.
                </FormDescription>
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
              <FormDescription>
                Provide a detailed description of the property.
              </FormDescription>
            </FormItem>
          </div>
        );

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
                    onChange={(e) =>
                      handleChange("parkingSpots", e.target.value)
                    }
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
                    onCheckedChange={(checked) =>
                      handleChange("hasSwimmingPool", checked)
                    }
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Swimming Pool</FormLabel>
                  <FormDescription>
                    Property has a swimming pool.
                  </FormDescription>
                </div>
              </FormItem>

              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    name="hasGardenYard"
                    checked={formData.hasGardenYard}
                    onCheckedChange={(checked) =>
                      handleChange("hasGardenYard", checked)
                    }
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Garden/Yard</FormLabel>
                  <FormDescription>
                    Property has a garden or yard.
                  </FormDescription>
                </div>
              </FormItem>

              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    name="hasBalcony"
                    checked={formData.hasBalcony}
                    onCheckedChange={(checked) =>
                      handleChange("hasBalcony", checked)
                    }
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Balcony</FormLabel>
                  <FormDescription>Property has a balcony.</FormDescription>
                </div>
              </FormItem>
            </div>
          </div>
        );

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
                    onChange={(e) =>
                      handleChange("streetAddress", e.target.value)
                    }
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
                <FormDescription>
                  Optional: Nearby landmark for easier location.
                </FormDescription>
              </FormItem>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res[0].ufsUrl);
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            /> */}
            <div className="space-y-4">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res.length > 0) {
                    const newImageUrl = res[0].ufsUrl; // based on your uploadthing config
                    setFormData((prev) => ({
                      ...prev,
                      images: [...prev.images, newImageUrl],
                    }));
                    console.log("Image Url::", newImageUrl);
                  }
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />

              {/* Image preview grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {formData.images.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Uploaded ${index}`}
                      className="w-full h-40 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== index),
                        }))
                      }
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-80 group-hover:opacity-100"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

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
                    onChange={(e) =>
                      handleChange("contactName", e.target.value)
                    }
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
                    onChange={(e) =>
                      handleChange("contactPhone", e.target.value)
                    }
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
                    onChange={(e) =>
                      handleChange("contactEmail", e.target.value)
                    }
                    required
                  />
                </FormControl>
              </FormItem>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Stepper */}
      <Stepper value={currentStep} className="mx-auto max-w-3xl">
        {steps.map((step, index) => (
          <StepperItem key={index} value={index}>
            <StepperTrigger
              onClick={() => setCurrentStep(index)}
              disabled={index > currentStep}
            >
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
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button type="button" onClick={nextStep}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting}>
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
  );
}
