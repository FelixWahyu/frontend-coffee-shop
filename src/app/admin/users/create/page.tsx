import FormUser from "@/components/admin/users/FormUser";

export default function CreateUserPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Create User</h2>
      <p className="text-gray-500 mb-6">Add a new user to the system</p>
      <FormUser />
    </div>
  );
}
