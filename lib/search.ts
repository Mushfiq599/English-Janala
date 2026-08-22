import { getAllWords } from "@/lib/api";
import { Word } from "@/types/word";

export async function searchWords(query: string): Promise<Word[]> {
  if (!query.trim()) return [];
  const all = await getAllWords();
  const q = query.toLowerCase().trim();
  return all.filter(
    (w) =>
      w.word?.toLowerCase().includes(q) ||
      w.meaning?.toLowerCase().includes(q)
  );
}