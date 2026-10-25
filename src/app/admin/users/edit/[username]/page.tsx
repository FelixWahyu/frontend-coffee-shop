import FormEditUser from "@/components/admin/users/FormEditUser";

export default function EditUserPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Edit User</h2>
      <p className="text-gray-500 mb-6">Update user credentials and permissions</p>
      <FormEditUser />
    </div>
  );
}
