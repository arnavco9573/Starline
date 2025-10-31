"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface BuildingChatProps {
  speaker: string;
  text: string;
}

const typingSpeed = 50; // Milliseconds per character

export default function BuildingChat({ speaker, text }: BuildingChatProps) {
  const [typedText, setTypedText] = useState("");

  // This effect resets the animation when the `text` prop changes
  useEffect(() => {
    setTypedText("");
  }, [text]);

  // This effect handles the character-by-character typing animation
  useEffect(() => {
    if (typedText.length < text.length) {
      const timer = setTimeout(() => {
        // Use substring for a safer way to build the string
        setTypedText(text.substring(0, typedText.length + 1));
      }, typingSpeed);

      // Cleanup the timeout if the component unmounts or text changes
      return () => clearTimeout(timer);
    }
  }, [typedText, text]); // Re-run whenever the typed text or the source text changes

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" backdrop-blur-sm p-3  rounded-lg shadow-lg w-fit"
    >
      <p className="font-mono text-xs text-white/80">
        <span className="font-semibold text-white/90">{speaker}</span>{" "}
        {typedText}
      </p>
    </motion.div>
  );
}
