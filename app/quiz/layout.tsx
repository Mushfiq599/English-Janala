import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Quiz Mode",
    description:
        "Test your English vocabulary knowledge with interactive multiple choice quizzes. One lesson at a time.",
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}