export interface Lesson {
  id: number;
  level_no: number;
  lessonName: string;
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