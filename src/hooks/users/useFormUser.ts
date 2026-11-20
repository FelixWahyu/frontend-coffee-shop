import { useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorUser } from "@/types/errorMessage";
import { CreateUserRequest } from "@/types/users";
import { validateCreateUser } from "@/validations/users/userValidation";
import { UserService } from "@/services/admin/users";

export function useFormUser() {
  const router = useRouter();
  const [formInput, setFormInput] = useState<CreateUserRequest>({
    name: "",
    username: "",
    password: "",
    role: "USER",
  });
  const [errors, setErrors] = useState<ErrorUser>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updateForm = { ...formInput, [name]: value };
    setFormInput(updateForm);

    const validationErrors = validateCreateUser(updateForm);
    setErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name as keyof ErrorUser],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const validationErrors = validateCreateUser(formInput);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      setApiError(null);

      await UserService.createUser(formInput);

      router.replace("/admin/users");
    } catch (error: unknown) {
      console.error("Failed to create user", error);
      const message = error instanceof Error ? error.message : "Failed to fetch users";
      setApiError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    apiError,
    errors,
    formInput,
    handleChange,
    handleSubmit,
    loading,
  };
}
