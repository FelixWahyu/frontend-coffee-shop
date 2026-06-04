import SidebarAdmin from "@/components/admin/layout/Sidebar";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="bg-white p-8 rounded-md shadow-[6px_6px_0px_#000000]/60 border border-gray-900 min-h-[calc(100vh-12rem)]">{children}</div>
      </main>
    </section>
  );
}
