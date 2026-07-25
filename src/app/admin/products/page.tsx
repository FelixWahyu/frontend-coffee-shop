import ProductTable from "@/components/admin/products/ProductTable";

export default function ProductManagementPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Products Management</h2>
      <p className="text-gray-500 mb-6">Manage your shop catalog products</p>
      <ProductTable />
    </div>
  );
}
