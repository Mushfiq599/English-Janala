"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";
import { MdRocketLaunch } from "react-icons/md";

export default function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section style={{ backgroundColor: "var(--bg-card)" }} className="py-24" ref={ref}>
      <div className="w-11/12 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          style={{ backgroundColor: "var(--accent)" }}
          className="rounded-3xl p-12 text-center text-white relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />

          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <MdRocketLaunch size={48} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to start your journey?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Join thousands of learners already mastering English with English
              Janala. It is completely free to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white font-bold rounded-xl hover:bg-gray-100 transition"
                style={{ color: "var(--accent)" }}
              >
                Create Free Account
                <FiArrowRight size={16} />
              </Link>
              <Link
                href="/lesson"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition"
              >
                <FiBookOpen size={16} />
                Browse Lessons First
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}