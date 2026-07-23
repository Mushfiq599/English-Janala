"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SiteFooter from "@/components/layout/Footer";
import { FiPlus, FiMinus, FiMail } from "react-icons/fi";

const faqs = [
  {
    question: "What is English Janala?",
    answer:
      "English Janala is an interactive vocabulary learning platform that helps you learn English words lesson by lesson, with pronunciation, meanings, example sentences, and synonyms.",
  },
  {
    question: "Do I need an account to use English Janala?",
    answer:
      "You can browse lessons and word cards without an account. However, to save words to your personal vocabulary list and track your progress across lessons, you need to sign up for a free account.",
  },
  {
    question: "How does progress tracking work?",
    answer:
      "When you open a lesson and view its word cards, each word is automatically marked as seen. Your lesson buttons show how many words you have seen so far, so you always know where you left off.",
  },
  {
    question: "How do I save a word?",
    answer:
      "While browsing any lesson, click the star icon on a word card to save it. All your saved words appear on the Saved Words page, where you can review or remove them anytime.",
  },
  {
    question: "How does the pronunciation feature work?",
    answer:
      "Click the speaker icon on any word card or in the word detail modal. English Janala uses your browser built-in text-to-speech to pronounce the word in a natural English accent.",
  },
  {
    question: "Can I use English Janala on my phone?",
    answer:
      "Yes, English Janala is fully responsive and works on any device — desktop, tablet, or mobile browser. No app download required.",
  },
  {
    question: "How many lessons and words are available?",
    answer:
      "There are currently 7 lessons ranging from Basic Vocabulary to Mastering Vocabulary, covering hundreds of English words with meanings, pronunciations, example sentences, and synonyms.",
  },
  {
    question: "Is English Janala free?",
    answer:
      "Yes, English Janala is completely free to use. Create a free account to unlock progress tracking and your personal saved words list.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <main>
      <Header />
      <section className="w-11/12 max-w-3xl mx-auto py-16">
        <div className="text-center mb-12">
          <h1
            style={{ color: "var(--text-primary)" }}
            className="text-3xl font-bold mb-3"
          >
            Frequently Asked Questions
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Everything you need to know about English Janala
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
              }}
              className="border rounded-2xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                style={{ color: "var(--text-primary)" }}
                className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold hover:opacity-80 transition"
              >
                <span>{faq.question}</span>
                <span style={{ color: "var(--accent)" }}>
                  {openIndex === i
                    ? <FiMinus size={18} />
                    : <FiPlus size={18} />
                  }
                </span>
              </button>
              <div
                style={{ color: "var(--text-secondary)" }}
                className={`px-6 text-sm leading-relaxed transition-all duration-300 ease-in-out ${
                  openIndex === i
                    ? "max-h-40 py-4 opacity-100"
                    : "max-h-0 py-0 opacity-0"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            backgroundColor: "var(--badge-bg)",
            borderColor: "var(--border-color)",
          }}
          className="mt-14 border rounded-2xl p-8 text-center"
        >
          <h2
            style={{ color: "var(--text-primary)" }}
            className="text-xl font-bold mb-2"
          >
            Still have questions?
          </h2>
          <p
            style={{ color: "var(--text-secondary)" }}
            className="text-sm mb-6"
          >
            Cannot find what you are looking for? Reach out and we will get back to you.
          </p>
          <a
            href="mailto:mellowm678@gmail.com"
            style={{ backgroundColor: "var(--accent)" }}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition"
          >
            <FiMail size={15} />
            Contact Us
          </a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}