import type { Metadata } from "next";
import { Poppins, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ProfileProvider } from "@/context/ProfileContext";
import ThemeWrapper from "@/components/shared/ThemeWrapper";
import ScrollToTop from "@/components/shared/ScrollToTop";
import OfflineBanner from "@/components/shared/OfflineBanner";
import InstallPrompt from "@/components/shared/InstallPrompt";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
});

export const metadata: Metadata = {
  title: {
    default: "English Janala | Learn English Vocabulary",
    template: "%s | English Janala",
  },
  description:
    "English Janala is an interactive English vocabulary learning platform for all ages — from curious kids to IELTS and TOEFL candidates.",
  keywords: [
    "English vocabulary",
    "learn English",
    "IELTS vocabulary",
    "TOEFL vocabulary",
    "English for kids",
    "vocabulary quiz",
    "English Janala",
  ],
  authors: [{ name: "Mushfiqur Rahman", url: "https://github.com/Mushfiq599" }],
  creator: "Mushfiqur Rahman",
  metadataBase: new URL("https://english-janala-azure.vercel.app"),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "English Janala",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://english-janala.vercel.app",
    siteName: "English Janala",
    title: "English Janala | Learn English Vocabulary",
    description:
      "Interactive English vocabulary learning for ages 5-30. Lessons, quizzes, pronunciation, and progress tracking.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "English Janala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "English Janala | Learn English Vocabulary",
    description:
      "Interactive English vocabulary learning for ages 5-30. Lessons, quizzes, pronunciation, and progress tracking.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/assets/logo.png",
    apple: "/icons/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${hindSiliguri.variable} font-sans antialiased`}
      >
        <OfflineBanner />
        <InstallPrompt />
        <ThemeProvider>
          <AuthProvider>
            <ProfileProvider>
              <ThemeWrapper />
              <ScrollToTop />
              {children}
            </ProfileProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}