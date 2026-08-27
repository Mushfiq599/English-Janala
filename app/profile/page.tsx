"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { getUserStats, UserStats } from "@/lib/userStats";
import { updateLeaderboardEntry } from "@/lib/leaderboard";
import { createUserProfile, calculateAge } from "@/lib/userProfile";
import QuizHistory from "@/components/profile/QuizHistory";
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
    FiZap,
} from "react-icons/fi";

const tierLabels: Record<string, { label: string; color: string; bg: string }> =
{
    kids: { label: "Young Explorer", color: "#f59e0b", bg: "#fef9c3" },
    teen: { label: "Teen Explorer", color: "#06b6d4", bg: "#cffafe" },
    scholar: { label: "Scholar", color: "#0ea5e9", bg: "#f0f9ff" },
};

export default function ProfilePage() {
    const { user, loading: authLoading } = useAuth();
    const {
        profile,
        themeTier,
        loading: profileLoading,
        refreshProfile,
        streak,
    } = useProfile();
    const router = useRouter();

    const [stats, setStats] = useState<UserStats | null>(null);
    const [statsLoading, setStatsLoading] = useState(true);
    const [statsError, setStatsError] = useState(false);

    // Profile setup form state
    const [setupName, setSetupName] = useState("");
    const [setupDOB, setSetupDOB] = useState("");
    const [setupLoading, setSetupLoading] = useState(false);
    const [setupError, setSetupError] = useState("");

    const today = new Date().toISOString().split("T")[0];
    const minDate = new Date(
        new Date().setFullYear(new Date().getFullYear() - 100)
    )
        .toISOString()
        .split("T")[0];

    useEffect(() => {
        if (!authLoading && !user) router.push("/login");
    }, [user, authLoading, router]);

    // Load stats independently of profile
    useEffect(() => {
        if (!user) return;

        setStatsLoading(true);
        setStatsError(false);

        const timeout = setTimeout(() => {
            setStatsLoading(false);
            setStatsError(true);
        }, 10000);

        getUserStats(user.uid)
            .then(async (s) => {
                clearTimeout(timeout);
                setStats(s);
                if (profile) {
                    updateLeaderboardEntry(
                        user.uid,
                        profile.name,
                        s.totalWordsSeen,
                        s.lessonsCompleted,
                        themeTier
                    ).catch(() => { });
                }
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
    }, [user]);

    const handleSetup = async (e: React.FormEvent) => {
        e.preventDefault();
        setSetupError("");
        if (!setupName.trim()) {
            setSetupError("Please enter your name.");
            return;
        }
        if (!setupDOB) {
            setSetupError("Please enter your date of birth.");
            return;
        }
        const age = calculateAge(setupDOB);
        if (age < 5) {
            setSetupError("You must be at least 5 years old.");
            return;
        }
        if (!user) return;
        setSetupLoading(true);
        try {
            await createUserProfile(user.uid, setupName, user.email ?? "", setupDOB);
            await refreshProfile();
        } catch {
            setSetupError("Could not save profile. Please try again.");
        } finally {
            setSetupLoading(false);
        }
    };

    if (authLoading || profileLoading) {
        return (
            <main>
                <Header />
                <div className="flex justify-center items-center py-32">
                    <div
                        className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"
                        style={{
                            borderColor: "var(--accent)",
                            borderTopColor: "transparent",
                        }}
                    />
                </div>
            </main>
        );
    }

    // No profile document — show setup form
    if (!profile) {
        return (
            <main>
                <Header />
                <section className="w-11/12 max-w-md mx-auto py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            backgroundColor: "var(--bg-card)",
                            borderColor: "var(--border-color)",
                        }}
                        className="border rounded-2xl p-8 shadow-sm"
                    >
                        <div
                            style={{ backgroundColor: "var(--accent)", color: "#fff" }}
                            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6"
                        >
                            {user?.email?.charAt(0).toUpperCase() ?? "U"}
                        </div>
                        <h2
                            style={{ color: "var(--text-primary)" }}
                            className="text-xl font-bold text-center mb-1"
                        >
                            Complete your profile
                        </h2>
                        <p
                            style={{ color: "var(--text-muted)" }}
                            className="text-sm text-center mb-6"
                        >
                            We need a few details to personalize your experience
                        </p>

                        {setupError && (
                            <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
                                {setupError}
                            </div>
                        )}

                        <form onSubmit={handleSetup} className="space-y-4">
                            <div>
                                <label
                                    style={{ color: "var(--text-primary)" }}
                                    className="block text-sm font-medium mb-1"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={setupName}
                                    onChange={(e) => setSetupName(e.target.value)}
                                    placeholder="Your name"
                                    style={{
                                        backgroundColor: "var(--bg-page)",
                                        borderColor: "var(--border-color)",
                                        color: "var(--text-primary)",
                                    }}
                                    className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    style={{ color: "var(--text-primary)" }}
                                    className="block text-sm font-medium mb-1"
                                >
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    value={setupDOB}
                                    onChange={(e) => setSetupDOB(e.target.value)}
                                    min={minDate}
                                    max={today}
                                    style={{
                                        backgroundColor: "var(--bg-page)",
                                        borderColor: "var(--border-color)",
                                        color: "var(--text-primary)",
                                    }}
                                    className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                                    required
                                />
                                <p
                                    style={{ color: "var(--text-muted)" }}
                                    className="text-xs mt-1"
                                >
                                    Used to personalize your theme and learning experience
                                </p>
                            </div>
                            <button
                                type="submit"
                                disabled={setupLoading}
                                style={{ backgroundColor: "var(--accent)" }}
                                className="w-full text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition disabled:opacity-60"
                            >
                                {setupLoading ? "Saving..." : "Save Profile"}
                            </button>
                        </form>
                    </motion.div>
                </section>
                <SiteFooter />
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

                {/* Profile card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        backgroundColor: "var(--bg-card)",
                        borderColor: "var(--border-color)",
                    }}
                    className="border rounded-2xl p-8 mb-6 shadow-sm"
                >
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        {/* Avatar */}
                        <div
                            style={{ backgroundColor: "var(--accent)", color: "#fff" }}
                            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold flex-shrink-0"
                        >
                            {profile.name?.charAt(0).toUpperCase() ?? "U"}
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center sm:text-left">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                                <h1
                                    style={{ color: "var(--text-primary)" }}
                                    className="text-2xl font-bold"
                                >
                                    {profile.name}
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
                                    Age {profile.age}
                                </div>
                                <div
                                    style={{ color: "var(--text-secondary)" }}
                                    className="flex items-center gap-1.5 text-sm"
                                >
                                    <FiUser size={14} />
                                    Member since{" "}
                                    {profile.createdAt
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

                {/* Streak card */}
                {streak > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        style={{
                            backgroundColor: "#fef9c3",
                            borderColor: "#fde68a",
                        }}
                        className="border rounded-2xl p-5 mb-8 flex items-center gap-4"
                    >
                        <div
                            style={{ backgroundColor: "#f59e0b", color: "#fff" }}
                            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                        >
                            <FiZap size={28} />
                        </div>
                        <div>
                            <p
                                className="text-2xl font-bold"
                                style={{ color: "#92400e" }}
                            >
                                {streak} day{streak !== 1 ? "s" : ""} streak
                            </p>
                            <p className="text-sm" style={{ color: "#a16207" }}>
                                {streak === 1
                                    ? "You started a streak today! Come back tomorrow to keep it going."
                                    : streak >= 7
                                        ? "Incredible consistency! Keep it up."
                                        : "Great work! Visit a lesson every day to keep your streak alive."}
                            </p>
                        </div>
                    </motion.div>
                )}

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
                                <p
                                    style={{ color: "var(--text-secondary)" }}
                                    className="text-sm"
                                >
                                    Lessons started
                                </p>
                                <p
                                    style={{ color: "var(--accent)" }}
                                    className="text-sm font-bold"
                                >
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
                                        width: `${(stats.lessonsCompleted / stats.totalLessons) * 100
                                            }%`,
                                    }}
                                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                                />
                            </div>
                            <p
                                style={{ color: "var(--text-muted)" }}
                                className="text-xs mt-2"
                            >
                                {Math.round(
                                    (stats.lessonsCompleted / stats.totalLessons) * 100
                                )}
                                % of all lessons explored
                            </p>
                        </motion.div>
                    </>
                )}
                {/* Quiz history */}
                <h2
                    style={{ color: "var(--text-primary)" }}
                    className="text-lg font-bold mb-4 mt-10"
                >
                    Recent Quiz Results
                </h2>
                <QuizHistory />
            </section>
            <SiteFooter />
        </main>
    );
}