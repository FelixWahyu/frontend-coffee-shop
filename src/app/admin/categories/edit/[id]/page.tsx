import FormEditCategory from "@/components/admin/categories/FormEditCategory";

export default function EditCategory() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Edit Category</h2>
      <p className="text-gray-500 mb-6">Update product category</p>
      <FormEditCategory />
    </div>
  );
}
