import { CreateUserRequest, UpdateUserRequest } from "@/types/users";
import { ErrorUser } from "@/types/errorMessage";

export const validateCreateUser = (values: CreateUserRequest): ErrorUser => {
  const errors: ErrorUser = {};

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

  if (!values.role) {
    errors.role = "Role is required";
  } else if (values.role !== "USER" && values.role !== "ADMIN") {
    errors.role = "Role must be USER or ADMIN";
  }

  return errors;
};

export const validateUpdateUser = (values: UpdateUserRequest): ErrorUser => {
  const errors: ErrorUser = {};

  const RegexName = /^[\p{L} ]+$/u;
  if (values.name !== undefined) {
    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters";
    } else if (!RegexName.test(values.name.trim())) {
      errors.name = "Name can only contain letters and spaces";
    }
  }

  if (values.password && values.password.trim().length > 0) {
    if (values.password.trim().length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
  }

  if (values.role && values.role !== "USER" && values.role !== "ADMIN") {
    errors.role = "Role must be USER or ADMIN";
  }

  return errors;
};
