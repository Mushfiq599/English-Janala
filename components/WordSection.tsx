"use client";

import { useEffect, useState } from "react";
import { Word } from "@/types/word";
import { getWordsByLevel } from "@/lib/api";
import WordCard from "@/components/WordCard";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { getSeenWordIds } from "@/lib/progress";

interface Props {
  levelId: string;
}

export default function WordSection({ levelId }: Props) {
  const { user } = useAuth();
  const [words, setWords] = useState<Word[]>([]);
  const [seenIds, setSeenIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    const fetchData = async () => {
      try {
        const [fetchedWords, fetchedSeenIds] = await Promise.all([
          getWordsByLevel(levelId),
          user ? getSeenWordIds(user.uid, levelId) : Promise.resolve([]),
        ]);
        setWords(fetchedWords);
        setSeenIds(fetchedSeenIds);
      } catch {
        setError("Failed to load words. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [levelId, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div
          className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center py-20 text-red-500 gap-3">
        <p>{error}</p>
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="flex flex-col items-center py-20">
        <p style={{ color: "var(--text-muted)" }}>
          No words found for this lesson.
        </p>
      </div>
    );
  }

  const newCount = words.filter((w) => !seenIds.includes(w.id)).length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <p style={{ color: "var(--text-muted)" }} className="text-sm">
          {words.length} words in this lesson
        </p>
        {user && newCount > 0 && (
          <span
            style={{ backgroundColor: "#22c55e", color: "#fff" }}
            className="text-xs font-bold px-2 py-0.5 rounded-full"
          >
            {newCount} new
          </span>
        )}
      </div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
      >
        {words.map((word) => (
          <motion.div
            key={word.id}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <WordCard
              word={word}
              levelId={levelId}
              isNew={!seenIds.includes(word.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}