import { Lesson, Word } from "@/types/word";

const BASE_URL = "https://openapi.programming-hero.com/api";
const DICT_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

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

export interface DictEntry {
  phonetic?: string;
  audioUrl?: string;
  definitions: {
    partOfSpeech: string;
    definition: string;
    example?: string;
    synonyms: string[];
    antonyms: string[];
  }[];
}

export async function getDictionaryEntry(word: string): Promise<DictEntry | null> {
  try {
    const res = await fetch(`${DICT_URL}/${encodeURIComponent(word)}`);
    if (!res.ok) return null;
    const json = await res.json();
    const entry = json[0];
    if (!entry) return null;

    // Extract audio URL
    const audioUrl = entry.phonetics?.find(
      (p: { audio?: string }) => p.audio
    )?.audio ?? "";

    // Flatten all definitions across all meanings
    const definitions = (entry.meanings ?? []).flatMap(
      (meaning: {
        partOfSpeech: string;
        definitions: {
          definition: string;
          example?: string;
          synonyms?: string[];
          antonyms?: string[];
        }[];
        synonyms?: string[];
        antonyms?: string[];
      }) =>
        meaning.definitions.slice(0, 2).map((def) => ({
          partOfSpeech: meaning.partOfSpeech,
          definition: def.definition,
          example: def.example,
          synonyms: [
            ...(def.synonyms ?? []),
            ...(meaning.synonyms ?? []),
          ].slice(0, 5),
          antonyms: [
            ...(def.antonyms ?? []),
            ...(meaning.antonyms ?? []),
          ].slice(0, 5),
        }))
    );

    return {
      phonetic: entry.phonetic,
      audioUrl,
      definitions,
    };
  } catch {
    return null;
  }
}