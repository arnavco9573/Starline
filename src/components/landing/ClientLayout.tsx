"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define routes where Navbar and Footer SHOULD show
  // Strictly only the pages requested by the user
  const showNavRoutes = [
    "/",
    "/pricing",
    "/testimonials",
    "/research",
    "/ai-agents",
    "/investors",
    "/faqs"
  ];

  const shouldShow = showNavRoutes.includes(pathname);

  if (!shouldShow) {
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
