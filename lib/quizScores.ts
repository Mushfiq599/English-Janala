import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface QuizScore {
    id?: string;
    lessonName: string;
    score: number;
    total: number;
    percentage: number;
    completedAt: string;
}

export async function saveQuizScore(
    uid: string,
    score: QuizScore
): Promise<void> {
    const colRef = collection(db, "users", uid, "quizScores");
    await addDoc(colRef, {
        ...score,
        completedAt: new Date().toISOString(),
    });
}

export async function getRecentQuizScores(
    uid: string,
    limitCount: number = 5
): Promise<QuizScore[]> {
    const colRef = collection(db, "users", uid, "quizScores");
    const q = query(
        colRef,
        orderBy("completedAt", "desc"),
        limit(limitCount)
    );
    const snap = await getDocs(q);
    return snap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as QuizScore),
    }));
}