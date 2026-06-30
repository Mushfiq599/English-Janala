import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col-reverse md:flex-row gap-10 justify-between py-10 w-11/12 mx-auto items-center">
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl font-bold mb-6">
          <span className="text-sky-500">English</span> is Easy!!
        </h1>
        <p className="font-bangla text-xl font-medium text-[#18181B] mb-8">
          আজ থেকেই আপনার ভাষা শেখার যাত্রা শুরু করুন। আপনি যদি নতুন হন অথবা আপনার
          দক্ষতা বাড়াতে চান, আমাদের Interactive Lessons আপনাকে নিয়ে যাবে অন্য একটি Level এ।
        </p>
        <Link
          href="/lesson"
          className="btn btn-outline btn-primary w-[160px] font-medium"
        >
          Get Started
        </Link>
      </div>
      <div className="flex-1">
        <Image
          src="/assets/hero-student.png"
          alt="Student learning English"
          width={500}
          height={500}
          priority
        />
      </div>
    </section>
  );
}