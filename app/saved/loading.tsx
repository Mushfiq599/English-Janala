import SkeletonCard from "@/components/shared/SkeletonCard";

export default function SavedLoading() {
    return (
        <div className="w-11/12 mx-auto py-10">
            <div className="mb-8">
                <div
                    style={{ backgroundColor: "var(--border-color)" }}
                    className="h-7 w-40 rounded animate-pulse mb-2"
                />
                <div
                    style={{ backgroundColor: "var(--border-color)" }}
                    className="h-4 w-72 rounded animate-pulse"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        </div>
    );
}