"use client";

import { useState, useEffect } from "react";
import { Lesson } from "@/types/word";
import WordSection from "@/components/WordSection";
import { useAuth } from "@/context/AuthContext";
import { getAllLessonsProgress } from "@/lib/progress";
import { motion } from "framer-motion";

interface Props {
  lessons: Lesson[];
}

export default function LessonGrid({ lessons }: Props) {
  const { user } = useAuth();
  const [activeLevelNo, setActiveLevelNo] = useState<number | null>(null);
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!user) return;
    const levelIds = lessons.map((l) => String(l.level_no));
    getAllLessonsProgress(user.uid, levelIds).then(setProgress);
  }, [user, lessons]);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
        {lessons.map((lesson, i) => {
          const seen = progress[String(lesson.level_no)] ?? 0;
          const isActive = activeLevelNo === lesson.level_no;

          return (
            <motion.button
              key={lesson.id}
              onClick={() => setActiveLevelNo(lesson.level_no)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`rounded-xl py-3 px-2 text-sm font-semibold transition border-2 flex flex-col items-center gap-1 ${
                isActive
                  ? "bg-sky-500 text-white border-sky-500 shadow-md"
                  : "bg-white border-sky-200 text-sky-600 hover:border-sky-400 hover:bg-sky-50"
              }`}
            >
              <span>{lesson.lessonName}</span>
              {user && seen > 0 && (
                <span
                  className={`text-xs font-normal px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-sky-100 text-sky-500"
                  }`}
                >
                  {seen} seen
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {activeLevelNo ? (
        <WordSection levelId={String(activeLevelNo)} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <span className="text-5xl mb-4">📖</span>
          <p
            style={{ color: "var(--text-primary)" }}
            className="text-lg font-medium"
          >
            Select a lesson to start learning
          </p>
          <p style={{ color: "var(--text-muted)" }} className="text-sm mt-1">
            Choose any lesson above to see its vocabulary words
          </p>
        </motion.div>
      )}
    </div>
  );
}