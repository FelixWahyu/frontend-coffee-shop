import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BlogRequest, BlogArticle } from "@/types/blog";
import { ErrorBlog } from "@/types/errorMessage";
import { BlogValidation } from "@/validations/blog/blogValidation";
import { BlogService } from "@/services/admin/blog";

export function useBlogForm(article?: BlogArticle | null) {
  const router = useRouter();
  const isEditing = !!article;

  const [formInput, setFormInput] = useState<BlogRequest>({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    category: "",
    author: "",
    tags: [],
    readingTime: 1,
  });
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<ErrorBlog>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (article) {
      setFormInput({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        image: article.image,
        category: article.category,
        author: article.author,
        tags: article.tags,
        readingTime: article.readingTime,
      });
    }
  }, [article]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updated = { ...formInput, [name]: name === "readingTime" ? Number(value) : value };
    setFormInput(updated);
    const validationErrors = BlogValidation(updated);
    setErrors((prev) => ({ ...prev, [name]: validationErrors[name as keyof ErrorBlog] }));
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !formInput.tags.includes(tag)) {
      const updated = { ...formInput, tags: [...formInput.tags, tag] };
      setFormInput(updated);
      setTagInput("");
      setErrors((prev) => ({ ...prev, tags: undefined }));
    }
  };

  const removeTag = (tag: string) => {
    const updated = { ...formInput, tags: formInput.tags.filter((t) => t !== tag) };
    setFormInput(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const validationErrors = BlogValidation(formInput);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      if (isEditing && article) {
        await BlogService.update(article.id, formInput);
      } else {
        await BlogService.create(formInput);
      }

      router.replace("/admin/blog");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    formInput,
    tagInput,
    errors,
    loading,
    isEditing,
    setTagInput,
    handleChange,
    addTag,
    removeTag,
    handleSubmit,
  };
}
