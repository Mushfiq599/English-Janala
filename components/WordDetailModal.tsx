"use client";

import { useEffect } from "react";
import { Word } from "@/types/word";
import { pronounceWord } from "@/lib/speech";

interface Props {
  word: Word;
  onClose: () => void;
}

export default function WordDetailModal({ word, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div>
            <h2 className="text-2xl font-bold">{word.word}</h2>
            {word.pronunciation && (
              <p className="text-sm text-gray-400">/{word.pronunciation}/</p>
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
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Meaning</p>
          <p className="text-gray-700">{word.meaning}</p>
        </div>

        {/* Example sentence */}
        {word.sentence && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Example</p>
            <p className="text-gray-600 italic text-sm">&ldquo;{word.sentence}&rdquo;</p>
          </div>
        )}

        {/* Synonyms */}
        {word.synonyms && word.synonyms.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Synonyms</p>
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
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">When to use</p>
            <p className="text-gray-600 text-sm">{word.when_to_say}</p>
          </div>
        )}
      </div>
    </div>
  );
}