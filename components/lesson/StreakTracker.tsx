"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { updateStreak } from "@/lib/userProfile";

export default function StreakTracker() {
    const { user } = useAuth();
    const { refreshProfile } = useProfile();

    useEffect(() => {
        if (!user) return;
        updateStreak(user.uid)
            .then(() => refreshProfile())
            .catch(() => { });
    }, [user]);

    return null;
}