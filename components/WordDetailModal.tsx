"use client";

import { useEffect, useState } from "react";
import { Word } from "@/types/word";
import { pronounceWord } from "@/lib/speech";
import { getDictionaryEntry, DictEntry } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiVolume2, FiLoader } from "react-icons/fi";

interface Props {
  word: Word;
  onClose: () => void;
}

export default function WordDetailModal({ word, onClose }: Props) {
  const [dictEntry, setDictEntry] = useState<DictEntry | null>(null);
  const [dictLoading, setDictLoading] = useState(true);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    setDictLoading(true);
    getDictionaryEntry(word.word)
      .then(setDictEntry)
      .finally(() => setDictLoading(false));
  }, [word.word]);

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
          className="rounded-2xl shadow-xl w-full max-w-lg p-6 relative max-h-[85vh] overflow-y-auto"
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
            className="absolute top-4 right-4 hover:opacity-70 transition"
          >
            <FiX size={20} />
          </button>

          {/* Header */}
          <div className="flex items-start gap-3 mb-4 pr-8">
            <div className="flex-1">
              <h2 style={{ color: "var(--text-primary)" }} className="text-2xl font-bold">
                {word.word}
              </h2>
              {(dictEntry?.phonetic || word.pronunciation) && (
                <p style={{ color: "var(--text-muted)" }} className="text-sm mt-0.5">
                  {dictEntry?.phonetic ?? `/${word.pronunciation}/`}
                </p>
              )}
            </div>
            <button
              onClick={() => pronounceWord(word.word, dictEntry?.audioUrl)}
              style={{ color: "var(--accent)" }}
              className="hover:opacity-70 transition mt-1 flex-shrink-0"
            >
              <FiVolume2 size={24} />
            </button>
          </div>

          {/* Original meaning from lesson */}
          <div
            style={{
              backgroundColor: "var(--accent-soft)",
              borderColor: "var(--accent)",
            }}
            className="border-l-4 rounded-r-xl px-4 py-3 mb-5"
          >
            <p style={{ color: "var(--accent)" }} className="text-xs font-bold uppercase tracking-wider mb-1">
              Lesson Meaning
            </p>
            <p style={{ color: "var(--text-primary)" }} className="text-sm font-medium">
              {word.meaning}
            </p>
          </div>

          {/* Level + parts of speech badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {word.partsOfSpeech && (
              <span
                style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
                className="text-xs px-2 py-0.5 rounded-full font-medium"
              >
                {word.partsOfSpeech}
              </span>
            )}
            {word.level && (
              <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full font-medium">
                Level {word.level}
              </span>
            )}
          </div>

          {/* Original sentence */}
          {word.sentence && (
            <div className="mb-5">
              <p style={{ color: "var(--accent)" }} className="text-xs font-semibold uppercase tracking-wider mb-1">
                Example
              </p>
              <p style={{ color: "var(--text-muted)" }} className="italic text-sm">
                &ldquo;{word.sentence}&rdquo;
              </p>
            </div>
          )}

          {/* Original synonyms */}
          {word.synonyms && word.synonyms.length > 0 && (
            <div className="mb-5">
              <p style={{ color: "var(--accent)" }} className="text-xs font-semibold uppercase tracking-wider mb-2">
                Synonyms
              </p>
              <div className="flex flex-wrap gap-2">
                {word.synonyms.map((syn) => (
                  <span key={syn} className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full">
                    {syn}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* When to use */}
          {word.when_to_say && (
            <div className="mb-5">
              <p style={{ color: "var(--accent)" }} className="text-xs font-semibold uppercase tracking-wider mb-1">
                When to use
              </p>
              <p style={{ color: "var(--text-muted)" }} className="text-sm">
                {word.when_to_say}
              </p>
            </div>
          )}

          {/* Dictionary API section */}
          <div
            style={{ borderColor: "var(--border-color)" }}
            className="border-t pt-5 mt-2"
          >
            <p style={{ color: "var(--text-primary)" }} className="text-sm font-bold mb-4">
              Dictionary Definitions
            </p>

            {dictLoading ? (
              <div className="flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
                <FiLoader size={16} className="animate-spin" />
                <span className="text-sm">Loading definitions...</span>
              </div>
            ) : dictEntry && dictEntry.definitions.length > 0 ? (
              <div className="flex flex-col gap-4">
                {dictEntry.definitions.slice(0, 4).map((def, i) => (
                  <div key={i}>
                    <span
                      style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    >
                      {def.partOfSpeech}
                    </span>
                    <p style={{ color: "var(--text-secondary)" }} className="text-sm mt-1.5 leading-relaxed">
                      {def.definition}
                    </p>
                    {def.example && (
                      <p style={{ color: "var(--text-muted)" }} className="text-xs italic mt-1">
                        &ldquo;{def.example}&rdquo;
                      </p>
                    )}
                    {def.synonyms.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {def.synonyms.map((syn) => (
                          <span
                            key={syn}
                            className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full"
                          >
                            {syn}
                          </span>
                        ))}
                      </div>
                    )}
                    {def.antonyms.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {def.antonyms.map((ant) => (
                          <span
                            key={ant}
                            className="text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full"
                          >
                            {ant}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "var(--text-muted)" }} className="text-sm">
                No additional definitions found.
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}