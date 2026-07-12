"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { createUserProfile, calculateAge } from "@/lib/userProfile";

export default function SignupPage() {
  const { signUp, logInWithGoogle } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Max date = today (can't be born in future)
  const today = new Date().toISOString().split("T")[0];
  // Min date = 100 years ago
  const minDate = new Date(
    new Date().setFullYear(new Date().getFullYear() - 100)
  )
    .toISOString()
    .split("T")[0];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!dateOfBirth) {
      setError("Please enter your date of birth.");
      return;
    }
    const age = calculateAge(dateOfBirth);
    if (age < 5) {
      setError("You must be at least 5 years old to use English Janala.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const credential = await signUp(email, password);
      await createUserProfile(
        credential.user.uid,
        name,
        email,
        dateOfBirth
      );
      router.push("/lesson");
    } catch {
      setError("Could not create account. Email may already be in use.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    if (!dateOfBirth || !name.trim()) {
      setError("Please fill in your name and date of birth before continuing with Google.");
      return;
    }
    const age = calculateAge(dateOfBirth);
    if (age < 5) {
      setError("You must be at least 5 years old to use English Janala.");
      return;
    }
    try {
      const credential = await logInWithGoogle();
      await createUserProfile(
        credential.user.uid,
        name,
        credential.user.email ?? "",
        dateOfBirth
      );
      router.push("/lesson");
    } catch {
      setError("Google sign-in failed. Please try again.");
    }
  };

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
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-xl font-bold">English</span>
          <Image src="/assets/logo.png" alt="logo" width={28} height={28} />
          <span className="font-bangla text-xl font-semibold">জানালা</span>
        </div>

        <h2
          style={{ color: "var(--text-primary)" }}
          className="text-2xl font-bold text-center mb-1"
        >
          Create account
        </h2>
        <p
          style={{ color: "var(--text-muted)" }}
          className="text-center text-sm mb-6"
        >
          Start your English learning journey today
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name */}
          <div>
            <label
              style={{ color: "var(--text-primary)" }}
              className="block text-sm font-medium mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              style={{
                backgroundColor: "var(--bg-page)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
              className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label
              style={{ color: "var(--text-primary)" }}
              className="block text-sm font-medium mb-1"
            >
              Date of Birth
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              min={minDate}
              max={today}
              style={{
                backgroundColor: "var(--bg-page)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
              className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
            <p
              style={{ color: "var(--text-muted)" }}
              className="text-xs mt-1"
            >
              We use this to personalize your learning experience
            </p>
          </div>

          {/* Email */}
          <div>
            <label
              style={{ color: "var(--text-primary)" }}
              className="block text-sm font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                backgroundColor: "var(--bg-page)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
              className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              style={{ color: "var(--text-primary)" }}
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              style={{
                backgroundColor: "var(--bg-page)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
              className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              style={{ color: "var(--text-primary)" }}
              className="block text-sm font-medium mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              style={{
                backgroundColor: "var(--bg-page)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
              className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "var(--accent)",
            }}
            className="w-full hover:opacity-90 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div
            style={{ backgroundColor: "var(--border-color)" }}
            className="flex-1 h-px"
          />
          <span style={{ color: "var(--text-muted)" }} className="text-sm">
            or
          </span>
          <div
            style={{ backgroundColor: "var(--border-color)" }}
            className="flex-1 h-px"
          />
        </div>

        <button
          onClick={handleGoogle}
          style={{
            borderColor: "var(--border-color)",
            color: "var(--text-primary)",
          }}
          className="w-full border font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-2 text-sm hover:opacity-80"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        <p
          style={{ color: "var(--text-muted)" }}
          className="text-center text-sm mt-6"
        >
          Already have an account?{" "}
          <Link
            href="/login"
            style={{ color: "var(--accent)" }}
            className="font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}