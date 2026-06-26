import FormBlog from "@/components/admin/blog/FormBlog";

export default function CreateBlogPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Create Article</h2>
      <p className="text-gray-500 mb-6">Add a new blog article</p>
      <FormBlog />
    </div>
  );
}
