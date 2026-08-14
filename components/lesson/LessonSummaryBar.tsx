"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getLessons } from "@/lib/api";
import { FiBookOpen, FiEye, FiStar, FiTrendingUp } from "react-icons/fi";
import { motion } from "framer-motion";

interface Summary {
    totalLessons: number;
    totalWordsSeen: number;
    lessonsStarted: number;
}

export default function LessonSummaryBar() {
    const { user } = useAuth();
    const { profile } = useProfile();
    const [summary, setSummary] = useState<Summary | null>(null);

    useEffect(() => {
        if (!user) return;

        const fetchSummary = async () => {
            try {
                const lessons = await getLessons();
                let totalWordsSeen = 0;
                let lessonsStarted = 0;

                await Promise.all(
                    lessons.map(async (lesson) => {
                        const colRef = collection(
                            db,
                            "users",
                            user.uid,
                            "progress",
                            String(lesson.level_no),
                            "seenWords"
                        );
                        const snap = await getDocs(colRef);
                        if (snap.docs.length > 0) {
                            totalWordsSeen += snap.docs.length;
                            lessonsStarted++;
                        }
                    })
                );

                setSummary({
                    totalLessons: lessons.length,
                    totalWordsSeen,
                    lessonsStarted,
                });
            } catch {
                setSummary(null);
            }
        };

        fetchSummary();
    }, [user]);

    // Not logged in — show static platform stats
    if (!user) {
        return (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                }}
                className="border rounded-2xl p-5 mb-8 grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
                {[
                    { icon: <FiBookOpen size={18} />, value: "7", label: "Lessons" },
                    { icon: <FiEye size={18} />, value: "1000+", label: "Vocabulary words" },
                    { icon: <FiTrendingUp size={18} />, value: "Free", label: "Forever" },
                ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div
                            style={{
                                backgroundColor: "var(--accent-soft)",
                                color: "var(--accent)",
                            }}
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        >
                            {stat.icon}
                        </div>
                        <div>
                            <p
                                style={{ color: "var(--text-primary)" }}
                                className="font-bold text-lg leading-none"
                            >
                                {stat.value}
                            </p>
                            <p
                                style={{ color: "var(--text-muted)" }}
                                className="text-xs mt-0.5"
                            >
                                {stat.label}
                            </p>
                        </div>
                    </div>
                ))}
            </motion.div>
        );
    }

    // Logged in but still loading
    if (!summary) {
        return (
            <div
                style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                }}
                className="border rounded-2xl p-5 mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
                {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div
                            style={{ backgroundColor: "var(--border-color)" }}
                            className="w-10 h-10 rounded-xl animate-pulse flex-shrink-0"
                        />
                        <div className="flex flex-col gap-1.5">
                            <div
                                style={{ backgroundColor: "var(--border-color)" }}
                                className="h-5 w-12 rounded animate-pulse"
                            />
                            <div
                                style={{ backgroundColor: "var(--border-color)" }}
                                className="h-3 w-20 rounded animate-pulse"
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    const percentage = Math.round(
        (summary.lessonsStarted / summary.totalLessons) * 100
    );

    const stats = [
        {
            icon: <FiBookOpen size={18} />,
            value: String(summary.totalLessons),
            label: "Total lessons",
            color: "#0ea5e9",
            bg: "#f0f9ff",
        },
        {
            icon: <FiEye size={18} />,
            value: String(summary.totalWordsSeen),
            label: "Words seen",
            color: "#22c55e",
            bg: "#f0fdf4",
        },
        {
            icon: <FiStar size={18} />,
            value: String(summary.lessonsStarted),
            label: "Lessons started",
            color: "#f59e0b",
            bg: "#fef9c3",
        },
        {
            icon: <FiTrendingUp size={18} />,
            value: `${percentage}%`,
            label: "Overall progress",
            color: "#8b5cf6",
            bg: "#f5f3ff",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
            }}
            className="border rounded-2xl p-5 mb-8"
        >
            {/* Greeting */}
            {profile?.name && (
                <p
                    style={{ color: "var(--text-muted)" }}
                    className="text-sm mb-4"
                >
                    Welcome back,{" "}
                    <span
                        style={{ color: "var(--text-primary)" }}
                        className="font-semibold"
                    >
                        {profile.name}
                    </span>
                    . Keep it up!
                </p>
            )}

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-center gap-3"
                    >
                        <div
                            style={{ backgroundColor: stat.bg, color: stat.color }}
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        >
                            {stat.icon}
                        </div>
                        <div>
                            <p
                                style={{ color: "var(--text-primary)" }}
                                className="font-bold text-lg leading-none"
                            >
                                {stat.value}
                            </p>
                            <p
                                style={{ color: "var(--text-muted)" }}
                                className="text-xs mt-0.5"
                            >
                                {stat.label}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Progress bar */}
            <div>
                <div className="flex items-center justify-between mb-1.5">
                    <p style={{ color: "var(--text-muted)" }} className="text-xs">
                        Overall lesson progress
                    </p>
                    <p style={{ color: "var(--accent)" }} className="text-xs font-bold">
                        {summary.lessonsStarted}/{summary.totalLessons} lessons
                    </p>
                </div>
                <div
                    style={{ backgroundColor: "var(--border-color)" }}
                    className="w-full h-2 rounded-full overflow-hidden"
                >
                    <motion.div
                        style={{ backgroundColor: "var(--accent)" }}
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    />
                </div>
            </div>
        </motion.div>
    );
}