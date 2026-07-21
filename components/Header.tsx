"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import { FiSun, FiMoon, FiMenu, FiX, FiLogOut, FiLogIn, FiBookOpen, FiStar, FiHelpCircle, FiTarget } from "react-icons/fi";
import { useState } from "react";

const navLinks = [
  { label: "FAQ", href: "/faq", icon: <FiHelpCircle /> },
  { label: "Learn", href: "/lesson", icon: <FiBookOpen /> },
  { label: "Quiz", href: "/quiz", icon: <FiTarget /> },
  { label: "Saved Words", href: "/saved", icon: <FiStar /> },
];

export default function Header() {
  const { user, logOut } = useAuth();
  const { dark, toggleDark } = useTheme();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logOut();
    router.push("/");
  };

  return (
    <header style={{ backgroundColor: "var(--bg-header)" }} className="shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between w-11/12 mx-auto py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span style={{ color: "var(--text-primary)" }} className="text-lg font-bold">English</span>
          <Image src="/assets/logo.png" alt="English Janala logo" width={28} height={28} />
          <span style={{ color: "var(--text-primary)" }} className="font-bangla text-lg font-semibold">জানালা</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ color: "var(--text-secondary)" }}
              className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-100 transition"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}

          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            title="Toggle dark mode"
            style={{ color: "var(--text-secondary)" }}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-sky-100 transition text-lg ml-1"
          >
            {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {user ? (
            <div className="flex items-center gap-3 ml-2">
              <span style={{ color: "var(--text-muted)" }} className="text-sm truncate max-w-[160px]">
                {user.email}
              </span>
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
          className="lg:hidden border-t px-6 py-4 flex flex-col gap-2"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{ color: "var(--text-secondary)" }}
              className="flex items-center gap-2 text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-sky-50 transition"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <div style={{ borderColor: "var(--border-color)" }} className="border-t my-1" />
          {user ? (
            <button
              onClick={handleLogout}
              style={{ color: "var(--text-secondary)" }}
              className="flex items-center gap-2 text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-sky-50 transition text-left"
            >
              <FiLogOut size={15} />
              Logout
            </button>
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