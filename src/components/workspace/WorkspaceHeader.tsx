"use client";

import { KeyRound } from "lucide-react";
import DropboxTokenPopover from "./DropBoxPopover";
import Image from "next/image";
import TooltipButton from "./TooltipButton";

interface WorkspaceHeaderProps {
    isHomePage: boolean;
    showTokenPopover: boolean;
    tokenSetTime: number | null;
    handleTokenSubmit: (token: string) => void;
    handleCloseTokenPopover: () => void;
    handleOpenTokenPopover: () => void;
}

export default function WorkspaceHeader({
    isHomePage,
    showTokenPopover,
    tokenSetTime,
    handleTokenSubmit,
    handleCloseTokenPopover,
    handleOpenTokenPopover,
}: WorkspaceHeaderProps) {
    return (
        <div className="flex-shrink-0 px-12 pt-4 pb-2 flex justify-between items-center">
            <a href="/" className="flex items-center">
                <Image
                    src={isHomePage ? "/logofinal.png" : "/LogoBlack.png"}
                    alt="logo"
                    width={isHomePage ? 180 : 120}
                    height={42}
                    style={{ height: "42px", width: isHomePage ? "180px" : "120px" }}
                />
            </a>

            {/* --- Token Button & Popover --- */}
            <div className="relative">
                <TooltipButton onClick={handleOpenTokenPopover} tooltipText="Dropbox Token" icon={<KeyRound className="w-5 h-5" />} className="bg-gray-100 text-black hover:bg-gray-200" />
                <DropboxTokenPopover
                    isOpen={showTokenPopover}
                    onClose={handleCloseTokenPopover}
                    onSubmit={handleTokenSubmit}
                    tokenSetTime={tokenSetTime}
                />
            </div>
        </div>
    );
}