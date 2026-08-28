export interface Badge {
    id: string;
    label: string;
    description: string;
    icon: string;
    color: string;
    bg: string;
}

export const ALL_BADGES: Badge[] = [
    {
        id: "first_word_saved",
        label: "Word Collector",
        description: "Saved your first word",
        icon: "star",
        color: "#f59e0b",
        bg: "#fef9c3",
    },
    {
        id: "words_10",
        label: "Vocabulary Builder",
        description: "Saved 10 words",
        icon: "book",
        color: "#0ea5e9",
        bg: "#f0f9ff",
    },
    {
        id: "words_50",
        label: "Word Master",
        description: "Saved 50 words",
        icon: "award",
        color: "#8b5cf6",
        bg: "#f5f3ff",
    },
    {
        id: "first_lesson",
        label: "Explorer",
        description: "Completed your first lesson",
        icon: "map",
        color: "#22c55e",
        bg: "#f0fdf4",
    },
    {
        id: "all_lessons",
        label: "Grand Explorer",
        description: "Explored all lessons",
        icon: "compass",
        color: "#f97316",
        bg: "#fff7ed",
    },
    {
        id: "streak_3",
        label: "On a Roll",
        description: "Reached a 3 day streak",
        icon: "zap",
        color: "#f59e0b",
        bg: "#fef9c3",
    },
    {
        id: "streak_7",
        label: "Week Warrior",
        description: "Reached a 7 day streak",
        icon: "zap",
        color: "#ef4444",
        bg: "#fef2f2",
    },
    {
        id: "streak_30",
        label: "Unstoppable",
        description: "Reached a 30 day streak",
        icon: "zap",
        color: "#7c3aed",
        bg: "#f5f3ff",
    },
    {
        id: "first_quiz",
        label: "Quiz Taker",
        description: "Completed your first quiz",
        icon: "target",
        color: "#0ea5e9",
        bg: "#f0f9ff",
    },
    {
        id: "perfect_quiz",
        label: "Perfect Score",
        description: "Got 100% on a quiz",
        icon: "award",
        color: "#f59e0b",
        bg: "#fef9c3",
    },
    {
        id: "quiz_5",
        label: "Quiz Champion",
        description: "Completed 5 quizzes",
        icon: "target",
        color: "#22c55e",
        bg: "#f0fdf4",
    },
    {
        id: "seen_100",
        label: "Century Club",
        description: "Seen 100 words across all lessons",
        icon: "trending",
        color: "#f97316",
        bg: "#fff7ed",
    },
];

export function checkEarnedBadges(stats: {
    savedWords: number;
    lessonsStarted: number;
    totalLessons: number;
    streak: number;
    quizzesCompleted: number;
    perfectQuizzes: number;
    wordsSeen: number;
}): string[] {
    const earned: string[] = [];

    if (stats.savedWords >= 1) earned.push("first_word_saved");
    if (stats.savedWords >= 10) earned.push("words_10");
    if (stats.savedWords >= 50) earned.push("words_50");
    if (stats.lessonsStarted >= 1) earned.push("first_lesson");
    if (stats.lessonsStarted >= stats.totalLessons) earned.push("all_lessons");
    if (stats.streak >= 3) earned.push("streak_3");
    if (stats.streak >= 7) earned.push("streak_7");
    if (stats.streak >= 30) earned.push("streak_30");
    if (stats.quizzesCompleted >= 1) earned.push("first_quiz");
    if (stats.perfectQuizzes >= 1) earned.push("perfect_quiz");
    if (stats.quizzesCompleted >= 5) earned.push("quiz_5");
    if (stats.wordsSeen >= 100) earned.push("seen_100");

    return earned;
}