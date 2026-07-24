import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your English Janala account.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}