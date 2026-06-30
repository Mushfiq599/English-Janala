import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Learn", href: "/lesson" },
];

export default function Header() {
  return (
    <header className="bg-[#BADEFF26] shadow-sm">
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-lg font-bold">English</span>
            <Image src="/assets/logo.png" alt="English Janala logo" width={28} height={28} />
            <span className="font-bangla text-lg font-semibold">জানালা</span>
          </Link>
        </div>

        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="btn btn-soft btn-primary">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button className="btn btn-soft btn-primary">Logout</button>
            </li>
          </ul>
        </div>

        {/* Mobile menu */}
        <div className="navbar-end lg:hidden">
          <details className="dropdown dropdown-end">
            <summary className="btn btn-ghost">☰</summary>
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
              <li>
                <button>Logout</button>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
}