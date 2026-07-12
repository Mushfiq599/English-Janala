"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Learn", href: "/lesson" },
  { label: "Saved Words", href: "/saved" },
];

export default function Header() {
  const { user, logOut } = useAuth();
  const { dark, toggleDark } = useTheme();
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    router.push("/");
  };

  return (
    <header style={{ backgroundColor: "var(--bg-header)" }} className="shadow-sm">
      <div className="flex items-center justify-between w-11/12 mx-auto py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span className="text-lg font-bold">English</span>
          <Image
            src="/assets/logo.png"
            alt="English Janala logo"
            width={28}
            height={28}
          />
          <span className="font-bangla text-lg font-semibold">জানালা</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-100 transition"
            >
              {link.label}
            </Link>
          ))}

          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            title="Toggle dark mode"
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-sky-100 transition text-lg"
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {user ? (
            <div className="flex items-center gap-3 ml-2">
              <span className="text-sm text-gray-600 truncate max-w-[160px]">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile menu */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleDark}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-sky-100 transition text-lg"
          >
            {dark ? "☀️" : "🌙"}
          </button>
          <details className="dropdown dropdown-end">
            <summary className="btn btn-ghost">☰</summary>
            <ul className="menu menu-sm dropdown-content bg-white rounded-box z-10 mt-3 w-52 p-2 shadow">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
              <li>
                {user ? (
                  <button onClick={handleLogout}>Logout</button>
                ) : (
                  <Link href="/login">Login</Link>
                )}
              </li>
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
}