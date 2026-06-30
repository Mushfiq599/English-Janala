import { Lesson, Word } from "@/types/word";

const BASE_URL = "https://openapi.programming-hero.com/api";

export async function getLessons(): Promise<Lesson[]> {
  const res = await fetch(`${BASE_URL}/levels/all`);
  if (!res.ok) throw new Error("Failed to load lessons");
  const json = await res.json();
  return json.data;
}

export async function getWordsByLevel(levelId: string): Promise<Word[]> {
  const res = await fetch(`${BASE_URL}/level/${levelId}`);
  if (!res.ok) throw new Error("Failed to load words");
  const json = await res.json();
  return json.data;
}

export async function getWordDetail(wordId: number): Promise<Word> {
  const res = await fetch(`${BASE_URL}/word/${wordId}`);
  if (!res.ok) throw new Error("Failed to load word detail");
  const json = await res.json();
  return json.data;
}

export async function getAllWords(): Promise<Word[]> {
  const res = await fetch(`${BASE_URL}/words/all`);
  if (!res.ok) throw new Error("Failed to load words");
  const json = await res.json();
  return json.data;
}