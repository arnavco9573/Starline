import React, { useState } from "react";
import { XIcon, ChevronDownIcon, LoaderIcon } from "lucide-react";
import { submitWaitlist } from "@/services/services";
import { toast } from "sonner";

interface WishListProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  company: string;
  location: string;
  teamSize: string;
  bookDemo: boolean;
}

const WishList = ({ open, onOpenChange }: WishListProps) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    company: "",
    role: "",
    location: "",
    teamSize: "",
    bookDemo: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      toast.error("Please fill out required fields (Full Name, Email Address)");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        full_name: formData.fullName,
        email: formData.email,
        phone_number: formData.phoneNumber || "",
        professional_role: formData.role || "",
        organization: formData.company || "",
        location: formData.location || "",
        firm_size: formData.teamSize || "",
        book_demo: formData.bookDemo,
      };

      const res = await submitWaitlist(payload);

      if (res?.message === "User added to waitlist") {
        toast.success(
          formData.bookDemo
            ? "🎉 Thank you! We'll contact you shortly to schedule a demo."
            : "🎉 You're in! We'll notify you as soon as we launch."
        );

        // Close modal & reset form
        onOpenChange(false);
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          company: "",
          role: "",
          location: "",
          teamSize: "",
          bookDemo: false,
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.message || "Submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  const inputStyles =
    "w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200";
  const selectStyles = `${inputStyles} appearance-none cursor-pointer`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/80 backdrop-blur-sm p-4">
      {/* Added padding for small screens */}
      {/* Responsive width and height */}
      <div className="relative w-full max-w-md sm:max-w-lg max-h-[95vh] sm:max-h-[90vh] mx-auto bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden flex flex-col">
        {/* Header - Adjusted padding and text size */}
        <div className="p-4 sm:p-6 border-b border-gray-200 flex items-start justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Join the Waiting List
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Get early access and updates.
            </p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 sm:p-2 hover:bg-gray-100 rounded-md transition-colors text-gray-600 hover:text-gray-900"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Form - Adjusted padding and spacing */}
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 space-y-4 overflow-y-auto"
        >
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 mb-1.5 sm:mb-2 text-sm font-medium">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className={inputStyles}
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1.5 sm:mb-2 text-sm font-medium">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={inputStyles}
              placeholder="john@company.com"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 mb-1.5 sm:mb-2 text-sm font-medium">
              Phone Number <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className={inputStyles}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Role + Company - Stacks on small screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1.5 sm:mb-2 text-sm font-medium">
                Organization / Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className={inputStyles}
                placeholder="Company Inc."
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1.5 sm:mb-2 text-sm font-medium">
                Professional Role / Title
              </label>
              <div className="relative">
                <input
                  placeholder="Role"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className={inputStyles} // Changed from selectStyles for consistency
                />
              </div>
            </div>
          </div>

          {/* Location + Team Size - Stacks on small screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1.5 sm:mb-2 text-sm font-medium">
                Location <span className="text-gray-500">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className={inputStyles}
                placeholder="City, Country"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1.5 sm:mb-2 text-sm font-medium">
                Firm Size / Team Size
                <span className="text-gray-500">(Optional)</span>
              </label>
              <div className="relative">
                <select
                  value={formData.teamSize}
                  onChange={(e) =>
                    handleInputChange("teamSize", e.target.value)
                  }
                  className={selectStyles}
                >
                  <option value="">Select size</option>
                  <option value="1">Just me</option>
                  <option value="2-10">2-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="200+">200+</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Book Demo */}
          <div className="pt-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={formData.bookDemo}
                  onChange={(e) =>
                    handleInputChange("bookDemo", e.target.checked)
                  }
                  className="sr-only peer" // Added peer class
                />
                <div
                  className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center 
                             bg-white border-gray-300 
                             peer-checked:bg-blue-600 peer-checked:border-blue-600`} // Simplified conditional styling using peer
                >
                  <svg
                    className={`w-3 h-3 text-white transition-opacity duration-200 ${
                      formData.bookDemo ? "opacity-100" : "opacity-0" // Control checkmark visibility
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <span className="text-gray-700 font-medium text-sm">
                I'd like to book a demo
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-md transition-all duration-200 disabled:cursor-not-allowed shadow-sm hover:shadow-md" // Adjusted padding and font size
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <LoaderIcon className="w-4 h-4 animate-spin" />
                  <span className="ml-2">
                    {formData.bookDemo ? "Booking..." : "Joining..."}
                  </span>
                </div>
              ) : formData.bookDemo ? (
                "Book Demo & Join Waitlist"
              ) : (
                "Join Waitlist"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WishList;
