"use client";

import { motion } from "framer-motion";
import { Lesson } from "@/types/word";
import { useProfile } from "@/context/ProfileContext";
import { FiEdit3 } from "react-icons/fi";
import ScholarBadge from "@/components/shared/ScholarBadge";

interface Props {
    lessons: Lesson[];
    onSelect: (levelNo: number, lessonName: string) => void;
}

const scholarBadgeMap: Record<number, "IELTS" | "TOEFL" | "Advanced"> = {
    5: "Advanced",
    6: "IELTS",
    7: "TOEFL",
};

export default function TypingLessonPicker({ lessons, onSelect }: Props) {
    const { themeTier } = useProfile();

    return (
        <div>
            <div className="text-center mb-10">
                <h2
                    style={{ color: "var(--text-primary)" }}
                    className="text-2xl font-bold mb-2"
                >
                    {themeTier === "kids"
                        ? "Spell the words!"
                        : "Type the word from memory"}
                </h2>
                <p style={{ color: "var(--text-secondary)" }} className="text-sm">
                    {themeTier === "scholar"
                        ? "You see the meaning — type the correct word. 30 seconds per word."
                        : "Read the meaning and type the word. No peeking!"}
                </p>
            </div>

            {/* Difficulty notice */}
            <div
                style={{
                    backgroundColor: "var(--accent-soft)",
                    borderColor: "var(--accent)",
                }}
                className="border rounded-xl px-4 py-3 mb-8 flex items-center gap-3"
            >
                <FiEdit3 size={18} style={{ color: "var(--accent)" }} />
                <p style={{ color: "var(--accent)" }} className="text-sm font-medium">
                    Typing mode is harder than multiple choice — it builds stronger
                    memory. You have 30 seconds per word.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {lessons.map((lesson, i) => (
                    <motion.button
                        key={lesson.id}
                        onClick={() => onSelect(lesson.level_no, lesson.lessonName)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.06 }}
                        whileHover={{ y: -3, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            backgroundColor: "var(--bg-card)",
                            borderColor: "var(--border-color)",
                        }}
                        className="border rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition flex flex-col gap-3"
                    >
                        <div className="flex items-center justify-between">
                            <span
                                style={{
                                    backgroundColor: "var(--accent-soft)",
                                    color: "var(--accent)",
                                }}
                                className="text-xs font-bold px-2 py-0.5 rounded-full"
                            >
                                Lesson {lesson.level_no}
                            </span>
                            {themeTier === "scholar" &&
                                scholarBadgeMap[lesson.level_no] && (
                                    <ScholarBadge type={scholarBadgeMap[lesson.level_no]} />
                                )}
                        </div>

                        <h3
                            style={{ color: "var(--text-primary)" }}
                            className="text-lg font-bold"
                        >
                            {lesson.lessonName}
                        </h3>

                        <div
                            style={{ backgroundColor: "var(--accent)" }}
                            className="self-start flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
                        >
                            <FiEdit3 size={12} />
                            Start Typing
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}