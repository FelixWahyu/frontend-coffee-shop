import AdminLayoutMain from "@/components/admin/layout/MainLayout";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AdminLayoutMain main={children} />;
}
