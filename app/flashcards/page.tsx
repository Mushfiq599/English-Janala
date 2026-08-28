"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getLessons, getWordsByLevel } from "@/lib/api";
import { Lesson, Word, Flashcard } from "@/types/word";
import Header from "@/components/Header";
import SiteFooter from "@/components/layout/Footer";
import FlashcardLessonPicker from "@/components/flashcard/FlashcardLessonPicker";
import FlipCard from "@/components/flashcard/FlipCard";
import FlashcardResults from "@/components/flashcard/FlashcardResults";
import { motion } from "framer-motion";

type Phase = "pick" | "study" | "results";

function shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
}

export default function FlashcardsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [phase, setPhase] = useState<Phase>("pick");
    const [cards, setCards] = useState<Flashcard[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeLessonName, setActiveLessonName] = useState("");
    const [loadingCards, setLoadingCards] = useState(false);
    const [gotIt, setGotIt] = useState<Word[]>([]);
    const [reviewAgain, setReviewAgain] = useState<Word[]>([]);

    useEffect(() => {
        if (!loading && !user) router.push("/login");
    }, [user, loading, router]);

    useEffect(() => {
        getLessons().then(setLessons);
    }, []);

    const startSession = async (
        levelNo: number,
        lessonName: string,
        wordsOverride?: Word[]
    ) => {
        setLoadingCards(true);
        setActiveLessonName(lessonName);
        try {
            const words = wordsOverride ?? (await getWordsByLevel(String(levelNo)));
            const shuffled = shuffle(words);
            setCards(
                shuffled.map((w) => ({ word: w, status: "unseen" }))
            );
            setCurrentIndex(0);
            setGotIt([]);
            setReviewAgain([]);
            setPhase("study");
        } finally {
            setLoadingCards(false);
        }
    };

    const handleGotIt = useCallback(() => {
        const current = cards[currentIndex];
        setGotIt((prev) => [...prev, current.word]);

        if (currentIndex + 1 >= cards.length) {
            setPhase("results");
        } else {
            setCurrentIndex((i) => i + 1);
        }
    }, [cards, currentIndex]);

    const handleReviewAgain = useCallback(() => {
        const current = cards[currentIndex];
        setReviewAgain((prev) => [...prev, current.word]);

        if (currentIndex + 1 >= cards.length) {
            setPhase("results");
        } else {
            setCurrentIndex((i) => i + 1);
        }
    }, [cards, currentIndex]);

    const handleReviewMissed = () => {
        const lesson = lessons.find(
            (l) => l.lessonName === activeLessonName
        );
        if (lesson) startSession(lesson.level_no, activeLessonName, reviewAgain);
    };

    const handleRestartAll = () => {
        const lesson = lessons.find(
            (l) => l.lessonName === activeLessonName
        );
        if (lesson) startSession(lesson.level_no, activeLessonName);
    };

    const handleBack = () => {
        setPhase("pick");
        setCards([]);
        setCurrentIndex(0);
        setGotIt([]);
        setReviewAgain([]);
    };

    if (loading) {
        return (
            <main>
                <Header />
                <div className="flex justify-center items-center py-32">
                    <div
                        className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"
                        style={{
                            borderColor: "var(--accent)",
                            borderTopColor: "transparent",
                        }}
                    />
                </div>
            </main>
        );
    }

    return (
        <main>
            <Header />
            <section className="w-11/12 max-w-4xl mx-auto py-10 min-h-screen">
                {/* Header bar */}
                {phase === "pick" && (
                    <div className="mb-10">
                        <h1
                            style={{ color: "var(--text-primary)" }}
                            className="text-2xl font-bold mb-2"
                        >
                            Flashcard Mode
                        </h1>
                        <p
                            style={{ color: "var(--text-secondary)" }}
                            className="text-sm"
                        >
                            Study at your own pace — flip cards to reveal meanings
                        </p>
                    </div>
                )}

                {phase === "study" && (
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1
                                style={{ color: "var(--text-primary)" }}
                                className="text-xl font-bold"
                            >
                                {activeLessonName}
                            </h1>
                            <p
                                style={{ color: "var(--text-muted)" }}
                                className="text-sm"
                            >
                                {gotIt.length} known · {reviewAgain.length} to review
                            </p>
                        </div>
                        <button
                            onClick={handleBack}
                            style={{
                                color: "var(--text-muted)",
                                borderColor: "var(--border-color)",
                            }}
                            className="text-sm border px-4 py-2 rounded-lg hover:opacity-70 transition"
                        >
                            Exit
                        </button>
                    </div>
                )}

                {/* Content */}
                {loadingCards ? (
                    <div className="flex justify-center items-center py-32">
                        <div
                            className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"
                            style={{
                                borderColor: "var(--accent)",
                                borderTopColor: "transparent",
                            }}
                        />
                    </div>
                ) : phase === "pick" ? (
                    <FlashcardLessonPicker
                        lessons={lessons}
                        onSelect={startSession}
                    />
                ) : phase === "study" && cards.length > 0 ? (
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FlipCard
                            word={cards[currentIndex].word}
                            onGotIt={handleGotIt}
                            onReviewAgain={handleReviewAgain}
                            cardNumber={currentIndex + 1}
                            totalCards={cards.length}
                        />
                    </motion.div>
                ) : phase === "results" ? (
                    <FlashcardResults
                        gotIt={gotIt.length}
                        reviewAgain={reviewAgain.length}
                        lessonName={activeLessonName}
                        onReviewMissed={handleReviewMissed}
                        onRestartAll={handleRestartAll}
                        onBack={handleBack}
                    />
                ) : null}
            </section>
            <SiteFooter />
        </main>
    );
}