"use client";

import { useState } from "react";
import { Lesson } from "@/types/word";
import WordSection from "@/components/WordSection";

interface Props {
  lessons: Lesson[];
}

export default function LessonGrid({ lessons }: Props) {
  const [activeLevelNo, setActiveLevelNo] = useState<number | null>(null);

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-10">
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => setActiveLevelNo(lesson.level_no)}
            className={`rounded-xl py-3 text-sm font-semibold transition border-2 ${
              activeLevelNo === lesson.level_no
                ? "bg-sky-500 text-white border-sky-500 shadow-md"
                : "bg-white border-sky-200 text-sky-600 hover:border-sky-400 hover:bg-sky-50"
            }`}
          >
            {lesson.lessonName}
          </button>
        ))}
      </div>

      {activeLevelNo ? (
        <WordSection levelId={String(activeLevelNo)} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
          <span className="text-5xl mb-4">📖</span>
          <p className="text-lg font-medium">Select a lesson to start learning</p>
          <p className="text-sm mt-1">Choose any lesson above to see its vocabulary words</p>
        </div>
      )}
    </div>
  );
}