"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getLessons, getWordsByLevel } from "@/lib/api";
import { Lesson, Word } from "@/types/word";
import Header from "@/components/Header";
import SiteFooter from "@/components/layout/Footer";
import TypingLessonPicker from "@/components/typing/TypingLessonPicker";
import TypingCard from "@/components/typing/TypingCard";
import TypingResults from "@/components/typing/TypingResults";

type Phase = "pick" | "typing" | "results";

interface MissedWord {
    word: string;
    typed: string;
    meaning: string;
}

const WORDS_PER_SESSION = 10;

function shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
}

export default function TypingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [phase, setPhase] = useState<Phase>("pick");
    const [words, setWords] = useState<Word[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [missedWords, setMissedWords] = useState<MissedWord[]>([]);
    const [activeLessonName, setActiveLessonName] = useState("");
    const [activeLevelNo, setActiveLevelNo] = useState(0);
    const [loadingWords, setLoadingWords] = useState(false);

    useEffect(() => {
        if (!loading && !user) router.push("/login");
    }, [user, loading, router]);

    useEffect(() => {
        getLessons().then(setLessons);
    }, []);

    const startSession = async (levelNo: number, lessonName: string) => {
        setLoadingWords(true);
        setActiveLessonName(lessonName);
        setActiveLevelNo(levelNo);
        try {
            const fetched = await getWordsByLevel(String(levelNo));
            const selected = shuffle(fetched).slice(0, WORDS_PER_SESSION);
            setWords(selected);
            setCurrentIndex(0);
            setCorrect(0);
            setMissedWords([]);
            setPhase("typing");
        } finally {
            setLoadingWords(false);
        }
    };

    const handleCorrect = useCallback(() => {
        setCorrect((c) => c + 1);
        if (currentIndex + 1 >= words.length) {
            setPhase("results");
        } else {
            setCurrentIndex((i) => i + 1);
        }
    }, [currentIndex, words.length]);

    const handleWrong = useCallback(
        (typedWord: string) => {
            const current = words[currentIndex];
            setMissedWords((prev) => [
                ...prev,
                {
                    word: current.word,
                    typed: typedWord,
                    meaning: current.meaning,
                },
            ]);
            if (currentIndex + 1 >= words.length) {
                setPhase("results");
            } else {
                setCurrentIndex((i) => i + 1);
            }
        },
        [currentIndex, words]
    );

    const handleSkip = useCallback(() => {
        const current = words[currentIndex];
        setMissedWords((prev) => [
            ...prev,
            {
                word: current.word,
                typed: "",
                meaning: current.meaning,
            },
        ]);
        if (currentIndex + 1 >= words.length) {
            setPhase("results");
        } else {
            setCurrentIndex((i) => i + 1);
        }
    }, [currentIndex, words]);

    const handleRetry = () => {
        startSession(activeLevelNo, activeLessonName);
    };

    const handleBack = () => {
        setPhase("pick");
        setWords([]);
        setCurrentIndex(0);
        setCorrect(0);
        setMissedWords([]);
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
                            Typing Challenge
                        </h1>
                        <p
                            style={{ color: "var(--text-secondary)" }}
                            className="text-sm"
                        >
                            Read the meaning and type the word — the hardest way to learn
                        </p>
                    </div>
                )}

                {phase === "typing" && (
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
                                {correct} correct · {missedWords.length} missed
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
                {loadingWords ? (
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
                    <TypingLessonPicker
                        lessons={lessons}
                        onSelect={startSession}
                    />
                ) : phase === "typing" && words.length > 0 ? (
                    <TypingCard
                        word={words[currentIndex].word}
                        meaning={words[currentIndex].meaning}
                        pronunciation={words[currentIndex].pronunciation}
                        sentence={words[currentIndex].sentence}
                        questionNumber={currentIndex + 1}
                        totalQuestions={words.length}
                        onCorrect={handleCorrect}
                        onSkip={handleSkip}
                        onWrong={handleWrong}
                    />
                ) : phase === "results" ? (
                    <TypingResults
                        correct={correct}
                        total={words.length}
                        lessonName={activeLessonName}
                        missedWords={missedWords}
                        onRetry={handleRetry}
                        onBack={handleBack}
                    />
                ) : null}
            </section>
            <SiteFooter />
        </main>
    );
}