export default function SkeletonCard() {
    return (
        <div
            style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
            }}
            className="border rounded-2xl p-5 flex flex-col gap-3"
        >
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                    <div
                        style={{ backgroundColor: "var(--border-color)" }}
                        className="h-5 w-28 rounded animate-pulse"
                    />
                    <div
                        style={{ backgroundColor: "var(--border-color)" }}
                        className="h-3 w-16 rounded animate-pulse"
                    />
                </div>
                <div
                    style={{ backgroundColor: "var(--border-color)" }}
                    className="w-8 h-8 rounded-full animate-pulse"
                />
            </div>
            <div
                style={{ backgroundColor: "var(--border-color)" }}
                className="h-3 w-full rounded animate-pulse"
            />
            <div
                style={{ backgroundColor: "var(--border-color)" }}
                className="h-3 w-4/5 rounded animate-pulse"
            />
            <div
                style={{ backgroundColor: "var(--border-color)" }}
                className="h-6 w-16 rounded-full animate-pulse"
            />
            <div
                style={{ borderColor: "var(--border-color)" }}
                className="flex gap-2 pt-2 border-t"
            >
                <div
                    style={{ backgroundColor: "var(--border-color)" }}
                    className="flex-1 h-8 rounded-lg animate-pulse"
                />
                <div
                    style={{ backgroundColor: "var(--border-color)" }}
                    className="w-8 h-8 rounded-lg animate-pulse"
                />
            </div>
        </div>
    );
}