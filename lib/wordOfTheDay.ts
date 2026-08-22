import { getAllWords } from "@/lib/api";
import { getDictionaryEntry } from "@/lib/api";
import { Word } from "@/types/word";

export interface WordOfTheDay {
    word: Word;
    phonetic: string;
    audioUrl: string;
    definition: string;
    example: string;
    partOfSpeech: string;
}

function getDayIndex(total: number): number {
    const start = new Date("2024-01-01").getTime();
    const now = new Date().getTime();
    const daysSinceStart = Math.floor(
        (now - start) / (1000 * 60 * 60 * 24)
    );
    return daysSinceStart % total;
}

export async function getWordOfTheDay(): Promise<WordOfTheDay | null> {
    try {
        const words = await getAllWords();
        if (!words.length) return null;

        const index = getDayIndex(words.length);
        const word = words[index];

        const dictEntry = await getDictionaryEntry(word.word);

        return {
            word,
            phonetic: dictEntry?.phonetic ?? `/${word.pronunciation}/`,
            audioUrl: dictEntry?.audioUrl ?? "",
            definition:
                dictEntry?.definitions?.[0]?.definition ?? word.meaning,
            example:
                dictEntry?.definitions?.[0]?.example ?? word.sentence ?? "",
            partOfSpeech:
                dictEntry?.definitions?.[0]?.partOfSpeech ??
                word.partsOfSpeech ??
                "",
        };
    } catch {
        return null;
    }
}