export interface DictEntry {
  phonetic?: string;
  audioUrl?: string;
  imageUrl?: string;
  definitions: {
    partOfSpeech: string;
    definition: string;
    example?: string;
    synonyms: string[];
    antonyms: string[];
  }[];
}

export async function getDictionaryEntry(
  word: string
): Promise<DictEntry | null> {
  try {
    const res = await fetch(
      `${DICT_URL}/${encodeURIComponent(word)}`
    );
    if (!res.ok) return null;
    const json = await res.json();
    const entry = json[0];
    if (!entry) return null;

    const audioUrl =
      entry.phonetics?.find(
        (p: { audio?: string }) => p.audio
      )?.audio ?? "";

    // Some dictionary entries include an image
    const imageUrl =
      entry.phonetics?.find(
        (p: { sourceUrl?: string }) => p.sourceUrl
      )?.sourceUrl ?? "";

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
      imageUrl,
      definitions,
    };
  } catch {
    return null;
  }
}