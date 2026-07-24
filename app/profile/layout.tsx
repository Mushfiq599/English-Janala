import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
  description:
    "View your English Janala learning stats, progress, and achievements.",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}