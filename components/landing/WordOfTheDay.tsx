"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getWordOfTheDay, WordOfTheDay } from "@/lib/wordOfTheDay";
import { pronounceWord } from "@/lib/speech";
import WordDetailModal from "@/components/WordDetailModal";
import {
    FiVolume2,
    FiBookOpen,
    FiCalendar,
    FiLoader,
} from "react-icons/fi";

export default function WordOfTheDaySection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [data, setData] = useState<WordOfTheDay | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        getWordOfTheDay()
            .then(setData)
            .finally(() => setLoading(false));
    }, []);

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
    });

    return (
        <section
            style={{ backgroundColor: "var(--bg-card)" }}
            className="py-24"
            ref={ref}
        >
            <div className="w-11/12 max-w-6xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <span
                        style={{
                            color: "var(--accent)",
                            backgroundColor: "var(--accent-soft)",
                        }}
                        className="text-sm font-semibold px-4 py-1.5 rounded-full"
                    >
                        Daily Learning
                    </span>
                    <h2
                        style={{ color: "var(--text-primary)" }}
                        className="text-3xl md:text-4xl font-bold mt-4 mb-2"
                    >
                        Word of the Day
                    </h2>
                    <div
                        style={{ color: "var(--text-muted)" }}
                        className="flex items-center justify-center gap-1.5 text-sm"
                    >
                        <FiCalendar size={14} />
                        {today}
                    </div>
                </motion.div>

                {/* Card */}
                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <FiLoader
                            size={32}
                            style={{ color: "var(--accent)" }}
                            className="animate-spin"
                        />
                    </div>
                ) : !data ? (
                    <div className="text-center py-16">
                        <p style={{ color: "var(--text-muted)" }} className="text-sm">
                            Could not load word of the day.
                        </p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div
                            style={{
                                backgroundColor: "var(--bg-page)",
                                borderColor: "var(--border-color)",
                            }}
                            className="border rounded-3xl p-8 md:p-10 shadow-sm"
                        >
                            <div className="flex flex-col md:flex-row md:items-start gap-8">
                                {/* Left — word block */}
                                <div className="flex-1">
                                    {/* Part of speech */}
                                    {data.partOfSpeech && (
                                        <span
                                            style={{
                                                backgroundColor: "var(--accent-soft)",
                                                color: "var(--accent)",
                                            }}
                                            className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
                                        >
                                            {data.partOfSpeech}
                                        </span>
                                    )}

                                    {/* Word + phonetic */}
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3
                                            style={{ color: "var(--text-primary)" }}
                                            className="text-4xl md:text-5xl font-black tracking-tight"
                                        >
                                            {data.word.word}
                                        </h3>
                                        <button
                                            onClick={() =>
                                                pronounceWord(data.word.word, data.audioUrl)
                                            }
                                            style={{ color: "var(--accent)" }}
                                            className="hover:opacity-70 transition mt-1"
                                            title="Pronounce"
                                        >
                                            <FiVolume2 size={26} />
                                        </button>
                                    </div>

                                    {data.phonetic && (
                                        <p
                                            style={{ color: "var(--text-muted)" }}
                                            className="text-base mb-6"
                                        >
                                            {data.phonetic}
                                        </p>
                                    )}

                                    {/* Definition */}
                                    <div className="mb-5">
                                        <p
                                            style={{ color: "var(--accent)" }}
                                            className="text-xs font-bold uppercase tracking-widest mb-2"
                                        >
                                            Definition
                                        </p>
                                        <p
                                            style={{ color: "var(--text-primary)" }}
                                            className="text-lg leading-relaxed font-medium"
                                        >
                                            {data.definition}
                                        </p>
                                    </div>

                                    {/* Example */}
                                    {data.example && (
                                        <div className="mb-6">
                                            <p
                                                style={{ color: "var(--accent)" }}
                                                className="text-xs font-bold uppercase tracking-widest mb-2"
                                            >
                                                Example
                                            </p>
                                            <p
                                                style={{
                                                    color: "var(--text-secondary)",
                                                    borderColor: "var(--accent)",
                                                    backgroundColor: "var(--accent-soft)",
                                                }}
                                                className="text-base italic border-l-4 pl-4 py-2 rounded-r-lg"
                                            >
                                                &ldquo;{data.example}&rdquo;
                                            </p>
                                        </div>
                                    )}

                                    {/* Lesson tag */}
                                    {data.word.level && (
                                        <div
                                            style={{ color: "var(--text-muted)" }}
                                            className="flex items-center gap-1.5 text-sm"
                                        >
                                            <FiBookOpen size={14} />
                                            Found in Lesson {data.word.level}
                                        </div>
                                    )}
                                </div>

                                {/* Right — action block */}
                                <div className="flex flex-col gap-3 md:w-48 flex-shrink-0">
                                    <button
                                        onClick={() => setModalOpen(true)}
                                        style={{ backgroundColor: "var(--accent)" }}
                                        className="w-full flex items-center justify-center gap-2 px-5 py-3 text-white text-sm font-bold rounded-xl hover:opacity-90 transition"
                                    >
                                        <FiBookOpen size={15} />
                                        Full Details
                                    </button>
                                    <button
                                        onClick={() =>
                                            pronounceWord(data.word.word, data.audioUrl)
                                        }
                                        style={{
                                            borderColor: "var(--border-color)",
                                            color: "var(--text-secondary)",
                                            backgroundColor: "var(--bg-card)",
                                        }}
                                        className="w-full flex items-center justify-center gap-2 px-5 py-3 border text-sm font-bold rounded-xl hover:opacity-80 transition"
                                    >
                                        <FiVolume2 size={15} />
                                        Pronounce
                                    </button>

                                    {/* Divider */}
                                    <div
                                        style={{ borderColor: "var(--border-color)" }}
                                        className="border-t my-1"
                                    />

                                    {/* Come back tomorrow nudge */}
                                    <div
                                        style={{
                                            backgroundColor: "var(--accent-soft)",
                                            borderColor: "var(--border-color)",
                                        }}
                                        className="border rounded-xl p-3 text-center"
                                    >
                                        <p
                                            style={{ color: "var(--accent)" }}
                                            className="text-xs font-semibold leading-snug"
                                        >
                                            A new word appears every day. Come back tomorrow!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Modal */}
            {modalOpen && data && (
                <WordDetailModal
                    word={data.word}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </section>
    );
}