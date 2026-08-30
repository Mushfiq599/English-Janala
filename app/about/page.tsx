import Header from "@/components/Header";
import SiteFooter from "@/components/layout/Footer";
import type { Metadata } from "next";
import { FiGithub, FiBookOpen, FiTarget, FiLayers } from "react-icons/fi";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about English Janala — who built it, why it exists, and what makes it different.",
};

const features = [
    {
        icon: <FiBookOpen size={20} />,
        title: "Age-adaptive themes",
        description:
            "Kids, teens, and adults each get a completely different visual experience based on their age.",
    },
    {
        icon: <FiLayers size={20} />,
        title: "Multiple learning modes",
        description:
            "Lessons, flashcards, quiz, typing challenge — each mode builds a different kind of memory.",
    },
    {
        icon: <FiTarget size={20} />,
        title: "Exam preparation",
        description:
            "Dedicated IELTS, TOEFL, and Academic Word List packs for serious exam candidates.",
    },
];

export default function AboutPage() {
    return (
        <main>
            <Header />
            <section className="w-11/12 max-w-3xl mx-auto py-16">
                {/* Hero */}
                <div className="text-center mb-16">
                    <span
                        style={{
                            color: "var(--accent)",
                            backgroundColor: "var(--accent-soft)",
                        }}
                        className="text-sm font-semibold px-4 py-1.5 rounded-full"
                    >
                        About this project
                    </span>
                    <h1
                        style={{ color: "var(--text-primary)" }}
                        className="text-3xl md:text-4xl font-bold mt-4 mb-4"
                    >
                        What is English Janala?
                    </h1>
                    <p
                        style={{ color: "var(--text-secondary)" }}
                        className="text-lg leading-relaxed"
                    >
                        English Janala is an interactive English vocabulary learning
                        platform built for learners of all ages — from curious kids to
                        IELTS and TOEFL candidates preparing for international exams.
                    </p>
                </div>

                {/* Story */}
                <div
                    style={{
                        backgroundColor: "var(--bg-card)",
                        borderColor: "var(--border-color)",
                    }}
                    className="border rounded-2xl p-8 mb-8 shadow-sm"
                >
                    <h2
                        style={{ color: "var(--text-primary)" }}
                        className="text-xl font-bold mb-4"
                    >
                        The story
                    </h2>
                    <div
                        style={{ color: "var(--text-secondary)" }}
                        className="space-y-4 text-sm leading-relaxed"
                    >
                        <p>
                            English Janala started as a simple vocabulary assignment during
                            my early days of learning web development. The original version
                            was a plain HTML, CSS, and vanilla JavaScript page that fetched
                            words from an API and displayed them in cards.
                        </p>
                        <p>
                            After completing a full-stack web development programme, I
                            rebuilt it entirely from scratch — this time as a proper
                            Next.js application with TypeScript, Firebase authentication,
                            Firestore database, and a design system that adapts to the
                            learner's age.
                        </p>
                        <p>
                            The goal was to build something genuinely useful rather than
                            just another portfolio piece. A platform where a 9-year-old
                            and a 24-year-old IELTS candidate can both learn effectively,
                            each with an experience tailored to their needs.
                        </p>
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            style={{
                                backgroundColor: "var(--bg-card)",
                                borderColor: "var(--border-color)",
                            }}
                            className="border rounded-2xl p-5 shadow-sm"
                        >
                            <div
                                style={{
                                    backgroundColor: "var(--accent-soft)",
                                    color: "var(--accent)",
                                }}
                                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                            >
                                {f.icon}
                            </div>
                            <h3
                                style={{ color: "var(--text-primary)" }}
                                className="font-bold text-sm mb-1"
                            >
                                {f.title}
                            </h3>
                            <p
                                style={{ color: "var(--text-secondary)" }}
                                className="text-xs leading-relaxed"
                            >
                                {f.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Builder */}
                <div
                    style={{
                        backgroundColor: "var(--bg-card)",
                        borderColor: "var(--border-color)",
                    }}
                    className="border rounded-2xl p-8 shadow-sm mb-8"
                >
                    <h2
                        style={{ color: "var(--text-primary)" }}
                        className="text-xl font-bold mb-4"
                    >
                        Who built this
                    </h2>
                    <div className="flex items-start gap-4">
                        <div
                            style={{ backgroundColor: "var(--accent)", color: "#fff" }}
                            className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-black flex-shrink-0"
                        >
                            M
                        </div>
                        <div>
                            <p
                                style={{ color: "var(--text-primary)" }}
                                className="font-bold text-lg mb-1"
                            >
                                Mushfiqur Rahman
                            </p>
                            <p
                                style={{ color: "var(--text-secondary)" }}
                                className="text-sm mb-3"
                            >
                                BSc CSE student at UITS, Chattogram, Bangladesh. Full-stack
                                web developer building with Next.js, React, Firebase,
                                MongoDB, and Express.
                            </p>
                            <a
                                href="https://github.com/Mushfiq599"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ backgroundColor: "var(--accent)" }}
                                className="inline-flex items-center gap-2 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition"
                            >
                                <FiGithub size={15} />
                                View on GitHub
                            </a>
                        </div>
                    </div>
                </div>

                {/* Tech stack */}
                <div
                    style={{
                        backgroundColor: "var(--bg-card)",
                        borderColor: "var(--border-color)",
                    }}
                    className="border rounded-2xl p-8 shadow-sm mb-8"
                >
                    <h2
                        style={{ color: "var(--text-primary)" }}
                        className="text-xl font-bold mb-4"
                    >
                        Tech stack
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            "Next.js 16",
                            "TypeScript",
                            "Tailwind CSS",
                            "Firebase Auth",
                            "Firestore",
                            "Framer Motion",
                            "React Icons",
                            "Free Dictionary API",
                            "Programming Hero API",
                            "Vercel",
                        ].map((tech) => (
                            <span
                                key={tech}
                                style={{
                                    backgroundColor: "var(--accent-soft)",
                                    color: "var(--accent)",
                                    borderColor: "var(--border-color)",
                                }}
                                className="text-xs font-semibold px-3 py-1.5 rounded-full border"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <p
                        style={{ color: "var(--text-muted)" }}
                        className="text-sm mb-4"
                    >
                        Have feedback or found a bug?
                    </p>
                    <a
                        href="mailto:mellowm678@gmail.com"
                        style={{ color: "var(--accent)" }}
                        className="text-sm font-semibold hover:underline"
                    >
                        mellowm678@gmail.com
                    </a>
                </div>
            </section >
            <SiteFooter />
        </main >
    );
}