"use client";

import { useEffect, useState } from "react";
import { getDictionaryEntry, DictEntry } from "@/lib/api";
import { pronounceWord } from "@/lib/speech";
import { saveWord, removeSavedWord } from "@/lib/savedWords";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import {
    FiVolume2,
    FiStar,
    FiLoader,
    FiChevronDown,
    FiChevronUp,
} from "react-icons/fi";

interface Props {
    word: string;
    index: number;
    packColor: string;
    packBg: string;
    onToast?: (msg: string, type: "success" | "error") => void;
}

export default function ExamWordCard({
    word,
    index,
    packColor,
    packBg,
    onToast,
}: Props) {
    const { user } = useAuth();
    const [entry, setEntry] = useState<DictEntry | null>(null);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    // Check saved state
    useEffect(() => {
        if (!user) return;
        // Use word string as ID for exam words
        const wordId = word.charCodeAt(0) * 1000 + word.length;
        const ref = doc(db, "users", user.uid, "savedWords", String(wordId));
        getDoc(ref)
            .then((snap) => setSaved(snap.exists()))
            .catch(() => { });
    }, [user, word]);

    // Fetch dictionary entry when expanded
    useEffect(() => {
        if (!expanded || entry) return;
        setLoading(true);
        getDictionaryEntry(word)
            .then(setEntry)
            .finally(() => setLoading(false));
    }, [expanded, word, entry]);

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        // Create a pseudo Word object for saving
        const wordObj = {
            id: word.charCodeAt(0) * 1000 + word.length,
            word,
            meaning: entry?.definitions?.[0]?.definition ?? "",
            pronunciation: entry?.phonetic ?? "",
            level: "exam",
            sentence: entry?.definitions?.[0]?.example ?? "",
            synonyms: entry?.definitions?.[0]?.synonyms ?? [],
            partsOfSpeech: entry?.definitions?.[0]?.partOfSpeech ?? "",
        };
        try {
            if (saved) {
                await removeSavedWord(user.uid, wordObj.id);
                setSaved(false);
                onToast?.(`"${word}" removed from saved words`, "success");
            } else {
                await saveWord(user.uid, wordObj);
                setSaved(true);
                onToast?.(`"${word}" saved to your collection`, "success");
            }
        } catch {
            onToast?.("Something went wrong. Please try again.", "error");
        } finally {
            setSaving(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
            }}
            className="border rounded-2xl shadow-sm overflow-hidden"
        >
            {/* Header row — always visible */}
            <div
                className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:opacity-80 transition"
                onClick={() => setExpanded((v) => !v)}
            >
                {/* Number badge */}
                <span
                    style={{ backgroundColor: packBg, color: packColor }}
                    className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                >
                    {index + 1}
                </span>

                {/* Word */}
                <h3
                    style={{ color: "var(--text-primary)" }}
                    className="text-base font-bold flex-1"
                >
                    {word}
                </h3>

                {/* Actions */}
                <div
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={() =>
                            pronounceWord(word, entry?.audioUrl)
                        }
                        style={{ color: packColor }}
                        className="hover:opacity-70 transition p-1"
                        title="Pronounce"
                    >
                        <FiVolume2 size={18} />
                    </button>
                    {user && (
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            title={saved ? "Remove from saved" : "Save word"}
                            style={{
                                color: saved ? "#f59e0b" : "var(--text-muted)",
                            }}
                            className="hover:opacity-70 transition p-1"
                        >
                            <FiStar
                                size={18}
                                fill={saved ? "#f59e0b" : "none"}
                            />
                        </button>
                    )}
                </div>

                {/* Expand toggle */}
                <div style={{ color: "var(--text-muted)" }}>
                    {expanded ? (
                        <FiChevronUp size={18} />
                    ) : (
                        <FiChevronDown size={18} />
                    )}
                </div>
            </div>

            {/* Expanded content */}
            {expanded && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ borderColor: "var(--border-color)" }}
                    className="border-t px-5 py-4"
                >
                    {loading ? (
                        <div className="flex items-center gap-2 py-2">
                            <FiLoader
                                size={16}
                                style={{ color: "var(--accent)" }}
                                className="animate-spin"
                            />
                            <span
                                style={{ color: "var(--text-muted)" }}
                                className="text-sm"
                            >
                                Loading definition...
                            </span>
                        </div>
                    ) : !entry ? (
                        <p style={{ color: "var(--text-muted)" }} className="text-sm">
                            No dictionary entry found for this word.
                        </p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {/* Phonetic */}
                            {entry.phonetic && (
                                <p
                                    style={{ color: "var(--text-muted)" }}
                                    className="text-sm"
                                >
                                    {entry.phonetic}
                                </p>
                            )}

                            {/* Definitions */}
                            {entry.definitions.slice(0, 3).map((def, i) => (
                                <div key={i}>
                                    <span
                                        style={{
                                            backgroundColor: packBg,
                                            color: packColor,
                                        }}
                                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                                    >
                                        {def.partOfSpeech}
                                    </span>
                                    <p
                                        style={{ color: "var(--text-primary)" }}
                                        className="text-sm font-medium mt-1.5 leading-relaxed"
                                    >
                                        {def.definition}
                                    </p>
                                    {def.example && (
                                        <p
                                            style={{ color: "var(--text-muted)" }}
                                            className="text-xs italic mt-1"
                                        >
                                            &ldquo;{def.example}&rdquo;
                                        </p>
                                    )}
                                    {def.synonyms.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                            {def.synonyms.slice(0, 4).map((syn) => (
                                                <span
                                                    key={syn}
                                                    className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full"
                                                >
                                                    {syn}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
}