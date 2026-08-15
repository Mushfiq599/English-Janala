import type { Metadata } from "next";
import { getLessons } from "@/lib/api";
import Header from "@/components/Header";
import LessonGrid from "@/components/LessonGrid";
import SiteFooter from "@/components/layout/Footer";
import LessonSummaryBar from "@/components/lesson/LessonSummaryBar";

export const metadata: Metadata = {
  title: "All Lessons",
  description:
    "Browse all English vocabulary lessons from Basic to IELTS and TOEFL level. Learn words with meanings, pronunciation, and examples.",
};

export default async function LessonPage() {
  const lessons = await getLessons();

  return (
    <main>
      <Header />
      <section className="w-11/12 max-w-6xl mx-auto py-10">
        {/* Page header */}
        <div className="mb-6">
          <h2
            style={{ color: "var(--text-primary)" }}
            className="text-2xl font-bold mb-1"
          >
            All Lessons
          </h2>
          <p style={{ color: "var(--text-secondary)" }} className="text-sm">
            Pick a lesson to start learning vocabulary
          </p>
        </div>

        {/* Summary bar */}
        <LessonSummaryBar />

        {/* Lesson grid */}
        <LessonGrid lessons={lessons} />
      </section>
      <SiteFooter />
    </main>
  );
}