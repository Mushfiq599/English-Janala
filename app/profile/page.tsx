"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { getUserStats, UserStats } from "@/lib/userStats";
import { updateLeaderboardEntry } from "@/lib/leaderboard";
import Header from "@/components/Header";
import SiteFooter from "@/components/layout/Footer";
import { motion } from "framer-motion";
import {
    FiBookOpen,
    FiStar,
    FiTrendingUp,
    FiAward,
    FiUser,
    FiMail,
    FiCalendar,
    FiAlertCircle,
} from "react-icons/fi";

const tierLabels: Record<string, { label: string; color: string; bg: string }> = {
    kids: { label: "Young Explorer", color: "#f59e0b", bg: "#fef9c3" },
    teen: { label: "Teen Explorer", color: "#06b6d4", bg: "#cffafe" },
    scholar: { label: "Scholar", color: "#0ea5e9", bg: "#f0f9ff" },
};

export default function ProfilePage() {
    const { user, loading: authLoading } = useAuth();
    const { profile, themeTier, loading: profileLoading } = useProfile();
    const router = useRouter();

    const [stats, setStats] = useState<UserStats | null>(null);
    const [statsLoading, setStatsLoading] = useState(true);
    const [statsError, setStatsError] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) router.push("/login");
    }, [user, authLoading, router]);

    useEffect(() => {
        if (!user || !profile) return;

        setStatsLoading(true);
        setStatsError(false);

        // 10 second timeout so page never hangs forever
        const timeout = setTimeout(() => {
            setStatsLoading(false);
            setStatsError(true);
        }, 10000);

        getUserStats(user.uid)
            .then(async (s) => {
                clearTimeout(timeout);
                setStats(s);
                // Update leaderboard in background — don't block UI
                updateLeaderboardEntry(
                    user.uid,
                    profile.name,
                    s.totalWordsSeen,
                    s.lessonsCompleted,
                    themeTier
                ).catch(() => { });
            })
            .catch(() => {
                clearTimeout(timeout);
                setStatsError(true);
            })
            .finally(() => {
                clearTimeout(timeout);
                setStatsLoading(false);
            });

        return () => clearTimeout(timeout);
    }, [user, profile, themeTier]);

    // Only block render on auth loading — not on stats
    if (authLoading || profileLoading) {
        return (
            <main>
                <Header />
                <div className="flex justify-center items-center py-32">
                    <div
                        className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"
                        style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
                    />
                </div>
            </main>
        );
    }

    const tier = tierLabels[themeTier];

    const statCards = [
        {
            icon: <FiBookOpen size={22} />,
            label: "Words Seen",
            value: stats?.totalWordsSeen ?? 0,
            color: "#0ea5e9",
            bg: "#f0f9ff",
        },
        {
            icon: <FiStar size={22} />,
            label: "Words Saved",
            value: stats?.totalSavedWords ?? 0,
            color: "#f59e0b",
            bg: "#fef9c3",
        },
        {
            icon: <FiTrendingUp size={22} />,
            label: "Lessons Started",
            value: stats?.lessonsCompleted ?? 0,
            color: "#22c55e",
            bg: "#f0fdf4",
        },
        {
            icon: <FiAward size={22} />,
            label: "Total Lessons",
            value: stats?.totalLessons ?? 0,
            color: "#8b5cf6",
            bg: "#f5f3ff",
        },
    ];

    return (
        <main>
            <Header />
            <section className="w-11/12 max-w-4xl mx-auto py-10">

                {/* Profile card — shows immediately, no stats needed */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        backgroundColor: "var(--bg-card)",
                        borderColor: "var(--border-color)",
                    }}
                    className="border rounded-2xl p-8 mb-8 shadow-sm"
                >
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        {/* Avatar */}
                        <div
                            style={{ backgroundColor: "var(--accent)", color: "#fff" }}
                            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold flex-shrink-0"
                        >
                            {profile?.name?.charAt(0).toUpperCase() ?? "U"}
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center sm:text-left">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                                <h1
                                    style={{ color: "var(--text-primary)" }}
                                    className="text-2xl font-bold"
                                >
                                    {profile?.name}
                                </h1>
                                <span
                                    style={{ backgroundColor: tier.bg, color: tier.color }}
                                    className="self-center text-xs font-bold px-3 py-1 rounded-full"
                                >
                                    {tier.label}
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-3">
                                <div
                                    style={{ color: "var(--text-secondary)" }}
                                    className="flex items-center gap-1.5 text-sm"
                                >
                                    <FiMail size={14} />
                                    {user?.email}
                                </div>
                                <div
                                    style={{ color: "var(--text-secondary)" }}
                                    className="flex items-center gap-1.5 text-sm"
                                >
                                    <FiCalendar size={14} />
                                    Age {profile?.age}
                                </div>
                                <div
                                    style={{ color: "var(--text-secondary)" }}
                                    className="flex items-center gap-1.5 text-sm"
                                >
                                    <FiUser size={14} />
                                    Member since{" "}
                                    {profile?.createdAt
                                        ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                                            month: "long",
                                            year: "numeric",
                                        })
                                        : "—"}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats section */}
                <h2
                    style={{ color: "var(--text-primary)" }}
                    className="text-lg font-bold mb-4"
                >
                    Your Learning Stats
                </h2>

                {statsError ? (
                    <div
                        style={{
                            backgroundColor: "var(--bg-card)",
                            borderColor: "var(--border-color)",
                        }}
                        className="border rounded-2xl p-8 mb-8 flex flex-col items-center gap-3 text-center"
                    >
                        <FiAlertCircle size={32} style={{ color: "var(--text-muted)" }} />
                        <p style={{ color: "var(--text-muted)" }} className="text-sm">
                            Could not load stats right now.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            style={{ backgroundColor: "var(--accent)" }}
                            className="text-sm text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                        >
                            Retry
                        </button>
                    </div>
                ) : statsLoading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                        {[0, 1, 2, 3].map((i) => (
                            <div
                                key={i}
                                style={{
                                    backgroundColor: "var(--bg-card)",
                                    borderColor: "var(--border-color)",
                                }}
                                className="border rounded-2xl p-5 shadow-sm"
                            >
                                <div
                                    style={{ backgroundColor: "var(--border-color)" }}
                                    className="w-12 h-12 rounded-xl mx-auto mb-3 animate-pulse"
                                />
                                <div
                                    style={{ backgroundColor: "var(--border-color)" }}
                                    className="h-6 w-12 rounded mx-auto mb-2 animate-pulse"
                                />
                                <div
                                    style={{ backgroundColor: "var(--border-color)" }}
                                    className="h-3 w-20 rounded mx-auto animate-pulse"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                        {statCards.map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.08 }}
                                style={{
                                    backgroundColor: "var(--bg-card)",
                                    borderColor: "var(--border-color)",
                                }}
                                className="border rounded-2xl p-5 shadow-sm text-center"
                            >
                                <div
                                    style={{ backgroundColor: card.bg, color: card.color }}
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                                >
                                    {card.icon}
                                </div>
                                <div
                                    style={{ color: "var(--text-primary)" }}
                                    className="text-2xl font-bold mb-1"
                                >
                                    {card.value}
                                </div>
                                <p
                                    style={{ color: "var(--text-muted)" }}
                                    className="text-xs font-medium"
                                >
                                    {card.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Lesson progress bar */}
                {!statsLoading && !statsError && stats && (
                    <>
                        <h2
                            style={{ color: "var(--text-primary)" }}
                            className="text-lg font-bold mb-4"
                        >
                            Lesson Progress
                        </h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            style={{
                                backgroundColor: "var(--bg-card)",
                                borderColor: "var(--border-color)",
                            }}
                            className="border rounded-2xl p-6 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <p style={{ color: "var(--text-secondary)" }} className="text-sm">
                                    Lessons started
                                </p>
                                <p style={{ color: "var(--accent)" }} className="text-sm font-bold">
                                    {stats.lessonsCompleted} / {stats.totalLessons}
                                </p>
                            </div>
                            <div
                                style={{ backgroundColor: "var(--border-color)" }}
                                className="w-full h-3 rounded-full overflow-hidden"
                            >
                                <motion.div
                                    style={{ backgroundColor: "var(--accent)" }}
                                    className="h-full rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: `${(stats.lessonsCompleted / stats.totalLessons) * 100}%`,
                                    }}
                                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                                />
                            </div>
                            <p style={{ color: "var(--text-muted)" }} className="text-xs mt-2">
                                {Math.round((stats.lessonsCompleted / stats.totalLessons) * 100)}% of all lessons explored
                            </p>
                        </motion.div>
                    </>
                )}
            </section>
            <SiteFooter />
        </main>
    );
}