"use client";

import { useState, useEffect } from "react";
import { Lesson } from "@/types/word";
import WordSection from "@/components/WordSection";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { getAllLessonsProgress } from "@/lib/progress";
import LessonPinButton from "@/components/lesson/LessonPinButton";
import ScholarBadge from "@/components/shared/ScholarBadge";
import { motion } from "framer-motion";
import { FiBookOpen, FiArrowLeft } from "react-icons/fi";

interface Props {
  lessons: Lesson[];
}

const scholarBadgeMap: Record<number, "IELTS" | "TOEFL" | "Advanced"> = {
  5: "Advanced",
  6: "IELTS",
  7: "TOEFL",
};

export default function LessonGrid({ lessons }: Props) {
  const { user } = useAuth();
  const { themeTier } = useProfile();
  const [activeLevelNo, setActiveLevelNo] = useState<number | null>(null);
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!user) return;
    const levelIds = lessons.map((l) => String(l.level_no));
    getAllLessonsProgress(user.uid, levelIds).then(setProgress);
  }, [user, lessons]);

  const isKidsOrTeen = themeTier === "kids" || themeTier === "teen";

  return (
    <div>
      {/* Section hint for kids */}
      {themeTier === "kids" && !activeLevelNo && (
        <div className="text-center mb-8">
          <p
            style={{ color: "var(--text-secondary)" }}
            className="text-base font-medium"
          >
            Pick a location on the map to start your adventure!
          </p>
        </div>
      )}

      {/* Lesson buttons — only shown when no lesson is active */}
      {!activeLevelNo && (
        <div
          style={
            themeTier === "kids"
              ? {
                  backgroundColor: "#fef9c3",
                  borderColor: "#fde68a",
                  borderRadius: "1.5rem",
                  border: "2px dashed #fde68a",
                }
              : themeTier === "teen"
              ? {
                  backgroundColor: "#0f172a",
                  borderRadius: "1rem",
                }
              : {}
          }
          className={`${isKidsOrTeen ? "p-6 mb-10" : "mb-10"}`}
        >
          <div
            className={`grid gap-4 ${
              isKidsOrTeen
                ? "grid-cols-3 sm:grid-cols-4 md:grid-cols-7"
                : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7"
            }`}
          >
            {lessons.map((lesson, i) => {
              const seen = progress[String(lesson.level_no)] ?? 0;

              return (
                <div
                  key={lesson.id}
                  className="flex flex-col items-center gap-1"
                >
                  <LessonPinButton
                    label={lesson.lessonName}
                    seen={seen}
                    isActive={activeLevelNo === lesson.level_no}
                    onClick={() => setActiveLevelNo(lesson.level_no)}
                    tier={themeTier}
                    index={i}
                  />
                  {themeTier === "scholar" &&
                    scholarBadgeMap[lesson.level_no] && (
                      <ScholarBadge type={scholarBadgeMap[lesson.level_no]} />
                    )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Word section */}
      {activeLevelNo ? (
        <div>
          {/* Back button */}
          <button
            onClick={() => setActiveLevelNo(null)}
            style={{
              color: "var(--text-secondary)",
              borderColor: "var(--border-color)",
            }}
            className="flex items-center gap-1.5 text-sm border px-3 py-1.5 rounded-lg hover:opacity-70 transition mb-6"
          >
            <FiArrowLeft size={14} />
            Back to lessons
          </button>
          <WordSection levelId={String(activeLevelNo)} />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center gap-4"
        >
          <FiBookOpen size={48} style={{ color: "var(--text-muted)" }} />
          <p
            style={{ color: "var(--text-primary)" }}
            className="text-lg font-medium"
          >
            {themeTier === "kids"
              ? "Pick a location on the map above!"
              : themeTier === "teen"
              ? "Select a lesson to start learning"
              : "Select a lesson to begin"}
          </p>
          <p style={{ color: "var(--text-muted)" }} className="text-sm">
            {themeTier === "scholar"
              ? "Advanced lessons 5–7 cover IELTS and TOEFL vocabulary"
              : "Each lesson has words, meanings, and pronunciation"}
          </p>
        </motion.div>
      )}
    </div>
  );
}