"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Word } from "@/types/word";
import { pronounceWord } from "@/lib/speech";
import { FiVolume2, FiRotateCcw } from "react-icons/fi";

interface Props {
    word: Word;
    onGotIt: () => void;
    onReviewAgain: () => void;
    cardNumber: number;
    totalCards: number;
}

export default function FlipCard({
    word,
    onGotIt,
    onReviewAgain,
    cardNumber,
    totalCards,
}: Props) {
    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => setFlipped((prev) => !prev);

    const handleGotIt = () => {
        setFlipped(false);
        onGotIt();
    };

    const handleReviewAgain = () => {
        setFlipped(false);
        onReviewAgain();
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span
                        style={{ color: "var(--text-muted)" }}
                        className="text-sm font-medium"
                    >
                        Card {cardNumber} of {totalCards}
                    </span>
                    <span
                        style={{ color: "var(--accent)" }}
                        className="text-sm font-bold"
                    >
                        {Math.round(((cardNumber - 1) / totalCards) * 100)}%
                    </span>
                </div>
                <div
                    style={{ backgroundColor: "var(--border-color)" }}
                    className="w-full h-2 rounded-full overflow-hidden"
                >
                    <motion.div
                        style={{ backgroundColor: "var(--accent)" }}
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                            width: `${((cardNumber - 1) / totalCards) * 100}%`,
                        }}
                        transition={{ duration: 0.4 }}
                    />
                </div>
            </div>

            {/* Flip instruction */}
            <p
                style={{ color: "var(--text-muted)" }}
                className="text-center text-sm mb-4"
            >
                {flipped
                    ? "How well did you know this?"
                    : "Think of the meaning, then tap to reveal"}
            </p>

            {/* Card */}
            <div
                className="relative w-full cursor-pointer"
                style={{ perspective: "1200px", height: "280px" }}
                onClick={!flipped ? handleFlip : undefined}
            >
                <motion.div
                    className="relative w-full h-full"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    {/* Front — word */}
                    <div
                        style={{
                            backgroundColor: "var(--bg-card)",
                            borderColor: "var(--border-color)",
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                        }}
                        className="absolute inset-0 border-2 rounded-3xl p-8 flex flex-col items-center justify-center shadow-md"
                    >
                        <div className="text-center">
                            {word.partsOfSpeech && (
                                <span
                                    style={{
                                        backgroundColor: "var(--accent-soft)",
                                        color: "var(--accent)",
                                    }}
                                    className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-6"
                                >
                                    {word.partsOfSpeech}
                                </span>
                            )}
                            <h2
                                style={{ color: "var(--text-primary)" }}
                                className="text-5xl font-black tracking-tight mb-3"
                            >
                                {word.word}
                            </h2>
                            {word.pronunciation && (
                                <p
                                    style={{ color: "var(--text-muted)" }}
                                    className="text-lg mb-6"
                                >
                                    /{word.pronunciation}/
                                </p>
                            )}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    pronounceWord(word.word);
                                }}
                                style={{ color: "var(--accent)" }}
                                className="hover:opacity-70 transition"
                                title="Pronounce"
                            >
                                <FiVolume2 size={24} />
                            </button>
                        </div>

                        {/* Tap hint */}
                        <p
                            style={{ color: "var(--text-muted)" }}
                            className="absolute bottom-5 text-xs"
                        >
                            Tap to reveal meaning
                        </p>
                    </div>

                    {/* Back — meaning */}
                    <div
                        style={{
                            backgroundColor: "var(--bg-card)",
                            borderColor: "var(--accent)",
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                        }}
                        className="absolute inset-0 border-2 rounded-3xl p-8 flex flex-col items-center justify-center shadow-md"
                    >
                        <div className="text-center w-full">
                            <p
                                style={{ color: "var(--accent)" }}
                                className="text-xs font-bold uppercase tracking-widest mb-3"
                            >
                                Meaning
                            </p>
                            <p
                                style={{ color: "var(--text-primary)" }}
                                className="text-2xl font-bold leading-relaxed mb-4"
                            >
                                {word.meaning}
                            </p>

                            {word.sentence && (
                                <div
                                    style={{
                                        borderColor: "var(--accent)",
                                        backgroundColor: "var(--accent-soft)",
                                    }}
                                    className="border-l-4 pl-4 py-2 rounded-r-xl text-left mt-4"
                                >
                                    <p
                                        style={{ color: "var(--text-secondary)" }}
                                        className="text-sm italic"
                                    >
                                        &ldquo;{word.sentence}&rdquo;
                                    </p>
                                </div>
                            )}

                            {word.synonyms && word.synonyms.length > 0 && (
                                <div className="flex flex-wrap justify-center gap-2 mt-4">
                                    {word.synonyms.slice(0, 4).map((syn) => (
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

                        {/* Flip back */}
                        <button
                            onClick={handleFlip}
                            style={{ color: "var(--text-muted)" }}
                            className="absolute bottom-5 flex items-center gap-1.5 text-xs hover:opacity-70 transition"
                        >
                            <FiRotateCcw size={12} />
                            Flip back
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Action buttons — only show when flipped */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: flipped ? 1 : 0, y: flipped ? 0 : 10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 gap-4 mt-6"
                style={{ pointerEvents: flipped ? "auto" : "none" }}
            >
                <button
                    onClick={handleReviewAgain}
                    style={{
                        backgroundColor: "#fef2f2",
                        borderColor: "#fca5a5",
                        color: "#dc2626",
                    }}
                    className="border-2 rounded-xl px-6 py-3.5 font-bold text-sm hover:opacity-80 transition flex items-center justify-center gap-2"
                >
                    Review Again
                </button>
                <button
                    onClick={handleGotIt}
                    style={{
                        backgroundColor: "#f0fdf4",
                        borderColor: "#86efac",
                        color: "#15803d",
                    }}
                    className="border-2 rounded-xl px-6 py-3.5 font-bold text-sm hover:opacity-80 transition flex items-center justify-center gap-2"
                >
                    Got It
                </button>
            </motion.div>
        </div>
    );
}