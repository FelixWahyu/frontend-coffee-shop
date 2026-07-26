"use client";

import Label from "@/components/ui/form/label";
import TextInput from "@/components/ui/form/text-input";
import TextArea from "@/components/ui/form/textarea";
import ErrorMessage from "@/components/ui/form/error";
import FormGroup from "@/components/ui/form/form-group";
import Button from "@/components/ui/button";
import { Save, FileText, Type, User, BookOpen, Clock, Image as ImageIcon, Tag, X } from "lucide-react";
import { BlogArticle } from "@/types/blog";
import { useBlogForm } from "@/hooks/blog/useBlogForm";
import { useState } from "react";
import { UploadService } from "@/services/admin/upload";
import { BASE_URL } from "@/lib/api";

interface FormBlogProps {
  article?: BlogArticle | null;
}

export default function FormBlog({ article }: FormBlogProps) {
  const { formInput, tagInput, errors, loading, isEditing, setFormInput, setTagInput, handleChange, addTag, removeTag, handleSubmit } = useBlogForm(article);
  const [uploading, setUploading] = useState(false);

  const BASE_IMAGE_HOST = BASE_URL.replace("/api", "");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await UploadService.uploadImage(file);
      setFormInput((prev) => ({ ...prev, image: url }));
    } catch (err) {
      console.error(err);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 rounded-md border-3 border-gray-900 max-w-2xl shadow-[6px_6px_0px_#000000]/60 bg-white">
      <div className="mb-6 text-xl font-semibold tracking-wide text-gray-800">
        <h2>{isEditing ? "Edit Article" : "Create New Article"}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md">
            <Type className="w-5 h-5 mr-1 shrink-0" />
            <TextInput type="text" onChange={handleChange} value={formInput.title} id="title" name="title" placeholder="Article title" className="border-none" />
          </div>
          {errors.title && <ErrorMessage message={errors.title} />}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="excerpt">Excerpt</Label>
          <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md">
            <FileText className="w-5 h-5 mr-1 shrink-0" />
            <TextInput type="text" onChange={handleChange} value={formInput.excerpt} id="excerpt" name="excerpt" placeholder="Brief description" className="border-none" />
          </div>
          {errors.excerpt && <ErrorMessage message={errors.excerpt} />}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="content">Content</Label>
          <div className="flex border border-gray-900 px-2 py-1 rounded-md">
            <BookOpen className="w-5 h-5 mr-1 mt-2 shrink-0" />
            <TextArea onChange={handleChange} value={formInput.content} id="content" name="content" placeholder="Article content..." className="border-none min-h-50" />
          </div>
          {errors.content && <ErrorMessage message={errors.content} />}
        </FormGroup>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup>
            <Label htmlFor="image-file">Blog Image</Label>
            <div className="flex flex-col gap-3 p-3 border border-gray-900 rounded-md bg-stone-50">
              {formInput.image && (
                <div className="relative w-32 h-32 border-2 border-black rounded-md overflow-hidden shadow-[2px_2px_0px_#000000]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formInput.image.startsWith("http") ? formInput.image : `${BASE_IMAGE_HOST}${formInput.image}`}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormInput((prev) => ({ ...prev, image: "" }))}
                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              <input
                type="file"
                id="image-file"
                accept="image/*"
                disabled={uploading}
                onChange={handleImageUpload}
                className="file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border file:border-black file:text-sm file:font-semibold file:bg-gray-100 file:hover:bg-gray-200 file:cursor-pointer text-sm text-stone-500"
              />
              {uploading && <p className="text-xs text-[#C67C4E] animate-pulse">Uploading image...</p>}
            </div>
            {errors.image && <ErrorMessage message={errors.image} />}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="category">Category</Label>
            <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md">
              <Tag className="w-5 h-5 mr-1 shrink-0" />
              <TextInput type="text" onChange={handleChange} value={formInput.category} id="category" name="category" placeholder="e.g. Tips, Sejarah" className="border-none" />
            </div>
            {errors.category && <ErrorMessage message={errors.category} />}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="author">Author</Label>
            <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md">
              <User className="w-5 h-5 mr-1 shrink-0" />
              <TextInput type="text" onChange={handleChange} value={formInput.author} id="author" name="author" placeholder="Author name" className="border-none" />
            </div>
            {errors.author && <ErrorMessage message={errors.author} />}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="readingTime">Reading Time (minutes)</Label>
            <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md">
              <Clock className="w-5 h-5 mr-1 shrink-0" />
              <TextInput type="number" onChange={handleChange} value={formInput.readingTime} id="readingTime" name="readingTime" min={1} className="border-none" />
            </div>
            {errors.readingTime && <ErrorMessage message={errors.readingTime} />}
          </FormGroup>
        </div>

        <FormGroup>
          <Label>Tags</Label>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md flex-1">
              <Tag className="w-5 h-5 mr-1 shrink-0" />
              <TextInput type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="Add a tag" className="border-none" onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} />
            </div>
            <Button type="button" onClick={addTag} className="px-3 py-1.5 border border-black rounded-md bg-gray-200 font-semibold hover:bg-gray-300 transition-all cursor-pointer">
              Add
            </Button>
          </div>
          {formInput.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formInput.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-[#F1F0EE] border border-[#30261C]/20 rounded-full">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="text-red-500 hover:text-red-700 ml-1 cursor-pointer">
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
          {errors.tags && <ErrorMessage message={errors.tags} />}
        </FormGroup>

        <Button
          type="submit"
          disabled={loading}
          className="flex items-center mt-6 cursor-pointer px-4 py-1.5 shadow-[4px_4px_0px_#000000]/50 border border-black rounded-md bg-gray-200 font-semibold hover:text-white hover:bg-blue-600 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
        >
          <Save className="w-5 h-5 mr-1" />
          {loading ? "Saving..." : "Simpan"}
        </Button>
      </form>
    </div>
  );
}
