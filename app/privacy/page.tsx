import Header from "@/components/Header";
import SiteFooter from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy policy for English Janala.",
};

export default function PrivacyPage() {
    const updated = "August 2026";

    return (
        <main>
            <Header />
            <section className="w-11/12 max-w-3xl mx-auto py-16">
                <h1
                    style={{ color: "var(--text-primary)" }}
                    className="text-3xl font-bold mb-2"
                >
                    Privacy Policy
                </h1>
                <p style={{ color: "var(--text-muted)" }} className="text-sm mb-10">
                    Last updated: {updated}
                </p>

                {[
                    {
                        title: "What data we collect",
                        body: `When you create an account on English Janala, we collect your name, email address, and date of birth. Your date of birth is used only to determine your learning tier (kids, teen, or scholar) and is never shared with third parties. We also store your saved words, quiz scores, progress data, and streak information in Firestore so your learning history persists across sessions.`,
                    },
                    {
                        title: "How we use your data",
                        body: `Your data is used exclusively to personalise your English Janala experience — showing you the right theme, tracking your progress, and maintaining your leaderboard position. We do not sell, rent, or share your personal data with any third parties. We do not run advertisements.`,
                    },
                    {
                        title: "Firebase and Google",
                        body: `English Janala uses Firebase (by Google) for authentication and data storage. When you sign in with Google, Google shares your name and email address with us under their own privacy policy. You can review Google's privacy policy at policies.google.com/privacy.`,
                    },
                    {
                        title: "Cookies and local storage",
                        body: `English Janala uses browser localStorage to remember your dark mode preference and PWA install prompt status. We do not use tracking cookies or advertising cookies of any kind.`,
                    },
                    {
                        title: "Data retention and deletion",
                        body: `You can delete your account at any time from the Settings page. Deleting your account permanently removes all your personal data, saved words, quiz history, streak, and leaderboard entry from our database. This action cannot be undone.`,
                    },
                    {
                        title: "Children's privacy",
                        body: `English Janala is designed to be used by children aged 5 and above with parental guidance for the account creation process. We do not knowingly collect data from children under 5. If you believe a child under 5 has created an account, please contact us and we will delete the account immediately.`,
                    },
                    {
                        title: "Contact",
                        body: `If you have any questions about this privacy policy or how your data is handled, please contact us at mellowm678@gmail.com.`,
                    },
                ].map((section, i) => (
                    <div key={i} className="mb-8">
                        <h2
                            style={{ color: "var(--text-primary)" }}
                            className="text-lg font-bold mb-2"
                        >
                            {section.title}
                        </h2>
                        <p
                            style={{ color: "var(--text-secondary)" }}
                            className="text-sm leading-relaxed"
                        >
                            {section.body}
                        </p>
                    </div>
                ))}
            </section>
            <SiteFooter />
        </main>
    );
}