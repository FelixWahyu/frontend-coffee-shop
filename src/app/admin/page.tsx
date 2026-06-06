import StatCard from "@/components/admin/cards/StatCard";
import { formatDate } from "@/utils/formatDate";
import { Package, ShoppingCart, Users } from "lucide-react";

export default function AdminPage() {
  const currentDate = new Date();
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome to the admin dashboard.</p>
        </div>
        <div className="text-left mt-3 md:mt-0 md:text-right">
          <p className="text-lg font-semibold text-gray-800">{formatDate(currentDate)}</p>
          <p className="text-sm text-gray-500">Todays Date</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Products" value="96" icon={<Package className="w-6 h-6" />} className="bg-yellow-400" />
        <StatCard title="Total Users" value="135" icon={<Users className="w-6 h-6" />} className="bg-blue-500" />
        <StatCard title="Total Orders" value="450" icon={<ShoppingCart className="w-6 h-6" />} className="bg-emerald-500" />
      </div>
    </div>
  );
}
