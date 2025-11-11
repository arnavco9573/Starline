"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Toaster } from "sonner";
import WishList from "@/components/landing/WishlistModal"; // Adjust path if needed
import { Provider } from "react-redux";
import { store } from "@/store/store";

// Define the shape of the modal context
interface ModalContextType {
  openWishlist: () => void;
}

// Create the context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Create a custom hook that components can use to open the modal
export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within the Providers component");
  }
  return context;
};

// The main Providers component now manages all global providers
export default function Providers({ children }: { children: ReactNode }) {
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const openWishlist = () => setWishlistOpen(true);

  return (
    // Provide the openWishlist function to all children
    <Provider store={store}>
      <ModalContext.Provider value={{ openWishlist }}>
        {children}
        {/* Render all global UI components here */}
        <Toaster />
        <WishList open={wishlistOpen} onOpenChange={setWishlistOpen} />
      </ModalContext.Provider>
    </Provider>
  );
}
