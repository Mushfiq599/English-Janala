"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiX } from "react-icons/fi";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
    const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setPrompt(e as BeforeInstallPromptEvent);

            // Only show after user has visited a few times
            const visits = parseInt(
                localStorage.getItem("ej_visits") ?? "0"
            ) + 1;
            localStorage.setItem("ej_visits", String(visits));

            const dismissed = localStorage.getItem("ej_install_dismissed");
            if (visits >= 2 && !dismissed) {
                setTimeout(() => setVisible(true), 3000);
            }
        };

        window.addEventListener("beforeinstallprompt", handler);
        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstall = async () => {
        if (!prompt) return;
        await prompt.prompt();
        const { outcome } = await prompt.userChoice;
        if (outcome === "accepted") {
            setVisible(false);
        }
    };

    const handleDismiss = () => {
        setVisible(false);
        localStorage.setItem("ej_install_dismissed", "true");
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 80 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        backgroundColor: "var(--bg-card)",
                        borderColor: "var(--border-color)",
                    }}
                    className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 border rounded-2xl p-4 shadow-xl z-50"
                >
                    <button
                        onClick={handleDismiss}
                        style={{ color: "var(--text-muted)" }}
                        className="absolute top-3 right-3 hover:opacity-70 transition"
                    >
                        <FiX size={16} />
                    </button>

                    <div className="flex items-start gap-3 pr-6">
                        <div
                            style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        >
                            <FiDownload size={18} />
                        </div>
                        <div>
                            <p
                                style={{ color: "var(--text-primary)" }}
                                className="font-bold text-sm mb-0.5"
                            >
                                Install English Janala
                            </p>
                            <p
                                style={{ color: "var(--text-secondary)" }}
                                className="text-xs leading-snug mb-3"
                            >
                                Add to your home screen for faster access and offline learning.
                            </p>
                            <button
                                onClick={handleInstall}
                                style={{ backgroundColor: "var(--accent)" }}
                                className="text-white text-xs font-bold px-4 py-2 rounded-lg hover:opacity-90 transition"
                            >
                                Install App
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}