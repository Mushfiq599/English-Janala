import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getSavedWords } from "@/lib/savedWords";
import { getLessons } from "@/lib/api";

export interface UserStats {
    totalWordsSeen: number;
    totalSavedWords: number;
    lessonsCompleted: number;
    totalLessons: number;
}

export async function getUserStats(uid: string): Promise<UserStats> {
    // Count all seen words across all lessons
    let totalWordsSeen = 0;
    let lessonsCompleted = 0;

    const lessons = await getLessons();

    await Promise.all(
        lessons.map(async (lesson) => {
            const colRef = collection(
                db,
                "users",
                uid,
                "progress",
                String(lesson.level_no),
                "seenWords"
            );
            const snap = await getDocs(colRef);
            const count = snap.docs.length;
            totalWordsSeen += count;
            if (count > 0) lessonsCompleted++;
        })
    );

    const savedWords = await getSavedWords(uid);

    return {
        totalWordsSeen,
        totalSavedWords: savedWords.length,
        lessonsCompleted,
        totalLessons: lessons.length,
    };
}