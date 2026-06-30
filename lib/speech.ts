export function pronounceWord(word: string) {
  if (typeof window === "undefined") return;
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
}


