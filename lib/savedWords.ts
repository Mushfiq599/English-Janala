import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Word } from "@/types/word";

export async function saveWord(userId: string, word: Word): Promise<void> {
  const ref = doc(db, "users", userId, "savedWords", String(word.id));
  await setDoc(ref, word);
}

export async function removeSavedWord(
  userId: string,
  wordId: number
): Promise<void> {
  const ref = doc(db, "users", userId, "savedWords", String(wordId));
  await deleteDoc(ref);
}

export async function getSavedWords(userId: string): Promise<Word[]> {
  const colRef = collection(db, "users", userId, "savedWords");
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map((doc) => doc.data() as Word);
}