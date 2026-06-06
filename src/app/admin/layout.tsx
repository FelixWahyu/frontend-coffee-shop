import SidebarAdmin from "@/components/admin/layout/Sidebar";
import HeaderAdmin from "@/components/admin/layout/Header";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />
      <main className="flex-1 overflow-y-auto">
        <HeaderAdmin />
        <div className="bg-white p-8">{children}</div>
      </main>
    </section>
  );
}
