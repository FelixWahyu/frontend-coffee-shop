export type User = {
  name: string;
  username: string;
  role: string;
};

export type UserResponse = {
  name: string;
  username: string;
  token?: string;
  role?: string;
};

export type CreateUserRequest = {
  name: string;
  username: string;
  password: string;
  role: "USER" | "ADMIN";
};

export type UpdateUserRequest = {
  name?: string;
  password?: string;
  role?: "USER" | "ADMIN";
};

export type UserApiResponse = {
  success: boolean;
  message: string;
  data: User[];
  paging?: {
    size: number;
    total_page: number;
    current_page: number;
  };
};

export type SingleUserApiResponse = {
  success: boolean;
  message: string;
  data: User;
};

