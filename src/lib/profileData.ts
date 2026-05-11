import { ReviewApiResponse } from "../types/review";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const ReviewApi = {
  getReviews: async (): Promise<ReviewApiResponse> => {
    const response = await fetch(`${BASE_URL}/reviews`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      // throw new Error("Failed to fetch reviews");
      const errorText = await response.text();

      console.error("API Error:", errorText);

      throw new Error(errorText);
    }

    return response.json();
  },
};

export const Reviews = [
  {
    id: 1,
    name: "Felix",
    email: "felix@email.com",
    review: "Kopi sangat enak dan tempat nyaman!",
    rating: 5,
  },
  {
    id: 2,
    name: "Safira",
    email: "safira@email.com",
    review: "Pelayanan ramah dan cepat.",
    rating: 4,
  },
  {
    id: 3,
    name: "Budi",
    email: "budi@email.com",
    review: "Tempat cozy untuk kerja.",
    rating: 4,
  },
  {
    id: 4,
    name: "Agus",
    email: "agus@email.com",
    review: "Kopinya dan makanannya enak banget.",
    rating: 5,
  },
];

export const profileData = [
  {
    id: 1,
    name: "Felix",
    old: 22,
    email: "felix@gmail.com",
    skills: ["TypeScript", "Next.js", "React", "Tailwindcss"],
  },
  {
    id: 2,
    name: "Agus",
    old: 22,
    email: "agus@gmail.com",
    skills: ["JavScript", "Nest.js", "React", "Bootstrap"],
  },
  {
    id: 3,
    name: "Mukti",
    old: 18,
    email: "mukti@gmail.com",
    skills: ["Java", "Springbot", "React", "Tailwindcss"],
  },
];
