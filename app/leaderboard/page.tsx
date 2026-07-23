"use client";

import { useEffect, useState } from "react";
import { getLeaderboard, LeaderboardEntry } from "@/lib/leaderboard";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import SiteFooter from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { FiAward, FiBookOpen, FiTrendingUp } from "react-icons/fi";

const tierColors: Record<string, { color: string; bg: string; label: string }> = {
    kids: { color: "#f59e0b", bg: "#fef9c3", label: "Young Explorer" },
    teen: { color: "#06b6d4", bg: "#cffafe", label: "Teen Explorer" },
    scholar: { color: "#0ea5e9", bg: "#f0f9ff", label: "Scholar" },
};

type RankStyle = { color: string; bg: string; size: string };

const rankStyles: Record<number, RankStyle> = {
    1: { color: "#f59e0b", bg: "#fef9c3", size: "text-xl" },
    2: { color: "#94a3b8", bg: "#f1f5f9", size: "text-lg" },
    3: { color: "#f97316", bg: "#fff7ed", size: "text-lg" },
};

export default function LeaderboardPage() {
    const { user } = useAuth();
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLeaderboard(20)
            .then(setEntries)
            .finally(() => setLoading(false));
    }, []);

    return (
        <main>
            <Header />
            <section className="w-11/12 max-w-3xl mx-auto py-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <div
                        style={{
                            backgroundColor: "var(--accent-soft)",
                            color: "var(--accent)",
                        }}
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    >
                        <FiAward size={32} />
                    </div>
                    <h1
                        style={{ color: "var(--text-primary)" }}
                        className="text-3xl font-bold mb-2"
                    >
                        Leaderboard
                    </h1>
                    <p style={{ color: "var(--text-secondary)" }} className="text-sm">
                        Top learners ranked by words explored across all lessons
                    </p>
                </motion.div>

                {/* Top 3 podium */}
                {!loading && entries.length >= 3 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-3 gap-3 mb-8"
                    >
                        {[entries[1], entries[0], entries[2]].map((entry, i) => {
                            const rank = i === 0 ? 2 : i === 1 ? 1 : 3;
                            const style = rankStyles[rank];
                            const tier = tierColors[entry.themeTier];

                            return (
                                <motion.div
                                    key={entry.uid}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                    style={{
                                        backgroundColor: "var(--bg-card)",
                                        borderColor: style.color,
                                    }}
                                    className={`border-2 rounded-2xl p-4 text-center flex flex-col items-center gap-2 ${rank === 1 ? "py-6" : ""
                                        }`}
                                >
                                    <div
                                        style={{ backgroundColor: style.bg, color: style.color }}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${style.size}`}
                                    >
                                        {rank}
                                    </div>
                                    <div
                                        style={{ backgroundColor: style.color, color: "#fff" }}
                                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                                    >
                                        {entry.name.charAt(0).toUpperCase()}
                                    </div>
                                    <p
                                        style={{ color: "var(--text-primary)" }}
                                        className="font-bold text-sm truncate w-full text-center"
                                    >
                                        {entry.name}
                                    </p>
                                    <span
                                        style={{ backgroundColor: tier.bg, color: tier.color }}
                                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                                    >
                                        {tier.label}
                                    </span>
                                    <div
                                        style={{ color: "var(--accent)" }}
                                        className="flex items-center gap-1 text-sm font-bold"
                                    >
                                        <FiBookOpen size={12} />
                                        {entry.wordsLearned}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}

                {/* Full list */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        backgroundColor: "var(--bg-card)",
                        borderColor: "var(--border-color)",
                    }}
                    className="border rounded-2xl shadow-sm overflow-hidden"
                >
                    {/* Table header */}
                    <div
                        style={{
                            backgroundColor: "var(--accent-soft)",
                            borderColor: "var(--border-color)",
                        }}
                        className="grid grid-cols-12 gap-3 px-5 py-3 border-b text-xs font-bold uppercase tracking-wider"
                    >
                        <span style={{ color: "var(--accent)" }} className="col-span-1">
                            Rank
                        </span>
                        <span style={{ color: "var(--accent)" }} className="col-span-5">
                            Learner
                        </span>
                        <span style={{ color: "var(--accent)" }} className="col-span-3 text-center">
                            Words
                        </span>
                        <span style={{ color: "var(--accent)" }} className="col-span-3 text-center">
                            Lessons
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-16">
                            <div
                                className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
                                style={{
                                    borderColor: "var(--accent)",
                                    borderTopColor: "transparent",
                                }}
                            />
                        </div>
                    ) : entries.length === 0 ? (
                        <div className="flex flex-col items-center py-16 gap-3">
                            <FiTrendingUp size={40} style={{ color: "var(--text-muted)" }} />
                            <p style={{ color: "var(--text-muted)" }} className="text-sm font-medium">
                                No learners yet. Be the first!
                            </p>
                        </div>
                    ) : (
                        entries.map((entry, i) => {
                            const rank = i + 1;
                            const isMe = entry.uid === user?.uid;
                            const tier = tierColors[entry.themeTier];
                            const rankStyle = rankStyles[rank];

                            return (
                                <motion.div
                                    key={entry.uid}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 * i }}
                                    style={{
                                        backgroundColor: isMe ? "var(--accent-soft)" : "transparent",
                                        borderColor: "var(--border-color)",
                                    }}
                                    className="grid grid-cols-12 gap-3 px-5 py-4 border-b items-center last:border-b-0"
                                >
                                    {/* Rank */}
                                    <div className="col-span-1">
                                        {rankStyle ? (
                                            <span
                                                style={{
                                                    backgroundColor: rankStyle.bg,
                                                    color: rankStyle.color,
                                                }}
                                                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                                            >
                                                {rank}
                                            </span>
                                        ) : (
                                            <span
                                                style={{ color: "var(--text-muted)" }}
                                                className="text-sm font-medium pl-2"
                                            >
                                                {rank}
                                            </span>
                                        )}
                                    </div>

                                    {/* Name + tier */}
                                    <div className="col-span-5 flex items-center gap-3">
                                        <div
                                            style={{ backgroundColor: "var(--accent)", color: "#fff" }}
                                            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                                        >
                                            {entry.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p
                                                style={{ color: "var(--text-primary)" }}
                                                className="text-sm font-semibold"
                                            >
                                                {entry.name}
                                                {isMe && (
                                                    <span
                                                        style={{ color: "var(--accent)" }}
                                                        className="ml-2 text-xs font-bold"
                                                    >
                                                        (You)
                                                    </span>
                                                )}
                                            </p>
                                            <span
                                                style={{ backgroundColor: tier.bg, color: tier.color }}
                                                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                                            >
                                                {tier.label}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Words */}
                                    <div className="col-span-3 text-center">
                                        <span
                                            style={{ color: "var(--text-primary)" }}
                                            className="text-sm font-bold"
                                        >
                                            {entry.wordsLearned}
                                        </span>
                                    </div>

                                    {/* Lessons */}
                                    <div className="col-span-3 text-center">
                                        <span
                                            style={{ color: "var(--text-primary)" }}
                                            className="text-sm font-bold"
                                        >
                                            {entry.lessonsCompleted}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </motion.div>

                <p
                    style={{ color: "var(--text-muted)" }}
                    className="text-xs text-center mt-6"
                >
                    Leaderboard updates when you visit your profile page
                </p>
            </section>
            <SiteFooter />
        </main>
    );
}