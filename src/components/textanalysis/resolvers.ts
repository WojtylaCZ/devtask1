import * as Joi from 'joi';

import { ApiError } from '../../common/api/errors/ApiError';
import IApiResponse from '../../common/api/IApiResponse';

import { IComplexityApiResponse, ITextInput } from './interfaces';
import NonLexicalWordSchema from './models/NonLexicalWordSchema';
import { getLexicalDensity } from './utils';
import { complexityApiBody, modeApiParam } from './validations';

export async function lexicalComplexity(body: ITextInput, params: any): Promise<IApiResponse<IComplexityApiResponse>> {
  // Validation
  Joi.validate(body, complexityApiBody, (error: Error) => {
    if (error) {
      throw new ApiError(error.message);
    }
  });

  Joi.validate(params, modeApiParam, (error: Error) => {
    if (error) {
      throw new ApiError(error.message);
    }
  });

  // Sanitization
  let textInSenteces = body.text.replace(/[^a-zA-Z.\s]/g, ' ');
  textInSenteces = textInSenteces.replace(/\s\s+/g, ' ');

  // 100 words max
  if ((body.text.match(/\s/g) || []).length > 100) {
    throw new ApiError('Text has to have 100 words maximum');
  }

  // Resolution
  const nonLexicalWordsSet = new Set();
  const nonLexicalWords = await NonLexicalWordSchema.find();

  for (const word of nonLexicalWords) {
    nonLexicalWordsSet.add(word.value.toLowerCase());
  }

  let overallResult = 0;
  let sentencesResult;
  if (params.mode && params.mode === 'verbose') {
    const sentences = textInSenteces.split('.');

    sentencesResult = [];
    for (const sentence of sentences) {
      if (sentence.length > 0) {
        // Decimal rounding and trailing zeros needs to be better addressed
        sentencesResult.push(Math.round(getLexicalDensity(sentence, nonLexicalWordsSet) * 100) / 100);
      }
    }
  }

  let textForOverall = textInSenteces.replace(/[.]/g, ' ');
  textForOverall = textForOverall.replace(/\s\s+/g, ' ');

  if (textForOverall.length > 0) {
    // Decimal rounding and trailing zeros needs to be better addressed
    overallResult = Math.round(getLexicalDensity(textForOverall, nonLexicalWordsSet) * 100) / 100;
  }
  return { data: { overall_ld: overallResult, sentence_ld: sentencesResult } };
}
