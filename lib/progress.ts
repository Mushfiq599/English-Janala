import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function markWordSeen(
  userId: string,
  levelId: string,
  wordId: number
): Promise<void> {
  const ref = doc(db, "users", userId, "progress", levelId, "seenWords", String(wordId));
  await setDoc(ref, { seenAt: new Date().toISOString() });
}

export async function getSeenWordIds(
  userId: string,
  levelId: string
): Promise<number[]> {
  const colRef = collection(
    db,
    "users",
    userId,
    "progress",
    levelId,
    "seenWords"
  );
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map((doc) => Number(doc.id));
}

export async function getLessonProgress(
  userId: string,
  levelId: string
): Promise<number> {
  const ids = await getSeenWordIds(userId, levelId);
  return ids.length;
}

export async function getAllLessonsProgress(
  userId: string,
  levelIds: string[]
): Promise<Record<string, number>> {
  const result: Record<string, number> = {};
  await Promise.all(
    levelIds.map(async (id) => {
      result[id] = await getLessonProgress(userId, id);
    })
  );
  return result;
}