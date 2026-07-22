import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getCurrrentUser from "@/services/auth/authUser";
import { UserResponse } from "@/types/users";

export const useAdminAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrrentUser();
        if (!currentUser || !currentUser.data) {
          router.replace("/login");
          return;
        }

        // Check if user has admin privileges
        if (currentUser.data.role !== "ADMIN") {
          router.replace("/"); // Redirect normal users to homepage
          return;
        }

        setUser(currentUser.data);
        setLoading(false);
      } catch (error) {
        console.error("Auth check failed:", error);
        router.replace("/login");
      }
    };

    checkAuth();
  }, [router]);

  return { user, loading };
};
