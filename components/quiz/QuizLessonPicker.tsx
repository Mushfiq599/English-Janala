"use client";

import { motion } from "framer-motion";
import { Lesson } from "@/types/word";
import { useProfile } from "@/context/ProfileContext";
import { FiPlay } from "react-icons/fi";
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

export default function QuizLessonPicker({ lessons, onSelect }: Props) {
    const { themeTier } = useProfile();

    return (
        <div>
            <div className="text-center mb-10">
                <h2
                    style={{ color: "var(--text-primary)" }}
                    className="text-2xl font-bold mb-2"
                >
                    {themeTier === "kids"
                        ? "Which adventure do you want to test?"
                        : themeTier === "teen"
                            ? "Pick a lesson to quiz yourself"
                            : "Select a lesson to begin your quiz"}
                </h2>
                <p style={{ color: "var(--text-secondary)" }} className="text-sm">
                    {themeTier === "scholar"
                        ? "You will get 10 multiple choice questions per lesson"
                        : "Answer questions and see how many you get right!"}
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
                            {themeTier === "scholar" && scholarBadgeMap[lesson.level_no] && (
                                <ScholarBadge type={scholarBadgeMap[lesson.level_no]} />
                            )}
                        </div>

                        <h3
                            style={{ color: "var(--text-primary)" }}
                            className="text-lg font-bold"
                        >
                            {lesson.lessonName}
                        </h3>

                        <div className="flex items-center gap-2 mt-auto">
                            <div
                                style={{ backgroundColor: "var(--accent)" }}
                                className="flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
                            >
                                <FiPlay size={12} />
                                Start Quiz
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}