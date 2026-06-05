import { CategoryRequest } from "@/types/categories";
import { ErrorCategory } from "@/types/errorMessage";

export const CategoryValidation = (values: CategoryRequest): ErrorCategory => {
  const errorsCategory: ErrorCategory = {};

  if (!values.name) {
    errorsCategory.name = "Name is required";
  } else if (values.name.trim().length < 3) {
    errorsCategory.name = "Name must be at least 3 characters";
  } else if (values.name.trim().length > 20) {
    errorsCategory.name = "Name must be less than 20 characters";
  }

  if (values.description && values.description.trim().length > 255) {
    errorsCategory.description = "Description must be less than 255 characters";
  }

  return errorsCategory;
};
