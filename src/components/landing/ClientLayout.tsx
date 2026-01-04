"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Exclude routes like /workspace, /chat, and auth pages
  const hideNavRoutes = ["/workspace", "/chat", "/auth/login", "/auth/callback/google"];

  const shouldHide = hideNavRoutes.some(route => pathname.startsWith(route));

  if (shouldHide) {
    return <>{children}</>;
  }

  return (
    <main className="relative min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
