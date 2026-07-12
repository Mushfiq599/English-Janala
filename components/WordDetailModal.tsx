"use client";

import { useEffect } from "react";
import { Word } from "@/types/word";
import { pronounceWord } from "@/lib/speech";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  word: Word;
  onClose: () => void;
}

export default function WordDetailModal({ word, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          style={{ backgroundColor: "var(--bg-card)" }}
          className="rounded-2xl shadow-xl w-full max-w-md p-6 relative"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            style={{ color: "var(--text-muted)" }}
            className="absolute top-4 right-4 hover:text-gray-600 text-xl"
          >
            ✕
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div>
              <h2
                style={{ color: "var(--text-primary)" }}
                className="text-2xl font-bold"
              >
                {word.word}
              </h2>
              {word.pronunciation && (
                <p style={{ color: "var(--text-muted)" }} className="text-sm">
                  /{word.pronunciation}/
                </p>
              )}
            </div>
            <button
              onClick={() => pronounceWord(word.word)}
              className="ml-auto text-2xl text-sky-400 hover:text-sky-600 transition"
            >
              🔊
            </button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {word.partsOfSpeech && (
              <span className="text-xs bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full font-medium">
                {word.partsOfSpeech}
              </span>
            )}
            {word.level && (
              <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full font-medium">
                Level {word.level}
              </span>
            )}
          </div>

          {/* Meaning */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
              Meaning
            </p>
            <p style={{ color: "var(--text-secondary)" }} className="text-sm">
              {word.meaning}
            </p>
          </div>

          {/* Example sentence */}
          {word.sentence && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
                Example
              </p>
              <p
                style={{ color: "var(--text-muted)" }}
                className="italic text-sm"
              >
                &ldquo;{word.sentence}&rdquo;
              </p>
            </div>
          )}

          {/* Synonyms */}
          {word.synonyms && word.synonyms.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-2">
                Synonyms
              </p>
              <div className="flex flex-wrap gap-2">
                {word.synonyms.map((syn) => (
                  <span
                    key={syn}
                    className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full"
                  >
                    {syn}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* When to say */}
          {word.when_to_say && (
            <div>
              <p className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
                When to use
              </p>
              <p style={{ color: "var(--text-muted)" }} className="text-sm">
                {word.when_to_say}
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}