import BlogTable from "@/components/admin/blog/BlogTable";

export default function BlogMangementPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Blog Management</h2>
      <p className="text-gray-500 mb-6">Manage your blog articles</p>
      <BlogTable />
    </div>
  );
}
