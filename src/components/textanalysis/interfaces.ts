export interface IComplexityApiRequestBody {
  text: string;
}

export interface IComplexityApiResponse {
  sentence_ld?: number[];
  overall_ld: number;
}

export interface IAddNonLexicalWordApiRequestBody {
  word: string;
}
