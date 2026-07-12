import { getLessons } from "@/lib/api";
import Header from "@/components/Header";
import LessonGrid from "@/components/LessonGrid";

export default async function LessonPage() {
  const lessons = await getLessons();

  return (
    <main>
      <Header />
      <section className="w-11/12 mx-auto py-10">
        <h2 style={{ color: "var(--text-primary)" }} className="text-2xl font-bold mb-2">All Lessons</h2>

        <p style={{ color: "var(--text-secondary)" }} className="text-sm mb-8">Pick a lesson to start learning vocabulary</p>

        <LessonGrid lessons={lessons} />
      </section>
    </main>
  );
}