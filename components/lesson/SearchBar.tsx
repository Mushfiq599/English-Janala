"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { searchWords } from "@/lib/search";
import { Word } from "@/types/word";
import WordDetailModal from "@/components/WordDetailModal";
import { FiSearch, FiX, FiLoader } from "react-icons/fi";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Word[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedWord, setSelectedWord] = useState<Word | null>(null);
    const [focused, setFocused] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(async () => {
            try {
                const found = await searchWords(query);
                setResults(found.slice(0, 12));
            } catch {
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [query]);

    const clear = () => {
        setQuery("");
        setResults([]);
        inputRef.current?.focus();
    };

    return (
        <>
            <div className="relative w-full max-w-xl mb-8">
                {/* Input */}
                <div
                    style={{
                        backgroundColor: "var(--bg-card)",
                        borderColor: focused ? "var(--accent)" : "var(--border-color)",
                    }}
                    className="flex items-center gap-3 border-2 rounded-xl px-4 py-3 transition-all"
                >
                    {loading ? (
                        <FiLoader
                            size={18}
                            style={{ color: "var(--accent)" }}
                            className="animate-spin flex-shrink-0"
                        />
                    ) : (
                        <FiSearch
                            size={18}
                            style={{ color: "var(--text-muted)" }}
                            className="flex-shrink-0"
                        />
                    )}

                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setTimeout(() => setFocused(false), 200)}
                        placeholder="Search any word or meaning..."
                        style={{
                            backgroundColor: "transparent",
                            color: "var(--text-primary)",
                        }}
                        className="flex-1 text-sm outline-none placeholder:text-gray-400"
                    />

                    {query && (
                        <button
                            onClick={clear}
                            style={{ color: "var(--text-muted)" }}
                            className="hover:opacity-70 transition flex-shrink-0"
                        >
                            <FiX size={16} />
                        </button>
                    )}
                </div>

                {/* Dropdown results */}
                <AnimatePresence>
                    {(results.length > 0 || (query && !loading)) && focused && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                backgroundColor: "var(--bg-card)",
                                borderColor: "var(--border-color)",
                            }}
                            className="absolute top-full left-0 right-0 mt-2 border rounded-2xl shadow-xl z-40 overflow-hidden"
                        >
                            {results.length === 0 && query && !loading ? (
                                <div className="px-5 py-8 text-center">
                                    <FiSearch
                                        size={28}
                                        style={{ color: "var(--text-muted)" }}
                                        className="mx-auto mb-2"
                                    />
                                    <p
                                        style={{ color: "var(--text-muted)" }}
                                        className="text-sm"
                                    >
                                        No results for &ldquo;{query}&rdquo;
                                    </p>
                                </div>
                            ) : (
                                <div className="max-h-80 overflow-y-auto">
                                    <div
                                        style={{
                                            borderColor: "var(--border-color)",
                                            backgroundColor: "var(--accent-soft)",
                                        }}
                                        className="px-4 py-2 border-b"
                                    >
                                        <p
                                            style={{ color: "var(--accent)" }}
                                            className="text-xs font-bold"
                                        >
                                            {results.length} result{results.length !== 1 ? "s" : ""}{" "}
                                            for &ldquo;{query}&rdquo;
                                        </p>
                                    </div>

                                    {results.map((word, i) => (
                                        <motion.button
                                            key={word.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.03 }}
                                            onClick={() => {
                                                setSelectedWord(word);
                                                setFocused(false);
                                            }}
                                            style={{ borderColor: "var(--border-color)" }}
                                            className="w-full flex items-start gap-4 px-5 py-3.5 text-left border-b last:border-b-0 hover:opacity-80 transition"
                                        >
                                            {/* Word info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span
                                                        style={{ color: "var(--text-primary)" }}
                                                        className="font-bold text-sm"
                                                    >
                                                        {word.word}
                                                    </span>
                                                    {word.pronunciation && (
                                                        <span
                                                            style={{ color: "var(--text-muted)" }}
                                                            className="text-xs"
                                                        >
                                                            /{word.pronunciation}/
                                                        </span>
                                                    )}
                                                </div>
                                                <p
                                                    style={{ color: "var(--text-secondary)" }}
                                                    className="text-xs leading-snug line-clamp-1"
                                                >
                                                    {word.meaning}
                                                </p>
                                            </div>

                                            {/* Badges */}
                                            <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                                {word.partsOfSpeech && (
                                                    <span
                                                        style={{
                                                            backgroundColor: "var(--accent-soft)",
                                                            color: "var(--accent)",
                                                        }}
                                                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                                                    >
                                                        {word.partsOfSpeech}
                                                    </span>
                                                )}
                                                {word.level && (
                                                    <span
                                                        style={{ color: "var(--text-muted)" }}
                                                        className="text-xs"
                                                    >
                                                        Lesson {word.level}
                                                    </span>
                                                )}
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Word detail modal */}
            {selectedWord && (
                <WordDetailModal
                    word={selectedWord}
                    onClose={() => setSelectedWord(null)}
                />
            )}
        </>
    );
}