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
