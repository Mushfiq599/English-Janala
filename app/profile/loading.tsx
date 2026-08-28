export default function ProfileLoading() {
    return (
        <div className="w-11/12 max-w-4xl mx-auto py-10">
            {/* Profile card skeleton */}
            <div
                style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                }}
                className="border rounded-2xl p-8 mb-8 shadow-sm"
            >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div
                        style={{ backgroundColor: "var(--border-color)" }}
                        className="w-20 h-20 rounded-full animate-pulse flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col gap-3 w-full">
                        <div className="flex items-center gap-3">
                            <div
                                style={{ backgroundColor: "var(--border-color)" }}
                                className="h-7 w-40 rounded animate-pulse"
                            />
                            <div
                                style={{ backgroundColor: "var(--border-color)" }}
                                className="h-6 w-24 rounded-full animate-pulse"
                            />
                        </div>
                        <div className="flex gap-4 flex-wrap">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    style={{ backgroundColor: "var(--border-color)" }}
                                    className="h-4 w-36 rounded animate-pulse"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats skeleton */}
            <div
                style={{ backgroundColor: "var(--border-color)" }}
                className="h-6 w-40 rounded animate-pulse mb-4"
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        style={{
                            backgroundColor: "var(--bg-card)",
                            borderColor: "var(--border-color)",
                        }}
                        className="border rounded-2xl p-5 shadow-sm"
                    >
                        <div
                            style={{ backgroundColor: "var(--border-color)" }}
                            className="w-12 h-12 rounded-xl mx-auto mb-3 animate-pulse"
                        />
                        <div
                            style={{ backgroundColor: "var(--border-color)" }}
                            className="h-6 w-12 rounded mx-auto mb-2 animate-pulse"
                        />
                        <div
                            style={{ backgroundColor: "var(--border-color)" }}
                            className="h-3 w-20 rounded mx-auto animate-pulse"
                        />
                    </div>
                ))}
            </div>

            {/* Progress bar skeleton */}
            <div
                style={{ backgroundColor: "var(--border-color)" }}
                className="h-6 w-36 rounded animate-pulse mb-4"
            />
            <div
                style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                }}
                className="border rounded-2xl p-6 shadow-sm mb-10"
            >
                <div className="flex justify-between mb-2">
                    <div
                        style={{ backgroundColor: "var(--border-color)" }}
                        className="h-4 w-28 rounded animate-pulse"
                    />
                    <div
                        style={{ backgroundColor: "var(--border-color)" }}
                        className="h-4 w-16 rounded animate-pulse"
                    />
                </div>
                <div
                    style={{ backgroundColor: "var(--border-color)" }}
                    className="w-full h-3 rounded-full animate-pulse"
                />
            </div>

            {/* Quiz history skeleton */}
            <div
                style={{ backgroundColor: "var(--border-color)" }}
                className="h-6 w-44 rounded animate-pulse mb-4"
            />
            <div
                style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                }}
                className="border rounded-2xl overflow-hidden shadow-sm"
            >
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        style={{ borderColor: "var(--border-color)" }}
                        className="flex items-center gap-4 px-5 py-4 border-b last:border-b-0"
                    >
                        <div
                            style={{ backgroundColor: "var(--border-color)" }}
                            className="w-14 h-14 rounded-full animate-pulse flex-shrink-0"
                        />
                        <div className="flex-1 flex flex-col gap-2">
                            <div
                                style={{ backgroundColor: "var(--border-color)" }}
                                className="h-4 w-40 rounded animate-pulse"
                            />
                            <div
                                style={{ backgroundColor: "var(--border-color)" }}
                                className="h-3 w-28 rounded animate-pulse"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}