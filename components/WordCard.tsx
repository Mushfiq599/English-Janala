"use client";

import { useEffect, useState } from "react";
import { Word } from "@/types/word";
import { pronounceWord } from "@/lib/speech";
import { saveWord, removeSavedWord } from "@/lib/savedWords";
import { markWordSeen } from "@/lib/progress";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { getDictionaryEntry } from "@/lib/api";
import WordDetailModal from "@/components/WordDetailModal";
import { FiVolume2, FiStar, FiInfo, FiLogIn } from "react-icons/fi";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Props {
  word: Word;
  levelId: string;
  isNew?: boolean;
  onToast?: (message: string, type: "success" | "error") => void;
}

export default function WordCard({
  word,
  levelId,
  isNew = false,
  onToast,
}: Props) {
  const { user } = useAuth();
  const { themeTier } = useProfile();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    if (!user) return;
    markWordSeen(user.uid, levelId, word.id).catch(() => {});
  }, [user, levelId, word.id]);

  // Check saved state
  useEffect(() => {
    if (!user) return;
    const ref = doc(
      db,
      "users",
      user.uid,
      "savedWords",
      String(word.id)
    );
    getDoc(ref)
      .then((snap) => setSaved(snap.exists()))
      .catch(() => {});
  }, [user, word.id]);

  // Fetch image for kids tier
  useEffect(() => {
    if (themeTier !== "kids") return;
    getDictionaryEntry(word.word)
      .then((entry) => {
        if (entry?.imageUrl) setImageUrl(entry.imageUrl);
      })
      .catch(() => {});
  }, [word.word, themeTier]);

  const handleSave = async () => {
    // Not logged in — show login prompt
    if (!user) {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000);
      return;
    }
    setSaving(true);
    try {
      if (saved) {
        await removeSavedWord(user.uid, word.id);
        setSaved(false);
        onToast?.(`"${word.word}" removed from saved words`, "success");
      } else {
        await saveWord(user.uid, word);
        setSaved(true);
        onToast?.(`"${word.word}" saved to your collection`, "success");
      }
    } catch {
      onToast?.("Something went wrong. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  const isKids = themeTier === "kids";

  return (
    <>
      <div
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: isKids
            ? "var(--accent)"
            : "var(--border-color)",
          borderRadius: isKids ? "1.5rem" : "1rem",
          borderWidth: isKids ? "2px" : "1px",
        }}
        className="shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition h-full relative"
      >
        {/* Kids image */}
        {isKids && imageUrl && (
          <div className="w-full h-28 rounded-xl overflow-hidden bg-amber-50 flex items-center justify-center">
            <img
              src={imageUrl}
              alt={word.word}
              className="w-full h-full object-cover"
              onError={() => setImageUrl(null)}
            />
          </div>
        )}

        {/* Kids placeholder when no image */}
        {isKids && !imageUrl && (
          <div
            style={{ backgroundColor: "var(--accent-soft)" }}
            className="w-full h-20 rounded-xl flex items-center justify-center"
          >
            <span
              style={{ color: "var(--accent)" }}
              className="text-4xl font-black opacity-30 select-none"
            >
              {word.word.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* New badge */}
        {isNew && user && (
          <div className="flex justify-end">
            <span
              style={{ backgroundColor: "#22c55e", color: "#fff" }}
              className="text-xs font-bold px-2 py-0.5 rounded-full"
            >
              New
            </span>
          </div>
        )}

        {/* Word + pronounce */}
        <div className="flex items-start justify-between">
          <div>
            <h3
              style={{ color: "var(--text-primary)" }}
              className={`font-bold ${isKids ? "text-xl" : "text-lg"}`}
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
            style={{ color: "var(--accent)" }}
            className="hover:opacity-70 transition p-1 flex-shrink-0"
          >
            <FiVolume2 size={isKids ? 24 : 20} />
          </button>
        </div>

        {/* Meaning */}
        <p
          style={{ color: "var(--text-secondary)" }}
          className={`leading-relaxed line-clamp-2 ${
            isKids ? "text-base" : "text-sm"
          }`}
        >
          {word.meaning}
        </p>

        {/* Parts of speech badge */}
        {word.partsOfSpeech && (
          <span
            style={{
              backgroundColor: "var(--accent-soft)",
              color: "var(--accent)",
            }}
            className="self-start text-xs px-2 py-0.5 rounded-full font-medium"
          >
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
            style={{
              backgroundColor: "var(--accent-soft)",
              color: "var(--accent)",
            }}
            className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium py-1.5 rounded-lg hover:opacity-80 transition"
          >
            <FiInfo size={14} />
            {isKids ? "What does it mean?" : "Details"}
          </button>

          {/* Save button — shows for everyone */}
          <div className="relative">
            <button
              onClick={handleSave}
              disabled={saving}
              title={
                user
                  ? saved
                    ? "Remove from saved"
                    : "Save word"
                  : "Log in to save words"
              }
              style={{
                backgroundColor: saved ? "#fef9c3" : "var(--bg-page)",
                color: saved ? "#f59e0b" : "var(--text-muted)",
              }}
              className="p-2 rounded-lg hover:opacity-80 transition"
            >
              <FiStar
                size={isKids ? 20 : 16}
                fill={saved ? "#f59e0b" : "none"}
              />
            </button>

            {/* Login prompt tooltip */}
            <AnimatePresence>
              {showLoginPrompt && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                  }}
                  className="absolute bottom-full right-0 mb-2 w-44 border rounded-xl shadow-xl p-3 z-50"
                >
                  {/* Arrow */}
                  <div
                    style={{
                      borderTopColor: "var(--border-color)",
                    }}
                    className="absolute -bottom-1.5 right-3 w-3 h-3 rotate-45 border-r border-b"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      borderColor: "var(--border-color)",
                    }}
                  />
                  <p
                    style={{ color: "var(--text-primary)" }}
                    className="text-xs font-semibold mb-2"
                  >
                    {isKids
                      ? "Log in to save words!"
                      : "Log in to save words"}
                  </p>
                  <Link
                    href="/login"
                    style={{ backgroundColor: "var(--accent)" }}
                    className="flex items-center justify-center gap-1.5 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition"
                  >
                    <FiLogIn size={12} />
                    Log In
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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