"use client";

import { X, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface DropboxTokenPopoverProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (token: string) => void;
    tokenSetTime: number | null;
}

export default function DropboxTokenPopover({
    isOpen,
    onClose,
    onSubmit,
    tokenSetTime,
}: DropboxTokenPopoverProps) {
    const [token, setToken] = useState("");
    const [showToken, setShowToken] = useState(false);

    const handleSubmit = () => {
        if (token.trim()) {
            onSubmit(token);
            setToken("");
        }
    };

    const formatTimeSince = (timestamp: number) => {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        return `${hours}h ago`;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50"
                >
                    {/* Header */}
                    <div className="p-4 border-b flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-gray-900">Dropbox Access Token</h3>
                            {tokenSetTime && (
                                <p className="text-xs text-green-600 mt-1">
                                    ✓ Token set {formatTimeSince(tokenSetTime)}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-gray-900 block mb-2">
                                Access Token
                            </label>
                            <div className="relative">
                                <input
                                    type={showToken ? "text" : "password"}
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    placeholder="Enter your Dropbox token..."
                                    className="w-full p-3 pr-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 focus:outline-none transition-colors"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleSubmit();
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowToken(!showToken)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showToken ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-xs text-blue-800 leading-relaxed">
                                <strong>Note:</strong> Your token is required to upload PDFs to Dropbox for
                                processing. Get your token from{" "}
                                <a
                                    href="https://www.dropbox.com/developers/apps"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-blue-600"
                                >
                                    Dropbox App Console
                                </a>
                                .
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t flex justify-end gap-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!token.trim()}
                            className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Submit Token
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}