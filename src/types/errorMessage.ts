export interface ErrorMsg {
  name?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export interface ErrorCategory {
  name?: string;
  description?: string;
  image?: string;
}

export interface ErrorBlog {
  title?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  category?: string;
  author?: string;
  tags?: string;
  readingTime?: string;
}

export interface ErrorProduct {
  name?: string;
  description?: string;
  price?: string;
  category_id?: string;
  image?: string;
  general?: string;
}

export interface ErrorUser {
  name?: string;
  username?: string;
  password?: string;
  role?: string;
  general?: string;
}

