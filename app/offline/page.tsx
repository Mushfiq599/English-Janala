"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiWifiOff, FiRefreshCw, FiBookOpen } from "react-icons/fi";

export default function OfflinePage() {
    return (
        <main
            style={{ backgroundColor: "var(--bg-page)" }}
            className="min-h-screen flex items-center justify-center px-4"
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-md"
            >
                <div
                    style={{
                        backgroundColor: "var(--accent-soft)",
                        color: "var(--accent)",
                    }}
                    className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8"
                >
                    <FiWifiOff size={40} />
                </div>

                <h1
                    style={{ color: "var(--text-primary)" }}
                    className="text-3xl font-bold mb-3"
                >
                    You are offline
                </h1>
                <p
                    style={{ color: "var(--text-secondary)" }}
                    className="text-base mb-8 leading-relaxed"
                >
                    No internet connection detected. Pages and lessons you have
                    visited before are still available — try navigating to a
                    lesson you have already opened.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => window.location.reload()}
                        style={{ backgroundColor: "var(--accent)" }}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-bold rounded-xl hover:opacity-90 transition"
                    >
                        <FiRefreshCw size={16} />
                        Try Again
                    </button>
                    <Link
                        href="/lesson"
                        style={{
                            borderColor: "var(--border-color)",
                            color: "var(--text-primary)",
                            backgroundColor: "var(--bg-card)",
                        }}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border font-bold rounded-xl hover:opacity-80 transition"
                    >
                        <FiBookOpen size={16} />
                        Go to Lessons
                    </Link>
                </div>

                <p
                    style={{ color: "var(--text-muted)" }}
                    className="text-xs mt-8"
                >
                    Tip: Previously visited lessons and word cards are cached and
                    work without internet.
                </p>
            </motion.div>
        </main>
    );
}