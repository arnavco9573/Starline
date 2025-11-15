"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { GOOGLE_CLIENT_ID, REDIRECT_URL } from "@/config/envConfig";

function LoginForm() {
  const [loading, setLoading] = React.useState(false);
  const [logoRotation, setLogoRotation] = React.useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = React.useState(false);

  const handleLogoMove = (e: { currentTarget: { getBoundingClientRect: () => any; }; clientX: number; clientY: number; }) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setLogoRotation({ x: rotateX, y: rotateY });
  };

  const handleLogoLeave = () => {
    setLogoRotation({ x: 0, y: 0 });
  };

  const handleLogoMouseDown = () => {
    setIsPressed(true);
  };

  const handleLogoMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto">
      <div
        className="flex items-center gap-3 mb-8 justify-center perspective"
        onMouseMove={handleLogoMove}
        onMouseLeave={handleLogoLeave}
        onMouseDown={handleLogoMouseDown}
        onMouseUp={handleLogoMouseUp}
        style={{
          perspective: '1000px',
        }}
      >
        <div
          className="w-12 h-12 bg-gradient-to-br from-gray-900 to-black rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 hover:shadow-lg"
          style={{
            transform: `rotateX(${logoRotation.x}deg) rotateY(${logoRotation.y}deg) ${isPressed ? 'scale(0.95)' : 'scale(1)'}`,
            transformStyle: 'preserve-3d',
            transitionProperty: 'transform',
            transitionDuration: '0.1s',
          }}
        >
           <Image
            src="/logo.png"
            alt="Logo"
            width={30}
            height={30}
          />
        </div>
        {/* <span className="text-3xl font-bold text-gray-900 tracking-tight">starline</span> */}
      </div>

      <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
        Welcome back
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        Sign in to continue to your account
      </p>

      <Link
        href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code&scope=openid%20email%20profile`}
      >
        {/* Google */}
        <motion.div
          className="flex justify-center items-center gap-2 border border-slate-700/50 bg-slate-800/20 backdrop-blur-sm px-4 py-2 rounded-xl cursor-pointer hover:bg-slate-800/30 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Image
            src="/Google Icon.svg"
            alt="Google Icon"
            width={30}
            height={30}
          />
          Log in With Google
        </motion.div>
      </Link>
    </div>
  );
}

export default function Page() {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <LoginForm />
    </motion.div>
  );
}