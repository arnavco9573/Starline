import React from "react";
import Image from "next/image";
import { Instagram, Linkedin, Mail, Twitter, X } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 py-12 px-6 lg:px-2 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: ThinkDex. Academy and Powered By */}
        <div className="mb-5">
          <a href="/" className="flex items-center">
            <Image src="/LogoBlack.png" alt="logo" width={200} height={42} />
            
          </a>
          <p className="text-sm text-gray-600 pt-6">Powered By</p>
          <p className="text-lg font-medium text-gray-800">Dexter Platforms</p>
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Get In Touch Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Get In Touch
            </h3>
            <div className="flex space-x-3 mb-4">
              {/* Gmail Icon */}
              <a
                href="mailto:business@thedexter.co.in"
                aria-label="Gmail"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Mail className="w-4 h-4 text-gray-600" />
              </a>

              {/* LinkedIn Icon */}
              <a
                href="https://www.linkedin.com/company/starline-ai/?viewAsMember=true"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-gray-600" />
              </a>

              {/* Instagram Icon */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Instagram className="w-4 h-4 text-gray-600" />
              </a>

              {/* X (Twitter) Icon */}
              <a
                href="#"
                aria-label="X (formerly Twitter)"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </a>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              100 24th Street W Suite I-1205
              <br />
              Billings, MT 59102, United States
            </p>
          </div>

          {/* Explore Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  AI Tools & Solutions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Labs & Research
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Internship & Mentorship
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Blog & Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Collaborate With Us Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Collaborate With Us
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  API Licensing & Partnerships
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Custom AI Solutions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Research Collaborations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Developer Ecosystem
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Join Our Creator Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Our Focus Areas Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Our Focus Areas
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Generative Design for Architecture
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  AI-Powered Graphic Design & Animation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Virtual Prototyping & Ideation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  UX/UI AI Assistants
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  AI Career Mentorship & Learning
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Legal Links */}
        <hr className="border-gray-200 mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
          <p>© 2025 Dexter Platforms, LLC. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-gray-700 transition-colors">
              Privacy Policy
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-gray-700 transition-colors">
              Terms of Use
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-gray-700 transition-colors">
              Legal
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-gray-700 transition-colors">
              Site Map
            </a>
            <span className="hidden md:inline text-gray-300">|</span>{" "}
            {/* Hidden on mobile, shown on desktop */}
            <span className="hidden md:inline">United States</span>{" "}
            {/* Hidden on mobile, shown on desktop */}
            {/* On mobile, "United States" might wrap or be omitted depending on layout preference */}
          </div>
          <p className="hidden md:inline">United States</p>{" "}
        </div>
      </div>
    </footer>
  );
}
