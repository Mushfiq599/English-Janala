import SkeletonLessonButton from "@/components/shared/SkeletonLessonButton";
import SkeletonCard from "@/components/shared/SkeletonCard";

export default function LessonLoading() {
    return (
        <div className="w-11/12 max-w-6xl mx-auto py-10">
            <div className="mb-8">
                <div
                    style={{ backgroundColor: "var(--border-color)" }}
                    className="h-7 w-40 rounded animate-pulse mb-2"
                />
                <div
                    style={{ backgroundColor: "var(--border-color)" }}
                    className="h-4 w-64 rounded animate-pulse"
                />
            </div>

            {/* Lesson button skeletons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
                {Array.from({ length: 7 }).map((_, i) => (
                    <SkeletonLessonButton key={i} />
                ))}
            </div>

            {/* Word card skeletons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        </div>
    );
}