import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Exam Preparation",
    description:
        "Curated IELTS and TOEFL vocabulary packs. Master the Academic Word List and exam-specific vocabulary to achieve your target score.",
};

export default function ExamPrepLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}