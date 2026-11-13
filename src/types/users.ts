export type User = {
  name: string;
  username: string;
  role: string;
};

export type Address = {
  id: number;
  street?: string | null;
  city: string;
  province: string;
  country?: string | null;
  postal_code?: string | null;
  contact_id: number;
};

export type Contact = {
  id: number;
  first_name: string;
  last_name: string;
  email?: string | null;
  phone?: string | null;
  username: string;
  addresses: Address[];
};

export type UserDetail = User & {
  contacts: Contact[];
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

export type CreateContactInput = {
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    city: string;
    province: string;
    country?: string;
    postal_code?: string;
  };
};

export type UpdateContactInput = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
};

export type CreateAddressInput = {
  street?: string;
  city: string;
  province: string;
  country?: string;
  postal_code?: string;
};

export type UpdateAddressInput = {
  street?: string;
  city?: string;
  province?: string;
  country?: string;
  postal_code?: string;
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

export type SingleUserDetailApiResponse = {
  success: boolean;
  message: string;
  data: UserDetail;
};
