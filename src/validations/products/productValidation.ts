import { ProductRequest } from "@/types/product";
import { ErrorProduct } from "@/types/errorMessage";

export const ProductValidation = (data: Partial<ProductRequest>): ErrorProduct => {
  const errors: ErrorProduct = {};

  if (!data.name || data.name.trim() === "") {
    errors.name = "Product name is required";
  }

  if (data.price === undefined || data.price === null || String(data.price).trim() === "") {
    errors.price = "Price is required";
  } else {
    const numPrice = Number(data.price);
    if (isNaN(numPrice)) {
      errors.price = "Price must be a number";
    } else if (numPrice <= 0) {
      errors.price = "Price must be greater than 0";
    }
  }

  if (!data.category_id || isNaN(Number(data.category_id)) || Number(data.category_id) <= 0) {
    errors.category_id = "Category is required";
  }

  return errors;
};
