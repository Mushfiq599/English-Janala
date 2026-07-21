"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getLessons, getWordsByLevel } from "@/lib/api";
import { Lesson, Word } from "@/types/word";
import Header from "@/components/Header";
import SiteFooter from "@/components/layout/Footer";
import QuizLessonPicker from "@/components/quiz/QuizLessonPicker";
import QuizCard from "@/components/quiz/QuizCard";
import QuizResults from "@/components/quiz/QuizResults";

type Phase = "pick" | "quiz" | "results";

interface Question {
    word: string;
    options: string[];
    correctAnswer: string;
}

const QUESTIONS_PER_QUIZ = 10;

function shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
}

function generateQuestions(words: Word[]): Question[] {
    const pool = shuffle(words).slice(0, QUESTIONS_PER_QUIZ);
    return pool.map((w) => {
        const wrongPool = words
            .filter((x) => x.id !== w.id && x.meaning)
            .map((x) => x.meaning);
        const wrongs = shuffle(wrongPool).slice(0, 3);
        const options = shuffle([w.meaning, ...wrongs]);
        return {
            word: w.word,
            options,
            correctAnswer: w.meaning,
        };
    });
}

export default function QuizPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [phase, setPhase] = useState<Phase>("pick");
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [activeLessonName, setActiveLessonName] = useState("");
    const [loadingQuiz, setLoadingQuiz] = useState(false);

    useEffect(() => {
        if (!loading && !user) router.push("/login");
    }, [user, loading, router]);

    useEffect(() => {
        getLessons().then(setLessons);
    }, []);

    const startQuiz = async (levelNo: number, lessonName: string) => {
        setLoadingQuiz(true);
        setActiveLessonName(lessonName);
        try {
            const words = await getWordsByLevel(String(levelNo));
            if (words.length < 4) {
                alert("Not enough words in this lesson for a quiz.");
                return;
            }
            const qs = generateQuestions(words);
            setQuestions(qs);
            setCurrentIndex(0);
            setScore(0);
            setSelectedAnswer(null);
            setPhase("quiz");
        } finally {
            setLoadingQuiz(false);
        }
    };

    const handleAnswer = useCallback(
        (answer: string) => {
            setSelectedAnswer(answer);
            if (answer === questions[currentIndex].correctAnswer) {
                setScore((s) => s + 1);
            }

            setTimeout(() => {
                if (currentIndex + 1 >= questions.length) {
                    setPhase("results");
                } else {
                    setCurrentIndex((i) => i + 1);
                    setSelectedAnswer(null);
                }
            }, 1200);
        },
        [currentIndex, questions]
    );

    const handleRetry = () => {
        const lesson = lessons.find((l) => l.lessonName === activeLessonName);
        if (lesson) startQuiz(lesson.level_no, lesson.lessonName);
    };

    const handleBack = () => {
        setPhase("pick");
        setQuestions([]);
        setCurrentIndex(0);
        setScore(0);
        setSelectedAnswer(null);
    };

    if (loading) {
        return (
            <main>
                <Header />
                <div className="flex justify-center items-center py-32">
                    <div
                        className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"
                        style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
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
                            Quiz Mode
                        </h1>
                        <p style={{ color: "var(--text-secondary)" }} className="text-sm">
                            Test your vocabulary knowledge lesson by lesson
                        </p>
                    </div>
                )}

                {phase === "quiz" && (
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1
                                style={{ color: "var(--text-primary)" }}
                                className="text-xl font-bold"
                            >
                                {activeLessonName}
                            </h1>
                            <p style={{ color: "var(--text-muted)" }} className="text-sm">
                                Score: {score}/{currentIndex}
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
                            Exit Quiz
                        </button>
                    </div>
                )}

                {/* Loading state */}
                {loadingQuiz ? (
                    <div className="flex justify-center items-center py-32">
                        <div
                            className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"
                            style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
                        />
                    </div>
                ) : phase === "pick" ? (
                    <QuizLessonPicker lessons={lessons} onSelect={startQuiz} />
                ) : phase === "quiz" && questions.length > 0 ? (
                    <QuizCard
                        word={questions[currentIndex].word}
                        options={questions[currentIndex].options}
                        correctAnswer={questions[currentIndex].correctAnswer}
                        questionNumber={currentIndex + 1}
                        totalQuestions={questions.length}
                        onAnswer={handleAnswer}
                        selectedAnswer={selectedAnswer}
                    />
                ) : phase === "results" ? (
                    <QuizResults
                        score={score}
                        total={questions.length}
                        lessonName={activeLessonName}
                        onRetry={handleRetry}
                        onBack={handleBack}
                    />
                ) : null}
            </section>
            <SiteFooter />
        </main>
    );
}