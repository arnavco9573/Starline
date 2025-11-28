"use client";
import { useEffect, useState, useRef } from "react";

const countries = [
  { value: "india", label: "India", flag: "🇮🇳" },
  { value: "usa", label: "USA", flag: "🇺🇸" },
  { value: "uk", label: "United Kingdom", flag: "🇬🇧" },
  { value: "australia", label: "Australia", flag: "🇦🇺" },
  { value: "new_zealand", label: "New Zealand", flag: "🇳🇿" },
  { value: "canada", label: "Canada", flag: "🇨🇦" },
  { value: "kuwait", label: "Kuwait", flag: "🇰🇼" },
  { value: "malaysia", label: "Malaysia", flag: "🇲🇾" },
  { value: "qatar", label: "Qatar", flag: "🇶🇦" },
  { value: "saudi", label: "Saudi Arabia", flag: "🇸🇦" },
  { value: "uae", label: "United Arab Emirates", flag: "🇦🇪" },
];

interface CountryDropdownProps {
  activeMode: string;
}

export default function CountryDropdown({ activeMode }: CountryDropdownProps) {
  const [selected, setSelected] = useState("india");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const selectedCountry = countries.find((c) => c.value === selected);

  useEffect(() => {
    if (activeMode === "plus") {
      setSelected("india");
      localStorage.setItem("selectedCountry", "india");
    }
  }, [activeMode]);

  useEffect(() => {
    const saved = localStorage.getItem("selectedCountry");
    if (saved) setSelected(saved);
  }, []);

  const handleSelect = (value: string) => {
    setSelected(value);
    localStorage.setItem("selectedCountry", value);
    setOpen(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-32 ">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center gap-2 bg-white px-2 py-1 border border-gray-300
                   rounded-md text-xs shadow-sm hover:border-gray-400"
      >
        <p className="truncate ">{selectedCountry?.label}</p>
        <span className="text-base">{selectedCountry?.flag}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300
                        rounded-md shadow-md z-20 text-xs">
          {countries.map((c) => (
            <div
              key={c.value}
              onClick={() => handleSelect(c.value)}
              className="flex justify-between items-center px-2 py-1 cursor-pointer
                         hover:bg-gray-100 truncate"
            >
              <span className="truncate">{c.label}</span>
              <span className="text-base">{c.flag}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
