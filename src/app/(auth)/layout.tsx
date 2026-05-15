export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#E2D9C8]">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-6">{children}</div>
    </main>
  );
}
