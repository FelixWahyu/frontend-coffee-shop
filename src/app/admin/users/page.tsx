import UsersTable from "@/components/admin/users/UsersTable";

export default function UsersManagementPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Users Management</h2>
      <p className="text-gray-500 mb-6">Manage system users, credentials, and roles</p>
      <UsersTable />
    </div>
  );
}
