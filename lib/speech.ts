export function pronounceWord(word: string, audioUrl?: string) {
  if (typeof window === "undefined") return;

  if (audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play().catch(() => {
      // Fallback to speech synthesis if audio fails
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    });
    return;
  }

  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
}