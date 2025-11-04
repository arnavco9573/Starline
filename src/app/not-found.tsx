import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="
        flex min-h-screen w-full flex-col items-center justify-center text-center p-4
        bg-gradient-to-br from-yellow-50 via-blue-50 to-pink-50 
        dark:from-slate-800 dark:via-slate-900 dark:to-slate-800
      "
    >
      {/* Optional: Prismania-like text above the main heading */}
      <p className="text-xs tracking-widest uppercase font-medium text-gray-500 mb-8">
        Starline AI
      </p>

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white max-w-3xl leading-tight">
        Great things coming soon.
      </h1>

      {/* Subheading */}
      <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 max-w-lg">
        We are a small indian ai startup with big ideas.
      </p>

      {/* Learn More Button */}
      {/* <Link
        href="/" // Direct to home or another relevant page for "Learn More"
        className="
          mt-10 
          inline-flex 
          items-center 
          gap-2 
          rounded-md 
          border border-gray-300 
          px-6 
          py-3 
          text-sm 
          font-medium 
          text-gray-700 
          transition-colors 
          hover:bg-gray-50 
          focus:outline-none 
          focus:ring-2 
          focus:ring-gray-200 
          dark:border-gray-600 
          dark:text-gray-200 
          dark:hover:bg-gray-800 
          dark:focus:ring-gray-700
        "
      >
        LEARN MORE →
      </Link> */}
    </main>
  );
}
