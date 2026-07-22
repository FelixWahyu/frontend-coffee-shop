"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import FormBlog from "@/components/admin/blog/FormBlog";
import { BlogArticle } from "@/types/blog";
import { BlogService } from "@/services/admin/blog";

export default function EditBlogPage() {
  const params = useParams();
  const id = Number(params.id);
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || isNaN(id)) return;
    BlogService.getById(id)
      .then(setArticle)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Edit Article</h2>
      <p className="text-gray-500 mb-6">Update blog article</p>
      {loading ? <p className="text-gray-500">Loading...</p> : <FormBlog article={article} />}
    </div>
  );
}
