"use client";

import { useState } from "react";
import { Word } from "@/types/word";
import { pronounceWord } from "@/lib/speech";
import { saveWord, removeSavedWord } from "@/lib/savedWords";
import { useAuth } from "@/context/AuthContext";
import WordDetailModal from "@/components/WordDetailModal";

interface Props {
  word: Word;
}

export default function WordCard({ word }: Props) {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      if (saved) {
        await removeSavedWord(user.uid, word.id);
        setSaved(false);
      } else {
        await saveWord(user.uid, word);
        setSaved(true);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3 hover:shadow-md transition">
        {/* Word + pronounce */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{word.word}</h3>
            {word.pronunciation && (
              <p className="text-xs text-gray-400 mt-0.5">/{word.pronunciation}/</p>
            )}
          </div>
          <button
            onClick={() => pronounceWord(word.word)}
            title="Pronounce"
            className="text-sky-400 hover:text-sky-600 transition text-xl"
          >
            🔊
          </button>
        </div>

        {/* Meaning */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
          {word.meaning}
        </p>

        {/* Parts of speech badge */}
        {word.partsOfSpeech && (
          <span className="self-start text-xs bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full font-medium">
            {word.partsOfSpeech}
          </span>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto pt-2 border-t border-gray-50">
          <button
            onClick={() => setModalOpen(true)}
            className="flex-1 text-sm font-medium py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-600 transition"
          >
            Details
          </button>
          {user && (
            <button
              onClick={handleSave}
              disabled={saving}
              title={saved ? "Remove from saved" : "Save word"}
              className={`px-3 py-1.5 rounded-lg text-sm transition ${
                saved
                  ? "bg-yellow-50 text-yellow-500 hover:bg-yellow-100"
                  : "bg-gray-50 text-gray-400 hover:bg-gray-100"
              }`}
            >
              {saved ? "★" : "☆"}
            </button>
          )}
        </div>
      </div>

      {modalOpen && (
        <WordDetailModal
          word={word}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}