import FormCategories from "@/components/admin/categories/FormCategories";

export default function CreateCategory() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Create Category</h2>
      <p className="text-gray-500 mb-6">Add a new category</p>
      <FormCategories />
    </div>
  );
}
