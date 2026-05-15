import featuresImg from "@/src/asset/image/expresso.jpg";
import { CategoryApiResponse } from "../types/categories";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api";

export const CategoriesApi = {
  getCategories: async (): Promise<CategoryApiResponse> => {
    const response = await fetch(`${BASE_URL}/categories`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return response.json();
  },
};

export const features = [
  {
    id: 1,
    title: "Espresso",
    description: "Kopi pekat dengan cita rasa kuat, dibuat dari biji kopi pilihan yang diseduh dengan tekanan tinggi.",
    image: featuresImg,
  },
  {
    id: 2,
    title: "Cappuccino",
    description: "Perpaduan espresso dengan susu panas dan foam lembut yang menciptakan harmoni rasa sempurna.",
    image: featuresImg,
  },
  {
    id: 3,
    title: "Latte",
    description: "Espresso lembut dengan susu steamed yang creamy, cocok untuk menemani hari-hari kamu yang biasa.",
    image: featuresImg,
  },
  {
    id: 4,
    title: "Americano",
    description: "Espresso yang diencerkan dengan air panas, menghasilkan rasa kopi yang ringan namun tetap kaya.",
    image: featuresImg,
  },
];
