"use client";

import Label from "@/components/ui/form/label";
import TextInput from "@/components/ui/form/text-input";
import TextArea from "@/components/ui/form/textarea";
import ErrorMessage from "@/components/ui/form/error";
import FormGroup from "@/components/ui/form/form-group";
import Button from "@/components/ui/button";
import { Save, FileText, Type, User, BookOpen, Clock, Image as ImageIcon, Tag } from "lucide-react";
import { BlogArticle } from "@/types/blog";
import { useBlogForm } from "@/hooks/blog/useBlogForm";

interface FormBlogProps {
  article?: BlogArticle | null;
}

export default function FormBlog({ article }: FormBlogProps) {
  const { formInput, tagInput, errors, loading, isEditing, setTagInput, handleChange, addTag, removeTag, handleSubmit } = useBlogForm(article);

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
            <TextArea onChange={handleChange} value={formInput.content} id="content" name="content" placeholder="Article content..." className="border-none min-h-[200px]" />
          </div>
          {errors.content && <ErrorMessage message={errors.content} />}
        </FormGroup>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup>
            <Label htmlFor="image">Image URL</Label>
            <div className="flex items-center border border-gray-900 px-2 py-1 rounded-md">
              <ImageIcon className="w-5 h-5 mr-1 shrink-0" />
              <TextInput type="text" onChange={handleChange} value={formInput.image} id="image" name="image" placeholder="/assets/image/..." className="border-none" />
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
                  <button type="button" onClick={() => removeTag(tag)} className="text-red-500 hover:text-red-700 ml-1 cursor-pointer">&times;</button>
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
