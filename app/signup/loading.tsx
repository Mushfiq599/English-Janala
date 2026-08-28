export default function SignupLoading() {
    return (
        <main
            style={{ backgroundColor: "var(--bg-page)" }}
            className="min-h-screen flex items-center justify-center px-4 py-10"
        >
            <div
                style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                }}
                className="border rounded-2xl shadow-lg p-8 w-full max-w-md"
            >
                {/* Logo skeleton */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div
                        style={{ backgroundColor: "var(--border-color)" }}
                        className="h-6 w-20 rounded animate-pulse"
                    />
                    <div
                        style={{ backgroundColor: "var(--border-color)" }}
                        className="w-7 h-7 rounded animate-pulse"
                    />
                    <div
                        style={{ backgroundColor: "var(--border-color)" }}
                        className="h-6 w-16 rounded animate-pulse"
                    />
                </div>

                {/* Title skeleton */}
                <div className="flex flex-col items-center gap-2 mb-6">
                    <div
                        style={{ backgroundColor: "var(--border-color)" }}
                        className="h-7 w-44 rounded animate-pulse"
                    />
                    <div
                        style={{ backgroundColor: "var(--border-color)" }}
                        className="h-4 w-64 rounded animate-pulse"
                    />
                </div>

                {/* Fields skeleton — 5 fields for signup */}
                <div className="space-y-4">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i}>
                            <div
                                style={{ backgroundColor: "var(--border-color)" }}
                                className="h-4 w-24 rounded animate-pulse mb-1"
                            />
                            <div
                                style={{ backgroundColor: "var(--border-color)" }}
                                className="h-11 w-full rounded-lg animate-pulse"
                            />
                        </div>
                    ))}
                    <div
                        style={{ backgroundColor: "var(--border-color)" }}
                        className="h-11 w-full rounded-lg animate-pulse"
                    />
                </div>

                {/* Divider */}
                <div className="my-4 flex items-center gap-3">
                    <div
                        style={{ backgroundColor: "var(--border-color)" }}
                        className="flex-1 h-px"
                    />
                    <div
                        style={{ backgroundColor: "var(--border-color)" }}
                        className="h-4 w-6 rounded animate-pulse"
                    />
                    <div
                        style={{ backgroundColor: "var(--border-color)" }}
                        className="flex-1 h-px"
                    />
                </div>

                {/* Google button skeleton */}
                <div
                    style={{ backgroundColor: "var(--border-color)" }}
                    className="h-11 w-full rounded-lg animate-pulse"
                />

                {/* Bottom link skeleton */}
                <div className="flex justify-center mt-6">
                    <div
                        style={{ backgroundColor: "var(--border-color)" }}
                        className="h-4 w-48 rounded animate-pulse"
                    />
                </div>
            </div>
        </main>
    );
}