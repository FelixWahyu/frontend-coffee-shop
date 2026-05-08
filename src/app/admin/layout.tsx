import Link from "next/link";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="flex min-h-screen pt-28 bg-gray-50 dark:bg-black">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-zinc-900 text-white p-6 hidden md:flex flex-col border-r border-white/10 shadow-xl">
        <div className="mb-10">
          <h2 className="text-xl font-bold text-blue-500 uppercase tracking-wider">Aqua Admin</h2>
          <p className="text-xs text-zinc-500 mt-1">Management System</p>
        </div>
        <nav className="flex flex-col gap-4">
          <Link href="/admin" className="font-semibold hover:text-blue-400 transition-colors">
            Dashboard
          </Link>
          <Link href="/products" className="font-semibold hover:text-blue-400 transition-colors">
            Manage Products
          </Link>
          <Link href="/blog" className="font-semibold hover:text-blue-400 transition-colors">
            Manage Blog
          </Link>
        </nav>
        <div className="mt-auto border-t border-zinc-800 pt-6">
          <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
            <span>&larr;</span> Back to Website
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 min-h-[calc(100vh-12rem)]">{children}</div>
      </main>
    </section>
  );
}
