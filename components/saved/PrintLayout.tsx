import { Word } from "@/types/word";

interface Props {
    words: Word[];
    userName?: string;
}

export default function PrintLayout({ words, userName }: Props) {
    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div id="print-saved-words" className="hidden print:block">
            {/* Print header */}
            <div
                style={{
                    borderBottom: "2px solid #0ea5e9",
                    paddingBottom: "1rem",
                    marginBottom: "2rem",
                }}
            >
                <h1
                    style={{
                        fontSize: "1.75rem",
                        fontWeight: 900,
                        color: "#0f172a",
                        marginBottom: "0.25rem",
                    }}
                >
                    English Janala — My Vocabulary List
                </h1>
                <div
                    style={{
                        display: "flex",
                        gap: "1.5rem",
                        fontSize: "0.85rem",
                        color: "#64748b",
                    }}
                >
                    {userName && <span>Learner: {userName}</span>}
                    <span>{today}</span>
                    <span>{words.length} words saved</span>
                </div>
            </div>

            {/* Word grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "1rem",
                }}
            >
                {words.map((word, i) => (
                    <div
                        key={word.id}
                        className="print-word-card"
                        style={{
                            border: "1px solid #e2e8f0",
                            borderRadius: "0.75rem",
                            padding: "1rem",
                            backgroundColor: "#f8fafc",
                        }}
                    >
                        {/* Word number + word */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                marginBottom: "0.4rem",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "0.7rem",
                                    fontWeight: 700,
                                    color: "#0ea5e9",
                                    backgroundColor: "#f0f9ff",
                                    padding: "0.1rem 0.5rem",
                                    borderRadius: "999px",
                                }}
                            >
                                {i + 1}
                            </span>
                            <h3
                                style={{
                                    fontSize: "1.1rem",
                                    fontWeight: 800,
                                    color: "#0f172a",
                                    margin: 0,
                                }}
                            >
                                {word.word}
                            </h3>
                            {word.pronunciation && (
                                <span
                                    style={{
                                        fontSize: "0.75rem",
                                        color: "#94a3b8",
                                    }}
                                >
                                    /{word.pronunciation}/
                                </span>
                            )}
                        </div>

                        {/* Parts of speech */}
                        {word.partsOfSpeech && (
                            <span
                                style={{
                                    display: "inline-block",
                                    fontSize: "0.7rem",
                                    fontWeight: 600,
                                    color: "#0ea5e9",
                                    backgroundColor: "#f0f9ff",
                                    padding: "0.1rem 0.5rem",
                                    borderRadius: "999px",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                {word.partsOfSpeech}
                            </span>
                        )}

                        {/* Meaning */}
                        <p
                            style={{
                                fontSize: "0.85rem",
                                color: "#475569",
                                margin: "0.25rem 0",
                                lineHeight: 1.5,
                            }}
                        >
                            {word.meaning}
                        </p>

                        {/* Example */}
                        {word.sentence && (
                            <p
                                style={{
                                    fontSize: "0.8rem",
                                    color: "#64748b",
                                    fontStyle: "italic",
                                    margin: "0.4rem 0 0",
                                    borderLeft: "3px solid #0ea5e9",
                                    paddingLeft: "0.5rem",
                                }}
                            >
                                &ldquo;{word.sentence}&rdquo;
                            </p>
                        )}

                        {/* Synonyms */}
                        {word.synonyms && word.synonyms.length > 0 && (
                            <div style={{ marginTop: "0.4rem" }}>
                                <span
                                    style={{
                                        fontSize: "0.7rem",
                                        fontWeight: 700,
                                        color: "#22c55e",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                    }}
                                >
                                    Synonyms:{" "}
                                </span>
                                <span
                                    style={{ fontSize: "0.75rem", color: "#475569" }}
                                >
                                    {word.synonyms.slice(0, 4).join(", ")}
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Print footer */}
            <div
                style={{
                    marginTop: "2rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid #e2e8f0",
                    fontSize: "0.75rem",
                    color: "#94a3b8",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <span>English Janala — english-janala.vercel.app</span>
                <span>Keep learning every day!</span>
            </div>
        </div>
    );
}