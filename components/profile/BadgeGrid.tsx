"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { getEarnedBadges, saveEarnedBadges } from "@/lib/userBadges";
import { getUserStats } from "@/lib/userStats";
import { getSavedWords } from "@/lib/savedWords";
import { getRecentQuizScores } from "@/lib/quizScores";
import { ALL_BADGES, checkEarnedBadges } from "@/lib/badges";
import BadgeIcon from "@/components/shared/BadgeIcon";
import { motion } from "framer-motion";

export default function BadgeGrid() {
    const { user } = useAuth();
    const { streak } = useProfile();
    const [earnedIds, setEarnedIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const compute = async () => {
            try {
                const [stats, savedWords, quizScores, previouslyEarned] =
                    await Promise.all([
                        getUserStats(user.uid),
                        getSavedWords(user.uid),
                        getRecentQuizScores(user.uid, 50),
                        getEarnedBadges(user.uid),
                    ]);

                const perfectQuizzes = quizScores.filter(
                    (q) => q.percentage === 100
                ).length;

                const newlyEarned = checkEarnedBadges({
                    savedWords: savedWords.length,
                    lessonsStarted: stats.lessonsCompleted,
                    totalLessons: stats.totalLessons,
                    streak,
                    quizzesCompleted: quizScores.length,
                    perfectQuizzes,
                    wordsSeen: stats.totalWordsSeen,
                });

                // Merge old and new — badges never go away
                const merged = Array.from(
                    new Set([...previouslyEarned, ...newlyEarned])
                );

                // Save if anything new was earned
                if (merged.length !== previouslyEarned.length) {
                    await saveEarnedBadges(user.uid, merged);
                }

                setEarnedIds(merged);
            } catch {
                setEarnedIds([]);
            } finally {
                setLoading(false);
            }
        };

        compute();
    }, [user, streak]);

    if (loading) {
        return (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div
                        key={i}
                        style={{ backgroundColor: "var(--border-color)" }}
                        className="h-24 rounded-2xl animate-pulse"
                    />
                ))}
            </div>
        );
    }

    const earnedCount = earnedIds.length;
    const totalCount = ALL_BADGES.length;

    return (
        <div>
            {/* Progress line */}
            <div className="flex items-center justify-between mb-4">
                <p style={{ color: "var(--text-muted)" }} className="text-sm">
                    {earnedCount} of {totalCount} badges earned
                </p>
                <div
                    style={{ backgroundColor: "var(--border-color)" }}
                    className="w-32 h-2 rounded-full overflow-hidden"
                >
                    <motion.div
                        style={{ backgroundColor: "var(--accent)" }}
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                            width: `${(earnedCount / totalCount) * 100}%`,
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    />
                </div>
            </div>

            {/* Badge grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {ALL_BADGES.map((badge, i) => {
                    const earned = earnedIds.includes(badge.id);
                    return (
                        <motion.div
                            key={badge.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.04 }}
                            title={`${badge.label} — ${badge.description}`}
                            style={{
                                backgroundColor: earned
                                    ? badge.bg
                                    : "var(--bg-page)",
                                borderColor: earned
                                    ? badge.color + "40"
                                    : "var(--border-color)",
                                opacity: earned ? 1 : 0.4,
                            }}
                            className="border-2 rounded-2xl p-3 flex flex-col items-center gap-2 text-center transition-all"
                        >
                            {/* Icon */}
                            <div
                                style={{
                                    backgroundColor: earned
                                        ? badge.color + "20"
                                        : "var(--border-color)",
                                    color: earned ? badge.color : "var(--text-muted)",
                                }}
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                            >
                                <BadgeIcon icon={badge.icon} size={18} />
                            </div>

                            {/* Label */}
                            <p
                                style={{
                                    color: earned
                                        ? "var(--text-primary)"
                                        : "var(--text-muted)",
                                }}
                                className="text-xs font-bold leading-tight"
                            >
                                {badge.label}
                            </p>

                            {/* Earned indicator */}
                            {earned && (
                                <div
                                    style={{ backgroundColor: badge.color }}
                                    className="w-1.5 h-1.5 rounded-full"
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}