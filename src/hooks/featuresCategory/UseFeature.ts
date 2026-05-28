"use client";

import { useState, useEffect, useRef } from "react";
import { Category } from "@/types/categories";
import { FeaturesService } from "@/services/home/featureService";

export default function useFeatures() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await FeaturesService.getAllFeatures();
        setCategories(response.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, prevRef, nextRef };
}
