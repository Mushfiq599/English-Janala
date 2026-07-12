"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getSavedWords, removeSavedWord } from "@/lib/savedWords";
import { Word } from "@/types/word";
import Header from "@/components/Header";
import { pronounceWord } from "@/lib/speech";
import WordDetailModal from "@/components/WordDetailModal";

export default function SavedPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [words, setWords] = useState<Word[]>([]);
  const [fetching, setFetching] = useState(true);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    getSavedWords(user.uid)
      .then(setWords)
      .finally(() => setFetching(false));
  }, [user]);

  const handleRemove = async (wordId: number) => {
    if (!user) return;
    await removeSavedWord(user.uid, wordId);
    setWords((prev) => prev.filter((w) => w.id !== wordId));
  };

  if (loading || fetching) {
    return (
      <main>
        <Header />
        <div className="flex justify-center items-center py-32">
          <div className="w-10 h-10 border-4 border-sky-400 border-t-transparent rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  return (
    <main>
      <Header />
      <section className="w-11/12 mx-auto py-10">
        <div className="flex items-center justify-between mb-2">
          <h2
            style={{ color: "var(--text-primary)" }}
            className="text-2xl font-bold"
          >
            Saved Words
          </h2>
          <span style={{ color: "var(--text-muted)" }} className="text-sm">
            {words.length} words saved
          </span>
        </div>
        <p style={{ color: "var(--text-secondary)" }} className="text-sm mb-8">
          Your personal vocabulary list — words you saved across all lessons
        </p>

        {words.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <span className="text-6xl mb-4">⭐</span>
            <p
              style={{ color: "var(--text-primary)" }}
              className="text-lg font-medium"
            >
              No saved words yet
            </p>
            <p
              style={{ color: "var(--text-muted)" }}
              className="text-sm mt-1 mb-6"
            >
              Go to a lesson and tap ☆ on any word to save it here
            </p>
            <button
              onClick={() => router.push("/lesson")}
              className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg transition"
            >
              Browse Lessons
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {words.map((word) => (
              <div
                key={word.id}
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
                    onClick={() => setSelectedWord(word)}
                    className="flex-1 text-sm font-medium py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-600 transition"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleRemove(word.id)}
                    title="Remove from saved"
                    className="px-3 py-1.5 rounded-lg text-sm bg-red-50 text-red-400 hover:bg-red-100 transition"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {selectedWord && (
        <WordDetailModal
          word={selectedWord}
          onClose={() => setSelectedWord(null)}
        />
      )}
    </main>
  );
}