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
  const t = useTranslations("propertiesAdd");
  const isRtl = locale === "ar";

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues,
  });

  function onSubmit(data: PropertyFormValues) {
    toast({
      title: t("submitSuccess.title"),
      description: t("submitSuccess.description"),
    });
    console.log(data, images);
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
          {t("addProperty")}
        </h2>
        <p className="text-muted-foreground">{t("formDescription")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("propertyInfo")}</CardTitle>
          <CardDescription>{t("formInstructions")}</CardDescription>
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
                      <FormLabel>{t("title.label")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("title.placeholder")}
                          {...field}
                          className="focus-visible:ring-green-500"
                        />
                      </FormControl>
                      <FormDescription>
                        {t("title.description")}
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
                      <FormLabel>{t("price.label")}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={t("price.placeholder")}
                          {...field}
                          className="focus-visible:ring-green-500"
                        />
                      </FormControl>
                      <FormDescription>
                        {t("price.description")}
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
                      <FormLabel>{t("type.label")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="focus-visible:ring-green-500">
                            <SelectValue placeholder={t("type.placeholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(t.raw("type.options")).map(
                            ([value, label]) => (
                              <SelectItem key={value} value={value}>
                                {label as string}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormDescription>{t("type.description")}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("district.label")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="focus-visible:ring-green-500">
                            <SelectValue
                              placeholder={t("district.placeholder")}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(t.raw("district.options")).map(
                            ([value, label]) => (
                              <SelectItem key={value} value={value}>
                                {label as string}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        {t("district.description")}
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
                    <FormLabel>{t("city.label")}</FormLabel>
                    <FormControl>
                      <Input disabled {...field} />
                    </FormControl>
                    <FormDescription>{t("city.description")}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("description.label")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("description.placeholder")}
                        className="min-h-[150px] focus-visible:ring-green-500"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {t("description.description")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>{t("images.label")}</FormLabel>
                <div className="mt-2 grid gap-5">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted border-green-200 hover:border-green-300"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-green-500" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          {t("images.uploadText")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t("images.fileTypes")}
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
                  {t("images.description")}
                </FormDescription>
              </div>

              <Button
                type="submit"
                className="w-full md:w-auto bg-green-600 hover:bg-green-700"
              >
                {t("submit")}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-start border-t px-6 py-4">
          <h3 className="text-sm font-medium">{t("note")}</h3>
          <p className="text-sm text-muted-foreground">{t("approvalNote")}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
