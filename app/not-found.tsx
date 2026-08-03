"use client";

import Link from "next/link";
import Header from "@/components/Header";
import SiteFooter from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { FiHome, FiBookOpen } from "react-icons/fi";

export default function NotFound() {
    return (
        <main>
            <Header />
            <section className="w-11/12 max-w-lg mx-auto py-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div
                        style={{ color: "var(--accent)", backgroundColor: "var(--accent-soft)" }}
                        className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8"
                    >
                        <span className="text-5xl font-black">404</span>
                    </div>

                    <h1
                        style={{ color: "var(--text-primary)" }}
                        className="text-3xl font-bold mb-3"
                    >
                        Page not found
                    </h1>
                    <p
                        style={{ color: "var(--text-secondary)" }}
                        className="text-base mb-10 leading-relaxed"
                    >
                        The page you are looking for does not exist or has been moved.
                        Let us get you back on track.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/"
                            style={{ backgroundColor: "var(--accent)" }}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-bold rounded-xl hover:opacity-90 transition"
                        >
                            <FiHome size={16} />
                            Go Home
                        </Link>
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
                            Browse Lessons
                        </Link>
                    </div>
                </motion.div>
            </section>
            <SiteFooter />
        </main>
    );
}