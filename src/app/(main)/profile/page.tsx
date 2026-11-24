import CustomerProfileView from "@/components/profile/CustomerProfileView";

export const metadata = {
  title: "Profil Saya - Coffee Shop",
  description: "Kelola profil pribadi, informasi kontak, dan alamat pengiriman Anda.",
};

export default function ProfilePage() {
  return <CustomerProfileView />;
}
