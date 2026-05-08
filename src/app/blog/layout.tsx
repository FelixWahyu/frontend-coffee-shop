import { Suspense } from "react";
import Loading from "./loading";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </main>
  );
}
