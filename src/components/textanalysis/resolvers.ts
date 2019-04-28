import * as Joi from 'joi';

import { ApiError } from '../../common/api/errors/ApiError';

import { IComplexityApiResponse, ITextInput } from './interfaces';
import { complexityApiBody, modeApiParam } from './validations';

export async function lexicalComplexity(body: ITextInput, params: any): Promise<IComplexityApiResponse> {
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

  return { overall_ld: 0 };
}
