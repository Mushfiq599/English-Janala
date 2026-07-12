"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="flex flex-col-reverse md:flex-row gap-10 justify-between py-16 w-11/12 mx-auto items-center">
      {/* Text side */}
      <motion.div
        className="flex-1 text-center md:text-left"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold mb-6">
          <span className="text-sky-500">English</span> is Easy!!
        </h1>
        <p
          style={{ color: "var(--text-secondary)" }}
          className="font-bangla text-xl font-medium mb-8 leading-relaxed"
        >
          আজ থেকেই আপনার ভাষা শেখার যাত্রা শুরু করুন। আপনি যদি নতুন হন অথবা
          আপনার দক্ষতা বাড়াতে চান, আমাদের Interactive Lessons আপনাকে নিয়ে যাবে
          অন্য একটি Level এ।
        </p>
        <Link
          href="/lesson"
          className="inline-block px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition"
        >
          Get Started
        </Link>
      </motion.div>

      {/* Image side */}
      <motion.div
        className="flex-1 flex justify-center"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        <Image
          src="/assets/hero-student.png"
          alt="Student learning English"
          width={500}
          height={500}
          priority
        />
      </motion.div>
    </section>
  );
}