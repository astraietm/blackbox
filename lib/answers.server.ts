// SERVER-SIDE ONLY — never import this in client components
// This file contains the correct answers for all challenges

export const ANSWERS: Record<string, string> = {
  "the-message": "archive",
  "the-archive": "signal",
  "the-source": "decoded",
  "the-signal": "parameter",
  "the-parameter": "recovered",
  "the-memory": "the_trace",
  "the-script": "vault",
  "the-image": "cipher",
  "the-cipher": "signal", // decoded from ROT13: "FVTANY" → "SIGNAL"
  "the-key": "signal-decoded", // combination: signal + decoded
};

export function validateAnswer(
  challengeId: string,
  userAnswer: string
): boolean {
  const correct = ANSWERS[challengeId];
  if (!correct) return false;
  return correct.toLowerCase().trim() === userAnswer.toLowerCase().trim();
}
