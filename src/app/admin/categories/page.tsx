import CategoriesPage from "@/components/admin/categories/CategoriesTable";

export default function CategoriesManagementPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Categories Management</h2>
      <p className="text-gray-500 mb-6">Manage product categories</p>
      <CategoriesPage />
    </div>
  );
}
