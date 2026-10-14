/** Đọc văn bản tiếng Anh bằng Web Speech API của trình duyệt (không cần file audio). */
export function speak(text: string, rate = 0.95) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}

export const canSpeak = () => typeof window !== "undefined" && "speechSynthesis" in window;
