import {
    doc,
    setDoc,
    collection,
    getDocs,
    query,
    orderBy,
    limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface LeaderboardEntry {
    uid: string;
    name: string;
    wordsLearned: number;
    lessonsCompleted: number;
    themeTier: "kids" | "teen" | "scholar";
    updatedAt: string;
}

export async function updateLeaderboardEntry(
    uid: string,
    name: string,
    wordsLearned: number,
    lessonsCompleted: number,
    themeTier: "kids" | "teen" | "scholar"
): Promise<void> {
    const ref = doc(db, "leaderboard", uid);
    await setDoc(
        ref,
        {
            uid,
            name,
            wordsLearned,
            lessonsCompleted,
            themeTier,
            updatedAt: new Date().toISOString(),
        },
        { merge: true }
    );
}

export async function getLeaderboard(
    topN: number = 20
): Promise<LeaderboardEntry[]> {
    const q = query(
        collection(db, "leaderboard"),
        orderBy("wordsLearned", "desc"),
        limit(topN)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as LeaderboardEntry);
}