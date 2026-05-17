export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#E2D9C8]">
      <div className="flex items-center justify-center">{children}</div>
    </main>
  );
}
