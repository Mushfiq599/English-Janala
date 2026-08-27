"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getRecentQuizScores, QuizScore } from "@/lib/quizScores";
import { motion } from "framer-motion";
import { FiTarget, FiClock, FiAward } from "react-icons/fi";

function getScoreColor(percentage: number): string {
    if (percentage >= 80) return "#22c55e";
    if (percentage >= 60) return "#f59e0b";
    return "#ef4444";
}

function getScoreLabel(percentage: number): string {
    if (percentage === 100) return "Perfect";
    if (percentage >= 80) return "Excellent";
    if (percentage >= 60) return "Good";
    return "Keep practising";
}

export default function QuizHistory() {
    const { user } = useAuth();
    const [scores, setScores] = useState<QuizScore[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        getRecentQuizScores(user.uid, 5)
            .then(setScores)
            .finally(() => setLoading(false));
    }, [user]);

    if (loading) {
        return (
            <div
                style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                }}
                className="border rounded-2xl p-6 shadow-sm"
            >
                <div className="flex flex-col gap-3">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            style={{ backgroundColor: "var(--border-color)" }}
                            className="h-16 rounded-xl animate-pulse"
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (scores.length === 0) {
        return (
            <div
                style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                }}
                className="border rounded-2xl p-8 shadow-sm text-center"
            >
                <FiTarget
                    size={36}
                    style={{ color: "var(--text-muted)" }}
                    className="mx-auto mb-3"
                />
                <p
                    style={{ color: "var(--text-primary)" }}
                    className="font-semibold mb-1"
                >
                    No quizzes taken yet
                </p>
                <p style={{ color: "var(--text-muted)" }} className="text-sm">
                    Complete a quiz to see your results here
                </p>
            </div>
        );
    }

    return (
        <div
            style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
            }}
            className="border rounded-2xl shadow-sm overflow-hidden"
        >
            {scores.map((score, i) => {
                const color = getScoreColor(score.percentage);
                const label = getScoreLabel(score.percentage);
                const date = new Date(score.completedAt).toLocaleDateString(
                    "en-US",
                    {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    }
                );
                const time = new Date(score.completedAt).toLocaleTimeString(
                    "en-US",
                    {
                        hour: "2-digit",
                        minute: "2-digit",
                    }
                );

                return (
                    <motion.div
                        key={score.id ?? i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        style={{ borderColor: "var(--border-color)" }}
                        className="flex items-center gap-4 px-5 py-4 border-b last:border-b-0"
                    >
                        {/* Score circle */}
                        <div
                            style={{
                                backgroundColor: color + "15",
                                border: `2px solid ${color}`,
                                color: color,
                                minWidth: "3.5rem",
                                minHeight: "3.5rem",
                            }}
                            className="w-14 h-14 rounded-full flex flex-col items-center justify-center flex-shrink-0"
                        >
                            <span className="text-base font-black leading-none">
                                {score.score}/{score.total}
                            </span>
                            <span className="text-xs font-bold leading-none mt-0.5">
                                {score.percentage}%
                            </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <p
                                style={{ color: "var(--text-primary)" }}
                                className="font-bold text-sm truncate"
                            >
                                {score.lessonName}
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                                <span
                                    style={{
                                        backgroundColor: color + "15",
                                        color: color,
                                    }}
                                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                                >
                                    {label}
                                </span>
                                <span
                                    style={{ color: "var(--text-muted)" }}
                                    className="text-xs flex items-center gap-1"
                                >
                                    <FiClock size={10} />
                                    {date} at {time}
                                </span>
                            </div>
                        </div>

                        {/* Award icon for perfect scores */}
                        {score.percentage === 100 && (
                            <FiAward
                                size={22}
                                style={{ color: "#f59e0b" }}
                                className="flex-shrink-0"
                            />
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}