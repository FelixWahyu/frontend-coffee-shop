import { Suspense } from "react";
import LoadingSkeleton from "@/components/ui/loading";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <main className="bg-[#E2D9C8]">
        <Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
