import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function saveEarnedBadges(
    uid: string,
    badgeIds: string[]
): Promise<void> {
    const ref = doc(db, "users", uid, "profile", "badges");
    await setDoc(ref, { earned: badgeIds, updatedAt: new Date().toISOString() });
}

export async function getEarnedBadges(uid: string): Promise<string[]> {
    const ref = doc(db, "users", uid, "profile", "badges");
    const snap = await getDoc(ref);
    if (!snap.exists()) return [];
    return snap.data().earned ?? [];
}