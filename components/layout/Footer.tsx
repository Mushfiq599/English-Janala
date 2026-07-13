import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";

const links = {
  Learn: [
    { label: "All Lessons", href: "/lesson" },
    { label: "Saved Words", href: "/saved" },
    { label: "Quiz Mode", href: "/quiz" },
    { label: "Leaderboard", href: "/leaderboard" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "mailto:mellowm678@gmail.com" },
  ],
};

const socials = [
  { icon: <FaGithub size={20} />, href: "https://github.com/Mushfiq599", label: "GitHub" },
  { icon: <FaFacebook size={20} />, href: "#", label: "Facebook" },
  { icon: <FaInstagram size={20} />, href: "#", label: "Instagram" },
];

export default function SiteFooter() {
  return (
    <footer
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-color)",
      }}
      className="border-t"
    >
      <div className="w-11/12 max-w-6xl mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span style={{ color: "var(--text-primary)" }} className="text-xl font-bold">
                English
              </span>
              <Image src="/assets/logo.png" alt="logo" width={28} height={28} />
              <span style={{ color: "var(--text-primary)" }} className="font-bangla text-xl font-semibold">
                জানালা
              </span>
            </Link>
            <p style={{ color: "var(--text-secondary)" }} className="text-sm leading-relaxed max-w-xs">
              An interactive English vocabulary learning platform for learners
              of all ages — from curious kids to IELTS and TOEFL candidates.
            </p>
            <div className="flex gap-4 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  style={{ color: "var(--text-muted)" }}
                  className="hover:opacity-70 transition"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 style={{ color: "var(--text-primary)" }} className="font-bold mb-4">
                {section}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      style={{ color: "var(--text-secondary)" }}
                      className="text-sm hover:opacity-70 transition"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{ borderColor: "var(--border-color)" }}
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p style={{ color: "var(--text-muted)" }} className="text-xs text-center">
            © {new Date().getFullYear()} English Janala. Built by{" "}
            <a
              href="https://github.com/Mushfiq599"
              style={{ color: "var(--accent)" }}
              className="hover:underline"
            >
              Mushfiqur Rahman
            </a>
          </p>
          <p style={{ color: "var(--text-muted)" }} className="text-xs">
            For learners aged 5 to 30 · Free forever
          </p>
        </div>
      </div>
    </footer>
  );
}