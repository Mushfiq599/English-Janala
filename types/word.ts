export interface Lesson {
  level_no: string;
  lesson_name: string;
  level: string;
  no_of_words: string;
  image: string;
}

export interface Word {
  id: number;
  word: string;
  meaning: string;
  pronunciation: string;
  level: string;
  sentence?: string;
  synonyms?: string[];
  partsOfSpeech?: string;
  when_to_say?: string;
  image_url?: string;
}