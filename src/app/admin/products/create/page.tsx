import FormProduct from "@/components/admin/products/FormProduct";

export default function CreateProductPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Create Product</h2>
      <p className="text-gray-500 mb-6">Add a new product to your catalog</p>
      <FormProduct />
    </div>
  );
}
