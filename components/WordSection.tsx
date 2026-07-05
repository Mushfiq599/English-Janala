"use client";

import { useEffect, useState } from "react";
import { Word } from "@/types/word";
import { getWordsByLevel } from "@/lib/api";
import WordCard from "@/components/WordCard";

interface Props {
  levelId: string;
}

export default function WordSection({ levelId }: Props) {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    getWordsByLevel(levelId)
      .then(setWords)
      .catch(() => setError("Failed to load words. Please try again."))
      .finally(() => setLoading(false));
  }, [levelId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-sky-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center py-20 text-red-500 gap-3">
        <span className="text-4xl">⚠️</span>
        <p>{error}</p>
        <button
          onClick={() => setLoading(true)}
          className="text-sm px-4 py-2 bg-red-50 hover:bg-red-100 rounded-lg transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="flex flex-col items-center py-20 text-gray-400">
        <span className="text-4xl mb-3">🔍</span>
        <p>No words found for this lesson.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-6">
        {words.length} words in this lesson
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {words.map((word) => (
          <WordCard key={word.id} word={word} />
        ))}
      </div>
    </div>
  );
}