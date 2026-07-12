"use client";

import { useState } from "react";
import Header from "@/components/Header";

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
      "While browsing any lesson, click the ☆ star icon on a word card to save it. All your saved words appear on the Saved Words page, where you can review or remove them anytime.",
  },
  {
    question: "How does the pronunciation feature work?",
    answer:
      "Click the 🔊 speaker icon on any word card or in the word detail modal. English Janala uses your browser's built-in text-to-speech to pronounce the word in a natural English accent.",
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
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500">
            Everything you need to know about English Janala
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-800 hover:bg-sky-50 transition"
              >
                <span>{faq.question}</span>
                <span
                  className={`text-sky-500 text-xl transition-transform duration-300 ${
                    openIndex === i ? "rotate-45" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`px-6 text-sm text-gray-600 leading-relaxed transition-all duration-300 ease-in-out ${
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

        {/* CTA */}
        <div className="mt-14 bg-sky-50 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Still have questions?</h2>
          <p className="text-gray-500 text-sm mb-6">
            Can&apos;t find what you&apos;re looking for? Reach out and we&apos;ll get back to you.
          </p>
          <a
            href="mailto:mellowm678@gmail.com"
            className="inline-block px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-lg transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}