import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Typing Challenge",
    description:
        "Type English words from memory. The hardest and most effective way to learn vocabulary.",
};

export default function TypingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}