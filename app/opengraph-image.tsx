import { ImageResponse } from "next/og";

export const alt = "English Janala";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "sans-serif",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 8,
                        background: "#0ea5e9",
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        marginBottom: 32,
                    }}
                >
                    <div
                        style={{
                            width: 72,
                            height: 72,
                            borderRadius: 16,
                            background: "#0ea5e9",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: 36,
                            fontWeight: 900,
                        }}
                    >
                        E
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span
                            style={{
                                fontSize: 48,
                                fontWeight: 900,
                                color: "#0f172a",
                                lineHeight: 1.1,
                            }}
                        >
                            English Janala
                        </span>
                        <span style={{ fontSize: 20, color: "#64748b", marginTop: 4 }}>
                            Learn English Vocabulary
                        </span>
                    </div>
                </div>

                <div
                    style={{
                        fontSize: 28,
                        color: "#475569",
                        textAlign: "center",
                        maxWidth: 700,
                        lineHeight: 1.4,
                    }}
                >
                    Interactive vocabulary learning for ages 5–30
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: 16,
                        marginTop: 40,
                    }}
                >
                    {["Kids", "Teens", "IELTS", "TOEFL"].map((label) => (
                        <div
                            key={label}
                            style={{
                                background: "#f0f9ff",
                                border: "2px solid #bae6fd",
                                borderRadius: 100,
                                padding: "8px 24px",
                                fontSize: 20,
                                color: "#0ea5e9",
                                fontWeight: 700,
                            }}
                        >
                            {label}
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        position: "absolute",
                        bottom: 32,
                        fontSize: 16,
                        color: "#94a3b8",
                    }}
                >
                    english-janala-azure.vercel.app
                </div>
            </div>
        ),
        { ...size }
    );
}