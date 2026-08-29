"use client";

import { useState } from "react";
import { EXAM_PACKS, ExamPack } from "@/lib/examWords";
import Header from "@/components/Header";
import SiteFooter from "@/components/layout/Footer";
import ExamPackCard from "@/components/exam/ExamPackCard";
import ExamWordCard from "@/components/exam/ExamWordCard";
import Toast from "@/components/shared/Toast";
import { useToast } from "@/hooks/useToast";
import { motion } from "framer-motion";
import {
    FiArrowLeft,
    FiSearch,
    FiX,
} from "react-icons/fi";

export default function ExamPrepPage() {
    const [activePack, setActivePack] = useState<ExamPack | null>(null);
    const [search, setSearch] = useState("");
    const { toasts, addToast, removeToast } = useToast();

    const filteredWords = activePack
        ? activePack.words.filter((w) =>
            w.toLowerCase().includes(search.toLowerCase())
        )
        : [];

    return (
        <main>
            <Header />
            <section className="w-11/12 max-w-5xl mx-auto py-10">

                {!activePack ? (
                    <>
                        {/* Page header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-10"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div
                                    style={{
                                        backgroundColor: "#f5f3ff",
                                        color: "#8b5cf6",
                                    }}
                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black"
                                >
                                    E
                                </div>
                                <div>
                                    <h1
                                        style={{ color: "var(--text-primary)" }}
                                        className="text-2xl font-bold"
                                    >
                                        Exam Preparation
                                    </h1>
                                    <p
                                        style={{ color: "var(--text-secondary)" }}
                                        className="text-sm"
                                    >
                                        Curated vocabulary packs for IELTS, TOEFL, and Academic English
                                    </p>
                                </div>
                            </div>

                            {/* Info banner */}
                            <div
                                style={{
                                    backgroundColor: "#f5f3ff",
                                    borderColor: "#c4b5fd",
                                }}
                                className="border rounded-2xl px-5 py-4 mt-6"
                            >
                                <p className="text-sm font-semibold text-purple-700 mb-1">
                                    How to use these packs
                                </p>
                                <p className="text-sm text-purple-600 leading-relaxed">
                                    Click any word to expand its full definition, pronunciation,
                                    and example sentences from the dictionary. Save words to your
                                    collection, then quiz yourself using Quiz Mode or Flashcards.
                                    Work through all 4 packs for complete exam preparation.
                                </p>
                            </div>
                        </motion.div>

                        {/* Pack grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {EXAM_PACKS.map((pack, i) => (
                                <ExamPackCard
                                    key={pack.id}
                                    pack={pack}
                                    index={i}
                                    onSelect={setActivePack}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        {/* Pack header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <button
                                onClick={() => {
                                    setActivePack(null);
                                    setSearch("");
                                }}
                                style={{
                                    color: "var(--text-secondary)",
                                    borderColor: "var(--border-color)",
                                }}
                                className="flex items-center gap-1.5 text-sm border px-3 py-1.5 rounded-lg hover:opacity-70 transition mb-6"
                            >
                                <FiArrowLeft size={14} />
                                All Packs
                            </button>

                            <div className="flex items-start gap-4 mb-4">
                                <div
                                    style={{
                                        backgroundColor: activePack.bg,
                                        color: activePack.color,
                                    }}
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black flex-shrink-0"
                                >
                                    {activePack.words.length}
                                </div>
                                <div>
                                    <h1
                                        style={{ color: "var(--text-primary)" }}
                                        className="text-2xl font-bold"
                                    >
                                        {activePack.title}
                                    </h1>
                                    <p
                                        style={{ color: activePack.color }}
                                        className="text-sm font-semibold"
                                    >
                                        {activePack.subtitle}
                                    </p>
                                </div>
                            </div>

                            {/* Search within pack */}
                            <div
                                style={{
                                    backgroundColor: "var(--bg-card)",
                                    borderColor: "var(--border-color)",
                                }}
                                className="flex items-center gap-3 border-2 rounded-xl px-4 py-3"
                            >
                                <FiSearch
                                    size={16}
                                    style={{ color: "var(--text-muted)" }}
                                />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder={`Search in ${activePack.title}...`}
                                    style={{
                                        backgroundColor: "transparent",
                                        color: "var(--text-primary)",
                                    }}
                                    className="flex-1 text-sm outline-none placeholder:text-gray-400"
                                />
                                {search && (
                                    <button
                                        onClick={() => setSearch("")}
                                        style={{ color: "var(--text-muted)" }}
                                        className="hover:opacity-70 transition"
                                    >
                                        <FiX size={15} />
                                    </button>
                                )}
                            </div>

                            {/* Results count */}
                            <p
                                style={{ color: "var(--text-muted)" }}
                                className="text-sm mt-3"
                            >
                                {filteredWords.length} word
                                {filteredWords.length !== 1 ? "s" : ""}
                                {search ? ` matching "${search}"` : " in this pack"}
                            </p>
                        </motion.div>

                        {/* Word list */}
                        {filteredWords.length === 0 ? (
                            <div className="text-center py-16">
                                <p
                                    style={{ color: "var(--text-muted)" }}
                                    className="text-sm"
                                >
                                    No words match &ldquo;{search}&rdquo;
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {filteredWords.map((word, i) => (
                                    <ExamWordCard
                                        key={word}
                                        word={word}
                                        index={i}
                                        packColor={activePack.color}
                                        packBg={activePack.bg}
                                        onToast={addToast}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </section>

            <Toast toasts={toasts} onRemove={removeToast} />

            <SiteFooter />
        </main>
    );
}