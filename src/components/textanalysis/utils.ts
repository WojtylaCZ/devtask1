export const NON_LEXICAL_WORDS = [
  'to',
  'got',
  'is',
  'have',
  'and',
  'although',
  'or',
  'that',
  'when',
  'while',
  'a',
  'either',
  'more',
  'much',
  'neither',
  'my',
  'that',
  'the',
  'as',
  'no',
  'nor',
  'not',
  'at',
  'between',
  'in',
  'of',
  'without',
  'I',
  'you',
  'he',
  'she',
  'it',
  'we',
  'they',
  'anybody',
  'one'
];

export function getLexicalDensity(input: string): number {
  const words = input
    .toLowerCase()
    .trim()
    .split(' ');

  const totalWords = words.length;
  const nonLexicalWordsSet = new Set(NON_LEXICAL_WORDS);

  let lexicalWordsCount = 0;
  for (const word of words) {
    if (!nonLexicalWordsSet.has(word)) {
      lexicalWordsCount++;
    }
  }

  return lexicalWordsCount / totalWords;
}
