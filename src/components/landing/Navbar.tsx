"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { LogIn, Menu, X, ChevronDown } from "lucide-react";
import WishList from "./WishlistModal";
import { useModal } from "@/app/Providers";

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { openWishlist } = useModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  return (
    <header className="max-w-7xl mx-auto">
      <div className="container mx-auto  md:max-w-[90rem] flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="relative z-50 ml-5 md:ml-0">
          <a href="/" className="flex items-center mt-2">
            <Image
              src={isHomePage ? "/logofinal.png" : "/LogoBlack.png"}
              alt="logo"
              width={isHomePage ? 180 : 150}
              height={42}
            />
          </a>
        </div>

        {/* Desktop Navigation - Centered and Sticky */}
        <nav className="hidden md:flex items-center space-x-8 bg-white/70 backdrop-blur-md px-8 py-4 rounded-full shadow-sm fixed left-1/2 -translate-x-1/2 top-1.5 z-40">
          <Link
            href="/"
            className={`transition-colors cursor-pointer ${pathname === "/"
              ? "font-semibold border-b-2 border-black"
              : "text-gray-600 hover:text-black"
              }`}
          >
            Home
          </Link>

          <Link
            href="/pricing"
            className={`transition-colors cursor-pointer ${pathname === "/pricing"
              ? "font-semibold border-b-2 border-black pb-1"
              : "text-gray-600 hover:text-black"
              }`}
          >
            Pricing
          </Link>

          <Link
            href="/testimonials"
            className={`transition-colors cursor-pointer ${pathname === "/testimonials"
              ? "font-semibold border-b-2 border-black pb-1"
              : "text-gray-600 hover:text-black"
              }`}
          >
            Testimonials
          </Link>

          {/* More Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setMoreDropdownOpen(true)}
            onMouseLeave={() => {
              // Add a small delay for smoother transition
              setTimeout(() => setMoreDropdownOpen(false), 100);
            }}
          >
            <button
              className={`flex items-center gap-1 transition-colors cursor-pointer ${["/research", "/ai-agents", "/investors"].includes(pathname)
                ? "font-semibold border-b-2 border-black pb-1"
                : "text-gray-600 hover:text-black"
                }`}
            >
              More <ChevronDown className="h-4 w-4" />
            </button>

            {moreDropdownOpen && (
              <div
                className="absolute top-full left-0 pt-2 w-48 z-50"
                onMouseEnter={() => setMoreDropdownOpen(true)}
              >
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 flex flex-col">
                  {[
                    { label: "Research", href: "/research" },
                    { label: "Ai Agents", href: "/ai-agents" },
                    { label: "Investors", href: "/investors" },
                    { label: "FAQ", href: "/faqs" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-black text-sm"
                      onClick={() => setMoreDropdownOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      openWishlist();
                      setMoreDropdownOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-black text-sm text-left"
                  >
                    Contact
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Desktop Right Side Buttons */}
        <div className="hidden md:flex space-x-2 relative z-50">
          <Button
            onClick={openWishlist}
            variant="outline"
            className="rounded-full font-bold"
          >
            Book a Demo
          </Button>

          <Link href="/auth/login">
            <Button
              variant="default"
              className="rounded-full cursor-pointer flex items-center gap-2"
            >
              <LogIn className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 relative z-50 mr-5"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Mobile Menu */}
          <div className="fixed top-20 left-4 right-4 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 space-y-4 z-40 md:hidden animate-in slide-in-from-top">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 transition-colors ${pathname === "/"
                ? "font-semibold text-black border-b-2 border-black"
                : "text-gray-600"
                }`}
            >
              Home
            </Link>

            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 transition-colors ${pathname === "/pricing"
                ? "font-semibold text-black border-b-2 border-black"
                : "text-gray-600"
                }`}
            >
              Pricing
            </Link>

            <Link
              href="/testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 transition-colors ${pathname === "/testimonials"
                ? "font-semibold text-black border-b-2 border-black"
                : "text-gray-600"
                }`}
            >
              Testimonials
            </Link>

            <div className="border-t border-gray-100 pt-2">
              <button
                onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
                className="flex items-center justify-between w-full py-2 text-gray-600 font-medium"
              >
                More <ChevronDown className={`h-4 w-4 transition-transform ${mobileMoreOpen ? "rotate-180" : ""}`} />
              </button>

              {mobileMoreOpen && (
                <div className="pl-4 space-y-2 mt-1">
                  <Link
                    href="/research"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-gray-500 hover:text-black"
                  >
                    Research
                  </Link>
                  <Link
                    href="/ai-agents"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-gray-500 hover:text-black"
                  >
                    Ai Agents
                  </Link>
                  <Link
                    href="/investors"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-gray-500 hover:text-black"
                  >
                    Investors
                  </Link>
                  <Link
                    href="/faqs"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-gray-500 hover:text-black"
                  >
                    FAQ
                  </Link>
                  <button
                    onClick={() => {
                      openWishlist();
                      setMobileMenuOpen(false);
                    }}
                    className="block py-2 text-gray-500 hover:text-black w-full text-left"
                  >
                    Contact
                  </button>
                </div>
              )}
            </div>

            <div className="pt-4 space-y-3 border-t border-gray-200">
              <Button
                onClick={() => {
                  openWishlist();
                  setMobileMenuOpen(false);
                }}
                variant="outline"
                className="w-full rounded-full font-bold"
              >
                Book a Demo
              </Button>

              <Link href="/auth/login" className="block">
                <Button
                  variant="default"
                  className="w-full rounded-full cursor-pointer flex items-center justify-center gap-2"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

