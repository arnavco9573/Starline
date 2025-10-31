import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // The main tag will now act as the positioning context
    <main className="relative">
      <Navbar />
      {/* The children (your page content) will now render underneath the Navbar */}
      {children}
      <Footer />
    </main>
  );
}
