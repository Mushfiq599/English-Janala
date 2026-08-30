"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useProfile } from "@/context/ProfileContext";
import { useRouter, usePathname } from "next/navigation";
import {
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiLogOut,
  FiLogIn,
  FiBookOpen,
  FiStar,
  FiHelpCircle,
  FiTarget,
  FiAward,
  FiUser,
  FiZap,
  FiLayers,
  FiEdit3,
  FiBook,
  FiChevronDown,
  FiSettings,
} from "react-icons/fi";
import { useState, useRef, useEffect } from "react";

const learnLinks = [
  { label: "All Lessons", href: "/lesson", icon: <FiBookOpen size={14} /> },
  { label: "Flashcards", href: "/flashcards", icon: <FiLayers size={14} /> },
  { label: "Quiz Mode", href: "/quiz", icon: <FiTarget size={14} /> },
  { label: "Typing Challenge", href: "/typing", icon: <FiEdit3 size={14} /> },
  { label: "Exam Prep", href: "/exam-prep", icon: <FiBook size={14} /> },
];

const navLinks = [
  { label: "FAQ", href: "/faq", icon: <FiHelpCircle /> },
  { label: "Saved", href: "/saved", icon: <FiStar /> },
  { label: "Leaderboard", href: "/leaderboard", icon: <FiAward /> },
];

export default function Header() {
  const { user, logOut } = useAuth();
  const { dark, toggleDark } = useTheme();
  const { streak } = useProfile();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false);
  const learnRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logOut();
    router.push("/");
  };

  // Close learn dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        learnRef.current &&
        !learnRef.current.contains(e.target as Node)
      ) {
        setLearnOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isLearnActive = learnLinks.some((l) => pathname === l.href);

  return (
    <header
      style={{ backgroundColor: "var(--bg-header)" }}
      className="shadow-sm sticky top-0 z-50"
    >
      <div className="flex items-center justify-between w-11/12 mx-auto py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span
            style={{ color: "var(--text-primary)" }}
            className="text-lg font-bold"
          >
            English
          </span>
          <Image
            src="/assets/logo.png"
            alt="English Janala logo"
            width={28}
            height={28}
          />
          <span
            style={{ color: "var(--text-primary)" }}
            className="font-bangla text-lg font-semibold"
          >
            জানালা
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Learn dropdown */}
          <div className="relative" ref={learnRef}>
            <button
              onClick={() => setLearnOpen((v) => !v)}
              style={{
                color: isLearnActive
                  ? "var(--accent)"
                  : "var(--text-secondary)",
                backgroundColor: isLearnActive
                  ? "var(--accent-soft)"
                  : "transparent",
              }}
              className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-100 transition"
            >
              <FiBookOpen size={15} />
              Learn
              <FiChevronDown
                size={13}
                className={`transition-transform duration-200 ${
                  learnOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {learnOpen && (
              <div
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-color)",
                }}
                className="absolute top-full left-0 mt-2 w-52 border rounded-2xl shadow-xl overflow-hidden z-50"
              >
                {learnLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setLearnOpen(false)}
                      style={{
                        color: isActive
                          ? "var(--accent)"
                          : "var(--text-secondary)",
                        backgroundColor: isActive
                          ? "var(--accent-soft)"
                          : "transparent",
                      }}
                      className="flex items-center gap-2.5 text-sm font-medium px-4 py-3 hover:opacity-80 transition"
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Regular nav links */}
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: isActive
                    ? "var(--accent)"
                    : "var(--text-secondary)",
                  backgroundColor: isActive
                    ? "var(--accent-soft)"
                    : "transparent",
                }}
                className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-100 transition"
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}

          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            title="Toggle dark mode"
            style={{ color: "var(--text-secondary)" }}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-sky-100 transition ml-1"
          >
            {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {user ? (
            <div className="flex items-center gap-2 ml-2">
              {/* Streak badge */}
              {streak > 0 && (
                <div
                  style={{
                    backgroundColor: "#fef9c3",
                    color: "#f59e0b",
                    borderColor: "#fde68a",
                  }}
                  className="flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg border"
                >
                  <FiZap size={13} fill="#f59e0b" />
                  {streak} day{streak !== 1 ? "s" : ""}
                </div>
              )}

              {/* Profile */}
              <Link
                href="/profile"
                style={{
                  color:
                    pathname === "/profile"
                      ? "var(--accent)"
                      : "var(--text-secondary)",
                  borderColor: "var(--border-color)",
                  backgroundColor:
                    pathname === "/profile"
                      ? "var(--accent-soft)"
                      : "transparent",
                }}
                className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 border rounded-lg hover:opacity-80 transition"
              >
                <FiUser size={15} />
                Profile
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                style={{ backgroundColor: "var(--accent)" }}
                className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 text-white rounded-lg hover:opacity-90 transition"
              >
                <FiLogOut size={15} />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              style={{ backgroundColor: "var(--accent)" }}
              className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 text-white rounded-lg hover:opacity-90 transition ml-2"
            >
              <FiLogIn size={15} />
              Login
            </Link>
          )}
        </nav>

        {/* Mobile right side */}
        <div className="lg:hidden flex items-center gap-2">
          {user && streak > 0 && (
            <div
              style={{
                backgroundColor: "#fef9c3",
                color: "#f59e0b",
                borderColor: "#fde68a",
              }}
              className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg border"
            >
              <FiZap size={12} fill="#f59e0b" />
              {streak}
            </div>
          )}
          <button
            onClick={toggleDark}
            style={{ color: "var(--text-secondary)" }}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-sky-100 transition"
          >
            {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: "var(--text-secondary)" }}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-sky-100 transition"
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-color)",
          }}
          className="lg:hidden border-t px-6 py-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto"
        >
          {/* Learn accordion */}
          <button
            onClick={() => setMobileLearnOpen((v) => !v)}
            style={{
              color: isLearnActive
                ? "var(--accent)"
                : "var(--text-secondary)",
              backgroundColor: isLearnActive
                ? "var(--accent-soft)"
                : "transparent",
            }}
            className="flex items-center justify-between text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-sky-50 transition w-full"
          >
            <span className="flex items-center gap-2">
              <FiBookOpen size={15} />
              Learn
            </span>
            <FiChevronDown
              size={13}
              className={`transition-transform duration-200 ${
                mobileLearnOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {mobileLearnOpen && (
            <div className="pl-4 flex flex-col gap-1 mb-1">
              {learnLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    color:
                      pathname === link.href
                        ? "var(--accent)"
                        : "var(--text-secondary)",
                    backgroundColor:
                      pathname === link.href
                        ? "var(--accent-soft)"
                        : "transparent",
                  }}
                  className="flex items-center gap-2 text-sm font-medium py-2 px-3 rounded-lg hover:bg-sky-50 transition"
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Regular links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                color:
                  pathname === link.href
                    ? "var(--accent)"
                    : "var(--text-secondary)",
                backgroundColor:
                  pathname === link.href
                    ? "var(--accent-soft)"
                    : "transparent",
              }}
              className="flex items-center gap-2 text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-sky-50 transition"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}

          <div
            style={{ borderColor: "var(--border-color)" }}
            className="border-t my-1"
          />

          {user ? (
            <>
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                style={{
                  color:
                    pathname === "/profile"
                      ? "var(--accent)"
                      : "var(--text-secondary)",
                  backgroundColor:
                    pathname === "/profile"
                      ? "var(--accent-soft)"
                      : "transparent",
                }}
                className="flex items-center gap-2 text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-sky-50 transition"
              >
                <FiUser size={15} />
                Profile
              </Link>
              <Link
                href="/settings"
                onClick={() => setMobileOpen(false)}
                style={{
                  color:
                    pathname === "/settings"
                      ? "var(--accent)"
                      : "var(--text-secondary)",
                  backgroundColor:
                    pathname === "/settings"
                      ? "var(--accent-soft)"
                      : "transparent",
                }}
                className="flex items-center gap-2 text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-sky-50 transition"
              >
                <FiSettings size={15} />
                Settings
              </Link>
              <button
                onClick={handleLogout}
                style={{ color: "var(--text-secondary)" }}
                className="flex items-center gap-2 text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-sky-50 transition text-left"
              >
                <FiLogOut size={15} />
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              style={{ color: "var(--accent)" }}
              className="flex items-center gap-2 text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-sky-50 transition"
            >
              <FiLogIn size={15} />
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}