import { LoginRequest } from "@/types/login";
import { ErrorMsg } from "@/types/errorMessage";

export const ValidationLogin = (values: LoginRequest): ErrorMsg => {
  const errors: ErrorMsg = {};

  if (!values.username) {
    errors.username = "Username is required";
  } else if (values.username.trim().length < 3) {
    errors.username = "Username must be at least 3 characters";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.trim().length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};
