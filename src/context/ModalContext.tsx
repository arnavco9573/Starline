"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import WishList from "@/components/landing/WishlistModal"; // Adjust the import path

// Define the shape of the context data
interface ModalContextType {
  openWishlist: () => void;
}

// Create the context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Create a provider component that will wrap your app
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const openWishlist = () => setWishlistOpen(true);

  return (
    <ModalContext.Provider value={{ openWishlist }}>
      {children}
      {/* The modal now lives here, managed by the provider */}
      <WishList open={wishlistOpen} onOpenChange={setWishlistOpen} />
    </ModalContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
