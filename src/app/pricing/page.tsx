"use client";
import React from "react";
import { Mail, CheckCircle } from "lucide-react";
import { motion, Variants } from "framer-motion"; // 1. Import motion
import Image from "next/image";

export default function PricingPage() {
  // Variants for staggering the list items
  const listContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each list item animation
      },
    },
  };

  const listItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="bg-white py-16 md:py-26 overflow-hidden">
      {" "}
      {/* Add overflow-hidden to prevent initial scrollbars */}
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight"
        >
          Pay Less Than Your Coffee for a Drawing!
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="mt-6 text-lg leading-8 text-gray-600"
        >
          Great design shouldn’t break the bank. Starline AI makes fast,
          accurate drawings accessible for everyone.
        </motion.p>

        {/* Body Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          className="mt-8 text-left inline-block"
        >
          <p className="text-lg font-medium text-gray-800">
            Our pricing? Well… we like to keep it a little mysterious.
          </p>

          {/* Staggered List */}
          <motion.ul
            className="mt-6 space-y-4"
            variants={listContainerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.li
              variants={listItemVariants}
              className="flex items-center gap-3"
            >
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-gray-700">
                Affordable for startups, freelancers, and agencies alike.
              </span>
            </motion.li>
            <motion.li
              variants={listItemVariants}
              className="flex items-center gap-3"
            >
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-gray-700">
                Flexible plans tailored to your needs.
              </span>
            </motion.li>
            <motion.li
              variants={listItemVariants}
              className="flex items-center gap-3"
            >
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-gray-700">
                Exclusive early access for our waitlist members.
              </span>
            </motion.li>
          </motion.ul>

          <p className="mt-8 text-lg font-medium text-gray-800">
            Want to see how affordable it really is?
            <br />
            Drop us a message, and we’ll share the details personally.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}
          className="mt-2 flex items-center justify-center mr-5"
        >
          <Image
            src="/Pricing.png"
            alt="Contact Form"
            width={300}
            height={150}
          />
        </motion.div>

        {/* Contact Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }} // Longer delay to appear last
          className="mt-2"
        >
          <a
            href="mailto:business@thedexter.co.in"
            className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
          >
            <Mail className="h-4 w-4" />
            Contact for Pricing
          </a>
        </motion.div>
      </div>
    </div>
  );
}
