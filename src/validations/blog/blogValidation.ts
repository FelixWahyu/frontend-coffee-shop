import { BlogRequest } from "@/types/blog";
import { ErrorBlog } from "@/types/errorMessage";

export const BlogValidation = (values: BlogRequest): ErrorBlog => {
  const errors: ErrorBlog = {};

  if (!values.title) {
    errors.title = "Title is required";
  } else if (values.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters";
  } else if (values.title.trim().length > 200) {
    errors.title = "Title must be less than 200 characters";
  }

  if (!values.excerpt) {
    errors.excerpt = "Excerpt is required";
  } else if (values.excerpt.trim().length > 500) {
    errors.excerpt = "Excerpt must be less than 500 characters";
  }

  if (!values.content) {
    errors.content = "Content is required";
  }

  if (!values.image) {
    errors.image = "Image URL is required";
  }

  if (!values.category) {
    errors.category = "Category is required";
  } else if (values.category.trim().length > 100) {
    errors.category = "Category must be less than 100 characters";
  }

  if (!values.author) {
    errors.author = "Author is required";
  } else if (values.author.trim().length > 100) {
    errors.author = "Author must be less than 100 characters";
  }

  if (values.tags.length === 0) {
    errors.tags = "At least one tag is required";
  }

  if (!values.readingTime || values.readingTime < 1) {
    errors.readingTime = "Reading time must be at least 1 minute";
  }

  return errors;
};
