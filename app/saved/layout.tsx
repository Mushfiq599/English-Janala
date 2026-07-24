import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved Words",
  description:
    "Your personal English vocabulary collection. Review and manage words you have saved across all lessons.",
};

export default function SavedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}