import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Flashcard Mode",
    description:
        "Study English vocabulary with interactive flashcards. Flip cards to reveal meanings and track what you know.",
};

export default function FlashcardsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}