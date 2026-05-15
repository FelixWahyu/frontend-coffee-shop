import { Suspense } from "react";
import Loading from "./blog/loading";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="bg-[#E2D9C8]">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
      <Footer />
    </>
  );
}
