"use client";
import type React from "react";
import { useState, useEffect } from "react";
import RichTextEditor from "./RichTextEditor";
import ImageUploader from "./ImageUploader";
import { useTranslations } from "next-intl";
import { JoEditor } from "./joeditor";

interface BlogPostFormProps {
  initialData?: {
    id?: number;
    post_title: string;
    post_content: string;
    category?: string;
    tags?: string;
    post_image?: string;
  } | null;
  onClose: () => void;
  onUpdate: (updatedBlog: any) => void;
}

interface FormData {
  id?: number;
  title: string;
  content: string;
  category: string;
  tags?: string;
  image?: string;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({
  initialData,
  onClose,
  onUpdate,
}) => {
  const t = useTranslations("BlogPostForm");
  const [formData, setFormData] = useState<FormData>({
    id: initialData?.id || undefined,
    title: initialData?.post_title || "",
    content: initialData?.post_content || "",
    category: initialData?.category || "",
    tags: initialData?.tags || "",
    image: initialData?.post_image || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || undefined,
        title: initialData.post_title || "",
        content: initialData.post_content || "",
        category: initialData.category || "",
        tags: initialData.tags || "",
        image: initialData.post_image || "",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUploaded = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, image: imageUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formToSubmit = {
      id: formData.id,
      post_title: formData.title,
      post_content: formData.content,
      post_category: formData.category,
      post_tags: formData.tags || "",
      post_image: formData.image || "",
    };

    try {
      const response = await fetch("/api/blogfetch", {
        method: formData.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formToSubmit),
      });

      const result = await response.json();

      if (response.ok) {
        alert(
          formData.id ? t("alerts.updateSuccess") : t("alerts.createSuccess")
        );
        onUpdate(result);
        onClose();
      } else {
        alert(t("alerts.saveError"));
      }
    } catch (error) {
      alert(t("alerts.unexpectedError"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div>
        <label htmlFor="title" className="block text-lg font-medium mb-2">
          {t("formLabels.title")}
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          placeholder={t("placeholders.title")}
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-lg font-medium mb-2">
          {t("formLabels.category")}
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          placeholder={t("placeholders.category")}
          required
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-lg font-medium mb-2">
          {t("formLabels.tags")}
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          placeholder={t("placeholders.tags")}
        />
      </div>

      <div className="border-2 border-dotted border-slate-400 rounded-xl p-4 flex justify-center text-center">
        <div>
          <label className="block text-lg font-medium mb-2">
            {t("formLabels.featuredImage")}
          </label>
          <ImageUploader
            currentImageUrl={formData.image}
            onImageUploaded={handleImageUploaded}
          />
        </div>
      </div>

      <div>
        <label htmlFor="content" className="block text-lg font-medium mb-2">
          {t("formLabels.content")}
        </label>
        {/* <RichTextEditor
          value={formData.content}
          onChange={(content) =>
            setFormData((prev) => ({
              ...prev,
              content,
            }))
          }
        /> */}

        <JoEditor
          content={formData.content}
          onChange={(content) =>
            setFormData((prev) => ({
              ...prev,
              content,
            }))
          }
        />
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500"
        >
          {formData.id ? t("buttons.update") : t("buttons.publish")}
        </button>
      </div>
    </form>
  );
};

export default BlogPostForm;
