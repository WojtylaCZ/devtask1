export function getLexicalDensity(input: string, nonLexicalWords: Set<string>): number {
  const words = input
    .toLowerCase()
    .trim()
    .split(' ');

  const totalWords = words.length;

  let lexicalWordsCount = 0;
  for (const word of words) {
    if (!nonLexicalWords.has(word)) {
      lexicalWordsCount++;
    }
  }

  return lexicalWordsCount / totalWords;
}
