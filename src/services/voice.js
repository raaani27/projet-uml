export function speak(text) {
  if (!window.speechSynthesis) return
  const u = new SpeechSynthesisUtterance(text)
  window.speechSynthesis.speak(u)
}
