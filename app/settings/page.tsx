"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import {
    updateUserProfile,
    calculateAge,
    getThemeFromAge,
} from "@/lib/userProfile";
import { deleteUser } from "firebase/auth";
import { doc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Header from "@/components/Header";
import SiteFooter from "@/components/layout/Footer";
import { motion } from "framer-motion";
import {
    FiUser,
    FiCalendar,
    FiSave,
    FiTrash2,
    FiAlertTriangle,
    FiCheck,
} from "react-icons/fi";

type TierLabel = { label: string; color: string; bg: string };

const tierLabels: Record<string, TierLabel> = {
    kids: { label: "Young Explorer (Age 5–12)", color: "#f59e0b", bg: "#fef9c3" },
    teen: { label: "Teen Explorer (Age 13–17)", color: "#06b6d4", bg: "#cffafe" },
    scholar: { label: "Scholar (Age 18+)", color: "#0ea5e9", bg: "#f0f9ff" },
};

export default function SettingsPage() {
    const { user, loading: authLoading, logOut } = useAuth();
    const { profile, refreshProfile, themeTier } = useProfile();
    const router = useRouter();

    // Profile form
    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveError, setSaveError] = useState("");

    // Delete account
    const [deleteConfirm, setDeleteConfirm] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [showDeleteSection, setShowDeleteSection] = useState(false);

    const today = new Date().toISOString().split("T")[0];
    const minDate = new Date(
        new Date().setFullYear(new Date().getFullYear() - 100)
    )
        .toISOString()
        .split("T")[0];

    useEffect(() => {
        if (!authLoading && !user) router.push("/login");
    }, [user, authLoading, router]);

    useEffect(() => {
        if (profile) {
            setName(profile.name ?? "");
            setDateOfBirth(profile.dateOfBirth ?? "");
        }
    }, [profile]);

    const previewTier = dateOfBirth
        ? getThemeFromAge(calculateAge(dateOfBirth))
        : themeTier;

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaveError("");
        setSaveSuccess(false);

        if (!name.trim()) {
            setSaveError("Name cannot be empty.");
            return;
        }
        if (!dateOfBirth) {
            setSaveError("Date of birth cannot be empty.");
            return;
        }
        const age = calculateAge(dateOfBirth);
        if (age < 5) {
            setSaveError("You must be at least 5 years old.");
            return;
        }
        if (!user) return;

        setSaving(true);
        try {
            const age = calculateAge(dateOfBirth);
            const theme = getThemeFromAge(age);
            await updateUserProfile(user.uid, {
                name: name.trim(),
                dateOfBirth,
                age,
                theme,
            });
            await refreshProfile();
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch {
            setSaveError("Could not save changes. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!user) return;
        if (deleteConfirm !== "DELETE") {
            return;
        }

        setDeleting(true);
        try {
            // Delete all user Firestore data
            const subcollections = [
                "savedWords",
                "quizScores",
            ];

            for (const sub of subcollections) {
                const colRef = collection(db, "users", user.uid, sub);
                const snap = await getDocs(colRef);
                await Promise.all(
                    snap.docs.map((d) => deleteDoc(doc(db, "users", user.uid, sub, d.id)))
                );
            }

            // Delete profile
            await deleteDoc(doc(db, "users", user.uid, "profile", "data"));
            await deleteDoc(doc(db, "users", user.uid, "profile", "badges"));

            // Delete leaderboard entry
            await deleteDoc(doc(db, "leaderboard", user.uid));

            // Delete Firebase Auth user
            await deleteUser(user);

            router.push("/");
        } catch {
            setSaveError(
                "Could not delete account. You may need to log out and log in again before deleting."
            );
            setDeleting(false);
        }
    };

    if (authLoading) {
        return (
            <main>
                <Header />
                <div className="flex justify-center items-center py-32">
                    <div
                        className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"
                        style={{
                            borderColor: "var(--accent)",
                            borderTopColor: "transparent",
                        }}
                    />
                </div>
            </main>
        );
    }

    const tier = tierLabels[previewTier];

    return (
        <main>
            <Header />
            <section className="w-11/12 max-w-2xl mx-auto py-10">
                <div className="mb-8">
                    <h1
                        style={{ color: "var(--text-primary)" }}
                        className="text-2xl font-bold mb-1"
                    >
                        Settings
                    </h1>
                    <p style={{ color: "var(--text-secondary)" }} className="text-sm">
                        Manage your profile and account preferences
                    </p>
                </div>

                {/* Profile settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        backgroundColor: "var(--bg-card)",
                        borderColor: "var(--border-color)",
                    }}
                    className="border rounded-2xl p-6 shadow-sm mb-6"
                >
                    <h2
                        style={{ color: "var(--text-primary)" }}
                        className="text-lg font-bold mb-5"
                    >
                        Profile Information
                    </h2>

                    {saveSuccess && (
                        <div className="flex items-center gap-2 bg-green-50 text-green-700 text-sm rounded-lg px-4 py-3 mb-4">
                            <FiCheck size={16} />
                            Changes saved successfully
                        </div>
                    )}

                    {saveError && (
                        <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
                            {saveError}
                        </div>
                    )}

                    <form onSubmit={handleSave} className="space-y-5">
                        {/* Email — read only */}
                        <div>
                            <label
                                style={{ color: "var(--text-primary)" }}
                                className="block text-sm font-medium mb-1"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                value={user?.email ?? ""}
                                disabled
                                style={{
                                    backgroundColor: "var(--bg-page)",
                                    borderColor: "var(--border-color)",
                                    color: "var(--text-muted)",
                                }}
                                className="w-full border rounded-lg px-4 py-2.5 text-sm cursor-not-allowed opacity-60"
                            />
                            <p
                                style={{ color: "var(--text-muted)" }}
                                className="text-xs mt-1"
                            >
                                Email cannot be changed
                            </p>
                        </div>

                        {/* Name */}
                        <div>
                            <label
                                style={{ color: "var(--text-primary)" }}
                                className="block text-sm font-medium mb-1"
                            >
                                <span className="flex items-center gap-1.5">
                                    <FiUser size={13} />
                                    Full Name
                                </span>
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

                        {/* Date of birth */}
                        <div>
                            <label
                                style={{ color: "var(--text-primary)" }}
                                className="block text-sm font-medium mb-1"
                            >
                                <span className="flex items-center gap-1.5">
                                    <FiCalendar size={13} />
                                    Date of Birth
                                </span>
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
                        </div>

                        {/* Theme tier preview */}
                        <div
                            style={{
                                backgroundColor: tier.bg,
                                borderColor: tier.color + "40",
                            }}
                            className="border rounded-xl px-4 py-3 flex items-center justify-between"
                        >
                            <div>
                                <p
                                    style={{ color: tier.color }}
                                    className="text-xs font-bold uppercase tracking-wider mb-0.5"
                                >
                                    Your learning tier
                                </p>
                                <p
                                    style={{ color: tier.color }}
                                    className="text-sm font-bold"
                                >
                                    {tier.label}
                                </p>
                            </div>
                            <div
                                style={{ backgroundColor: tier.color + "20" }}
                                className="text-xs px-3 py-1 rounded-full"
                            >
                                <span style={{ color: tier.color }} className="font-semibold">
                                    {previewTier !== themeTier ? "Will change" : "Current"}
                                </span>
                            </div>
                        </div>

                        {previewTier !== themeTier && (
                            <p
                                style={{ color: "var(--text-muted)" }}
                                className="text-xs"
                            >
                                Saving will update your theme from{" "}
                                <strong>{tierLabels[themeTier].label}</strong> to{" "}
                                <strong>{tier.label}</strong>.
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={saving}
                            style={{ backgroundColor: "var(--accent)" }}
                            className="flex items-center justify-center gap-2 w-full text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition disabled:opacity-60"
                        >
                            {saving ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <FiSave size={15} />
                            )}
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </form>
                </motion.div>

                {/* Danger zone */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    style={{
                        backgroundColor: "var(--bg-card)",
                        borderColor: "#fca5a5",
                    }}
                    className="border rounded-2xl p-6 shadow-sm"
                >
                    <h2
                        className="text-lg font-bold mb-2"
                        style={{ color: "#dc2626" }}
                    >
                        Danger Zone
                    </h2>
                    <p style={{ color: "var(--text-secondary)" }} className="text-sm mb-4">
                        Permanently delete your account and all your data. This cannot
                        be undone.
                    </p>

                    {!showDeleteSection ? (
                        <button
                            onClick={() => setShowDeleteSection(true)}
                            className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                        >
                            <FiTrash2 size={15} />
                            Delete My Account
                        </button>
                    ) : (
                        <div className="space-y-4">
                            <div
                                style={{
                                    backgroundColor: "#fef2f2",
                                    borderColor: "#fca5a5",
                                }}
                                className="border rounded-xl p-4 flex items-start gap-3"
                            >
                                <FiAlertTriangle
                                    size={18}
                                    className="text-red-500 flex-shrink-0 mt-0.5"
                                />
                                <div>
                                    <p className="text-sm font-bold text-red-700 mb-1">
                                        This will permanently delete:
                                    </p>
                                    <ul className="text-xs text-red-600 space-y-0.5 list-disc list-inside">
                                        <li>Your profile and personal information</li>
                                        <li>All saved words</li>
                                        <li>All quiz scores and history</li>
                                        <li>Your streak and achievements</li>
                                        <li>Your leaderboard entry</li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-red-600 mb-1">
                                    Type DELETE to confirm
                                </label>
                                <input
                                    type="text"
                                    value={deleteConfirm}
                                    onChange={(e) =>
                                        setDeleteConfirm(e.target.value.toUpperCase())
                                    }
                                    placeholder="DELETE"
                                    className="w-full border border-red-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-red-50 text-red-700 placeholder:text-red-300"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setShowDeleteSection(false);
                                        setDeleteConfirm("");
                                    }}
                                    style={{
                                        backgroundColor: "var(--bg-page)",
                                        borderColor: "var(--border-color)",
                                        color: "var(--text-secondary)",
                                    }}
                                    className="flex-1 border text-sm font-semibold py-2.5 rounded-lg hover:opacity-80 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={deleteConfirm !== "DELETE" || deleting}
                                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-red-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    {deleting ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <FiTrash2 size={15} />
                                    )}
                                    {deleting ? "Deleting..." : "Delete Account"}
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </section>
            <SiteFooter />
        </main>
    );
}