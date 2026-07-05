import { getLessons } from "@/lib/api";
import Header from "@/components/Header";
import LessonGrid from "@/components/LessonGrid";

export default async function LessonPage() {
  const lessons = await getLessons();

  return (
    <main>
      <Header />
      <section className="w-11/12 mx-auto py-10">
        <h2 className="text-2xl font-bold mb-2">All Lessons</h2>
        <p className="text-gray-500 mb-8 text-sm">
          Pick a lesson to start learning vocabulary
        </p>
        <LessonGrid lessons={lessons} />
      </section>
    </main>
  );
}