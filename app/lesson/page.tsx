import { getLessons } from "@/lib/api";
import Header from "@/components/Header";
import LessonGrid from "@/components/LessonGrid";
import SiteFooter from "@/components/layout/Footer";

export default async function LessonPage() {
  const lessons = await getLessons();

  return (
    <main>
      <Header />
      <section className="w-11/12 max-w-6xl mx-auto py-10">
        <div className="mb-8">
          <h2
            style={{ color: "var(--text-primary)" }}
            className="text-2xl font-bold mb-2"
          >
            All Lessons
          </h2>
          <p style={{ color: "var(--text-secondary)" }} className="text-sm">
            Pick a lesson to start learning vocabulary
          </p>
        </div>
        <LessonGrid lessons={lessons} />
      </section>
      <SiteFooter />
    </main>
  );
}