import { RegisterRequest } from "@/types/login";
import { ErrorMsg } from "@/types/errorMessage";

export const ValidationRegister = (values: RegisterRequest): ErrorMsg => {
  const errors: ErrorMsg = {};

  const RegexName = /^[\p{L} ]+$/u;
  if (!values.name) {
    errors.name = "Name is required";
  } else if (values.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters";
  } else if (!RegexName.test(values.name.trim())) {
    errors.name = "Name can only contain letters and spaces";
  }

  const RegexUsername = /^[a-zA-Z0-9_]+$/;
  if (!values.username) {
    errors.username = "Username is required";
  } else if (values.username.trim().length < 3) {
    errors.username = "Username must be at least 3 characters";
  } else if (!RegexUsername.test(values.username)) {
    errors.username = "Username can only contain letters, numbers, and underscores";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Password does not match";
  }

  return errors;
};
