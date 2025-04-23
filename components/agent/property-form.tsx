"use client";

import type React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Upload, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const propertyFormSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  price: z.coerce.number().min(1, {
    message: "Price must be a positive number.",
  }),
  type: z.string({
    required_error: "Please select a property type.",
  }),
  district: z.string().min(2, {
    message: "District must be at least 2 characters.",
  }),
  city: z.string().default("Riyadh"),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

const defaultValues: Partial<PropertyFormValues> = {
  city: "Riyadh",
};

export default function PropertyForm() {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const { locale } = useParams();
  const t = useTranslations();
  const isRtl = locale === "ar";

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues,
  });

  function onSubmit(data: PropertyFormValues) {
    toast({
      title: "Property submitted for approval",
      description:
        "Your property has been submitted and is pending admin approval.",
    });
    console.log(data, images);
    // Reset form after submission
    form.reset(defaultValues);
    setImages([]);
    setPreviews([]);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));

      setImages((prev) => [...prev, ...filesArray]);
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previews];

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviews[index]);

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setImages(newImages);
    setPreviews(newPreviews);
  };

  return (
    <div className="space-y-6" dir={isRtl ? "rtl" : "ltr"}>
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          {t("common.addProperty")}
        </h2>
        <p className="text-muted-foreground">
          Fill in the details below to add a new property listing.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property Information</CardTitle>
          <CardDescription>
            Enter the details of your property. All fields are required unless
            specified.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("properties.title")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Luxury Villa in Al Olaya"
                          {...field}
                          className="focus-visible:ring-green-500"
                        />
                      </FormControl>
                      <FormDescription>
                        A descriptive title for your property.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("properties.price")}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1000000"
                          {...field}
                          className="focus-visible:ring-green-500"
                        />
                      </FormControl>
                      <FormDescription>
                        The price in Saudi Riyal.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("properties.type")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="focus-visible:ring-green-500">
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                          <SelectItem value="office">Office Space</SelectItem>
                          <SelectItem value="retail">Retail Space</SelectItem>
                          <SelectItem value="warehouse">Warehouse</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The type of property you are listing.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("properties.district")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="focus-visible:ring-green-500">
                            <SelectValue placeholder="Select district" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="al_olaya">Al Olaya</SelectItem>
                          <SelectItem value="al_malaz">Al Malaz</SelectItem>
                          <SelectItem value="al_murabba">Al Murabba</SelectItem>
                          <SelectItem value="al_naseem">Al Naseem</SelectItem>
                          <SelectItem value="al_rawdah">Al Rawdah</SelectItem>
                          <SelectItem value="al_wurud">Al Wurud</SelectItem>
                          <SelectItem value="hittin">Hittin</SelectItem>
                          <SelectItem value="qurtubah">Qurtubah</SelectItem>
                          <SelectItem value="al_nakheel">Al Nakheel</SelectItem>
                          <SelectItem value="al_yasmin">Al Yasmin</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The district in Riyadh where the property is located.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input disabled {...field} />
                    </FormControl>
                    <FormDescription>
                      Default city is set to Riyadh.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a detailed description of your property..."
                        className="min-h-[150px] focus-visible:ring-green-500"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Detailed description of the property including features,
                      amenities, etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Property Images</FormLabel>
                <div className="mt-2 grid gap-5">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted border-green-200 hover:border-green-300"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-green-500" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG or JPEG (MAX. 5MB per image)
                        </p>
                      </div>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>

                  {previews.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                      {previews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview || "/placeholder.svg"}
                            alt={`Property preview ${index + 1}`}
                            className="h-24 w-full rounded-md object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-black/50 rounded-full p-1 text-white"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <FormDescription className="mt-2">
                  Upload one or more images of your property. At least one image
                  is required.
                </FormDescription>
              </div>

              <Button
                type="submit"
                className="w-full md:w-auto bg-green-600 hover:bg-green-700"
              >
                Submit Property
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-start border-t px-6 py-4">
          <h3 className="text-sm font-medium">Note:</h3>
          <p className="text-sm text-muted-foreground">
            Upon submission, your property will enter an "Admin Approval
            Pending" state. It will only be visible to the public once approved
            by an administrator.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
