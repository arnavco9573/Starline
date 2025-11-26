// Providers.tsx (updated)
"use client";
import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { Toaster } from "sonner";
import WishList from "@/components/landing/WishlistModal";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import AccessPopup from "@/components/landing/popup";

interface ModalContextType {
  openWishlist: () => void;
  isAccessPopupOpen: boolean;
  closeAccessPopup: () => void;
  openAccessPopup: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within the Providers component");
  }
  return context;
};

export default function Providers({ children }: { children: ReactNode }) {
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [isAccessPopupOpen, setIsAccessPopupOpen] = useState(false); // <-- false

  const openWishlist = () => setWishlistOpen(true);
  const closeAccessPopup = () => {
    setIsAccessPopupOpen(false);
    localStorage.setItem("popupClosed", "true");
  };
  const openAccessPopup = () => setIsAccessPopupOpen(true);

  // Memoize so the functions don't get new identity each render
  const value = useMemo(
    () => ({ openWishlist, isAccessPopupOpen, closeAccessPopup, openAccessPopup }),
    [isAccessPopupOpen]
  );

  return (
    <Provider store={store}>
      <ModalContext.Provider value={value}>
        {children}
        <Toaster />
        <WishList open={wishlistOpen} onOpenChange={setWishlistOpen} />

        {/* Render the popup once, globally */}
        <AccessPopup isOpen={isAccessPopupOpen} onClose={closeAccessPopup} />
      </ModalContext.Provider>
    </Provider>
  );
}
