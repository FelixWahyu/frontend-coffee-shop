import { BASE_URL } from "@/lib/api";

export const UploadService = {
  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${BASE_URL}/admin/upload`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const json = await res.json();

    if (!res.ok) {
      console.error("Upload image gagal:", {
        status: res.status,
        response: json,
      });

      throw new Error(json.errors || "Gagal mengunggah gambar.");
    }

    if (!json.data?.url) {
      throw new Error("URL gambar tidak ditemukan dalam response.");
    }

    return json.data.url;
  },
};
