import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Leaderboard",
    description:
        "See the top English Janala learners ranked by words explored. Compete and climb the leaderboard.",
};

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}