"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiWifiOff, FiWifi } from "react-icons/fi";

export default function OfflineBanner() {
    const [isOnline, setIsOnline] = useState(true);
    const [showRestored, setShowRestored] = useState(false);

    useEffect(() => {
        const handleOffline = () => setIsOnline(false);
        const handleOnline = () => {
            setIsOnline(true);
            setShowRestored(true);
            setTimeout(() => setShowRestored(false), 3000);
        };

        window.addEventListener("offline", handleOffline);
        window.addEventListener("online", handleOnline);

        return () => {
            window.removeEventListener("offline", handleOffline);
            window.removeEventListener("online", handleOnline);
        };
    }, []);

    return (
        <AnimatePresence>
            {!isOnline && (
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white"
                    style={{ backgroundColor: "#ef4444" }}
                >
                    <FiWifiOff size={15} />
                    You are offline — some features may not be available
                </motion.div>
            )}

            {showRestored && isOnline && (
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white"
                    style={{ backgroundColor: "#22c55e" }}
                >
                    <FiWifi size={15} />
                    Connection restored
                </motion.div>
            )}
        </AnimatePresence>
    );
}