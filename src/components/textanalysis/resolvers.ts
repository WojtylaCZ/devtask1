import * as Joi from 'joi';

import { ApiError } from '../../common/api/errors/ApiError';
import IApiResponse from '../../common/api/IApiResponse';

import { IComplexityApiResponse, ITextInput } from './interfaces';
import { getLexicalDensity } from './utils';
import { complexityApiBody, modeApiParam } from './validations';

export async function lexicalComplexity(body: ITextInput, params: any): Promise<IApiResponse<IComplexityApiResponse>> {
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

  let overallResult;
  let sentencesResults;

  if (params.mode && params.mode === 'verbose') {
    const sentences = body.text.split('.');

    sentencesResults = [];

    for (const sentence of sentences) {
      sentencesResults.push(getLexicalDensity(sentence));
    }
    overallResult = getLexicalDensity(body.text);
  } else {
    overallResult = getLexicalDensity(body.text);
  }

  return { data: { overall_ld: overallResult, sentence_ld: sentencesResults } };
}
