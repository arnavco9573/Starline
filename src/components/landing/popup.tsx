"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useModal } from "@/app/Providers";

interface AccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccessPopup({ isOpen, onClose }: AccessPopupProps) {
  const router = useRouter();
  const { openWishlist } = useModal();

  if (!isOpen) return null;

  const handleSignup = () => {
    onClose();
    router.push("/auth/login");
  };

  const handleJoinWaitlist = () => {
    onClose();
    openWishlist();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md mx-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close popup"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Explore The Workspace</h2>
          <p className="text-gray-600 mb-8 text-sm">Signup Or Join The Waitlist To Get Early Access</p>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleSignup}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition-colors duration-200"
            >
              Signup
            </button>
            <button
              onClick={handleJoinWaitlist}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-full transition-colors duration-200"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}