"use client";

import { useEffect, useState } from "react";
import { Word } from "@/types/word";
import { pronounceWord } from "@/lib/speech";
import { saveWord, removeSavedWord } from "@/lib/savedWords";
import { markWordSeen } from "@/lib/progress";
import { useAuth } from "@/context/AuthContext";
import WordDetailModal from "@/components/WordDetailModal";

interface Props {
  word: Word;
  levelId: string;
}

export default function WordCard({ word, levelId }: Props) {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    markWordSeen(user.uid, levelId, word.id).catch(() => {});
  }, [user, levelId, word.id]);

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
      <div
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-color)",
        }}
        className="rounded-2xl shadow-sm border p-5 flex flex-col gap-3 hover:shadow-md transition"
      >
        {/* Word + pronounce */}
        <div className="flex items-start justify-between">
          <div>
            <h3
              style={{ color: "var(--text-primary)" }}
              className="text-lg font-bold"
            >
              {word.word}
            </h3>
            {word.pronunciation && (
              <p
                style={{ color: "var(--text-muted)" }}
                className="text-xs mt-0.5"
              >
                /{word.pronunciation}/
              </p>
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
        <p
          style={{ color: "var(--text-secondary)" }}
          className="text-sm leading-relaxed line-clamp-2"
        >
          {word.meaning}
        </p>

        {/* Parts of speech badge */}
        {word.partsOfSpeech && (
          <span className="self-start text-xs bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full font-medium">
            {word.partsOfSpeech}
          </span>
        )}

        {/* Actions */}
        <div
          style={{ borderColor: "var(--border-color)" }}
          className="flex items-center gap-2 mt-auto pt-2 border-t"
        >
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
        <WordDetailModal word={word} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}