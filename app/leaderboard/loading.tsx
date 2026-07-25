export default function LeaderboardLoading() {
    return (
        <div className="w-11/12 max-w-3xl mx-auto py-10">
            {/* Header skeleton */}
            <div className="text-center mb-10">
                <div
                    style={{ backgroundColor: "var(--border-color)" }}
                    className="w-16 h-16 rounded-2xl mx-auto mb-4 animate-pulse"
                />
                <div
                    style={{ backgroundColor: "var(--border-color)" }}
                    className="h-8 w-48 rounded mx-auto mb-2 animate-pulse"
                />
                <div
                    style={{ backgroundColor: "var(--border-color)" }}
                    className="h-4 w-72 rounded mx-auto animate-pulse"
                />
            </div>

            {/* Podium skeleton */}
            <div className="grid grid-cols-3 gap-3 mb-8">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        style={{
                            backgroundColor: "var(--bg-card)",
                            borderColor: "var(--border-color)",
                        }}
                        className="border-2 rounded-2xl p-4 flex flex-col items-center gap-2"
                    >
                        <div
                            style={{ backgroundColor: "var(--border-color)" }}
                            className="w-10 h-10 rounded-full animate-pulse"
                        />
                        <div
                            style={{ backgroundColor: "var(--border-color)" }}
                            className="w-12 h-12 rounded-full animate-pulse"
                        />
                        <div
                            style={{ backgroundColor: "var(--border-color)" }}
                            className="h-4 w-20 rounded animate-pulse"
                        />
                    </div>
                ))}
            </div>

            {/* List skeleton */}
            <div
                style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                }}
                className="border rounded-2xl overflow-hidden"
            >
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        style={{ borderColor: "var(--border-color)" }}
                        className="grid grid-cols-12 gap-3 px-5 py-4 border-b items-center last:border-b-0"
                    >
                        <div
                            style={{ backgroundColor: "var(--border-color)" }}
                            className="col-span-1 w-8 h-8 rounded-full animate-pulse"
                        />
                        <div className="col-span-5 flex items-center gap-3">
                            <div
                                style={{ backgroundColor: "var(--border-color)" }}
                                className="w-9 h-9 rounded-full animate-pulse flex-shrink-0"
                            />
                            <div className="flex flex-col gap-1.5">
                                <div
                                    style={{ backgroundColor: "var(--border-color)" }}
                                    className="h-4 w-24 rounded animate-pulse"
                                />
                                <div
                                    style={{ backgroundColor: "var(--border-color)" }}
                                    className="h-3 w-16 rounded-full animate-pulse"
                                />
                            </div>
                        </div>
                        <div className="col-span-3 flex justify-center">
                            <div
                                style={{ backgroundColor: "var(--border-color)" }}
                                className="h-4 w-10 rounded animate-pulse"
                            />
                        </div>
                        <div className="col-span-3 flex justify-center">
                            <div
                                style={{ backgroundColor: "var(--border-color)" }}
                                className="h-4 w-8 rounded animate-pulse"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}